import React from "react";
import Home from "../Sidebar/Home";
import Search from "../Sidebar/Search";
import Create from "../Sidebar/Create";
import Profile from "../Sidebar/Profile";
import MessChat from "../Sidebar/MessChat";
const NavbarFooter = () => {
  return (
    <div className="text-white flex gap-y-5 max-lg:items-center justify-around">
      <Home />
      <Search />
      <Create />
      <MessChat/>
      <Profile />
    </div>
  );
};

export default NavbarFooter;
