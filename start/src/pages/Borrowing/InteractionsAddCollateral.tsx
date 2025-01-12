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
	  
		if(props.contract){
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
		}
	  };

	  // Containers for input and use of on click events
	return (
		<div className="container">
			<div className="swap-container">
				<div className="form-container">
					<h2>Add Collateral</h2>
					<div className="input-group">
						<input
						type="text"
						placeholder="0"
						className="input-field"
						value={inputValue}
						onChange={handleInputChange}
						/>
						<select className="select-field">
						<option value="dai">GNS</option>
						</select>
					</div>
					<button className="swap-button" value={inputValue} onClick={borrowHandler}>
						Add
					</button>
				</div>
			</div>
			<div>
				<h4>{transferHash}</h4>
			</div>
		</div>
		)
}

export default InteractionsAddCollateral;