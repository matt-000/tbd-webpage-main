import React from 'react'
import { useState} from 'react'
import {ethers} from 'ethers'

interface InteractionsProps {
	provider: null | ethers.BrowserProvider;
	signer: null | ethers.JsonRpcSigner;
	contract: null | ethers.Contract;
	user_address: null | String;
	gns_address: null | String;
}

const InteractionsBorrow: React.FC<InteractionsProps> = (props) => {

	const [transferHash, setTransferHash] = useState<null | String>(null);
	
	const borrowHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		  const burnInputMain = '0.03'
		  const burnInput = ethers.parseUnits(burnInputMain, 18)
		  const nftID = '3'
		  const nftIDInput = ethers.parseUnits(nftID, 0)
		  console.log(burnInput)
		  console.log(nftIDInput)

			try{
				let txt = await props.contract!.borrow(nftIDInput, burnInput, props.user_address);
				console.log(txt);
				await props.provider!.waitForTransaction(txt.hash);
    			console.log('Borrowed Against Collateral');

				setTransferHash("Transfer confirmation hash: " + txt.hash);
			} catch (error) {
				console.error(`Error in exchange: ${error}`);
			}
	  };

	return (
			<div className="interactionsCard">
				<form onSubmit={borrowHandler}>
					<h3> Borrow </h3>
						<input type='number' name='borrowAmount'/>

						<button type='submit' className="button6">Borrow</button>
						<div>
							{transferHash}
						</div>
			</form>
			</div>
		)
	
}

export default InteractionsBorrow;