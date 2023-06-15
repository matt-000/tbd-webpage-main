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
	stringEpocPlaced: null | String;
	stringDaiToSend: null | String;
	stringLiqToBurn: null | String;
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
						<h2>Claim</h2>
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
							Claim
						</button>
					</div>
					<div className="rate-container">
						<h3>Time until claim</h3>
						<div className="rate-value">{props.stringEpocPlaced}</div>
						<h3>Dai to be sent</h3>
						<div className="rate-value">{props.stringDaiToSend}</div>
						<h3>Fet to be burned</h3>
						<div className="rate-value">{props.stringLiqToBurn}</div>
					</div>
				</div>
			</div>
		)
	
}

export default InteractionsBurn;