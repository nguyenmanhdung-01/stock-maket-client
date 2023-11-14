import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
// import "./news.css";
import { BiTime, BiMessageRounded } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { MdArrowRight } from "react-icons/md";

import Breadcrumbs from "../../../components/Breadcrumb/index";
import HeaderTitle from "../../../components/HeaderTitle";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import PaginationV2 from "../../../components/Pagination/PaginationV2";
import { useSearchParams } from "react-router-dom";
import EmptyState from "../../../components/EmptyState/EmptyState";
import LoadingPage from "../../../components/LoadingPage";
import Card from "../../../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import RightBar from "../../../components/RightBar/RightBar";
import { formatDay } from "../../../utils/constants/formatDay";
const DOMAIN = process.env.REACT_APP_STOCK;
const NewDetail = () => {
  const { state } = useLocation();
  console.log("state", state);
  const props = state ? state.item : "";
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [postList, setPostlist] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // const page = searchParams.get("page");
  const page = searchParams.get("page") || 1;

  const fetchData = async () => {
    try {
      setLoading(true);
      const sheet = page ? page : 1;

      let url = `${DOMAIN}/news/allPost?`;
      url += `page=${page || 1}`;
      const res = await axios.get(url);
      const result = await axios.get(
        `${DOMAIN}/news/getPostBySlugOfCategory/${state.item.news_category_id}?page=${sheet}`
      );
      // const resultTwo = await axios.get(
      //   `${DOMAIN}/api/comment/getCommentByPost/${postItem.id}`,
      //   {
      //     withCredentials: true,
      //   }
      // );

      setData(res.data.data);
      setCount(result.data.queryCount);
      setPostlist(result.data.query);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [state]);

  const handlePageChange = (page) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page);
    setSearchParams(newSearchParams.toString());
    navigate(`/news/${state.item.slug}?page=${page}`, { state: state });
  };

  return (
    <Card>
      <div className=" pt-6">
        <Breadcrumbs
          title={"điểm tin"}
          subtitle={props ? props.name : ""}
          link={"/news"}
        />
        <div className=" pb-14 grid grid-cols-4 gap-3 pt-4 px-6">
          <div className=" col-span-3 phone:col-span-4 desktop:col-span-3 laptop:col-span-3 tablet:col-span-3">
            <HeaderTitle title={props ? props.name : ""} />
            <div className="desktop:pr-5 list phone:pr-0">
              {loading ? (
                <LoadingPage />
              ) : postList ? (
                postList.length ? (
                  postList.map((post) => {
                    return (
                      <div
                        key={post.news_id}
                        onClick={() => navigate(`/${post.slug}`)}
                        className="grid grid-cols-4 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        <img
                          className="object-cover max-w-full rounded-t-lg md:rounded-none md:rounded-l-lg col-span-1"
                          src={post ? post.image : ""}
                          alt=""
                        />
                        <div className=" p-4 leading-normal w-full col-span-3">
                          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {post?.title}
                          </h5>
                          <div className=" flex items-center justify-between w-full">
                            <span>
                              Tác giả : <b>{post.user?.HoVaTen}</b>
                              <p>
                                Nguồn: <b>{post.source}</b>
                              </p>
                            </span>
                            <p>{formatDay(post.created_at)}</p>
                          </div>
                          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {post?.subcontent}
                          </p>
                          <p className=" float-right">
                            {" "}
                            Lượt xem: {post.view}{" "}
                            <FontAwesomeIcon icon={faEye} />
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <EmptyState />
                )
              ) : (
                <EmptyState />
              )}
            </div>
            {postList?.length > 0 && (
              <PaginationV2
                total={count}
                pageSize={8}
                current={searchParams.get("page") || 1}
                onChange={handlePageChange}
              />
            )}
          </div>

          <RightBar />
        </div>
      </div>
    </Card>
  );
};

export default NewDetail;
