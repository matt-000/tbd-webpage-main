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

const App = () => {
  const [provider, setProvider] = useState<null | ethers.BrowserProvider>(null); 
	const [signer, setSigner] = useState<null | ethers.JsonRpcSigner>(null);
	const [contract, setContract] = useState<null | ethers.Contract>(null);

	const [tokenName, setTokenName] = useState("Token");

  const [nftID, setNFTID] = useState<null | bigint>(null);
  const [stakedGns, setStakedGns] = useState<null | bigint>(null);
  const [borrowedUsdc, setBorrowedUsdc] = useState<null | bigint>(null);
  const [unlockTime, setUnlockTime] = useState<null | bigint>(null);
  const [maxBorrowedUsdc, setMaxBorrowedUsdc] = useState<null | bigint>(null);

  const [stringStakedGns, setStringStakedGns] = useState<null | String>(null);
  const [stringBorrowedUsdc, setStringBorrowedUsdc] = useState<null | String>(null);
  const [stringUnlockTime, setStringUnlockTime] = useState<null | String>(null);
  const [stringMaxBorrowedUsdc, setStringMaxBorrowedUsdc] = useState<null | String>(null);

  const context = useContext(UserAddressContext);
	useEffect(() => {
		context?.updateUserAddress();
	}, [context]);

	/*useEffect(() => {
		if(context?.userAddress) {
		  getNFTID();
		}
	}, [context?.userAddress]);*/

  useEffect(() => {
    if (context?.userAddress) {
      updateEthers();
    }
  }, [context?.userAddress]);

  useEffect(() => {
    if (context?.nftIDGNSPool) {
      updateEthers();
    }
  }, [context?.nftIDGNSPool]);
/*
  useEffect(() => {
    if (contract) {
      updateNFTInfo();
      console.log("balls")
    }
  }, [contract]);*/

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

  const gnsIFace = new ethers.Interface([
    "function depositColateral(address, uint256) returns (uint256)",
    "function addColateral(uint256, uint256) returns (uint256)",
    "function repayLoan(uint256, uint256) returns (uint256)",
    "function widthdrawColateral(address, uint256) returns (uint256)",
    "function borrow(uint256, uint256, address) returns(uint256)",
    "function _outstandingLoans(uint256) view returns (uint256, uint256, uint256, uint256, uint256, uint256, uint256, uint256, uint256, uint256, uint256)",
    "function balanceOf(address owner) view returns (uint256)",
    "function totalSupply() view returns (uint256)"
  ]);

  console.log(gnsIFace.fragments);

  /*const getNFTID = async () => {
    let gnsProvider = new ethers.BrowserProvider(window.ethereum);
    let gnsSigner = await gnsProvider.getSigner();
    let gnsContract = new ethers.Contract(context!.gnsPool_address, gnsIFace.fragments, gnsSigner);

    const tokenBalance = await gnsContract.balanceOf(context!.userAddress);
    console.log(context!.userAddress)
    console.log(tokenBalance)
    let highestTokenId = ethers.parseUnits("0", 0);
    let loanData;
    console.log("hi")
    let totalLoans = await gnsContract.totalSupply();
    console.log("hi")
    for(let i = 0; i < totalLoans; i++){
      let owner = await gnsContract.ownerOf(i);
      let isOwner = owner === context!.userAddress;
      if(isOwner) {
          loanData = await gnsContract._outstandingLoans(i);
          console.log(loanData)
      }
    }
    setNFTID(ethers.parseUnits("2", 0));
  }*/

  const updateNFTInfo = async () => {
    if (context && context.nftIDGNSPool) {
      let nftID_ = ethers.parseUnits(context.nftIDGNSPool, 0);

      let loanData = await contract!._outstandingLoans(nftID_);
      setStakedGns(loanData[1]);
      setBorrowedUsdc(loanData[2]);
      setUnlockTime(loanData[3]);
      setMaxBorrowedUsdc(loanData[4]);

      setNFTID(nftID_);
      setStringStakedGns(stringVal(stakedGns));
      setStringBorrowedUsdc(stringVal(borrowedUsdc));
      setStringUnlockTime(stringVal(unlockTime));
      setStringMaxBorrowedUsdc(stringVal(maxBorrowedUsdc));
    } else {
      console.log("whoopsy")
    }
	}

  const updateEthers = async () => {
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
      setMaxBorrowedUsdc(loanData[4]);

      setNFTID(ethers.parseUnits(context.nftIDGNSPool, 0));
      setStringStakedGns(stringVal(loanData[1]));
      setStringBorrowedUsdc(stringVal(loanData[2]));
      setStringUnlockTime(stringVal(loanData[3]));
      setStringMaxBorrowedUsdc(stringVal(loanData[4]));
    } else {
      console.log("whoopsy")
    }
};

const zero_val = ethers.parseUnits("0", 0);

  return (
    <div className="app">
      <div className="header-div">
        <Header address={context!.userAddress}/>
      </div>
      <LendingBorrowing />
      <div className="button-box">
        <Link to="/Borrowing" className="back-button">Back</Link>
        <button className="nft-button" onClick={updateNFTInfo}>{"Refresh NFT Info"}</button>
      </div>
      <div className="main-content">
          {nftID === null || maxBorrowedUsdc === zero_val ?
              <>
                  <InteractionsSetNFTID/>
                  <InteractionsDepositCollateral contract={contract} user_address={context!.userAddress} provider={provider} signer={signer} gns_address={context!.gnsPool_address}/>
              </> : 
              <>
                  <InteractionsBorrow contract={contract} user_address={context!.userAddress} provider={provider} signer={signer} gns_address={context!.gnsPool_address} nftID={nftID} maxBorrowedUSDC={stringMaxBorrowedUsdc}/>
                  <InteractionsAddCollateral contract={contract} user_address={context!.userAddress} provider={provider} signer={signer} gns_address={context!.gnsPool_address} nftID={nftID}/>
                  <InteractionsRepayDebt contract={contract} user_address={context!.userAddress} provider={provider} signer={signer} gns_address={context!.gnsPool_address} nftID={nftID} borrowedUSDC={stringBorrowedUsdc}/>
                  <InteractionsWithdraw contract={contract} user_address={context!.userAddress} provider={provider} signer={signer} gns_address={context!.gnsPool_address} nftID={nftID} stakedGNS={stringStakedGns} unlockTime={stringUnlockTime}/>
              </>
          }
      </div>
    </div>
  );
};

export default App;
