import { MdOutlineSecurity } from "react-icons/md";
import { IoBan } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { BsPatchCheck } from "react-icons/bs";
import { FaUserShield } from "react-icons/fa6";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
const Accounts = () => {
  return (
    <div className="flex w-full text-white">
      <div className="flex flex-col px-4 gap-y-8 w-[320px] h-screen border-r border-color-dash max-sm:pt-10">
        <p className="font-bold text-xl px-2">Cài đặt</p>
        <div className="space-y-1">
          <p className="text-color-text-gray text-xs px-2">Tài khoản của bạn</p>
          <Link to={"/accounts/password"}>
            <div className="flex gap-x-2 items-center hover:bg-color-btn-gray rounded-sm py-1 px-2 cursor-pointer">
              <MdOutlineSecurity className="text-2xl" />
              <p>Mật khẩu và bảo mật</p>
            </div>
          </Link>
        </div>
        <div className="space-y-1">
          <p className="text-color-text-gray text-xs px-2">
            Ai có thể xem nội dung của bạn
          </p>
          <Link to={"/accounts/blocked-accounts"}>
            <div className="flex gap-x-2 items-center hover:bg-color-btn-gray rounded-sm py-1 px-2 cursor-pointer">
              <IoBan className="text-2xl" />
              <p>Đã chặn</p>
            </div>
          </Link>
        </div>
        <div className="space-y-1">
          <p className="text-color-text-gray text-xs px-2">
            Dành cho chuyên gia{" "}
          </p>
          <div className="flex gap-x-2 items-center hover:bg-color-btn-gray rounded-sm py-1 px-2 cursor-pointer">
            <BsPatchCheck className="text-3xl" />
            <p>Khoe trang cá nhân đã xác minh</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-color-text-gray text-xs px-2">
            Thông tin khác và hỗ trợ
          </p>
          <div className="flex gap-x-2 items-center hover:bg-color-btn-gray rounded-sm py-1 px-1 cursor-pointer">
            <CiUser className="text-3xl" />
            <p>Trạng thái tài khoản</p>
          </div>
          <div className="flex gap-x-3 items-center hover:bg-color-btn-gray rounded-sm py-1 px-2 cursor-pointer">
            <FaUserShield className="text-2xl" />
            <p>Yêu cầu xác minh</p>
          </div>
        </div>
      </div>
      <div className="w-full max-w-3xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Accounts;
