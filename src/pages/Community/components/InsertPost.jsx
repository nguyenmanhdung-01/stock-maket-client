import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";

import ReactQuillEditor from "../../../components/ReactQuill";
import Button from "../../../components/Buttons/Button";
import useAuth from "../../../hooks/redux/auth/useAuth";
const DOMAIN = process.env.REACT_APP_STOCK;
const InsertPost = () => {
  const { auth } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const [content, setContent] = useState("");
  const onSubmit = async (data) => {
    try {
      let image = null;
      if (data.image[0]) {
        const formData = new FormData();
        formData.append("file", data.image[0]);
        await axios
          .post(`http://giamngheo.bkt.net.vn/file/upload`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            // Xử lý phản hồi sau khi tải lên thành công
            image = response.data?.file_path;
            //console.log("image: " + image);

            const value = {
              ...data,
              content: content,
              image,
              userId: auth.userID.id,
            };
            return axios.post(`${DOMAIN}/post/`, value);
          })
          .then(() => {
            // Cập nhật dữ liệu mới nhất tại đây
            toast.success("Thêm Bài Viết Thành Công");
            // fetchData();
            // setOpen(false);
          })
          .catch((error) => {
            // Xử lý lỗi trong quá trình tải lên
            console.error("Upload error:", error);
          });
      } else {
        image = data.image[0];
        const value = {
          ...data,
          content: content,
          userId: auth.userID.id,
          image,
        };
        await axios
          .post(`${DOMAIN}/post/`, value)

          .then(() => {
            // Cập nhật dữ liệu mới nhất tại đây
            toast.success("Thêm Bài Viết Thành Công");
            // fetchData();
            // setOpen(false);
          })
          .catch((error) => {
            // Xử lý lỗi trong quá trình tải lên
            console.error("Upload error:", error);
          });
      }
    } catch (error) {
      toast.error("Lỗi không thể thêm bài viết");
    }
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tên bài viết
          </label>
          <input
            {...register("title", {
              required: "Trường này là bắt buộc",
            })}
            type="text"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Tên bài viết"
          />
          <ErrorMessage
            errors={errors}
            name="title"
            render={({ messages }) => {
              //console.log("messages", messages);
              return messages
                ? Object.entries(messages).map(([type, message]) => (
                    <p
                      className=" bg-white px-2 rounded-md text-[16px] text-red-500 inline-block"
                      key={type}
                    >
                      {message}
                    </p>
                  ))
                : null;
            }}
          />
        </div>
        <div class="mb-6">
          <input
            {...register("image", {
              // required: "Bạn chưa chọn file",
              required: false,
            })}
            type="file"
            accept=".jpg,.jpeg,.png"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Tên bài viết"
          />
          <ErrorMessage
            errors={errors}
            name="image"
            render={({ messages }) => {
              //console.log("messages", messages);
              return messages
                ? Object.entries(messages).map(([type, message]) => (
                    <p
                      className=" bg-white px-2 rounded-md text-[16px] text-red-500 inline-block"
                      key={type}
                    >
                      {message}
                    </p>
                  ))
                : null;
            }}
          />
        </div>
        <ReactQuillEditor
          {...register("content", {
            required: "Trường này là bắt buộc",
          })}
          content={content}
          setContent={(value) => {
            setContent(value);
            setValue("content", value);
          }}
        />
        <ErrorMessage
          errors={errors}
          name="content"
          render={({ messages }) => {
            //console.log("messages", messages);
            return messages
              ? Object.entries(messages).map(([type, message]) => (
                  <p
                    className=" bg-white px-2 rounded-md text-[16px] text-red-500 inline-block"
                    key={type}
                  >
                    {message}
                  </p>
                ))
              : null;
          }}
        />
        <div className=" text-right">
          <Button
            title={"Đăng bài viết"}
            className={"bg-blue-500 text-white mt-2 hover:bg-blue-700"}
            classNameBtn={""}
            type={"submit"}
          />
        </div>
      </form>
    </div>
  );
};

export default InsertPost;
