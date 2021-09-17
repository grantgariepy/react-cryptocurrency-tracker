import React from 'react';
import './Coin.css';
import {
    Link
  } from "react-router-dom";

const Coin = ({ id, name, image, symbol, price, volume, priceChange, marketcap}) => {
    return (
        <div className="coin-container">
            <div className="coin-row">
                <div className="coin">
                    <img src={image} alt="crypto"/>
                    <Link to={{
                        pathname: '/chart',
                        state: { 
                            coinId: {id},
                            coinName: {name}
                        }
                    }}>{name}</Link>
                    <p className="coin-symbol">{symbol}</p>
                </div>
                <div className="coin-data">
                  <p className="coin-price">${price.toLocaleString()}</p>
                  {priceChange < 0 ? (
                    <p className="coin-percent red">{priceChange.toFixed(2)}%</p>
                  ) : (<p className="coin-percent green">{priceChange.toFixed(2)}%</p>)
                
                }
                <p className="coin-volume">Volume: ${volume.toLocaleString()}</p>
                <p className="coin-marketcap">Market Cap: ${marketcap.toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}
export default Coin
