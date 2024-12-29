import React, { useState } from "react";
import Sidebar from "./Sidebar";

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

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        style={{
          marginLeft: "270px",
          padding: "25px",
          width: "calc(100% - 270px)",
          backgroundColor: "#1f1f2e",
          color: "white", 
          minHeight: "100vh", 
          borderLeft: "1px solid #333", 
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
  );
};

export default FileDownload;
