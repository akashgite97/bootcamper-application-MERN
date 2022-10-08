import React from "react";
import Select from 'react-select'
import { dateFilterOptions } from "../../constants";

const BootcampFilter = () => {
  return (
    <div className="p-4">
      <div class="rounded overflow-hidden shadow-lg p-2 mt-4 ">
        <h2 className="text-left text-lg font-semibold">By Location</h2>
        <div className="flex items-center space-x-6 my-2 ">
          <input
            type="text"
            name="milesFrom"
            placeholder="Miles From"
            value=""
            className="w-1/2 outline-none p-1 border-gray border focus-none"
          />
          <input
            type="text"
            name="zipCode"
            placeholder="Enter Zipcode"
            value=""
            className="w-1/2 outline-none p-1 border-gray border focus-none"
          />
        </div>
        <button className="w-full p-2 bg-brightRed text-white hover:bg-brightRedLight mt-2 mb-2 ">
          Find Bootcamps
        </button>
      </div>
      <div class="rounded overflow-hidden shadow-lg p-2  mt-4 ">
        <h2 className="text-left text-lg font-semibold">Filter By</h2>
        <div className="flex flex-col my-2 space-y-4 ">
        <Select />
          <Select options={dateFilterOptions}  />
        </div>
        <button className="w-full p-2 bg-brightRed text-white hover:bg-brightRedLight mt-2 mb-2 ">
          Find Bootcamps
        </button>
      </div>
    </div>
  );
};

export default BootcampFilter;
