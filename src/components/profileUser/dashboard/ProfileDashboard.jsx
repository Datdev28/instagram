import useMostInteractedPost from "../../../hooks/useMostInteractedPost";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import useAuthStore from "../../../store/authStore";
import { NoPosts } from "../ProfileUserPosts";
import { useNavigate } from "react-router-dom";
import { IoIosCreate } from "react-icons/io";
import CustomTooltip from "./CustomToolTip";
const ProfileDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const { mostPostLike, isGetting } = useMostInteractedPost(user?.uid);
  const noPost = !mostPostLike && isGetting;
  const navigate = useNavigate();
  if (noPost) return <NoPosts />;
  const chartData = [
    { name: "Likes", value: mostPostLike?.likeCount, color: "#ec4899" },
    { name: "Comments", value: mostPostLike?.commentCount, color: "#3b82f6" },
  ];
  return (
    <div className="flex justify-between min-h-[50vh] py-4 max-sm:flex-col max-sm:items-center">
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center">
          <IoIosCreate className="inline text-3xl" />
          <p className="font-bold">
            Bài đăng nhiều lượt thích nhất của bạn
          </p>
        </div>
        <div className="h-[400px] w-[300px] flex justify-center items-center">
          {!isGetting ? (
            <img
              className="object-cover w-20 h-20 rounded-full"
              src="/loading.gif"
              alt="gif"
            />
          ) : (
            <img
              src={mostPostLike?.imageOfPost[0]}
              className="w-full h-full object-cover rounded-md cursor-pointer"
              alt="hình ảnh bài đăng"
              onClick={() => navigate(`/p/${mostPostLike.id}`)}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-center py-2 gap-x-2">
          <button className="px-4 py-1 bg-color-dash rounded-sm cursor-pointer">PieChart</button>
          <button className="px-4 py-1 bg-color-dash rounded-sm cursor-pointer">PieChart</button>
        </div>
        <PieChart width={400} height={380}>
          <Tooltip
            content={
              <CustomTooltip
                totalEngagement={mostPostLike?.likeCount + mostPostLike?.commentCount}
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
            <span className="text-white">❤️ Likes ({mostPostLike?.likeCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span className="text-white">
              💬 Comments ({mostPostLike?.commentCount})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
