import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, models, optimizers
import os

# Paths
generator_model_path = r'G:\sem8\Capstone\Codes\git repo\sentinelAI\backend\Trained model\generator_model.h5'
discriminator_model_path = r'G:\sem8\Capstone\Codes\git repo\sentinelAI\backend\Trained model\discriminator_model.h5'
gan_model_path = r'G:\sem8\Capstone\Codes\git repo\sentinelAI\backend\Trained model\gan_model.h5'
csv_file_path = r'G:\sem8\Capstone\Codes\git repo\sentinelAI\backend\Data\normal data\processed_data.csv'
output_csv_path = r'G:\sem8\Capstone\Codes\git repo\sentinelAI\backend\Data\generated data\synthetic_network_data.csv'

# Load and preprocess data
def load_data(csv_file_path):
    df = pd.read_csv(csv_file_path)
    features = df.drop(columns=['Normalized_Length'])
    normalized_data = (features - features.min()) / (features.max() - features.min()) * 2 - 1
    normalized_data['Normalized_Length'] = df['Normalized_Length']
    return normalized_data

# Define Generator
def build_generator(latent_dim, input_shape):
    model = models.Sequential()
    model.add(layers.Dense(256, input_dim=latent_dim, activation='relu'))
    model.add(layers.BatchNormalization())
    model.add(layers.Dense(512, activation='relu'))
    model.add(layers.BatchNormalization())
    model.add(layers.Dense(1024, activation='relu'))
    model.add(layers.BatchNormalization())
    model.add(layers.Dense(input_shape, activation='tanh'))
    return model

# Define Discriminator
def build_discriminator(input_shape):
    model = models.Sequential()
    model.add(layers.Dense(1024, input_dim=input_shape, activation='relu'))
    model.add(layers.Dense(512, activation='relu'))
    model.add(layers.Dense(256, activation='relu'))
    model.add(layers.Dense(1, activation='sigmoid'))  # Binary output: real or fake
    return model

# Combine the generator and discriminator into a GAN
def build_gan(generator, discriminator):
    model = models.Sequential()
    model.add(generator)
    discriminator.trainable = False  # Freeze discriminator during GAN training
    model.add(discriminator)
    return model

# Function to train GAN
def train_gan(data, epochs, batch_size, latent_dim=100):
    generator = build_generator(latent_dim, data.shape[1])
    discriminator = build_discriminator(data.shape[1])
    gan = build_gan(generator, discriminator)

    generator.compile(loss='binary_crossentropy', optimizer=optimizers.Adam(0.0002, 0.5))
    discriminator.compile(loss='binary_crossentropy', optimizer=optimizers.Adam(0.0002, 0.5))
    gan.compile(loss='binary_crossentropy', optimizer=optimizers.Adam(0.0002, 0.5))

    for epoch in range(epochs + 1):  # Adjust log interval as needed
        idx = np.random.randint(0, data.shape[0], batch_size)
        real_data = data.iloc[idx].to_numpy()

        noise = np.random.normal(0, 1, (batch_size, latent_dim))
        fake_data = generator.predict(noise)

        real_labels = np.ones((batch_size, 1))
        fake_labels = np.zeros((batch_size, 1))

        d_loss_real = discriminator.train_on_batch(real_data, real_labels)
        d_loss_fake = discriminator.train_on_batch(fake_data, fake_labels)

        noise = np.random.normal(0, 1, (batch_size, latent_dim))
        valid_labels = np.ones((batch_size, 1))
        g_loss = gan.train_on_batch(noise, valid_labels)

        if epoch % 1000 == 0:
            print(f"Epoch {epoch}/{epochs}, D Loss Real: {d_loss_real}, D Loss Fake: {d_loss_fake}, G Loss: {g_loss}")
            # Save models (overwrite existing files)
            generator.save(generator_model_path)
            discriminator.save(discriminator_model_path)
            gan.save(gan_model_path)
            print(f"Models saved at epoch {epoch}")

    return generator, discriminator, gan

# Function to generate decoy data
def generate_decoy_data(generator, latent_dim=100, num_samples=100):
    noise = np.random.randn(num_samples, latent_dim)
    decoy_data = generator.predict(noise)
    return decoy_data

# Main execution
data = load_data(csv_file_path)

trained_generator, trained_discriminator, trained_gan = train_gan(
    data, 
    epochs=10000, 
    batch_size=64
)

# Generate and save synthetic data
decoy_data = generate_decoy_data(trained_generator, latent_dim=100, num_samples=10)
decoy_df = pd.DataFrame(decoy_data, columns=data.columns)
decoy_df.to_csv(output_csv_path, index=False)
print("Synthetic data generated and saved!")
