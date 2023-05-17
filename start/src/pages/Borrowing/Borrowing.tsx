import React from 'react';
// eslint-disable-next-line import/no-unassigned-import
import './Borrowing.css';
import LendingBorrowing from './../Lending/LendingBorrowing';
import BorrowingPage from './BorrowingPage';
import Header from './../Header/Header';

const App = () => {
  return (
    <div className="app">
      <Header />
      <LendingBorrowing />
      <BorrowingPage />
    </div>
  );
};

export default App;
