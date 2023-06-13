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
	borrowedUSDC: null | String;
}

const InteractionsRepayDebt: React.FC<InteractionsProps> = (props) => {

	const [transferHash, setTransferHash] = useState<null | String>(null);
	
	const borrowHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); 
		// DAI contract address on Mainnet
		const daiAddress = '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063';
  
		const daiAbi = [
		  "function approve(address spender, uint amount)",
		  "function allowance(address owner, address spender) view returns (uint)"
		];
	  
		const daiContract = new ethers.Contract(daiAddress, daiAbi, props.signer);

		  const burnInputMain = '0.03'
		  const burnInput = ethers.parseUnits(burnInputMain, 18)
		  console.log(burnInput)
		  console.log(props.nftID)
			try{
				const approvalTx = await daiContract.approve(props.gns_address, burnInput);
				await props.provider!.waitForTransaction(approvalTx.hash);
    			console.log('Approval confirmed');	

				console.log('Dai Pool address:', props.gns_address);
				console.log('Props address:', props.user_address);

				const allowance = await daiContract.allowance(props.user_address, props.gns_address);
				console.log(`Allowance: ${ethers.formatUnits(allowance, 18)} DAI`);
				console.log(`Allowance: ${allowance}`);

				let txt = await props.contract!.repayLoan(props.nftID, burnInput);
				console.log(txt);
				await props.provider!.waitForTransaction(txt.hash);
    			console.log('Debts Paid');

				setTransferHash("Transfer confirmation hash: " + txt.hash);
			} catch (error) {
				console.error(`Error in exchange: ${error}`);
			}
	  };

	return (
			<div className="interactionsCard">
				<form onSubmit={borrowHandler}>
					<h3> Repay Debt </h3>
						<input type='number' name='collateralAmount'/>
						<p>Amount Borrowed(Debt Outstanding): {props.borrowedUSDC}</p>
						<button type='submit' className="button6">Repay Debt</button>
						<div>
							{transferHash}
						</div>
			</form>
			</div>
		)
	
}

export default InteractionsRepayDebt;