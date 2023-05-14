import React from 'react';
// eslint-disable-next-line import/no-unassigned-import
import './Borrowing.css';
import LendingBorrowing from './../Lending/LendingBorrowing';
import MintBurn from './../Lending/MintBurn';
import BorrowingPage from './BorrowingPage';
import Header from './../Header/Header';

const App = () => {
  return (
    <div className="app">
      <Header />
      <LendingBorrowing />
      <MintBurn />
      <BorrowingPage />
    </div>
  );
};

export default App;
