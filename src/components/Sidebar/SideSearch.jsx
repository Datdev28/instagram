import React from "react";
import { TiDelete } from "react-icons/ti";
const SideSearch = () => {
  return (
    <div className="flex flex-col pl-4 text-white w-full gap-y-5">
      <p className="text-2xl font-bold px-4">Tìm kiếm</p>
      <div className="relative w-full px-4 ">
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="pl-4 h-9 w-full rounded-md outline-none placeholder:text-color-text-gray bg-color-note"
        />
        <TiDelete className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-xl cursor-pointer"/>
      </div>
      <hr className="border-color-dash border-1"/>
    </div>
  );
};

export default SideSearch;
