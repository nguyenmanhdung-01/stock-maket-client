import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate, useSearchParams } from "react-router-dom";
import Select from "react-select";
import { Flip, toast } from "react-toastify";
import axios from "axios";
import EmptyState from "../../../../components/EmptyState/EmptyState";
import { HiOutlineMail, HiOutlineMailOpen } from "react-icons/hi";
import { ImWarning } from "react-icons/im";
import { BiTrash } from "react-icons/bi";
import PaginationV2 from "../../../../components/Pagination/PaginationV2";
import Button from "../../../../components/Buttons/Button";
import Checkbox from "../../../../components/checkbox";
import { FiSearch } from "react-icons/fi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Card from "../../../../components/Card";
import ModalV1 from "../../../../components/Modal/ModalV1";
import useAuth from "../../../../hooks/redux/auth/useAuth";
import { getRoleGroup } from "../../../../utils/constants/formatStringName";
const DOMAIN = process.env.REACT_APP_STOCK;
const options = [
  {
    label: "Đã xem",
    value: 1,
  },
  {
    label: "Chưa phản hồi",
    value: 2,
  },
  {
    label: "Đã phản hồi",
    value: 3,
  },
];
const ContactManager = () => {
  const { auth } = useAuth();
  const nhomQuyen = getRoleGroup(auth);
  const navigate = useNavigate();
  const [contact, setContact] = useState([]);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isCheckedItems, setIsCheckedItems] = useState([]);
  const [count, setCount] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [closeStatus, setCloseStatus] = useState(false);
  const page = searchParams.get("page");
  const [openModalError, setOpenModalError] = useState(false);
  //Checkox

  const fetchData = async () => {
    try {
      const sheet = page || 1;
      const res = await axios.get(`${DOMAIN}/contact?page=${sheet}`);
      //console.log(res.data);

      setContact(res.data.data);
      setCount(res.data.count);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handlePageChange = async (page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
    // setPage(page);
    navigate(`/admin/contact?page=${page}`);
  };

  useEffect(() => {
    // Kiểm tra nếu tất cả các checkbox phụ đã được chọn
    const isAllChecked = contact?.every((item) =>
      isCheckedItems.includes(item.contact_id)
    );
    setIsCheckedAll(isAllChecked);
  }, [contact, isCheckedItems]);
  //console.log(isCheckedItems);
  const handleCheckAll = (event) => {
    const isChecked = event.target.checked;
    setIsCheckedAll(isChecked);
    setIsCheckedItems(isChecked ? contact.map((item) => item.contact_id) : []);
  };

  const handleCheckItem = (event, itemId) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setIsCheckedItems([...isCheckedItems, itemId]);
    } else {
      setIsCheckedItems(isCheckedItems.filter((id) => id !== itemId));
    }
  };

  const handleDeleteMultiple = async () => {
    //console.log(isCheckedItems.map((item) => parseInt(item, 10)));
    try {
      const item = isCheckedItems.map((item) => parseInt(item, 10));
      // console.log(item);

      await axios.post(`${DOMAIN}/contact/deletesContact/`, item);
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

      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleTickOpen = async () => {
    try {
      const item = isCheckedItems.map((item) => parseInt(item, 10));

      await axios.put(`${DOMAIN}/contact/approve-open`, item);

      toast.success("Đã đánh dấu thành công");
      setOpenStatus(false);
      setIsCheckedAll(false);
      setIsCheckedItems([]);
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleTickClose = async () => {
    try {
      const item = isCheckedItems.map((item) => parseInt(item, 10));

      await axios.put(`${DOMAIN}/contact/approve-close`, item);

      toast.success("Đã đánh dấu là chưa đọc");
      setCloseStatus(false);
      setIsCheckedAll(false);
      setIsCheckedItems([]);
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Card>
        <div className="flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
          <div className=" p-4 rounded-2xl bg-white shadow-xl dark:!bg-navy-800 dark:text-white">
            <div className="flex gap-2 dark:text-white">
              <Button
                onClick={() => {
                  if (isCheckedItems.length === 0) {
                    setOpenModalError(true);
                  } else {
                    setOpen(true);
                  }
                }}
                icon={<BiTrash />}
                title={"Xoá Chọn"}
                className={`hover:bg-red-600 gap-2 bg-red-400 dark:hover:bg-red-600 border text-white ${
                  nhomQuyen?.includes(15) ? "" : "hidden"
                }`}
              />
              <Button
                onClick={() => {
                  if (isCheckedItems.length === 0) {
                    setOpenModalError(true);
                  } else {
                    setCloseStatus(true);
                  }
                }}
                icon={<HiOutlineMail />}
                title={"Đánh Dấu Là Chưa Đọc"}
                className={`hover:bg-gray-200 gap-2 dark:hover:bg-yellow-600 border ${
                  nhomQuyen?.includes(16) ? "" : "hidden"
                }`}
              />
              <Button
                onClick={() => {
                  if (isCheckedItems.length === 0) {
                    setOpenModalError(true);
                  } else {
                    setOpenStatus(true);
                  }
                }}
                icon={<HiOutlineMailOpen />}
                title={"Đánh Dấu Là Đã Đọc"}
                className={`hover:bg-green-400 gap-2 dark:hover:bg-yellow-600 border border-green-500 ${
                  nhomQuyen?.includes(16) ? "" : "hidden"
                }`}
              />
            </div>
          </div>
          <div className="relative mt-[3px] flex h-[61px] w-[495px] z-40 flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[495px] md:flex-grow-0 md:gap-1 xl:w-[495px] xl:gap-2">
            {/* <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
              <p className="pl-3 pr-2 text-xl">
                <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
              </p>
              <input
                type="text"
                placeholder="Search..."
                class="block h-full w-full rounded-full bg-lightPrimary text-base font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
              />
            </div> */}
            <Select
              options={options}
              className=" dark:text-black"
              classNamePrefix={
                " outline-none focus:outline-none dark:text-black"
              }
              placeholder="Lọc trạng thái"
              maxMenuHeight={90}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? "" : "",
                  borderRadius: "20px",
                  outline: state.isFocused ? "" : "",
                  color: "#000",
                }),
              }}
            />
          </div>
        </div>
        <div className=" mt-4 p-4 rounded-2xl bg-white shadow-xl dark:!bg-navy-800 dark:text-white">
          <table className="border border-blue-400 w-full mt-10">
            <thead>
              <tr>
                <th scope="col" className="p-4 border border-blue-400">
                  <div className="flex items-center">
                    <Checkbox
                      color="indigo"
                      handleChange={handleCheckAll}
                      value={isCheckedAll}
                      checked={isCheckedAll}
                    />
                  </div>
                </th>
                <th className="border border-blue-400">Tên người gửi</th>
                <th className="border border-blue-400">Chủ đề</th>
                <th className="border border-blue-400">Tiêu đề</th>
                <th className="border border-blue-400">Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {contact.length ? (
                contact.map((item) => {
                  //console.log(item);
                  return (
                    <tr key={item.contact_id}>
                      <td className="w-4 p-4 text-center">
                        <div className="flex items-center">
                          <Checkbox
                            checked={isCheckedItems.includes(item.contact_id)}
                            handleChange={(event) =>
                              handleCheckItem(event, item.contact_id)
                            }
                            value={isCheckedItems}
                            id={`checkbox-table-search-${item.contact_id}`}
                          />
                          <label
                            htmlFor={`checkbox-table-search-${item.contact_id}`}
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td
                        className="line-clamp-1 m-auto cursor-pointer hover:opacity-90 hover:bg-gray-200 dark:hover:bg-yellow-500"
                        onClick={() =>
                          navigate(`/admin/contactManager/${item.contact_id}`)
                        }
                      >
                        <div className="flex items-center flex-col">
                          <span>
                            {item.status === 1 ? (
                              <HiOutlineMailOpen className="w-[25px] h-[25px]" />
                            ) : (
                              <HiOutlineMail className="w-[25px] h-[25px]" />
                            )}
                          </span>
                          <span>{item.username}</span>
                        </div>
                      </td>

                      <td className="text-center">{item.topic}</td>

                      <td className="text-center line-clamp-1 w-[200px]">
                        {item.title}
                      </td>
                      <td className="text-center">
                        {dayjs(item.created_at).format("DD/MM/YYYY")}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr aria-rowspan={7} className="text-center">
                  <td
                    colSpan={7}
                    className="text-center font-semibold py-3 text-xl"
                  >
                    <EmptyState />
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <PaginationV2
            total={count}
            pageSize={4}
            current={searchParams.get("page") || 1}
            onChange={handlePageChange}
          />
        </div>
      </Card>
      <ModalV1
        title={<BiTrash className="m-auto w-12 h-12 text-red-500" />}
        open={open}
        setOpen={setOpen}
      >
        <h2 className="text-xl my-3 mb-5">
          Bạn có chắc muốn xóa liên hệ đã lựa chọn không?
        </h2>
        <div className="flex justify-center mt-3">
          <Button
            title={"Có"}
            colorText={
              "border px-8 text-base text-white bg-red-500 hover:bg-red-600 border-slate-600 gap-2"
            }
            onClick={handleDeleteMultiple}
          ></Button>
        </div>
      </ModalV1>

      <ModalV1
        title={<HiOutlineMail className="m-auto w-12 h-12 text-red-500" />}
        open={closeStatus}
        setOpen={setCloseStatus}
      >
        <h2 className="text-xl mb-6">
          Bạn có chắc muốn thay đổi các lựa chọn đã đánh dấu thành trạng thái{" "}
          <b>"Chưa Đọc"</b> không?
        </h2>
        <div className="flex justify-center mt-3">
          <Button
            title={"Có"}
            classNameBtn={
              "border px-8 py-2 text-base text-white bg-red-500 hover:bg-red-600 border-slate-600"
            }
            onClick={handleTickClose}
          ></Button>
        </div>
      </ModalV1>
      <ModalV1
        title={<HiOutlineMailOpen className="m-auto w-12 h-12 text-red-500" />}
        open={openStatus}
        setOpen={setOpenStatus}
      >
        <h2 className="text-xl mb-6">
          Bạn có chắc muốn thay đổi các lựa chọn đã đánh dấu thành trạng thái{" "}
          <b>"Đã Đọc"</b> không?
        </h2>
        <div className="flex justify-center mt-3">
          <Button
            title={"Có"}
            className={
              "border px-8 text-base text-white bg-red-500 hover:bg-red-600 border-slate-600 gap-2"
            }
            onClick={handleTickOpen}
          ></Button>
        </div>
      </ModalV1>

      <ModalV1
        title={<ImWarning className="m-auto w-10 h-10 text-yellow-400" />}
        open={openModalError}
        setOpen={setOpenModalError}
        isCheckedItems={isCheckedItems.length}
      >
        <h2 className="text-xl col-span-2 font-semibold text-yellow-600">
          Bạn chưa lựa chọn! Xin vui lòng thử lại...
        </h2>
      </ModalV1>
    </>
  );
};

export default ContactManager;
