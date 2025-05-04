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
        let hasError = false;
        let newErrorMessage = { errorEmail: "", errorPassword: "" };
        
        if(inputSign.password !== inputSign.confirmPassword){
          newErrorMessage.errorPassword = "Mật khẩu không trùng khớp";
          hasError = true;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputSign.email)) {
          newErrorMessage.errorEmail = "Email không hợp lệ";
          hasError = true;
        }
        
        setErrorMessage(newErrorMessage);
        
        if(hasError) return;
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
          className={`w-full bg-black text-white border rounded-xs px-4 py-2 focus:outline-none placeholder:text-[10px] ${errorMessage.errorEmail ? "border-red-500": "border-gray-700 rounded"}`}
        />
        {
          errorMessage.errorEmail && (
            <div className="px-4 mt-[-12px] text-xs text-red-500">{errorMessage.errorEmail}</div>
          )
        }
        {error && (
            <div className="px-4 mt-[-12px] text-xs text-red-500">Email đã tồn tại</div>
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
            className={`w-full bg-black text-white border rounded-xs px-4 py-2 focus:outline-none placeholder:text-[10px] ${errorMessage.errorPassword ? "border-red-500": "border-gray-700 rounded"}`}
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
        {
           errorMessage.errorPassword && (
            <div className="px-4 mt-[-12px] text-xs text-red-500">{errorMessage.errorPassword}</div>
          )
        }
        <div className="flex">
          <input
            type={`${displayPass ? "password" : "text"}`}
            name="password"
            value={inputSign.confirmPassword}
            onChange={(e) =>
              setInputSign({ ...inputSign, confirmPassword: e.target.value })
            }
            placeholder="Nhập lại mật khẩu"
            className={`w-full bg-black text-white border rounded-xs px-4 py-2 focus:outline-none placeholder:text-[10px] ${errorMessage.errorPassword ? "border-red-500": "border-gray-700 rounded"}`}
          />
        </div>
        {
          errorMessage.errorPassword && (
            <div className="px-4 mt-[-12px] text-xs text-red-500">{errorMessage.errorPassword}</div>
          )
        }
        <button
          type="submit"
          className={`w-full bg-blue-400 ${
            inputSign.email &&
            inputSign.password &&
            inputSign.userName &&
            inputSign.confirmPassword
              ? "opacity-100"
              : "opacity-60"
          } text-white font-medium py-1 rounded transition duration-200 cursor-pointer flex justify-center`
        }
        disabled={!(inputSign.email && inputSign.password && inputSign.userName && inputSign.confirmPassword)}
        >
          
          {loading ? <img className="object-cover w-7 h-7 rounded-full" src="loading.gif" alt="loading" /> : "Đăng kí"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
