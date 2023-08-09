import React from 'react';
import {useContext, useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import {ethers} from 'ethers'
import './MainPage.css';
import Header from '../Header/Header';
import { UserAddressContext } from '../../UserAddressContext';
import PoolTable from './PoolTable'

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
  onSupply: () => void;
  onBorrow: () => void;
}

// Just for one loan now, but it will be more in the future
const Card: React.FC<CardProps> = ({ image, name, onSupply, onBorrow }) => {
  return (
      <div className="card">
          <img src={image} alt={name} className="card-image" />
          <h2 className="card-name">{name}</h2>
          <Link to="/lend/LGNS" onClick={onSupply} className="manage-button">Supply</Link>
          <Link to="/borrow/LGNS" onClick={onBorrow} className="manage-button">Borrow</Link>
      </div>
  )
}

// The list we will import into the listed out page
const data = [
  { image: '/images/gnsfet.png', name: 'GNS/FET Pool' },
];

const handleSupplyGNSPool = (name: String) => {
  console.log(`Going to supply ${name}`);
}

  const handleBorrowGNSPool = (name: String) => {
    console.log(`Going to borrow ${name}`);
  }

  // Simple little bit of HTML
  return (
    <div className="app">
      <Header address={context!.userAddress}/>
      <PoolTable/>
    {/*<div className="outer-container">
      <div className="card-list">
          {data.map((item, index) => <Card key={index} 
                    image={item.image} name={item.name} 
                    onSupply={() => handleSupplyGNSPool(item.name)} 
                    onBorrow={() => handleBorrowGNSPool(item.name)}
            />)}
        </div>
  </div>*/}
    </div>
  );
};

export default BorrowingPage;
