import React, { useCallback, useEffect, useState } from "react";
import Form from "../../../../components/Form";
import Card from "../../../../components/Card";
import axios from "axios";
import slugify from "slugify";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Buttons/Button";
import { uploadImageToFirebase } from "../../../../utils/constants/uploadImage";
const DOMAIN = process.env.REACT_APP_STOCK;

const NewsEdit = ({ idItem, fetchDataWithFilter, setOpen }) => {
  const { register, handleSubmit, setValue } = useForm({ criteriaMode: "all" });
  const [item, setItem] = useState(idItem);
  const [isEdit, setIsEdit] = useState(false);
  const handleIsEditChange = (newValue) => {
    setIsEdit(newValue);
  };
  // console.log(item);
  const onSubmit = async (data) => {
    // console.log(data);
    try {
      let value = data;

      const slug = slugify(data.title, {
        replacement: "-", // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: false, // convert to lower case, defaults to `false`
        strict: false, // strip special characters except replacement, defaults to `false`
        locale: "vi", // language code of the locale to use
        trim: true, // trim leading and trailing replacement chars, defaults to `true`
      });
      let image = value.image;
      if (isEdit) {
        const imageUrl = await uploadImageToFirebase(data.image[0]);
        image = imageUrl;
      }
      // const value = { ...values, slug, image };
      //console.log("vao form edit: ", { ...value, slug, image });
      const postValue = { ...value, slug, image };
      const responre = await axios.put(
        `${DOMAIN}/news/update/${item.news_id}`,
        postValue
      );

      setOpen(false);
      toast.success("Chỉnh sửa thông tin thành công");
      fetchDataWithFilter();
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchDataWithFilter();
  }, [item]);

  const newsFormFields = [
    {
      name: "title",
      label: "Tiêu đề",
      type: "text",
      value: item?.title,
      col_span: true,
    },
    {
      name: "subcontent",
      label: "Giới thiệu ngắn",
      type: "text",
      value: item ? item.subcontent : "",
      col_span: true,
    },
    {
      name: "image",
      label: "Hình ảnh chính",
      type: "file",
      value: `${item.image}`,
      // "https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/354611404_552136603802009_5411184715209704818_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=730e14&_nc_ohc=IlnTWCz5BlQAX_Mp-Oe&_nc_ht=scontent.fhan17-1.fna&oh=00_AfDJ1DdOAzufc1Ui3MBVJ2aRygRiyDLbYsQoJKnC_HwriQ&oe=64961C34",
    },
    {
      name: "content",
      label: "Mô tả",
      type: "react-quill",
      value: item.content,
      col_span: true,
    },
  ];
  return (
    <Card title={"Chỉnh sửa thông tin bài viết"} className={"py-2 px-3"}>
      <form action="" onSubmit={handleSubmit(onSubmit)} className="text-center">
        <Form
          formFields={newsFormFields}
          register={register}
          setValue={setValue}
          // handleSubmit={handleSubmit}
          // onSubmit={onSubmit}
          onIsEditChange={handleIsEditChange}
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

export default NewsEdit;
