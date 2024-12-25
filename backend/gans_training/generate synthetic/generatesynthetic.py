import pandas as pd
import numpy as np
import tensorflow as tf
from sklearn.preprocessing import MinMaxScaler, OneHotEncoder

# Paths
generator_model_path = r'G:\sem8\Capstone\Codes\git repo\sentinelAI\backend\Trained model\generator_model.h5'
output_csv_path = r'G:\sem8\Capstone\Codes\git repo\sentinelAI\backend\Data\generated data\synthetic_network_data_formatted.csv'

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

# Generate synthetic data
def generate_and_format_synthetic_data(generator, num_samples=100):
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

    # Create a DataFrame with the original format
    formatted_data = pd.DataFrame({
        'Protocol': decoded_protocols,
        'Length': lengths
    })
    return formatted_data

# Generate and save formatted synthetic data
formatted_data = generate_and_format_synthetic_data(generator, num_samples=100)
formatted_data.to_csv(output_csv_path, index=False)
print(f"Synthetic data saved at {output_csv_path}")
