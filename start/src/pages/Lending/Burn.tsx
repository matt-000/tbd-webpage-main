import React from 'react';
import {useContext, useState, useEffect} from 'react'
import {ethers} from 'ethers'
import LendingBorrowing from './LendingBorrowing';
import MintBurn from './MintBurn';
import Header from './../Header/Header';
import Burny from './BurnyBaby';
import './../Borrowing/Borrowing.css';
import "./Lending.css"
import { UserAddressContext } from './../../UserAddressContext';

const App = () => {
  const [provider, setProvider] = useState<null | ethers.BrowserProvider>(null); 
	const [signer, setSigner] = useState<null | ethers.JsonRpcSigner>(null);
	const [contract, setContract] = useState<null | ethers.Contract>(null);

	const [tokenName, setTokenName] = useState("Token");
	const [balance, setBalance] = useState<null | String>(null);

  const context = useContext(UserAddressContext);
	useEffect(() => {
		context?.updateUserAddress();
		updateBalance();
		updateTokenName();
	}, [context]);

	const iface = new ethers.Interface([
		"function maxWithdraw(address) view returns (uint256)",
		"function maxMint(address owner) returns (uint256)",
		"function previewMint(uint256 shares) view returns (uint256)",
		"function deposit(uint256, address) returns (uint256)",
    "function balanceOf(address owner) view returns (uint256)",
		"function withdraw(uint256, address, address) returns (uint256)",
    "function requestWidthdraw(uint256 amount_, address sendTo_) returns ()",
    "function approve(address spender, uint amount)",
		"function allowance(address owner, address spender) view returns (uint)",
    "function getRequestedWithdraw(address) view returns (uint256, uint256, uint256, address)"
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
      <h2> {tokenName + " ERC-20 Wallet"} </h2>
		  <button className="button6" onClick={context?.updateUserAddress}>{"Refresh Wallet Connection"}</button>
      <Header address={context!.userAddress}/>
      <LendingBorrowing />
      <MintBurn />
      <Burny user_address={context!.userAddress} fetti_address={context!.fetti_address} provider={provider} signer={signer} contract={contract} tokenName={tokenName} balance={balance}/>
    </div>
  );
};

export default App;