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
  

const Interactions: React.FC<InteractionsProps> = (props) => {

	const [transferHash, setTransferHash] = useState<null | String>(null);


	const transferHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let sendAmountInput = e.currentTarget.elements.namedItem('sendAmount') as HTMLInputElement;
	  
		if (sendAmountInput) {
		  let transferAmount = sendAmountInput.value;
	  
		  let txt = await props.contract!.mint(BigInt(transferAmount), props.address);
		  console.log(txt);
		  setTransferHash("Transfer confirmation hash: " + txt.hash);
		}
	  };

	return (
			<div className="interactionsCard">
				<form onSubmit={transferHandler}>
					<h3> Transfer Coins </h3>
						<p> Mint </p>
						<input type='number' />

						<button type='submit' className="button6">Send</button>
						<div>
							{transferHash}
						</div>
			</form>
			</div>
		)
	
}

export default Interactions;