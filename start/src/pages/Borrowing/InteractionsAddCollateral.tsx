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
}

const InteractionsAddCollateral: React.FC<InteractionsProps> = (props) => {
	const [inputValue, setInputValue] = useState('');
	const [outputValue, setOutputValue] = useState('');

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
		setOutputValue(String(Number(inputValue) * 2));
	};
	const [transferHash, setTransferHash] = useState<null | String>(null);
	
	const borrowHandler = async () => {
		// GNS contract address on Mainnet
		const gnsAddress = '0xE5417Af564e4bFDA1c483642db72007871397896';
  
		const gnsAbi = [
		  "function approve(address spender, uint amount)",
		  "function allowance(address owner, address spender) view returns (uint)"
		];

		if (window.ethereum && window.ethereum.selectedAddress) {
			console.log("were okay")
		  } else {
			console.log("were fucked")
		  }
	  
		const gnsContract = new ethers.Contract(gnsAddress, gnsAbi, props.signer);

		  const burnInput = ethers.parseUnits(inputValue, 18)
		  console.log(burnInput)
		  console.log(props.nftID)
			try{
				const approvalTx = await gnsContract.approve(props.gns_address, burnInput);
				await props.provider!.waitForTransaction(approvalTx.hash);
    			console.log('Approval confirmed');	

				console.log('GNS Pool address:', props.gns_address);
				console.log('Props address:', props.user_address);

				const allowance = await gnsContract.allowance(props.user_address, props.gns_address);
				console.log(`Allowance: ${ethers.formatUnits(allowance, 18)} GNS`);
				console.log(`Allowance: ${allowance}`);

				let txt = await props.contract!.addColateral(props.nftID, burnInput);
				console.log(txt);
				await props.provider!.waitForTransaction(txt.hash);
    			console.log('Added Collateral');

				setTransferHash("Transfer confirmation hash: " + txt.hash);
			} catch (error) {
				console.error(`Error in exchange: ${error}`);
			}
	  };

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
						{/* Add more options here */}
						</select>
					</div>
					<button className="swap-button" value={inputValue} onClick={borrowHandler}>
						Add
					</button>
				</div>
			</div>
		</div>
		)
}

export default InteractionsAddCollateral;