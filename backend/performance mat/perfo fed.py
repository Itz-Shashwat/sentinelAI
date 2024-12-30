import numpy as np
import matplotlib.pyplot as plt
from scipy.linalg import sqrtm
import random

# -------------------- 1. Loss Curves --------------------

# Simulating loss data for Generator and Discriminator
epochs = np.arange(1, 101)  # 100 epochs
generator_loss = np.exp(-epochs/30) + np.random.normal(0, 0.05, len(epochs))  # Simulated generator loss (decaying)
discriminator_loss = np.exp(-epochs/35) + np.random.normal(0, 0.05, len(epochs))  # Simulated discriminator loss (decaying)

# Plotting the Loss Curves
plt.figure(figsize=(10, 6))
plt.plot(epochs, generator_loss, label="Generator Loss", color='blue')
plt.plot(epochs, discriminator_loss, label="Discriminator Loss", color='red')
plt.xlabel('Epochs')
plt.ylabel('Loss')
plt.title('Loss Curves of Generator and Discriminator')
plt.legend()
plt.grid(True)
plt.show()


# -------------------- 2. Frechet Inception Distance (FID) --------------------

# Simulating real data and generated data as 100-dimensional feature vectors
# Randomly creating "real" and "generated" feature vectors
real_data = np.random.randn(1000, 100)  # 1000 real samples (100 features)
generated_data = np.random.randn(1000, 100)  # 1000 generated samples (100 features)

# Function to calculate the Fréchet Inception Distance (FID)
def calculate_fid(real_data, generated_data):
    # Calculate mean and covariance of real and generated data
    mu_real, sigma_real = np.mean(real_data, axis=0), np.cov(real_data, rowvar=False)
    mu_fake, sigma_fake = np.mean(generated_data, axis=0), np.cov(generated_data, rowvar=False)

    # Calculate the difference in means
    diff = mu_real - mu_fake

    # Compute the matrix sqrtm of covariance product
    covmean = sqrtm(sigma_real.dot(sigma_fake))
    
    # If numerically unstable, use a safe approach
    if np.isnan(covmean).any():
        covmean = np.real(covmean)

    # Calculate FID score
    fid = np.sum(diff**2) + np.trace(sigma_real + sigma_fake - 2.0 * covmean)
    return fid

# Compute the FID score
fid_score = calculate_fid(real_data, generated_data)
print(f"Frechet Inception Distance (FID): {fid_score}")

# To generate a picture, we could visualize the "real" and "generated" data distributions

# Visualizing the first two features of the data for "picture-like" visualization
plt.figure(figsize=(10, 6))
plt.scatter(real_data[:, 0], real_data[:, 1], color='blue', alpha=0.5, label='Real Data')
plt.scatter(generated_data[:, 0], generated_data[:, 1], color='red', alpha=0.5, label='Generated Data')
plt.xlabel('Feature 1')
plt.ylabel('Feature 2')
plt.title('Real vs Generated Data (2D Visualization)')
plt.legend()
plt.grid(True)
plt.show()
