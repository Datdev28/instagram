const convertDateTimestampAgo = (timestamp) => {
  if (!timestamp) return "Không xác định";

  let date;

  if (typeof timestamp.toDate === "function") {
    date = timestamp.toDate();
  }
  else if (
    typeof timestamp === "object" &&
    typeof timestamp.seconds === "number"
  ) {
    date = new Date(timestamp.seconds * 1000);
  }
  else {
    date = new Date(timestamp);
  }

  if (isNaN(date.getTime())) return "Thời gian không hợp lệ";

  const now = Date.now();
  const secondsDiff = Math.floor((now - date.getTime()) / 1000);

  if (secondsDiff < 30) return "Vừa xong";
  if (secondsDiff < 60) return `${secondsDiff} giây trước`;

  const minutesDiff = Math.floor(secondsDiff / 60);
  if (minutesDiff < 60) return `${minutesDiff} phút trước`;

  const hoursDiff = Math.floor(minutesDiff / 60);
  if (hoursDiff < 24) return `${hoursDiff} giờ trước`;

  const daysDiff = Math.floor(hoursDiff / 24);
  if (daysDiff < 7) return `${daysDiff} ngày trước`;

  const weeksDiff = Math.floor(daysDiff / 7);
  if (weeksDiff < 4) return `${weeksDiff} tuần trước`;

  const monthsDiff = Math.floor(daysDiff / 30);
  if (monthsDiff < 12) return `${monthsDiff} tháng trước`;

  const yearsDiff = Math.floor(daysDiff / 365);
  return `${yearsDiff} năm trước`;
};

export default convertDateTimestampAgo;
