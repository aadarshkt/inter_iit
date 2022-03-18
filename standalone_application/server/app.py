from flask import Flask, jsonify, request, Response
from flask_cors import CORS
from flask_cors import cross_origin
from numpy import convolve
from helpers import allow_file, save_file, save_curve_data, save_params
from model.model import Curve_Fitter
from model.model import convolve_curve

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
            a = Curve_Fitter(filepath)
            peakParams = a.params()
            curveData = convolve_curve(filepath)
            curveData['STICHEDRATE'] = a.sticher()
            curveDataPath = save_curve_data(curveData)
            PeakParamsPath = save_params(peakParams)
            with open(PeakParamsPath) as fp:
                peakParamsCsv = fp.read()
            with open(curveDataPath) as fp:
                CurveDataCsv = fp.read()
            backgroundflux = a.bdata
            print(type(backgroundflux), type(
                peakParamsCsv), type(CurveDataCsv))
            returnData = {
                "backgroundflux": str(backgroundflux),
                "peakParams": peakParamsCsv,
                "curveData": CurveDataCsv
            }

            return jsonify(returnData)
            # print(backgroundflux)
            # print(curveData)
            # print(params)
            # print("hello")
            # return Response(
            #     data="backgroundflux": backgroundflux,
            #     mimetype="text/csv",
            #     headers={"Content-disposition":
            #              "attachment; filename=myplot.csv"}), 200

            # csv_fitted_path = curve_fit(filepath)
            # with open(csv_fitted_path) as fp:
            #     csv = fp.read()


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
