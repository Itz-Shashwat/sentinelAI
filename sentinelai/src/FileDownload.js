import React, { useState } from "react";
import Sidebar from "./Sidebar";

const FileDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch("http://127.0.0.1:4000//download", {
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

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: "250px", backgroundColor: "#2a2a40" }}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex", // Enables proper layout for children
          flexDirection: "column",
          padding: "25px",
          backgroundColor: "#1f1f2e",
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
            margin: "0 auto", // Centers the content within the right part
          }}
        >
          <h1>Download File</h1>

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
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#a675fc")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#bb86fc")}
              disabled={isDownloading}
            >
              {isDownloading ? "Downloading..." : "Download: Sentinel AI"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileDownload;
