import React from 'react';
import {useContext, useState, useEffect} from 'react'
import {ethers} from 'ethers'
import LendingBorrowing from './LendingBorrowing';
import MintBurn from './MintBurn';
import Header from './../Header/Header';
import Burny from './BurnyBaby';
import './../Borrowing/Borrowing.css';
import "./Lending.css"
import { UserAddressContext } from './../../UserAddressContext';

const App = () => {
  // State variables being defined for future updates and usage in other components
  const [provider, setProvider] = useState<null | ethers.BrowserProvider>(null); 
	const [signer, setSigner] = useState<null | ethers.JsonRpcSigner>(null);
	const [contract, setContract] = useState<null | ethers.Contract>(null);

	// Token for minting
	const [tokenName, setTokenName] = useState("Token");
	const [balance, setBalance] = useState<null | String>(null);

	// Stablecoin for trade
	const [tokenNameSC, setTokenNameSC] = useState("Token");
	const [balanceSC, setBalanceSC] = useState<null | String>(null);

  const [stringEpochPlaced, setStringEpochPlaced] = useState<null | String>(null);
  const [stringWaitTime, setStringWaitTime] = useState<null | String>(null);
  const [stringCurrentEpoch, setStringCurrentEpoch] = useState<null | String>(null);
  const [stringTotalEpoc, setStringTotalEpoc] = useState<null | String>(null);
  const [stringDaiToSend, setStringDaiToSend] = useState<null | String>(null);
  const [stringLiqToBurn, setStringLiqToBurn] = useState<null | String>(null);
  const [stringConversionRate, setStringConversionRate] = useState<null | String>(null);

  const context = useContext(UserAddressContext);

  // First we will update the users address and make sure that they are signed in
	useEffect(() => {
		context?.updateUserAddress();
	}, [context]);

  // If the user address is updated we will pull all information on user balance 
  useEffect(() => {
    if (context?.userAddress && context!.chainID === "0x89") {
      updateBalance();
		  updateTokenName();
    }
  }, [context?.userAddress]);

  // If the chain ID changes then we will update information if its on polygon
  useEffect(() => {
    if (context?.chainID && context!.chainID === "0x89") {
      updateBalance();
		  updateTokenName();
    }
  }, [context?.chainID]);

  // This variable is called a simple ABI. It effectively represents how we can define the methods
  // within our contract code for ethersjs to compile. These are our calls to the contract.
	const iface = new ethers.Interface([
		"function maxWithdraw(address) view returns (uint256)",
		"function maxMint(address owner) returns (uint256)",
		"function previewMint(uint256 shares) view returns (uint256)",
		"function deposit(uint256, address) returns (uint256)",
    "function balanceOf(address owner) view returns (uint256)",
		"function withdraw(uint256, address, address) returns (uint256)",
    "function requestWidthdraw(uint256 amount_, address sendTo_) returns ()",
    "function approve(address spender, uint amount)",
		"function allowance(address owner, address spender) view returns (uint)",
    "function _requestedWidthdraws(address) view returns (uint256, uint256, uint256, address)",
    "function _epocWidthdrawWait() view returns (uint256)",
    "function _currEpoc() view returns (uint256)",
    "function totalAssets() view returns (uint256)",
    "function totalSupply() view returns (uint256)"
	]);

  const ifaceDAI = new ethers.Interface([
		"function balanceOf(address owner) view returns (uint256)"
	]);

  // For adding our values that are in bigint
  const addStrings = (str1: String, str2: String) => {
    return String(Number(str1) + Number(str2)); // 18 decimals of precision
  }

  // For dividing our values that are in bigint
  const divideStrings = (str1: String, str2: String) => {
      return (Number(str1) / Number(str2)).toFixed(6); // 18 decimals of precision
  }

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
	
  // Our call to the contract to get all of the variables set and user balance
	const updateBalance = async () => {
    // Calls to set variables
		let fettiProvider = new ethers.BrowserProvider(window.ethereum);
		setProvider(fettiProvider);

		let fettiSigner = await fettiProvider.getSigner();
		setSigner(fettiSigner);

		let fettiContract = new ethers.Contract(context!.fetti_address, iface.fragments, fettiSigner);
		setContract(fettiContract);

    let dai_address = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"
		let daiContract = new ethers.Contract(dai_address, ifaceDAI.fragments, fettiSigner);

		// Call to get user balance
		setBalance(stringVal(await fettiContract.balanceOf(context!.userAddress)));
		setBalanceSC(stringVal(await daiContract.balanceOf(context!.userAddress)));

    let burnData = await fettiContract._requestedWidthdraws(context!.userAddress);
    setStringDaiToSend(stringVal(burnData[1]));
    setStringLiqToBurn(stringVal(burnData[2]));
    
    let waitTime = await fettiContract._epocWidthdrawWait();
    let currEpoc = await fettiContract._currEpoc();
    setStringCurrentEpoch(currEpoc.toString())
    // Wait time for user
    const zero_val = ethers.parseUnits("0", 0);
    if(burnData[0] !== zero_val){
      setStringEpochPlaced(burnData[0].toString());
      setStringWaitTime(waitTime.toString())
      setStringTotalEpoc(addStrings(waitTime.toString(), burnData[0].toString()))
    }else{
      setStringEpochPlaced("No request placed");
    }

    // Conversion Rate
    let assets = await fettiContract.totalAssets();
    let supply = await fettiContract.totalSupply();
    setStringConversionRate(divideStrings(assets, supply));
	}

  // Token name
  const updateTokenName = async () => {
		setTokenName("FET");
		setTokenNameSC("DAI");
	}

  // Simple container to hold our interactions
  return (
    <div className="app">
        <Header address={context!.userAddress}/>
      <div className="lending-box2">
        <LendingBorrowing />
      </div>
      <MintBurn />
      <Burny user_address={context!.userAddress} fetti_address={context!.fetti_address} provider={provider} signer={signer} contract={contract} tokenName={tokenName} tokenNameSC={tokenNameSC} balance={balance} balanceSC={balanceSC} stringEpochPlaced={stringEpochPlaced} stringCurrentEpoch={stringCurrentEpoch} stringDaiToSend={stringDaiToSend} stringLiqToBurn={stringLiqToBurn} updateBalance={updateBalance} stringConversionRate={stringConversionRate}/>
    </div>
  );
};

export default App;