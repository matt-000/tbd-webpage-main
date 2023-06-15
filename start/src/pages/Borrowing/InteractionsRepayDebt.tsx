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
	borrowedUSDC: null | String;
}

const InteractionsRepayDebt: React.FC<InteractionsProps> = (props) => {
	const [inputValue, setInputValue] = useState('');
	const [outputValue, setOutputValue] = useState('');

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
		setOutputValue(String(Number(inputValue) * 2));
	};
	const [transferHash, setTransferHash] = useState<null | String>(null);
	
	const borrowHandler = async () => {
		// DAI contract address on Mainnet
		const daiAddress = '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063';
  
		const daiAbi = [
		  "function approve(address spender, uint amount)",
		  "function allowance(address owner, address spender) view returns (uint)"
		];
	  
		const daiContract = new ethers.Contract(daiAddress, daiAbi, props.signer);

		  const burnInput = ethers.parseUnits(inputValue, 18)
		  console.log(burnInput)
		  console.log(props.nftID)
			try{
				const approvalTx = await daiContract.approve(props.gns_address, burnInput);
				await props.provider!.waitForTransaction(approvalTx.hash);
    			console.log('Approval confirmed');	

				console.log('Dai Pool address:', props.gns_address);
				console.log('Props address:', props.user_address);

				const allowance = await daiContract.allowance(props.user_address, props.gns_address);
				console.log(`Allowance: ${ethers.formatUnits(allowance, 18)} DAI`);
				console.log(`Allowance: ${allowance}`);

				let txt = await props.contract!.repayLoan(props.nftID, burnInput);
				console.log(txt);
				await props.provider!.waitForTransaction(txt.hash);
    			console.log('Debts Paid');

				setTransferHash("Transfer confirmation hash: " + txt.hash);
			} catch (error) {
				console.error(`Error in exchange: ${error}`);
			}
	  };

	return (
		<div className="container">
			<div className="swap-container">
				<div className="form-container">
					<h2>Repay Debt</h2>
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
						Repay
					</button>
				</div>
				<div className="rate-container">
					<h3>Outstanding Debt</h3>
					<div className="rate-value">{props.borrowedUSDC}</div>
				</div>
			</div>
		</div>
		)
	
}

export default InteractionsRepayDebt;