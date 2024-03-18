import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";

import Checkbox from "../../../../components/checkbox";
import EmptyState from "../../../../components/EmptyState/EmptyState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faLockOpen,
  faPlus,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Card from "../../../../components/Card";
import ModalV1 from "../../../../components/Modal/ModalV1";
import Modal from "../../../../components/Modal/Modal";
import { ImWarning } from "react-icons/im";
import Button from "../../../../components/Buttons/Button";
import FormUpdateQuyen from "./FormUpdateQuyen";
import PaginationV2 from "../../../../components/Pagination/PaginationV2";
import { getRoleGroup } from "../../../../utils/constants/formatStringName";
import useAuth from "../../../../hooks/redux/auth/useAuth";

const options = [
  {
    label: "Đã khóa",
    value: 1,
  },
  {
    label: "Đang hoạt động",
    value: 0,
  },
];

const DOMAIN = process.env.REACT_APP_STOCK;

const UserManager = () => {
  const { auth } = useAuth();
  const nhomQuyen = getRoleGroup(auth);
  const [data, setData] = useState([]);
  const [count, setCount] = useState();
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isCheckedItems, setIsCheckedItems] = useState([]);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const navigate = useNavigate();
  const [selectTwo, setSelectTwo] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openModalError, setOpenModalError] = useState(false);
  const [closeStatus, setCloseStatus] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [id, setId] = useState();
  const page = searchParams.get("page");
  const status = searchParams.get("status");
  const fetchData = async () => {
    try {
      let url = `${DOMAIN}/users?`;

      if (selectTwo) {
        url += `status=${selectTwo.value || null}&`;
      }
      url += `page=${page || 1}&`;

      const res = await axios.get(url);
      //console.log(res);
      setData(res.data.data);
      setCount(res.data.count);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // Kiểm tra nếu tất cả các checkbox phụ đã được chọn
    const isAllChecked = data?.every((item) =>
      isCheckedItems.includes(item.id)
    );
    setIsCheckedAll(isAllChecked);
  }, [data, isCheckedItems]);

  useEffect(() => {
    fetchData();
  }, [page, selectTwo]);

  const handleCheckAll = (event) => {
    const isChecked = event.target.checked;
    setIsCheckedAll(isChecked);
    setIsCheckedItems(isChecked ? data.map((item) => item.id) : []);
  };

  const handlePageChange = async (page) => {
    searchParams.set("page", page);
    searchParams.set("status", status);
    setSearchParams(searchParams);
    // setPage(page);
    navigate(`/admin/user?page=${page}&status=${status}`);
  };

  const handleChangeSelectTwo = (selectedTwo) => {
    setSelectTwo(selectedTwo);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
    //console.log("Select Two value:", selectedTwo.value);
  };

  const handleResetFillter = () => {
    setSelectTwo("");
  };

  const handleCheckItem = (event, itemId) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setIsCheckedItems([...isCheckedItems, itemId]);
    } else {
      setIsCheckedItems(isCheckedItems.filter((id) => id !== itemId));
    }
  };

  const handleTickClose = async () => {
    try {
      const item = isCheckedItems.map((item) => parseInt(item, 10));

      await axios.put(`${DOMAIN}/users/approve-close`, item);

      toast.success("Đã khóa tài khoản");
      setCloseStatus(false);
      setIsCheckedAll(false);
      setIsCheckedItems([]);
      fetchData();
    } catch (error) {
      toast.error("Lỗi! Không thể khóa");
      console.log(error.message);
    }
  };

  const handleTickOpen = async () => {
    try {
      const item = isCheckedItems.map((item) => parseInt(item, 10));

      await axios.put(`${DOMAIN}/users/approve-open`, item);

      toast.success("Đã mở tài khoản");
      setOpenStatus(false);
      setIsCheckedAll(false);
      setIsCheckedItems([]);
      fetchData();
    } catch (error) {
      toast.error("Lỗi! Chưa thể mở khóa");
      console.log(error.message);
    }
  };
  return (
    <Card>
      <div className="flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
        <div className=" p-4 rounded-2xl bg-white shadow-xl dark:!bg-navy-800 dark:text-white">
          <div>
            {/* <button className=" bg-green-500 text-white px-3 py-2 rounded-lg">
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              <span>Thêm mới</span>
            </button>
            <button className=" bg-red-500 text-white px-3 py-2 rounded-lg ml-3">
              <FontAwesomeIcon icon={faTrashCan} className="mr-2" />
              <span>Xóa lựa chọn</span>
            </button> */}

            <button
              onClick={() => {
                if (isCheckedItems.length === 0) {
                  setOpenModalError(true);
                } else {
                  setCloseStatus(true);
                }
              }}
              className={`bg-red-500 text-white px-3 py-2 rounded-lg ml-3 ${
                nhomQuyen?.includes(2) ? "" : "hidden"
              }`}
            >
              <FontAwesomeIcon icon={faLock} className="mr-2" />
              <span>Khóa tài khoản</span>
            </button>
            <button
              onClick={() => {
                if (isCheckedItems.length === 0) {
                  setOpenModalError(true);
                } else {
                  setOpenStatus(true);
                }
              }}
              className={` bg-red-500 text-white px-3 py-2 rounded-lg ml-3 ${
                nhomQuyen?.includes(3) ? "" : "hidden"
              }`}
            >
              <FontAwesomeIcon icon={faLockOpen} className="mr-2" />
              <span>Mở khóa tài khoản</span>
            </button>
          </div>
        </div>
        <div className="relative mt-[3px] flex mb-10 flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:flex-grow-0 md:gap-1 xl:gap-2">
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
            value={selectTwo}
            onChange={handleChangeSelectTwo}
            options={options}
            placeholder="Lọc trạng thái"
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "grey" : "",
                borderRadius: "20px",
              }),
            }}
            className=" dark:text-black"
          />
          <button
            onClick={handleResetFillter}
            className="py-1 px-4 font-semibold text-base bg-gray-500 rounded-[20px] text-white hover:bg-primaryColor"
          >
            Xóa bộ lọc
          </button>
        </div>
      </div>
      <div className=" mt-4 p-4 rounded-2xl bg-white shadow-xl w-full dark:!bg-navy-800 dark:text-white">
        <table className="border border-blue-400 rounded-lg bg-white w-full dark:!bg-navy-800 dark:text-white overflow-y-auto relative">
          <thead>
            <tr>
              <th
                scope="col"
                className="p-4 border border-blue-400 rounded-lg overflow-hidden"
              >
                <div className="flex items-center">
                  {/* <input
                      onChange={handleCheckAll}
                      value={isCheckedAll}
                      checked={isCheckedAll}
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    /> */}
                  <Checkbox
                    checked={isCheckedAll}
                    value={isCheckedAll}
                    handleChange={handleCheckAll}
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th className="border border-blue-400">Username</th>
              <th className="border border-blue-400">Họ và tên</th>
              <th className="border border-blue-400">Email</th>
              <th className="border border-blue-400">Ngày tạo</th>
              <th className="border border-blue-400">Trạng thái </th>
              <th className="border border-blue-400">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {data.length ? (
              data.map((item) => (
                <tr key={item.id}>
                  <td className="w-4 p-4 text-center">
                    <div className="flex items-center">
                      {/* <input
                          checked={isCheckedItems.includes(item.id)}
                          onChange={(event) => handleCheckItem(event, item.id)}
                          value={isCheckedItems}
                          id={`checkbox-table-search-${item.id}`}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        /> */}
                      <Checkbox
                        checked={isCheckedItems.includes(item.id)}
                        handleChange={(event) =>
                          handleCheckItem(event, item.id)
                        }
                        value={isCheckedItems}
                      />
                      <label
                        htmlFor={`checkbox-table-search-${item.id}`}
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className="text-center ">
                    {item.TenDangNhap ? item.TenDangNhap : ""}
                  </td>

                  <td className="text-center">{item?.HoVaTen}</td>

                  <td className="text-center line-clamp-1 sm:table-cell">
                    {item?.Email}
                  </td>
                  <td className="text-center">
                    {item &&
                      item.NgayTao &&
                      dayjs(item.NgayTao).format("DD/MM/YYYY")}
                  </td>
                  <td className="text-center text-[12px]">
                    {item.status === 0 ? "Đang hoạt động" : "Đã khóa"}
                  </td>
                  <td className="text-center">
                    <FontAwesomeIcon
                      icon={faUserGear}
                      className={` text-xl cursor-pointer text-blue-500 ${
                        nhomQuyen?.includes(4) ? "" : "hidden"
                      }`}
                      onClick={() => {
                        setId(item);
                        setOpenModalUpdate(true);
                      }}
                    />
                  </td>
                </tr>
              ))
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

      <ModalV1
        title={<ImWarning className="m-auto w-10 h-10 text-yellow-400" />}
        open={openModalError}
        setOpen={setOpenModalError}
        isCheckedItems={isCheckedItems.length}
      >
        <h2 className="text-xl col-span-2 font-semibold text-red-600">
          Bạn chưa lựa chọn! Xin vui lòng thử lại...
        </h2>
      </ModalV1>

      <ModalV1
        title={
          <span className="block text-center">
            <FontAwesomeIcon
              icon={faLock}
              className="m-auto w-10 h-10 text-red-600"
            />
          </span>
        }
        open={closeStatus}
        setOpen={setCloseStatus}
      >
        <h2 className="text-xl mb-5">
          Bạn có chắc muốn khóa các tài khoản lựa chọn đã đánh dấu không?
        </h2>
        <div className="flex justify-center mt-3">
          <Button
            title={"Có"}
            classNameBtn={
              "border px-8 py-2 text-base text-white bg-red-500 hover:bg-red-600 gap-2"
            }
            onClick={handleTickClose}
          ></Button>
        </div>
      </ModalV1>
      <ModalV1
        title={
          <span className="block text-center">
            <FontAwesomeIcon
              icon={faLockOpen}
              className="m-auto w-10 h-10 text-green-600"
            />
          </span>
        }
        open={openStatus}
        setOpen={setOpenStatus}
      >
        <h2 className="text-xl mb-5">
          Bạn có chắc muốn mở các tài khoản đã đánh dấu không?
        </h2>
        <div className="flex justify-center mt-3">
          <Button
            title={"Có"}
            classNameBtn={
              "border px-8 py-2 text-base text-white bg-red-500 hover:bg-red-600 gap-2"
            }
            onClick={handleTickOpen}
          ></Button>
        </div>
      </ModalV1>
      <ModalV1
        title={"Phân quyền"}
        open={openModalUpdate}
        setOpen={setOpenModalUpdate}
      >
        <FormUpdateQuyen
          user={id}
          setOpen={setOpenModalUpdate}
          fetchData={fetchData}
        />
      </ModalV1>
    </Card>
  );
};

export default UserManager;
