import React, { useContext, useEffect, useState } from "react";
import Form from "../../../../components/Form";
import Card from "../../../../components/Card";
import axios from "axios";
import slugify from "slugify";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../../../hooks/redux/auth/useAuth";

const DOMAIN = process.env.REACT_APP_STOCK;

const NewsInsert = ({ fetchData, setOpen }) => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const handleFormSubmit = async (data) => {
    // Xử lý logic khi submit form
    try {
      setLoading(true);
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
        const formData = new FormData();
        formData.append("file", data.image[0]);

        // Sử dụng axios để gửi yêu cầu không đồng bộ
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

            const value = { ...data, slug, image, userId: auth.userID.id };
            return axios.post(`${DOMAIN}/news/`, value);
          })
          .then(() => {
            // Cập nhật dữ liệu mới nhất tại đây
            toast.success("Thêm Bài Viết Thành Công");
            fetchData();
            setOpen(false);
          })
          .catch((error) => {
            // Xử lý lỗi trong quá trình tải lên
            console.error("Upload error:", error);
          });
        setLoading(false);
      } else {
        const value = { ...data, slug, image, userId: auth.userID.id };
        await axios
          .post(`${DOMAIN}/news/`, value)
          .then(() => {
            // Cập nhật dữ liệu mới nhất tại đây
            loading
              ? toast.error("Thêm Bài Viết Thành Công")
              : toast.success("Thêm Bài Viết Thành Công");

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
  const page = searchParams.get("page") || 1;

  const fetchDataStatic = async () => {
    try {
      const sheet = page ? page : 1;
      const result = await axios.get(
        `${DOMAIN}/newscategory/getAllNewsCategory?page=${sheet}`,
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
  }, [page]);

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
      <Form formFields={newsFormFields} onSubmit={handleFormSubmit} />;
    </Card>
  );
};

export default NewsInsert;
