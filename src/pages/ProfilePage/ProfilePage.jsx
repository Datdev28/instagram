import React from "react";
import ProfileUserHeader from "../../components/profileUser/ProfileUserHeader";
import ProfileTabs from "../../components/profileUser/ProfileTabs";
import ProfileUserPosts from "../../components/profileUser/ProfileUserPosts";
const ProfilePage = () => {
  return (
    <div className="text-white flex flex-col w-full items-center pt-16 overflow-y-auto">
      <div className="flex  w-full flex-col items-center">
        <ProfileUserHeader />
      </div>
      <div className="flex w-full max-w-4xl flex-col">
      <ProfileTabs/>
      </div>
      <div className="w-full max-w-4xl flex justify-center">
        <ProfileUserPosts/>
      </div>
    </div>
  );
};

export default ProfilePage;
