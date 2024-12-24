import pandas as pd
import numpy as np
from sklearn.preprocessing import OneHotEncoder, LabelEncoder, MinMaxScaler

# Load dataset
data = pd.read_csv(r'path_to_your_data.csv')

# Encode 'Protocol' using Label Encoding (for the OneHotEncoder to work)
le = LabelEncoder()
data['ProtocolEncoded'] = le.fit_transform(data['Protocol'])
protocols = data['Protocol'].unique()

# One-hot encode 'Protocol'
encoder = OneHotEncoder()
protocol_ohe = encoder.fit_transform(data['ProtocolEncoded'].values.reshape(-1, 1))
protocol_ohe = protocol_ohe.toarray()

# Normalize 'Length' column
scaler = MinMaxScaler(feature_range=(-1, 1))
data['Length'] = scaler.fit_transform(data[['Length']])

# Remove non-numeric columns (Source and Destination) for GAN training
data = data.drop(columns=['Source', 'Destination', 'Protocol'])

# Combine the one-hot encoded 'Protocol' column with the normalized 'Length'
final_data = np.concatenate((protocol_ohe, data[['Length']].values), axis=1)

# Save the normalized data (optional)
normalized_data = pd.DataFrame(final_data)
normalized_data.to_csv(r'G:\sem8\Capstone\Data\Normalise\normalized_network_data.csv', index=False)

# Check the result
print(normalized_data.head())
