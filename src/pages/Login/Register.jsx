import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
const DOMAIN = process.env.REACT_APP_STOCK;
const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm({ criteriaMode: "all" });
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${DOMAIN}/auth/register`, data);
      console.log("Successfully registered", response.data);
      alert("Thành công");
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <form action="#" onSubmit={handleSubmit(onSubmit)} className="form-login ">
      <div className="w-full overflow-y-auto px-[50px]">
        <h1 className=" text-white text-lg">Đăng ký tài khoản</h1>
        <div className="w-full">
          <div className=" w-full flex items-center">
            <FontAwesomeIcon
              icon="fa-solid fa-user"
              className=" py-[13px] px-3 bg-[#eee] text-blue-600 text-lg rounded-s-md border-r border-r-slate-400"
            />
            <input
              {...register("TenDangNhap", {
                required: "Trường này là bắt buộc",
              })}
              type="text"
              placeholder="Tên đăng nhập"
              className=" focus:outline-none rounded-e-md"
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
          <div className=" w-full flex items-center">
            <FontAwesomeIcon
              icon="fa-solid fa-signature"
              className=" py-[13px] px-2 bg-[#eee] text-blue-600 text-lg rounded-s-md border-r border-r-slate-400"
            />
            <input
              {...register("HoVaTen", {
                required: "Trường này là bắt buộc",
              })}
              type="text"
              placeholder="Họ và tên"
              className=" focus:outline-none rounded-e-md"
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
          <div className=" w-full flex items-center">
            <FontAwesomeIcon
              icon="fa-solid fa-cake-candles"
              className=" py-[14px] px-3 bg-[#eee] text-blue-600 text-lg rounded-s-md border-r border-r-slate-400"
            />
            <input
              {...register("NgaySinh", {
                required: "Trường này là bắt buộc",
              })}
              type="date"
              className=" focus:outline-none rounded-e-md"
              title="ngày sinh"
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
          <div className=" w-full flex items-center">
            <FontAwesomeIcon
              icon="fa-solid fa-envelope"
              className=" py-[13px] px-3 bg-[#eee] text-blue-600 text-lg rounded-s-md border-r border-r-slate-400"
            />
            <input
              {...register("Email", {
                required: "Trường này là bắt buộc",
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: `Vui lòng nhập đúng email VD: 'ten123@gmail.com'`,
                },
              })}
              type="email"
              placeholder="Email"
              className=" focus:outline-none rounded-e-md"
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
          <div className=" w-full flex items-center">
            <FontAwesomeIcon
              icon="fa-solid fa-lock"
              className=" py-[13px] px-3 bg-[#eee] text-blue-600 text-lg rounded-s-md border-r border-r-slate-400"
            />
            <input
              {...register("MatKhau", {
                required: "Trường này là bắt buộc",
              })}
              type="password"
              placeholder="Mật khẩu"
              className=" focus:outline-none rounded-e-md"
            />
          </div>
          <ErrorMessage
            errors={errors}
            name="MatKhau"
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
          <div className=" w-full flex items-center">
            <FontAwesomeIcon
              icon="fa-solid fa-lock"
              className=" py-[13px] px-3 bg-[#eee] text-blue-600 text-lg rounded-s-md border-r border-r-slate-400"
            />
            <input
              {...register("confirmPassword", {
                required: "Trường này là bắt buộc",
                validate: {
                  passwordMatch: (value) =>
                    value === getValues("MatKhau") || "Mật khẩu không khớp",
                },
                minLength: {
                  value: 6,
                  message: "Vui lòng nhập mật khẩu lớn hơn 6 ký tự",
                },
                maxLength: 99,
              })}
              type="password"
              placeholder="Nhập lại mật khẩu"
              className=" focus:outline-none rounded-e-md"
            />
          </div>
          <ErrorMessage
            errors={errors}
            name="confirmPassword"
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
          <div className=" w-full flex items-center bg-[#eee] px-2 rounded-lg my-3">
            <span className="mr-4">Giới tính</span>
            <label htmlFor="" className=" flex items-center mr-4" title="Nam">
              <FontAwesomeIcon
                className=" text-blue-600 mr-1"
                icon="fa-solid fa-mars"
              />
              <input
                type="radio"
                {...register("GioiTinh", {
                  required: "Trường này là bắt buộc",
                })}
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
                {...register("GioiTinh", {
                  required: "Trường này là bắt buộc",
                })}
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
                {...register("GioiTinh", {
                  required: "Trường này là bắt buộc",
                })}
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

      <button className="btn">Sign Up</button>
    </form>
  );
};

export default Register;
