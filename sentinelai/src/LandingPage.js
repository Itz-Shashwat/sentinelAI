import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import GANOperationsDashboard from './GANOperationsDashboard';
function LandingPage() {
  const wrapperStyle = {
    margin: 0,
    fontFamily: "'Poppins', sans-serif",
    color: "white",
    backgroundColor: "#121212",
    display: "flex"
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "20px",
    animation: "fadeIn 1s ease"
  };

  const footerStyle = {
    textAlign: "center",
    marginTop: "30px",
    fontSize: "0.9rem",
    color: "#bbbbbb",
    animation: "slideUp 1s ease"
  };

  const aboutSectionStyle = {
    background: "linear-gradient(rgba(18, 18, 18, 0.7), rgba(18, 18, 18, 0.7)), url('images/gan.jpg') no-repeat center center/cover",
    position: "relative",
    padding: "40px",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)"
  };

  return (
    <div style={wrapperStyle}>
      {/* Sidebar */}
      <div style={{ width: "250px", backgroundColor: "#1f1f2e", padding: "20px", position: "fixed", height: "100vh" }}>
        <h2 style={{ color: "#bb86fc", textAlign: "center", fontWeight: "600" }}>GAN Dashboard</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><Link to="/" style={{ color: "white", display: "block", padding: "10px", textDecoration: "none" }}>Home</Link></li>
          <li><Link to="/about" style={{ color: "white", display: "block", padding: "10px", textDecoration: "none" }}>About</Link></li>
          <li><Link to="/gan-operations-dashboard" style={{ color: "white", display: "block", padding: "10px", textDecoration: "none" }}>Synthetic Data</Link></li>
          <li><Link to="/settings" style={{ color: "white", display: "block", padding: "10px", textDecoration: "none" }}>Settings</Link></li>
        </ul>
      </div>

      



      {/* Main content area */}
      <div style={{ marginLeft: "270px", padding: "22px", flex: 1 }}>
        {/* Header */}
        <div style={headerStyle}>
          {/* Change color of sentinel*/}
          <h1 style={{ fontSize: "2.5rem", color: "#bb86fc" }}>SentinelAI</h1>
        </div>
        <section>
        <GANOperationsDashboard/>
        </section>
        {/* Footer */}
        <footer style={footerStyle}>
          <p>© 2024 SentinelAI. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;
