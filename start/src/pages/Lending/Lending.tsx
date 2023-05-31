import React from 'react';
// eslint-disable-next-line import/no-unassigned-import
import './../Borrowing/Borrowing.css';
import LendingBorrowing from './LendingBorrowing';
import MintBurn from './MintBurn';
import ConversionBox from './MintBox';
import CurrencySwap from './CurrencyMint';
import Header from './../Header/Header';
import Minty from './MintyBaby';
import "./Lending.css"

const App = () => {
  return (
    <div className="app">
      <Header />
      <LendingBorrowing />
      <MintBurn />
      <CurrencySwap />
      <Minty />
    </div>
  );
};

export default App;
