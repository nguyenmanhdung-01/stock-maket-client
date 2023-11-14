import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LayoutDefault = ({ children }) => {
  const animatedComponents = makeAnimated();
  const navigate = useNavigate();

  const handleChangeLink = (e) => {
    navigate(e.value);
  };
  return (
    <div className=" relative bg-white dark:bg-rgba rounded-sm bg-login">
      <Header />
      <main className=" max-w-[1090px] m-auto px-3 py-3 mt-3 rounded-lg  border-x border-x-slate-400 shadow-3xl">
        {/* <div className="grid grid-cols-7 my-3">
          <Select
            className="col-span-2"
            closeMenuOnSelect={true}
            components={animatedComponents}
            // defaultValue={[colourOptions[4], colourOptions[5]]}
            // isMulti
            options={options}
            placeholder="Thay đổi dạng biểu đồ"
            onChange={(e) => handleChangeLink(e)}
            // styles={{
            //   control: (baseStyles, state) => ({
            //     ...baseStyles,
            //     borderColor: state.isFocused ? "grey" : "red",
            //     width: "300px",
            //   }),
            // }}
          />
        </div> */}
        {children}

        <Outlet />
      </main>
      <div
        onClick={() => {
          navigate("/admin/default", { replace: true });
          window.location.reload();
        }}
        className=" fixed left-1 top-[50%] bg-yellow-400 px-3 py-2 text-white text-xl shadow-lg border border-white rounded-r-lg hover:bg-yellow-600 cursor-pointer"
      >
        <FontAwesomeIcon icon={faScrewdriverWrench} className=" mr-2" />
        Trang quản trị
      </div>
      <ToastContainer />
    </div>
  );
};

export default LayoutDefault;
