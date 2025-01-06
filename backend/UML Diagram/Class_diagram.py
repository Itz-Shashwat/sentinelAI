from plantuml import PlantUML

# Define PlantUML server URL (you can use a local PlantUML jar if needed)
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

class GAN {
    - generator: Generator
    - discriminator: Discriminator
    + build_gan(generator: Generator, discriminator: Discriminator): Sequential
    + train_gan(data: DataFrame, epochs: int, batch_size: int, latent_dim: int): Tuple[Generator, Discriminator, Sequential]
}

DataLoader --> GAN : provides data for training
Generator --> GAN : is part of
Discriminator --> GAN : is part of

@enduml
"""
response = server.processes(uml_diagram)
with open(r"G:\sem8\Capstone\Codes\git repo\sentinelAI\backend\UML Diagramgan_class_diagram\.png", "wb") as diagram_file:
    diagram_file.write(response)

print("UML diagram generated and saved as 'gan_class_diagram.png'")
