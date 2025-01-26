import webbrowser
from plantuml import PlantUML

# Define PlantUML server URL
server = PlantUML(url='http://www.plantuml.com/plantuml/img/')

# PlantUML diagram definition
uml_diagram = """
@startuml
class DataLoader {
    - csv_file_path: String
    - output_csv_path: String
    + load_data(): DataFrame
}

class Generator {
    - latent_dim: int
    - input_shape: int
    + build_generator(): Sequential
    + generate_decoy_data(generator: Sequential, latent_dim: int, num_samples: int): DataFrame
}

class Discriminator {
    - input_shape: int
    + build_discriminator(): Sequential
}

class TrainedModel {
    - Synthetic Data: Sequential
    + Generate_synthetic(): Sequential
}

class GAN {
    - generator: Generator
    - discriminator: Discriminator
    + build_gan(generator: Generator, discriminator: Discriminator): Sequential
    + train_gan(data: DataFrame, epochs: int, batch_size: int, latent_dim: int): Tuple[Generator, Discriminator, Sequential]
}

DataLoader --> GAN : provides data for training
Generator --> GAN : is part of
Discriminator --> GAN : is part of
GAN --> TrainedModel : Trains
@enduml
"""

# Generate the UML diagram image URL
response_url = server.get_url(uml_diagram)

# Open the URL in the default web browser
webbrowser.open(response_url)

print("UML diagram opened in the browser.")
