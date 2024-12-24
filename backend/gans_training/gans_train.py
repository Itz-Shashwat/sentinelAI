import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from sklearn.preprocessing import OneHotEncoder, LabelEncoder, MinMaxScaler
import concurrent.futures
import os

# Load dataset
data = pd.read_csv(r'G:\sem8\Capstone\Data\Normalise\datanormal.csv')

# Encode 'Protocol' as integers
le = LabelEncoder()
data['ProtocolEncoded'] = le.fit_transform(data['Protocol'])
protocols = data['Protocol'].unique()

# One-hot encode 'Protocol'
encoder = OneHotEncoder(sparse=False)
protocol_ohe = encoder.fit_transform(data['ProtocolEncoded'].values.reshape(-1, 1))

# Normalize 'Length' and other features
scaler = MinMaxScaler(feature_range=(-1, 1))
scaled_data = scaler.fit_transform(data.drop('Protocol', axis=1))  # Exclude 'Protocol' column from scaling
scaled_data = np.concatenate((protocol_ohe, scaled_data), axis=1)

# Set up input data
gan_input_data = scaled_data

latent_dim = 50

def build_generator(latent_dim, num_protocols):
    model = keras.Sequential([
        layers.Dense(64, activation="relu", input_dim=latent_dim),
        layers.Dense(32, activation="relu"),
        layers.Dense(num_protocols + 1, activation='tanh')  # +1 for 'Length' column
    ])
    return model

def build_discriminator(num_protocols):
    model = keras.Sequential([
        layers.Dense(32, activation="relu", input_dim=num_protocols + 1),
        layers.Dense(64, activation="relu"),
        layers.Dense(1, activation='sigmoid')
    ])
    return model

num_protocols = len(protocols)
generator = build_generator(latent_dim, num_protocols)
discriminator = build_discriminator(num_protocols)

# Compile the discriminator
discriminator.compile(loss='binary_crossentropy', optimizer=keras.optimizers.Adam(learning_rate=0.0002, beta_1=0.5))

# Create the GAN model
z = layers.Input(shape=(latent_dim,))
img = generator(z)
discriminator.trainable = False
validity = discriminator(img)
gan = keras.Model(z, validity)
gan.compile(loss='binary_crossentropy', optimizer=keras.optimizers.Adam(learning_rate=0.0002, beta_1=0.5))

# **Train GAN**
batch_size = 32
valid = np.ones((batch_size, 1))
fake = np.zeros((batch_size, 1))

# Function for fetching real data in parallel using ThreadPoolExecutor
def get_real_batch(batch_size):
    idx = np.random.randint(0, gan_input_data.shape[0], batch_size)
    real_data = gan_input_data[idx]
    return real_data

# Function to train the GAN, using parallel data generation
def train_gan(epoch, batch_size):
    noise = np.random.normal(0, 1, (batch_size, latent_dim))
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
        future_real_data = executor.submit(get_real_batch, batch_size)
        future_gen_data = executor.submit(generator.predict, noise)
        
        real_data = future_real_data.result()
        gen_data = future_gen_data.result()

    # Train discriminator with real and fake data
    d_loss_real = discriminator.train_on_batch(real_data, valid)
    d_loss_fake = discriminator.train_on_batch(gen_data, fake)
    d_loss = 0.5 * np.add(d_loss_real, d_loss_fake)
    
    # Train generator
    g_loss = gan.train_on_batch(noise, valid)

    return d_loss, g_loss

# Training loop
for epoch in range(10000):
    d_loss, g_loss = train_gan(epoch, batch_size)

    if epoch % 100 == 0:
        print(f"Epoch {epoch+1}, D loss: {d_loss}, G loss: {g_loss}")

# Save models after training
if not os.path.exists('trained_models'):
    os.makedirs('trained_models')

generator.save(r'G:\sem8\Capstone\Data\Trained_model\trained_models/generator_model.h5')
discriminator.save(r'G:\sem8\Capstone\Data\Trained_model\trained_models/discriminator_model.h5')
gan.save(r'G:\sem8\Capstone\Data\Trained_model\trained_models/gan_model.h5')

# Generate synthetic data
synthetic_data_count = 100
noise = np.random.normal(0, 1, (synthetic_data_count, latent_dim))
synthetic_data = generator.predict(noise)

# Reconstruct DataFrame from synthetic data
synthetic_data_df = pd.DataFrame(synthetic_data)

# Extract one-hot encoded protocol columns (make sure to map to corresponding protocol names)
protocol_column_names = list(encoder.categories_[0])  # This holds the unique protocol categories used for encoding
all_column_names = protocol_column_names + ['Length']

# Name columns of synthetic data
synthetic_data_df.columns = all_column_names

# Save synthetic data to CSV
synthetic_data_df.to_csv(r'G:\sem8\Capstone\Data\Synthetic data\synthetic_network_data.csv', index=False)

# Check the synthetic data output
print(synthetic_data_df.head())
