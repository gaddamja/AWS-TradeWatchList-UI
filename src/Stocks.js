import React from 'react';
import './Stocks.css';

  
  const Stocks = ({
    FromSymbol,
    ToSymbol,
    Last,
    High,
    Low,
    Time,
    Change,
    ChangePercent  
  }) => {
    return (
        <tr class="stocks-row">
            <td><h1>{FromSymbol}</h1></td>
            <td><p className='stocks-symbol'>{ToSymbol}</p></td>
            <td><p className='stocks-price'>{Last}</p></td>
            <td><p className='stocks-price'>{High}</p></td>
            <td><p className='stocks-price'>{Low}</p></td>
            <td><p className='stocks-volume'>{Change}</p></td>
            <td><p className='stocks-volume'>
              {Time}
            </p></td>
            {ChangePercent == "Change Percent" ? <p className='stocks-percent'>{ChangePercent}</p> : parseFloat(ChangePercent) < 0 ? (
              <td><p className='stocks-percent red'>{parseFloat(ChangePercent).toFixed(2)}%</p></td>
            ) : (
              <td><p className='stocks-percent green'>{parseFloat(ChangePercent).toFixed(2)}%</p></td>
            )}
            
        </tr>
    );
  };

  

export default Stocks;
