import VoicePlayer from "../voiceChat/VoicePlayer";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import "dayjs/locale/vi"; 

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

  const isNewDay = !prevTime || !currentTime.isSame(prevTime, "day");

  if (!isNewDay) return null;

  if (currentTime.isToday()) {
    return currentTime.format("HH:mm");
  }

  const now = dayjs();
  const isInSameWeek = currentTime.startOf("week").isSame(now.startOf("week"));

  if (isInSameWeek) {
    const weekdayName = currentTime.format("dddd"); 
    return `${weekdayName}, ${currentTime.format("HH:mm")}`;
  }

  return currentTime.format("HH:mm - DD/MM/YYYY");
};

const MessageBubble = ({ msg, isOwn, showAvatar, otherUserProfile, prevMsg }) => {
  const bubbleClass = `max-w-[60%] rounded-xl text-sm break-words ${
    msg.type === "text"
      ? isOwn
        ? "bg-blue-500 text-white rounded-br-none px-3 py-2"
        : "bg-color-dash text-white rounded-bl-none px-3 py-2"
      : ""
  }`;

  const containerClass = `flex gap-2 ${isOwn ? "justify-end" : "justify-start"}`;

  const timestampLabel = getTimestampLabel(
    msg.createdAt?.seconds ? msg.createdAt.seconds * 1000 : null,
    prevMsg?.createdAt?.seconds ? prevMsg.createdAt.seconds * 1000 : null
  );

  return (
    <>
      {timestampLabel && (
        <div className="w-full flex justify-center py-1">
          <span className="text-xs text-gray-400">{timestampLabel}</span>
        </div>
      )}

      <div className={containerClass}>
        {!isOwn &&
          (showAvatar ? (
            <img
              src={otherUserProfile?.profilePicURL || "/defaultProfilePic.jpg"}
              alt="avatar"
              className="w-8 h-8 rounded-full self-end object-cover"
            />
          ) : (
            <div className="w-8 h-8" />
          ))}

        <div className={bubbleClass}>
          {msg.type === "text" && msg.content}
          {msg.type === "icon" && <p className="text-5xl">{msg.content}</p>}
          {msg.type === "image" &&
            msg.imageUrls?.map((url, i) => (
              <img key={i} src={url} className="rounded-lg w-[300px] h-[400px]" />
            ))}
          {msg.type === "voice" && (
            <VoicePlayer controls src={msg.voiceUrl} isOwn={isOwn} />
          )}
        </div>
      </div>
    </>
  );
};

export default MessageBubble;
