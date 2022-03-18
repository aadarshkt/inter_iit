from os.path import join, dirname, realpath
from werkzeug.utils import secure_filename


ALLOWED_EXTENSIONS = {'txt', 'lc', 'dat', 'xls', 'fits', 'csv'}


XSM_UPLOAD_FOLDER = join(dirname(realpath(__file__)),
                         'static/temp_xsm')

SAVE_PARAMS_CSV_PATH = join(dirname(realpath(__file__)),
                            'static/temp_csv/xsm_params.csv')

SAVE_CURVE_DATA_CSV_PATH = join(dirname(realpath(__file__)),
                                'static/temp_csv/xsm_curvedata.csv')


def save_curve_data(dataframe):
    dataframe.to_csv(SAVE_CURVE_DATA_CSV_PATH, index=False)
    return SAVE_CURVE_DATA_CSV_PATH


def save_params(dataframe):
    dataframe.to_csv(SAVE_PARAMS_CSV_PATH, index=False)
    return SAVE_PARAMS_CSV_PATH


def allow_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def save_file(file):
    filename = secure_filename(file.filename)
    file.save(join(XSM_UPLOAD_FOLDER, "xsm_curve." +
              filename.rsplit('.', 1)[1].lower()))
    filepath = join(XSM_UPLOAD_FOLDER, "xsm_curve." +
                    filename.rsplit('.', 1)[1].lower())
    return filepath
