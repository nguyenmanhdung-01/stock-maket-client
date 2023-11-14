import React, { useState } from "react";
import { useForm } from "react-hook-form";
import generateCaptcha from "../../utils";
import { ErrorMessage } from "@hookform/error-message";
import useAuth from "../../hooks/redux/auth/useAuth";

import {
  faEnvelope,
  faFolderOpen,
  faNewspaper,
} from "@fortawesome/free-regular-svg-icons";
import {
  faLocationDot,
  faPhone,
  faRightToBracket,
  faRotateLeft,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import axios from "axios";
import Card from "../../components/Card";
const DOMAIN = process.env.REACT_APP_STOCK;
const Contact = () => {
  const { auth } = useAuth();
  console.log("auth", auth);
  const [captcha, setCaptcha] = useState(generateCaptcha);
  // const { currentUser } = useContext();
  let currentUser;
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  const onReset = (data) => {
    reset();
    setCaptcha(generateCaptcha);
    reset(data.checkCaptcha);
  };

  const resetCaptcha = (data) => {
    setCaptcha(generateCaptcha);
    reset(watch("checkCaptcha"));
  };

  const onSubmit = async (data) => {
    // console.log(data.checkCaptcha);
    // console.log(captcha);
    if (data.checkCaptcha !== captcha) {
      return false;
    }
    try {
      const response = await toast.promise(
        axios.post(`${DOMAIN}/contact/`, data),
        {
          pending: "Đang xử lý",
          success: "Bạn đã gửi phản hồi thành công 👌",
          error: "Xin lỗi !Không thể gửi phản hồi 🤯",
        }
      );
      onReset();
      //console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
    //reset();
  };
  return (
    <div className=" grid grid-cols-5 gap-4">
      <div className=" col-span-3 dark:text-white text-white bg-rgba p-2">
        <p>
          Để không ngừng nâng cao chất lượng dịch vụ và đáp ứng tốt hơn nữa các
          yêu cầu của Quý khách, chúng tôi mong muốn nhận được các thông tin
          phản hồi. Nếu Quý khách có bất kỳ thắc mắc hoặc đóng góp nào, xin vui
          lòng liên hệ với chúng tôi theo thông tin dưới đây. Chúng tôi sẽ phản
          hồi lại Quý khách trong thời gian sớm nhất.
        </p>
        <h1 className=" text-2xl">Liên hệ</h1>
        <b>Hãy để lại thông tin nếu có thắc mắc</b>
        <p className="mb-3">
          Để chúng tôi có thể hồi đáp thông tin một cách hiệu quả cho bạn. vui
          lòng điền đầy đủ thông tin
        </p>
        <span className=" flex items-center mb-1">
          <FontAwesomeIcon icon={faPhone} className="mr-2" />
          <p>Điện thoại: 09125735261</p>
        </span>
        <span className=" flex items-center">
          <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
          <p>Email: abc213@gmail.com</p>
        </span>
      </div>
      <Card extra=" col-span-2">
        <div className=" dark:text-yellow-400 ">
          <div className="border-[1px] border-[#cccccc] border-solid rounded">
            <h2 className="text-center py-2 text-white bg-yellow-500 uppercase font-bold rounded-t mb-2">
              Gửi phản hồi
            </h2>
            <form
              action=""
              className="text-[#555555] p-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-4">
                <div
                  className={`flex items-center rounded overflow-hidden border`}
                >
                  <span className="px-[12px] py-[6px] text-[18px] bg-slate-200 border border-[#cccccc]">
                    <FontAwesomeIcon icon={faFolderOpen} />
                  </span>
                  <select
                    {...register("topic", {
                      required: "Vui lòng chọn chủ đề",
                    })}
                    id=""
                    className={`w-full h-[40px] text-[15px] leading-[15px] border rounded-r ${
                      errors.topic ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">Chủ đề bạn quan tâm</option>
                    <option value="Gửi góp ý">Gửi góp ý</option>
                    <option value="Gửi câu hỏi">Gửi câu hỏi</option>
                  </select>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="topic"
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
              <div className="mb-4">
                <div className="flex items-center rounded overflow-hidden">
                  <span className="px-[12px] py-[6px] text-[18px] bg-slate-200 border border-[#cccccc] ">
                    <FontAwesomeIcon icon={faNewspaper} />
                  </span>
                  <div className="w-full relative">
                    <input
                      type="text"
                      className={`block focus:outline-none w-full pl-1 h-[40px] text-[15px] leading-[15px] rounded-r border border-[#cccccc] ${
                        errors.title ? "border-red-500 border-[1px]" : ""
                      }`}
                      {...register("title", {
                        required: "Không được bỏ trống trường này",
                        minLength: {
                          value: 10,
                          message: `Vui lòng nhập ít nhất 10 ký tự`,
                        },
                      })}
                      placeholder="Tiêu đề"
                    />
                    <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
                      *
                    </span>
                  </div>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="title"
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
              <div className="mb-4">
                <div className="flex items-center rounded overflow-hidden">
                  <span className="px-[13px] py-[6px] text-[18px] bg-slate-200 border-[1px] border-[#cccccc] ">
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                  <div className="w-full relative">
                    <input
                      type="text"
                      className={`block focus:outline-none pl-1 w-full h-[40px] text-[15px] leading-[15px] border border-[#cccccc] ${
                        auth && auth.userID && auth.userID.HoVaTen !== null
                          ? "bg-gray-200 cursor-not-allowed"
                          : ""
                      } ${
                        errors.username ? "border-red-500 border-[1px]" : ""
                      }`}
                      {...register("username", {
                        required:
                          auth && auth.userID && auth.userID.HoVaTen
                            ? false
                            : "Không được bỏ trống trường này",
                        minLength: {
                          value: auth.userID ? 0 : 10,
                          message: auth.userID
                            ? ""
                            : "Vui lòng nhập ít nhất 10 ký tự",
                        },
                      })}
                      placeholder="Họ và tên"
                      defaultValue={
                        // (auth && currentUser.displayName) ||
                        auth && auth.userID && auth.userID.HoVaTen !== null
                          ? auth?.userID.HoVaTen
                          : ""
                      }
                      disabled={auth && auth?.userID?.HoVaTen ? true : false}
                    />
                    <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
                      *
                    </span>
                  </div>

                  {/* <button
                      type="button"
                      onClick={() => setOpen(!open)}
                      className="px-[12px] py-[6px] text-[18px] bg-slate-200 border-[1px] border-[#cccccc] "
                    >
                      <BiLogIn />
                    </button> */}

                  {currentUser ? (
                    ""
                  ) : (
                    <button
                      type="button"
                      onClick={() => setOpen(true)}
                      className="px-[12px] py-[6px] text-[18px] bg-slate-200 border-[1px] border-[#cccccc] "
                    >
                      <FontAwesomeIcon icon={faRightToBracket} />
                    </button>
                  )}
                </div>
                <ErrorMessage
                  errors={errors}
                  name="username"
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
              <div className="mb-4">
                <div className="flex items-center rounded overflow-hidden">
                  <span className="px-[12px] py-[6px] text-[18px] bg-slate-200 border-[1px] border-[#cccccc] ">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <div className="w-full relative">
                    <input
                      type="text"
                      className={`block focus:outline-none pl-1 w-full h-[40px] text-[15px] leading-[15px] border border-[#cccccc] ${
                        errors.email ? "border-red-500 border-[1px]" : ""
                      }`}
                      {...register("email", {
                        required:
                          auth && auth.userID && auth.userID.Email
                            ? false
                            : "Không được bỏ trống trường này",
                        pattern: {
                          value:
                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message:
                            auth && auth.userID && auth.userID.Email
                              ? false
                              : `Vui lòng nhập đúng email VD: 'ten123@gmail.com'`,
                        },
                      })}
                      placeholder="Email"
                      defaultValue={
                        auth && auth.userID ? auth.userID.Email : ""
                      }
                      //disabled={currentUser ? true : false}
                    />
                    <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
                      *
                    </span>
                  </div>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ messages }) => {
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
              <div className="mb-4">
                <div className="flex items-center rounded overflow-hidden">
                  <span className="px-[12px] py-[6px] text-[18px] bg-slate-200 border-[1px] border-[#cccccc] ">
                    <FontAwesomeIcon icon={faPhone} />
                  </span>
                  <div className="w-full relative">
                    <input
                      type="text"
                      className={`block focus:outline-none w-full pl-1 h-[40px] text-[15px] leading-[15px] border border-[#cccccc] ${
                        errors.phone_number ? "border-red-500 border-[1px]" : ""
                      }`}
                      {...register("phone_number", {
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
                      defaultValue={auth && auth.userID ? auth.userID.SĐT : ""}
                    />
                    <span className=" text-red-600 text-[18px] absolute top-[50%] right-[10px] translate-y-[-30%]">
                      *
                    </span>
                  </div>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="phone_number"
                  render={({ messages }) => {
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
              <div className="mb-4">
                <div className="flex items-center rounded overflow-hidden">
                  <span className="px-[14px] py-[6px] text-[18px] bg-slate-200 border-[1px] border-[#cccccc] ">
                    <FontAwesomeIcon icon={faLocationDot} />
                  </span>
                  <input
                    type="text"
                    className={`block focus:outline-none w-full h-[40px] text-[15px] pl-1 leading-[15px] border border-[#cccccc] ${
                      errors.address ? "border-red-500 border-[1px]" : ""
                    }`}
                    {...register("address")}
                    placeholder="Địa chỉ"
                  />
                </div>
                <ErrorMessage
                  errors={errors}
                  name="address"
                  render={({ messages }) => {
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
              <div className="mb-4">
                <div className=" relative">
                  <textarea
                    name=""
                    id=""
                    className="w-full rounded text-sm border p-1 text-[15px]"
                    cols="10"
                    rows="2"
                    placeholder="Nội dung"
                    {...register("content", {
                      required: "Không được bỏ trống trường này",
                      minLength: {
                        value: 30,
                        message: `Vui lòng nhập ít nhất 30 ký tự`,
                      },
                    })}
                  ></textarea>
                  <span className=" text-red-600 text-[18px] absolute top-[20%] right-[10px] translate-y-[-30%]">
                    *
                  </span>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="content"
                  render={({ messages }) => {
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
              <div className="mb-4">
                <div className="flex items-center">
                  <div className="wrapper bg-gray-700 text-white px-3 py-2">
                    <h2 className="title">{captcha}</h2>
                  </div>
                  <button type="button" className="ml-3" onClick={resetCaptcha}>
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
              <div className="text-center">
                <button
                  type="button"
                  onClick={onReset}
                  className="text-white dark:text-white dark:hover:text-black border-[1px] border-solid border-[#ccc] px-3 py-2 text-[15px] rounded-xl mr-2 hover:bg-red-500"
                >
                  Nhập lại
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 px-3 py-2 text-white text-[15px] rounded-xl hover:bg-blue-700"
                >
                  Gửi đi
                </button>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Contact;
