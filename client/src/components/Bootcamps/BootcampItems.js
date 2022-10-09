import React from "react";
import { useNavigate } from "react-router-dom";

const BootcampItems = ({bootcamp, isBootcampView}) => {
  const navigate = useNavigate()
  
  const navigateToBootcamp =()=>navigate(`/bootcampDetail/${bootcamp._id}`)

  return (
      <div onClick={navigateToBootcamp} className={`mt-4 h-44 rounded overflow-hidden shadow-lg border border-gray mr-8 cursor-pointer ${isBootcampView === "grid" ?' w-full h-full m-7 md:w-1/3 md:h-1/6  ' :''}`}>
        <div className={isBootcampView === "grid" ?"flex flex-col space-x-4 w-full" :'flex  space-x-10'}>
          <img
            src="https://demo.auburnforest.com/html/bootcamp/bootcamp/images/resource/course-18.jpg"
            alt="bootcamp_image"
            className={isBootcampView === "grid" ? 'h-44' : "w-52  h-44"}
          />
          <div className="flex flex-col space-y-3 justify-center">
            <h2 className={`font-bold text-brightRed text-lg text-left ${isBootcampView === "grid" ? 'mt-4':''}`}>{bootcamp?.name}</h2>
            <span
              className="bg-black text-white text-xs font-semibold mr-2
                             px-2.5 py-0.5 rounded w-max"
            >
            {bootcamp?.location?.city}, {bootcamp?.location?.country}
            </span>
            <p className="text-left">{bootcamp?.description}</p>
          </div>
          <div className="p-3">
            <span
              className="bg-darkBlue text-white text-xs font-semibold mr-2
                             px-2.5 py-0.5 rounded w-max "
            >
              4.5
            </span>
          </div>
        </div>
      </div>
  
  );
};

export default BootcampItems;
