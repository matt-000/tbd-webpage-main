import React from 'react';
import {useContext, useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import {ethers} from 'ethers'
import './BorrowingPage.css';
import Borrow from './Borrowing';
import LendingBorrowing from './../Lending/LendingBorrowing';
import Header from './../Header/Header';
import { UserAddressContext } from './../../UserAddressContext';

const BorrowingPage: React.FC = () => {
  // Calling metamask again
  const context = useContext(UserAddressContext);
	useEffect(() => {
		context?.updateUserAddress();
	}, [context]);

  // The card that displays when a user enters our options page
interface CardProps {
  image: string;
  name: string;
  onManage: () => void;
}

// Just for one loan now, but it will be more in the future
const Card: React.FC<CardProps> = ({ image, name, onManage }) => {
  return (
      <div className="card">
          <img src={image} alt={name} className="card-image" />
          <h2 className="card-name">{name}</h2>
          <Link to="/Borrowing/GNSFetti" onClick={onManage} className="manage-button">Manage</Link>
      </div>
  )
}

// The list we will import into the listed out page
const data = [
  { image: '/images/gnsfet.png', name: 'GNS/FET Pool' },
];

  const handleManageGNSPool = (name: String) => {
    console.log(`Managing ${name}`);
  }

  // Simple little bit of HTML
  return (
    <div className="app">
      <Header address={context!.userAddress}/>
      <LendingBorrowing />
    <div className="outer-container">
      <div className="card-list">
          {data.map((item, index) => <Card key={index} image={item.image} name={item.name} onManage={() => handleManageGNSPool(item.name)}/>)}
        </div>
      </div>
    </div>
  );
};

export default BorrowingPage;
