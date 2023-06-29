import React from 'react'
import { useState, useContext} from 'react'
import {ethers} from 'ethers'
import { UserAddressContext } from './../../UserAddressContext'

interface InteractionsProps {
	maxBorrowedUsdc: null | bigint;
}

const InteractionsSetNFTID: React.FC<InteractionsProps> = (props) => {
	const [inputValue, setInputValue] = useState('');
	const context = useContext(UserAddressContext);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};
	
	const borrowHandler = async () => { 
		context!.updateNFTIDGNSPool(inputValue)
	  };

	  const zero_val = ethers.parseUnits("0", 0);

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
					<button className="swap-button" value={inputValue} onClick={borrowHandler}>
						Set
					</button>
				</div>
			</div>
			{props!.maxBorrowedUsdc === zero_val && <p>Error: NFT ID {context!.nftIDGNSPool} is not valid.</p>}
		</div>
		)
}

export default InteractionsSetNFTID;