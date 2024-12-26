import random
import re
from flask import Flask, request, send_file
from flask_cors import CORS
import pandas as pd
import numpy as np
import tensorflow as tf
from io import BytesIO

app = Flask(__name__)
CORS(app)

# Path to the generator model
generator_model_path = "./backend/Trained_model/generator_model.h5"
generator = tf.keras.models.load_model(generator_model_path)

latent_dim = 100
protocols = ['BJNP', 'BROWSER', 'CAPWAP-Control', 'DNS', 'HTTP', 'ICMP', 'IGMPv1', 'IGMPv2', 'IPP', 
             'IPv4', 'MDNS', 'NBNS', 'QUIC', 'SSL', 'TCP', 'TLSv1.2', 'TLSv1.3', 'UDP']

min_length = 71
max_length = 477

def inverse_transform_length(normalized_value, min_val, max_val):
    return (normalized_value + 1) * (max_val - min_val) / 2 + min_val

def generate_random_ip():
    return '.'.join(str(random.randint(0, 255)) for _ in range(4))

def generate_and_format_synthetic_data(generator, ip, num_samples=100):
    noise = np.random.normal(0, 1, (num_samples, latent_dim))
    synthetic_data = generator.predict(noise)

    normalized_lengths = synthetic_data[:, 0]
    protocol_one_hot = synthetic_data[:, 1:]
    lengths = [inverse_transform_length(val, min_length, max_length) for val in normalized_lengths]

    protocol_indices = np.argmax(protocol_one_hot, axis=1)
    decoded_protocols = [protocols[idx] for idx in protocol_indices]
    random_ips = [generate_random_ip() for _ in range(num_samples)]

    formatted_data = pd.DataFrame({
        'Source IP': [ip] * num_samples,
        'Protocol': decoded_protocols,
        'Length': lengths,
        'Destination IP': random_ips
    })
    return formatted_data

@app.route('/generate-data', methods=['POST'])
def generate_data():
    try:
        data = request.json
        ip = data.get('ip')
        rows = int(data.get('rows', 100))
        if not ip or rows <= 0:
            return {'error': 'Invalid input'}, 400

        formatted_data = generate_and_format_synthetic_data(generator, ip, num_samples=rows)
        csv_output = BytesIO()
        formatted_data.to_csv(csv_output, index=False)
        csv_output.seek(0)

        return send_file(csv_output, mimetype='text/csv', as_attachment=True, download_name="synthetic_network_data.csv")
    except Exception as e:
        print(e)
        return {'error': 'An error occurred while generating the data'}, 500

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
