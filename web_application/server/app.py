from flask import Flask, jsonify, request, Response
from flask_cors import CORS
from flask_cors import cross_origin
from helpers import allow_file, save_file
from ml_model import curve_fit, curve_param

app = Flask(__name__)


CORS(app)


@app.route("/", methods=['GET', 'POST'])
@cross_origin()
def members():
    if(request.method == 'POST'):
        if 'file' not in request.files:
            return "File is not selected", 400
        file = request.files['file']
        if(file.filename == ''):
            return "No file Selected", 400
        if file and allow_file(file.filename):
            filepath = save_file(file)
            # curve_param(filepath)
            csv_fitted_path = curve_fit(filepath)
            with open(csv_fitted_path) as fp:
                csv = fp.read()
            return Response(
                csv,
                mimetype="text/csv",
                headers={"Content-disposition":
                         "attachment; filename=myplot.csv"}), 200


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
