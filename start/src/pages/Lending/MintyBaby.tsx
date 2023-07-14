import React from 'react';
import {useState, useEffect} from 'react'
import {ethers} from 'ethers'
import './../Borrowing/Borrowing.css';
import "./Lending.css"
import InteractionsMint from './InteractionsMint';
import './Wallet.module.css'

interface AddressProps {
	provider: null | ethers.BrowserProvider;
	signer: null | ethers.JsonRpcSigner;
	contract: null | ethers.Contract;
	user_address: null | String;
	fetti_address: null | String;
	tokenName: null | String;
	tokenNameSC: null | String;
	balance: null | String;
	balanceSC: null | String;
	updateBalance: () => void;
	stringConversionRate: null | String;
}

// Just a holder to show where to mint the tokens and info
const App: React.FC<AddressProps> = (props) => {
  return (
    <div>
		<div className = "walletCard">
			<div>
				<h3>Address: {props.user_address}</h3>
			</div>
			<div>
				<h3>{props.tokenName} Balance: {props.balance}</h3>
			</div>
			<div>
				<h3>{props.tokenNameSC} Balance: {props.balanceSC}</h3>
			</div>
		</div>
		<InteractionsMint contract={props.contract} user_address={props.user_address} provider={props.provider} signer={props.signer} fetti_address={props.fetti_address} updateBalance={props.updateBalance} stringConversionRate={props.stringConversionRate}/>
	</div>
  );
};

export default App;
