import React from "react";
import convertDateTimestampAgo from "../../utils/convertDateTimestampAgo";
const Notification = ({ notification, notificationType }) => {
  console.log(notification.createdAt.seconds);
  return (
    <div className="flex gap-x-2 items-center">
      <img
        src="/icon_insta_loading.png"
        className="w-12 h-12 rounded-full object-cover"
        alt="instagram"
      />
      <p className="whitespace-pre-wrap break-words text-sm">
        Chúng tôi nhận thấy hành vi của bạn mang tính chất{" "}
        {notification.reason.toLowerCase()}. {notification.content}
        <span className="text-sm text-color-text-gray">
          {" "}
          {convertDateTimestampAgo(notification.createdAt)}
        </span>{" "}
      </p>
    </div>
  );
};

export default Notification;
