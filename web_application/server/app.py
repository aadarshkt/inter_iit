from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_cors import cross_origin
from werkzeug.utils import secure_filename
from os.path import join, dirname, realpath
from helpers import allow_file
from ml_model import curve_fit, curve_param

UPLOAD_FOLDER = join(dirname(realpath(__file__)),
                     'static/uploaded_xms_files')
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

CORS(app)


@app.route("/", methods=['POST'])
@cross_origin()
def members():
    print(UPLOAD_FOLDER)
    if(request.method == 'POST'):
        if 'file' not in request.files:
            return "File is not selected", 400
        file = request.files['file']
        if(file.filename == ''):
            return "No file Selected", 400
        if file and allow_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(join(
                app.config['UPLOAD_FOLDER'], "xms_curve." + filename.rsplit('.', 1)[1].lower()))
            filepath = join(
                app.config['UPLOAD_FOLDER'], "xms_curve." + filename.rsplit('.', 1)[1].lower())
            curve_param(filepath)
            curve_fit(filepath)
            return "SAVED SUCCESSFULY", 200


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
