import React from "react";
import { MdOutlineAddComment } from "react-icons/md";
import searchToggleStore from "../../store/searchToggleStore";

const Create = () => {
  const { isOpenToggle } = searchToggleStore();
  return (
    <div className="flex relative max-lg:justify-between gap-5 cursor-pointer hover:bg-color-dash duration-200 rounded-sm py-2 px-2">
      <MdOutlineAddComment className="text-3xl " />
      {!isOpenToggle && <p className={`max-lg:hidden`}>Tạo</p>}
    </div>
  );
};

export default Create;
