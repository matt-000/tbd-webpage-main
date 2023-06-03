import React from 'react'
import { useState} from 'react'
import {ethers} from 'ethers'
import './Wallet.module.css';

interface InteractionsProps {
	provider: null | ethers.BrowserProvider;
	signer: null | ethers.JsonRpcSigner;
	contract: null | ethers.Contract;
	user_address: null | String;
	fetti_address: null | String;
}

const InteractionsMint: React.FC<InteractionsProps> = (props) => {

	const [transferHash, setTransferHash] = useState<null | String>(null);


	const transferHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		//Prevent Refresh
		e.preventDefault(); 

		// DAI contract address on Mainnet
		const daiAddress = '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063';
  
		const daiAbi = [
		  "function approve(address spender, uint amount)",
		  "function allowance(address owner, address spender) view returns (uint)"
		];
	  
		const daiContract = new ethers.Contract(daiAddress, daiAbi, props.signer);

		e.preventDefault();
		//let sendAmountInput = e.currentTarget.elements.namedItem('sendAmount') as HTMLInputElement;
	  
			try{
				let transferAmount = "1";
				const tokenAmountInEther = ethers.parseUnits(transferAmount, 18);

				// Approve the contract to spend the DAI
				const approvalTx = await daiContract.approve(props.fetti_address, tokenAmountInEther);
				await props.provider!.waitForTransaction(approvalTx.hash);
    			console.log('Approval confirmed');	

				console.log('Fetti address:', props.fetti_address);
				console.log('Props address:', props.user_address);

				const allowance = await daiContract.allowance(props.user_address, props.fetti_address);
				console.log(`Allowance: ${ethers.formatUnits(allowance, 18)} DAI`);
				console.log(`Allowance: ${allowance}`);

				let txt = await props.contract!.deposit(tokenAmountInEther, props.user_address);
				console.log(txt);
				await props.provider!.waitForTransaction(txt.hash);
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

export default InteractionsMint;