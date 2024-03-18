// TradingViewWidget.jsx
import React, { useEffect, useState } from "react";

import MarketOverviewWidget from "./MaketOverView";
import axios from "axios";
import HighChartsStock from "../../components/HighCharts";
import Forex from "./components/Forex";
import ModalV1 from "../../components/Modal/ModalV1";
import SearchSymbol from "./components/SearchSymbol";
import SlideMarket from "./components/SlideMarket";
import { useTranslation } from "react-i18next";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const KEY = process.env.REACT_APP_KEY;

export default function MainApp() {
  const [stockData, setStockData] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [searchSymbol, setSearchSymbol] = useState(false);
  const [showBuySell, setShowBuySell] = useState(false);
  const [showPeakTrough, setShowPeakTrough] = useState(false);
  useEffect(() => {
    setSymbol("AAPL");
  }, []);

  const fetchData = async () => {
    try {
      // const res = await axios.get(
      //   `${DOMAIN}/query?function=TIME_SERIES_DAILY&symbol=BA&outputsize=full&apikey=${KEY}`
      // );
      // console.log("res", res);
      const res = await axios.get(
        `https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=${symbol}&datatype=json&output_size=compact
        `,
        {
          headers: {
            "X-RapidAPI-Key":
              "53428faddfmsh7bdfe1baaabb513p19c45ajsnb8058863e96d",
            "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
          },
        }
      );
      setStockData(res.data["Time Series (Daily)"]);
      // setStockData(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    if (symbol) {
      fetchData();
    }
  }, [symbol]);

  const dataArrayWithKeys = Object.entries(stockData);
  // console.log("dataArrayWithKeys", dataArrayWithKeys);

  // Sử dụng map để chuyển đổi mỗi đối tượng thành một mảng giá trị
  const resultArray = dataArrayWithKeys.map(([timestamp, values]) => {
    return [
      new Date(timestamp).getTime(), // Convert timestamp to milliseconds
      parseFloat(values["1. open"]),
      parseFloat(values["2. high"]),
      parseFloat(values["3. low"]),
      parseFloat(values["4. close"]),
      parseFloat(values["5. volume"]),
    ];
  });

  resultArray.sort((a, b) => a[0] - b[0]);

  // Tạo một mảng chứa các timestamps bạn muốn đánh dấu

  const ohlc = [],
    volume = [],
    dataLength = resultArray.length;

  for (let i = 0; i < dataLength; i += 1) {
    ohlc.push([
      resultArray[i][0], // the date
      resultArray[i][1], // open
      resultArray[i][2], // high
      resultArray[i][3], // low
      resultArray[i][4], // close
    ]);
    volume.push([
      resultArray[i][0], // the date
      resultArray[i][5], // the volume
    ]);
  }
  const findPeaksAndTroughs = (data) => {
    const peaks = [];
    const troughs = [];
    // console.log("data", data);
    for (let i = 1; i < data.length - 1; i++) {
      // console.log("dâtta: " + data[i]);
      // console.log("data1: " + data[i - 1]);
      if (data[i] > data[i - 1] && data[i] > data[i + 1]) {
        //lấy theo điểm hiện tại lớn hơn phần tử trc và sau
        peaks.push({ x: i, y: data[i] }); // Điểm đỉnh
      } else if (data[i] < data[i - 1] && data[i] < data[i + 1]) {
        // lấy theo điểm hiện tại nhỏ hơn phần trc và sau
        troughs.push({ x: i, y: data[i] }); // Điểm đáy
      }
    }

    return { peaks, troughs };
  };

  // Sử dụng hàm để xác định đỉnh và đáy từ dữ liệu giá
  const prices = resultArray.map((item) => item[1]); // Lấy giá cổ phiếu từ resultArray hoặc dữ liệu tương tự
  const { peaks, troughs } = findPeaksAndTroughs(prices);

  const annotations = showBuySell
    ? [
        {
          labels: resultArray.map((dataPoint) => ({
            point: {
              xAxis: 0,
              yAxis: 0,
              x: dataPoint[0],
              y: ((dataPoint[1] + dataPoint[4]) / 2).toFixed(2),
            },
            text: dataPoint[1] < dataPoint[4] ? "M" : "B",
            backgroundColor: dataPoint[1] < dataPoint[4] ? "green" : "red",
            // padding: 5,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "black",
            style: {
              color: "white",
              fontSize: "12px",
            },
          })),
        },
      ]
    : showPeakTrough
    ? [
        {
          labels: peaks?.map((point) => ({
            point: {
              xAxis: 0,
              yAxis: 0,
              x: ohlc[point.x][0], // Thời gian (timestamp) của điểm đỉnh
              y: ohlc[point.x][2], // Giá cao (high) tương ứng với điểm đỉnh
            },
            text: "Đỉnh",
            backgroundColor: "green",
            color: "#FFFFFF", //
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "black",
            style: {
              color: "white", // Thay đổi màu của văn bản thành màu xanh
              fontSize: "12px", // Cỡ chữ
            },
          })),
        },
        {
          labels: troughs?.map((point) => ({
            point: {
              xAxis: 0,
              yAxis: 0,
              x: ohlc[point.x][0], // Thời gian (timestamp) của điểm đáy
              y: ohlc[point.x][3], // Giá thấp (low) tương ứng với điểm đáy
            },
            text: "Đáy",
            backgroundColor: "red", // Màu nền
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "black",
            style: {
              color: "white", // Thay đổi màu của văn bản thành màu xanh
              fontSize: "12px", // Cỡ chữ
            },
          })),
        },
      ]
    : [];

  const toggleAnnotations = (value) => {
    if (value === 1) {
      setShowBuySell(!showBuySell);
      if (showPeakTrough) {
        setShowPeakTrough(false);
      }
    } else if (value === 2) {
      setShowPeakTrough(!showPeakTrough);
      if (showBuySell) {
        setShowBuySell(false);
      }
    }
  };

  const options = {
    title: {
      text: `Giá cổ phiếu ${symbol} theo ngày`,
    },
    rangeSelector: {
      selected: 2,
      buttons: [
        {
          type: "week",
          count: 1,
          text: "1W",
        },
        {
          type: "month",
          count: 1,
          text: "1M",
        },
        {
          type: "all",
          count: 2,
          text: "All",
        },
      ],
      inputPosition: {
        align: "left",
        x: 0,
        y: 0,
      },
      buttonPosition: {
        align: "right",
        x: 0,
        y: 0,
      },
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
          align: "right",
        },
        top: "80%",
        height: "20%",
        offset: 0,
      },
    ],
    styledMode: true,
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
        console.log("chart", chart);
        if (point && point.series && point.series.chart) {
          if (point.isHeader) {
            position = {
              x: Math.max(
                chart.plotLeft,
                Math.min(
                  point.plotX + chart.plotLeft - width / 2,
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
        }
        return { x: 0, y: 0 };
      },
    },

    series: [
      {
        type: "ohlc",
        id: `${symbol.toLowerCase()}-ohlc`,
        name: `Giá cổ phiếu ${symbol}`,
        data: ohlc,
      },
      {
        type: "column",
        id: `${symbol.toLowerCase()}-volume`,
        name: `Số lượng giao dịch ${symbol}`,
        data: volume,
        yAxis: 1,
      },
    ],

    annotations: annotations,
  };

  return (
    <div className="w-full">
      <SlideMarket />
      <div className=" grid grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1">
        <div className="col-span-2 bg-white" style={{ width: "100%" }}>
          <button
            className="px-3 py-2 rounded-lg bg-white hover:bg-slate-50 border"
            onClick={() => {
              setSearchSymbol(true);
            }}
          >
            {symbol}
          </button>

          <button
            className="px-3 py-2 rounded-lg bg-navy-700 text-white hover:bg-navy-600 border ml-2"
            onClick={() => toggleAnnotations(1)}
          >
            {showBuySell ? "Ẩn" : "Hiện điểm mua/bán"}
          </button>
          <button
            className="px-3 py-2 rounded-lg bg-navy-700 text-white hover:bg-navy-600 border ml-2"
            onClick={() => toggleAnnotations(2)}
          >
            {showPeakTrough ? "Ẩn" : "Lọc đỉnh/đáy"}
          </button>
          <HighChartsStock options={options} />
        </div>

        <MarketOverviewWidget symbol={symbol} />
      </div>
      <Forex />
      <ModalV1
        open={searchSymbol}
        setOpen={setSearchSymbol}
        classNameChildren={"w-[1250px]"}
      >
        <SearchSymbol setSymbol={setSymbol} setOpen={setSearchSymbol} />
      </ModalV1>
    </div>
  );
}
