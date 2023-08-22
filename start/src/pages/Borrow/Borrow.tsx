import React, { FC, useState } from "react";
import { useLocation } from "react-router-dom";

import Header from "../Header/Header";
import { LandingData } from "../Landing/models";
import { formatDollar } from "../Landing/utils";
import "./Borrow.css";

const Borrow = () => {
  const location = useLocation();
  const {
    base,
    baseImgUrl,
    quote,
    quoteImgUrl,
    lendingTVL,
    available,
    borrowTVL,
    lendingAPR,
  } = location.state as LandingData;

  return (
    <div className="app">
      <Header address={"0x6666"} />
      <div className="borrow-container">
        <div className="borrow-currency-container">
          <div className="borrow-currency-images-container">
            <img src={baseImgUrl} className="borrow-base-image" />
            <img src={quoteImgUrl} className="borrow-quote-image" />
          </div>
          {base}&nbsp;
          <span id="borrow-currency-quote"> / {quote}</span>
        </div>
        <div className="heading-borrow">
          <p>
            Total:{" "}
            <span className="borrow-header-value">
              {formatDollar(borrowTVL)}
            </span>
          </p>
          <p>
            Borrowed:{" "}
            <span className="borrow-header-value">
              {formatDollar(borrowTVL)}
            </span>
          </p>
          <p>
            Assets:{" "}
            <span className="borrow-header-value">
              {formatDollar(borrowTVL)}
            </span>
          </p>
          <p>
            Available:{" "}
            <span className="borrow-header-value">
              {formatDollar(borrowTVL)}
            </span>
          </p>
          <p>
            Utilization:{" "}
            <span className="borrow-header-value">
              {formatDollar(borrowTVL)}
            </span>
          </p>
          <p>
            Borrower Int:{" "}
            <span className="borrow-header-value">
              {formatDollar(borrowTVL)}
            </span>
          </p>
          <p>
            Split:{" "}
            <span className="borrow-header-value">
              {formatDollar(borrowTVL)}
            </span>
          </p>
        </div>
        <div className="main-borrow-container">
          <div className="main-borrow">
            Set NFT ID:
            <input type="text" className="search-input" />
            <p>
              Deposit Collateral: <span className="accent">100</span>
            </p>
            <p>
              Add Collateral: <span className="accent">100</span>
            </p>
            <p>
              Borrow: <span className="accent">100</span>
            </p>
            <p>
              Repay: <span className="accent">100</span>
            </p>
            <p>
              Remove Collateral: <span className="accent">100</span>
            </p>
          </div>
          <div className="right-borrow">
            <p>
              Total Collateral: <span className="accent">100</span>
            </p>
            <p>
              Total Debt: <span className="accent">100</span>
            </p>
            <p>
              LTV: <span className="accent">100</span>
            </p>
            <p>
              Liquidation Threshold: <span className="accent">100</span>
            </p>
            <p>
              Max Borrow: <span className="accent">100</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Borrow;
