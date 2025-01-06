import React from 'react';
import './App.css';
import LandingPage from './LandingPage';
import GANOperationsDashboard from './GANOperationsDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GANDashboard from './GANDashboard';
import About from './About';
import FileDownload from './FileDownload';
import Contact from './Contact';
import Support from './Support';
import Ganinfo from './Ganinfo';
import SignInSignUp from './SignInSignUp';

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
        <Route path="/support" element={<Support/>}/>
        <Route path="/gantrain" element={<Ganinfo/>}/>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
