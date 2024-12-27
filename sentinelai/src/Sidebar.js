import React from "react";
import { Route, Routes, Link } from 'react-router-dom';

function Sidebar(){
    return(
        <div style={{ width: "250px", backgroundColor: "#1f1f2e", padding: "20px", position: "fixed", height: "100vh", borderRight: "2px solid black" }}>
            <h2 style={{ color: "#bb86fc", textAlign: "center", fontWeight: "600" }}>GAN Dashboard</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                <li><Link to="/" style={{ color: "white", display: "block", padding: "10px", textDecoration: "none" }}>Home</Link></li>
                <li><Link to="/about" style={{ color: "white", display: "block", padding: "10px", textDecoration: "none" }}>About</Link></li>
                <li><Link to="/gan-operations-dashboard" style={{ color: "white", display: "block", padding: "10px", textDecoration: "none" }}>Synthetic Data</Link></li>
                <li><Link to="/settings" style={{ color: "white", display: "block", padding: "10px", textDecoration: "none" }}>Settings</Link></li>
            </ul>
        </div>
    );
}

export default Sidebar;
