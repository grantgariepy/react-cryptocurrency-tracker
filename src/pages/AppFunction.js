import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';
import Chart from '../components/Chart'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
      return (
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
              </ul>
            </nav>
    
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/chart" component={Chart}/>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      );
    }
    
    function Home() {
      const [coins, setCoins] = useState([])
      const [search, setSearch] = useState('')
    
      useEffect(() => {
        axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false")
        .then(res => {
          setCoins(res.data)
        }).catch(error => console.log(error))
      }, []);
    
      const handleChange = e => {
        setSearch(e.target.value)
      }
    
      const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase() ))

      return <div className="coin-app">
              <div className="coin-search">
                <h1 className="coin-text">Search</h1>
                <form>
                  <input type="text" className="coin-input" placeholder="Search" onChange={handleChange}/>
                </form>
              </div> 
              {filteredCoins.map(coin => {
                return <Coin 
                  id={coin.id} 
                  name={coin.name} 
                  image={coin.image}
                  symbol={coin.symbol}
                  volume={coin.total_volume}
                  price={coin.current_price}
                  priceChange={coin.price_change_percentage_24h}
                  marketcap={coin.market_cap}
                  />
              })}
            </div>;
    }
    
    function About() {
      return <h2>About</h2>;
    }
    
export default App;
