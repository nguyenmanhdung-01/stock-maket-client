import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { formatDay } from "../../../utils/constants/formatDay";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DOMAIN = process.env.REACT_APP_STOCK;

const RelatedNews = ({ id }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get(`${DOMAIN}/news/by-category/${id}`);
      console.log("response", response);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <div className="">
      <h2 className="text-left font-bold text-lg">Tin tức liên quan</h2>
      <div className=" grid grid-cols-3 gap-5">
        {data &&
          data.map((item) => (
            <div
              key={item.news_id}
              onClick={() => navigate(`/${item.slug}`)}
              className=" flex flex-col px-2 bg border my-2 rounded-md py-1 drop-shadow-md cursor-pointer hover:bg-white"
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
    </div>
  );
};

export default RelatedNews;
