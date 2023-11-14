import React, { useEffect, useState } from "react";
import Card from "../../../../components/Card";
import Button from "../../../../components/Buttons/Button";
import { TbEdit } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import Modal from "../../../../components/Modal/Modal";
import NewsEdit from "./NewsEdit";
import { toast } from "react-toastify";
import ModalV1 from "../../../../components/Modal/ModalV1";
import { BiTrash } from "react-icons/bi";
const DOMAIN = process.env.REACT_APP_STOCK;

const NewsDetail = () => {
  const [data, setData] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [idItem, setIdItem] = useState(null);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const res = await axios.get(`${DOMAIN}/news/details/` + id);
      setData(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (item) => {
    //console.log(item);
    setIdItem(item);
    setOpenEditModal(true);
  };

  const handleDelete = async () => {
    //console.log(item);
    try {
      await axios.delete(`${DOMAIN}/api/posts/delete/` + id);
      toast.success("Bạn đã xóa thành công");
      navigate("/admin/news");
    } catch (error) {
      toast.error("Lỗi! Vui lòng thử lại");
      console.log(error.message);
    }
  };
  //console.log(data);
  const images = data?.image || [];
  //console.log(images);
  return (
    <>
      <Button
        onClick={() => navigate("/admin/newsManager")}
        title={"Trở lại"}
        className={"bg-blue-600 text-white hover:bg-blue-800 mt-3 px-6 mb-2"}
      />
      <Card>
        <div className=" relative w-full p-5">
          {data ? (
            <table className="border border-gray-400 w-full text-base rounded">
              <colgroup>
                <col width={"30%"} />
              </colgroup>
              <tbody>
                <tr className="border border-gray-400">
                  <th className="text-left p-2">Tiêu đề</th>
                  <td>{data.title}</td>
                </tr>
                <tr className="border border-gray-400">
                  <th className="text-left p-2">Giới thiệu ngắn gọn</th>
                  <td>{data.subcontent}</td>
                </tr>
                <tr className="border border-gray-400">
                  <th className="text-left p-2">Nội dung chi tiết</th>
                  <td
                    dangerouslySetInnerHTML={{
                      __html: data.content ? data.content : "",
                    }}
                  ></td>
                </tr>
                <tr className="border border-gray-400">
                  <th className="text-left p-2">Hình ảnh</th>

                  <td>
                    <img src={data.image} alt={`${data.title}`} />
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            "Không có dữ liệu"
          )}

          <div className="flex justify-end mt-4">
            <Button
              onClick={() => handleEdit(data)}
              icon={<TbEdit className="text-[18px]" />}
              colorBgr={"bg-green-500 text-white hover:bg-green-800"}
            />
            <Button
              onClick={() => setOpenModalDelete(true)}
              icon={<AiOutlineDelete className="text-[18px]" />}
              colorBgr={"bg-red-600 text-white hover:bg-red-800"}
            />
          </div>
        </div>
        <Modal
          classNameChildren={"w-[800px]"}
          open={openEditModal}
          setOpen={setOpenEditModal}
        >
          <NewsEdit
            fetchDataWithFilter={fetchData}
            open={openEditModal}
            setOpen={setOpenEditModal}
            idItem={idItem}
          />
        </Modal>

        <ModalV1
          title={<BiTrash className="m-auto w-10 h-10 text-red-500" />}
          open={openModalDelete}
          setOpen={setOpenModalDelete}
        >
          <h2 className="text-xl my-3">Bạn có chắc muốn xóa bài viết không?</h2>
          <div className="flex justify-center mt-3">
            <Button
              title={"Có"}
              colorText={
                "border px-8 text-base text-white bg-red-500 hover:bg-red-600 border-slate-600 gap-2"
              }
              onClick={handleDelete}
            ></Button>
          </div>
        </ModalV1>
      </Card>
    </>
  );
};

export default NewsDetail;
