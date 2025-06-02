import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import GoogleAuth from "./GoogleAuth";
import userProfileStore from "../../store/userProfileStore";
const AuthPage = () => {
   const [sign, setSign] = useState(false);
   const {userProfile, setUserProfile} = userProfileStore();
    if(userProfile){
      setUserProfile(null);
    }
  return (
    <div className="flex justify-center items-center h-screen bg-black mx-auto max-w-6xl text-white">
      <div className="flex justify-center w-full h-full px-20 max-lg:px-0 items-start">
        <div className="flex-1 flex w-full items-center max-lg:hidden">
          <img src="/auth.png" alt="auth2" className="object-cover w-full" />
        </div>
        <div className="flex-1 flex flex-col w-full items-center mt-9 gap-y-4">
          <div className="flex flex-col border border-gray-600 rounded-xs w-full max-w-[20rem] min-h-[26rem] px-10">
            <div className="w-full flex justify-center items-center px-4 py-10">
              <img src="/logo.png" className="" alt="logo instagram" />
            </div>
              {sign ? <SignUp/> : <Login/>}
            <div className="flex items-center pt-5">
              <hr className="border-gray-600 w-full" />
              <span className="px-3 text-gray-500">Hoặc</span>
              <hr className="border-gray-600 w-full" />
            </div>
            <GoogleAuth/>          
          </div>
          <div className="h-[4rem] w-[20rem] flex justify-center items-center border border-gray-600 rounded-xs">
            <p>
              {sign ? "Bạn đã có tài khoản ư?" : "Bạn chưa có tài khoản ư?"}{" "}
              <span
                className="text-blue-400 cursor-pointer"
                onClick={() => setSign(!sign)}
              >
                {sign ? "Đăng nhập" : "Đăng ký"}
              </span>
            </p>
          </div>
          <p>Tải ứng dụng.</p>
          <div className="flex justify-center items-center w-[20rem] px-20 gap-x-8">
            <img
              src="/auth-google-play.png"
              className="object-contain w-full h-[4rem] cursor-pointer"
              alt="google play"
            />
            <img
              src="/auth-microsoft.png"
              className="object-contain w-full h-[2.9rem] cursor-pointer"
              alt="microsoft"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
