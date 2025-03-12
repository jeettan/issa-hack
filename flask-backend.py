from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

word = "great"

CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/validate_guess', methods=['POST'])
def validate_guess():
    data = request.get_json()

    res = ["", "", "", "", ""]

    green_words = list(word)

    for i in range(5):
        if data[i] == word[i]:
            res[i] = "green"
            green_words.remove(data[i])
        elif data[i] in green_words:
            res[i] = "yellow"
            green_words.remove(data[i])
        else:
            res[i] = "empty"
    
    return jsonify({'result': res})

if __name__ == "__main__":
    app.run(debug=True)