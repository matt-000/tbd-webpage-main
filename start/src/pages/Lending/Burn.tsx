import React from 'react';
import './../Borrowing/Borrowing.css';
import LendingBorrowing from './LendingBorrowing';
import MintBurn from './MintBurn';
import CurrencyBurn from './CurrencyBurn';
import Header from './../Header/Header';
import "./Lending.css"

const App = () => {
  return (
    <div className="app">
      <Header />
      <LendingBorrowing />
      <MintBurn />
      <CurrencyBurn />
    </div>
  );
};

export default App;
