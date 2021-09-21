import React, { Component } from 'react';
import AnyChart from 'anychart-react'
import anychart from 'anychart'

export default class Chart extends Component {
  
  
  render() {
        var coinId = this.props.location.state.coinId.id
        var coinName = this.props.location.state.coinName.name

        //set type of chart
        var chart = anychart.stock();



        
        //if posistion mode is 'float', chart disappears 
        //if position mode is 'point', tooltip doesn't render
        chart.tooltip().positionMode('float');
        
        
        
        
        
        //chart background color
        chart.background().fill("#282c34");

        // load jsonfile + function
        anychart.data.loadJsonFile("https://api.coingecko.com/api/v3/coins/" + coinId + "/ohlc?vs_currency=usd&days=max", 
        function (data) {
          // create a data table
          var dataTable = anychart.data.table(0, 'MMM d, yyyy');
          dataTable.addData(data);
          // map data
          var mapping = dataTable.mapAs({ 'open': 1, 'high': 2, 'low': 3, 'close': 4 });
          // set the series
          var series = chart.plot(0).candlestick(mapping);
          // set the series name
          series.name(coinName + " Price Data");
          // set the chart title
          chart.title(coinName + " Price Data");
          // create a plot
          var plot = chart.plot(0);
          // create an EMA(Exponential Moving Average) indicator with period 20
          var ema20 = plot.ema(mapping, 20).series();
          // set the EMA color
          ema20.stroke('1, white');
          // disable the scroller axis
          chart.scroller().xAxis(false);
          // map "open" values for the scroller
          var openValue = dataTable.mapAs();
          openValue.addField('value', 2);
          // create a scroller series with the mapped data
          chart.scroller().column(openValue);
          
          
      })
      chart.tooltip().anchor("bottomLeft");
      return <AnyChart
          width={'100%'}
          height={900}
          instance={chart}
      />;
  }
}
