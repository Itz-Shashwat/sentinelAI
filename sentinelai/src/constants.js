export const fixedString = `

   					Normalisation:                                                                 
   ���

1. Library Imports:
* import pandas as pd: Imports the pandas library for data manipulation, such as loading and processing CSV files.
* import numpy as np: Imports NumPy, although it's not explicitly used in the script, it is usually imported for numerical operations.
* from sklearn.preprocessing import MinMaxScaler, OneHotEncoder: Imports MinMaxScaler for normalizing data and OneHotEncoder for categorical variable encoding.
* import threading: Imports the threading module to handle concurrent execution, allowing tasks to run in parallel.
2. Data Preprocessing Function:
python
CopyEdit
def preprocess_data_from_csv(csv_file_path):
    df = pd.read_csv(csv_file_path)

    scaler = MinMaxScaler(feature_range=(-1, 1))
    df['Normalized_Length'] = scaler.fit_transform(df[['Length']])

    encoder = OneHotEncoder(sparse_output=False)  
    protocol_encoded = encoder.fit_transform(df[['Protocol']])
    protocol_columns = encoder.categories_[0]

    protocol_df = pd.DataFrame(protocol_encoded, columns=protocol_columns)
    df_normalized = pd.concat([df[['Source', 'Destination']], df[['Normalized_Length']], protocol_df], axis=1)

    columns_to_drop = ['Source', 'Destination', 'Protocol']
    df_normalized = df_normalized.drop(columns=[col for col in columns_to_drop if col in df_normalized.columns])

    return df_normalized
* Purpose: Preprocesses raw network traffic data stored in a CSV file for machine learning use.
Steps:
* CSV Loading: The function loads the CSV file into a pandas dataframe (df).
* Min-Max Scaling:
o A MinMaxScaler is applied to the Length column of the dataframe to normalize its values within a range of -1 to 1.
o The normalized length values are saved as a new column: 'Normalized_Length'.
* One-Hot Encoding:
o OneHotEncoder is used to convert the categorical Protocol column into one-hot encoded columns.
o encoder.fit_transform() performs encoding, and the resulting columns are given the names derived from encoder.categories_.
* Dataframe Creation:
o The normalized Length, Source, Destination, and one-hot encoded Protocol columns are merged to create a new dataframe (df_normalized).
o Unwanted columns (Source, Destination, Protocol) are dropped from df_normalized.
* Return: The processed dataframe is returned, containing the selected columns (Source, Destination, Normalized_Length, and encoded protocol).
3. Threaded Preprocessing Function:
python
CopyEdit
def thread_preprocess(csv_file_path, output_file_path):
    global processed_data
    processed_data = preprocess_data_from_csv(csv_file_path)
    
    processed_data.to_csv(output_file_path, index=False)
* Purpose: This function acts as a wrapper around the preprocess_data_from_csv function, which can be executed in a separate thread to avoid blocking the main execution thread.
* Data Processing:
o The preprocess_data_from_csv function is called to process the raw data located at csv_file_path.
o The resulting processed data is then saved to the specified output_file_path as a CSV file (with the index=False argument to omit row indices in the file).
4. Threading Execution:
python
CopyEdit
csv_file_path = 'G:\\sem8\\Capstone\\Codes\\git repo\\sentinelAI\\backend\\Data\\raw data\\filtered_data.csv'
output_file_path = 'G:\\sem8\\Capstone\\Codes\\git repo\\sentinelAI\\backend\\Data\\normal data\\processed_data.csv'  # Output file path

preprocess_thread = threading.Thread(target=thread_preprocess, args=(csv_file_path, output_file_path))
preprocess_thread.start()
preprocess_thread.join()  

print(processed_data.head())
* Purpose: This section handles the initiation of a background thread to preprocess data, allowing asynchronous execution.
* Thread Setup:
o The file path for the input CSV (filtered_data.csv) and the output CSV (processed_data.csv) is specified.
o A thread (preprocess_thread) is created, targeting the thread_preprocess function and passing the necessary arguments (csv_file_path and output_file_path).
* Thread Start and Wait:
o The start() method begins the thread, executing the data processing task.
o The join() method blocks the main execution until the background thread completes its task.
* Result Display:
o Once the thread finishes, the processed data (processed_data) is printed with head() to show the first few rows.

���





					Training:
���

1. Library Imports:
* import pandas as pd: For data manipulation and analysis. This is primarily used to load, process, and save data in the form of dataframes.
* import numpy as np: Provides support for large, multi-dimensional arrays and matrices, along with a collection of mathematical functions to operate on these arrays.
* import tensorflow as tf: A deep learning framework from Google used for building, training, and deploying machine learning models.
* from tensorflow.keras import layers, models, optimizers: Imports specific functions from Keras, a high-level API for TensorFlow, used for building neural networks.
* import os: Used for file and directory manipulation, though it appears unused in this script.
2. Model and Data Paths:
Variables are defined to store paths to:
* Trained models: File paths for saving or loading pre-trained models of the GAN (Generator, Discriminator, and the GAN itself).
* CSV files: File paths for the input data and the output where the synthetic data will be saved.
3. Data Loading and Preprocessing:
python
CopyEdit
def load_data(csv_file_path):
    df = pd.read_csv(csv_file_path)
    features = df.drop(columns=['Normalized_Length'])
    normalized_data = (features - features.min()) / (features.max() - features.min()) * 2 - 1
    normalized_data['Normalized_Length'] = df['Normalized_Length']
    return normalized_data
* Loads the CSV data using pandas.
* Normalizes all the feature columns except 'Normalized_Length' using min-max normalization, which scales data between -1 and 1.
* Retains the 'Normalized_Length' column without any change.
* Returns the preprocessed data, suitable for training the GAN.
4. GAN Model Architecture:
4.1 Generator Model:
python
CopyEdit
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
* Purpose: Generates fake data that mimics the original data.
* The generator is a neural network with:
o Dense layers: Fully connected layers, where the number of neurons gradually increases.
o BatchNormalization: Helps in stabilizing training by normalizing activations.
o The final layer outputs data shaped to match the real data with tanh activation function.
4.2 Discriminator Model:
python
CopyEdit
def build_discriminator(input_shape):
    model = models.Sequential()
    model.add(layers.Dense(1024, input_dim=input_shape, activation='relu'))
    model.add(layers.Dense(512, activation='relu'))
    model.add(layers.Dense(256, activation='relu'))
    model.add(layers.Dense(1, activation='sigmoid'))
    return model
* Purpose: Classifies data as either real or fake.
* Contains Dense layers and ends with a sigmoid activation to produce binary output (real or fake).
4.3 GAN Model:
python
CopyEdit
def build_gan(generator, discriminator):
    model = models.Sequential()
    model.add(generator)
    discriminator.trainable = False
    model.add(discriminator)
    return model
* Purpose: Combines the generator and discriminator to form the full GAN model.
* The discriminator�s weights are frozen during training the generator (so it doesn�t update while the generator is trained).
5. GAN Training Function:
python
CopyEdit
def train_gan(data, epochs, batch_size, latent_dim=100):
    ...
    for epoch in range(epochs + 1):
        ...
        d_loss_real = discriminator.train_on_batch(real_data, real_labels)
        d_loss_fake = discriminator.train_on_batch(fake_data, fake_labels)
        g_loss = gan.train_on_batch(noise, valid_labels)
        ...
* Purpose: Trains the GAN model over multiple epochs using real and fake data.
* train_on_batch updates the discriminator�s and generator�s weights:
o Discriminator Loss: Measures how well the discriminator classifies real vs. fake data.
o Generator Loss: Measures how well the generator fools the discriminator.
* The models are saved after each epoch (for every 1000th epoch, specifically).
6. Synthetic Data Generation:
python
CopyEdit
def generate_decoy_data(generator, latent_dim=100, num_samples=100):
    noise = np.random.randn(num_samples, latent_dim)
    decoy_data = generator.predict(noise)
    return decoy_data
* Purpose: Generates synthetic data using the trained generator.
* Random noise is passed as input to the generator to produce fake (synthetic) data.
7. Main Execution:
python
CopyEdit
data = load_data(csv_file_path)
trained_generator, trained_discriminator, trained_gan = train_gan(data, epochs=10000, batch_size=64)
decoy_data = generate_decoy_data(trained_generator, latent_dim=100, num_samples=10)
* Purpose: Executes the steps for loading data, training the GAN, and generating synthetic (decoy) data.
* After training, synthetic data is generated and saved in a new CSV file.
8. Saving the Synthetic Data:
python
CopyEdit
decoy_df = pd.DataFrame(decoy_data, columns=data.columns)
decoy_df.to_csv(output_csv_path, index=False)
print("Synthetic data generated and saved!")
* Converts the generated synthetic data into a dataframe.
* Saves the decoy data to a CSV file.
* Outputs a confirmation message.

���


Packet Injection

���
1. Imports:
* Tkinter (tk): A built-in Python library for building the graphical user interface (GUI).
* Messagebox: To display pop-up messages within the GUI.
* Scapy: A powerful Python library for network packet manipulation and analysis. Here, it is used to sniff and inject packets.
* Pandas: For handling and processing CSV data containing network traffic information.
* Requests: To interact with an external API to fetch network traffic data.
* Socket: For handling networking and acquiring the host�s IP address.
* Simpledialog: A Tkinter widget used to prompt the user for input (like asking for the number of rows to fetch).

2. Application Class: DecoyInjectionApp:
The main class that defines the GUI and logic for fetching CSV data, injecting decoy packets, and sniffing real packets.
Constructor (__init__):
This function sets up the GUI interface.
* GUI Components:
o Labels to display the title and status messages.
o Buttons for triggering actions like fetching CSV data and starting packet injection.
o Text Box (Text widget) to display output logs.
o Variables:
* self.file_path stores the path for the fetched CSV.
* self.decoy_data stores the processed decoy data from the CSV.
* self.total_packets_injected: Counts how many decoy packets have been injected.
* Flags: self.input_prompt_shown ensures the input prompt is only shown once.
Fetching CSV from API:
The fetch_csv_from_api function fetches network traffic data from a local API:
* It retrieves the IP address of the local machine.
* Prompts the user for the number of rows to fetch.
* Sends a POST request to the API with the IP and row number.
* If the request is successful, it saves the CSV data locally and checks if it contains the required columns ('Source IP', 'Destination IP', 'Protocol', and 'Length').
* If CSV fetching fails or contains errors, it handles exceptions and shows error messages.
Packet Injection:
The inject_decoy_packet function is responsible for constructing and sending decoy packets over the network. It creates either TCP or UDP packets using the Scapy library based on the protocol field from the CSV data. These packets are then sent to the destination.
The method verify_real_packet is a packet-sniffing callback that continuously listens for real packets on the network:
* Once real packets are detected, it checks if the input_prompt_shown flag is set to prevent repeated prompts and initiates the injection of decoy packets.
ask_for_input handles the user prompting and the continuous injection of decoy packets based on the available CSV data. If there�s no data, it alerts the user.
Sniffing for Real Packets:
* The start_sniffing method triggers the packet sniffing operation in a separate thread, which listens for real network packets using Scapy's sniff() method.
* It captures IP packets and processes them through verify_real_packet.
Injecting Packets Continuously:
* The inject_packets method uses a continuous loop to inject decoy packets from the loaded CSV into the network.

3. GUI Control:
* The main application is built using Tkinter, where all elements (buttons, labels, text box) are displayed on a window (root).
* Threading: The application uses threads for packet sniffing and packet injection so that both operations can run concurrently without blocking the GUI. This ensures that the GUI remains responsive while sniffing or injecting packets.
o Sniffing occurs in a separate thread (sniff_thread), and so does packet injection (inject_thread).

4. Main Application Flow:
* Fetching Data: The user can fetch network traffic data by clicking the "Fetch CSV from API" button.
* Starting Injection: Once the data is fetched, the user can initiate the continuous injection of decoy packets by clicking the "Start Decoy Injection" button.
* Sniffing for Real Packets: As real packets are captured, the decoy packets are continuously injected to obfuscate the real traffic.

5. Key Functions:
* fetch_csv_from_api(): Requests data from a local server, processes and saves it.
* inject_decoy_packet(): Constructs and sends TCP/UDP packets using the data from the CSV.
* verify_real_packet(): Handles the detection of real packets, triggering the packet injection process.
* inject_packets(): Loops through the CSV data and injects packets continuously.
* start_sniffing(): Starts the sniffing process for detecting real packets.
* write_output(): Updates the output box with relevant logs for actions or errors.

6. Running the App:
* Starting Point: When the script is run, it initializes a Tkinter window and creates an instance of DecoyInjectionApp. The Tkinter loop (root.mainloop()) keeps the GUI active and responsive.
���


About software:


Sentinel AI: Network Traffic Decoy Injector
Version:�1.0.0
Last Updated:�December 30, 2024
File Size:�~190 MB
Supported Platforms:�Windows 10/11 (64-bit)
Overview
Sentinel AI is a cutting-edge tool designed for security professionals and network administrators to inject realistic decoy traffic into network environments. By mimicking genuine network traffic patterns, it misleads potential attackers, adds resilience to your system, and enhances threat analysis capabilities.
Key Features
* Automated Decoy Injection: Dynamically inject decoy packets based on real network traffic.
* Protocol Support: Inject traffic for TCP, UDP, or custom protocols.
* CSV Integration: Fetch decoy data directly via API and use preloaded decoy datasets for injection.
* Custom Packet Injection: Specify IP sources, destinations, protocol, and payload size.
* User-Friendly Interface: Intuitive, no-code interface built with Tkinter for efficient handling.
* Real-Time Packet Sniffing: Monitor live traffic and seamlessly inject decoy packets.
System Requirements
Processor:�Intel i3 or equivalent (minimum), Intel i5 or above (recommended).
RAM:�4GB (minimum), 8GB or above (recommended).
Storage:�At least 190MB of free space.





                                                                 




`;
