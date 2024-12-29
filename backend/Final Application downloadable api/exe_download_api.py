from flask import Flask, send_file, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

@app.route('/download', methods=['GET'])
def download_file():
    try:
        print("Request received.")
        return send_file(
            r"g:\sem8\Capstone\Codes\Final code working API csv call\dist\Sentinel AI.exe",
            as_attachment=True
        )
    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True, port=4000)
