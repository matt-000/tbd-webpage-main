import React from 'react'
import { useState } from 'react'
import { ethers } from 'ethers'

interface InteractionsProps {
	provider: null | ethers.BrowserProvider;
	signer: null | ethers.JsonRpcSigner;
	contract: null | ethers.Contract;
	user_address: null | String;
	gns_address: null | String;
	nftID: null | bigint;
	stakedGNS: null | String;
	unlockTime: null |String;
	updateNFTInfo: () => void;
}

const InteractionsWithdraw: React.FC<InteractionsProps> = (props) => {
	// State variables for transaction hash variables
	const [transferHash, setTransferHash] = useState<null | String>(null);
	
	// Our call to the contract to withdraw loan collateral
	const withdrawHandler = async () => {
		  console.log(props.nftID)
			try{
				let txt = await props.contract!.widthdrawColateral(props.user_address, props.nftID);
				console.log(txt);
				await props.provider!.waitForTransaction(txt.hash);
    			console.log('Withdrawed Collateral');

				setTransferHash("Transfer confirmation hash: " + txt.hash);

				props.updateNFTInfo();
			} catch (error) {
				console.error(`Error in exchange: ${error}`);
				if (typeof error === 'object' && error !== null && 'reason' in error) {
					setTransferHash((error as { reason?: string }).reason ?? "An unexpected error occurred.");
				} else {
					setTransferHash("An unexpected error occurred.");
				}
			}
	};

	let staked = props.stakedGNS ? props.stakedGNS.slice(0, 8) : "";
	// Containers holding contract info and on click events
	return (
	<div className="form-container-borrow">
			<p className="heading">Withdraw Collateral:</p>
			<button
			className="refresh-button swap-button"
			onClick={withdrawHandler}
			>
			Withdraw
			</button>
			<div>
		<p className="heading">{transferHash}</p>
		</div>
	</div>
)
	
}

export default InteractionsWithdraw;