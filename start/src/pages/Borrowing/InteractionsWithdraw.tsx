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
	
	const borrowHandler = async () => {
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
		<div className="container">
				<div className="swap-container">
					<div className="form-container">
						<h2>Withdraw Collateral</h2>
						<button className="swap-button" onClick={borrowHandler}>
							Withdraw
						</button>
					</div>
					<div className="rate-container">
						<h3>Current amount of staked GNS</h3>
						<div className="rate-value">{props.stakedGNS}</div>
						<h3>Time until withdraw</h3>
						<div className="rate-value">{props.unlockTime}</div>
					</div>
				</div>
			</div>
		)
	
}

export default InteractionsWithdraw;