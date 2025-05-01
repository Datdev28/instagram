import React from "react";
import ProfileUserHeader from "../../components/profileUser/ProfileUserHeader";
import ProfileTabs from "../../components/profileUser/ProfileTabs";
const ProfilePage = () => {
  return (
    <div className="text-white flex w-full justify-center pt-16">
      <div className="flex w-full max-w-4xl border border-red-300">
        <ProfileUserHeader />
        <ProfileTabs/>
        <ProfileTabs/>
      </div>
    </div>
  );
};

export default ProfilePage;
