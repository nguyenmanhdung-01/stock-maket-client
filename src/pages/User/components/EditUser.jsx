import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { formatDay, formatDayV2 } from "../../../utils/constants/formatDay";
const DOMAIN = process.env.REACT_APP_STOCK;
const EditUser = ({ dataUser, setOpen, refreshData }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm({ criteriaMode: "all" });
  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `${DOMAIN}/users/edit/${dataUser?.id}`,
        data
      );
      console.log("success", response);
      toast.success("Chỉnh sửa thành công! Lưu thay đổi");
      refreshData();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form action="#" onSubmit={handleSubmit(onSubmit)} className="">
        <h1 className=" text-white">Chỉnh sửa thông tin cá nhân</h1>
        <div className="w-full grid grid-cols-2 gap-5 px-[50px] text-lg">
          <div className="w-full ">
            <div className=" w-full flex items-center border rounded-md">
              <FontAwesomeIcon
                icon="fa-solid fa-user"
                className=" py-[13px] px-3 bg-[#eee] text-blue-600 rounded-s-md border-r border-r-slate-400"
              />
              <input
                {...register("TenDangNhap", {})}
                defaultValue={dataUser?.TenDangNhap}
                type="text"
                placeholder="Tên đăng nhập"
                className=" focus:outline-none rounded-e-md px-2 py-[7px] w-full"
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="TenDangNhap"
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
          <div className="w-full">
            <div className=" w-full flex items-center border rounded-md">
              <FontAwesomeIcon
                icon="fa-solid fa-signature"
                className=" py-[13px] px-2 bg-[#eee] text-blue-600 rounded-s-md border-r border-r-slate-400"
              />
              <input
                {...register("HoVaTen", {})}
                defaultValue={dataUser?.HoVaTen}
                type="text"
                placeholder="Họ và tên"
                className=" focus:outline-none rounded-e-md px-2 py-[7px] w-full"
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="HoVaTen"
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
          <div className="w-full">
            <div className=" w-full flex items-center border rounded-md">
              <FontAwesomeIcon
                icon="fa-solid fa-cake-candles"
                className=" py-[14px] px-3 bg-[#eee] text-blue-600 rounded-s-md border-r border-r-slate-400"
              />
              <input
                {...register("NgaySinh", {})}
                type="date"
                className=" focus:outline-none rounded-e-md px-2 py-[7px] w-full"
                title="ngày sinh"
                defaultValue={formatDayV2(dataUser?.NgaySinh)}
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="NgaySinh"
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
          <div className="w-full">
            <div className=" w-full flex items-center border rounded-md">
              <FontAwesomeIcon
                icon="fa-solid fa-envelope"
                className=" py-[13px] px-3 bg-[#eee] text-blue-600 rounded-s-md border-r border-r-slate-400"
              />
              <input
                {...register("Email", {
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: `Vui lòng nhập đúng email VD: 'ten123@gmail.com'`,
                  },
                })}
                type="email"
                placeholder="Email"
                defaultValue={dataUser?.Email}
                className=" focus:outline-none rounded-e-md px-2 py-[7px] w-full"
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="Email"
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
          <div className="w-full">
            <div className=" w-full flex items-center border rounded-md">
              <FontAwesomeIcon
                icon="fa-solid fa-envelope"
                className=" py-[13px] px-3 bg-[#eee] text-blue-600 rounded-s-md border-r border-r-slate-400"
              />
              <input
                type="text"
                defaultValue={dataUser?.SĐT}
                className={`focus:outline-none rounded-e-md px-2 py-[7px] w-full  ${
                  errors.SĐT ? "border-red-500 border-[1px]" : ""
                }`}
                {...register("SĐT", {
                  required: "Không được bỏ trống trường này",
                  pattern: {
                    value: /^\d{10,}$/,
                    message: "Vui lòng chỉ nhập bằng số VD: '0912...'",
                  },
                  minLength: {
                    value: 10,
                    message: `Vui lòng nhập ít nhất 10 ký tự`,
                  },
                })}
                placeholder="Số điện thoại"
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="SĐT"
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

          <div className="w-full">
            <div className=" w-full flex items-center border rounded-md bg-[#eee] px-2 my-3">
              <span className="mr-4">Giới tính</span>
              <label htmlFor="" className=" flex items-center mr-4" title="Nam">
                <FontAwesomeIcon
                  className=" text-blue-600 mr-1"
                  icon="fa-solid fa-mars"
                />
                <input
                  type="radio"
                  defaultChecked={dataUser?.GioiTinh == 1}
                  {...register("GioiTinh", {})}
                  value={1}
                  id=""
                />
              </label>
              <label htmlFor="" className=" flex items-center mr-4" title="Nữ">
                <FontAwesomeIcon
                  className=" text-blue-600 mr-1"
                  icon="fa-solid fa-venus"
                />
                <input
                  type="radio"
                  defaultChecked={dataUser?.GioiTinh == 2}
                  {...register("GioiTinh", {})}
                  value={2}
                  id=""
                />
              </label>
              <label htmlFor="" className=" flex items-center" title="N/A">
                <FontAwesomeIcon
                  className=" text-blue-600 mr-1"
                  icon="fa-solid fa-mars-and-venus"
                />
                <input
                  type="radio"
                  defaultChecked={dataUser?.GioiTinh == 0}
                  {...register("GioiTinh", {})}
                  value={0}
                  id=""
                />
              </label>
            </div>
            <ErrorMessage
              errors={errors}
              name="GioiTinh"
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
        </div>

        <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-base px-5 py-2.5 text-center mb-2">
          Lưu
        </button>
      </form>
    </div>
  );
};

export default EditUser;
