// TradingViewWidget.jsx
import React, { useEffect, useRef, useState } from "react";

import MarketOverviewWidget from "./MaketOverView";
import SAMPrice from "./SAM-Price";
import axios from "axios";
import HighChartsStock from "../../components/HighCharts";
import Forex from "./components/Forex";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const KEY = process.env.REACT_APP_KEY;

export default function MainApp() {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    // Gọi API từ Polygon.io và cập nhật state stockData
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const res = await axios.get(
      //   `${DOMAIN}/query?function=TIME_SERIES_DAILY&symbol=BA&outputsize=full&apikey=${KEY}`
      // );
      // console.log("res", res);
      // setStockData(res.data["Time Series (Daily)"]);
      const res = await axios.get(
        "https://demo-live-data.highcharts.com/aapl-ohlcv.json"
      );
      setStockData(res.data);
    } catch (error) {}
  };

  // const dataArrayWithKeys = Object.entries(stockData);
  // console.log("dataArrayWithKeys", dataArrayWithKeys);

  // // Sử dụng map để chuyển đổi mỗi đối tượng thành một mảng giá trị
  // const resultArray = dataArrayWithKeys.map(([timestamp, values]) => {
  //   return [
  //     new Date(timestamp).getTime(), // Convert timestamp to milliseconds
  //     parseFloat(values["1. open"]),
  //     parseFloat(values["2. high"]),
  //     parseFloat(values["3. low"]),
  //     parseFloat(values["4. close"]),
  //     parseFloat(values["5. volume"]),
  //   ];
  // });

  // resultArray.sort((a, b) => a[0] - b[0]);

  // const ohlc = [],
  //   volume = [],
  //   dataLength = resultArray.length,
  //   groupingUnits = [
  //     [
  //       "week", // unit name
  //       [1], // allowed multiples
  //     ],
  //     ["month", [1, 2, 3, 4, 6]],
  //   ];

  // for (let i = 0; i < dataLength; i += 1) {
  //   ohlc.push([
  //     resultArray[i][0], // the date
  //     resultArray[i][1], // open
  //     resultArray[i][2], // high
  //     resultArray[i][3], // low
  //     resultArray[i][4], // close
  //   ]);
  //   volume.push([
  //     resultArray[i][0], // the date
  //     resultArray[i][5], // the volume
  //   ]);
  // }

  const ohlc = [],
    volume = [],
    dataLength = stockData.length,
    groupingUnits = [
      [
        "week", // unit name
        [1], // allowed multiples
      ],
      ["month", [1, 2, 3, 4, 6]],
    ];

  for (let i = 0; i < dataLength; i += 1) {
    ohlc.push([
      stockData[i][0], // the date
      stockData[i][1], // open
      stockData[i][2], // high
      stockData[i][3], // low
      stockData[i][4], // close
    ]);
    volume.push([
      stockData[i][0], // the date
      stockData[i][5], // the volume
    ]);
  }

  const options = {
    rangeSelector: {
      selected: 1,
      inputDateFormat: "%b %e, %Y %H:%M",
    },
    yAxis: [
      {
        labels: {
          align: "left",
        },
        height: "80%",
        resize: {
          enabled: true,
        },
      },
      {
        labels: {
          align: "left",
        },
        top: "80%",
        height: "20%",
        offset: 0,
      },
    ],
    plotOptions: {
      candlestick: {
        color: "pink",
        lineColor: "red",
        upColor: "lightgreen",
        upLineColor: "green",
      },
    },
    tooltip: {
      shape: "square",
      headerShape: "callout",
      borderWidth: 0,
      shadow: false,
      positioner: function (width, height, point) {
        var chart = this.chart,
          position;

        if (point.isHeader) {
          position = {
            x: Math.max(
              // Left side limit
              chart.plotLeft,
              Math.min(
                point.plotX + chart.plotLeft - width / 2,
                // Right side limit
                chart.chartWidth - width - chart.marginRight
              )
            ),
            y: point.plotY,
          };
        } else {
          position = {
            x: point.series.chart.plotLeft,
            y: point.series.yAxis.top - chart.plotTop,
          };
        }

        return position;
      },
    },
    scrollbar: {
      barBorderRadius: 0,
      barBorderWidth: 1,
      buttonsEnabled: true,
      height: 14,
      margin: 0,
      rifleColor: "#333",
      trackBackgroundColor: "#f2f2f2",
      trackBorderRadius: 0,
    },
    series: [
      {
        type: "ohlc",
        id: "aapl-ohlc",
        name: "AAPL Stock Price",
        data: ohlc,
      },
      {
        type: "column",
        id: "aapl-volume",
        name: "AAPL Volume",
        data: volume,
        yAxis: 1,
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 800,
          },
          chartOptions: {
            rangeSelector: {
              inputEnabled: false,
            },
          },
        },
      ],
    },
  };

  return (
    <div className="w-full">
      <div className=" grid grid-cols-3 gap-3" style={{ width: "100%" }}>
        <div className="col-span-2">
          <HighChartsStock options={options} />
        </div>

        <MarketOverviewWidget />
      </div>
      <Forex />
    </div>
  );
}
