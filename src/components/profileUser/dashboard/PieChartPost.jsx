import React from 'react'
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import CustomTooltip from "./CustomToolTip";
const PieChartPost = ({mostPostLike, chartData}) => {
  return (
          <div className="flex flex-col">
          <PieChart width={300} height={380}>
            <Tooltip
              content={
                <CustomTooltip
                  totalEngagement={
                    mostPostLike?.likeCount + mostPostLike?.commentCount
                  }
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              labelLine={false}
              label={({ name, percent }) =>
                `${name}\n${(percent * 100).toFixed(0)}%`
              }
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
          <div className="flex justify-center gap-8 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
              <span className="text-white">
                ❤️ Lượt thích ({mostPostLike?.likeCount})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-white">
                💬 Lượt bình luận ({mostPostLike?.commentCount})
              </span>
            </div>
          </div>
        </div>
  )
}

export default PieChartPost
