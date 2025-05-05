import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineAddComment } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
const Sidebar = () => {
  const user = useAuthStore(state => state.user) 
  const sideBarItems = [
    {
      icon: <MdHomeFilled className="text-3xl" />,
      text: "Trang chủ",
      link: "/"
    },
    {
      icon: <CiSearch className="text-3xl" />,
      text: "Tìm kiếm",
    },
    {
      icon: <IoMdHeartEmpty className="text-3xl" />,
      text: "Thống báo",
    },
    {
      icon: <MdOutlineAddComment className="text-3xl" />,
      text: "Tạo",
    },
    {
      icon: (
        <img
          src={`${user?.profilePicURL}`}
          alt="avatar"
          className="w-[2rem] h-[2rem] rounded-full object-cover "
        />
      ),
      link: user?.userName,
      text: "Trang cá nhân",
    },
  ];
  return (
    <div className="flex text-white flex-col break-words pl-3 max-lg:pl-0 fixed select-none">
      <div className="flex pb-12 px-2 max-lg:justify-center">
        <img src="logo.png" className="w-[120px] cursor-pointer max-lg:hidden" alt="logo"/>
        <FaInstagram className="text-3xl lg:hidden cursor-pointer"/>
      </div>
      <div className="flex flex-col gap-y-5 max-lg:items-center">
        {sideBarItems.map((item, index) => (
          <Link to={item.link || null}>
          <div className="flex items-center max-lg:justify-between gap-5 cursor-pointer hover:bg-color-dash duration-200 rounded-sm py-2 px-2"
           key={index}
          >
            {item.icon}
            <p className={`${index === 0 ? "font-bold" : ""} max-lg:hidden`}>{item.text}</p>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
