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

const InteractionsBurn: React.FC<InteractionsProps> = (props) => {

	const [transferHash, setTransferHash] = useState<null | String>(null);


	const transferHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		  const burnInputMain = '1'
		  const burnInput = ethers.parseUnits(burnInputMain, 18)
		  console.log(burnInput)
			try{
				let txt = await props.contract!.withdraw(burnInput, props.user_address, props.user_address);
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
						<p> Burn </p>
						<input type='number' name='burnAmount'/>

						<button type='submit' className="button6">Burn</button>
						<div>
							{transferHash}
						</div>
			</form>
			</div>
		)
	
}

export default InteractionsBurn;