import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
const override = {
    margin: "0 auto",
    borderColor: "hsl(12,88%,69%)",
  };

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
    <ClipLoader color="#ffffff" loading={true} cssOverride={override} size={50} />
    </div>
  );
};

export default LoadingSpinner;
