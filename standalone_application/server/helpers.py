from os.path import join, dirname, realpath
from werkzeug.utils import secure_filename


ALLOWED_EXTENSIONS = {'txt', 'lc', 'dat', 'xls', 'fits', 'csv'}


XSM_UPLOAD_FOLDER = join(dirname(realpath(__file__)),
                         'static/temp_xsm')


def allow_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def save_file(file):
    filename = secure_filename(file.filename)
    file.save(join(XSM_UPLOAD_FOLDER, "xsm_curve." +
              filename.rsplit('.', 1)[1].lower()))
    filepath = join(XSM_UPLOAD_FOLDER, "xsm_curve." +
                    filename.rsplit('.', 1)[1].lower())
    return filepath
