import React from "react";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";
const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [displayPass, setDisplayPass] = useState(true);
  const { signIn, loading, error } = useLogin();
  return (
    <div>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
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
          } text-white font-medium py-1 h-10 items-center rounded transition duration-200 cursor-pointer flex justify-center`}
          onClick={() => signIn(login)}
        >
          {loading ? (
            <img
              className="object-cover w-7 h-7 rounded-full"
              src="/loading.gif"
              alt="loading"
            />
          ) : (
            "Đăng nhập"
          )}
        </button>
      </form>
      {error && (
        <p className="text-center text-red-500 text-sm whitespace-nowrap pt-6">
          Rất tiếc, mật khẩu của bạn không đúng. <br /> Vui lòng kiểm tra lại
          mật khẩu.
        </p>
      )}
    </div>
  );
};

export default Login;
