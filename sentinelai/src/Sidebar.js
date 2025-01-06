import React from "react";
import { Route, Routes, Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <style>
        {`
          .sidebar-container {
            width: 250px;
            background: linear-gradient(rgba(31, 31, 46, 0.9), rgba(10, 8, 10, 0.8));
            padding: 20px;
            position: fixed;
            height: 100vh;
            border-right: 2.1px solid black;
            z-index: 9999; /* Ensure sidebar is above other content */
            box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3); /* Add shadow for better visual separation */
          }

          .sidebar-title {
            color:rgb(215, 221, 227);
            text-align: center;
            font-weight: 600;
          }

          .sidebar-list {
            list-style: none;
            padding: 0;
            margin-top: 20px; /* Ensure list doesn't overlap title */
          }

          .sidebar-link {
            color: white;
            display: block;
            padding: 10px;
            text-decoration: none;
            transition: color 0.3s ease;
            margin-bottom: 10px; /* Space out links */
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
            <Link to="/gantrain" className="sidebar-link">Model Training Info</Link>
          </li>
          <li>
            <Link to="/gan-operations-dashboard" className="sidebar-link">Synthetic Data</Link>
          </li>
          <li>
            <Link to="/download" className="sidebar-link">Download</Link>
          </li>
          <li>
            <Link to="/contact" className="sidebar-link">Contact</Link>
          </li>
          <li>
            <Link to="/support" className="sidebar-link">Support</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;