import logo from './logo.svg';
import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import axios from 'axios';
import Trade from './Trade';
import './App.css';
//import Stocks from './Stocks';
import configData from "./configs.json";
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

//import { ModuleRegistry } from 'ag-grid-community/core';
//import { ClientSideRowModelModule } from 'ag-grid-community/client-side-row-model';

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Currency from './Currency';
import Options from './Options';

// Register the required feature modules with the Grid
//ModuleRegistry.registerModules([ClientSideRowModelModule]);

function App() {
  //const gridRef = useRef(); // Optional - for accessing Grid's API
  const [stocks, setStocks] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [lastPrice, setLastPrice] = useState([]);
  const [priceDate, setPriceDate] = useState([]);
  const [index, setIndex] = useState([]);
  const [currLastPrice, setCurrLastPrice] = useState([]);
  const [currPriceDate, setCurrPriceDate] = useState([]);
  const [currIndex, setCurrIndex] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [currencyArr, getCurrencyArr] = useState('');
  const [fromSymbol, setFromSymbol] = useState('');
  const [toSymbol, setToSymbol] = useState('');
  let lastPrices = [];
  let priceDates = [];
  let indexes = [];
  let currlastPrices = [];
  let currpriceDates = [];
  let currindexes = [];
  let STOCKS_URL = process.env.REACT_APP_STOCKS_URL;
  let CURRENCIES_URL = process.env.REACT_APP_CURRENCY_URL;
  //const [gridApi, setGridApi] =useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
         // `http://localhost:8083/tradeRequest/allStocks`
         //STOCKS_URL
         configData.REACT_APP_STOCKS_URL
        );
        console.log(response.data)
        setStocks(response.data);
        indexes = [];
        lastPrices = [];
        priceDates = [];
        response.data.forEach(element => {
          indexes.push(element.Index+":"+element.Time.split(/\s+/)[0]+"|"+element.LastPrice);
          lastPrices.push(element.LastPrice);
          priceDates.push(element.Time);
        });
        setIndex(indexes);
        setLastPrice(lastPrices);
        setPriceDate(priceDates);
        console.log(response.data)
        console.log(indexes);
        setError(null);
      } catch (err) {
        setError(err.message);
        setStocks(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);
  
  
  useEffect(() => {
    const getCurrencyData = async () => {
      try {
        const response = await axios.get(
          //`http://localhost:8083/tradeRequest/currencies`
          //CURRENCIES_URL
          configData.REACT_APP_CURRENCY_URL
        );
        console.log("currencies :: ",response.data)
        setCurrencies(response.data);
        currlastPrices = [];
        currindexes = [];
        currpriceDates = [];
        response.data.forEach(element => {
          currindexes.push(element.Index+":"+element.PriceDate.split(/\s+/)[0]+"|"+element.Last);
          currlastPrices.push(element.Last);
          currpriceDates.push(element.PriceDate);
        });
        setCurrIndex(currindexes);
        setCurrLastPrice(currlastPrices);
        setCurrPriceDate(currpriceDates);
        setError(null);
      } catch (err) {
        setError(err.message);
        setCurrencies(null);
      } finally {
        setLoading(false);
      }
    };
    getCurrencyData();
  }, []);


  const changeFromSymbol = e => {
    
    setFromSymbol(e.target.value);
    console.log("fromSymbol *** "+fromSymbol);
    
  };
  const changeToSymbol = f => {
    console.log("fromSymbol "+fromSymbol);
    setToSymbol(f.target.value);
    
  };

 /*const filteredstocks = stocks.filter(stock =>
    stock.Symbol.toLowerCase().includes(search.toLowerCase())
  );*/

 
  

  const handleClick = event => {
    event.preventDefault();

    // 👇️ value of input field
    console.log('handleClick 👉️', fromSymbol, toSymbol);
    axios
      .get(
        'http://localhost:8083/tradeRequest/'+fromSymbol+'/'+toSymbol
      )
      .then(res => {
        getCurrencyArr(res.data.Currency.get(0));
        console.log(currencyArr.length);
      })
      .catch(error => console.log(error));
  };

   
return (
 <div>
  <Trade indexes={index} lastPrices={lastPrice} priceDates={priceDate}></Trade>
  <Currency indexes={currIndex} lastPrices={currLastPrice} priceDates={currPriceDate}></Currency>
  <Options indexes={index} lastPrices={lastPrice} priceDates={priceDate}></Options>
  </div>
)
    
 
}

export default App;
