import React from 'react';
import './Borrowing.css';
import {useContext} from 'react'
import { UserAddressContext } from './../../UserAddressContext';

interface InteractionsProps {
	totalBorrowed: null | String;
}

const GNSFettiInfo: React.FC = () => {
  const context = useContext(UserAddressContext);
  // Simple little bit of HTML
  return (
    <div className="container-top-info-terms">
        <p className="heading">
        Earned interest: (.45% -{'>'} ??) &emsp;
        Max borrow: 50% &emsp;
        Liquidation threshold: 60% &emsp;
        Liquidation discount: 17.5% &emsp;
        Liquidation penalty: 2% &emsp;
        NFT ID: {context!.nftIDGNSPool} &emsp;
        Total Assets: NA &emsp;
        Total Borrowed: NA &emsp;
        Utilization: NA
        </p>
			</div>
  );
};

// Prior Version - for reference
/*const GNSFettiInfo: React.FC = () => {
  // Simple little bit of HTML
  return (
    <div className="container">
        <h4>
          Terms of loan: <div></div>
          You must deposit their collateral into the system to obtain a loan using this contract. 
          The smart contract automatically leverages the collateral to generate a return once it is deposited. 
          Then, an NFT representing the collateral entrusted with Liquifi is sent to the you.
          The collateral for this pool will be deposited with GNS. In exchange, you can borrow up to 50% of the value of the collateral in DAI without interest.
          Your collateral will remain undisturbed so long as its value does not decrease to the point where the loan is worth 66% of the collateral. 
          In this case, a portion of the collateral will be liquidated to restore the loan's health factor to 50 percent (loan/collateral value).
        </h4>
        <h4>
          Case of Partial Liquidations: <div></div>
          When a loan's health factor is greater than 66%, the collateral value has decreased since the borrower took out the loan.
          To mitigate the risk of the collateral becoming worth less than the loan, loans with a health factor greater than 66% will be partially liquidated to restore the loan's excellent health.
          Anyone can liquidate a loan. For participation in the liquidation procedure, liquidators receive a discount of 82.5% of the collateral's value in DAI. 
          If they promptly swapped GNS for stablecoins, they would profit 17.5% on their DAI holdings. 
          In addition to losing a portion of their collateral, liquidated creditors have lost 10% of their collateral. 
          Depending on the DAI the liquidator sends, the loan will have a health factor of 40% to 50% following the partial liquidation.
        </h4>
        <h3>
        As a borrower, you can earn .45-1.8% apr on your collateral. There is no interest to pay on borrowed tokens. 
        </h3>
			</div>
  );
};*/

export default GNSFettiInfo;
