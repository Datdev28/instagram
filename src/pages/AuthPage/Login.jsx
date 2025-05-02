import React from "react";
import { useState } from "react";
const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [displayPass, setDisplayPass] = useState(true);

  return (
    <div>
      <form className="space-y-4">
        <input
          type="text"
          name="username"
          value={login.email}
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
          placeholder="Email của bạn"
          className="w-full bg-black text-white border border-gray-700 rounded px-4 py-2 focus:outline-none placeholder:text-[10px]"
        />
        <div className="flex relative">
          <input
            type={`${displayPass ? "password" : "text"}`}
            name="password"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
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
        <button
          type="submit"
          className={`w-full bg-blue-400 ${
            login.email && login.password ? "opacity-100" : "opacity-60"
          } text-white font-medium py-1 rounded transition duration-200 cursor-pointer`}
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Login;
