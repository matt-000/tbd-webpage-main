import React from 'react'
import { useState} from 'react'
import {ethers} from 'ethers'

interface InteractionsProps {
	provider: null | ethers.BrowserProvider;
	signer: null | ethers.JsonRpcSigner;
	contract: null | ethers.Contract;
	user_address: null | String;
	gns_address: null | String;
	nftID: null | bigint;
	maxBorrowedUSDC: null | String;
	updateNFTInfo: () => void;
}

const InteractionsBorrow: React.FC<InteractionsProps> = (props) => {
	// State variables for input
	const [inputValue, setInputValue] = useState('');
	const [outputValue, setOutputValue] = useState('');

	// Handling the input change
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
		setOutputValue(String(Number(inputValue) * 2));
	};

	// State variables for transaction hash variables
	const [transferHash, setTransferHash] = useState<null | String>(null);
	
	// Our call to the contract
	const borrowHandler = async () => {
		  const burnInput = ethers.parseUnits(inputValue, 18)
		  console.log(burnInput)
		  console.log(props.nftID)

			try{
				// Call to our contract
				let txt = await props.contract!.borrow(props.nftID, burnInput, props.user_address);
				console.log(txt);
				await props.provider!.waitForTransaction(txt.hash);
    			console.log('Borrowed Against Collateral');

				setTransferHash("Transfer confirmation hash: " + txt.hash);
				props.updateNFTInfo();
			} catch (error) {
				console.error(`Error in exchange: ${error}`);
				if (typeof error === 'object' && error !== null && 'reason' in error) {
					setTransferHash((error as { reason?: string }).reason ?? "An unexpected error occurred.");
				} else {
					setTransferHash("An unexpected error occurred.");
				}
			}
	  };

	  let borrowMax = props.maxBorrowedUSDC ? props.maxBorrowedUSDC.slice(0, 8) : "";
	  // Containers for input and use of on click events
	return (
		<div className="container">
			<div className="swap-container">
			<div className="form-container">
				<p className="heading">Borrow DAI</p>
				<div className="input-group">
				<input
					type="text"
					placeholder="0"
					className="input-field"
					value={inputValue}
					onChange={handleInputChange}
				/>
				<select className="select-field">
					<option value="dai">DAI</option>
					{/* Add more options here */}
				</select>
				</div>
				<button
				className="refresh-button swap-button"
				onClick={borrowHandler}
				>
				Borrow
				</button>
			</div>
			<div className="rate-container">
				<p className="heading">Maximum amount of DAI to be Borrowed</p>
				<div className="rate-value">
					{borrowMax}
				</div>
			</div>
			</div>
			<div>
			<p className="heading">{transferHash}</p>
			</div>
		</div>
	)
}

export default InteractionsBorrow;