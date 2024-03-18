import axios from "axios";
import React, { useEffect, useState } from "react";
import { formatDay, formatDayV2 } from "../../../utils/constants/formatDay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const DOMAIN = process.env.REACT_APP_STOCK;
const NewsTopView = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${DOMAIN}/news/top-viewed`);
      // console.log("response", response);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className=" mb-3">
      <h2 className="text-left font-bold text-lg">Tin tức phổ biến</h2>
      {data &&
        data.map((item) => (
          <div
            key={item.news_id}
            onClick={() => navigate(`/${item.slug}`, { state: item })}
            className=" flex flex-col px-2 border my-2 rounded-md py-1 drop-shadow-md cursor-pointer hover:bg-white"
          >
            <h2 className=" text-left line-clamp-2">{item.title}</h2>
            <div className=" flex justify-between">
              <span>{formatDay(item.created_at)}</span>
              <span>
                {item.view} <FontAwesomeIcon icon={faEye} />
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default NewsTopView;
