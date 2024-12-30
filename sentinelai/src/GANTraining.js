import React, { useState } from "react";
import "./GANTraining.css";

const GANTraining = () => {
  const [copiedMessage, setCopiedMessage] = useState("");

  const predefinedCopyText =
    "Don't try to be over smart by copying this. Learn by understanding the logic!";

  // Handle Copy Logic
  const handleCopy = (e, customText) => {
    e.preventDefault();
    navigator.clipboard.writeText(predefinedCopyText);
    setCopiedMessage(`Copying restricted. Learn: ${customText}`);
    setTimeout(() => setCopiedMessage(""), 3000);
  };

  // Data for Sections
  const sections = [
    {
      title: "Section 1: What is a GAN?",
      logic:
        "A GAN combines two neural networks: a generator to create synthetic data and a discriminator to distinguish real from fake. GAN training is a zero-sum game.",
      explanation:
        "The generator learns to fool the discriminator, and the discriminator learns to spot fakes.",
      code: "",
    },
    {
      title: "Section 2: Data Normalization",
      logic:
        "Preprocess the data so all values lie between [-1, 1]. This normalization helps GAN models train faster and better.",
      explanation: `normalized_data = (features - features.min()) / (features.max() - features.min()) * 2 - 1`,
    },
    {
      title: "Section 3: Building the Generator",
      logic:
        "The generator takes random noise as input and creates structured data resembling real input.",
      explanation: `
        model.add(layers.Dense(256, input_dim=latent_dim, activation='relu'));
        model.add(layers.BatchNormalization());
        model.add(layers.Dense(input_shape, activation='tanh'));

        - Dense: Fully connected layer
        - BatchNormalization: Stabilizes learning
        - Activation ('tanh'): Ensures normalized outputs match data scaling
      `,
    },
    {
      title: "Section 4: Building the Discriminator",
      logic:
        "The discriminator evaluates input data and predicts if it’s real or fake.",
      explanation: `
        model.add(layers.Dense(1, activation='sigmoid'));

        - Dense(1): One neuron for binary classification
        - Activation ('sigmoid'): Outputs probabilities near:
          - 1 for real data
          - 0 for fake data
      `,
    },
    {
      title: "Section 5: Training the GAN",
      logic:
        "Train the discriminator with real and fake data. Then train the generator to fool the discriminator.",
      explanation: `
        d_loss_real = discriminator.train_on_batch(real_data, real_labels);
        d_loss_fake = discriminator.train_on_batch(fake_data, fake_labels);

        - train_on_batch: Optimizes model using small data batches
        - np.random.normal: Creates random noise
      `,
    },
    {
      title: "Section 6: Generating Synthetic Data",
      logic:
        "After training, use the generator to create new data resembling the training set.",
      explanation: `
        decoy_data = generator.predict(noise);

        - predict: Generates fake data from random noise.
      `,
    },
  ];

  return (
    <div className="gan-container">
      <h1>Understanding GAN Training</h1>
      {sections.map((section, index) => (
        <div key={index} className="section">
          <h2>{section.title}</h2>
          <p>
            <strong>Logic:</strong> {section.logic}
          </p>
          <pre
            className="code-block"
            onCopy={(e) => handleCopy(e, section.logic)}
          >
            {section.explanation.trim()}
          </pre>
        </div>
      ))}
      {copiedMessage && <div className="copied-message">{copiedMessage}</div>}
    </div>
  );
};

export default GANTraining;
