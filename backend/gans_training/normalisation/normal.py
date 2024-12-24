import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler, OneHotEncoder
import threading

# latest
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

def thread_preprocess(csv_file_path, output_file_path):
    global processed_data
    processed_data = preprocess_data_from_csv(csv_file_path)
    
    processed_data.to_csv(output_file_path, index=False)

csv_file_path = 'G:\\sem8\\Capstone\\Codes\\git repo\\sentinelAI\\backend\\Data\\raw data\\filtered_data.csv'
output_file_path = 'G:\\sem8\\Capstone\\Codes\\git repo\\sentinelAI\\backend\\Data\\normal data\\processed_data.csv'  # Output file path

preprocess_thread = threading.Thread(target=thread_preprocess, args=(csv_file_path, output_file_path))
preprocess_thread.start()
preprocess_thread.join()  

print(processed_data.head())
