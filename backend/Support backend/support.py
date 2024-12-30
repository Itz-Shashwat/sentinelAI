from flask import Flask, request, jsonify
import csv
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allows Cross-Origin Requests for your React frontend

# CSV file pat
ISSUES_FILE = r"G:\sem8\Capstone\Codes\git repo\sentinelAI\backend\Support backend\issues.csv"

@app.route('/api/issues', methods=['POST'])
def log_issue():
    try:
        # Get JSON data from the request
        data = request.json
        name = data.get('name', '')
        email = data.get('email', '')
        issue = data.get('issue', '')
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        # Write data to CSV
        with open(ISSUES_FILE, mode='a', newline='') as file:
            writer = csv.writer(file)
            writer.writerow([timestamp, name, email, issue])

        return jsonify({"message": "Issue logged successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=1000, debug=True)
