import React from "react";
import HighChartsStock from "../../../components/HighCharts";

const DigitalCurrent = ({ dataDigital, fromCurrent, toCurrent }) => {
  console.log("Digital Current", dataDigital);
  //   console.log("fromCurrent", fromCurrent);
  //   console.log("toCurrent", toCurrent);
  const dataArrayWithKeys = Object.entries(dataDigital);

  // Sử dụng map để chuyển đổi mỗi đối tượng thành một mảng giá trị
  const resultArray = dataArrayWithKeys.map(([timestamp, values]) => {
    return [
      new Date(timestamp).getTime(), // Convert timestamp to milliseconds
      parseFloat(values["1a. open (CNY)"]),
      parseFloat(values["2a. open (CNY)"]),
      parseFloat(values["3a. open (CNY)"]),
      parseFloat(values["4a. open (CNY)"]),
      parseFloat(values["5. volume"]),
    ];
  });

  resultArray.sort((a, b) => a[0] - b[0]);

  const resultArray_line = dataArrayWithKeys.map(([timestamp, values]) => {
    return [
      new Date(timestamp).getTime(), // Convert timestamp to milliseconds
      parseFloat(values["1a. open (USD)"]),
      parseFloat(values["2a. open (USD)"]),
      parseFloat(values["3a. open (USD)"]),
      parseFloat(values["4a. open (USD)"]),
      parseFloat(values["5. volume"]),
    ];
  });
  resultArray_line.sort((a, b) => a[0] - b[0]);
  const options = {
    title: {
      text: "Candlestick and Heiken Ashi series comparison.",
      align: "left",
    },
    rangeSelector: {
      selected: 1,
    },
    yAxis: [
      {
        title: {
          text: "Candlestick",
        },
        height: "50%",
      },
      {
        title: {
          text: "Heikin Ashi",
        },
        top: "50%",
        height: "50%",
        offset: 0,
      },
    ],
    series: [
      {
        type: "candlestick",
        name: "Candlestick",
        data: resultArray,
      },
      {
        type: "heikinashi",
        name: "Heikin Ashi",
        data: resultArray,
        yAxis: 1,
      },
    ],
  };
  return (
    <div>
      <HighChartsStock options={options} />
    </div>
  );
};

export default DigitalCurrent;
