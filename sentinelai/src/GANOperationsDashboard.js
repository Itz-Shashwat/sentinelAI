import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const GANOperationsDashboard = () => {
  // Example state
  const [ganStats, setGanStats] = useState({
    epoch: 10000,
    trainingStatus: "Training",
    generatorLoss: [0.9, 0.8, 0.7, 0.6, 0.4],
    discriminatorLoss: [0.5, 0.4, 0.6, 0.3, 0.2],
  });

  const [realVsGeneratedData, setRealVsGeneratedData] = useState({
    protocolFrequencies: [200, 220],
  });

  const [tabularData, setTabularData] = useState({
    real: [
      { id: 1, source: "192.168.1.1", dest: "192.168.1.2", protocol: "TCP", size: 500 },
      { id: 2, source: "192.168.1.3", dest: "192.168.1.4", protocol: "UDP", size: 700 },
    ],
    generated: [
      { id: 1, source: "192.168.1.5", dest: "192.168.1.6", protocol: "TCP", size: 520 },
      { id: 2, source: "192.168.1.7", dest: "192.168.1.8", protocol: "UDP", size: 680 },
    ],
  });

  // Line Chart for losses
  const lossData = {
    labels: ["Epoch 1000", "Epoch 2000", "Epoch 3000", "Epoch 4000", "Epoch 5000"],
    datasets: [
      {
        label: "Generator Loss",
        data: ganStats.generatorLoss,
        borderColor: "#22c55e",
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Discriminator Loss",
        data: ganStats.discriminatorLoss,
        borderColor: "#ef4444",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const [lineChartData, setLineChartData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Real Data",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: "#bb86fc",
        backgroundColor: "rgba(187, 134, 252, 0.2)",
        fill: true,
      },
      {
        label: "Generated Data",
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: "#40E0D0",
        backgroundColor: "rgba(55, 0, 179, 0.2)",
        fill: true,
      },
    ],
  });


  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#ffffff" },
        grid: { color: "#3c3c54" },
      },
      y: {
        ticks: { color: "#ffffff" },
        grid: { color: "#3c3c54" },
      },
    },
  };
  // Bar Chart for protocol frequencies
  const protocolData = {
    labels: ["Real", "Generated"],
    datasets: [
      {
        label: "Protocol Frequencies",
        data: realVsGeneratedData.protocolFrequencies,
        backgroundColor: ["#3b82f6", "#f59e0b"],
      },
    ],
  };

  // CSS in JS for dark theme
  const styles = {
    container: {
      backgroundColor: "#1e1e2f",
      color: "#e4e4e7",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      minHeight: "100vh",
    },
    section: {
      marginBottom: "20px",
      padding: "20px",
      backgroundColor: "#27293d",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
    },
    heading: {
      marginBottom: "10px",
      color: "#a855f7",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      textAlign: "left",
    },
    th: {
      backgroundColor: "#3f3f51",
      color: "#e4e4e7",
      padding: "10px",
    },
    td: {
      padding: "10px",
      borderBottom: "1px solid #414165",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={{ color: "#e4e4e7", textAlign: "center" }}>GAN Operations Dashboard</h1>

      {/* GAN Model Stats */}
      <div style={styles.section}>
        <h2 style={styles.heading}>GAN Model Stats</h2>
        <p>Epoch: <strong>{ganStats.epoch}</strong></p>
        <p>Status: <strong>{ganStats.trainingStatus}</strong></p>
        <Line data={lossData} />
      </div>

      {/* Data Comparison */}
      <div style={styles.section}>
        <h2 style={styles.heading}>Real vs Generated Data (Line Chart)</h2>
        <Line data={lineChartData} options={lineChartOptions} />
      </div>

      {/* Tabular Data */}
      <div style={styles.section}>
        <h2 style={styles.heading}>Data Preview</h2>
        <h3 style={{ color: "#f43f5e" }}>Real Data</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Source</th>
              <th style={styles.th}>Destination</th>
              <th style={styles.th}>Protocol</th>
              <th style={styles.th}>Size</th>
            </tr>
          </thead>
          <tbody>
            {tabularData.real.map((row) => (
              <tr key={row.id}>
                <td style={styles.td}>{row.id}</td>
                <td style={styles.td}>{row.source}</td>
                <td style={styles.td}>{row.dest}</td>
                <td style={styles.td}>{row.protocol}</td>
                <td style={styles.td}>{row.size}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ color: "#3b82f6" }}>Generated Data</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Source</th>
              <th style={styles.th}>Destination</th>
              <th style={styles.th}>Protocol</th>
              <th style={styles.th}>Size</th>
            </tr>
          </thead>
          <tbody>
            {tabularData.generated.map((row) => (
              <tr key={row.id}>
                <td style={styles.td}>{row.id}</td>
                <td style={styles.td}>{row.source}</td>
                <td style={styles.td}>{row.dest}</td>
                <td style={styles.td}>{row.protocol}</td>
                <td style={styles.td}>{row.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GANOperationsDashboard;