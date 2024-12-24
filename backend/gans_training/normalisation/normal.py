import pandas as pd
import numpy as np
from sklearn.preprocessing import OneHotEncoder, LabelEncoder, MinMaxScaler

data = pd.read_csv(r'G:\sem8\Capstone\Codes\git repo\sentinelAI\backend\Data\raw data\filtered_data.csv')

le = LabelEncoder()
data['ProtocolEncoded'] = le.fit_transform(data['Protocol'])
protocols = data['Protocol'].unique()

encoder = OneHotEncoder()
protocol_ohe = encoder.fit_transform(data['ProtocolEncoded'].values.reshape(-1, 1))
protocol_ohe = protocol_ohe.toarray()

scaler = MinMaxScaler(feature_range=(-1, 1))
data['Length'] = scaler.fit_transform(data[['Length']])

data = data.drop(columns=['Source', 'Destination', 'Protocol'])

final_data = np.concatenate((protocol_ohe, data[['Length']].values), axis=1)

normalized_data = pd.DataFrame(final_data)
normalized_data.to_csv(r'G:\sem8\Capstone\Codes\git repo\sentinelAI\backend\Data\normal data\normalized_network_data.csv', index=False)

print(normalized_data.head())
