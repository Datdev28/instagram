import React from "react";
import NavbarLogout from "../../components/navbar/NavbarLogout";
import NavbarFooter from "../../components/navbar/NavbarFooter";
import NavbarHeader from "../../components/navbar/NavbarHeader";
import searchToggleStore from "../../store/searchToggleStore";
import SideSearch from "../../components/sidebar/SideSearch";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading] = useAuthState(auth);
  const renderSideBar =
    pathname !== "/auth" &&
    user &&
    pathname !== `/qr` &&
    pathname !== "/admin/report-management";
  const { isOpenToggle } = searchToggleStore();
  const renderNavbar = !user && !loading && pathname !== "/auth";
  const pageAdmin = pathname === "/admin/report-management";
  const pageInbox = pathname === "/direct/inbox";
  return (
    <div className="flex max-sm:flex-col">
      {renderSideBar ? (
        <>
          <div
            className={`max-lg:w-[70px] z-20 relative flex max-lg:justify-center min-h-screen border border-r-color-dash bg-black pt-10 max-sm:hidden
            ${isOpenToggle ? "w-[70px]" : "w-[240px]"}
              `}
          >
            <Sidebar />
          </div>
          <div
            className={`fixed top-0 left-15 max-sm:hidden h-full transition-all duration-300 z-10 overflow-auto custom-scrollbar rounded-tr-2xl rounded-br-2xl 
              w-[400px] bg-black pt-6 ${
                isOpenToggle ? "translate-x-0" : "-translate-x-full"
              }`}
          >
            <SideSearch />
          </div>
          <div className="w-full border  bg-black sm:hidden fixed z-10 bottom-0">
            <NavbarFooter />
          </div>
          <div className="w-full border-b border-color-dash bg-black fixed sm:hidden z-10 top-0">
            <NavbarHeader />
          </div>
        </>
      ) : null}
      {renderNavbar ? <NavbarLogout /> : null}

      <div
        className={`flex-1 ${pageAdmin || pageInbox ? "pb-0 mt-0" : "pb-10 mt-10"}  ${
          isOpenToggle ? "lg:ml-[170px]" : "0"
        } ${renderNavbar ? "pt-16" : ""}`}
      >
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
