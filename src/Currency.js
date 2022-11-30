
import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import axios from 'axios';

import './App.css';

import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS


//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Currency({indexes, lastPrices, priceDates}) {

  
    const gridRef = useRef(); // Optional - for accessing Grid's API

    const [gridApi, setGridApi] =useState(null);

       //ag-Grid hook ready
   const onGridReady =(params) => {
    setGridApi(params.api);
    };


  // Each Column Definition results in one Column.
 const [columnDefs, setColumnDefs] = useState([
  {headerName: 'FX Rates',
  children: [
  {headerName: 'Long Index',field: 'LongIndex', editable: true,filter: true},
  {headerName: 'Short Index', field: 'ShortIndex', editable: true,filter: true},
  {headerName: 'Entry Date', field: 'EntryDate',editable: true},
  {headerName: 'Long Entry Price', field: 'LongEntryPrice'},
  {headerName: 'Short Entry Price', field: 'ShortEntryPrice'},
  {headerName: 'Spread (Entry Price)', field: 'SpreadEntryPrice'},
  {headerName: 'Position Date', field: 'PositionDate', editable: true},
  {headerName: 'Long Last Price', field: 'LongLastPrice'},
  {headerName: 'Short Last Price',field: 'ShortLastPrice'},
  {headerName: 'Spread (Last Price)', field: 'SpreadLastPrice'},
  {headerName: '%Var. (Since Inception)', field: 'PercentVarSinceInception'},
  {headerName: 'Weeks on Watchlist', field: 'WeeksonWatchlist', editable: true},
  ]}
]);

const [rowData, setRowData] = useState([
  { LongIndex: '', ShortIndex: '', EntryDate: '', LongEntryPrice: '', ShortEntryPrice: '', SpreadEntryPrice: '', PositionDate: '', LongLastPrice: '', ShortLastPrice: '', SpreadLastPrice: '', PercentVarSinceInception: '', WeeksonWatchlist: '' },
  
]);
// DefaultColDef sets props common to all Columns
const defaultColDef = useMemo( ()=> ({
  sortable: true,
  flex: 1,
  minWidth: 100,
  filter: true,
  resizable: true
  }));

// Example of consuming Grid Event
const cellClickedListener = useCallback( event => {
  //console.log('cellClicked', event);
}, []);
 
const onCellValueChanged = useCallback((event) => {
  
  //console.log("triallllll ",index);
}, []);

     //ag-Grid add new row functions
  const onAddRow = () => {
    
    gridApi.updateRowData({
      add: [{ LongIndex: '', ShortIndex: '', EntryDate: '', LongEntryPrice: '', ShortEntryPrice: '', SpreadEntryPrice: '', PositionDate: '', LongLastPrice: '', ShortLastPrice: '', SpreadLastPrice: '', PercentVarSinceInception: '', WeeksonWatchlist: ''  }]
         });
  }

  const loadData = () => {
    
    gridApi.forEachNode((rowNode, index) => {
      indexes.map(a=>{
        if(a.split("|")[0] === (rowNode.data.LongIndex.trim()+":"+rowNode.data.EntryDate)) {
          console.log("matched");
          rowNode.setDataValue('LongEntryPrice',a.split('|')[1]);
          
        }
        if(a.split("|")[0] === (rowNode.data.ShortIndex.trim()+":"+rowNode.data.EntryDate)) {
          console.log("matched");
          rowNode.setDataValue('ShortEntryPrice',a.split('|')[1]);
          
        }
 
        let spreadEntry = parseFloat(parseFloat(rowNode.data.LongEntryPrice)/parseFloat(rowNode.data.ShortEntryPrice)).toFixed(4);
        rowNode.setDataValue('SpreadEntryPrice',spreadEntry);

        if(a.split("|")[0] === (rowNode.data.LongIndex.trim()+":"+rowNode.data.PositionDate)) {
        
          rowNode.setDataValue('LongLastPrice',a.split('|')[1]);
          
        }
        if(a.split("|")[0] === (rowNode.data.ShortIndex.trim()+":"+rowNode.data.PositionDate)) {
       
          rowNode.setDataValue('ShortLastPrice',a.split('|')[1]);
          
        }
 
        let spreadLast = parseFloat(parseFloat(rowNode.data.LongLastPrice)/parseFloat(rowNode.data.ShortLastPrice)).toFixed(4);
        rowNode.setDataValue('SpreadLastPrice',spreadLast);

        let variance = parseFloat(((spreadLast - spreadEntry)/spreadEntry)*100).toFixed(4);
        rowNode.setDataValue('PercentVarSinceInception',variance);

      })
      console.log('node ' + rowNode.data.LongIndex + ' is in the grid');
  });
  
   
  }
  return (
    <div className='stocks-app'>
    
    <div>
      <button className="btn btn-primary mb-3" onClick={onAddRow}>Add Row</button>&nbsp;&nbsp;
      <button className="btn btn-primary mb-3" onClick={loadData}>Load data</button>
      </div>
      <div>
        
      </div>
    
      <div>



{/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
<div className="ag-theme-alpine" style={{width: 1300, height: 350}}>

  <AgGridReact
      ref={gridRef}
      onGridReady={onGridReady}
      rowData={rowData} // Row Data for Rows

      columnDefs={columnDefs} // Column Defs for Columns
      defaultColDef={defaultColDef} // Default Column Properties

      animateRows={true} // Optional - set to 'true' to have rows animate when sorted
      rowSelection='multiple' // Options - allows click selection of rows
      onCellValueChanged={onCellValueChanged}
      onCellClicked={cellClickedListener(indexes, lastPrices, priceDates )} // Optional - registering for Grid Event
     
      />
</div>
</div>

      
           
          </div>
    
  );

  
}