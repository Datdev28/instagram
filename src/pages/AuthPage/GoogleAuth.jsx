import React from "react";

const GoogleAuth = () => {
  return (
    <div className="flex items-center justify-center gap-x-2 mt-10 mb-4 select-none">
      <img src="auth-icon-google.png" className="w-6 h-6" alt="logo google" />
      <span className="text-blue-400 cursor-pointer">Đăng nhập với Google</span>
    </div>
  );
};

export default GoogleAuth;
