import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { DATA } from "./constants";
import "./Landing.css";
import { LandingData } from "./models";
import { formatDollar, formatPercentage } from "./utils";

const Landing = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  const displayData = searchValue
    ? DATA.filter(
        ({ base, quote }) =>
          // eslint-disable-next-line
          base.toLowerCase().includes(searchValue.toLowerCase()) ||
          quote.toLowerCase().includes(searchValue.toLowerCase())
      )
    : DATA;

  const handleBorrowClick = (borrowProps: LandingData) => {
    navigate("/borrow", { state: { ...borrowProps } });
  };

  return (
    <div className="app">
      <Header address={"0x6666"} />
      <div className="table-container">
        <table className="table-landing">
          <thead className="table-head-landing">
            <tr>
              <th colSpan={5}>
                <div className=" markets heading-landing">Markets</div>
              </th>
              <th colSpan={1}>
                <div className="search-container">
                  <div className="svg-container">
                    <svg
                      fill="#ffffffbd"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="17px"
                      height="17px"
                      viewBox="0 0 390.704 390.704"
                    >
                      <g>
                        <g>
                          <path
                            d="M379.711,326.556L265.343,212.188c30.826-54.189,23.166-124.495-23.001-170.663c-55.367-55.366-145.453-55.366-200.818,0
			c-55.365,55.366-55.366,145.452,0,200.818c46.167,46.167,116.474,53.827,170.663,23.001l114.367,114.369
			c14.655,14.655,38.503,14.654,53.157,0C394.367,365.059,394.368,341.212,379.711,326.556z M214.057,214.059
			c-39.77,39.771-104.479,39.771-144.25,0c-39.77-39.77-39.77-104.48,0-144.25c39.771-39.77,104.48-39.77,144.25,0
			C253.828,109.579,253.827,174.29,214.057,214.059z"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="search-input"
                    value={searchValue}
                    onChange={handleSearchChange}
                  />
                </div>
              </th>
            </tr>
            <tr id="tr-thead">
              <th className="table-header markets">Pairs</th>
              <th className="table-header">Lending TVL</th>
              <th className="table-header">Available</th>
              <th className="table-header">Borrow TVL</th>
              <th className="table-header">Lending APR</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody id="tbody">
            {displayData.map(
              (
                {
                  base,
                  baseImgUrl,
                  quote,
                  quoteImgUrl,
                  lendingTVL,
                  available,
                  borrowTVL,
                  lendingAPR,
                },
                i
              ) => (
                <tr key={`${i}_${base}_${quote}`} className="row-data">
                  <td className="table-data markets markets-flex">
                    <img className="base-img" src={baseImgUrl} />
                    {`${base}/${quote}`}
                    <img className="quote-img" src={quoteImgUrl} />
                  </td>
                  <td className="table-data">{formatDollar(lendingTVL)}</td>
                  <td className="table-data">{formatDollar(available)}</td>
                  <td className="table-data">{formatDollar(borrowTVL)}</td>
                  <td className="table-data">{formatPercentage(lendingAPR)}</td>
                  <td className="table-data">
                    <div>
                      <button className="table-button">Supply</button>
                      <button
                        className="table-button"
                        id="borrow"
                        onClick={() =>
                          // eslint-disable-next-line
                          handleBorrowClick({
                            base,
                            baseImgUrl,
                            quote,
                            quoteImgUrl,
                            lendingTVL,
                            available,
                            borrowTVL,
                            lendingAPR,
                          })
                        }
                      >
                        Borrow
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
            {!displayData.length && (
              <tr key={`x`} className="row-data">
                <td colSpan={6} className="table-data">
                  No results found for {searchValue}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Landing;
