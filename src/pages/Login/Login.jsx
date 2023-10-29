import React, { useEffect } from "react";
import "./Login.css";
import { MyLogin } from "./Login.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Login = () => {
  useEffect(() => {
    MyLogin();
  }, []);
  return (
    <div className="flex items-center justify-start flex-row bg-login pl-10 h-[100vh]">
      {/* <h2>Weekly Coding Challenge #1: Sign in/up Form</h2> */}
      <div className="container" id="container">
        <div class="form-container sign-up-container">
          <form action="#" className="form-login">
            <h1 className=" text-white text-lg">Đăng ký tài khoản</h1>

            <div className=" w-full flex items-center">
              <FontAwesomeIcon
                icon="fa-solid fa-user"
                className=" py-[13px] px-3 bg-[#eee] text-blue-600 text-lg rounded-s-md border-r border-r-slate-400"
              />
              <input
                type="email"
                placeholder="Username"
                className=" focus:outline-none rounded-e-md"
              />
            </div>
            <div className=" w-full flex items-center">
              <FontAwesomeIcon
                icon="fa-solid fa-signature"
                className=" py-[13px] px-2 bg-[#eee] text-blue-600 text-lg rounded-s-md border-r border-r-slate-400"
              />
              <input
                type="email"
                placeholder="Họ và tên"
                className=" focus:outline-none rounded-e-md"
              />
            </div>
            <div className=" w-full flex items-center">
              <FontAwesomeIcon
                icon="fa-solid fa-envelope"
                className=" py-[13px] px-3 bg-[#eee] text-blue-600 text-lg rounded-s-md border-r border-r-slate-400"
              />
              <input
                type="email"
                placeholder="Email"
                className=" focus:outline-none rounded-e-md"
              />
            </div>
            <div className=" w-full flex items-center">
              <FontAwesomeIcon
                icon="fa-solid fa-lock"
                className=" py-[13px] px-3 bg-[#eee] text-blue-600 text-lg rounded-s-md border-r border-r-slate-400"
              />
              <input
                type="email"
                placeholder="Mật khẩu"
                className=" focus:outline-none rounded-e-md"
              />
            </div>
            <div className=" w-full flex items-center">
              <FontAwesomeIcon
                icon="fa-solid fa-lock"
                className=" py-[13px] px-3 bg-[#eee] text-blue-600 text-lg rounded-s-md border-r border-r-slate-400"
              />
              <input
                type="email"
                placeholder="Nhập lại mật khẩu"
                className=" focus:outline-none rounded-e-md"
              />
            </div>
            <div className=" w-full flex items-center bg-[#eee] px-2 rounded-lg my-3">
              <span className="mr-4">Giới tính</span>
              <label htmlFor="" className=" flex items-center mr-4">
                <FontAwesomeIcon
                  className=" text-blue-600 mr-1"
                  icon="fa-solid fa-mars"
                />
                <input type="radio" name="gioiTinh" value={1} id="" />
              </label>
              <label htmlFor="" className=" flex items-center mr-4">
                <FontAwesomeIcon
                  className=" text-blue-600 mr-1"
                  icon="fa-solid fa-venus"
                />
                <input type="radio" name="gioiTinh" value={2} id="" />
              </label>
              <label htmlFor="" className=" flex items-center">
                <FontAwesomeIcon
                  className=" text-blue-600 mr-1"
                  icon="fa-solid fa-mars-and-venus"
                />
                <input type="radio" name="gioiTinh" value={0} id="" />
              </label>
            </div>
            <button className="btn">Sign Up</button>
          </form>
        </div>
        <div class="form-container sign-in-container">
          <form action="#" className="form-login">
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
            <div className=" w-full flex items-center">
              <FontAwesomeIcon
                icon="fa-solid fa-user"
                className=" py-[13px] px-3 bg-[#eee] text-blue-600 text-lg rounded-s-md border-r border-r-slate-400"
              />
              <input
                type="email"
                placeholder="Username"
                className=" focus:outline-none rounded-e-md"
              />
            </div>
            <div className=" w-full flex items-center">
              <FontAwesomeIcon
                icon="fa-solid fa-lock"
                className=" py-[13px] px-3 bg-[#eee] text-blue-600 text-lg rounded-s-md border-r border-r-slate-400"
              />
              <input
                type="password"
                placeholder="Password"
                className=" focus:outline-none rounded-e-md"
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
                Để giữ được kết nối vui lòng đăng nhập vào thông tin cá nhân của
                bạn
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
  );
};

export default Login;
