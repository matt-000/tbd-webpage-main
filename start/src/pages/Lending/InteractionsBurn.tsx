import React from 'react'
import { useState} from 'react'
import {ethers} from 'ethers'
import './Wallet.module.css';
import "./CurrencySwap.css";

interface InteractionsProps {
	provider: null | ethers.BrowserProvider;
	signer: null | ethers.JsonRpcSigner;
	contract: null | ethers.Contract;
	user_address: null | String;
	fetti_address: null | String;
}

const InteractionsBurn: React.FC<InteractionsProps> = (props) => {
	const [inputValue, setInputValue] = useState('');
	const [outputValue, setOutputValue] = useState('');

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
		setOutputValue(String(Number(inputValue) * 2));
	};

	const [transferHash, setTransferHash] = useState<null | String>(null);


	const transferHandler = async () => {
		  const burnInput = ethers.parseUnits(inputValue, 18)
		  console.log(burnInput)
			try{
				let txt = await props.contract!.withdraw(burnInput, props.user_address, props.user_address);
				console.log(txt);
				await props.provider!.waitForTransaction(txt.hash);
    			console.log('Exchange confirmed');

				setTransferHash("Transfer confirmation hash: " + txt.hash);
			} catch (error) {
				console.error(`Error in exchange: ${error}`);
			}
	  };

	return (
			<div className="container">
				<div className="swap-container">
					<div className="form-container">
						<h2>Swap</h2>
						<div className="input-group">
							<input
							type="text"
							placeholder="0"
							className="input-field"
							value={inputValue}
							onChange={handleInputChange}
							/>
							<select className="select-field">
							<option value="fet">FET</option>
							{/* Add more options here */}
							</select>
						</div>
						<button className="swap-button" value={inputValue} onClick={transferHandler}>
							Swap
						</button>
						<div className="input-group">
							<input
							type="text"
							placeholder="0"
							className="input-field"
							value={outputValue}
							readOnly
							/>
							<select className="select-field">
							<option value="dai">DAI</option>
							{/* Add more options here */}
							</select>
						</div>
					</div>
						<div className="rate-container">
							<h3>Exchange Rate</h3>
						<div className="rate-value">1 FET = 1 DAI</div>
					</div>
				</div>
			</div>
		)
	
}

export default InteractionsBurn;