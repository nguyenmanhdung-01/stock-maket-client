import React, { useEffect } from "react";
import "./Login.css";
import { MyLogin } from "./Login.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormAction, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Register from "./Register.jsx";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import useAuth from "../../hooks/redux/auth/useAuth.js";
import { toast } from "react-toastify";
const DOMAIN = process.env.REACT_APP_STOCK;
const Login = () => {
  const { auth, setAuth } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ criteriaMode: "all" });
  const navigate = useNavigate();
  useEffect(() => {
    MyLogin();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios
        .post(`${DOMAIN}/auth/login`, data)
        .then((response) => {
          console.log("response", response);
          setAuth({
            accessToken: response.data.token,
            userID: response.data.user,
          });
          toast.success("Đăng nhập thành công");
          navigate("/", { replace: true });
        });
    } catch (errors) {
      toast.error(errors.response.data.message, {
        position: "top-center",
      });
      // alert("lỗi");
      // console.log(errors);
    }
  };
  // console.log("auth", auth);
  return (
    <div className="bg-login h-[100vh]">
      <button
        onClick={() => navigate("/")}
        className=" inline ml-5 my-5 text-white text-xl hover:text-navy-300"
      >
        <FontAwesomeIcon
          icon="fa-solid fa-chevron-left"
          className=" text-base mr-2"
        />
        Trang chủ
      </button>
      <div className="flex items-center justify-start flex-row pl-10 ">
        {/* <h2>Weekly Coding Challenge #1: Sign in/up Form</h2> */}
        <div className="container" id="container">
          <div class="form-container sign-up-container">
            <Register />
          </div>
          <div class="form-container sign-in-container">
            <form
              action="#"
              onSubmit={handleSubmit(onSubmit)}
              className="form-login px-[50px]"
            >
              <h1 className=" text-white text-left text-2xl">
                Chào mừng đến với STOCK MAKET
              </h1>
              <div class="social-container">
                <div href="#" class="social">
                  <i class="fab fa-facebook-f"></i>
                </div>
                <div
                  href="#"
                  className="social p-2 bg-white rounded-3xl text-center hover:bg-slate-100 cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon="fa-brands fa-google"
                    className=" text-2xl text-red-500"
                  />
                </div>
                <div href="#" class="social">
                  <i class="fab fa-linkedin-in"></i>
                </div>
              </div>
              <span className=" text-white bg-[#a5a5a5] px-3 rounded-lg text-lg ">
                hoặc sử dụng tài khoản
              </span>
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
                    icon="fa-solid fa-lock"
                    className=" py-[13px] px-3 bg-[#eee] text-blue-600 text-lg rounded-s-md border-r border-r-slate-400"
                  />
                  <input
                    {...register("password", {
                      required: "Trường này là bắt buộc",
                    })}
                    type="password"
                    placeholder="Mật khẩu"
                    className=" focus:outline-none rounded-e-md"
                  />
                </div>
                <ErrorMessage
                  errors={errors}
                  name="password"
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
              <div href="#">Forgot your password?</div>
              <button className="btn">Sign In</button>
            </form>
          </div>
          <div class="overlay-container">
            <div class="overlay">
              <div class="overlay-panel overlay-left">
                <h1 className=" text-xl">Chào mừng trở lại!</h1>
                <p className="text-p">
                  Để giữ được kết nối vui lòng đăng nhập vào thông tin cá nhân
                  của bạn
                </p>
                <button class="btn ghost" id="signIn">
                  Sign In
                </button>
              </div>
              <div class="overlay-panel overlay-right text-white">
                <h1 className=" text-xl">Xin chào!</h1>
                <p className="text-p">
                  Nếu chưa có tài khoản hãy tạo tài khoản mới
                </p>
                <button class="btn ghost" id="signUp">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
