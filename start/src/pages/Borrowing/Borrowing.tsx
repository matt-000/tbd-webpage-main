import React from 'react';
import {useContext, useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import {ethers} from 'ethers'
import './Borrowing.css';
import LendingBorrowing from './../Lending/LendingBorrowing';
import Header from './../Header/Header';
import InteractionsDepositCollateral from './InteractionsDepositCollateral';
import InteractionsAddCollateral from './InteractionsAddCollateral';
import InteractionsBorrow from './InteractionsBorrow';
import InteractionsRepayDebt from './InteractionsRepayDebt';
import InteractionsWithdraw from './InteractionsWithdraw';
import { UserAddressContext } from './../../UserAddressContext';
import InteractionsSetNFTID from './InteractionsSetNFTID';
import GNSFettiInfo from './GNSFettiInfo';

const App = () => {
  // State variables being defined for future updates and usage in other components
  const [provider, setProvider] = useState<null | ethers.BrowserProvider>(null); 
	const [signer, setSigner] = useState<null | ethers.JsonRpcSigner>(null);
	const [contract, setContract] = useState<null | ethers.Contract>(null);

  const [nftID, setNFTID] = useState<null | bigint>(null);
  const [currGns, setCurrGns] = useState<null | bigint>(null);
  const [maxBorrowedUSDC, setMaxBorrowedUSDC] = useState<null | bigint>(null);
  const [stakedGns, setStakedGns] = useState<null | bigint>(null);
  const [borrowedUsdc, setBorrowedUsdc] = useState<null | bigint>(null);
  const [unlockTime, setUnlockTime] = useState<null | bigint>(null);
  const [maxBorrowedRatio, setMaxBorrowedRatio] = useState<null | bigint>(null);

  const [stringCurrGns, setStringCurrGns] = useState<null | String>(null);
  const [stringMaxBorrowedUSDC, setStringMaxBorrowedUSDC] = useState<null | String>(null);
  const [stringStakedGns, setStringStakedGns] = useState<null | String>(null);
  const [stringBorrowedUsdc, setStringBorrowedUsdc] = useState<null | String>(null);
  const [stringUnlockTime, setStringUnlockTime] = useState<null | String>(null);
  const [stringMaxBorrowedUsdcRatio, setStringMaxBorrowedRatio] = useState<null | String>(null);

  // First we will update the users address and make sure that they are signed in
  const context = useContext(UserAddressContext);
	useEffect(() => {
		context?.updateUserAddress();
	}, [context]);

  // If the user address is updated we will pull all information on the nft id and contract info
	useEffect(() => {
    if (context?.userAddress) {
      updateEthers();
    }
  }, [context?.userAddress]);

  // Once the NFT is updated, we will do the same process as a above
  useEffect(() => {
    if (context?.nftIDGNSPool) {
      updateEthers();
    }
  }, [context?.nftIDGNSPool]);

  // Method to take a bigint value and turn it into a string so we can display the value
  const stringVal = (num: bigint | null) => {
    if (num ==  null){
      return ""
    }
    const denominator = BigInt("1000000000000000000"); // 10^18 for 18 decimals
    const quotient = num / denominator;
    const remainder = num % denominator;

    const value = quotient.toString() + "." + remainder.toString().padStart(18, '0');

    return value
  }

  // Special case arithmetic
  const stringValSpec = (num: bigint | null, pad: number) => {
    if (num ==  null){
      return ""
    }
    const denominator = BigInt("1000000000000000000"); // 10^18 for 18 decimals
    const quotient = num / denominator;
    const remainder = num % denominator;

    const value = quotient.toString() + "." + remainder.toString().padStart(pad, '0');

    return value
  }

  // For multiplying our values that are in bigint
  const multiplyStrings = (str1: String, str2: String) => {
      return (Number(str1) * Number(str2)).toFixed(18); // 18 decimals of precision
  }

  // For subtracting our values that are in bigint
  const subtractStrings = (str1: String, str2: String) => {
    return (Number(str1) - Number(str2)).toFixed(18); // 18 decimals of precision
  }

  // This variable is called a simple ABI. It effectively represents how we can define the methods
  // within our contract code for ethersjs to compile. These are our calls to the contract.
  const gnsIFace = new ethers.Interface([
    "function depositColateral(address, uint256) returns (uint256)",
    "function addColateral(uint256, uint256) returns (uint256)",
    "function repayLoan(uint256, uint256) returns (uint256)",
    "function widthdrawColateral(address, uint256) returns (uint256)",
    "function borrow(uint256, uint256, address) returns(uint256)",
    "function _outstandingLoans(uint256) view returns (uint256, uint256, uint256, uint256, uint256, uint256, uint256, uint256, uint256, uint256, uint256)",
    "function balanceOf(address owner) view returns (uint256)",
    "function totalSupply() view returns (uint256)",
    "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
    "function currGnsPrice() view returns (uint256)"
  ]);

  console.log(gnsIFace.fragments);

  // This method calls a method to our smart contract with the nftID in our system
  // It gets all of the information on the loan NFT
  const updateNFTInfo = async () => {
    // This if statement is just for error checking
    if (context && context.nftIDGNSPool) {
      // Method call to the contract
      let loanData = await contract!._outstandingLoans(ethers.parseUnits(context.nftIDGNSPool, 0));
      setStakedGns(loanData[1]);
      setBorrowedUsdc(loanData[2]);
      setUnlockTime(loanData[3]);
      setMaxBorrowedRatio(loanData[4]);

      setNFTID(ethers.parseUnits(context.nftIDGNSPool, 0));
      setStringStakedGns(stringVal(loanData[1]));
      setStringBorrowedUsdc(stringVal(loanData[2]));
      setStringMaxBorrowedRatio(stringVal(loanData[4]));

      // Unlock Time: Convert to a number (BigInt can be safely converted to a number in this case)
      let unlockTimeNumber = Number(loanData[3]) * 1000;
      // Create date object
      let unlockDate = new Date(unlockTimeNumber);
      setStringUnlockTime(unlockDate.toString());

      let _currGns = await contract!.currGnsPrice();
      setCurrGns(_currGns);
      setStringCurrGns(stringValSpec(_currGns, 5));

      // Calculation to give user exact amount of left over amount to borrow
      setStringMaxBorrowedUSDC(String(subtractStrings(multiplyStrings(multiplyStrings(stringVal(loanData[1]), stringVal(loanData[4])), stringValSpec(_currGns, 5)), stringVal(loanData[2]))))
    } else {
      console.log("whoopsy")
    }
	}

  // Effectively the upgraded version of updateNFT
  // Does the same as update NFT, but also gets info on the contract
  const updateEthers = async () => {
    // These three methods  are how we are able to communicate with the blockchain (you will see these in other parts of the code, if you haven't already)
    let gnsProvider = new ethers.BrowserProvider(window.ethereum);
    let gnsSigner = await gnsProvider.getSigner();
    let gnsContract = new ethers.Contract(context!.gnsPool_address, gnsIFace.fragments, gnsSigner);

    setProvider(gnsProvider);
    setSigner(gnsSigner);
    setContract(gnsContract);

    if (context && context.nftIDGNSPool) {
      let loanData = await gnsContract._outstandingLoans(ethers.parseUnits(context.nftIDGNSPool, 0));
      setStakedGns(loanData[1]);
      setBorrowedUsdc(loanData[2]);
      setUnlockTime(loanData[3]);
      setMaxBorrowedRatio(loanData[4]);

      setNFTID(ethers.parseUnits(context.nftIDGNSPool, 0));
      setStringStakedGns(stringVal(loanData[1]));
      setStringBorrowedUsdc(stringVal(loanData[2]));
      setStringMaxBorrowedRatio(stringVal(loanData[4]));

      // Unlock Time: Convert to a number (BigInt can be safely converted to a number in this case)
      let unlockTimeNumber = Number(loanData[3]) * 1000;
      // Create date object
      let unlockDate = new Date(unlockTimeNumber);
      setStringUnlockTime(unlockDate.toString());

      let _currGns = await gnsContract.currGnsPrice();
      setCurrGns(_currGns);
      setStringCurrGns(stringValSpec(_currGns, 5));

      // Calculation to give user exact amount of left over amount to borrow
      setStringMaxBorrowedUSDC(String(subtractStrings(multiplyStrings(multiplyStrings(stringVal(loanData[1]), stringVal(loanData[4])), stringValSpec(_currGns, 5)), stringVal(loanData[2]))))
    } else {
      console.log("whoopsy")
    }
};

// Constant for checking in html
const zero_val = ethers.parseUnits("0", 0);

// Below, there is a little bit of logic that hides NFT and Deposit containers
// when the user has inputted a valid NFT token ID
// The invalid NFTs or ones that the user doesn't own are blocked out as 0 values
  return (
    <div className="app">
      <div className="header-div">
        <Header address={context!.userAddress}/>
      </div>
          {nftID === null || maxBorrowedRatio === zero_val ?
              <>
              <div className="lending-box4">
                <LendingBorrowing />
              </div>
                <div className="button-box">
                  <Link to="/Borrowing" className="back-button">Back</Link>
                </div>
                <GNSFettiInfo />
                <div className="main-content">
                    <InteractionsSetNFTID maxBorrowedUsdc={maxBorrowedRatio}/>
                    <InteractionsDepositCollateral contract={contract} user_address={context!.userAddress} provider={provider} signer={signer} gns_address={context!.gnsPool_address} updateNFTInfo={updateNFTInfo}/>
                </div>
              </> : 
              <>
              <div className="lending-box3">
                <LendingBorrowing />
              </div>
              <div className="button-box">
                <Link to="/Borrowing" className="back-button">Back</Link>
                <button className="nft-button" onClick={updateNFTInfo}>{"Refresh NFT Info"}</button>
              </div>
              <GNSFettiInfo />
                <div className="main-content">
                    <div className="container">
                      <h2>NFT Token ID: {context!.nftIDGNSPool}</h2>
                      <h2>Save your NFT to Metamask (Contract Address): {context!.gnsPool_address}</h2>
                    </div>
                    <InteractionsBorrow contract={contract} user_address={context!.userAddress} provider={provider} signer={signer} gns_address={context!.gnsPool_address} nftID={nftID} maxBorrowedUSDC={stringMaxBorrowedUSDC} updateNFTInfo={updateNFTInfo}/>
                    <InteractionsAddCollateral contract={contract} user_address={context!.userAddress} provider={provider} signer={signer} gns_address={context!.gnsPool_address} nftID={nftID} updateNFTInfo={updateNFTInfo}/>
                    <InteractionsRepayDebt contract={contract} user_address={context!.userAddress} provider={provider} signer={signer} gns_address={context!.gnsPool_address} nftID={nftID} borrowedUSDC={stringBorrowedUsdc} updateNFTInfo={updateNFTInfo}/>
                    <InteractionsWithdraw contract={contract} user_address={context!.userAddress} provider={provider} signer={signer} gns_address={context!.gnsPool_address} nftID={nftID} stakedGNS={stringStakedGns} unlockTime={stringUnlockTime} updateNFTInfo={updateNFTInfo}/>
              </div>
              </>
          }
    </div>
  );
};

export default App;
