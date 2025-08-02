import { Timestamp } from "firebase/firestore";

export const formatTimestampToVietnamTime = (timestamp) => {
  if (!timestamp || !(timestamp instanceof Timestamp)) return "Không xác định";

  const date = timestamp.toDate();

  return date.toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
