import React from 'react';
import './App.css';
import LandingPage from './LandingPage';
import GANOperationsDashboard from './GANOperationsDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GANDashboard from './GANDashboard';
import About from './About';
import FileDownload from './FileDownload';
import Contact from './Contact';

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/gan-operations-dashboard" element={<GANDashboard />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/download" element={<FileDownload/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>

      </div>
    </Router>
  );
}

export default App;
