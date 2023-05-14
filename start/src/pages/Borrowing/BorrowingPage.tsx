import React from 'react';
import './BorrowingPage.css';

const BorrowingPage: React.FC = () => {
  const handleVote = (option: string) => {
    // Perform voting logic here
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Borrowing</h1>
        <p>Choose an option to borrow</p>
      </div>
      <div className="options-container">
        <div className="option">
          <div className="option-content">
            <h2>Option 1</h2>
            <p>Description of Option 1</p>
          </div>
          <button className="vote-button" onClick={() => handleVote('option1')}>
            Borrow Option 1
          </button>
        </div>
        <div className="option">
          <div className="option-content">
            <h2>Option 2</h2>
            <p>Description of Option 2</p>
          </div>
          <button className="vote-button" onClick={() => handleVote('option2')}>
            Borrow Option 2
          </button>
        </div>
        <div className="option">
          <div className="option-content">
            <h2>Option 3</h2>
            <p>Description of Option 3</p>
          </div>
          <button className="vote-button" onClick={() => handleVote('option3')}>
            Borrow Option 3
          </button>
        </div>
      </div>
    </div>
  );
};

export default BorrowingPage;
