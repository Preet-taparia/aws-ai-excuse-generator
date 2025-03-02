import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ExcuseGenerator from "./ExcuseGenerator";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<ExcuseGenerator />} />
      </Routes>
    </Router>
  );
}

export default App;
