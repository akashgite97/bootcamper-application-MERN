import React, { useEffect, useState } from "react";
import { BiGridAlt, BiListUl } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getBootcamps } from "../../redux/slice/bootcampSlice";
import Select from "react-select";
import { dateFilterOptions } from "../../constants";
import LoadingSpinner from "../common/LoadingSpinner";
const BootcampFilter = React.lazy(()=>import('./BootcampFilter'))
const BootcampItems = React.lazy(()=>import('./BootcampItems'))

const Bootcamps = () => {
  const [isBootcampView, setBootcampView] = useState("list");
  const dispatch = useDispatch();
  const { bootcampsList, milesFrom, zipCode, isLoading } = useSelector((state) => state.bootcamps);

  useEffect(() => {
    if(milesFrom.length===0 && zipCode.length===0){
      dispatch(getBootcamps());
    }
  }, [dispatch, milesFrom, zipCode]);

  return (
    <div className="flex flex-col md:justify-center mb-32 md:px-4 mt-20 md:flex-row">
      {isLoading && <LoadingSpinner />}
      <div className="space-y-6 md:w-7/12">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold ">Browse Bootcamps</h2>
          <div className="flex justify-end items-center space-x-4 mr-8 cursor-pointer">
            <BiGridAlt
              onClick={() => setBootcampView("grid")}
              size={32}
              className={`${
                isBootcampView === "grid"
                  ? "bg-brightRed text-white"
                  : "shadow-lg border border-gray"
              }`}
            />
            <BiListUl
              onClick={() => setBootcampView("list")}
              size={32}
              className={`${
                isBootcampView === "list"
                  ? "bg-brightRed text-white shadow-lg border border-gray"
                  : "shadow-lg border border-gray"
              }`}
            />
            <Select
              options={dateFilterOptions}
              defaultValue={dateFilterOptions[0]}
              className='selectCollrs'
            />
          </div>
        </div>
        <div className={isBootcampView === "grid" ?"flex flex flex-wrap " :''}>
        {bootcampsList?.data?.map((bootcamp) => (
          <BootcampItems bootcamp={bootcamp} isBootcampView={isBootcampView} />
        ))}
        </div>
      </div>
      <div className="rounded shadow-lg border border-gray m-4 md:m-0 md:p-2 md:w-3/12 h-2/4">
        <BootcampFilter />
      </div>
    </div>
  );
};

export default Bootcamps;
