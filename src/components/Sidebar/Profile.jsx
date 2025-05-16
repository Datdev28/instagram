import React from "react";
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";
import searchToggleStore from "../../store/searchToggleStore";
const Profile = () => {
  const { user } = useAuthStore();
  const { isOpenToggle } = searchToggleStore();
  return (
    <Link to={user?.userName}>
      <div className="flex items-center max-lg:justify-between gap-5 cursor-pointer hover:bg-color-dash duration-200 rounded-sm py-2 px-2">
        <img
          src={user?.profilePicURL || "defaultProfilePic.jpg"}
          alt="avatar"
          className="w-[2rem] h-[2rem] rounded-full object-cover "
        />
        {!isOpenToggle && <p className={`max-lg:hidden`}>Trang cá nhân</p>}
      </div>
    </Link>
  );
};

export default Profile;
