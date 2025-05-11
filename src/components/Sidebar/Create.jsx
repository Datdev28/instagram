import React from "react";
import { MdOutlineAddComment } from "react-icons/md";

const Create = () => {
  return (
    <div>
        <div className="flex items-center max-lg:justify-between gap-5 cursor-pointer hover:bg-color-dash duration-200 rounded-sm py-2 px-2">
          <MdOutlineAddComment className="text-3xl" />
          <p className={`max-lg:hidden`}>Tạo</p>
        </div>
    </div>
  );
};

export default Create;
