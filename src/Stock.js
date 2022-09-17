/*import React from 'react';
import Plot from 'react-plotly.js';

class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: []
    }
  }

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock() {
    const pointerToThis = this;
    console.log(pointerToThis);
    let API_Call = `http://localhost:8083/tradeRequest`;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    fetch(API_Call)
      .then(
        function(response) {
          return response.json();
        }
      )
      .then(
        function(data) {
          console.log(data.Stock);

          //for (var value in data.Stock.value) {
            //console.log(value[0]);
            //stockChartXValuesFunction.push(value.length);
            //stockChartYValuesFunction.push(value.Date);
          //}

          data.Stock.forEach((stock) => {
            
            console.log(stock.Index);
            stockChartXValuesFunction.push(stock.Time);
            stockChartYValuesFunction.push(stock.Last);
          });
        

          // console.log(stockChartXValuesFunction);
          pointerToThis.setState({
            stockChartXValues: stockChartXValuesFunction,
            stockChartYValues: stockChartYValuesFunction
          });
        }
      )
  }

  render() {
    return (
      <div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <h1>Stock Market today</h1>
        <Plot
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            }
          ]}
          layout={{width: 720, height: 440, title: ''}}
        />
      </div>
    )
  }
}

export default Stock; */