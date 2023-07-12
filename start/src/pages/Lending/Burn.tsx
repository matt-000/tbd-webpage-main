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

  const [stringEpocPlaced, setStringEpocPlaced] = useState<null | String>(null);
  const [stringDaiToSend, setStringDaiToSend] = useState<null | String>(null);
  const [stringLiqToBurn, setStringLiqToBurn] = useState<null | String>(null);

  const context = useContext(UserAddressContext);

  // First we will update the users address and make sure that they are signed in
	useEffect(() => {
		context?.updateUserAddress();
	}, [context]);

  // If the user address is updated we will pull all information on user balance 
  useEffect(() => {
    if (context?.userAddress) {
      updateBalance();
		  updateTokenName();
    }
  }, [context?.userAddress]);

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
    "function _requestedWidthdraws(address) view returns (uint256, uint256, uint256, address)"
	]);

  const ifaceDAI = new ethers.Interface([
		"function balanceOf(address owner) view returns (uint256)"
	]);

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
    
    // Constant for checking in html
    const zero_val = ethers.parseUnits("0", 0);
    if(burnData[0] !== zero_val){
      console.log(burnData[0])
      // Unlock Time: Convert to a number (BigInt can be safely converted to a number in this case)
      let unlockTimeNumber = Number(burnData[0]) * 1000;
      // Create date object
      let unlockDate = new Date(unlockTimeNumber);
      setStringEpocPlaced(unlockDate.toString());
    }else{
      setStringEpocPlaced("No request placed");
    }
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
      <Burny user_address={context!.userAddress} fetti_address={context!.fetti_address} provider={provider} signer={signer} contract={contract} tokenName={tokenName} tokenNameSC={tokenNameSC} balance={balance} balanceSC={balanceSC} stringEpocPlaced={stringEpocPlaced} stringDaiToSend={stringDaiToSend} stringLiqToBurn={stringLiqToBurn} updateBalance={updateBalance}/>
    </div>
  );
};

export default App;