import React, { useState, useEffect } from 'react'
import './Carousel.css' 
import {CryptoState} from '../../CryptoContext'
import {TrendingCoins} from '../../config/api'
import axios from 'axios';
import {Link} from 'react-router-dom'
import AliceCarousel from 'react-alice-carousel'


const Carousel = () => {
    const [trending, setTrending] = useState([]);

    const {currency, symbol} = CryptoState(); 

    const fetchTrendingCoins = async () =>{
        const { data } = await axios.get(TrendingCoins(currency));

        setTrending(data);
    };

    console.log(trending);

    useEffect(() =>{
        fetchTrendingCoins();
    },[currency]);

   const numberWithCommas = (x) =>{
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    const items = trending.map((coin) => {
       let profit = coin.price_change_percentage_24h >= 0;

        return (
            <Link className='carouselItem' to={`/coins/${coin.id}`}>
                <img  
                src={coin?.image} 
                alt={coin.name} 
                height="80"
                style={{ marginBottom:10}}/>

                <span>{coin?.symbol}
                &nbsp;
                <span style={{
                    color: profit > 0 ? "rgb(14, 203, 129)": 'red', 
                    fontWeight: 500,
                }}>
                    {profit && "+"}  {coin?.price_change_percentage_24h?.toFixed(2)}% 
                </span>
                </span>

                <span style={{fontSize:22, fontWeight:500,}}>
                {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>

            </Link>
        )
    })

    const responsive ={
        0:{
            item:2,
        },
        512:{
            items:4,
        }
    };

  return (
    <div className='carousel'>

        <AliceCarousel 
        mouseTracking 
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        disableButtonsControls
        items={items}/>
    </div>
  )
}

export default Carousel;
