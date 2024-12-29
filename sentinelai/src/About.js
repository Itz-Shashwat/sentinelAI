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
    background: "linear-gradient(rgba(5, 4, 4, 0.7), rgba(18, 18, 18, 0.7)), url('images/gan.jpg') no-repeat center center/cover",
    position: "relative",
    padding: "40px",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
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
            <h1 style={{ fontSize: "2.5rem", color: "rgba(255, 255, 255, 0.7)" }}>SentinelAI</h1>
          </div>

          {/* About Section */}
          <section>
  <div style={aboutSectionStyle}>
    <p style={{ ...paragraphStyle, textAlign: "justify" }}>
      In our project, Harnessing GANs to Generate Realistic Decoy Data to Mislead Cyber Attackers,
      we aimed to generate synthetic decoy network traffic that mimics real-world network data,
      providing an effective tool to thwart cyber attackers. The approach involves training a 
      Generative Adversarial Network (GAN) on real network traffic data collected using Wireshark,
      then using the trained model to inject realistic decoy traffic into network systems.
    </p>
              <p style={paragraphStyle}>
              <strong>Training the Model</strong></p>
              <p style={paragraphStyle}>
The core of our approach is the Generative Adversarial Network (GAN), a deep learning model composed of two neural networks: the generator and the discriminator. The generator creates synthetic data, while the discriminator attempts to distinguish between real and generated data. Through this adversarial process, the generator improves over time, eventually producing decoy data that closely resembles actual network traffic.

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
