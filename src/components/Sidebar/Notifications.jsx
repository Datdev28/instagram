import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import searchToggleStore from "../../store/searchToggleStore";

const Notifications = () => {
  const { isOpenToggle } = searchToggleStore();
  return (
    <div className="flex items-center max-lg:justify-between gap-5 cursor-pointer hover:bg-color-dash duration-200 rounded-sm py-2 px-2">
      <IoMdHeartEmpty className="text-3xl" />
      {!isOpenToggle && <p className={`max-lg:hidden`}>Thông báo</p>}
    </div>
  );
};

export default Notifications;
