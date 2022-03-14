ALLOWED_EXTENSIONS = {'txt', 'lc', 'dat', 'xls', 'fits', 'csv'}


def allow_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
