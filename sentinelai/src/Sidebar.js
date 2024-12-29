import React from "react";
import { Route, Routes, Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <style>
        {`
          .sidebar-container {
            width: 250px;
            background-color: #1f1f2e;
            padding: 20px;
            position: fixed;
            height: 100vh;
            border-right: 2px solid black;
          }
          .sidebar-title {
            color: #bb86fc;
            text-align: center;
            font-weight: 600;
          }
          .sidebar-list {
            list-style: none;
            padding: 0;
          }
          .sidebar-link {
            color: white;
            display: block;
            padding: 10px;
            text-decoration: none;
            transition: color 0.3s ease;
          }
          .sidebar-link:hover {
            color: #d3a6d8; /* Light purple color */
          }
        `}
      </style>

      <div className="sidebar-container">
        <h2 className="sidebar-title">GAN Dashboard</h2>
        <ul className="sidebar-list">
          <li>
            <Link to="/" className="sidebar-link">Home</Link>
          </li>
          <li>
            <Link to="/about" className="sidebar-link">About</Link>
          </li>
          <li>
            <Link to="/gan-operations-dashboard" className="sidebar-link">Synthetic Data</Link>
          </li>
          <li>
            <Link to="/sethoja" className="sidebar-link">Settings</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
