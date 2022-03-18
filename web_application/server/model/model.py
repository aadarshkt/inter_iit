# Dependencies
import astropy.convolution.convolve as conv
from astropy.convolution import Box1DKernel as box1d
from astropy.convolution import Gaussian1DKernel as g1d
from astropy.table import Table
import pandas as pd
from matplotlib.pyplot import figure
from scipy.signal import find_peaks
from scipy.signal import peak_widths
import math
from scipy.optimize import curve_fit
import matplotlib.pyplot as plt
import numpy as np
from scipy.optimize import leastsq
from scipy.special import erf
from os.path import join, dirname, realpath


class Curve_Fitter:
    # data_path to initialize the dataframe which we will work on. Only required parameter.
    def __init__(self, data_path, convo_size=60):
        self.data_raw = Table.read(data_path).to_pandas()
        # we will use convolved data for most of our purposes
        self.data = self.convolve(self.data_raw, convo_size)
        # calls scipy function to detect peaks
        self.peak_list, _ = find_peaks(
            self.data['RATE'], height=40, prominence=16)
        # calls scipy function to take width for fitting
        self.width = peak_widths(
            self.data['RATE'], self.peak_list, rel_height=0.65)
        # start and end point for curve for fitting
        self.start = self.width[2].astype(int)
        self.stop = self.width[3].astype(int)
        # stores background data
        self.bd, self.bdata = self.bgdata()
        # stores standard deviation
        self.std = self.datastd()
        # stores the list of extended fitted curve corresponding to every peak in new curve and the portion for fitting in scaled curve
        self.newcurve, self.scaledcurve = self.peak_fitter()
        # stores the start and end index corresponding to the derived start and end time of the peak
        self.startloc, self.endloc = self.startidx()

    # function to convovle the data, returns a new dataframe

    def convolve(self, data, width):
        data2 = data.copy()
        data2['RATE'] = conv(np.array(data['RATE']),
                             kernel=g1d(width), boundary='extend')
        return data2

    # MATHS AHEAD
    #Z = (2*B + (C**2)*D)/(2*C)
    # Just a temp function so we don't have to write the expression again and again
    def z_func(self, B, C, D):
        return (2*B + (C**2)*D)/(2*C)

    # Our objective function we will fit our curve over this
    def objective_func(self, T, A, B, C, D, E, F):
        return math.sqrt(np.pi*0.5)*A*C*np.exp(D/2*((2*B)+(C**2)*(D/2)-(2*(T*E + F))))*(erf(self.z_func(B, C, D)) - erf(self.z_func(B, C, D) - (T*E + F)/C))

    # Defining the cost function. We will use sqrt(chi) for our calculations
    def objective_cost_func(self, params, x, y):
        a0, b0, c0, d0, e0, f0 = params[0], params[1], params[2], params[3], params[4], params[5]
        return np.sqrt(((y - self.objective_func(x, a0, b0, c0, d0, e0, f0))**2)/y)

    # Scales the rate and time required for fitting function
    def min_max_scaler(self, df):
        df['RATESCALED'] = (df['RATE'] - df['RATE'].min()) / \
            (df['RATE'].max() - df['RATE'].min())
        df['TIMESCALED'] = (df['TIME'] - df['TIME'].min()) / \
            (df['TIME'].max() - df['TIME'].min())*2

    # Scales the rate back to original size
    def rev_scaler(self, df, x):
        return x*(df['RATE'].max() - df['RATE'].min()) + df['RATE'].min()

    # backgroung flux calculated by taking  median of data after removing bursts
    def bgdata(self):
        c = self.data.copy()
        remove = []
        for i in range(len(self.start)):
            remove += np.arange(self.start[i], self.stop[i], 1).tolist()
        remove = list(set(remove))
        bg = self.data.drop(remove)
        return bg, np.median(c.drop(remove)['RATE'])

    # Calculates standard deviation of data
    def datastd(self):
        data = self.bd['RATE']
        return np.std(data)

    # Function to actually fit the given data into the objective function
    def peak_fitter(self):
        self.min_max_scaler(self.data)  # Scaling the data for a better fit
        peak_data_list = []
        peak_df_list = []
        input = []
        scaledcurve = []
        newcurve = []
        scaledcurve = []
        for i in range(len(self.peak_list)):  # Takes in the information about the peaks

            TIME = self.data['TIME'][self.start[i]:self.stop[i]] - \
                self.data['TIME'][self.start[i]]  # Some scaling
            RATE = self.data['RATESCALED'][self.start[i]:self.stop[i]]

            # Since we have minmax scaled the data, random parms in 0-1 range yeild a faster fit
            params = [0.2, 0.3, 0.3, 0.4, 0.1, 0.1]

            resultsq = leastsq(self.objective_cost_func,
                               params, (TIME, RATE))  # Fitting the data
            # Extracting the params
            a, b, c, d, e, f = resultsq[0][0], resultsq[0][1], resultsq[0][2], resultsq[0][3], resultsq[0][4], resultsq[0][5]
            ratescale = self.rev_scaler(
                self.data, self.objective_func(TIME, a, b, c, d, e, f))  # Reverse scling the data
            # stores the predicted curve for the time passed for fitting
            scaledcurve.append(ratescale)
            # extending the time for fitting the curve
            input_time = np.arange(-20000, list(TIME)[-1]+20000, 1)
            # newcurve has the fitted curve extended for detecting start and end time
            new_curve = self.objective_func(input_time, a, b, c, d, e, f)
            input = (self.data['TIME'][self.start[i]]+input_time)
            newcurve.append(pd.DataFrame(
                {'TIME': input, 'RATE': self.rev_scaler(self.data, new_curve)}))
        return newcurve, scaledcurve

    # calculates start and end time of the peak where the extended fitted curve passes background flux + standard deviation
    def startidx(self):
        start = []
        end = []
        dellist = []
        for i in range(len(self.peak_list)):
            c = self.newcurve[i][self.newcurve[i]['RATE']
                                 >= self.bdata+self.std].index.tolist()
            if len(c) < 2:
                # a peak deletion list used for filtering unfit peaks
                dellist.append(i)
                continue
            if (self.data['RATE'][self.peak_list[i]]-self.std-self.bdata) <= 0.15*self.std:
                dellist.append(i)
                continue
            else:
                sloc = self.newcurve[i][self.newcurve[i]['RATE']
                                        >= self.bdata+self.std].index.tolist()[0]
                start.append(sloc)
                eloc = self.newcurve[i][self.newcurve[i]['RATE']
                                        >= self.bdata+self.std].index.tolist()[-1]
                end.append(eloc)
        print(dellist)
        if len(dellist) == 0:
            pass
        else:
            self.peak_list = np.delete(self.peak_list, dellist)
            self.newcurve = np.delete(self.newcurve, dellist)
            self.scaledcurve = np.delete(self.scaledcurve, dellist)
            self.start = np.delete(self.start, dellist)
            self.stop = np.delete(self.stop, dellist)
        return start, end

    # creates a dataframe of parameters to return
    def params(self):
        df = pd.DataFrame(columns=['class',
                          'decay_time', 'rise_time', 'peak_flux', 'peak_time', 'start_time', 'end_time'])
        for i in range(len(self.peak_list)):
            df = df.append({'class': 'A',
                           'decay_time': self.newcurve[i]['TIME'][self.endloc[i]]-self.data['TIME'][self.peak_list[i]],
                            'rise_time': self.data['TIME'][self.peak_list[i]]-self.newcurve[i]['TIME'][self.startloc[i]],
                            'peak_flux': self.data['RATE'][self.peak_list[i]],
                            'peak_time': self.peak_list[i],
                            'start_time': self.newcurve[i]['TIME'][self.startloc[i]]-self.data['TIME'][0],
                            'end_time': self.newcurve[i]['TIME'][self.endloc[i]]-self.data['TIME'][0],
                            }, ignore_index=True)

        # Classifier for classifying peaks on the basis of peakflux
        for i in range(len(self.peak_list)):
            if df['peak_flux'][i] >= 70 and df['peak_flux'][i] < 1000:
                df['class'][i] = 'A'
            elif df['peak_flux'][i] >= 1000 and df['peak_flux'][i] < 1e4:
                df['class'][i] = 'B'
            elif df['peak_flux'][i] >= 1e4 and df['peak_flux'][i] < 1e5:
                df['class'][i] = 'C'
            elif df['peak_flux'][i] < 70:
                df['class'][i] = 'Subclass'
            elif df['peak_flux'][i] >= 1e5 and df['peak_flux'][i] < 1e6:
                df['class'][i] = 'M'
            elif df['peak_flux'][i] >= 1e6 and df['peak_flux'][i] < 1e7:
                df['class'][i] = 'X'
            else:
                df['class'][i] = 'UNDEFINED'
        return df

    # For convinence to debub curves, be can directly call this function. No use in the actual program.
    def plotter(self, std=False, newplot=False):
        plt.figure(figsize=(20, 8))
        plt.plot(self.data['TIME'], self.data['RATE'])
        if std:
            plt.axhline(self.bdata+self.std, color='g')
        for i in range(len(self.peak_list)):
            plt.axvline(self.data['TIME'][self.peak_list[i]])
            if newplot:

                plt.plot(self.newcurve[i]['TIME'], self.newcurve[i]['RATE'])
        plt.show()

    # We get individual curves for each peak fitting
    # Thus, we need to stich together all the peaks
    def sticher(self, plot=True):
        df = self.data
        df['STICH'] = None
        # We are gonna run the loop for all of the entries
        for i in range(len(self.peak_list)):
            # In the range in which a certain curve is relevant
            for k in np.arange(self.start[i], self.stop[i], 1):
                if df['STICH'][k] is None:
                    # We fill the Curve values if no prior values are present
                    df['STICH'][k] = self.scaledcurve[i][k]
                else:
                    df['STICH'][k] = max(
                        float(self.scaledcurve[i][k]), df['STICH'][k])  # If it has already been filled (Curve overlapping) we pick the max between the values, thus we will likely not miss a relevant peak

        # We fill the remaining stuff with the median of our dataset
        df['STICH'].fillna(value=df['RATE'].median(), inplace=True)
        return df['STICH']

# reads lightcurve file into astropy table and converts it into pandas dataframe


def pdcreator(lc_path):
    lc_data = Table.read(lc_path)
    lc_data = lc_data.to_pandas()
    lc_data['TIME'] = lc_data['TIME']-lc_data['TIME'][0]+1
    return lc_data

# Takes gaussian convolution of raw data to smoothen the curve


def convolve(data, width=60):
    data['CONVOLVED_RATE'] = conv(np.array(data['RATE']),
                                  kernel=g1d(width), boundary='extend')


def convolve_curve(filepath):
    xsmDataFrame = pdcreator(filepath)
    convolve(xsmDataFrame)
    return xsmDataFrame[['TIME', 'RATE', 'CONVOLVED_RATE']]
    # xsmDataFrame.to_csv(CSV_SAVE_PATH, index=False)
    # return CSV_SAVE_PATH

    # Plots our data, if you have already called fitter, then pass the params in here.
