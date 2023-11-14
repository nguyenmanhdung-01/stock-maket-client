import React from "react";

const Button = ({ title, className, onClick, icon, type, classNameBtn }) => {
  //console.log(click);
  return (
    <div
      className={` rounded-lg inline-flex items-center px-3 mr-2 py-2 ${className}`}
      onClick={onClick}
    >
      <span>{icon}</span>
      <button
        type={type}
        className={` focus:outline-none text-center ${classNameBtn}`}
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
