import React from "react";
import useLogOut from "../../hooks/useLogOut";
import useAuthStore from "../../store/authStore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
const SuggestedHeader = () => {
  const {handleLogOut} = useLogOut()
  const [userAuth] = useAuthState(auth);
  const {user} = useAuthStore();
  return (
    userAuth &&  user && (
      <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-x-2">
        <img
          src={user?.profilePicURL || "defaultProfilePic.jpg"}
          className="w-[2.8rem] h-[2.8rem] rounded-full object-cover"
          alt="avatar"
        />
        <div className="flex flex-col justify-center">
          <p>{user.userName}</p>
          <p className="text-color-text-gray">{user.fullName}</p>
        </div>
      </div>
      <button className="text-blue-400 text-xs cursor-pointer" onClick={handleLogOut}>Đăng xuất</button>
    </div>
    )
  );
};

export default SuggestedHeader;
