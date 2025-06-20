import React from "react";
import { FaInstagram } from "react-icons/fa";
import SidebarItems from "./SidebarItems";
import searchToggleStore from "../../store/searchToggleStore";
import { Link } from "react-router-dom";
import userProfileStore from "../../store/userProfileStore";
const Sidebar = () => {
  const {setUserProfile} = userProfileStore();
  const { isOpenToggle, setIsOpenToggle } = searchToggleStore();
   const handleClick = () => {
    window.scrollTo({ top: 0 });
    setUserProfile(null);
    setIsOpenToggle(false);
  };
  return (
    <div className="flex fixed z-100 text-white flex-col break-words pl-3 max-lg:pl-0 select-none">
      <Link to="/" onClick={handleClick}>
        <div className="flex pb-12 px-2 max-lg:justify-center h-[80px]">
          {isOpenToggle ? (
            <FaInstagram className="text-3xl max-lg:hidden cursor-pointer" />
          ) : (
            <img
              src="/logo.png"
              className="w-[120px] cursor-pointer max-lg:hidden"
              alt="logo"
            />
          )}
          <FaInstagram className="text-3xl lg:hidden cursor-pointer" />
        </div>
      </Link>
      <SidebarItems />
    </div>
  );
};

export default Sidebar;
