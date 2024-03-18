import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import HighchartsReact from "highcharts-react-official";
import HighCharts from "highcharts/highstock";
const KEY = process.env.REACT_APP_KET;
const Forex = () => {
  const { t } = useTranslation();
  const [fromCurrent, setFromCurrent] = useState("");
  const [toCurrent, setToCurrent] = useState("");
  const [forexRealTime, setForexRealTime] = useState({});
  const [forex, setForex] = useState([]);
  const [innitial, setInitial] = useState(false);
  useEffect(() => {
    setFromCurrent("EUR");
    setToCurrent("USD");
    setInitial(true);
  }, []);

  const onChangeFrom = (value) => {
    setFromCurrent(value);
    console.log("change", fromCurrent);
  };

  const onChangeTo = (event) => {
    setToCurrent(event.target.value);
  };

  const handleConvert = (event) => {
    event.preventDefault();
    setInitial(false);
    fetchData();
  };

  const fetchData = async () => {
    try {
      const [dataRealTime, dataForex] = await Promise.all([
        axios.get(
          `https://alpha-vantage.p.rapidapi.com/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrent}&to_currency=${toCurrent}&apikey=${KEY}`,
          {
            headers: {
              "X-RapidAPI-Key":
                "3048a1d1dfmshdde3ab6f776dd11p1b67e3jsnfd550c9178c7",
              "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
            },
          }
        ),
        axios.get(
          // `https://www.alphavantage.co/query?function=FX_WEEKLY&from_symbol=EUR&to_symbol=${fromCurrent}&apikey=demo`
          `https://alpha-vantage.p.rapidapi.com/query?function=FX_DAILY&from_symbol=${fromCurrent}&to_symbol=${toCurrent}&outputsize=compact&apikey=${KEY}`,
          {
            headers: {
              "X-RapidAPI-Key":
                "3048a1d1dfmshdde3ab6f776dd11p1b67e3jsnfd550c9178c7",
              "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
            },
          }
        ),
      ]);
      setForexRealTime(dataRealTime.data["Realtime Currency Exchange Rate"]);

      setForex(dataForex.data["Time Series FX (Daily)"]);

      // console.log("dataForex", dataForex.data["Time Series FX (Weekly)"]);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (innitial && fromCurrent && toCurrent) {
      fetchData();
    }
  }, [innitial]);

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
  resultArray.sort((a, b) => a[0] - b[0]); //xắp xếp từ nhỏ tới lớn dựa theo timestamp

  const options = {
    title: {
      text: `Biểu đồ phân tích chứng khoán từ ${forexRealTime["1. From_Currency Code"]} đến ${forexRealTime["3. To_Currency Code"]}`,
    },
    navigator: {
      enabled: false,
    },
    stockTools: {
      guiEnabled: false,
      gui: {
        enabled: false,
      },
    },
    rangeSelector: {
      selected: 2,
      inputDateFormat: "%b %e, %Y %H:%M",
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
      inputEnabled: true,
    },

    series: [
      {
        name: "Forex",
        type: "line", // Hoặc 'area' nếu muốn biểu đồ dạng diện tích
        data: resultArray, // Dữ liệu chứng khoán
        marker: {
          enabled: true, // Kích hoạt marker
          symbol: "circle", // Symbol của marker
          radius: 4, // Kích thước của marker
          states: {
            hover: {
              enabled: true, // Kích hoạt hiệu ứng hover
              radius: 6, // Kích thước của marker khi hover
            },
          },
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
        <form action="" className=" mb-4 bg-navy-700 px-3 py-2 rounded-md">
          <div className=" grid grid-cols-5 gap-3 xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-1 sm:grid-cols-1">
            <div className="w-full col-span-2 flex items-center">
              <span className="mr-2 text-base">Từ</span>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Mã tiền tệ VD:USD"
                onChange={(e) => onChangeFrom(e.target.value)}
                required
              />
            </div>
            <div className="w-full col-span-2 flex items-center">
              <span className="mr-2 text-base">Đến</span>
              <input
                onChange={onChangeTo}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Mã tiền tệ VD:EUR"
                required
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                onClick={handleConvert}
                className=" px-3 py-2 bg-blue-500 rounded-lg"
              >
                Chuyển đổi
              </button>
            </div>
          </div>
        </form>
        <div className="grid grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1">
          <div className=" bg-navy-800 p-4 rounded-lg">
            <div className=" flex items-center justify-between mb-3">
              <span>{t("Mã tiền tệ chuyển từ")}</span>
              <span className="font-bold">
                {forexRealTime["1. From_Currency Code"]}
              </span>
            </div>
            <div className=" flex items-center justify-between my-3">
              <span>{t("Tên mã")}</span>
              <span>{forexRealTime["2. From_Currency Name"]}</span>
            </div>
            <div className=" flex items-center justify-between my-3">
              <span>{t("Đến mã tiền tệ")}</span>
              <span className="font-bold">
                {forexRealTime["3. To_Currency Code"]}
              </span>
            </div>
            <div className=" flex items-center justify-between my-3">
              <span>{t("Tên mã")}</span>
              <span>{forexRealTime["4. To_Currency Name"]}</span>
            </div>
            <div className=" flex items-center justify-between my-3 bg-yellow-500 px-1 text-white animate-[pulse_1.3s_linear_infinite]">
              <span>{t("Tỷ giá")}</span>
              <span>
                {forexRealTime["5. Exchange Rate"]}
                {forexRealTime["3. To_Currency Code"]}
              </span>
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
            <HighchartsReact
              highcharts={HighCharts}
              constructorType={"stockChart"}
              options={options}
            />
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
