import React from "react";
import { Link } from "react-router-dom";
import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authStore";
const SuggestedUser = ({user}) => {
  const userAuth = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);
  const {isFollowing, handleFollowUser} = useFollowUser(user.uid);
  const handleClickFollow = async() => {
     await handleFollowUser();
     setUser({...userAuth, following: [...userAuth.following, user.uid]});
  }
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <Link to={`/${user.userName}`}>
        <img
          src={user.profilePicURL || "/defaultProfilePic.jpg"}
          className="w-[2.8rem] h-[2.8rem] rounded-full object-cover cursor-pointer"
          alt="avatar"
        />
        </Link>
        <div className="flex flex-col justify-center">
        <Link to={`/${user.userName}`}>
          <p className="cursor-pointer">{user.userName}</p>
        </Link>
          <p className="text-color-text-gray">Gợi ý cho bạn</p>
        </div>
      </div>
      <span className={`${isFollowing ? "text-color-text-gray font-semibold" : "text-blue-500"} cursor-pointer text-xs hover:text-white whitespace-nowrap`} onClick={handleClickFollow}>{isFollowing ? "Đang theo dõi" : "Theo dõi"}</span>
    </div>
  );
};

export default SuggestedUser;
