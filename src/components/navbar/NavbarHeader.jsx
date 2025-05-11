import React from "react";
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
const NavbarHeader = () => {
  return (
    <div className="flex gap-x-4 items-center justify-between w-full px-2 py-4 text-white">
      <div className="flex px-2 w-[100px] shrink-0 max-lg:justify-center max-[350px]:w-[70px] ">
        <img
          src="logo.png"
          className="w-full cursor-pointer object-cover"
          alt="logo"
        />
      </div>
        <div className="flex items-center gap-x-4">
           <input type="text" placeholder="Tìm kiếm" className="bg-color-input-gray  pl-4 py-1 outline-none rounded-lg text-white"/>
           <CiHeart className="text-3xl"/>
        </div>

    </div>
  );
};

export default NavbarHeader;
