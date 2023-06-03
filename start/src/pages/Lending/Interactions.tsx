import React from 'react'
import { useState} from 'react'
import {ethers} from 'ethers'
import './Wallet.module.css';

interface InteractionsProps {
	// Define the prop types for your component
	// For example:
	contract: null | ethers.Contract;
	address: null | String;
}
  
const iface = new ethers.Interface([
	"function maxWithdraw(address owner) view returns (uint256)",
	"function maxMint(address owner) returns (uint256)",
	"function previewMint(uint256 shares) view returns (uint256)",
	"function deposit(uint256, address) returns (uint256)"
  ]);

  let fetti_address =  '0x3F827541482530549099782C6d53dB5Fa13c6435';

const Interactions: React.FC<InteractionsProps> = (props) => {

	const [transferHash, setTransferHash] = useState<null | String>(null);


	const transferHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); 
		console.log("help me")
		// DAI contract address on Mainnet
		const daiAddress = '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063';
  
		const daiAbi = [
		  "function approve(address spender, uint amount)",
		  "function allowance(address owner, address spender) view returns (uint)"
		];

		if (window.ethereum && window.ethereum.selectedAddress) {
			console.log("were okay")
		  } else {
			console.log("were fucked")
		  }

		let approveProvider = new ethers.BrowserProvider(window.ethereum);
		let approveSigner = await approveProvider.getSigner();
	  
		const daiContract = new ethers.Contract(daiAddress, daiAbi, approveSigner);

		e.preventDefault();
		//let sendAmountInput = e.currentTarget.elements.namedItem('sendAmount') as HTMLInputElement;
	  
			try{
				let transferAmount = "1";
				const tokenAmountInEther = ethers.parseUnits(transferAmount, 18);

				// Approve the contract to spend the DAI
				const approvalTx = await daiContract.approve(fetti_address, tokenAmountInEther);
				await approveProvider.waitForTransaction(approvalTx.hash);
    			console.log('Approval confirmed');	

				let fettiContract = new ethers.Contract(fetti_address, iface.fragments, approveSigner)

				console.log('Fetti address:', fetti_address);
				console.log('Props address:', props.address);

				const allowance = await daiContract.allowance(props.address, fetti_address);
				console.log(`Allowance: ${ethers.formatUnits(allowance, 18)} DAI`);
				console.log(`Allowance: ${allowance}`);

				let txt = await fettiContract.deposit(tokenAmountInEther, props.address);
				console.log(txt);
				await approveProvider.waitForTransaction(txt.hash);
    			console.log('Exchange confirmed');

				setTransferHash("Transfer confirmation hash: " + txt.hash);
			} catch (error) {
				console.error(`Error in exchange: ${error}`);
			}
	  };

	return (
			<div className="interactionsCard">
				<form onSubmit={transferHandler}>
					<h3> Transfer Coins </h3>
						<p> Mint </p>
						<input type='number' name='sendAmount'/>

						<button type='submit' className="button6">Mint</button>
						<div>
							{transferHash}
						</div>
			</form>
			</div>
		)
	
}

export default Interactions;