import React, { useContext, useEffect, useState } from "react";
import Form from "../../../../components/Form";
import Card from "../../../../components/Card";
import axios from "axios";
import slugify from "slugify";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../../../hooks/redux/auth/useAuth";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Buttons/Button";
import { uploadImageToFirebase } from "../../../../utils/constants/uploadImage";

const DOMAIN = process.env.REACT_APP_STOCK;

const NewsInsert = ({ fetchData, setOpen }) => {
  const { register, handleSubmit, setValue } = useForm({ criteriaMode: "all" });
  const { auth } = useAuth();
  const onSubmit = async (data) => {
    // Xử lý logic khi submit form
    console.log("data", data.image[0]);

    try {
      const slug = slugify(data.title, {
        replacement: "-",
        remove: undefined,
        lower: false,
        strict: false,
        locale: "vi",
        trim: true,
      });
      let image = null;
      if (data.image) {
        const imageUrl = await uploadImageToFirebase(data.image[0]);

        const value = {
          ...data,
          slug,
          image: imageUrl,
          userId: auth.userID.id,
        };
        await axios.post(`${DOMAIN}/news/`, value);
        toast.success("Thêm tin tức thành công");
        fetchData();
        setOpen(false);
      } else {
        const value = { ...data, slug, image, userId: auth.userID.id };
        await axios
          .post(`${DOMAIN}/news/`, value)
          .then(() => {
            // Cập nhật dữ liệu mới nhất tại đây

            toast.success("Thêm tin tức Thành Công");

            fetchData();
            setOpen(false);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    } catch (error) {
      console.log(error.message);
      // toast.error(error.response.data.message);
    }
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const [listCategory, setListCategory] = useState([]);

  const fetchDataStatic = async () => {
    try {
      const result = await axios.get(
        `${DOMAIN}/newscategory/getAllNewsCategory?page=1`,
        {
          withCredentials: true,
        }
      );
      const data = result.data.getListCategory.map((item) => {
        return {
          value: item.news_category_id,
          label: item.name,
        };
      });
      setListCategory(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDataStatic();
  }, []);

  const newsFormFields = [
    { name: "title", label: "Tiêu đề", type: "text", col_span: true },
    {
      name: "subcontent",
      label: "Giới thiệu ngắn",
      type: "text",
      col_span: true,
    },
    {
      name: "source",
      label: "Nguồn",
      type: "text",
      col_span: true,
    },
    {
      name: "categoryId",
      label: "Lựa chọn danh mục",
      type: "select",
      options: listCategory,
    },
    { name: "image", label: "Hình ảnh chính", type: "file", value: "" },
    {
      name: "content",
      label: "Mô tả",
      type: "react-quill",
      col_span: true,
    },
  ];
  return (
    <Card title={"Thêm bài viết"} className={"py-2 px-3"}>
      <form action="" onSubmit={handleSubmit(onSubmit)} className="text-center">
        <Form
          formFields={newsFormFields}
          register={register}
          setValue={setValue}
          // handleSubmit={handleSubmit}
          // onSubmit={onSubmit}
        />
        <Button
          className={
            "col-span-2 mt-3 px-4 bg-blue-500 hover:bg-blue-700 text-[18px] text-white font-semibold justify-center"
          }
          title={"Lưu"}
          type={"submit"}
        />
      </form>
    </Card>
  );
};

export default NewsInsert;
