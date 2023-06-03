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
}

const InteractionsMint: React.FC<InteractionsProps> = (props) => {
	const [inputValue, setInputValue] = useState('');
	const [outputValue, setOutputValue] = useState('');

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
		setOutputValue(String(Number(inputValue) * 2));
	};

	const [transferHash, setTransferHash] = useState<null | String>(null);


	const transferHandler = async () => {
		// DAI contract address on Mainnet
		const daiAddress = '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063';
  
		const daiAbi = [
		  "function approve(address spender, uint amount)",
		  "function allowance(address owner, address spender) view returns (uint)"
		];
	  
		const daiContract = new ethers.Contract(daiAddress, daiAbi, props.signer);
	  
			try{
				const mintAmount = ethers.parseUnits(inputValue, 18);

				// Approve the contract to spend the DAI
				const approvalTx = await daiContract.approve(props.fetti_address, mintAmount);
				await props.provider!.waitForTransaction(approvalTx.hash);
    			console.log('Approval confirmed');	

				console.log('Fetti address:', props.fetti_address);
				console.log('Props address:', props.user_address);

				const allowance = await daiContract.allowance(props.user_address, props.fetti_address);
				console.log(`Allowance: ${ethers.formatUnits(allowance, 18)} DAI`);
				console.log(`Allowance: ${allowance}`);

				let txt = await props.contract!.deposit(mintAmount, props.user_address);
				console.log(txt);
				await props.provider!.waitForTransaction(txt.hash);
    			console.log('Exchange confirmed');

				setTransferHash("Transfer confirmation hash: " + txt.hash);
			} catch (error) {
				console.error(`Error in exchange: ${error}`);
			}
	  };

	return (
		<div className="container">
			<div className="swap-container">
				<div className="form-container">
					<h2>Swap</h2>
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
					<button className="swap-button" onClick={transferHandler}>
						Swap
					</button>
					<div className="input-group">
						<input
						type="text"
						placeholder="0"
						className="input-field"
						value={outputValue}
						readOnly
						/>
						<select className="select-field">
						<option value="fet">FET</option>
						{/* Add more options here */}
						</select>
					</div>
				</div>
				<div className="rate-container">
					<h3>Exchange Rate</h3>
					<div className="rate-value">1 FET = 1 DAI</div>
				</div>
			</div>
		</div>
		)
	
}

export default InteractionsMint;