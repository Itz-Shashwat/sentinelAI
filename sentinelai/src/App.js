import React from 'react';
import './App.css';
import LandingPage from './LandingPage';
import GANOperationsDashboard from './GANOperationsDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/gan-operations-dashboard" element={<GANOperationsDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
