import React, { useEffect, useRef, useState } from "react";
import useSearchUser from "../../hooks/useSearchUser";
import { CiHeart } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { TbUserQuestion } from "react-icons/tb";
const NavbarHeader = () => {
  const { error, isLoading, getUser, user, setUser, setError } =
    useSearchUser();
  const [showDropDown, setShowDropDown] = useState(false);
  const [input, setInput] = useState("");
  const handleFocus = () => {
    setShowDropDown(true);
  };
  const handleClickSearch = () => {
    if (input.trim()) {
      getUser(input);
    }
  };
  const dropDownRef = useRef(null);
  const inputRef = useRef(null);
  const searchRef = useRef(null);
  const handleOnBlur = (e) => {
    if (
      dropDownRef.current &&
      !dropDownRef.current.contains(e.target) &&
      !inputRef.current.contains(e.target) &&
      !searchRef.current.contains(e.target)
    ) {
      setShowDropDown(false);
    }
  };
  const handleOnChange = (e) => {
    const value = e.target.value;
    if (value.length === 0) {
      setUser(null);
      setError("");
    }
    setInput(value);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOnBlur);
    const reState = () =>{
      setError("");
      setUser(null);
    }
    reState();
    return () => {
      document.removeEventListener("mousedown", handleOnBlur);
    };
  }, []);
  return (
    <div className="flex gap-x-4 items-center justify-between w-full px-2 py-4 text-white relative">
      <div className="flex px-2 w-[100px] shrink-0 max-lg:justify-center max-[350px]:w-[70px] ">
        <img
          src="/logo.png"
          className="w-full cursor-pointer object-cover"
          alt="logo"
        />
      </div>
      <div className="flex items-center gap-x-4 relative">
        <input
          ref={inputRef}
          value={input}
          type="text"
          placeholder="Tìm kiếm"
          className="bg-color-input-gray  pl-4 py-1 outline-none rounded-lg text-white "
          onFocus={handleFocus}
          onChange={handleOnChange}
        />
        <CiSearch
          ref={searchRef}
          onClick={handleClickSearch}
          className="absolute right-14 text-2xl cursor-pointer"
        />
        <CiHeart className="text-3xl" />
      </div>
      {showDropDown && (
        <div
          ref={dropDownRef}
          className="absolute top-16 w-xs right-4 p-4 h-[5rem] bg-color-dash rounded-md overflow-hidden"
        >
          {!user && !isLoading && !error && (
              <TbUserQuestion className="text-4xl text-color-text-gray m-auto" />
          )}
          {isLoading && (
            <img
              src="/searching.gif"
              className="w-[5rem] h-[5rem] m-auto"
              alt="đang tìm kiếm"
            />
          )}

          {error && (
            <div className="flex w-full h-full justify-center items-center">
              <p className="text-white m-auto">Không tìm thấy người dùng</p>
            </div>
          )}
          {user && (
            <div className="flex items-center gap-x-4">
              <Link
                to={`/${user.userName}`}
                onClick={() => setShowDropDown(false)}
              >
                <img
                  src={user.profilePicURL || "/defaultProfilePic.jpg"}
                  alt="avatar"
                  className="w-[3rem] h-[3rem] rounded-full cursor-pointer object-cover"
                />
              </Link>
              <div className="flex flex-col justify-center">
                <Link
                  to={`/${user.userName}`}
                  onClick={() => setShowDropDown(false)}
                >
                  <p className="text-white cursor-pointer">{user.userName}</p>
                </Link>
                <p className="text-color-text-gray text-xs">{user.fullName}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarHeader;
