import React from 'react'
import { useState, useContext} from 'react'
import {ethers} from 'ethers'
import { UserAddressContext } from './../../UserAddressContext'

interface InteractionsProps {
	maxBorrowedUsdc: null | bigint;
	changeOrSet: string;
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
		context!.updateNFTIDGNSPool(inputValue)
	  };

	  const zero_val = ethers.parseUnits("0", 0);

	  // Containers for input and use of on click events
	return (
	<div className="form-container-borrow">
			<p className="heading">{props.changeOrSet} NFT ID:</p>
			<div className="input-group-borrow">
			<input
				type="text"
				placeholder="0"
				className="input-field"
				value={inputValue}
				onChange={handleInputChange}
			/>
			</div>
			<button
			className="refresh-button swap-button"
			onClick={updateHandler}
			>
			{props.changeOrSet}
			</button>
			<div>
			{props!.maxBorrowedUsdc === zero_val && <p className="heading">Error: NFT ID {context!.nftIDGNSPool} is not valid.</p>}
		</div>
	</div>
	)
}

export default InteractionsSetNFTID;