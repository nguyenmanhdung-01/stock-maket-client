import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage } from "@hookform/error-message";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import generateCaptcha from "../../utils";
import { toast } from "react-toastify";
import axios from "axios";
const DOMAIN = process.env.REACT_APP_STOCK;

const ForgotPassword = () => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ criteriaMode: "all" });
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState(generateCaptcha);

  const resetCaptcha = (data) => {
    setCaptcha(generateCaptcha);
    reset(watch("checkCaptcha"));
  };

  const onSubmit = async (data) => {
    const value = {
      email: data.email,
    };
    try {
      await toast.promise(
        axios.post(`${DOMAIN}/users/getOneUser`, value, {
          withCredentials: true,
        }),
        {
          pending: "Đang gửi mật khẩu về email của bạn",
          success: "Gửi mật khẩu thành công 👌",
          error: "Email không đúng 🤯",
        }
      );
      reset();
      setCaptcha(generateCaptcha);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <button
        onClick={() => navigate("/login-page")}
        className=" inline ml-5 my-5 text-white text-xl hover:text-navy-300"
      >
        <FontAwesomeIcon
          icon="fa-solid fa-chevron-left"
          className=" text-base mr-2"
        />
        Đăng nhập
      </button>
      <div className="flex items-center justify-center flex-row ">
        {/* <h2>Weekly Coding Challenge #1: Sign in/up Form</h2> */}
        <div className="container">
          <div class="form-container w-[50%] left-[50%] translate-x-[-50%]">
            <form
              action="#"
              onSubmit={handleSubmit(onSubmit)}
              className="form-login px-[50px]"
            >
              <h1 className=" text-white text-left text-2xl">
                Khôi phục mật khẩu
              </h1>
              <div class="social-container">
                <div href="#" class="social">
                  <i class="fab fa-facebook-f"></i>
                </div>
                <div
                  href="#"
                  className="social p-2 bg-white rounded-3xl text-center hover:bg-slate-100 cursor-pointer"
                >
                  <p>
                    Nếu còn nhớ email mà bạn đã tự khai báo khi đăng ký thành
                    viên, hãy khai báo chúng vào ô trống dưới đây. Sau khi kiểm
                    tra tính hợp lệ, chúng tôi sẽ tạo cho bạn mật khẩu mới.
                  </p>
                </div>
              </div>
              <div className="w-full">
                <div className=" w-full flex items-center">
                  <FontAwesomeIcon
                    icon="fa-solid fa-user"
                    className=" py-[13px] px-2 bg-[#eee] text-blue-600 text-lg rounded-s-md border-r border-r-slate-400"
                  />
                  <input
                    {...register("email", {
                      required: "Trường này không được để trống",

                      pattern: {
                        value:
                          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message:
                          "Vui lòng nhập đúng email VD: 'ten123@gmail.com'",
                      },
                    })}
                    type="email"
                    placeholder="Nhập email hoặc tài khoản đã đăng ký"
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
              <div className="mb-4 flex items-center">
                <div className="flex items-center">
                  <div className="wrapper bg-gray-700 text-white px-3 py-2">
                    <h2 className="title">{captcha}</h2>
                  </div>
                  <button type="button" className="mx-3" onClick={resetCaptcha}>
                    <FontAwesomeIcon icon={faRotateLeft} />
                  </button>
                </div>
                <div className="inline relative">
                  <input
                    type="text"
                    className="mt-2 rounded-xl text-sm border border-[#cccccc] px-2 py-1"
                    {...register("checkCaptcha", {
                      required: "Bạn chưa nhập mã",
                    })}
                    placeholder="Mã bảo mật"
                  />
                  <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
                    *
                  </span>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="checkCaptcha"
                  render={({ messages }) => {
                    //console.log("messages", messages);
                    return messages
                      ? Object.entries(messages).map(([type, message]) => (
                          <p
                            className="ml-10 text-[14px] text-red-500"
                            key={type}
                          >
                            {message}
                          </p>
                        ))
                      : null;
                  }}
                />
              </div>
              <button className="btn">Gửi yêu cầu</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
