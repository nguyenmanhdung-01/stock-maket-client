import axios from "axios";
import React, { useEffect, useState } from "react";
import { formatDay } from "../../../utils/constants/formatDay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const DOMAIN = process.env.REACT_APP_STOCK;

const NewsLatest = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get(`${DOMAIN}/news/latest`);
      console.log("response", response);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="">
      <h2 className="text-left font-bold text-lg">Tin tức mới nhất</h2>
      {data &&
        data.map((item) => (
          <div
            key={item.news_id}
            onClick={() => navigate(`/${item.slug}`)}
            className=" flex flex-col px-2 bg border border-slate-300 rounded-md py-1 drop-shadow-md cursor-pointer hover:bg-white"
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

export default NewsLatest;
