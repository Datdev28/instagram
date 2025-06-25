const CustomTooltip = ({ active, payload, totalEngagement }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const color = data.payload?.color || "#000";

    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg text-sm">
        <p className="font-semibold" style={{ color }}>
          {data.name}: <span className="font-bold">{data.value}</span>
        </p>
        <p className="text-gray-500">
          {(totalEngagement > 0
            ? ((data.value / totalEngagement) * 100).toFixed(1)
            : 0)}% tổng
        </p>
      </div>
    );
  }
  return null;
};
export default CustomTooltip;
