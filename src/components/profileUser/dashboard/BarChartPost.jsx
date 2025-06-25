import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import CustomTooltip from "./CustomToolTip";
const BarChartPost = ({ mostPostLike, chartData }) => {
  return (
    <div className="flex flex-col">
      <BarChart width={300} height={380} data={chartData}>
        <Tooltip
          content={
            <CustomTooltip
              totalEngagement={
                mostPostLike?.likeCount + mostPostLike?.commentCount
              }
            />
          }
        />
        <XAxis dataKey="name" />
        <YAxis />
        <Bar
          dataKey="value"
          nameKey="name"
          label={{ position: "top", fill: "#fff", fontSize: 12 }}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
      <div className="flex justify-center gap-8 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
          <span className="text-white">
            ❤️ Likes ({mostPostLike?.likeCount})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span className="text-white">
            💬 Comments ({mostPostLike?.commentCount})
          </span>
        </div>
      </div>
    </div>
  );
};

export default BarChartPost;
