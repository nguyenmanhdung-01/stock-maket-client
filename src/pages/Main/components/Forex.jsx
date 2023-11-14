import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import HighChartsStock from "../../../components/HighCharts";
import DigitalCurrent from "./DigitalCurrent";
const Forex = () => {
  const { t } = useTranslation();
  const [fromCurrent, setFromCurrent] = useState("EUR");
  const [toCurrent, setToCurrent] = useState("USD");
  const [forexRealTime, setForexRealTime] = useState({});
  const [forex, setForex] = useState([]);
  const [digitalCurrent, setDigitalCurrent] = useState([]);

  const fetchData = async () => {
    try {
      const [dataRealTime, dataForex, dataDigital] = await Promise.all([
        axios.get(
          `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=JPY&apikey=demo`
        ),
        axios.get(
          // `https://www.alphavantage.co/query?function=FX_WEEKLY&from_symbol=EUR&to_symbol=${fromCurrent}&apikey=demo`
          `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${fromCurrent}&to_symbol=${toCurrent}&outputsize=full&apikey=demo`
        ),
        axios.get(
          `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=CNY&apikey=demo`
        ),
      ]);
      setForexRealTime(dataRealTime.data["Realtime Currency Exchange Rate"]);
      // console.log(
      //   "dataRealTime",
      //   dataRealTime.data["Realtime Currency Exchange Rate"]
      // );
      setForex(dataForex.data["Time Series FX (Daily)"]);
      setDigitalCurrent(
        dataDigital.data["Time Series (Digital Currency Daily)"]
      );
      // console.log("dataForex", dataForex.data["Time Series FX (Weekly)"]);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fromCurrent, toCurrent]);

  const dataArrayWithKeys = Object.entries(forex);

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
  const options = {
    title: {
      text: `Biểu đồ phân tích chứng khoán từ ${forexRealTime["1. From_Currency Code"]} đến ${forexRealTime["3. To_Currency Code"]}`,
    },

    rangeSelector: {
      selected: 2, // Mặc định chọn thời gian theo ngày
      buttons: [
        {
          type: "month",
          count: 1,
          text: "Tháng",
        },
      ],
    },

    series: [
      {
        type: "ohlc",
        name: "Giá ngoại hối theo ngày",
        data: resultArray,
        dataGrouping: {
          units: [
            [
              "Tuần", // unit name
              [1], // allowed multiples
            ],
            ["Tháng", [1, 2, 3, 4, 6]],
          ],
        },
      },
    ],
  };
  return (
    <div className=" mt-5">
      <div className="px-3 py-4 bg-yellow-400 inline-block">
        <h1 className=" text-4xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-700 from-sky-600">
          {t("Tỷ giá ngoại hối")}
        </h1>
      </div>
      <div className=" text-white mt-4">
        <div className="grid grid-cols-3 gap-3">
          <div className=" bg-navy-800 p-4 rounded-lg">
            <div className=" flex items-center justify-between mb-3">
              <span>{t("Mã tiền tệ chuyển từ")}</span>
              <span>{forexRealTime["1. From_Currency Code"]}</span>
            </div>
            <div className=" flex items-center justify-between my-3">
              <span>{t("Tên mã")}</span>
              <span>{forexRealTime["2. From_Currency Name"]}</span>
            </div>
            <div className=" flex items-center justify-between my-3">
              <span>{t("Đến mã tiền tệ")}</span>
              <span>{forexRealTime["3. To_Currency Code"]}</span>
            </div>
            <div className=" flex items-center justify-between my-3">
              <span>{t("Tên mã")}</span>
              <span>{forexRealTime["4. To_Currency Name"]}</span>
            </div>
            <div className=" flex items-center justify-between my-3">
              <span>{t("Tỷ giá")}</span>
              <span>{forexRealTime["5. Exchange Rate"]}</span>
            </div>
            <div className=" flex items-center justify-between my-3">
              <span>{t("Lần làm mới cuối cùng")}</span>
              <span>
                {dayjs(forexRealTime["6. Last Refreshed"]).format(
                  "DD-MM-YYYY HH:mm:ss"
                )}
              </span>
            </div>
            <div className=" flex items-center justify-between my-3">
              <span>{t("Gia dự")}</span>
              <span>{forexRealTime["8. Bid Price"]}</span>
            </div>
            <div className=" flex items-center justify-between my-3">
              <span>{t("Giá hỏi")}</span>
              <span>{forexRealTime["9. Ask Price"]}</span>
            </div>
          </div>
          <div className="col-span-2">
            <HighChartsStock options={options} />
          </div>
          {/* <div className=" col-span-2">
            <DigitalCurrent
              dataDigital={digitalCurrent}
              fromCurrent={fromCurrent}
              toCurrent={toCurrent}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Forex;
