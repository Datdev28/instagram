import React from "react";
import Home from "../Sidebar/Home";
import Search from "../Sidebar/Search";
import Notifications from "../Sidebar/Notifications";
import Create from "../Sidebar/Create";
import Profile from "../Sidebar/Profile";
const NavbarFooter = () => {
  return (
    <div className="text-white flex gap-y-5 max-lg:items-center justify-around">
      <Home />
      <Search />
      <Notifications />
      <Create />
      <Profile />
    </div>
  );
};

export default NavbarFooter;
