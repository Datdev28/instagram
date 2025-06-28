import React from "react";
import Home from "./Home";
import Search from "./Search";
import Notifications from "./Notifications";
import Create from "./Create";
import Profile from "./Profile";
import MessChat from "./MessChat";
import ReportManager from "./ReportManager";
import Explore from "./Explore";
import useAuthStore from "../../store/authStore";
const SidebarItems = () => {
  const user = useAuthStore((state) => state.user);
  const admin = user?.userName === "mickey";
  return (
    <div className="flex flex-col gap-y-5 max-lg:items-center">
      <Home />
      <Search />
      <Explore/>
      <MessChat />
      <Notifications />
      <Create />
      {admin && <ReportManager />}
      <Profile />
    </div>
  );
};

export default SidebarItems;
