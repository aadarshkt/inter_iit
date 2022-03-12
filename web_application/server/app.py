from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_cors import cross_origin

app = Flask(__name__)
CORS(app)

@app.route("/", methods=['GET', 'POST'])
@cross_origin()
def members():
    if(request.method == 'GET'):
        res = {
        "countRate" : [
          {
            "x": "22.00",
            "y": 1,
          },
          {
            "x": "23.00",
            "y": 10,
          },
          {
            "x": "00.00",
            "y": 5,
          },
          {
            "x": "01.00",
            "y": 5.5,
          },
        ],
    }
    return jsonify(res)

if __name__ == "main":
    app.run(debug=True)