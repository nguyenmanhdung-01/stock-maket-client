import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import moment from "moment-timezone";
import Card from "../../../components/Card";
import { LiaDoorOpenSolid } from "react-icons/lia";
import { BsDoorClosedFill } from "react-icons/bs";
import EmptyState from "../../../components/EmptyState/EmptyState";
import LoadingPage from "../../../components/LoadingPage";
const SlideMarket = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const settings = {
    // dots: true,
    infinite: true,
    className: "center",
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerPadding: "60px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          // dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=demo`
      );
      setData(response.data.markets);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card extra={"rounded-b-none"}>
      <div className=" px-4 py-3 ">
        <h2 className="animate-pulse text-2xl">
          Trạng Thái Của Các Thị Trường
        </h2>
        {loading ? (
          <LoadingPage />
        ) : (
          <Slider {...settings}>
            {data.length > 0 ? (
              data.map((item, idx) => (
                <div
                  style={{ width: "95%" }}
                  key={idx}
                  className=" py-6 px-4 bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  Thị trường
                  <span>
                    {" "}
                    {item?.market_type === "Equity"
                      ? "chứng khoán"
                      : item?.market_type === "Forex"
                      ? "ngoại hối"
                      : item?.market_type === "Cryptocurrency"
                      ? "tiền ảo"
                      : ""}
                  </span>{" "}
                  tại
                  <b> {item.region}</b>
                  <p
                    className="mb-3 font-normal text-gray-500 dark:text-gray-400"
                    title="Sàn giao dịch chính được sử dụng"
                  >
                    {item.primary_exchanges}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <p className=" flex items-center">
                        {moment
                          .tz(item?.local_open, "HH:mm", item?.region)
                          .tz("Asia/Ho_Chi_Minh")
                          .format("HH:mm")}{" "}
                        <LiaDoorOpenSolid className="" />
                      </p>{" "}
                      -{" "}
                      <p className=" flex items-center">
                        {moment
                          .tz(item?.local_close, "HH:mm", item?.region)
                          .tz("Asia/Ho_Chi_Minh")
                          .format("HH:mm")}{" "}
                        <BsDoorClosedFill />
                      </p>
                      <b>(UTC +07)</b>
                    </span>
                    <span className=" animate-pulse">
                      {item.current_status === "open" ? (
                        <span className="text-green-500 font-semibold">
                          Đang mở
                        </span>
                      ) : (
                        <span className="text-red-500 font-semibold">
                          Đã đóng
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState />
            )}
          </Slider>
        )}
      </div>
    </Card>
  );
};

export default SlideMarket;
