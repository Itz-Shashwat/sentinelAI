import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import GANOperationsDashboard from './GANOperationsDashboard';
import Sidebar from './Sidebar';
import sentiImage from './assets/senti.jpg';


function About() {
  const wrapperStyle = {
    margin: 0,
    fontFamily: "'Poppins', sans-serif",
    color: "white",
    backgroundColor: "#1f1f2e",
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
  };

  const contentStyle = {
    display: "flex",
    flex: 1,
  };

  const mainContentStyle = {
    marginLeft: "270px",
    padding: "22px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    // Use backticks for the background with template literal
    background: `linear-gradient(135deg,rgba(31, 31, 46, 0.9), rgba(87, 73, 85, 0.8)), url(${sentiImage}) no-repeat center center/cover`,
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "20px",
    animation: "fadeIn 1s ease",
  };

  const footerStyle = {
    textAlign: "center",
    marginTop: "auto",
    fontSize: "0.9rem",
    color: "#bbbbbb",
    animation: "slideUp 1s ease",
  };

  const aboutSectionStyle = {
    background: "linear-gradient(rgba(88, 91, 92, 0.96), rgba(18, 18, 18, 0.7)), url('images/gan.jpg') no-repeat center center/cover",
    position: "relative",
    padding: "40px",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    marginLeft:"12px",
  };

  const paragraphStyle = {
    textAlign: "justify",
    position: "center",
    zIndex: 2,
    color: "#ffffff",
  };

  return (
    <div style={wrapperStyle}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div style={contentStyle}>
        <div style={mainContentStyle}>
          {/* Header */}
          <div style={headerStyle}>
            <h1 style={{ fontSize: "2.5rem", color: "#bb86fc" }}>SentinelAI</h1>
          </div>

          <section style={{ padding: "40px", maxWidth: "800px", margin: "0 auto", fontFamily: "'Poppins', sans-serif", lineHeight: "1.6" }}>
  <div
    style={{
      padding: "30px",
      backgroundColor: "rgba(44, 37, 37, 0.64)", // Updated to rgba
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.5)", // Shadow with rgba
    }}
  >
    {/* Section Header */}
    <h2
      style={{
        textAlign: "center",
        fontSize: "1.8rem",
        marginBottom: "20px",
        color: "rgba(255, 255, 255, 1)", // White text
      }}
    >
      Harnessing GANs to Generate Realistic Decoy Data
    </h2>

    {/* Introduction */}
    <p
      style={{
        textAlign: "justify",
        marginBottom: "20px",
        color: "rgba(255, 255, 255, 1)", // White text
      }}
    >
      In our project, <strong>Harnessing GANs to Generate Realistic Decoy Data to Mislead Cyber Attackers</strong>,
      we aimed to generate synthetic decoy network traffic that mimics real-world network data, providing an effective tool to thwart cyber attackers.
      The approach involves training a Generative Adversarial Network (GAN) on real network traffic data collected using Wireshark,
      then using the trained model to inject realistic decoy traffic into network systems.
    </p>

    {/* Training the Model */}
    <h3
      style={{
        fontSize: "1.2rem",
        marginBottom: "10px",
        color: "rgba(255, 255, 255, 1)", // White text
      }}
    >
      Training the Model
    </h3>
    <p
      style={{
        textAlign: "justify",
        marginBottom: "15px",
        color: "rgba(255, 255, 255, 1)", // White text
      }}
    >
      The core of our approach is the Generative Adversarial Network (GAN), a deep learning model composed of two neural networks:
      the generator and the discriminator. The generator creates synthetic data, while the discriminator attempts to distinguish
      between real and generated data. Through this adversarial process, the generator improves over time,
      eventually producing decoy data that closely resembles actual network traffic.
    </p>
    <ul
      style={{
        marginLeft: "20px",
        marginBottom: "15px",
        color: "rgba(255, 255, 255, 1)", // White text
      }}
    >
      <li>Generator: A fully connected network designed to generate network traffic data based on random noise.</li>
      <li>Discriminator: A binary classification network that differentiates between real and synthetic data.</li>
      <li>Activation Functions: ReLU in hidden layers; tanh for generator output, sigmoid for discriminator output.</li>
    </ul>

    {/* Performance Evaluation */}
    <h3
      style={{
        fontSize: "1.2rem",
        marginBottom: "10px",
        color: "rgba(255, 255, 255, 1)", // White text
      }}
    >
      Performance Evaluation
    </h3>
    <p
      style={{
        textAlign: "justify",
        marginBottom: "15px",
        color: "rgba(255, 255, 255, 1)", // White text
      }}
    >
      To evaluate the performance of our GAN model, we used the following metrics:
    </p>
    <ul
      style={{
        marginLeft: "20px",
        marginBottom: "15px",
        color: "rgba(255, 255, 255, 1)", // White text
      }}
    >
      <li>Loss Curves: Monitored generator and discriminator losses to ensure balanced adversarial training.</li>
      <li>Inception Score (IS): Quantified diversity and quality of the generated traffic.</li>
      <li>Frechet Inception Distance (FID): Compared real and synthetic traffic distributions.</li>
    </ul>

    {/* Converting Synthetic Data */}
    <h3
      style={{
        fontSize: "1.2rem",
        marginBottom: "10px",
        color: "rgba(255, 255, 255, 1)", // White text
      }}
    >
      Converting Synthetic Data Back to Decoy Format
    </h3>
    <p
      style={{
        textAlign: "justify",
        marginBottom: "15px",
        color: "rgba(255, 255, 255, 1)", // White text
      }}
    >
      Once the GAN model was trained, we converted the synthetic data into actionable decoy network traffic.
      Fields like source IP, destination IP, protocol, and packet size were carefully crafted to imitate actual traffic.
    </p>

    {/* Decoy Injection */}
    <h3
      style={{
        fontSize: "1.2rem",
        marginBottom: "10px",
        color: "rgba(255, 255, 255, 1)", // White text
      }}
    >
      Decoy Injection
    </h3>
    <p
      style={{
        textAlign: "justify",
        marginBottom: "15px",
        color: "rgba(255, 255, 255, 1)", // White text
      }}
    >
      To seamlessly integrate decoy traffic into live environments, we employed:
    </p>
    <ul
      style={{
        marginLeft: "20px",
        marginBottom: "15px",
        color: "rgba(255, 255, 255, 1)", // White text
      }}
    >
      <li>Traffic Pattern Shaping: Timed packet generation to blend with real data.</li>
      <li>Adaptive Injection: Decoy data was dynamically injected at various network layers.</li>
    </ul>

    {/* Conclusion */}
    <p
      style={{
        textAlign: "justify",
        marginTop: "20px",
        color: "rgba(255, 255, 255, 1)", // White text
      }}
    >
      Through the entire process—from training the GAN model to generating and injecting realistic decoy traffic—our project
      enhances network security by disrupting attacker behavior and misleading malicious actors.
    </p>
  </div>
</section>



        </div>
      </div>

      {/* Footer */}
      <footer style={footerStyle}>
        <p>© 2024 SentinelAI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default About;