import VoicePlayer from "../voiceChat/VoicePlayer";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import "dayjs/locale/vi";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegCopy } from "react-icons/fa";
import { IoReturnUpBack } from "react-icons/io5";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import useDeleteMessage from "../../../hooks/useDeleteMessage";
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isSameOrAfter);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale("vi");

const getTimestampLabel = (current, prev) => {
  if (!current) return null;

  const currentTime = dayjs(current);
  const prevTime = prev ? dayjs(prev) : null;

  if (!prevTime) return currentTime.format("HH:mm - DD/MM/YYYY");

  const isDifferentDay = !currentTime.isSame(prevTime, "day");
  const isMoreThan1Hour = currentTime.diff(prevTime, "minute") > 20;

  if (isDifferentDay || isMoreThan1Hour) {
    if (currentTime.isToday()) {
      return currentTime.format("HH:mm");
    }

    const now = dayjs();
    const isInSameWeek = currentTime
      .startOf("week")
      .isSame(now.startOf("week"));

    if (isInSameWeek) {
      const weekdayName = currentTime.format("dddd");
      return `${weekdayName}, ${currentTime.format("HH:mm")}`;
    }

    return currentTime.format("HH:mm - DD/MM/YYYY");
  }

  return null;
};
const MessageBubble = ({
  msg,
  isOwn,
  showAvatar,
  otherUserProfile,
  chatId,
  prevMsg,
}) => {
  const navigate = useNavigate();
  const [showEmoj, setShowEmoj] = useState(false);
  const [isSettingMess, setIsSettingMess] = useState(false);
  const [showCopiedText, setShowCopiedText] = useState(false);
  const { deleteMessage } = useDeleteMessage();
  const dotRef = useRef();
  const [menuPosition, setMenuPosition] = useState("bottom");
  const bubbleClass = `max-w-[60%] rounded-xl text-sm break-words ${
    msg.type === "text"
      ? isOwn
        ? "bg-blue-500 text-white rounded-br-none px-3 py-2"
        : "bg-color-dash text-white rounded-bl-none px-3 py-2"
      : ""
  }`;
  const handleClickSetting = () => {
    if (!dotRef.current) return;

    const rect = dotRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const menuHeight = 200;
    const direction = spaceBelow < menuHeight ? "top" : "bottom";
    setMenuPosition(direction);

    // Gửi sự kiện toàn cục thông báo msg nào được bật menu
    window.dispatchEvent(
      new CustomEvent("open-message-menu", {
        detail: { id: msg.id },
      })
    );

    setIsSettingMess((prev) => !prev);
  };

  const handleCopy = async (text) => {
    await navigator.clipboard.writeText(text);
    setShowCopiedText(true);
    setIsSettingMess(false);
    setTimeout(() => setShowCopiedText(false), 1000);
  };
  const handleClickRemoveMess = async () => {
    await deleteMessage(chatId, msg?.id);
  };
  const containerClass = `flex gap-2 ${
    isOwn ? "justify-end" : "justify-start"
  }`;
  const timestampLabel = getTimestampLabel(
    msg.createdAt?.seconds ? msg.createdAt.seconds * 1000 : null,
    prevMsg?.createdAt?.seconds ? prevMsg.createdAt.seconds * 1000 : null
  );
  const timestampMess = msg.createdAt?.seconds
    ? dayjs(msg.createdAt.seconds * 1000).format("HH:mm - DD/MM/YYYY")
    : null;
  useEffect(() => {
    const handleOutsideOpen = (e) => {
      if (e.detail.id !== msg.id) {
        setIsSettingMess(false);
      }
    };

    window.addEventListener("open-message-menu", handleOutsideOpen);

    return () => {
      window.removeEventListener("open-message-menu", handleOutsideOpen);
    };
  }, [msg.id]);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dotRef.current && !dotRef.current.contains(e.target)) {
        setIsSettingMess(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      {timestampLabel && (
        <div className="w-full flex justify-center py-1">
          <span className="text-xs text-gray-400">{timestampLabel}</span>
        </div>
      )}

      <div className={`${containerClass} group`}>
        {isOwn && (
          <div
            className={`group-hover:opacity-100 ${
              isSettingMess ? "opacity-100" : "opacity-0"
            }  flex items-center gap-x-1 text-white`}
          >
            <div
              ref={dotRef}
              className="rounded-full bg-transparent hover:bg-color-input-gray p-1 relative"
            >
              <BsThreeDotsVertical
                className="cursor-pointer"
                onClick={handleClickSetting}
              />

              {isSettingMess && (
                <div
                  className="w-[140px] bg-color-dash z-10 rounded-xl absolute left-[-140px] text-center py-2 space-y-2"
                  style={{
                    top: menuPosition === "bottom" ? "100%" : undefined,
                    bottom: menuPosition === "top" ? "100%" : undefined,
                    marginTop: menuPosition === "bottom" ? "8px" : undefined,
                    marginBottom: menuPosition === "top" ? "8px" : undefined,
                  }}
                >
                  <span className="text-xs text-gray-400">{timestampMess}</span>
                  <hr className="border-color-input-gray mt-2" />
                  {(msg?.type === "text" || msg?.type === "icon") && (
                    <div
                      className="flex items-center justify-between rounded-md px-1 hover:bg-color-note py-1 mx-2 cursor-pointer"
                      onClick={() => handleCopy(msg?.content)}
                    >
                      <p>Sao chép</p>
                      <FaRegCopy />
                    </div>
                  )}

                  <div
                    className="flex items-center justify-between rounded-md px-1 hover:bg-color-note py-1 mx-2 cursor-pointer"
                    onClick={handleClickRemoveMess}
                  >
                    <p className="text-red-600">Thu hồi</p>
                    <IoReturnUpBack className="text-red-600" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {!isOwn &&
          (showAvatar ? (
            <img
              src={otherUserProfile?.profilePicURL || "/defaultProfilePic.jpg"}
              alt="avatar"
              className="w-8 h-8 rounded-full self-end object-cover cursor-pointer"
              onClick={() => navigate(`/${otherUserProfile?.userName}`)}
            />
          ) : (
            <div className="w-8 h-8" />
          ))}

        <div className={bubbleClass}>
          {msg.type === "text" && msg.content}
          {msg.type === "icon" && <p className="text-5xl">{msg.content}</p>}
          {msg.type === "image" &&
            msg.imageUrls?.map((url, i) => (
              <img
                key={i}
                src={url}
                className="rounded-lg w-[300px] h-[400px] object-cover"
              />
            ))}
          {msg.type === "voice" && (
            <VoicePlayer controls src={msg.voiceUrl} isOwn={isOwn} />
          )}
        </div>
        {!isOwn && (
          <div
            className={`group-hover:opacity-100 ${
              isSettingMess ? "opacity-100" : "opacity-0"
            }  flex items-center gap-x-1 text-white`}
          >
            <div
              ref={dotRef}
              className="rounded-full bg-transparent hover:bg-color-input-gray p-1 relative"
            >
              <BsThreeDotsVertical
                className="cursor-pointer"
                onClick={handleClickSetting}
              />

              {isSettingMess && (
                <div
                  className="w-[140px] bg-color-dash z-10 rounded-xl absolute  text-center py-2 space-y-2"
                  style={{
                    top: menuPosition === "bottom" ? "100%" : undefined,
                    bottom: menuPosition === "top" ? "100%" : undefined,
                    marginTop: menuPosition === "bottom" ? "8px" : undefined,
                    marginBottom: menuPosition === "top" ? "8px" : undefined,
                  }}
                >
                  <span className="text-xs text-gray-400">{timestampMess}</span>
                  {(msg?.type === "text" || msg?.type === "icon") && (
                    <>
                      <hr className="border-color-input-gray mt-2" />
                      <div
                        className="flex items-center justify-between rounded-md px-1 hover:bg-color-note py-1 mx-2 cursor-pointer"
                        onClick={() => handleCopy(msg?.content)}
                      >
                        <p>Sao chép</p>
                        <FaRegCopy />
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        <div
          className={`absolute top-1/2 left-1/3 ${
            showCopiedText ? "opacity-100" : "opacity-0"
          } flex items-center transition-all bg-color-dash space-x-2 p-4 rounded-md`}
        >
          <IoCheckmarkCircleOutline className="inline text-3xl" />
          <span>Đã sao chép</span>
        </div>
      </div>
    </>
  );
};

export default MessageBubble;
