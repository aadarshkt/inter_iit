from email import header
from astropy.table import Table
import pandas as pd
import matplotlib.pyplot as plt
from astropy.timeseries import TimeSeries
from astropy import units
import numpy as np
import math
import astropy.convolution.convolve as conv
from astropy.convolution import Box1DKernel as box1d
from astropy.convolution import Gaussian1DKernel as g1d
from scipy.signal import find_peaks
from scipy.signal import peak_widths
from os.path import join, dirname, realpath


CSV_SAVE_PATH = join(dirname(realpath(__file__)),
                     'static/temp_csv/xsm_curve.csv')


def pdcreator(lc_path):
    lc_data = Table.read(lc_path)
    lc_data = lc_data.to_pandas()
    lc_data['TIME'] = lc_data['TIME']-lc_data['TIME'][0]+1
    return lc_data


def binner(x, bin_size):
    Z = Table.from_pandas(x)
    Z = Z[['TIME', 'RATE', 'ERROR']]
    Z['TIME'] = (np.trunc((x['TIME']-x['TIME'][0])/bin_size)) * \
        bin_size+x['TIME'][0]
    dat_grouped = Z.group_by(Z['TIME'])
    dat_binned = dat_grouped.groups.aggregate(np.median)
    dat_binned = dat_binned.to_pandas()

    return dat_binned


def plot_portion(dataframe, kind='line'):
    plt.figure(figsize=(20, 8))
    plt.plot(dataframe['TIME'], dataframe['RATE'])
    plt.show()


def plot_portion_2(dataframe, kind='line'):
    # plt.figure(figsize=(20,8))
    dataframe.plot(x='TIME', y='RATE', sharey=True,
                   sharex=True, figsize=(20, 8), subplots=True)
    # plt.show()


def convolve(data, width):
    data['RATE'] = conv(np.array(data['RATE']),
                        kernel=g1d(width), boundary='extend')


def checker(data, mul, P):
    peaks = []
    for i in range(data.shape[0]-9*mul):
        if(data[i+3*mul] > data[i+2*mul] and data[i+2*mul] > data[i+1*mul] and data[i+1*mul] > data[i] and data[i+3*mul] > data[i]*P and data[i+3*mul] > data[i+6*mul]*P and data[i+3*mul] > data[i+4*mul] and data[i+4*mul] > data[i+5*mul] and data[i+5*mul] > data[i+6*mul]):
            peaks.append(i+3)
    return peaks


def curve_fit(filepath):
    rawDtataFrame = pdcreator(filepath)
    rawDtataFrame.to_csv(CSV_SAVE_PATH, index=False)
    return CSV_SAVE_PATH


def curve_param(filepath):
    print(filepath)
