import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const GANDashboard = () => {
  const [dataCount, setDataCount] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = async () => {
    if (!dataCount || isNaN(dataCount)) {
      alert("Please enter a valid number for data count.");
      return;
    }

    setIsFetching(true);

    try {
      // Get user's public IP address
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const { ip } = await ipResponse.json();

      // Send request to backend API
      const response = await fetch("http://127.0.0.1:5000/generate-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rows: dataCount, ip }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from the backend API.");
      }

      // Fetch CSV response from the backend
      const blob = await response.blob();
      const downloadURL = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadURL;
      link.download = "synthetic_data.csv";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("An error occurred while fetching the data.");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar/>
      {/* Main Content */}
      <div
        style={{
          marginLeft: "270px",
          padding: "25px",
          width: "calc(100% - 270px)",
          backgroundColor: "#1f1f2e", // Match sidebar background color
          color: "white", // Ensure text is visible on dark background
          minHeight: "100vh", // Ensure full height background
          borderLeft: "1px solid #333", // Add a subtle 1px border
        }}
      >
        <h1>Generate Synthetic Data</h1>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ marginRight: "10px" }}>Number of Data Needed:</label>
          <input
            type="number"
            value={dataCount}
            onChange={(e) => setDataCount(e.target.value)}
            style={{
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #bb86fc",
              borderRadius: "4px",
              backgroundColor: "#2c2c3d",
              color: "white",
            }}
          />
        </div>
        <button
          onClick={fetchData}
          style={{
            padding: "10px 20px",
            backgroundColor: "#bb86fc",
            border: "none",
            borderRadius: "4px",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
          disabled={isFetching}
        >
          {isFetching ? "Fetching..." : "Fetch Data"}
        </button>
      </div>
    </div>
  );
};

export default GANDashboard;
