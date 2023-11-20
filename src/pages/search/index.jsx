import React, { useEffect, useState } from "react";
import { BsPinFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import Highlighter from "react-highlight-words";

import PaginationV2 from "../../components/Pagination/PaginationV2";
import EmptyState from "../../components/EmptyState/EmptyState";
import Breadcrumbs from "../../components/Breadcrumb";
import Card from "../../components/Card";
const DOMAIN = process.env.REACT_APP_STOCK;

const SearchPage = () => {
  const location = useLocation();
  const searchParam = new URLSearchParams(location.search);
  const keysearch = searchParam.get("keyword");
  const [data, setData] = useState([]);
  const [count, setCount] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const page = searchParams.get("page") || 1;
  // const [page, setPage] = useState(searchParams.get("page") || 1);
  const searchkey = searchParams.get("keyword") || "";
  const navigate = useNavigate();
  const queryParams = {
    page,
    keyword,
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  const onSubmit = async (data) => {
    setKeyword(data.keyword);
    try {
      const sheet = data.page || 1;
      const search = data.keyword || searchkey;
      //console.log(search);
      const res = await axios.get(
        `${DOMAIN}/news/search?keyword=${
          search ? search.trim() : ""
        }&page=${sheet}`
      );
      if (data.keyword) {
        setSearchParams({ ...searchParams, keyword: search, page: sheet });
      }
      setCount(res.data.total);
      setData(res.data.postList);
      //console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const data = {
      page: page,
      keyword: searchkey,
    };
    onSubmit(data);
  }, [page]);

  const handlePageChange = async (page) => {
    // searchParams.set("page", page);
    // console.log(queryParams);
    setSearchParams({ ...queryParams, page: page });
    // setPage(page);
    // setPage(page);
    //navigate(`/admin/search?page=${page}`);
  };

  return (
    <Card>
      <div>
        <Breadcrumbs title={"Tìm kiếm"} />
      </div>

      <div className="grid grid-cols-4 gap-4 px-6 mt-6 ">
        <div className="col-span-3 phone:col-span-4 tablet:col-span-3 desktop:col-span-3 laptop:col-span-3 mb-8">
          <div className="border-2 rounded-lg px-4 pb-4">
            <h3 className="text-center my-4 text-[18px] font-bold">
              Tìm kiếm tin tức mà bạn muốn!
            </h3>
            <form
              action=""
              onSubmit={handleSubmit(onSubmit)}
              className="border-b-2 pb-3 mb-3"
            >
              <div className="mb-4 ">
                <input
                  type="text"
                  {...register("keyword", {
                    required: "Vui lòng nhập từ khóa để tìm kiếm",
                  })}
                  className={`w-full border rounded-md h-[32px] px-2 text-[13px] ${
                    errors.keyword ? "border-red-500 focus:!border-red-500" : ""
                  }`}
                  defaultValue={keysearch ? keysearch : ""}
                  placeholder="Từ tìm kiếm"
                />
                <ErrorMessage
                  errors={errors}
                  name="keyword"
                  render={({ messages }) => {
                    //console.log("messages", messages);
                    return messages
                      ? Object.entries(messages).map(([type, message]) => (
                          <p
                            className="ml-10 text-[14px] text-red-500"
                            key={type}
                          >
                            {message}
                          </p>
                        ))
                      : null;
                  }}
                />
              </div>

              <div className="text-center mb-4">
                <button
                  type="submit"
                  className="bg-[#428bca] text-base text-white text-[12px] py-[6px] px-[12px] border-[1px] rounded-md hover:bg-blue-700"
                >
                  Tìm Kiếm
                </button>
              </div>
            </form>
            {keyword && (
              <div className="border-b-[1px] flex items-center justify-between mb-3">
                <ul className="inline-flex border-t-[1px] border-l-[1px] border-r-[1px] rounded-t-md px-4 py-2 text-[13px]">
                  <li className="text-base font-semibold">
                    Kết quả tìm kiếm với "<b>{keyword}</b>"
                  </li>
                  {/* <li className="bg-[#5bc0de] ml-2 px-2 text-white text-[8px] flex items-center font-semibold rounded-sm">
                  2
                </li> */}
                </ul>
              </div>
            )}
            {data.length ? (
              data.map((item) => {
                return (
                  <div
                    className=" cursor-pointer mb-4 border-[1px] border-gray-300 bg-gray-200 px-4 pb-3 rounded-lg drop-shadow-xl hover:bg-gray-100"
                    key={item.id}
                  >
                    <div onClick={() => navigate(`/${item.slug}`)}>
                      <h3 className="text-[14px] text-[#424141] font-bold mt-4 mb-2">
                        <Highlighter
                          searchWords={[keyword.trim()]}
                          autoEscape={true}
                          textToHighlight={item.title}
                        />
                      </h3>
                      <p className="text-sm">
                        <Highlighter
                          searchWords={[keyword.trim()]}
                          autoEscape={true}
                          textToHighlight={item.subcontent}
                        />
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <EmptyState />
            )}
          </div>
          {data && keyword && (
            <PaginationV2
              total={count}
              onChange={handlePageChange}
              pageSize={8}
              current={searchParams.get("page") || 1}
            />
          )}
        </div>

        {/* <Category /> */}
      </div>
    </Card>
  );
};

export default SearchPage;
