import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import searchToggleStore from "../../store/searchToggleStore";

const Home = () => {
  const { isOpenToggle } = searchToggleStore();
  const { pathname } = useLocation();

  const handleClick = (e) => {
    if (pathname === "/") {
      e.preventDefault();
      window.location.reload();
    }
  };

  return (
    <Link to="/" onClick={handleClick}>
      <div className="flex items-center max-lg:justify-between rounded-sm gap-5 cursor-pointer hover:bg-color-dash duration-200 py-2 px-2">
        <MdHomeFilled className="text-3xl" />
        {!isOpenToggle && <p className="max-lg:hidden">Trang chủ</p>}
      </div>
    </Link>
  );
};

export default Home;
