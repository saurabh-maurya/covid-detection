# Import libraries
import numpy as np
from flask import Flask, request, jsonify
import joblib
app = Flask(__name__)
# Load the model
model = joblib.load("covid_model.pkl")
scaler = joblib.load("covid_scaler.pkl")
@app.route('/predictCovidStatus',methods=['POST'])
def predict():
    # Get the data from the POST request.
    data = request.get_json(force=True)
    nums = list(map(int, data['Ques']))
    scaled_data = scaler.transform([nums])
    # Make prediction using model loaded from disk as per the data.

    prediction = model.predict(scaled_data)
    # Take the first value of prediction
    output = prediction[0]
    return jsonify(output)
if __name__ == '__main__':
    app.run(port=5000, debug=True)