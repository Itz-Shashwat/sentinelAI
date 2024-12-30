import React, { useState } from "react";
import axios from "axios"; // Ensure you have axios installed

const styles = {
  container: {
    backgroundColor: "#1e1e2f",
    color: "#e4e4e7",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  section: {
    width: "80%",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#27293d",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
    opacity: 0.9,
    color: "#e4e4e7",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#1e1e2f",
    color: "#e4e4e7",
  },
  textarea: {
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#1e1e2f",
    color: "#e4e4e7",
    resize: "none",
  },
  button: {
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#38bdf8",
    color: "#e4e4e7",
    cursor: "pointer",
  },
};

const SupportPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1000/api/issues", formData);
      if (response.status === 200) {
        setMessage("Thank you for submitting your issue. Our support team will contact you soon.");
        setFormData({ name: "", email: "", issue: "" });
      }
    } catch (error) {
      setMessage("There was an error submitting your issue. Please try again.");
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Support Page</h1>
      <div style={styles.section}>
        <h2>Submit Your Issue</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <textarea
            name="issue"
            rows="5"
            placeholder="Describe your issue"
            value={formData.issue}
            onChange={handleChange}
            style={styles.textarea}
            required
          ></textarea>
          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default SupportPage;
