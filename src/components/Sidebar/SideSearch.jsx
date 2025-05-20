import React, { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import useSearchUser from "../../hooks/useSearchUser";
import searchToggleStore from "../../store/searchToggleStore";
import { TbUserQuestion } from "react-icons/tb";
import { Link } from "react-router-dom";
const SideSearch = () => {
  const [isOpenDel, setIsOpenDel] = useState(false);
  const [input, setInput] = useState("");
  const { isOpenToggle, setIsOpenToggle } = searchToggleStore();
  const { error, isLoading, getUser, user, setUser, setError } =
    useSearchUser();
  const handleOnChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setIsOpenDel(value.length > 0);
    if (value.length === 0) {
      setError("");
      setUser(null);
    }
  };
  const onClickDel = () => {
    setIsOpenDel(false);
    setInput("");
    setError("");
    setUser(null);
  };
  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      getUser(input);
    }
  };
  useEffect(() => {
    const reState = () => {
      setUser(null);
      setInput("");
      setError("");
    };
    reState();
  }, [isOpenToggle]);
  return (
    <div className="flex flex-col pl-4 text-white w-full gap-y-5">
      <p className="text-2xl font-bold px-4">Tìm kiếm</p>
      <div className="flex items-center px-4 gap-x-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Tên người dùng"
            value={input}
            className="pl-4 h-9 w-full rounded-xs outline-none placeholder:text-color-text-gray bg-color-note"
            onChange={(e) => handleOnChange(e)}
            onKeyDown={(e) => handleOnKeyDown(e)}
          />
          {isOpenDel && (
            <TiDelete
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xl cursor-pointer"
              onClick={onClickDel}
            />
          )}
        </div>
        <button
          className="px-2 py-1 border-2 text-md font-semibold border-color-dash hover:bg-color-note rounded-sm cursor-pointer"
          onClick={() => getUser(input)}
        >
          {isLoading ? (
            <img
              className="object-cover w-7 h-7 rounded-full"
              src="loading.gif"
              alt="loading"
            />
          ) : (
            "Tìm"
          )}
        </button>
      </div>
      <hr className="border-color-dash border-1" />
      {!user && !isLoading && !error && (
        <div className=" flex w-full justify-center items-center mt-40">
          <TbUserQuestion className="text-6xl text-color-text-gray" />
        </div>
      )}
      {error && <p className="text-center text-color-text-gray">{error}</p>}
      {user && (
        <Link to={`/${user.userName}`} onClick={() => setIsOpenToggle(false)}>
          <div className="flex px-4 items-center gap-x-4 w-full hover:bg-color-note py-2 cursor-pointer">
            <img
              src={user.profilePicURL || "defaultProfilePic.jpg"}
              className="object-cover w-11 h-11 rounded-full cursor-pointer"
              alt="avatar"
            />
            <div className="justify-center flex flex-col">
              <p className="text-sm">{user.userName}</p>
              <p className="text-md text-color-text-gray">{user.fullName}</p>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default SideSearch;
