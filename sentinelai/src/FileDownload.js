import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Route, Routes, Link } from "react-router-dom";


const FileDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch("http://127.0.0.1:4000/download", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch the file.");
      }

      const blob = await response.blob();
      const downloadURL = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadURL;
      link.download = "SentinelAI.exe";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading the file:", error);
      alert("An error occurred while downloading the file.");
    } finally {
      setIsDownloading(false);
    }
  };

  const footerStyle = {
    textAlign: "center",
    marginTop: "auto", // Pushes footer to the bottom
    fontSize: "0.9rem",
    color: "#bbbbbb",
    animation: "slideUp 1s ease",
    padding: "10px",
};
  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor:"#1e1e2f"}}>
      {/* Sidebar */}
      <div style={{ width: "250px"}}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "25px",
          backgroundColor: "linear-gradient(135deg,rgb(58, 102, 145), #dfe7fd)",
          color: "white",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <h1>Download Software</h1>

          {isDownloading && (
            <div
              style={{
                width: "80px",
                height: "80px",
                margin: "40px 0",
                border: "10px solid #bb86fc",
                borderTop: "10px solid transparent",
                borderRadius: "50%",
                animation: "spin 1.5s linear infinite",
              }}
            ></div>
          )}

          <div style={{ marginTop: "40px" }}>
            <button
              onClick={handleDownload}
              style={{
                padding: "10px 20px",
                backgroundColor: "#bb86fc",
                border: "none",
                borderRadius: "4px",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "#a675fc")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "#bb86fc")
              }
              disabled={isDownloading}
            >
              {isDownloading ? "Downloading..." : "Download: Sentinel AI"}
            </button>
          </div>

          {/* Information Box */}
          <div
            style={{
              marginTop: "40px",
              padding: "20px",
              backgroundColor: "#2a2a40",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(15, 15, 15, 0.2)",
              color: "#e0e0e0",
              width: "100%",
              maxWidth: "800px",
              textAlign: "left",
            }}
          >
            <h2 style={{ marginBottom: "10px", color: "#bb86fc" }}>
              Sentinel AI: Network Traffic Decoy Injector
            </h2>
            <p><strong>Version:</strong> 1.0.0</p>
            <p><strong>Last Updated:</strong> December 30, 2024</p>
            <p><strong>File Size:</strong> ~190 MB</p>
            <p><strong>Supported Platforms:</strong> Windows 10/11 (64-bit)</p>

            <h3 style={{ marginTop: "20px", color: "#bb86fc" }}>Overview</h3>
            <p>
              Sentinel AI is a cutting-edge tool designed for security
              professionals and network administrators to inject realistic
              decoy traffic into network environments. By mimicking genuine
              network traffic patterns, it misleads potential attackers, adds
              resilience to your system, and enhances threat analysis
              capabilities.
            </p>

            <h3 style={{ marginTop: "20px", color: "#bb86fc" }}>Key Features</h3>
            <ul style={{ marginLeft: "20px" }}>
              <li>Automated Decoy Injection: Dynamically inject decoy packets based on real network traffic.</li>
              <li>Protocol Support: Inject traffic for TCP, UDP, or custom protocols.</li>
              <li>CSV Integration: Fetch decoy data directly via API and use preloaded decoy datasets for injection.</li>
              <li>Custom Packet Injection: Specify IP sources, destinations, protocol, and payload size.</li>
              <li>User-Friendly Interface: Intuitive, no-code interface built with Tkinter for efficient handling.</li>
              <li>Real-Time Packet Sniffing: Monitor live traffic and seamlessly inject decoy packets.</li>
            </ul>

            <h3 style={{ marginTop: "20px", color: "#bb86fc" }}>System Requirements</h3>
            <p><strong>Processor:</strong> Intel i3 or equivalent (minimum), Intel i5 or above (recommended).</p>
            <p><strong>RAM:</strong> 4GB (minimum), 8GB or above (recommended).</p>
            <p><strong>Storage:</strong> At least 190MB of free space.</p>
            <h3 style={{ marginTop: "20px", color: "#bb86fc" }}>Support and Feedback</h3>
            <p>
                If you encounter any issues or have feature requests, reach out to our support team at 
                <Link to="/support" className="sidebar-link" style={{ textDecoration: 'none', display: 'inline', color: '#bb86fc' }}> Support </Link>  or visit our Help Center.
            </p>
          </div>
        </div>
        <style>
          {`
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
        <footer style={footerStyle}>
                    <p>© 2024 SentinelAI. All rights reserved.</p>
                </footer>
      </div>
    </div>
  );
};

export default FileDownload;
