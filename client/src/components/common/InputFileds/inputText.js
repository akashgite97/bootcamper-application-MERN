import React from "react";

const InputTextField = ({ type, name, value, placeholder, onChange }) => {
  const inputConfig = {
    type: type,
    name: name,
    value: value,
    placeholder: placeholder,
    className: "w-full bg-white outline-none p-2 border-gray border focus-none",
    onChange: onChange,
  };

  return (
    <div className="">
      <input {...inputConfig} />
    </div>
  );
};

export default InputTextField;
