import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const GANDashboard = () => {
  const [dataCount, setDataCount] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [dataRows, setDataRows] = useState([]); // State for storing data rows
  const [headers, setHeaders] = useState([]); // State for storing headers

  const fetchData = async () => {
    if (!dataCount || isNaN(dataCount)) {
      alert("Please enter a valid number for data count.");
      return;
    }

    setIsFetching(true);
    setDataRows([]); // Clear previous rows when fetching new data
    setHeaders([]);  // Clear previous headers

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

      // Convert the blob to text and then to rows (CSV format)
      const text = await blob.text();
      const rows = text.split("\n").slice(1, 6); // Skip the first row and take the next 5 rows
      setDataRows(rows); // Update the dataRows state

      // The first row (headers) will serve as the labels for the columns
      const headerRow = text.split("\n")[0].split(",");
      setHeaders(headerRow); // Set headers for the table

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
      <Sidebar />
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

        {/* Display the first 5 rows below the button */}
        {dataRows.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h3>Few rows of data</h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            >
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      style={{
                        padding: "12px 15px",
                        border: "1px solid #444",
                        textAlign: "left",
                        fontWeight: "bold",
                        color: "#bb86fc",
                        backgroundColor: "#333",
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataRows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    style={{
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#333")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "")}
                  >
                    {row.split(",").map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        style={{
                          padding: "12px 15px",
                          border: "1px solid #444",
                          textAlign: "left",
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default GANDashboard;
