import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const options = [
  {
    label: "Biểu đồ nến",
    value: "/bieudonen",
  },
  {
    label: "Biểu đồ OHLC",
    value: "/bieudoOHLC",
  },
  {
    label: "Biểu đồ cột",
    value: "/bieudocot",
  },
  {
    label: "Biểu đồ phạm vi cột",
    value: "/bieudophamvicot",
  },
  {
    label: "Biểu đồ thanh",
    value: "/bieudothanh",
  },
  {
    label: "Biểu đồ vùng",
    value: "/bieudovung",
  },
  {
    label: "Biểu đồ đường",
    value: "/",
  },
];
const LayoutDefault = ({ children }) => {
  const animatedComponents = makeAnimated();
  const navigate = useNavigate();

  const handleChangeLink = (e) => {
    navigate(e.value);
  };
  return (
    <div className=" relative bg-white dark:bg-rgba rounded-sm h-full bg-login">
      <Header />
      <main className=" max-w-[1090px] m-auto px-3 pt-3 mt-3 rounded-lg  border-x border-x-slate-400 shadow-3xl">
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
    </div>
  );
};

export default LayoutDefault;
