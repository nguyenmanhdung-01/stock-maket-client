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

const CategoryManager = () => {
  const DOMAIN = process.env.REACT_APP_STOCK;

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

  const handleDeleteItems = async (items) => {
    // Call Api delete many category tại đây
    //console.log(items);
  };

  const navigate = useNavigate();

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
      <Card title={"Quản lý danh mục"} className="overflow-visible">
        {/* <div className="grid grid-cols-3 gap-4">
          <Select
            options={options}
            className="col-span-2"
            placeholder={"------Tìm danh mục theo------"}
          />
          <button className="py-2 px-4 font-semibold text-base bg-gray-500 rounded text-white hover:bg-primaryColor">
            Tìm kiếm
          </button>
        </div> */}
        {/* {newsCategory ? (
          <table className="border border-blue-400 w-full mt-10 bg-white">
            <thead>
              <tr>
                <th scope="col" className="p-4 border border-blue-400">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      checked={isCheckedAll}
                      onChange={handleCheckAll}
                    />
                    <label for="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th className="border border-blue-400">Danh mục</th>
                <th className="border border-blue-400">Tổng số bài viết</th>
                <th className="border border-blue-400">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {newsCategory.map((item) => {
                return (
                  <tr>
                    <td className="w-4 p-4 text-center">
                      <div className="flex items-center">
                        <input
                          checked={isCheckedItems.includes(
                            item.news_category_id
                          )}
                          onChange={(event) =>
                            handleCheckItem(event, item.news_category_id)
                          }
                          id="checkbox-table-search-1"
                          type="checkbox"
                          classNmae="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label for="checkbox-table-search-1" className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td className="text-center">{item.name}</td>
                    <td className="text-center">{item.postCount}</td>
                    <td className="flex items-center justify-center p-2">
                      <Button
                        onClick={() => handleEdit(item)}
                        colorText={"text-white"}
                        colorBgr={"bg-blue-600"}
                        colorHover={"bg-blue-700"}
                        icon={<TbEdit className="text-[18px]" />}
                      />
                      <Button
                        onClick={() => handleDelete(item)}
                        colorText={"text-white"}
                        colorBgr={"bg-red-700"}
                        colorHover={"bg-red-800"}
                        icon={<AiOutlineDelete className="text-[18px]" />}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
        {newsCategoryDelete ? (
          <Modal
            open={openDeleteForm}
            setOpen={setOpenDeleteForm}
            title="Xóa danh mục"
          >
            <FormDeleteCategory
              newsCategoryDelete={newsCategoryDelete}
              setOpenDeleteForm={setOpenDeleteForm}
              fetchData={fetchData}
            />
          </Modal>
        ) : null}

        <Modal
          open={openEditForm}
          setOpen={setOpenEditForm}
          title="Sửa danh mục"
        >
          <FormEditCategory
            newsCategoryEdit={newsCategoryEdit}
            setOpen={setOpenEditForm}
            fetchData={fetchData}
          />
        </Modal>

        <div className="mt-5">
          <div className="flex">
            <Button
              onClick={handleOpen}
              type="button"
              title={"Thêm danh mục"}
              colorText={"text-black border border-gray-600"}
              colorBgr={"bg-white"}
              colorHover={"bg-gray-100"}
              icon={<AiOutlinePlusCircle className="text-[18px]" />}
            />
            <Button
              icon={<AiOutlineCheckCircle className="text-[18px]" />}
              title={"Duyệt các lựa chọn"}
              colorBgr={"bg-green-400 hover:bg-green-600"}
              colorText={"text-white"}
            />
            <Button
              icon={<AiOutlineDelete className="text-[18px]" />}
              title={"Xóa các lựa chọn"}
              colorBgr={"bg-red-500"}
              colorText={"text-white"}
              colorHover={"bg-red-800"}
              onClick={() => handleDeleteItems(isCheckedItems)}
            />
          </div>

          {open && (
            <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-2">
              <div className="w-full relative">
                <input
                  type="text"
                  className={`block bg-white rounded focus:outline-none w-full h-[32px] text-[13px] leading-[15px] border-[#cccccc] ${
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
                onClick={() => setOpen(false)}
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 ml-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Hủy
              </button>
            </form>
          )}
        </div>
        <PaginationV2
          total={count}
          current={searchParams.get("page") || 1}
          pageSize="10"
          onChange={handleChangePage}
        /> */}
        <div className="my-2">
          <div className="flex">
            <Button
              onClick={handleOpen}
              type="button"
              title={"Thêm danh mục"}
              colorText={"text-black border border-gray-600"}
              colorBgr={"bg-white"}
              colorHover={"bg-gray-100"}
              icon={<AiOutlinePlusCircle className="text-[18px]" />}
            />
          </div>
        </div>
        {open && (
          <form onSubmit={handleSubmit(onSubmit)} className="w-full my-2">
            <div className="w-full relative">
              <input
                type="text"
                className={`block bg-white rounded focus:outline-none w-full h-[32px] px-3 text-[16px] leading-[15px] border-[#cccccc] ${
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
                      <p className="ml-10 text-[14px] text-red-500" key={type}>
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
            comments={arr}
            setOpen={setOpenOne}
            open={openOne}
            fetchData={fetchData}
          />
        ) : null}
      </Card>
    </>
  );
};

export default CategoryManager;
