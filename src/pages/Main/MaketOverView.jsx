import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
const DOMAIN = process.env.REACT_APP_DOMAIN;
const KEY = process.env.REACT_APP_KEY;

const MarketOverviewWidget = () => {
  const { t } = useTranslation();
  const [market, setMarket] = useState({});
  const fetchGlobalQuote = async () => {
    try {
      const response = await axios.get(
        `${DOMAIN}/query?function=GLOBAL_QUOTE&symbol=BA&apikey=${KEY}`
      );
      setMarket(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {}, []);

  return (
    <div className="w-full bg-navy-800 text-white px-6 py-6 rounded-lg">
      <div className=" flex items-center justify-between mb-3">
        <span>{t("Ký hiện")}</span>
        <span>IBM</span>
      </div>
      <div className=" flex items-center justify-between my-3">
        <span>{t("Giá mở cửa")}</span>
        <span>143.6200</span>
      </div>
      <div className=" flex items-center justify-between my-3">
        <span>{t("Giá cao nhất")}</span>
        <span>144.7000</span>
      </div>
      <div className=" flex items-center justify-between my-3">
        <span>{t("Giá thấp nhất")}</span>
        <span>141.7100</span>
      </div>
      <div className=" flex items-center justify-between my-3">
        <span>{t("Giá cuối cùng")}</span>
        <span>142.5200</span>
      </div>
      <div className=" flex items-center justify-between my-3">
        <span>{t("Khối lượng giao dịch")}</span>
        <span>5469227</span>
      </div>
      <div className=" flex items-center justify-between my-3">
        <span>{t("Ngày giao dịch mới nhất")}</span>
        <span>{dayjs("2023-10-27").format("DD-MM-YYYY")}</span>
      </div>
      <div className=" flex items-center justify-between my-3">
        <span>{t("Giá đóng cửa trước đó")}</span>
        <span>143.7600</span>
      </div>
      <div className=" flex items-center justify-between my-3">
        <span>{t("Thay đổi")}</span>
        <span>-1.2400</span>
      </div>
      <div className=" flex items-center justify-between mt-3">
        <span>{t("Phần trăm thay đổi")}</span>
        <span>-0.8625%</span>
      </div>
    </div>
  );
};

export default MarketOverviewWidget;
