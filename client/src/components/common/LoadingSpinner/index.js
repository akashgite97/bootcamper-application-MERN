import React from "react";
import  Spinner from "react-spinkit";

const LoadingSpinner = ({ isLoading, color }) => {
  return (
    <div className="flex items-center justify-center">
     <Spinner name="circle" color={color || 'hsl(12,88%,59%)'} />
    </div>
  );
};

export default LoadingSpinner;
