import {
  faArrowTrendDown,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Card from "../../components/Card";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const KEY = process.env.REACT_APP_KET;

const MarketOverviewWidget = ({ symbol }) => {
  console.log("symbol", symbol);
  const { t } = useTranslation();
  const [market, setMarket] = useState({});
  const fetchGlobalQuote = async () => {
    try {
      const response = await axios.get(
        `https://alpha-vantage.p.rapidapi.com/query?function=GLOBAL_QUOTE&symbol=${symbol}`,
        {
          headers: {
            "X-RapidAPI-Key":
              "53428faddfmsh7bdfe1baaabb513p19c45ajsnb8058863e96d",
            "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
          },
        }
      );
      console.log("query", response);
      setMarket(response.data["Global Quote"]);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (symbol) {
      fetchGlobalQuote();
    }
  }, [symbol]);

  return (
    <Card extra={"rounded-none rounded-br-lg "}>
      {market ? (
        <div className="w-full px-6 py-6 border-t">
          <div className=" flex items-center justify-between mb-3">
            <span>{t("Ký hiệu")}</span>
            <span className=" font-bold">{market["01. symbol"] || ""}</span>
          </div>
          <div className=" flex items-center justify-between my-3">
            <span>{t("Giá mở cửa")}</span>
            <span>{market["02. open"] || ""}</span>
          </div>
          <div className=" flex items-center justify-between my-3">
            <span>{t("Giá cao nhất")}</span>
            <span>{market["03. high"] || ""}</span>
          </div>
          <div className=" flex items-center justify-between my-3">
            <span>{t("Giá thấp nhất")}</span>
            <span>{market["04. low"] || ""}</span>
          </div>
          <div className=" flex items-center justify-between my-3 bg-purple-700 text-white animate-[pulse_1.3s_linear_infinite] px-1">
            <span>{t("Giá cuối cùng")}</span>
            <span>{market["05. price"] || ""}</span>
          </div>
          <div className=" flex items-center justify-between my-3">
            <span>{t("Khối lượng giao dịch")}</span>
            <span>{market["06. volume"] || ""}</span>
          </div>
          <div className=" flex items-center justify-between my-3">
            <span>{t("Ngày giao dịch mới nhất")}</span>
            <span>
              {dayjs(market["07. latest trading day"]).format("DD-MM-YYYY")}
            </span>
          </div>
          <div className=" flex items-center justify-between my-3">
            <span>{t("Giá đóng cửa trước đó")}</span>
            <span>{market["08. previous close"] || ""}</span>
          </div>
          <div className=" flex items-center justify-between my-3">
            <span>{t("Thay đổi")}</span>
            {parseFloat(market["09. change"], 10) < 0 ? (
              <span className=" text-red-500 animate-pulse font-bold">
                <FontAwesomeIcon className="mr-1" icon={faArrowTrendDown} />
                {parseFloat(market["09. change"], 10) || ""}
              </span>
            ) : (
              <span className=" text-green-500 animate-pulse font-bold">
                <FontAwesomeIcon className="mr-1" icon={faArrowTrendUp} />
                {parseFloat(market["09. change"], 10) || ""}
              </span>
            )}
          </div>
          <div className=" flex items-center justify-between mt-3">
            <span>{t("Phần trăm thay đổi")}</span>
            {parseFloat(market["10. change percent"]?.replace("%", ""), 10) <
            0 ? (
              <span className=" text-red-500 animate-pulse font-bold">
                <FontAwesomeIcon className="mr-1" icon={faArrowTrendDown} />
                {market["10. change percent"] || ""}
              </span>
            ) : (
              <span className=" text-green-500 animate-pulse font-bold">
                <FontAwesomeIcon className="mr-1" icon={faArrowTrendUp} />
                {market["10. change percent"] || ""}
              </span>
            )}
          </div>
        </div>
      ) : (
        "Không có dữ liệu"
      )}
    </Card>
  );
};

export default MarketOverviewWidget;
