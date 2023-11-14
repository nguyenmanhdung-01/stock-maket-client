import React, { useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import HighCharts from "highcharts/highstock";
import highchartsMore from "highcharts/highcharts-more";

require("highcharts/modules/stock-tools")(HighCharts);
require("highcharts/modules/exporting")(HighCharts);
require("highcharts/modules/export-data")(HighCharts);
require("highcharts/modules/hollowcandlestick")(HighCharts);
require("highcharts/modules/accessibility")(HighCharts);
require("highcharts/modules/drag-panes")(HighCharts);
require("highcharts/modules/heikinashi")(HighCharts);
require("highcharts/indicators/indicators-all")(HighCharts);
require("highcharts/modules/annotations-advanced")(HighCharts);
require("highcharts/modules/price-indicator")(HighCharts);
require("highcharts/modules/full-screen")(HighCharts);
require("highcharts/indicators/volume-by-price")(HighCharts);
// require("highcharts/themes/high-contrast-light")(HighCharts);
require("highcharts/themes/sand-signika")(HighCharts);
highchartsMore(HighCharts);
const HighChartsStock = ({ options }) => {
  useEffect(() => {
    HighCharts.setOptions({
      lang: {
        weekdays: [
          "Chủ Nhật",
          "Thứ Hai",
          "Thứ Ba",
          "Thứ Tư",
          "Thứ Năm",
          "Thứ Sáu",
          "Thứ Bảy",
        ],
        months: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ],

        numericSymbols: [" nghìn", " triệu"],
        loading: "Đang tải...",
      },
    });
  }, []);
  return (
    <HighchartsReact
      highcharts={HighCharts}
      constructorType={"stockChart"}
      options={options}
    />
  );
};

export default HighChartsStock;
