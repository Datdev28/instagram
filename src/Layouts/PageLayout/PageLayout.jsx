import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import NavbarLogout from "../../components/navbar/NavbarLogout";
import NavbarFooter from "../../components/navbar/NavbarFooter";
import NavbarHeader from "../../components/navbar/NavbarHeader";
const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading] = useAuthState(auth);
  const renderSideBar = pathname !== "/auth" && user;
  const renderNavbar = !user && !loading && pathname !== "/auth";

  return (
    <div className="flex max-sm:flex-col">
      {renderSideBar ? (
        <>
          <div className="w-[70px] lg:w-[240px] min-h-screen  border border-r-color-dash bg-black pt-10 max-sm:hidden">
            <Sidebar />
          </div>
          <div className="w-full border  bg-black sm:hidden fixed z-10 bottom-0">
            <NavbarFooter />
          </div>  
          <div className="w-full border-b border-color-dash bg-black fixed sm:hidden z-10 top-0">
            <NavbarHeader/>
          </div>
        </>
      ) : null}
      {renderNavbar ? <NavbarLogout /> : null}
      <div className="flex-1 pb-10 mt-10">{children}</div>
    </div>
  );
};

export default PageLayout;
