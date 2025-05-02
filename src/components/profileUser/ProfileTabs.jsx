import React, { useState } from "react";
import { MdOutlinePadding } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa6";
import { LiaUserTagSolid } from "react-icons/lia";
const ProfileTabs = () => {
  const [pickCategory, setPickCategory] = useState(1);
  return (
    <div className="flex w-full flex-col items-center text-md font-semibold">
      <hr className="border-color-dash w-full" />
      <div>
        <div className="flex gap-x-10 max-md:gap-x-0 items-center w-full">
          <div
            className={` ${
              pickCategory === 1
                ? "border-t-1 border-t-amber-50 text-white max-md:text-blue-500 "
                : "text-color-text-gray"
            } flex max-md:text-2xl  gap-x-2 items-center justify-center px-2 max-md:w-full max-md:px-10 cursor-pointer py-2`}
            onClick={() => {
              setPickCategory(1);
            }}
          >
            <MdOutlinePadding />
            <p className="max-md:hidden">BÀI VIẾT</p>
          </div>
          <div
            className={` ${
              pickCategory === 2
                ? "border-t-1 border-t-amber-50 text-white max-md:text-blue-500 "
                : "text-color-text-gray"
            } flex max-md:text-2xl gap-x-2 items-center justify-center px-2 max-md:w-full max-md:px-10 cursor-pointer py-2`}
            onClick={() => {
              setPickCategory(2);
            }}
          >
            <FaRegBookmark />
            <p className="max-md:hidden">ĐÃ LƯU</p>
          </div>
          <div
            className={` ${
              pickCategory === 3
                ? "border-t-1 border-t-amber-50 text-white max-md:text-blue-500 "
                : "text-color-text-gray"
            } flex max-md:text-2xl gap-x-2 items-center justify-center px-2 max-md:w-full max-md:px-10 cursor-pointer py-2`}
            onClick={() => {
              setPickCategory(3);
            }}
          >
            <LiaUserTagSolid />
            <p className="max-md:hidden">ĐƯỢC GẮN THẺ</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileTabs;
