import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS

# Create the SQLite database and user table
def create_database():
    conn = sqlite3.connect("sentinel_user_data.db")
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            ip_address TEXT,
            location TEXT
        )
    ''')
    conn.commit()
    conn.close()
    print("Database and table created.")

# Flask
app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    ip_address = data.get("ip_address")
    location = data.get("location")

    try:
        conn = sqlite3.connect("sentinel_user_data.db")
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO users (username, email, password, ip_address, location)
            VALUES (?, ?, ?, ?, ?)
        ''', (username, email, password, ip_address, location))
        conn.commit()
        conn.close()
        return jsonify({"message": "User added successfully."}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Username already exists."}), 409
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/verify_user', methods=['POST'])
def verify_user():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    try:
        conn = sqlite3.connect("sentinel_user_data.db")
        cursor = conn.cursor()
        cursor.execute('''
            SELECT * FROM users WHERE username = ? AND password = ?
        ''', (username, password))
        user = cursor.fetchone()
        conn.close()
        
        if user:
            return jsonify({"message": "true"}), 200
        else:
            return jsonify({"error": "false"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    create_database()
    app.run(debug=True)