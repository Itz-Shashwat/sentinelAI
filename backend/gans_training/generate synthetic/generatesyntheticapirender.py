import random
import re
from flask import Flask, request, send_file
from flask_cors import CORS  # Enable cross-origin resource sharing
import pandas as pd
import numpy as np
import tensorflow as tf
from io import BytesIO
from sklearn.preprocessing import MinMaxScaler, OneHotEncoder

app = Flask(__name__)

# Enable CORS
CORS(app)

# Paths
generator_model_path = 'backend/Trained model/generator_model.h5'

# Load the trained generator model
generator = tf.keras.models.load_model(generator_model_path)

# Define latent dimension (same as used in training)
latent_dim = 100

# OneHotEncoder mapping (used during training)
protocols = ['BJNP', 'BROWSER', 'CAPWAP-Control', 'DNS', 'HTTP', 'ICMP', 'IGMPv1', 'IGMPv2', 'IPP', 'IPv4', 'MDNS', 'NBNS', 'QUIC', 'SSL', 'TCP', 'TLSv1.2', 'TLSv1.3', 'UDP']

# Min and Max values for Length (used during training normalization)
min_length = 71  # Replace with the actual minimum length in your dataset
max_length = 477  # Replace with the actual maximum length in your dataset

# Function to reverse normalization of the length
def inverse_transform_length(normalized_value, min_val, max_val):
    return (normalized_value + 1) * (max_val - min_val) / 2 + min_val

# Function to generate random IP address
def generate_random_ip():
    return '.'.join(str(random.randint(0, 255)) for _ in range(4))

# Function to generate and format synthetic data
def generate_and_format_synthetic_data(generator, ip, num_samples=100):
    noise = np.random.normal(0, 1, (num_samples, latent_dim))
    synthetic_data = generator.predict(noise)

    # Split synthetic data into normalized length and one-hot encoded protocols
    normalized_lengths = synthetic_data[:, 0]
    protocol_one_hot = synthetic_data[:, 1:]

    # Inverse transform length
    lengths = [inverse_transform_length(val, min_length, max_length) for val in normalized_lengths]

    # Decode protocols
    protocol_indices = np.argmax(protocol_one_hot, axis=1)
    decoded_protocols = [protocols[idx] for idx in protocol_indices]

    # Generate random IP addresses for each row
    random_ips = [generate_random_ip() for _ in range(num_samples)]

    # Create a DataFrame with the original format and add the IP as the first column
    formatted_data = pd.DataFrame({
        'Source IP': [ip] * num_samples,  # Add IP address for each row
        'Protocol': decoded_protocols,
        'Length': lengths,
        'Destination IP': random_ips  # Add random IP addresses to the DataFrame
    })
    return formatted_data

# Flask route to handle data generation request
@app.route('/generate-data', methods=['POST'])
def generate_data():
    try:
        # Get data from the request
        data = request.json
        ip = data.get('ip')
        rows = int(data.get('rows'))
        print("IP address received:", ip)

        if not ip or rows <= 0:
            return {'error': 'Invalid input'}, 400

        # Generate the synthetic data
        formatted_data = generate_and_format_synthetic_data(generator, ip, num_samples=rows)

        # Convert the DataFrame to a CSV (in-memory)
        csv_output = BytesIO()
        formatted_data.to_csv(csv_output, index=False)
        csv_output.seek(0)

        # Return the CSV file as a response
        return send_file(csv_output, mimetype='text/csv', as_attachment=True, download_name="synthetic_network_data.csv")

    except Exception as e:
        print(e)
        return {'error': 'An error occurred while generating the data'}, 500

# Entry point for Render (no port specified, Render provides it)
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
