function formatMonthYear(timestamp) {
  const date = new Date(timestamp);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `Tháng ${month} năm ${year}`;
}

export default formatMonthYear
