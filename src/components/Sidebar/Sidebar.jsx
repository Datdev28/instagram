import React from "react";
import { FaInstagram } from "react-icons/fa";
import SidebarItems from "./SidebarItems";
const Sidebar = () => {
  return (
    <div className="flex text-white flex-col break-words pl-3 max-lg:pl-0 fixed select-none">
      <div className="flex pb-12 px-2 max-lg:justify-center">
        <img src="logo.png" className="w-[120px] cursor-pointer max-lg:hidden" alt="logo"/>
        <FaInstagram className="text-3xl lg:hidden cursor-pointer"/>
      </div>
        <SidebarItems/>
    </div>
  );
};

export default Sidebar;
