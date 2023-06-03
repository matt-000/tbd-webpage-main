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
  
const iface = new ethers.Interface([
	"function depositColateral(address, uint256) returns (uint256)",
	"function addColateral(uint256, uint256) returns (uint256)",
	"function repayLoan(uint256, uint256) returns (uint256)",
	"function widthdrawColateral(address, uint256) returns (uint256)"
  ]);

  let gnsPool_address =  '0x427c7D210FD4bc7d028c9c3CC6224875878faEaF';

const InteractionsBorrow: React.FC<InteractionsProps> = (props) => {

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

		e.preventDefault();
		  const burnInputMain = '1'
		  const burnInput = ethers.parseUnits(burnInputMain, 18)
		  console.log(burnInput)
			try{
				const approvalTx = await gnsContract.approve(gnsPool_address, burnInput);
				await props.provider!.waitForTransaction(approvalTx.hash);
    			console.log('Approval confirmed');	

				console.log('GNS Pool address:', gnsPool_address);
				console.log('Props address:', props.user_address);

				const allowance = await gnsContract.allowance(props.user_address, gnsPool_address);
				console.log(`Allowance: ${ethers.formatUnits(allowance, 18)} DAI`);
				console.log(`Allowance: ${allowance}`);

				let gnsPoolContract = new ethers.Contract(gnsPool_address, iface.fragments, props.signer)

				let txt = await gnsPoolContract.withdraw(burnInput, props.user_address, props.user_address);
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
				<form onSubmit={borrowHandler}>
					<h3> Transfer Coins </h3>
						<p> Burn </p>
						<input type='number' name='collateralAmount'/>

						<button type='submit' className="button6">Burn</button>
						<div>
							{transferHash}
						</div>
			</form>
			</div>
		)
	
}

export default InteractionsBorrow;