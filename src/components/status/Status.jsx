import { useCallback, useEffect, useRef, useState, memo } from "react";
import useAuthStore from "../../store/authStore";
import { BsEmojiSmile } from "react-icons/bs";
import Emoj from "../emojPicker/Emoj";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
const Status = ({
  setChekedHideLike,
  setTurnOffComment,
  setValueText,
  valueText,
  isOpenModalToEdit = false,
}) => {
  const user = useAuthStore((state) => state.user);
  const [showEmoj, setShowEmoj] = useState(false);
  const [isOpenSetting, setIsOpenSetting] = useState(false);

  const emojiRef = useRef(null);
  const handleOnChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= 200) {
      setValueText(newValue);
    }
  };
  const handleHideLikes = (e) => {
    setChekedHideLike(e.target.checked);
  };
  const handleTurnOfComment = (e) => {
    setTurnOffComment(e.target.checked);
  };
  const handleClickEmoj = useCallback(
    (emojiData) => {
      if (valueText.length + emojiData.native.length <= 200) {
        setValueText((prev) => prev + emojiData.native);
        setShowEmoj(false);
      }
    },
    [valueText]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmoj(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex-1 flex flex-col p-4 gap-y-4">
      <div className="flex items-center gap-x-2">
        <img
          src={user.profilePicURL || "/defaultProfilePic.jpg"}
          className="w-8 h-8 rounded-full object-cover"
          alt="Hình ảnh đại diện"
        />
        <p>{user.userName}</p>
      </div>
      <textarea
        name="text"
        value={valueText}
        className="resize-none h-[10rem] outline-none custom-scrollbar"
        onChange={handleOnChange}
      ></textarea>
      <div className="w-full flex justify-between relative">
        <BsEmojiSmile
          className="cursor-pointer"
          onClick={() => setShowEmoj(!showEmoj)}
        />
        {showEmoj && <Emoj handleClickEmoj={handleClickEmoj} isOpenModalToEdit={isOpenModalToEdit} ref={emojiRef} />}
        <p className="text-color-btn-gray text-xs">{valueText.length}/200</p>
      </div>
      {!isOpenModalToEdit && (
        <div className="flex flex-col">
          <div className="flex justify-between">
            <p className="font-semibold">Cài đặt nâng cao</p>
            <div
              onClick={() => setIsOpenSetting(!isOpenSetting)}
              className=" cursor-pointer"
            >
              {isOpenSetting ? (
                <MdKeyboardArrowUp className="text-3xl" />
              ) : (
                <MdKeyboardArrowDown className="text-3xl" />
              )}
            </div>
          </div>
          {isOpenSetting && (
            <div className="flex flex-col gap-y-3">
              <div className="flex justify-between items-center gap-x-2">
                <p>Ẩn lượt thích và lượt xem trên bài viết này</p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={handleHideLikes}
                  />
                  <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors duration-300"></div>
                  <div className="absolute left-0.5 top-[3px] w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-5"></div>
                </label>
              </div>
              <p className="text-color-btn-gray text-xs">
                Chỉ bạn mới nhìn thấy tổng số lượt thích và lượt xem bài viết
                này. Về sau, bạn có thể thay đổi tùy chọn này bằng cách mở menu
                ··· ở đầu bài viết. Để ẩn số lượt thích trên bài viết của người
                khác, hãy đi đến phần cài đặt tài khoản.
              </p>
              <div className="flex justify-between items-center gap-x-2">
                <p>Tắt tính năng bình luận</p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={handleTurnOfComment}
                  />
                  <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors duration-300"></div>
                  <div className="absolute left-0.5 top-[2px] w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-5"></div>
                </label>
              </div>
              <p className="text-color-btn-gray text-xs">
                Về sau, bạn có thể thay đổi tùy chọn này bằng cách mở menu ··· ở
                đầu bài viết.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(Status);
