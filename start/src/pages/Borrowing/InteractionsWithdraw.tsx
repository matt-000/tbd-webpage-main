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

const InteractionsWithdraw: React.FC<InteractionsProps> = (props) => {

	const [transferHash, setTransferHash] = useState<null | String>(null);
	
	const borrowHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		  const burnInputMain = '0.01'
		  const burnInput = ethers.parseUnits(burnInputMain, 18)
		  const nftID = '3'
		  const nftIDInput = ethers.parseUnits(nftID, 0)
		  console.log(burnInput)
		  console.log(nftIDInput)
			try{
				let txt = await props.contract!.widthdrawColateral(props.user_address, nftIDInput);
				console.log(txt);
				await props.provider!.waitForTransaction(txt.hash);
    			console.log('Withdrawed Collateral');

				setTransferHash("Transfer confirmation hash: " + txt.hash);
			} catch (error) {
				console.error(`Error in exchange: ${error}`);
			}
	  };

	return (
			<div className="interactionsCard">
				<form onSubmit={borrowHandler}>
					<h3> Withdraw Collateral </h3>
						<input type='number' name='collateralAmount'/>

						<button type='submit' className="button6">Withdraw</button>
						<div>
							{transferHash}
						</div>
			</form>
			</div>
		)
	
}

export default InteractionsWithdraw;