import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
    confirmPassWord: "",
  });
  const [sign, setSign] = useState(false);
  const navigate = useNavigate();
  const [displayPass, setDisplayPass] = useState(true);
  const Submit = (e) => {
    e.preventDefault();
    console.log(login);
    navigate('/ ')
  };
  return (
    <div className="flex justify-center items-center h-screen bg-black mx-auto max-w-6xl text-white">
      <div className="flex justify-center w-full h-full px-20 max-lg:px-0 items-start">
        <div className="flex-1 flex w-full items-center max-lg:hidden">
          <img src="auth.png" alt="auth2" className="object-cover w-full" />
        </div>
        <div className="flex-1 flex flex-col w-full items-center mt-9 gap-y-4">
          <div className="flex flex-col border border-gray-600 rounded-xs w-full max-w-[20rem] min-h-[26rem] px-10">
            <div className="w-full flex justify-center items-center px-4 py-10">
              <img src="logo.png" className="" alt="logo instagram" />
            </div>
            <form onSubmit={(e) => Submit(e)} className="space-y-4">
              <input
                type="text"
                name="username"
                value={login.email}
                onChange={(e) => setLogin({ ...login, email: e.target.value })}
                placeholder="Số điện thoại, tên người dùng hoặc email"
                className="w-full bg-black text-white border border-gray-700 rounded px-4 py-2 focus:outline-none placeholder:text-[10px]"
              />
              <div className="flex relative">
                <input
                  type={`${displayPass ? "password" : "text"}`}
                  name="password"
                  value={login.password}
                  onChange={(e) =>
                    setLogin({ ...login, password: e.target.value })
                  }
                  placeholder="Mật khẩu"
                  className="w-full bg-black text-white border border-gray-700 rounded px-4 py-2 focus:outline-none placeholder:text-[10px]"
                />
                {login.password && (
                  <span
                    className="bg-transparent py-1  absolute top-2 text-sm right-1 px-2 text-white cursor-pointer font-semibold select-none"
                    onClick={() => setDisplayPass(!displayPass)}
                  >
                    {`${displayPass ? "Hiển thị" : "Ẩn"}`}
                  </span>
                )}
              </div>
               {sign && (
                  <div className="flex relative">
                  <input
                    type={`${displayPass ? "password" : "text"}`}
                    name="password"
                    value={login.confirmPassWord}
                    onChange={(e) =>
                      setLogin({ ...login, confirmPassWord: e.target.value })
                    }
                    placeholder="Nhập lại mật khẩu"
                    className="w-full bg-black text-white border border-gray-700 rounded px-4 py-2 focus:outline-none placeholder:text-[10px]"
                  />
                  {login.password && (
                    <span
                      className="bg-black py-1  absolute top-1 right-1 px-2 text-white cursor-pointer font-semibold select-none"
                      onClick={() => setDisplayPass(!displayPass)}
                    >
                    </span>
                  )}
                </div>
               )}
              <button
                type="submit"
                className={`w-full bg-blue-400 ${
                  login.email && login.password ? "opacity-100" : "opacity-60"
                } text-white font-medium py-1 rounded transition duration-200 cursor-pointer`}
              >
                Đăng nhập
              </button>
            </form>
            <div className="flex items-center pt-5">
              <hr className="border-gray-600 w-full" />
              <span className="px-3 text-gray-500">Hoặc</span>
              <hr className="border-gray-600 w-full" />
            </div>
            <div className="flex items-center justify-center gap-x-2 mt-10">
              <img
                src="auth-icon-google.png"
                className="w-6 h-6"
                alt="logo google"
              />
              <span className="text-blue-400 cursor-pointer">
                Đăng nhập với Google
              </span>
            </div>
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
              src="auth-google-play.png"
              className="object-contain w-full h-[4rem] cursor-pointer"
              alt="google play"
            />
            <img
              src="auth-microsoft.png"
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
