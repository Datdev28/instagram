import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";

const Notifications = () => {
  return (
    <div>
        <div className="flex items-center max-lg:justify-between gap-5 cursor-pointer hover:bg-color-dash duration-200 rounded-sm py-2 px-2">
          <IoMdHeartEmpty className="text-3xl" />
          <p className={`max-lg:hidden`}>Thông báo</p>
        </div>
    </div>
  );
};

export default Notifications;
