import useAuthStore from "../../../store/authStore";
import { PiImageSquareBold } from "react-icons/pi";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import Footer from "../../../components/footer/Footer";
const AccountStatus = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="flex flex-col gap-y-14">
      <h2 className="text-xl font-bold">Trạng thái tài khoản</h2>
      <div className="max-w-[600px] space-y-6">
        <div className="w-full bg-color-dash flex items-center p-4 rounded-3xl gap-x-2">
          <img
            src={user?.profilePicURL || `defaultProfilePic.jpg`}
            alt="ảnh đại diện"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <p className="font-bold">{user?.userName}</p>
            <p className="text-color-text-gray">{user?.fullName}</p>
          </div>
        </div>
        <p className="text-sm">
          Xem mọi hành động mà Instagram đã thực hiện khi tài khoản hoặc nội
          dung của bạn không tuân thủ tiêu chuẩn của chúng tôi.
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            <PiImageSquareBold className="text-2xl" />
            <p>Nội dung bị gỡ và vấn đề khi nhắn tin</p>
          </div>
          <div className="flex items-center text-xl">
            <IoIosCheckmarkCircle className="text-green-500" />
            <MdKeyboardArrowRight className="text-3xl text-color-text-gray cursor-pointer" />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            <FaRegComment className="text-2xl" />
            <p>Tính năng của bạn không sử dụng được</p>
          </div>
          <div className="flex items-center text-xl">
            <IoIosCheckmarkCircle className="text-green-500" />
            <MdKeyboardArrowRight className="text-3xl text-color-text-gray cursor-pointer" />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AccountStatus;
