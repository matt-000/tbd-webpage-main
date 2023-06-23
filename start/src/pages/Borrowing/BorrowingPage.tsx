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
  const context = useContext(UserAddressContext);
	useEffect(() => {
		context?.updateUserAddress();
	}, [context]);

  const handleVote = (option: string) => {
    // Perform voting logic here
  };
// define an interface for the props
interface CardProps {
  image: string;
  name: string;
  onManage: () => void;
}

// Card Component
const Card: React.FC<CardProps> = ({ image, name, onManage }) => {
  return (
      <div className="card">
          <img src={image} alt={name} className="card-image" />
          <h2 className="card-name">{name}</h2>
          <Link to="/Borrowing/GNSFetti" onClick={onManage} className="manage-button">Manage</Link>
      </div>
  )
}
  // Example data
const data = [
  { image: '/images/gnsfet.png', name: 'GNS/FET Pool' },
];

  const handleManageGNSPool = (name: String) => {
    // Add your redirection logic here
    console.log(`Managing ${name}`);
  }

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
