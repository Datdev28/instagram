import React from "react";
import { useState } from "react";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";
const SignUp = () => {
  const [inputSign, setInputSign] = useState({
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    errorEmail: "",
    errorPassword:"",
  });
  const [displayPass, setDisplayPass] = useState(true);
  const { loading, error, signUp } = useSignUpWithEmailAndPassword();
  return (
    <div>
      <form className="space-y-4"
       onSubmit={(e) => {
        e.preventDefault();
        // if(error) setErrorMessage({...errorMessage, errorEmail: "Email không hợp lệ"})
        if(inputSign.password !== inputSign.confirmPassword){
          setErrorMessage({...errorMessage, errorPassword: "Mật khẩu không trùng khớp"})
          return;
        }
        signUp(inputSign);
       }}
      >
        <input
          type="text"
          name="email"
          value={inputSign.email}
          onChange={(e) =>
            setInputSign({ ...inputSign, email: e.target.value })
          }
          placeholder="Email của bạn"
          className="w-full bg-black text-white border border-gray-700 rounded px-4 py-2 focus:outline-none placeholder:text-[10px]"
        />
        {
          error && errorMessage.errorEmail && (
            <div className="px-4 mt-[-12px] text-xs text-red-500">{errorMessage.errorEmail}</div>
          )
        }
        <input
          type="text"
          name="name"
          value={inputSign.userName}
          onChange={(e) =>
            setInputSign({ ...inputSign, userName: e.target.value })
          }
          placeholder="Tên của bạn"
          className="w-full bg-black text-white border border-gray-700 rounded px-4 py-2 focus:outline-none placeholder:text-[10px]"
        />
        <div className="flex relative">
          <input
            type={`${displayPass ? "password" : "text"}`}
            name="password"
            value={inputSign.password}
            onChange={(e) =>
              setInputSign({ ...inputSign, password: e.target.value })
            }
            placeholder="Mật khẩu"
            className="w-full bg-black text-white border border-gray-700 rounded px-4 py-2 focus:outline-none placeholder:text-[10px]"
          />
          {inputSign.password && (
            <span
              className="bg-transparent py-1  absolute top-2 text-sm right-1 px-2 text-white cursor-pointer font-semibold select-none"
              onClick={() => setDisplayPass(!displayPass)}
            >
              {`${displayPass ? "Hiển thị" : "Ẩn"}`}
            </span>
          )}
        </div>
        <div className="flex">
          <input
            type={`${displayPass ? "password" : "text"}`}
            name="password"
            value={inputSign.confirmPassword}
            onChange={(e) =>
              setInputSign({ ...inputSign, confirmPassword: e.target.value })
            }
            placeholder="Nhập lại mật khẩu"
            className="w-full bg-black text-white border border-gray-700 rounded px-4 py-2 focus:outline-none placeholder:text-[10px]"
          />
          {inputSign.password && (
            <span
              className="bg-black py-1  absolute top-1 right-1 px-2 text-white cursor-pointer font-semibold select-none"
              onClick={() => setDisplayPass(!displayPass)}
            ></span>
          )}
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-400 ${
            inputSign.email &&
            inputSign.password &&
            inputSign.userName &&
            inputSign.confirmPassword
              ? "opacity-100"
              : "opacity-60"
          } text-white font-medium py-1 rounded transition duration-200 cursor-pointer`}
        >
          Đăng kí
        </button>
      </form>
    </div>
  );
};

export default SignUp;
