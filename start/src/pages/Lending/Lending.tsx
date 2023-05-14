import React from 'react';
// eslint-disable-next-line import/no-unassigned-import
import './../Borrowing/Borrowing.css';
import LendingBorrowing from './LendingBorrowing';
import MintBurn from './MintBurn';
import ConversionBox from './MintBox';
import CurrencySwap from './CurrencyMint';
import Header from './../Header/Header';

const App = () => {
  return (
    <div className="app">
      <Header />
      <LendingBorrowing />
      <MintBurn />
      <CurrencySwap />
    </div>
  );
};

export default App;
