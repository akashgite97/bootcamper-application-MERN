import React from "react";
import LoadingSpinner from "../LoadingSpinner";

const Button = ({onClick, className, name, isLoading}) => {
console.log("name",name)
  return (
    <div>
      <button
        className={`w-full p-2 bg-brightRed text-white hover:bg-brightRedLight flex items-center justify-center ${className} `}
        onClick={onClick}
      >
        {name}
        {isLoading && <LoadingSpinner color='white' />}
      </button>
    </div>
  );
};

export default Button;
