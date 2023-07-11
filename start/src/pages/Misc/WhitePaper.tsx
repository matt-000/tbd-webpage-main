import React from 'react';
import {useContext, useState, useEffect} from 'react'
import Header from '../Header/Header';
import { UserAddressContext } from '../../UserAddressContext';

const BorrowingPage: React.FC = () => {
  // Calling metamask again
  const context = useContext(UserAddressContext);
	useEffect(() => {
		context?.updateUserAddress();
	}, [context]);

  // Simple little bit of HTML
  return (
    <div className="app">
      <Header address={context!.userAddress}/>
    </div>
  );
};

export default BorrowingPage;
