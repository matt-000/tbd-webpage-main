import React from 'react';
import {useState, useEffect} from 'react'
import {ethers} from 'ethers'
import './Borrowing.css';
import LendingBorrowing from './../Lending/LendingBorrowing';
import BorrowingPage from './BorrowingPage';
import Header from './../Header/Header';
import InteractionsDepositCollateral from './InteractionsDepositCollateral';
import InteractionsAddCollateral from './InteractionsAddCollateral';
import InteractionsBorrow from './InteractionsBorrow';
import InteractionsRepayDebt from './InteractionsRepayDebt';
import InteractionsWithdraw from './InteractionsWithdraw';

const App = () => {
  let fetti_address =  '0x64648c7199658dB6D5fF1903b608fFfa015A81aa';
  let dai_address = '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063';
  let loaner_address = '0xb2534c942459C842EdC3b6B130ab2dE491ce5bf3';
  let vault_address = '0x201E0AF71f7b3D72208D94832339a7Fe01Be24e0';
  let gnsPool_address = '0xA1c88cf230A71031E853F63eab98EDeD7c42D344';

  const [errorMessage, setErrorMessage] = useState<null | String>(null);
	const [defaultAccount, setDefaultAccount] = useState<null | String>(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const [provider, setProvider] = useState<null | ethers.BrowserProvider>(null); 
	const [signer, setSigner] = useState<null | ethers.JsonRpcSigner>(null);
	const [contract, setContract] = useState<null | ethers.Contract>(null);

	const [tokenName, setTokenName] = useState("Token");
	const [balance, setBalance] = useState<null | number>(null);
	const [transferHash, setTransferHash] = useState(null);

  const [nftID, setNFTID] = useState<null | bigint>(null);
  const [stakedGns, setStakedGns] = useState<null | bigint>(null);
  const [borrowedUsdc, setBorrowedUsdc] = useState<null | bigint>(null);
  const [unlockTime, setUnlockTime] = useState<null | bigint>(null);
  const [maxBorrowedUsdc, setMaxBorrowedUsdc] = useState<null | bigint>(null);

  const [stringStakedGns, setStringStakedGns] = useState<null | String>(null);
  const [stringBorrowedUsdc, setStringBorrowedUsdc] = useState<null | String>(null);
  const [stringUnlockTime, setStringUnlockTime] = useState<null | String>(null);
  const [stringMaxBorrowedUsdc, setStringMaxBorrowedUsdc] = useState<null | String>(null);

  /*let stringStakedGns = ""
  let stringBorrowedUsdc = ""
  let stringUnlockTime = ""
  let stringMaxBorrowedUsdc = ""*/

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
    "function balanceOf(address) returns(uint256)",
    "function _outstandingLoans(uint256) view returns (uint256, uint256, uint256, uint256, uint256, uint256, uint256, uint256, uint256, uint256, uint256)",
    "function balanceOf(address owner) view returns (uint256)",
    "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)"
  ]);

  console.log(gnsIFace.fragments);

  const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then((result: string[]) => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
			})
			.catch((error: Error) => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

  const accountChangedHandler = async(newAddress: string) => {
		setDefaultAccount(newAddress);

    let loanData = await contract!._outstandingLoans(nftID);
    setStakedGns(loanData[1]);
    setBorrowedUsdc(loanData[2]);
    setUnlockTime(loanData[3]);
    setMaxBorrowedUsdc(loanData[4]);

    setStringStakedGns(stringVal(stakedGns));
    setStringBorrowedUsdc(stringVal(borrowedUsdc));
    setStringUnlockTime(stringVal(unlockTime));
    setStringMaxBorrowedUsdc(stringVal(maxBorrowedUsdc));
	}

  const updateNFTInfo = async() => {
	  let loanData = await contract!._outstandingLoans(nftID);
    setStakedGns(loanData[1]);
    setBorrowedUsdc(loanData[2]);
    setUnlockTime(loanData[3]);
    setMaxBorrowedUsdc(loanData[4]);

    setStringStakedGns(stringVal(stakedGns));
    setStringBorrowedUsdc(stringVal(borrowedUsdc));
    setStringUnlockTime(stringVal(unlockTime));
    setStringMaxBorrowedUsdc(stringVal(maxBorrowedUsdc));

    const balance1 = await contract!.balanceOf(defaultAccount);
    console.log(`Balance: ${balance1.toString()}`);
	}

  const updateEthers = async () => {
    let gnsProvider = new ethers.BrowserProvider(window.ethereum);
    let gnsSigner = await gnsProvider.getSigner();
    let gnsContract = await new ethers.Contract(gnsPool_address, gnsIFace.fragments, gnsSigner);
  
    setNFTID(ethers.parseUnits("2", 0));
    setProvider(gnsProvider);
    setSigner(gnsSigner);
    setContract(gnsContract);
  };
  
  useEffect(() => {
    updateEthers();
  }, []);

  return (
    <div className="app">
      <Header address={defaultAccount}/>
      <h2> {tokenName + " ERC-20 Wallet"} </h2>
		  <button className="button6" onClick={connectWalletHandler}>{connButtonText}</button>
      <button className="button6" onClick={updateNFTInfo}>{"Refresh NFT Info"}</button>
      <LendingBorrowing />
      <InteractionsDepositCollateral contract={contract} user_address={defaultAccount} provider={provider} signer={signer} gns_address={gnsPool_address}/>
      <InteractionsBorrow contract={contract} user_address={defaultAccount} provider={provider} signer={signer} gns_address={gnsPool_address} nftID={nftID} maxBorrowedUSDC={stringMaxBorrowedUsdc}/>
      <InteractionsAddCollateral contract={contract} user_address={defaultAccount} provider={provider} signer={signer} gns_address={gnsPool_address} nftID={nftID}/>
      <InteractionsRepayDebt contract={contract} user_address={defaultAccount} provider={provider} signer={signer} gns_address={gnsPool_address} nftID={nftID} borrowedUSDC={stringBorrowedUsdc}/>
      <InteractionsWithdraw contract={contract} user_address={defaultAccount} provider={provider} signer={signer} gns_address={gnsPool_address} nftID={nftID} stakedGNS={stringStakedGns} unlockTime={stringUnlockTime}/>
    </div>
  );
};

export default App;
