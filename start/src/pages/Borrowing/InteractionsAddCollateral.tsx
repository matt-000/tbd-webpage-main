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
}

const InteractionsAddCollateral: React.FC<InteractionsProps> = (props) => {

	const [transferHash, setTransferHash] = useState<null | String>(null);
	
	const borrowHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); 
		console.log("help me")
		// DAI contract address on Mainnet
		const gnsAddress = '0xE5417Af564e4bFDA1c483642db72007871397896';
  
		const gnsAbi = [
		  "function approve(address spender, uint amount)",
		  "function allowance(address owner, address spender) view returns (uint)"
		];

		if (window.ethereum && window.ethereum.selectedAddress) {
			console.log("were okay")
		  } else {
			console.log("were fucked")
		  }
	  
		const gnsContract = new ethers.Contract(gnsAddress, gnsAbi, props.signer);

		  const burnInputMain = '0.02'
		  const burnInput = ethers.parseUnits(burnInputMain, 18)
		  console.log(burnInput)
		  console.log(props.nftID)
			try{
				const approvalTx = await gnsContract.approve(props.gns_address, burnInput);
				await props.provider!.waitForTransaction(approvalTx.hash);
    			console.log('Approval confirmed');	

				console.log('GNS Pool address:', props.gns_address);
				console.log('Props address:', props.user_address);

				const allowance = await gnsContract.allowance(props.user_address, props.gns_address);
				console.log(`Allowance: ${ethers.formatUnits(allowance, 18)} GNS`);
				console.log(`Allowance: ${allowance}`);

				let txt = await props.contract!.addColateral(props.nftID, burnInput);
				console.log(txt);
				await props.provider!.waitForTransaction(txt.hash);
    			console.log('Added Collateral');

				setTransferHash("Transfer confirmation hash: " + txt.hash);
			} catch (error) {
				console.error(`Error in exchange: ${error}`);
			}
	  };

	return (
			<div className="interactionsCard">
				<form onSubmit={borrowHandler}>
					<h3> Add Collateral </h3>
						<input type='number' name='collateralAmount'/>

						<button type='submit' className="button6">Add Collateral</button>
						<div>
							{transferHash}
						</div>
			</form>
			</div>
		)
	
}

export default InteractionsAddCollateral;