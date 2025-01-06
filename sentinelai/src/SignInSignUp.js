import React, { useState } from "react";
import {
  Container,
  Box,
  Tabs,
  Tab,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { Email, Lock, Person } from "@mui/icons-material";

const SignInSignUp = () => {
  const [activeTab, setActiveTab] = useState(0); // 0 for Sign In, 1 for Sign Up
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    ipAddress: "",
    location: "",
  });

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
    setFormData({ username: "", email: "", password: "", ipAddress: "", location: "" });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const url = activeTab === 0 ? "/verify_user" : "/add_user";

    fetch(`http://localhost:5000${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to connect to the server.");
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message || "Operation successful!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(error.message || "Something went wrong. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          p: 4,
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
          boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
        }}
      >
        <Tabs value={activeTab} onChange={handleChangeTab} centered>
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
        <Box mt={4}>
          <Typography variant="h5" align="center">
            {activeTab === 0 ? "Welcome Back!" : "Create an Account"}
          </Typography>
          <form onSubmit={handleFormSubmit}>
            {activeTab === 1 && (
              <Box mt={2}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  variant="outlined"
                  value={formData.username}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: <Person sx={{ mr: 1, color: "gray" }} />,
                  }}
                  required
                />
              </Box>
            )}
            {activeTab === 1 && (
              <Box mt={2}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: <Email sx={{ mr: 1, color: "gray" }} />,
                  }}
                  required
                />
              </Box>
            )}
            <Box mt={2}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                value={formData.password}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <Lock sx={{ mr: 1, color: "gray" }} />,
                }}
                required
              />
            </Box>
            {activeTab === 1 && (
              <>
                <Box mt={2}>
                  <TextField
                    fullWidth
                    label="IP Address"
                    name="ipAddress"
                    variant="outlined"
                    value={formData.ipAddress}
                    onChange={handleInputChange}
                  />
                </Box>
                <Box mt={2}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    variant="outlined"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </Box>
              </>
            )}
            <Box mt={3}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  textTransform: "none",
                  ":hover": { backgroundColor: "secondary.main" },
                }}
                disabled={loading}
              >
                {loading ? "Processing..." : activeTab === 0 ? "Sign In" : "Sign Up"}
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignInSignUp;
