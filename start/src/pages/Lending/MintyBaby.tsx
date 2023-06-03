import React from 'react';
import {useState, useEffect} from 'react'
import {ethers} from 'ethers'
import './../Borrowing/Borrowing.css';
import LendingBorrowing from './LendingBorrowing';
import MintBurn from './MintBurn';
import CurrencyBurn from './CurrencyBurn';
import Header from './../Header/Header';
import "./Lending.css"
import InteractionsMint from './InteractionsMint';
import InteractionsBurn from './InteractionsBurn';
import './Wallet.module.css'
import FettiERC20 from './../../Artifacts/Contracts/FettiERC20.sol/FettiERC20.json'

interface AddressProps {
	address: null | String;
}

const App: React.FC<AddressProps> = (props) => {
  let fetti_address =  '0x3F827541482530549099782C6d53dB5Fa13c6435';
  let dai_address = '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063';
  let loaner_address = '0xBCe5F6d8e70C7B21C0C9d20E8B1074a1F24D7665';
  let vault_address = '0xE83b0AFec5377e454c1C0b173d71c4fD2DE94BD9';
  let gnsPool_address = '0x427c7D210FD4bc7d028c9c3CC6224875878faEaF';

  const [errorMessage, setErrorMessage] = useState<null | String>(null);
  const [provider, setProvider] = useState<null | ethers.BrowserProvider>(null);
	const [signer, setSigner] = useState<null | ethers.JsonRpcSigner>(null);
	const [contract, setContract] = useState<null | ethers.Contract>(null);

	const [tokenName, setTokenName] = useState("Token");
	const [balance, setBalance] = useState<null | number>(null);

	const iface = new ethers.Interface([
		"function maxWithdraw(address) view returns (uint256)",
		"function maxMint(address owner) returns (uint256)",
		"function previewMint(uint256 shares) view returns (uint256)",
		"function deposit(uint256, address) returns (uint256)",
		"function withdraw(uint256, address, address) returns (uint256)"
	  ]);
	

	useEffect(() => {
		updateBalance();
		updateTokenName();
	}, [])

	const updateBalance = async () => {
		let fettiProvider = new ethers.BrowserProvider(window.ethereum);
		setProvider(fettiProvider);

		let fettiSigner = await fettiProvider.getSigner();
		setSigner(fettiSigner);

		let fettiContract = new ethers.Contract(fetti_address, iface.fragments, fettiSigner);
		setContract(fettiContract);

		//let balanceBigN = await contract!.maxWithdraw(props.address);
		let balanceNumber = 0;

		let tokenBalance = Number(balanceNumber);

		setBalance(tokenBalance);
		console.log(tokenBalance);
	}

  const updateTokenName = async () => {
		setTokenName("FET");
	}

  return (
    <div>
		<div className = "walletCard">
			<div>
				<h3>Address: {props.address}</h3>
			</div>
			<div>
				<h3>{tokenName} Balance: {balance}</h3>
			</div>
			{errorMessage}
			</div>

			<InteractionsMint contract={contract} user_address={props.address} provider={provider} signer={signer} fetti_address={fetti_address}/>
			<InteractionsBurn contract={contract} user_address={props.address} provider={provider} signer={signer} fetti_address={fetti_address}/>
	</div>
  );
};

export default App;
