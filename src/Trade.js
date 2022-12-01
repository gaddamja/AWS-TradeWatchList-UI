
import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import axios from 'axios';

import './Stocks.css';

import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS


//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Trade({indexes, lastPrices, priceDates}) {

  
  
    const gridRef = useRef(); // Optional - for accessing Grid's API

    const [gridApi, setGridApi] =useState(null);

       //ag-Grid hook ready
   const onGridReady =(params) => {
    setGridApi(params.api);
    };


    const cellClassRules = {
      "cell-red": params => params.value < 0,
      "cell-green": params => params.value >= 0
    };
   
  
  // Each Column Definition results in one Column.
 const [columnDefs, setColumnDefs] = useState([
  {headerName: 'Stocks',
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
  {headerName: 'Week 1', field: 'Week1',cellClassRules: cellClassRules},
  {headerName: 'Week 2', field: 'Week2',cellClassRules: cellClassRules},
  {headerName: 'Week 3', field: 'Week3',cellClassRules: cellClassRules},
  {headerName: 'Week 4', field: 'Week4',cellClassRules: cellClassRules},
  {headerName: 'Week 5', field: 'Week5',cellClassRules: cellClassRules},
  {headerName: 'Week 6', field: 'Week6',cellClassRules: cellClassRules},
  {headerName: 'Week 7', field: 'Week7',cellClassRules: cellClassRules},
  {headerName: 'Week 8', field: 'Week8',cellClassRules: cellClassRules},
  {headerName: 'Week 9', field: 'Week9',cellClassRules: cellClassRules},
  {headerName: 'Week 10', field: 'Week10',cellClassRules: cellClassRules}
  ]}
]);

const [rowData, setRowData] = useState([
  { LongIndex: '', ShortIndex: '', EntryDate: '', LongEntryPrice: '', ShortEntryPrice: '', SpreadEntryPrice: '', PositionDate: '', LongLastPrice: '', ShortLastPrice: '', SpreadLastPrice: '', PercentVarSinceInception: '', WeeksonWatchlist: '', Week1: '', Week2: '', Week3: '', Week4: '', Week5: '', Week6: '', Week7: '', Week8: '', Week9: '', Week10: ''},
  
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
      add: [{ LongIndex: '', ShortIndex: '', EntryDate: '', LongEntryPrice: '', ShortEntryPrice: '', SpreadEntryPrice: '', PositionDate: '', LongLastPrice: '', ShortLastPrice: '', SpreadLastPrice: '', PercentVarSinceInception: '', WeeksonWatchlist: '', Week1: '', Week2: '', Week3: '', Week4: '', Week5: '', Week6: '', Week7: '', Week8: '', Week9: '', Week10: ''}]
         });
  }

  const loadData = () => {
    
    gridApi.forEachNode((rowNode, index) => {
      let longentryArr = [];
      let shortentryArr = [];
      indexes.map(a=>{
       
        if(a.split("|")[0] === (rowNode.data.LongIndex.trim()+":"+rowNode.data.EntryDate)) {
          console.log("matched");
          rowNode.setDataValue('LongEntryPrice',a.split('|')[1]);
          
        }
        if(a.split("|")[0].split(":")[0] === rowNode.data.LongIndex.trim()) {
          longentryArr.push(a.split("|")[0].split(":")[1]+":"+a.split('|')[1]);
        }
        if(a.split("|")[0] === (rowNode.data.ShortIndex.trim()+":"+rowNode.data.EntryDate)) {
          console.log("matched");
          rowNode.setDataValue('ShortEntryPrice',a.split('|')[1]);
        }
 
        if(a.split("|")[0].split(":")[0] === rowNode.data.ShortIndex.trim()) {
          shortentryArr.push(a.split("|")[0].split(":")[1]+":"+a.split('|')[1]);
        }

        let spreadEntry = parseFloat(parseFloat(rowNode.data.LongEntryPrice)/parseFloat(rowNode.data.ShortEntryPrice)).toFixed(2)
        rowNode.setDataValue('SpreadEntryPrice',spreadEntry);

        if(a.split("|")[0] === (rowNode.data.LongIndex.trim()+":"+rowNode.data.PositionDate)) {
        
          rowNode.setDataValue('LongLastPrice',a.split('|')[1]);
          
        }
        if(a.split("|")[0] === (rowNode.data.ShortIndex.trim()+":"+rowNode.data.PositionDate)) {
       
          rowNode.setDataValue('ShortLastPrice',a.split('|')[1]);
          
        }
 
        let spreadLast = parseFloat(parseFloat(rowNode.data.LongLastPrice)/parseFloat(rowNode.data.ShortLastPrice)).toFixed(2)
        rowNode.setDataValue('SpreadLastPrice',spreadLast);

        let variance = parseFloat(((spreadLast - spreadEntry)/spreadEntry)*100).toFixed(2)+'%';
        rowNode.setDataValue('PercentVarSinceInception',variance);

      })
   
      if(rowNode.data.WeeksonWatchlist !== '' ) {
     
        const strlongEntryDescending = [...longentryArr].sort((a, b) =>
          a.split(":")[0] >  b.split(":")[0]  ? -1 : 1,
        );
        const strshortEntryDescending = [...shortentryArr].sort((a, b) =>
        a.split(":")[0] >  b.split(":")[0]  ? -1 : 1,
      );
      //console.log(strlongEntryDescending);
      //console.log(strshortEntryDescending);
      let count = 0;
      while(count < rowNode.data.WeeksonWatchlist) {
        let spread = parseFloat(strlongEntryDescending[count].split(":")[1]/strshortEntryDescending[count].split(":")[1]).toFixed(2);
        let variance = parseFloat(((spread - rowNode.data.SpreadEntryPrice)/rowNode.data.SpreadEntryPrice)*100).toFixed(2)+'%';
        let field = "Week"+(count+1);
        rowNode.setDataValue(field,variance);
        count++;
      }
      
      }
  });
  
   
  }
  return (
    <div className='stocks-app'>
    
      <h1 className='stocks-text'>World Market Watchlist</h1>
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
      onCellClicked={cellClickedListener} // Optional - registering for Grid Event
     
      />
</div>
</div>

      
           
          </div>
    
  );

  
}