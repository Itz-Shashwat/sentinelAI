import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import GANOperationsDashboard from './GANOperationsDashboard';
import Sidebar from './Sidebar';
import ChatBot from './ChatBot';
function LandingPage() {
  const wrapperStyle = {
    margin: 0,
    fontFamily: "'Poppins', sans-serif",
    color: "white",
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
      <Sidebar/>
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
        <ChatBot/>
        {/* Footer */}
        <footer style={footerStyle}>
          <p>© 2024 SentinelAI. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;