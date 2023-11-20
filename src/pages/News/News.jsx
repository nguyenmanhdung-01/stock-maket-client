import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
import Breadcrumbs from "../../components/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { formatDay } from "../../utils/constants/formatDay";
import EmptyState from "../../components/EmptyState/EmptyState";
import Card from "../../components/Card";
const DOMAIN = process.env.REACT_APP_STOCK;
const News = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${DOMAIN}/news/by-category`);
      // console.log("response", response);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Card>
      <Breadcrumbs title={"Tin tức"} />
      <div className=" py-3">
        {loading ? (
          <LoadingPage />
        ) : data && data.length > 0 ? (
          data.map((item) => (
            <div
              key={item.category?.news_category_id}
              className="p-3 bg-white dark:bg-navy-800 text-black dark:text-white rounded-md mt-5"
            >
              <div
                onClick={() =>
                  navigate(`/news/${item.category?.slug}`, {
                    state: { item: item.category },
                  })
                }
                className="inline-flex text-3xl items-center text-gray-700 mb-2 hover:text-gray-800 dark:text-yellow-400 dark:hover:text-gray-300 cursor-pointer"
              >
                <h1 className="">{item.category?.name}</h1>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="ml-1 text-2xl font-bold mt-[6px]"
                />
              </div>
              {item.news?.length > 0 ? (
                item.news?.map((news) => (
                  <div className="grid grid-cols-2 gap-5">
                    <div
                      key={news.news_id}
                      onClick={() => navigate(`/${news.slug}`)}
                      className="flex bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <img
                        className="object-cover max-w-[130px] rounded-t-lg md:rounded-none md:rounded-l-lg"
                        src={news.image}
                        alt=""
                      />
                      <div className="p-4 leading-normal">
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
                          {news.title}
                        </h5>
                        <div className="flex items-center justify-between">
                          <span>
                            Theo : <b>{news.source}</b>
                          </span>
                          <p>{formatDay(news.created_at)}</p>
                        </div>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2">
                          {news.subcontent}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState />
              )}
            </div>
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </Card>
  );
};

export default News;
