import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { Link } from "react-router-dom";
import searchToggleStore from "../../store/searchToggleStore";
import userProfileStore from "../../store/userProfileStore";
const Home = () => {
  const {setUserProfile} = userProfileStore();
  const { isOpenToggle, setIsOpenToggle } = searchToggleStore();
  const handleClick = () => {
    window.scrollTo({ top: 0 });
    setUserProfile(null);
    setIsOpenToggle(false);
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
