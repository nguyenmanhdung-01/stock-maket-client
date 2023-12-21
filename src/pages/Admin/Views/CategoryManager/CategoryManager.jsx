import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Button from "../../../../components/Buttons/Button";
import Card from "../../../../components/Card";
import axios from "axios";
import slugify from "slugify";
import { useNavigate, useSearchParams } from "react-router-dom";
import CategoryList from "./CategoryList";
import { toast } from "react-toastify";
import { HiHome } from "react-icons/hi";
import useAuth from "../../../../hooks/redux/auth/useAuth";
import { getRoleGroup } from "../../../../utils/constants/formatStringName";

const DOMAIN = process.env.REACT_APP_STOCK;
const CategoryManager = () => {
  const { auth } = useAuth();
  const nhomQuyen = getRoleGroup(auth);
  const [open, setOpen] = useState(false);
  const [openOne, setOpenOne] = useState();

  const [openDeleteForm, setOpenDeleteForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [newsCategory, setNewsCategory] = useState([]);
  const [newsCategoryDelete, setNewsCategoryDelete] = useState([]);
  const [newsCategoryEdit, setNewsCategoryEdit] = useState();
  const [arr, setArr] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const [count, setCount] = useState();
  const queryParams = {
    page,
  };
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({ criteriaMode: "all" });
  const onSubmit = async (data) => {
    try {
      const slug = slugify(data.category, {
        replacement: "-", // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: true, // convert to lower case, defaults to `false`
        strict: false, // strip special characters except replacement, defaults to `false`
        locale: "vi", // language code of the locale to use
        trim: true, // trim leading and trailing replacement chars, defaults to `true`
      });
      const values = { name: data.category, slug };
      // console.log(values);

      await axios.post(`${DOMAIN}/newscategory/createNewsCategory`, values, {
        withCredentials: true,
      });
      toast.success("Thêm Danh Mục Thành Công");
      //console.log(results);
      reset({ category: "" });
      fetchData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
    // setNewsCategory((prev) => [...prev, results.data]);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const groupCommentsByFatherId = (comments) => {
    const commentMap = {};
    const topLevelComments = [];

    // Tạo một map để ánh xạ các comment theo id
    for (const comment of comments) {
      const commentId = comment.news_category_id;

      if (!commentMap[commentId]) {
        commentMap[commentId] = {
          ...comment,
          children: [],
        };
      }

      const mappedComment = commentMap[commentId];

      // Kiểm tra nếu có father_id, thêm comment hiện tại vào danh sách con của cha tương ứng
      if (comment.father_id) {
        if (!commentMap[comment.father_id]) {
          commentMap[comment.father_id] = {
            children: [],
          };
        }

        commentMap[comment.father_id].children.push(mappedComment);
      } else {
        topLevelComments.push(mappedComment);
      }

      // Kiểm tra nếu comment hiện tại đã có con trong map, thì gán danh sách con của nó vào comment hiện tại
      if (commentMap[commentId].children.length > 0) {
        mappedComment.children = commentMap[commentId].children;
      }
    }

    return topLevelComments;
  };

  const fetchData = async () => {
    try {
      const sheet = page ? page : 1;
      const category = await axios.get(
        `${DOMAIN}/newscategory/getAllNewsCategory?page=${sheet}`,
        {
          withCredentials: true,
        }
      );
      const group = groupCommentsByFatherId(category.data.newsCategories);
      setArr(group);
      setNewsCategory(category.data.newsCategories);
      setCount(category.data.countCategory);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleChangePage = async (page) => {
    setSearchParams({ ...queryParams, page: page.toString() });
  };

  const handleDelete = async (item) => {
    try {
      const result = await axios.get(
        `${DOMAIN}/newscategory/getOneCategory/${item.news_category_id}`,
        {
          withCredentials: true,
        }
      );
      setNewsCategoryDelete(result.data);
      setOpenDeleteForm(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (item) => {
    try {
      const result = await axios.get(
        `${DOMAIN}/newscategory/getCategory/${item.news_category_id}`
      );
      setNewsCategoryEdit(result.data);
      setOpenEditForm(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isCheckedItems, setIsCheckedItems] = useState([]);
  useEffect(() => {
    // Kiểm tra nếu tất cả các checkbox phụ đã được chọn
    const isAllChecked = newsCategory?.every((item) =>
      isCheckedItems.includes(item.news_category_id)
    );
    setIsCheckedAll(isAllChecked);
  }, [newsCategory, isCheckedItems]);

  const handleCheckAll = (event) => {
    const isChecked = event.target.checked;
    setIsCheckedAll(isChecked);

    if (isChecked) {
      // Chọn tất cả các checkbox phụ
      const allItemIds = newsCategory.map((item) => item.news_category_id);
      setIsCheckedItems(allItemIds);
    } else {
      // Bỏ chọn tất cả các checkbox phụ
      setIsCheckedItems([]);
    }
  };
  const handleCheckItem = (event, itemId) => {
    const isChecked = event.target.checked;
    let updatedCheckedItems = [...isCheckedItems];

    if (isChecked) {
      // Chọn checkbox phụ
      updatedCheckedItems.push(itemId);
    } else {
      // Bỏ chọn checkbox phụ
      updatedCheckedItems = updatedCheckedItems.filter((id) => id !== itemId);
    }

    setIsCheckedItems(updatedCheckedItems);
  };

  return (
    <>
      {/* <h1
        onClick={() => {
          navigate("/admin");
          window.location.reload();
        }}
        className="bg-white z-20 hover:bg-gray-100 px-4 py-2 rounded-lg mb-4 cursor-pointer inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
      >
        <HiHome className="mr-1" /> <span>Trang chủ</span>
      </h1> */}
      <Card>
        <div className=" p-4">
          <div className="my-2">
            {nhomQuyen?.includes(6) && (
              <div className="flex">
                <Button
                  onClick={handleOpen}
                  type="button"
                  title={"Thêm danh mục"}
                  className={
                    " border border-gray-600 bg-blue-600 text-white hover:bg-opacity-80"
                  }
                  classNameBtn={"ml-2"}
                  icon={<AiOutlinePlusCircle className="text-[18px]" />}
                />
              </div>
            )}
          </div>
          {open && (
            <form onSubmit={handleSubmit(onSubmit)} className="w-full my-2">
              <div className="w-full relative">
                <input
                  type="text"
                  className={`block bg-white rounded focus:outline-none w-full py-2 px-3 text-[16px] leading-[15px] border border-gray-500 ${
                    errors.category ? "border-red-500 border-[1px]" : ""
                  }`}
                  {...register("category", {
                    required: "Không được bỏ trống trường này",
                  })}
                  placeholder="Thêm danh mục"
                />
                <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
                  *
                </span>
              </div>
              <ErrorMessage
                errors={errors}
                name="category"
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
              <button
                type="submit"
                className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Thêm{" "}
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  reset();
                }}
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 ml-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Hủy
              </button>
            </form>
          )}
          {arr ? (
            <CategoryList
              categorys={arr}
              setOpen={setOpenOne}
              open={openOne}
              fetchData={fetchData}
            />
          ) : null}
        </div>
      </Card>
    </>
  );
};

export default CategoryManager;
