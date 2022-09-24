import React, { useState } from "react";
import "./style.css";

const Home = () => {
  const [miles, setMiles] = useState();
  const [zipCode, setZipcode] = useState();

  const handleSubmit = () => {
    console.log(miles, zipCode);
    setMiles("");
    setZipcode("");
  };

  return (
    <div className="hero__section flex flex-col items-center justify-center bg-veryLightGray ">
      <div className="text-white">
        <h1 className="text-5xl">Find a code Bootcamp</h1>
        <p className="mt-2 text-lg text-center">
          Find,rate and read reviews on coding bootcamps
        </p>
      </div>
      <div className="mt-3 space-x-2 w-full flex items-center justify-center">
        <input
          type="text"
          name="mileFrom"
          value={miles}
          placeholder="Miles From"
          className="outline-none focus-none p-1 w-1/4 border border-gray"
          onChange={(e) => setMiles(e.target.value)}
        />
        <input
          type="text"
          name="zipcode"
          value={zipCode}
          placeholder="Enter Zipcode"
          className="outline-none focus-none p-1 w-1/4 border border-gray"
          onChange={(e) => setZipcode(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="mt-4 p-1 text-white bg-brightRed w-6/12 hover:bg-brightRedLight"
        onClick={handleSubmit}
      >
        Find Bootcamp
      </button>
    </div>
  );
};

export default Home;
