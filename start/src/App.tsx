import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Borrow from './pages/Borrowing/Borrowing';
import Lend from './pages/Lending/Lending';
import Burn from './pages/Lending/Burn';
// import { Link } from "react-router-dom";

function App () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Lend />} />
        <Route path="/Mint" element={<Lend />} />
        <Route path="/Burn" element={<Burn />} />
        <Route path="/Borrowing" element={<Borrow />} />
        {/* Other Routes */}
      </Routes>
    </Router>
  );
}

export default App;