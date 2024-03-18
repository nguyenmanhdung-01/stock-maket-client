import React, { useEffect, useState } from "react";
import Card from "../../../../components/Card";
import { BsFileEarmarkText } from "react-icons/bs";
import Button from "../../../../components/Buttons/Button";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ContactReply from "./ContactReply";
import Reply from "./Reply";
import axios from "axios";
import dayjs from "dayjs";
import { Flip, toast } from "react-toastify";
import ModalV1 from "../../../../components/Modal/ModalV1";
import { BiTrash } from "react-icons/bi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import useAuth from "../../../../hooks/redux/auth/useAuth";
import { getRoleGroup } from "../../../../utils/constants/formatStringName";
const DOMAIN = process.env.REACT_APP_STOCK;

const ContactManagerDetail = () => {
  const { auth } = useAuth();
  const nhomQuyen = getRoleGroup(auth);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [dataContact, setDataContact] = useState([]);
  const op = searchParams.get("op");
  const reply = () => {
    navigate(`/admin/contactManager/${id}?op=reply`);
  };

  const back = () => {
    navigate("/admin/contactManager");
  };

  const fetchData = async () => {
    const response = await axios.get(`${DOMAIN}/contact/contactById/` + id);

    setDataContact(response.data);
  };

  // console.log("dataContact", dataContact);

  const handleDeleteMultiple = async () => {
    //console.log(isCheckedItems.map((item) => parseInt(item, 10)));
    try {
      const idNew = id.split(",").map((item) => parseInt(item, 10));
      //console.log(idNew);

      await axios.post(`${DOMAIN}/contact/deletesContact/`, idNew);
      setOpen(false);
      toast.success("Đã xóa thành công", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
      });
      setOpen(false);
      window.location.href = "/admin/contactManager";
    } catch (error) {
      console.log(error.message);
    }
  };

  //console.log(dataContact);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {op ? (
        // truyền value qua props
        <ContactReply dataReply={dataContact} />
      ) : (
        <Card>
          {dataContact ? (
            <div className="px-3 py-4">
              <div className="flex items-center gap-2 mb-2 mt-5">
                <FontAwesomeIcon icon={faFileLines} className="text-2xl" />
                <span className="text-[18px] text-[#848282] dark:text-yellow-400 font-bold">
                  {dataContact.title}
                </span>
              </div>
              <table className="border-collapse border border-slate-500 w-full">
                <tbody>
                  <tr>
                    <td className="py-1 px-2 w-[13%] align-baseline">
                      Thông tin người gửi
                    </td>
                    <td className="border border-slate-700 py-1 px-2">
                      <p>
                        <span className="text-[#0074a2] mr-[5px]">
                          {dataContact.username}
                        </span>
                        <span>{dataContact.email}</span>
                      </p>
                      <p>
                        <span>Điện thoại: </span>
                        <span>{dataContact.phone_number}</span>
                      </p>
                      <p>
                        <span>Địa chỉ: </span>
                        <span>{dataContact.address}</span>
                      </p>
                      <p>
                        {dayjs(dataContact.created_at).format(
                          "H:mm DD/MM/YYYY"
                        )}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-700 w-[13%] py-1 px-2">
                      Chủ đề
                    </td>
                    <td className="border border-slate-700 py-1 px-2">
                      {dataContact.topic}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="border border-slate-700 py-1 px-2"
                      colSpan={2}
                      dangerouslySetInnerHTML={{
                        __html: dataContact.content ? dataContact.content : "",
                      }}
                    ></td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-2 py-2 border border-slate-500 flex justify-center gap-2">
                <Button
                  title={"Gửi phản hồi"}
                  className={`border border-slate-500 hover:bg-gray-200 bg-white dark:bg-green-500 dark:hover:bg-green-600 ${
                    nhomQuyen?.includes(14) ? "" : "hidden"
                  }`}
                  onClick={reply}
                />
                <Button
                  onClick={() => setOpen(true)}
                  title={"Xóa"}
                  className={`border border-slate-500 hover:bg-gray-200 bg-white dark:bg-red-500 dark:hover:bg-red-600 ${
                    nhomQuyen?.includes(15) ? "" : "hidden"
                  }`}
                />
                <Button
                  title={"Quay Lại"}
                  className={
                    "border border-slate-500 hover:bg-gray-200 bg-white dark:bg-navy-600 dark:hover:bg-navy-800"
                  }
                  onClick={back}
                />
              </div>
            </div>
          ) : (
            ""
          )}

          <div>
            {/* se truyen data qua prop */}
            {dataContact.status === 1 ? <Reply dataReply={dataContact} /> : ""}
          </div>
        </Card>
      )}
      <ModalV1
        title={<BiTrash className="m-auto w-12 h-12 text-red-500" />}
        open={open}
        setOpen={setOpen}
      >
        <h2 className="text-xl">
          Bạn có chắc muốn xóa liên hệ đã lựa chọn không?
        </h2>
        <div className="flex justify-center mt-3">
          <Button
            title={"Có"}
            className={
              "border px-8 text-base text-white bg-red-500 hover:bg-red-600 border-slate-600 gap-2"
            }
            onClick={handleDeleteMultiple}
          ></Button>
        </div>
      </ModalV1>
    </>
  );
};

export default ContactManagerDetail;
