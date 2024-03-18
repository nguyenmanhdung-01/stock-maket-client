import React, { useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import HighCharts from "highcharts/highstock";
import highchartsMore from "highcharts/highcharts-more";
import { useTranslation } from "react-i18next";

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
require("highcharts/themes/high-contrast-light")(HighCharts);

highchartsMore(HighCharts);
const HighChartsStock = ({ options, ref }) => {
  const { t } = useTranslation();

  useEffect(() => {
    HighCharts.setOptions({
      lang: {
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
        weekdays: [
          "Chủ Nhật",
          "Thứ Hai",
          "Thứ Ba",
          "Thứ Tư",
          "Thứ Năm",
          "Thứ Sáu",
          "Thứ Bảy",
        ],
        shortMonths: [
          "Th.1",
          "Th.2",
          "Th.3",
          "Th.4",
          "Th.5",
          "Th.6",
          "Th.7",
          "Th.8",
          "Th.9",
          "Th.10",
          "Th.11",
          "Th.12",
        ],

        numericSymbols: [" nghìn", " triệu"],
        loading: "Đang tải...",
        stockTools: {
          gui: {
            simpleShapes: `${t("Hình dạng đơn giản")}`,
            lines: `${t("Dòng")}`,
            crookedLines: `${t("Đường cong")}`,
            measure: `${t("Đo")}`,
            advanced: `${t("Nâng cao")}`,
            toggleAnnotations: `${t("Chuyển đổi chú thích")}`,
            verticalLabels: `${t("Nhãn dọc")}`,
            flags: `${t("Cờ")}`,
            zoomChange: `${t("Thay đổi thu phóng")}`,
            typeChange: `${t("Thay đổi loại")}`,
            saveChart: `${t("Lưu biểu đồ")}`,
            indicators: `${t("Chỉ báo")}`,
            currentPriceIndicator: `${t("Chỉ báo giá hiện tại")}`,
            zoomX: `${t("Thu phóng X")}`,
            zoomY: `${t("Thu phóng Y")}`,
            zoomXY: `${t("Thu phóng XY")}`,
            fullScreen: `${t("Toàn màn hình")}`,
            typeOHLC: "OHLC",
            typeLine: `${t("Đường")}`,
            typeCandlestick: `${t("Nến")}`,
            typeHLC: "HLC",
            typeHollowCandlestick: `${t("Nến rỗng")}`,
            typeHeikinAshi: "Heikin Ashi",
            circle: `${t("Vòng tròn")}`,
            ellipse: `${t("Hình elip")}`,
            label: `${t("Nhãn")}`,
            rectangle: `${t("Hình chữ nhật")}`,
            flagCirclepin: `${t("Vòng chòn cờ")}`,
            flagDiamondpin: `${t("Cờ kim cương")}`,
            flagSquarepin: `${t("Cờ hình vuông")}`,
            flagSimplepin: `${t("Cờ đơn giản")}`,
            measureXY: `${t("Đo XY")}`,
            measureX: `${t("Đo X")}`,
            measureY: `${t("Đo Y")}`,
            segment: `${t("Phân đoạn")}`,
            arrowSegment: `${t("Đoạn mũi tên")}`,
            ray: `${t("Ray")}`,
            arrowRay: `${t("Tia mũi tên")}`,
            line: `${t("Dòng")}`,
            arrowInfinityLine: `${t("Đường mũi tên")}`,
            horizontalLine: `${t("Đường ngang")}`,
            verticalLine: `${t("Đường thẳng đứng")}`,
            infinityLine: `${t("Đường vô cực")}`,
            crooked3: `${t("3 dòng bị lệch")}`,
            crooked5: `${t("5 dòng bị lệch")}`,
            elliott3: `${t("Elliott 3 dòng")}`,
            elliott5: `${t("Elliott 5 dòng")}`,
            verticalCounter: `${t("Bộ đếm dọc")}`,
            verticalLabel: `${t("Nhãn dọc")}`,
            verticalArrow: `${t("Mũi tên dọc")}`,
            fibonacci: "Fibonacci",
            fibonacciTimeZones: `${t("Múi giờ Fibonacci")}`,
            pitchfork: `${t("Cây chĩa")}`,
            parallelChannel: `${t("Kênh song song")}`,
            timeCycles: `${t("Chu kỳ thời gian")}`,
          },
        },
        navigation: {
          popup: {
            addButton: "Thêm",
            index: "Chỉ mục",
            period: "Giai đoạn",
            factor: "Nhân tố",
            series: "Hàng",
            editButton: "Chỉnh sửa",
            average: "Trung bình",
            saveButton: "Lưu",
            volume: "Khối lượng",
            removeButton: "Xóa",
            searchIndicators: "Tìm kiếm chỉ báo",
            name: "Tên",
            indicatorAliases: {
              rsi: ["Chỉ báo đo lường mức độ giao động của giá - RSI"],
              sma: ["Đường trung bình cộng đơn giản - SMA"],
              ema: ["Đường trung bình cộng lũy thừa - EMA"],
              macd: ["Đường trung bình cộng hội tụ phân kỳ - MACD"],
              bb: ["Bollinger Bands"],
            },
          },
        },
      },

      credits: {
        enabled: false,
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
    });
  }, [t]);
  return (
    <div>
      <HighchartsReact
        highcharts={HighCharts}
        constructorType={"stockChart"}
        options={options}
        ref={ref}
      />
    </div>
  );
};

export default HighChartsStock;
