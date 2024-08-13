from flask import Flask, jsonify, request # type: ignore
from flask_cors import CORS # type: ignore

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes



@app.route('/api/data/calc', methods=['POST']) 
def calculator():
    data = request.get_json()
    num1 = data.get('num1', 0)
    num2 = data.get('num2', 0)
    operation = data.get('operation', 'add')

    if operation == 'add':
        result = num1 + num2
        operation_name = 'addition'
    elif operation == 'subtract':
        result = num1 - num2
        operation_name = 'subtraction'
    elif operation == 'multiply':
        result = num1 * num2
        operation_name = 'multiplication'
    elif operation == 'divide':
        if num2 == 0:
            return jsonify({"error": "Division by zero is not allowed"}), 400
        result = num1 / num2
        operation_name = 'division'
    else:
        return jsonify({"error": "Invalid operation"}), 400

    return jsonify({"result": f"{result}"})


if __name__ == '__main__':
    app.run(debug=True)
