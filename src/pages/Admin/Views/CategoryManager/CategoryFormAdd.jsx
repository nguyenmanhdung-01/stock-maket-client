import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "react-toastify";

const CategoryFormAdd = ({ value, setOpen, fetchData }) => {
  const DOMAIN = process.env.REACT_APP_STOCK;
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({ criteriaMode: "all" });
  const onSubmit = async (data) => {
    try {
      const slug = slugify(data.name, {
        replacement: "-", // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: true, // convert to lower case, defaults to `false`
        strict: false, // strip special characters except replacement, defaults to `false`
        locale: "vi", // language code of the locale to use
        trim: true, // trim leading and trailing replacement chars, defaults to `true`
      });
      const values = {
        ...data,
        slug,
        father_id: value.news_category_id,
      };
      // console.log(values);
      //   console.log(values);

      await axios.post(
        `${DOMAIN}/newscategory/createNewsCategoryChildren`,
        values,
        {
          withCredentials: true,
        }
      );
      toast.success("Thêm Danh Mục Thành Công");
      fetchData();
      setOpen(null);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full my-1">
        <div className="w-full relative">
          <input
            type="text"
            className={` rounded focus:outline-none w-full px-3 h-[32px] text-[13px] leading-[15px] border border-black ${
              errors.name ? "border-red-500 border-[1px]" : ""
            }`}
            {...register("name", {
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
          name="name"
          render={({ messages }) => {
            return messages
              ? Object.entries(messages).map(([type, message]) => (
                  <p className="ml-10 text-[14px] text-red-500" key={type}>
                    {message}
                  </p>
                ))
              : null;
          }}
        />
        {/* <button
          type="submit"
          class="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Thêm{" "}
        </button> */}
        {/* <button
                onClick={() => setOpen(false)}
                type="button"
                class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 ml-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Hủy
              </button> */}
      </form>
    </>
  );
};

export default CategoryFormAdd;
