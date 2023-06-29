import React from 'react';
import {useContext, useState, useEffect} from 'react'
import {ethers} from 'ethers'
import './../Borrowing/Borrowing.css';
import LendingBorrowing from './LendingBorrowing';
import MintBurn from './MintBurn';
import Header from './../Header/Header';
import Minty from './MintyBaby';
import "./Lending.css"
import { UserAddressContext } from './../../UserAddressContext';

const App = () => {
	const iface = new ethers.Interface([
		"function maxWithdraw(address) view returns (uint256)",
		"function maxMint(address owner) returns (uint256)",
		"function balanceOf(address owner) view returns (uint256)",
		"function previewMint(uint256 shares) view returns (uint256)",
		"function deposit(uint256, address) returns (uint256)",
		"function withdraw(uint256, address, address) returns (uint256)"
	]);

	const stringVal = (num: bigint | null) => {
		if (num ==  null){
		  return ""
		}
		const denominator = BigInt("1000000000000000000"); // 10^18 for 18 decimals
		const quotient = num / denominator;
		const remainder = num % denominator;
	
		const value = quotient.toString() + "." + remainder.toString().padStart(18, '0');
	
		return value
	}

	const [provider, setProvider] = useState<null | ethers.BrowserProvider>(null); 
	const [signer, setSigner] = useState<null | ethers.JsonRpcSigner>(null);
	const [contract, setContract] = useState<null | ethers.Contract>(null);

	const [tokenName, setTokenName] = useState("Token");
	const [balance, setBalance] = useState<null | String>(null);

	const context = useContext(UserAddressContext);
	useEffect(() => {
		context?.updateUserAddress();
	}, [context]);

	useEffect(() => {
		if(context?.userAddress) {
		  updateBalance();
		  updateTokenName();
		}
	}, [context?.userAddress]);
	
	const updateBalance = async () => {
		let fettiProvider = new ethers.BrowserProvider(window.ethereum);
		setProvider(fettiProvider);

		let fettiSigner = await fettiProvider.getSigner();
		setSigner(fettiSigner);

		let fettiContract = new ethers.Contract(context!.fetti_address, iface.fragments, fettiSigner);
		setContract(fettiContract);

		setBalance(stringVal(await fettiContract.balanceOf(context!.userAddress)));
	}

  const updateTokenName = async () => {
		setTokenName("FET");
	}

  return (
    <div className="app">
      <Header address={context!.userAddress}/>
      <div className="lending-box">
        <LendingBorrowing />
      </div>
      <MintBurn />
      <Minty user_address={context!.userAddress} fetti_address={context!.fetti_address} provider={provider} signer={signer} contract={contract} tokenName={tokenName} balance={balance}/>
    </div>
  );
};

export default App;
