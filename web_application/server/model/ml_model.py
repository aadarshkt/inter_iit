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
                     '../static/temp_csv/xsm_curve.csv')


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


def convolve(data, width=60):
    data['CONVOLVED_RATE'] = conv(np.array(data['RATE']),
                                  kernel=g1d(width), boundary='extend')


def curve_fit(filepath):
    xsmDataFrame = pdcreator(filepath)
    xsmDataFrame = xsmDataFrame.drop(['ERROR', 'FRACEXP'], axis=1)
    convolve(xsmDataFrame)
    xsmDataFrame.to_csv(CSV_SAVE_PATH, index=False)
    return CSV_SAVE_PATH


def curve_param(filepath):
    print(filepath)
