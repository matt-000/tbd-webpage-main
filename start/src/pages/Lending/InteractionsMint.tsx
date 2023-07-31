import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import "./Wallet.module.css";
import "./CurrencySwap.css";

interface InteractionsProps {
  provider: null | ethers.BrowserProvider;
  signer: null | ethers.JsonRpcSigner;
  contract: null | ethers.Contract;
  user_address: null | String;
  fetti_address: null | String;
  updateBalance: () => void;
  stringConversionRate: null | String;
}

const InteractionsMint: React.FC<InteractionsProps> = (props) => {
  // Input values and output values
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setOutputValue(String(Number(inputValue) * 2));
  };

  const [transferHash, setTransferHash] = useState<null | String>(null);

  // Our call to the contract for minting
  const transferHandler = async () => {
    // DAI contract address on Mainnet
    const daiAddress = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063";

    // Simple ABI for DAI functions were using
    const daiAbi = [
      "function approve(address spender, uint amount)",
      "function allowance(address owner, address spender) view returns (uint)",
    ];

    // Initialized contract
    const daiContract = new ethers.Contract(daiAddress, daiAbi, props.signer);

    try {
      const mintAmount = ethers.parseUnits(inputValue, 18);

      // Approve the contract to spend the DAI
      const approvalTx = await daiContract.approve(
        props.fetti_address,
        mintAmount
      );
      await props.provider!.waitForTransaction(approvalTx.hash);
      console.log("Approval confirmed");

      console.log("Fetti address:", props.fetti_address);
      console.log("Props address:", props.user_address);

      // Check to see what the allowance is
      const allowance = await daiContract.allowance(
        props.user_address,
        props.fetti_address
      );
      console.log(`Allowance: ${ethers.formatUnits(allowance, 18)} DAI`);
      console.log(`Allowance: ${allowance}`);

      // Call to our contract
      let txt = await props.contract!.deposit(mintAmount, props.user_address);
      console.log(txt);
      await props.provider!.waitForTransaction(txt.hash);
      console.log("Exchange confirmed");

      setTransferHash("Transfer confirmation hash: " + txt.hash);
      props.updateBalance();
    } catch (error) {
      console.error(`Error in exchange: ${error}`);
      if (typeof error === "object" && error !== null && "reason" in error) {
        setTransferHash(
          (error as { reason?: string }).reason ??
            "An unexpected error occurred."
        );
      } else {
        setTransferHash("An unexpected error occurred.");
      }
    }
  };

  // Input and output handlers for user input
  return (
    <div className="container">
      {/* <div className="custom-shape-divider-top-1690495814">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div> */}
      <div className="swap-container">
        <div className="form-container">
          <p className="heading">Swap</p>
          <div className="input-group">
            <input
              type="text"
              placeholder="0"
              className="input-field"
              value={inputValue}
              onChange={handleInputChange}
            />
            <select className="select-field">
              <option value="dai">DAI</option>
              {/* Add more options here */}
            </select>
          </div>
          <button
            className="refresh-button swap-button"
            onClick={transferHandler}
          >
            Swap
          </button>
          <div className="input-group">
            <input
              type="text"
              placeholder="0"
              className="input-field"
              value={outputValue}
              readOnly
            />
            <select className="select-field">
              <option value="fet">FET</option>
              {/* Add more options here */}
            </select>
          </div>
        </div>
        <div className="rate-container">
          <p className="heading">Exchange Rate</p>
          <div className="rate-value">
            1 FET{" "}
            <div className="liquify-logo-exchange">
              <img src="images/logo.png" width="30px" />{" "}
            </div>
            = {props.stringConversionRate} DAI{" "}
            <div className="dai-logo">
              <img src="images/dai-logo.png" width="20px" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="heading">{transferHash}</p>
      </div>
    </div>
  );
};

export default InteractionsMint;
