import React from "react";

function LandingPage() {
  const wrapperStyle = {
    margin: 0,
    fontFamily: "Arial, sans-serif",
    color: "white",
    backgroundColor: "#000",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#333",
  };

  const logoStyle = {
    fontSize: "24px",
    fontWeight: "bold",
  };

  const navListStyle = {
    listStyle: "none",
    display: "flex",
    gap: "15px",
  };

  const navLinkStyle = {
    textDecoration: "none",
    color: "white",
    fontSize: "16px",
  };

  const buttonStyle = {
    background: "none",
    border: "none",
    color: "blue",
    textDecoration: "underline",
    cursor: "pointer",
  };

  const sectionStyle = {
    margin: "20px",
  };

  const footerStyle = {
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#333",
  };

  return (
    <div style={wrapperStyle}>
      <header style={headerStyle}>
        <h1 style={logoStyle}>SentinelAI</h1>
        <nav>
          <ul style={navListStyle}>
            <li><a href="#home" style={navLinkStyle}>Home</a></li>
            <li><a href="#about" style={navLinkStyle}>About</a></li>
            <li><a href="#services" style={navLinkStyle}>Services</a></li>
            <li><a href="#contact" style={navLinkStyle}>Contact</a></li>
            <li>
              <button 
                onClick={() => alert('Feature coming soon!')} 
                style={buttonStyle}
              >
                Future Feature
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <section id="home" style={sectionStyle}>

        </section>
        <section id="about" style={sectionStyle}>

        </section>
        <section id="services" style={sectionStyle}>

        </section>
        <section id="contact" style={sectionStyle}>

        </section>
      </main>
      <footer style={footerStyle}>
        <p>© 2024 SentinelAI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
