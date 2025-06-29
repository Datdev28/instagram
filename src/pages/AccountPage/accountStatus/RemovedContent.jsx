import { MdKeyboardArrowLeft } from "react-icons/md";
import Footer from "../../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
const RemovedContent = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-y-14">
      <div className="flex items-center gap-x-2">
        <MdKeyboardArrowLeft className="text-3xl cursor-pointer"
         onClick={() => navigate('/accounts/account-status')}
        />
       <h2 className="text-xl font-bold">Nội dung bị gỡ và vấn đề khi nhắn tin</h2>
      </div>
      <div className="max-w-[600px] space-y-6">
        <div className="w-full bg-color-dash flex items-center p-4 rounded-3xl gap-x-2">
          <img
            src="/ins_checkmark.png"
            alt="ảnh đại diện"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <p className="font-bold">
              Tài khoản của bạn hiện chưa bị ảnh hưởng
            </p>
            <p className="text-color-text-gray text-sm">
              Cảm ơn bạn đã tuân thủ{" "}
              <span className="text-blue-500">Tiêu chuẩn cộng đồng</span> của
              chúng tôi
            </p>
          </div>
        </div>
        <p className="font-bold">Ý nghĩa điều này</p>
        <p className="text-sm text-color-text-gray">
          Bạn hiện không có nguy cơ mất quyền truy cập vào tài khoản của mình.
        </p>
        <p className="text-sm text-color-text-gray">
          Chúng tôi vẫn có thể gỡ tài khoản của bạn mà không cảnh báo trước nếu
          nội dung bạn đăng gây nguy hiểm cho cộng đồng Instagram.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default RemovedContent;
