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
	stringEpochPlaced: null | String;
	stringCurrentEpoch: null | String;
	stringDaiToSend: null | String;
	stringLiqToBurn: null | String;
	updateBalance: () => void;
}

const InteractionsBurn: React.FC<InteractionsProps> = (props) => {
	// Input values and output values
	const [inputValue, setInputValue] = useState('');
	const [outputValue, setOutputValue] = useState('');

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
		setOutputValue(String(Number(inputValue) * 2));
	};

	const [transferHash, setTransferHash] = useState<null | String>(null);


	// Our call to the contract for claiming a burn request
	const claimHandler = async () => {
		  const burnInput = ethers.parseUnits(inputValue, 18)
		  if(props.contract){
			try{
				// Call to our contract
				let txt = await props.contract!.withdraw(burnInput, props.user_address, props.user_address);
				console.log(txt);
				await props.provider!.waitForTransaction(txt.hash);
    			console.log('Exchange confirmed');

				setTransferHash("Transfer confirmation hash: " + txt.hash);
				props.updateBalance();
			} catch (error) {
				console.error(`Error in exchange: ${error}`);
				if (typeof error === 'object' && error !== null && 'reason' in error) {
					setTransferHash((error as { reason?: string }).reason ?? "An unexpected error occurred.");
				} else {
					setTransferHash("An unexpected error occurred.");
				}
			}
		}
	  };

	  let claim = props.stringDaiToSend ? props.stringDaiToSend.slice(0, 8) : "";
	  // Input and output handlers for user input
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
						<button className="swap-button" value={inputValue} onClick={claimHandler}>
							Claim
						</button>
					</div>
					<div className="rate-container">
						<h4>Current Epoch:</h4>
						<div className="rate-value">{props.stringCurrentEpoch}</div>
						<h4>Claim Epoch:</h4>
						<div className="rate-value">{props.stringEpochPlaced}</div>
						<h3>Amount Claimable:</h3>
						<div className="rate-value">{claim}</div>
					</div>
				</div>
				<div>
					<h4>{transferHash}</h4>
				</div>
			</div>
		)
	
}

export default InteractionsBurn;