import React from "react";

const BootcampItems = ({bootcamp}) => {
  return (
    <div className="mt-4 flex  justify-center h-44">
      <div class="w-full rounded overflow-hidden shadow-lg border border-gray mr-8 ">
        <div className="flex space-x-10">
          <img
            src="https://demo.auburnforest.com/html/bootcamp/bootcamp/images/resource/course-18.jpg"
            alt="bootcamp_image"
            className="w-52  h-44"
          />
          <div className="flex flex-col space-y-3 justify-center">
            <h2 className="font-bold text-brightRed text-lg text-left">{bootcamp?.name}</h2>
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
    </div>
  );
};

export default BootcampItems;
