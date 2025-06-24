import { formatDistanceToNowStrict } from 'date-fns';
import { vi } from 'date-fns/locale';

const convertDateTime = (dateTime) => {
  const now = Date.now();
  const targetTime = new Date(dateTime).getTime();
  const diffInSeconds = Math.floor((now - targetTime) / 1000);

  if (isNaN(targetTime)) return "Thời gian không hợp lệ";
  if (diffInSeconds < 60) return "Vừa xong";

  return formatDistanceToNowStrict(new Date(dateTime), { locale: vi });
};

export default convertDateTime;
