import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <Link to="/">
        <div
          className="flex items-center max-lg:justify-between gap-5 cursor-pointer hover:bg-color-dash duration-200 rounded-sm py-2 px-2"
        >
          <MdHomeFilled className="text-3xl"/>
          <p className={`max-lg:hidden`}>
            Trang chủ
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Home;
