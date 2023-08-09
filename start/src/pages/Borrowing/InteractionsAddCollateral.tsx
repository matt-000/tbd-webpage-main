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
	updateNFTInfo: () => void;
}

const InteractionsAddCollateral: React.FC<InteractionsProps> = (props) => {
	// Values for saving user input for their nft
	const [inputValue, setInputValue] = useState('');
	const [outputValue, setOutputValue] = useState('');

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
		setOutputValue(String(Number(inputValue) * 2));
	};
	const [transferHash, setTransferHash] = useState<null | String>(null);
	
	// Our call to the contract
	const borrowHandler = async () => {
		// GNS address for transaction approval
		const gnsAddress = '0xE5417Af564e4bFDA1c483642db72007871397896';
  
		// Simple ABI for GNS functions were using
		const gnsAbi = [
		  "function approve(address spender, uint amount)",
		  "function allowance(address owner, address spender) view returns (uint)"
		];
	  
		// Initialized contract
		const gnsContract = new ethers.Contract(gnsAddress, gnsAbi, props.signer);

		// Input from user being converted
		  const burnInput = ethers.parseUnits(inputValue, 18)
		  console.log(burnInput)
		  console.log(props.nftID)
			try{
				// Approval from GNS
				const approvalTx = await gnsContract.approve(props.gns_address, burnInput);
				await props.provider!.waitForTransaction(approvalTx.hash);
    			console.log('Approval confirmed');	

				console.log('GNS Pool address:', props.gns_address);
				console.log('Props address:', props.user_address);

				// Check to see what the allowance is
				const allowance = await gnsContract.allowance(props.user_address, props.gns_address);
				console.log(`Allowance: ${ethers.formatUnits(allowance, 18)} GNS`);
				console.log(`Allowance: ${allowance}`);

				// Call to our contract
				let txt = await props.contract!.addColateral(props.nftID, burnInput);
				console.log(txt);
				await props.provider!.waitForTransaction(txt.hash);
    			console.log('Added Collateral');

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

	  // Containers for input and use of on click events
	return (
		<div className="form-container-borrow">
			<p className="heading">Add Collateral:</p>
			<div className="input-group-borrow">
			<input
				type="text"
				placeholder="0"
				className="input-field"
				value={inputValue}
				onChange={handleInputChange}
			/>
			<select className="select-field">
				<option value="gns">GNS</option>
				{/* Add more options here */}
			</select>
			</div>
			<button
			className="refresh-button swap-button"
			onClick={borrowHandler}
			>
			Add
			</button>
			<div>
		<p className="heading">{transferHash}</p>
		</div>
		</div>
	)
}

export default InteractionsAddCollateral;