import React, { useState, ChangeEvent } from 'react'

const ConversionBox = () => {
  const [inputValue, setInputValue] = useState("");
  const [convertedValue, setConvertedValue] = useState("");

  const handleConversion = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    // Add your conversion logic here.
    // In this example, we will just double the input.
    setConvertedValue((parseInt(event.target.value, 10) * 2).toString());
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleConversion} />
      <div>Converted value: {convertedValue}</div>
    </div>
  );
};

export default ConversionBox;
