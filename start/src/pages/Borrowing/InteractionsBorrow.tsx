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
}

const InteractionsBorrow: React.FC<InteractionsProps> = (props) => {
	const [inputValue, setInputValue] = useState('');
	const [outputValue, setOutputValue] = useState('');

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
		setOutputValue(String(Number(inputValue) * 2));
	};
	const [transferHash, setTransferHash] = useState<null | String>(null);
	
	const borrowHandler = async () => {
		  const burnInput = ethers.parseUnits(inputValue, 18)
		  console.log(burnInput)
		  console.log(props.nftID)

			try{
				let txt = await props.contract!.borrow(props.nftID, burnInput, props.user_address);
				console.log(txt);
				await props.provider!.waitForTransaction(txt.hash);
    			console.log('Borrowed Against Collateral');

				setTransferHash("Transfer confirmation hash: " + txt.hash);
			} catch (error) {
				console.error(`Error in exchange: ${error}`);
			}
	  };

	return (
		<div className="container">
			<div className="swap-container">
				<div className="form-container">
					<h2>Borrow DAI</h2>
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
					<button className="swap-button" value={inputValue} onClick={borrowHandler}>
						Borrow
					</button>
				</div>
				<div className="rate-container">
					<h3>Maximum amount of DAI to be Borrowed</h3>
					<div className="rate-value">{props.maxBorrowedUSDC}</div>
				</div>
			</div>
		</div>
		)
}

export default InteractionsBorrow;