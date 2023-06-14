import React from 'react'
import { useState} from 'react'
import {Contract, ethers} from 'ethers'

interface InteractionsProps {
	provider: null | ethers.BrowserProvider;
	signer: null | ethers.JsonRpcSigner;
	contract: null | ethers.Contract;
	user_address: null | String;
	gns_address: null | String;
	nftID: null | bigint;
	stakedGNS: null | String;
	unlockTime: null |String;
}

const InteractionsWithdraw: React.FC<InteractionsProps> = (props) => {

	const [transferHash, setTransferHash] = useState<null | String>(null);
	
	const borrowHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		  console.log(props.nftID)
			try{
				let txt = await props.contract!.widthdrawColateral(props.user_address, props.nftID);
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
						<p>Amount Staked(GNS): {props.stakedGNS}</p>
						<p>Unlock Time: {props.unlockTime}</p>
						<button type='submit' className="button6">Withdraw</button>
						<div>
							{transferHash}
						</div>
			</form>
			</div>
		)
	
}

export default InteractionsWithdraw;