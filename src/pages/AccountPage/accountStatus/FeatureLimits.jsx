import { MdKeyboardArrowLeft } from "react-icons/md";
import Footer from "../../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import useListenCommentBan from "../../../hooks/useListenCommentBan";
import useAuthStore from "../../../store/authStore";
import hasPassedMinutes from "../../../utils/hasPassedMinutes";
import useListenPostBan from "../../../hooks/useListenPostBan";
import { IoBanSharp } from "react-icons/io5";
const FeatureLimits = () => {
  const user = useAuthStore(state => state.user);
  const commentBan = useListenCommentBan(user?.uid);
  const postBan = useListenPostBan(user?.uid)
  const navigate = useNavigate();
  const isStillBannedComment = commentBan && !hasPassedMinutes(commentBan?.from, 3);
  const isStillBannedCreatePost = commentBan && !hasPassedMinutes(postBan?.from, 3);
  return (
    <div className="flex flex-col gap-y-14">
      <div className="flex items-center gap-x-2">
        <MdKeyboardArrowLeft
          className="text-3xl cursor-pointer"
          onClick={() => navigate("/accounts/account-status")}
        />
        <h2 className="text-xl font-bold">
          Tính năng bạn không được sử dụng
        </h2>
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
        {isStillBannedComment && (
        <div className="flex items-center gap-x-2">
           <IoBanSharp className="text-red-600 text-2xl"/>
           <p>Hiện bạn không được phép sử dụng chức năng bình luận ở bài đăng.</p>
        </div>
        )}
        {isStillBannedCreatePost && (
        <div className="flex items-center gap-x-2">
           <IoBanSharp className="text-red-600 text-2xl"/>
           <p>Hiện bạn không được phép sử dụng chức năng tạo bài đăng.</p>
        </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FeatureLimits;
