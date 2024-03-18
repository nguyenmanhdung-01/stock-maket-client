import React, { useState } from "react";
import { useForm } from "react-hook-form";
import bcrypt from "bcryptjs";
import { toast } from "react-toastify";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import useAuth from "../../../hooks/redux/auth/useAuth";
const DOMAIN = process.env.REACT_APP_STOCK;

const ChangePassword = ({ dataUser, setOpen }) => {
  const { auth } = useAuth();
  console.log("change password", auth);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const resetFields = () => {
    reset();
  };
  const [confirmPassword, setConfirmPassword] = useState("");
  const [seePassOld, setSeePassOld] = useState(false);
  const [seePassNew, setSeePassNew] = useState(false);
  const [seePassConfirm, setSeePassConfirm] = useState(false);

  const handleInputChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  const onChangeSubmit = async (data) => {
    const passwordOld = data.passwordOld;
    bcrypt.compare(passwordOld, dataUser.MatKhau, async (err, result) => {
      if (err) {
        console.error(err);
        return;
      }

      if (result) {
        let passConfirm = data.confirmPassword;
        let passNew = data.passwordNew;

        if (passConfirm !== passNew) {
          toast.error("Mật khẩu nhập lại không khớp. Vui lòng nhập lại");

          setConfirmPassword("");
          return false;
        }
        if (passConfirm && passNew) {
          setConfirmPassword(passConfirm);
          try {
            const response = await axios.put(
              `${DOMAIN}/users/editPassword`,
              {
                passwordNew: confirmPassword,
              },
              {
                headers: {
                  Authorization: "Bearer " + auth?.accessToken,
                },
              }
            );
            // console.log(response);
            setConfirmPassword("");
            setOpen(false);
            // const pass = response.data.;
            // console.log(pass);
            // const values = { ...currentUser, password: pass };
            // // console.log(values);
            // localStorage.setItem("user", JSON.stringify(values));
            toast.success("Bạn đã thay đổi mật khẩu thành công");
            reset();
          } catch (error) {
            console.log(error.message);
          }
          reset(watch(passConfirm));
        }
      } else {
        toast.error("Mật khẩu cũ của bạn chưa chính xác");
        reset({ passwordOld: "" });
      }
    });
  };
  return (
    <div className="w-[500px] m-auto">
      <form onSubmit={handleSubmit(onChangeSubmit)}>
        <div className="flex items-center relative justify-center">
          <p className=" w-[100px] mr-2 text-[14px]">Mật khẩu cũ</p>
          <input
            type={seePassOld ? "text" : "password"}
            {...register("passwordOld", {
              required:
                "Chú ý: Bạn cần khai báo tất cả các ô có đánh dấu hoa thị (*)",
            })}
            className={` w-[50%] outline-none h-full px-3 py-2 mt-2 my-2 text-[13px] border-[1px] border-[#ccc] rounded-md shadow-lg`}
            // defaultValue={currentUser ? currentUser.displayName : ""}
          />
          <span
            className="absolute top-[50%] right-[18%] translate-y-[-35%]"
            onClick={() => setSeePassOld(!seePassOld)}
          >
            {seePassOld ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
          <span className=" text-red-600 text-[18px] absolute top-[50%] right-[15%] translate-y-[-35%]">
            *
          </span>
          {errors.passwordOld && (
            <span className=" absolute z-20 px-2 py-1 rounded bg-red-500 top-[50px] desktop:right-[170px] latop:right-[170px] tablet:right-[170px] phone:right-0 text-white text-[12px] after:content after:absolute after:border-l-[10px] after:border-r-[10px] after:border-transparent after:block after:border-b-[10px] after:border-solid after:border-b-red-500 after:top-[-10px] after:left-[40%] transition-all ease-in-out delay-[1000ms] duration-[3000ms]">
              {errors.passwordOld.message}
            </span>
          )}
        </div>
        <div className="flex items-center relative justify-center">
          <p className=" mr-2 text-[14px] w-[100px]">Mật khẩu mới</p>
          <input
            type={seePassNew ? "text" : "password"}
            {...register("passwordNew", {
              required:
                "Chú ý: Bạn cần khai báo tất cả các ô có đánh dấu hoa thị (*)",
            })}
            className={` w-[50%] outline-none h-full px-3 py-2 mt-2 my-2 text-[13px] border-[1px] border-[#ccc] rounded-md shadow-lg`}
            // defaultValue={currentUser ? currentUser.displayName : ""}
          />
          <span
            className="absolute top-[50%] right-[18%] translate-y-[-35%]"
            onClick={() => setSeePassNew(!seePassNew)}
          >
            {seePassNew ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
          <span className=" text-red-600 text-[18px] absolute top-[50%] right-[15%] translate-y-[-35%]">
            *
          </span>
          {errors.passwordNew && (
            <span className=" absolute z-20 px-2 py-1 rounded bg-red-500 top-[50px] desktop:right-[170px] latop:right-[170px] tablet:right-[170px] phone:right-0 text-white text-[12px] after:content after:absolute after:border-l-[10px] after:border-r-[10px] after:border-transparent after:block after:border-b-[10px] after:border-solid after:border-b-red-500 after:top-[-10px] after:left-[40%] transition-all ease-in-out delay-[1000ms] duration-[3000ms]">
              {errors.passwordNew.message}
            </span>
          )}
        </div>
        <div className="flex items-center relative justify-center">
          <p className=" mr-2 text-[14px] w-[100px]">Nhập lại mật khẩu mới</p>

          <input
            type={seePassConfirm ? "text" : "password"}
            {...register("confirmPassword", {
              required:
                "Chú ý: Bạn cần khai báo tất cả các ô có đánh dấu hoa thị (*)",
            })}
            value={confirmPassword}
            onChange={handleInputChange}
            className={` w-[50%] outline-none h-full px-3 py-2 mt-2 my-2 text-[13px] border-[1px] border-[#ccc] rounded-md shadow-lg`}
            // defaultValue={currentUser ? currentUser.displayName : ""}
          />
          <span
            className="absolute top-[50%] right-[18%] translate-y-[-35%]"
            onClick={() => setSeePassConfirm(!seePassConfirm)}
          >
            {seePassConfirm ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
          <span className=" text-red-600 text-[18px] absolute top-[50%] right-[15%] translate-y-[-35%]">
            *
          </span>
          {errors.confirmPassword && (
            <span className=" absolute px-2 py-1 rounded bg-red-500 top-[50px] desktop:right-[170px] latop:right-[170px] tablet:right-[170px] phone:right-0 text-white text-[12px] after:content after:absolute after:border-l-[10px] after:border-r-[10px] after:border-transparent after:block after:border-b-[10px] after:border-solid after:border-b-red-500 after:top-[-10px] after:left-[40%] transition-all ease-in-out delay-[1000ms] duration-[3000ms]">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <div className="text-center text-[13px] mt-3 w-[72%]">
          <button
            className="bg-gray-50 p-2 mr-4 rounded-lg"
            type="button"
            onClick={resetFields}
          >
            Thiết lập lại
          </button>
          <button
            className="bg-[#428bca] p-2 rounded-lg text-white"
            type="submit"
          >
            Chấp nhận
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
