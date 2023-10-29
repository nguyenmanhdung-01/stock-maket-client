import React, { useEffect, useState } from "react";
import HighChartsStock from "../../components/HighCharts";
import axios from "axios";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const KEY = process.env.REACT_APP_KEY;
const SAMPrice = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    // Gọi API từ Polygon.io và cập nhật state stockData
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const res = await axios.get(
      //   `${DOMAIN}/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=${KEY}`
      // );
      // console.log("res", res);
      // setStockData(res.data["Time Series (5min)"]);
      const res = await axios.get(
        "https://demo-live-data.highcharts.com/aapl-ohlcv.json"
      );
      setStockData(res.data);
    } catch (error) {}
  };

  const dataArrayWithKeys = Object.entries(stockData);
  console.log("dataArrayWithKeys", dataArrayWithKeys);
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

  // Sử dụng map để chuyển đổi mỗi đối tượng thành một mảng giá trị
  const resultArray = dataArrayWithKeys.map(([timestamp, values]) => {
    return [
      new Date(timestamp).getTime(), // Convert timestamp to milliseconds
      parseFloat(values["1. open"]),
      parseFloat(values["2. high"]),
      parseFloat(values["3. low"]),
      parseFloat(values["4. close"]),
    ];
  });

  resultArray.sort((a, b) => a[0] - b[0]);

  // console.log("resultArray", resultArray);

  const options = {
    chart: {
      // height: "100%",
    },
    yAxis: [
      {
        startOnTick: false,
        endOnTick: false,
        labels: {
          align: "right",
          x: -3,
        },
        title: {
          text: "OHLC",
        },
        height: "60%",
        lineWidth: 2,
        resize: {
          enabled: true,
        },
      },
      {
        labels: {
          align: "right",
          x: -3,
        },
        title: {
          text: "Volume",
        },
        top: "65%",
        height: "35%",
        offset: 0,
        lineWidth: 2,
      },
    ],
    tooltip: {
      split: true,
    },
    plotOptions: {
      series: {
        dataGrouping: {
          units: groupingUnits,
        },
      },
    },
    series: [
      {
        type: "candlestick",
        name: "AAPL",
        id: "aapl",
        zIndex: 2,
        data: ohlc,
      },
      {
        type: "column",
        name: "Volume",
        id: "volume",
        data: volume,
        yAxis: 1,
      },
      {
        type: "vbp",
        linkedTo: "aapl",
        params: {
          volumeSeriesID: "volume",
        },
        dataLabels: {
          enabled: false,
        },
        zoneLines: {
          enabled: false,
        },
      },
      {
        type: "sma",
        linkedTo: "aapl",
        zIndex: 1,
        marker: {
          enabled: false,
        },
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 800,
            maxHeight: 500,
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

  // console.log(resultArray);
  return (
    <div className="h-full">
      <HighChartsStock options={options} />
    </div>
  );
};

export default SAMPrice;
