import React, { useState } from 'react';
import './CurrencySwap.css';

const CurrencySwap: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    // Perform conversion logic here
  };

  const handleSwap = () => {
    // Perform swap logic here
  };

  return (
    <div className="container">
      <div className="swap-container">
        <div className="form-container">
          <h2>Swap</h2>
          <div className="input-group">
            <input
              type="text"
              placeholder="0"
              className="input-field"
              value={inputValue}
              onChange={handleInputChange}
            />
            <select className="select-field">
              <option value="fet">FET</option>
              {/* Add more options here */}
            </select>
          </div>
          <button className="swap-button" onClick={handleSwap}>
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
              <option value="dai">DAI</option>
              {/* Add more options here */}
            </select>
          </div>
        </div>
        <div className="rate-container">
          <h3>Exchange Rate</h3>
          <div className="rate-value">1 ETH = 0.05 BTC</div>
        </div>
      </div>
    </div>
  );
};

export default CurrencySwap;
