import React from "react";
import Sidebar from "./Sidebar";
import Team from "./Team";
import SupportPage from "./SupportPage";
import GANTraining from "./GANTraining";

function Ganinfo() {
    const Wrapperstyle = {
        margin: 0,
        fontFamily: "'Poppins', sans-serif",
        color: "white",
        display: "flex",
        minHeight: "100vh",
    };

    const mainStyle = {
        display: "flex",
        flexDirection: "column", // Enables column layout inside main content
        flex: 1, // Ensures main content grows to fill available space
        marginLeft: "270px",
    };

    const headerStyle = {
        textAlign: "center",
        marginBottom: "20px",
        animation: "fadeIn 1s ease",
    };

    const contentStyle = {
        flex: 1, // Ensures content takes up available vertical space
        padding: "22px",
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
        <div style={Wrapperstyle}>
            <Sidebar />
            <div style={mainStyle}>
                {/* Header */}
                <div style={headerStyle}>
                    <h1 style={{ fontSize: "2.5rem", color: "#bb86fc" }}>SentinelAI</h1>
                </div>
                {/* Content Section */}
                <section style={contentStyle}>
                    <GANTraining/>
                </section>
                {/* Footer */}
                <footer style={footerStyle}>
                    <p>© 2024 SentinelAI. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}

export default Ganinfo;
