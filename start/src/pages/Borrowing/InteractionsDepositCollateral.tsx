import React from 'react'
import { useState, useContext} from 'react'
import { ethers} from 'ethers'
import { UserAddressContext } from './../../UserAddressContext';

interface InteractionsProps {
	provider: null | ethers.BrowserProvider;
	signer: null | ethers.JsonRpcSigner;
	contract: null | ethers.Contract;
	user_address: null | String;
	gns_address: null | String;
	updateNFTInfo: () => void;
}

const InteractionsDepositCollateral: React.FC<InteractionsProps> = (props) => {
	const [inputValue, setInputValue] = useState('');
	const [outputValue, setOutputValue] = useState('');

	const context = useContext(UserAddressContext);

	// Handling the input change
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
				let txt = await props.contract!.depositColateral(props.user_address, burnInput);
				console.log(txt);
				await props.provider!.waitForTransaction(txt.hash);
    			console.log('Deposited Collateral');

				setTransferHash("Transfer confirmation hash: " + txt.hash);
				
				// 
				let token_id = await getNftIdFromTransaction(txt.hash)
				console.log(token_id)
				context!.updateNFTIDGNSPool(token_id);
			} catch (error) {
				console.error(`Error in exchange: ${error}`);
				if (typeof error === 'object' && error !== null && 'reason' in error) {
					setTransferHash((error as { reason?: string }).reason ?? "An unexpected error occurred.");
				} else {
					setTransferHash("An unexpected error occurred.");
				}
			}
	  };

	  const getNftIdFromTransaction = async (txHash: string) => {
		const receipt = await props.provider!.getTransactionReceipt(txHash);
		console.log(receipt!.logs);
		for (let i = 0; i < receipt!.logs.length; i++) {
			const log = receipt!.logs[i];
			const logCopy = { ...log, topics: [...log.topics] };
			if (log.address === props.gns_address) {
				try {
					// Parse the log
					const parsedLog = props.contract!.interface.parseLog(logCopy);
					// If this log is a Transfer event, return the token ID
					if (parsedLog && parsedLog.name === 'Transfer') {
						const { tokenId } = parsedLog!.args;
						return tokenId.toString();
					}
				} catch (e) {
					console.error("Failed to parse log", e);
				}
			}
		}
		throw new Error("NFT ID not found in transaction");
	  };
	  

	return (
		<div className="container">
		<div className="swap-container">
			<div className="form-container">
				<h2>Deposit Collateral</h2>
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
					Deposit
				</button>
			</div>
		</div>
		<div>
			<h3>Remember to add FET/GNS Pool NFT to your wallet (Contract Address): {props.gns_address}</h3>
			<h3>{transferHash}</h3>
		</div>
	</div>
		)
	
}

export default InteractionsDepositCollateral;