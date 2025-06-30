
const hasPassedMinutes = (from, minutes) => {
  const now = new Date();
  const expired = new Date(from?.getTime() + minutes * 60 * 1000);
  return now > expired;
};

export default hasPassedMinutes
