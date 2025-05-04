import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Navbar from "../../components/navbar/Navbar";
const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading] = useAuthState(auth);
  const renderSideBar = pathname !== "/auth" && user;
  const renderNavbar = !user && !loading && pathname !== "/auth";
  return (
    <div className="flex">
      {renderSideBar ? (
        <div className="w-[70px] lg:w-[240px] min-h-screen  border border-r-color-dash bg-black pt-10 max-sm:hidden">
          <Sidebar />
        </div>
      ) : null}
      {renderNavbar ? <Navbar /> : null}
      <div className="flex-1 pb-10 mt-10">{children}</div>
    </div>
  );
};

export default PageLayout;
