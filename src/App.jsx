import axios from "axios";
import {useState, useEffect} from "react"
import Coin from "./components/Coin";
import "./styles/App.sass"

const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"

function App() {

  const [coins, setCoins] = useState([])
  const [search,setSearch] = useState("")

  useEffect(()=>{
    axios.get(url)
    .then(res => {
      setCoins(res.data)
      console.log(coins)
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const filteredCoin = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a Crypto</h1>
        <form>
          <input type="text" className="coin-input" placeholder="Search" onChange={handleChange}/>
        </form>
      </div>

      {filteredCoin.map(coin => {
        return(
          <Coin 
          key={coin.id}
          name={coin.name}
          image={coin.image}
          symbol={coin.symbol}
          volume={coin.market_cap}
          price={coin.current_price}
          priceChange={coin.price_change_percentage_24h}
          marketcap={coin.total_volume}/>
        )
      })}
    </div>
  );
}

export default App;
