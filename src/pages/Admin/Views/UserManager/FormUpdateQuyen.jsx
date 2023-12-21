import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";

import useAuth from "../../../../hooks/redux/auth/useAuth";
import socket from "../../../../socketService";

const DOMAIN = process.env.REACT_APP_STOCK;

const FormUpdateQuyen = ({ user, setOpen, fetchData }) => {
  const { auth } = useAuth();
  const { handleSubmit, setValue } = useForm();
  const [nhomQuyen, setNhomQuyen] = useState([]);
  //   console.log("idUser", user);
  const fetchDataDSQuyen = async () => {
    try {
      const response = await axios.get(`${DOMAIN}/nhomquyen?search=${""}`, {
        withCredentials: true,
      });
      setNhomQuyen(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchDataDSQuyen();
  }, []);

  const formattedNhomQuyen = nhomQuyen.map((item) => ({
    value: item.RoleGroupID,
    label: item.TenNhomQuyen,
  }));

  const hanleChangeQuyen = (event) => {
    setValue("RoleGroupID", event.value);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `${DOMAIN}/users/edit-quyen/${user.id}`,
        data
      );
      console.log("success", response);
      toast.success("Phân quyền thành công");
      socket.emit("replyPost", {
        user: auth.userID,
        post: null,
        message: `Quản trị viên đã phân quyền cho bạn thành ${response.data.RoleGroupID?.TenNhomQuyen}`,
        recipientId: user?.id,
        link: null,
      });
      fetchData();
      setOpen(false);
    } catch (error) {
      console.log("error", error.message);
    }
  };
  return (
    <form action="" className="h-full" onSubmit={handleSubmit(onSubmit)}>
      <div className=" min-h-[200px] overflow-y-auto">
        <label
          for="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Chọn quyền
        </label>
        <Select
          options={formattedNhomQuyen}
          minMenuHeight={300}
          onChange={(e) => hanleChangeQuyen(e)}
          defaultInputValue={user?.RoleGroupID?.TenNhomQuyen}
          placeholder="--Chọn quyền--"
        />
      </div>
      <button
        type="submit"
        class="text-white bg-blue-700 mt-4 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Lưu
      </button>
    </form>
  );
};

export default FormUpdateQuyen;
