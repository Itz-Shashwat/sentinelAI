import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, models, optimizers
import os
import matplotlib.pyplot as plt


generator_model_path = r'G:\sem8\Capstone\Codes\git repo\sentinelAI\backend\Trained model\generator_model.h5'
discriminator_model_path = r'G:\sem8\Capstone\Codes\git repo\sentinelAI\backend\Trained model\discriminator_model.h5'
gan_model_path = r'G:\sem8\Capstone\Codes\git repo\sentinelAI\backend\Trained model\gan_model.h5'
csv_file_path = r'G:\sem8\Capstone\Codes\git repo\sentinelAI\backend\Data\normal data\processed_data.csv'
output_csv_path = r'G:\sem8\Capstone\Codes\git repo\sentinelAI\backend\Data\generated data\synthetic_network_data.csv'



# Load and preprocess data
def load_data(csv_file_path):
    # Load data
    df = pd.read_csv(csv_file_path)

    # Normalizing column 1 to -1
    features = df.drop(columns=['Normalized_Length'])
    normalized_data = (features - features.min()) / (features.max() - features.min()) * 2 - 1
    normalized_data['Normalized_Length'] = df['Normalized_Length']  # Keep normalized length intact

    return normalized_data


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

def build_discriminator(input_shape):
    model = models.Sequential()
    model.add(layers.Dense(1024, input_dim=input_shape, activation='relu'))
    model.add(layers.Dense(512, activation='relu'))
    model.add(layers.Dense(256, activation='relu'))
    model.add(layers.Dense(1, activation='sigmoid'))  
    return model

# Combining both
def build_gan(generator, discriminator):
    model = models.Sequential()
    model.add(generator)
    discriminator.trainable = False  # freeze discriminator
    model.add(discriminator)
    return model

# Save 
def save_model(model, model_name):
    model.save(model_name)
    print(f"{model_name} saved!")

# train GAN
def train_gan(data, epochs, batch_size, latent_dim=100):
    generator = build_generator(latent_dim, data.shape[1])
    discriminator = build_discriminator(data.shape[1])
    gan = build_gan(generator, discriminator)
    
    generator.compile(loss='binary_crossentropy', optimizer=optimizers.Adam(0.0002, 0.5))
    discriminator.compile(loss='binary_crossentropy', optimizer=optimizers.Adam(0.0002, 0.5))
    gan.compile(loss='binary_crossentropy', optimizer=optimizers.Adam(0.0002, 0.5))
    
    for epoch in range(epochs):
        # Train discriminator
        idx = np.random.randint(0, data.shape[0], batch_size)
        real_data = data.iloc[idx].to_numpy()

        # Generate fake data
        noise = np.random.normal(0, 1, (batch_size, latent_dim))
        fake_data = generator.predict(noise)
        
        # Labels for real and fake data
        real_labels = np.ones((batch_size, 1))  # Shape must match discriminator output
        fake_labels = np.zeros((batch_size, 1))  # Shape must match discriminator output
        
        # Train discriminator 
        d_loss_real = discriminator.train_on_batch(real_data, real_labels)
        d_loss_fake = discriminator.train_on_batch(fake_data, fake_labels)
        
        # Train generator
        noise = np.random.normal(0, 1, (batch_size, latent_dim))
        valid_labels = np.ones((batch_size, 1))  # Trick discriminator 
        g_loss = gan.train_on_batch(noise, valid_labels)

        if epoch % 1000 == 0:  # Adjust log interval as needed
            print(f"Epoch {epoch}/{epochs}, D Loss Real: {d_loss_real}, D Loss Fake: {d_loss_fake}, G Loss: {g_loss}")

    return generator, discriminator, gan


# Function to generate decoy data using the trained GAN
def generate_decoy_data(generator, latent_dim=100, num_samples=100):
    noise = np.random.randn(num_samples, latent_dim)
    decoy_data = generator.predict(noise)
    return decoy_data



# Load data 
data = load_data(csv_file_path)

# Train GAN 
trained_generator, trained_discriminator, trained_gan = train_gan(data, epochs=10000, batch_size=64)

# Generate decoy data 
decoy_data = generate_decoy_data(trained_generator, latent_dim=100, num_samples=10)

# Convert decoy data 
decoy_df = pd.DataFrame(decoy_data, columns=data.columns)
print(decoy_df.head())

# save data
decoy_df.to_csv(output_csv_path, index=False)
