import React from 'react'
import { useState, useContext} from 'react'
import {ethers} from 'ethers'
import { UserAddressContext } from './../../UserAddressContext'

interface InteractionsProps {
	maxBorrowedUsdc: null | bigint;
}

const InteractionsSetNFTID: React.FC<InteractionsProps> = (props) => {
	// Input value holders from our containers
	const [inputValue, setInputValue] = useState('');
	const context = useContext(UserAddressContext);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};
	
	// Calls the context to update our alue
	const updateHandler = async () => { 
		if(context!.chainID === "0x89"){
			context!.updateNFTIDGNSPool(inputValue)
		}
	  };

	  const zero_val = ethers.parseUnits("0", 0);

	  // Containers for input and use of on click events
	return (
		<div className="container">
			<div className="swap-container">
				<div className="form-container">
					<h2>Set NFT ID</h2>
					<div className="input-group">
						<input
						type="text"
						placeholder="0"
						className="input-field"
						value={inputValue}
						onChange={handleInputChange}
						/>
					</div>
					<button className="swap-button" value={inputValue} onClick={updateHandler}>
						Set
					</button>
				</div>
			</div>
			{props!.maxBorrowedUsdc === zero_val && <p>Error: NFT ID {context!.nftIDGNSPool} is not valid.</p>}
		</div>
		)
}

export default InteractionsSetNFTID;