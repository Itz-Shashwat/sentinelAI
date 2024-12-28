import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import GANOperationsDashboard from './GANOperationsDashboard';
import Sidebar from './Sidebar';

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
    position: "relative",
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

          {/* About Section */}
          <section>
            <div style={aboutSectionStyle}>
              <p style={paragraphStyle}>
                Imagine outsmarting cyber attackers with a clever digital decoy! Our project, <strong>"Harnessing GANs to Generate Realistic Decoy Data,"</strong> does
                just that. By blending cutting-edge AI with a touch of cybersecurity magic, we create lifelike synthetic network traffic designed to baffle and mislead
                even the most sophisticated hackers.
              </p>
              <br />
              <p style={paragraphStyle}>
                Using tools like Wireshark and the power of Generative Adversarial Networks (GANs), this dynamic solution evolves in real-time, staying one step ahead
                of cyber threats. It's not just defense—it's a game of wits, where the attackers never know what hit them. Say goodbye to static defenses and hello to
                a smarter, more resilient cybersecurity system! or whatttt.
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
