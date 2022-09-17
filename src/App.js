import logo from './logo.svg';
import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import axios from 'axios';
//import Stock from './Stock';
import './App.css';
import Stocks from './Stocks';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS


function App() {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [stocks, setStocks] = useState([]);
  const [fromSymbol, setFromSymbol] = useState('');
  const [toSymbol, setToSymbol] = useState('');

  // Each Column Definition results in one Column.
 const [columnDefs, setColumnDefs] = useState([
  {field: 'FromSymbol', filter: true},
  {field: 'ToSymbol', filter: true},
  {field: 'Last'},
  {field: 'High'},
  {field: 'Low'},
  {field: 'Time'},
  {field: 'Change'},
  {field: 'ChangePercent'}
]);

// DefaultColDef sets props common to all Columns
const defaultColDef = useMemo( ()=> ({
    sortable: true
  }));

// Example of consuming Grid Event
const cellClickedListener = useCallback( event => {
  console.log('cellClicked', event);
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
        setStocks(res.data.Currency);
        console.log(stocks.length);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className='stocks-app'>
      <div className='stocks-search'>

      <h1 className='stocks-text'>World Market Watchlist</h1>

       Input Currency
        <form>
          <input
            className='stocks-input'
            type='text'
            id='fromSymbol'
            name='fromSymbol'
            onChange={changeFromSymbol}
            value={fromSymbol}
            placeholder='From Currency'
          />
          &nbsp;&nbsp;
          <input
            className='stocks-input'
            type='text'
            id='toSymbol'
            name='toSymbol'
            onChange={changeToSymbol}
            value={toSymbol}
            placeholder='To Currency'
          />
          &nbsp;&nbsp;
          <button onClick={handleClick}>
            Go
          </button>
        </form>
      </div>
      <div>



{/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
<div className="ag-theme-alpine" style={{width: 1300, height: 500}}>

  <AgGridReact
      ref={gridRef} // Ref for accessing Grid's API

      rowData={stocks} // Row Data for Rows

      columnDefs={columnDefs} // Column Defs for Columns
      defaultColDef={defaultColDef} // Default Column Properties

      animateRows={true} // Optional - set to 'true' to have rows animate when sorted
      rowSelection='multiple' // Options - allows click selection of rows

      onCellClicked={cellClickedListener} // Optional - registering for Grid Event
      //onGridReady={onGridReady}
      />
</div>
</div>
      
           
          </div>
    
  );
}

export default App;
