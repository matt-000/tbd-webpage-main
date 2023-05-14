import React from 'react';
import './../Borrowing/Borrowing.css';
import { Link } from 'react-router-dom';

const MintBurn = () => {
  return (
    <div className="box">
      <Link to="/">
        <div className="box-item">Mint</div>
      </Link>
      <Link to="/burn">
        <div className="box-item">Burn</div>
      </Link>
    </div>
  );
}

export default MintBurn
