import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { dateFilterOptions } from "../../constants";
import { searchBootcampByLocation, updateBootcampState } from "../../redux/slice/bootcampSlice";
import Button from "../common/Button";

const BootcampFilter = () => {
  const dispatch = useDispatch();
  const { milesFrom, zipCode, ratings, budget, isLoading } = useSelector(
    (state) => state.bootcamps
  );

  const onChange = (event) => {
    const { name, value } = event.target;
    let inputValue = value.replace(/\D/g, "");
    switch (name) {
      case milesFrom:
      case zipCode:
        dispatch(updateBootcampState(name, inputValue));
        break;
      default:
        return dispatch(updateBootcampState(name, value));
    }
  };

  const handleBootcampSearch = ()=>{
    console.log("enter", milesFrom,zipCode)
    dispatch(searchBootcampByLocation({zipCode, milesFrom}))
  }

  return (
    <div className="p-4">
      <div class="rounded overflow-hidden shadow-lg p-2 mt-4 ">
        <h2 className="text-left text-lg font-semibold">By Location</h2>
        <div className="flex items-center space-x-6 my-2 ">
          <input
            type="text"
            name="milesFrom"
            placeholder="Miles From"
            className="w-1/2 outline-none p-1 border-gray border focus-none"
            onChange={(e) => onChange(e)}
            value={milesFrom}
          />
          <input
            type="text"
            name="zipCode"
            placeholder="Enter Zipcode"
            className="w-1/2 outline-none p-1 border-gray border focus-none"
            onChange={(e) => onChange(e)}
            value={zipCode}
          />
        </div>
        <Button onClick={handleBootcampSearch} name='Find Bootcamps' className='mt-2 mb-2' isLoading={isLoading}  />
      </div>
      <div class="rounded overflow-hidden shadow-lg p-2  mt-4 ">
        <h2 className="text-left text-lg font-semibold">Filter By</h2>
        <div className="flex flex-col my-2 space-y-4 ">
          <Select onChange={(e) => onChange(e)} />
          <Select
            options={dateFilterOptions}
            onChange={(e) => onChange(e)}
            name="budget"
            value={budget}
          />
        </div>
        <button className="w-full p-2 bg-brightRed text-white hover:bg-brightRedLight mt-2 mb-2">
          Find Bootcamps
        </button>
      </div>
    </div>
  );
};

export default BootcampFilter;
