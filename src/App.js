import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from './components/Organisms/Login'; // Updated import path
import HomePage from './components/Organisms/Home';   // Updated import path

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<LoginPage />} /> {/* Default to login */}
      </Routes>
    </Router>
  );
}

export default App;
