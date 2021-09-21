import React, { Component } from 'react';
import AnyChart from 'anychart-react'
import anychart from 'anychart'

export default class Chart extends Component {
  render() {
        var coinId = this.props.location.state.coinId.id
        var coinName = this.props.location.state.coinName.name
        var chart = anychart.stock();
        chart.tooltip(false)
        // var theName = () => {return };
        anychart.data.loadJsonFile("https://api.coingecko.com/api/v3/coins/" + coinId + "/ohlc?vs_currency=usd&days=365", function (data) {
        // create a data table
        var dataTable = anychart.data.table(0, 'MMM d, yyyy');
        dataTable.addData(data);
        // map data
        var mapping = dataTable.mapAs({ 'open': 1, 'high': 2, 'low': 3, 'close': 4 });
        // set the chart type
        // set the series
        var series = chart.plot(0).candlestick(mapping);
        series.name(coinName + " Price Data");
        // set the chart title
        chart.title(coinName + " Price Data");
        // create a plot
        var plot = chart.plot(0);
        // create an EMA indicator with period 20
        var ema20 = plot.ema(mapping, 20).series();
        // set the EMA color
        ema20.stroke('1, white');
        // disable the scroller axis
        chart.scroller().xAxis(false);
        // map "open" values for the scroller
        openValue = dataTable.mapAs();
        openValue.addField('value', 2);
        // create a scroller series with the mapped data
        chart.scroller().column(openValue);
        anychart.theme('darkGlamour');
        // set the container id
        chart.container('container');
        chart.hoverMode("none")
      })
      return <AnyChart
          width={800}
          height={600}
          instance={chart}
      />;
  }
}
