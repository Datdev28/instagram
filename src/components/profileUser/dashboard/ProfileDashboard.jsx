import useMostInteractedPost from "../../../hooks/useMostInteractedPost";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import useAuthStore from "../../../store/authStore";
import { NoPosts } from "../ProfileUserPosts";
import { useNavigate } from "react-router-dom";
const ProfileDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const { post, isGetting } = useMostInteractedPost(user?.uid);
  const noPost = !post && isGetting;
  const navigate = useNavigate();
  if (noPost) return <NoPosts />;
  const chartData = [
    { name: 'Likes', value: post?.likeCount, color: '#ec4899' },
    { name: 'Comments', value: post?.commentCount, color: '#3b82f6' }
  ];
  return (
    <div className="flex justify-between min-h-[50vh] py-4">
      <div className="flex flex-col gap-y-4">
        <p className="text-xl font-bold">Bài viết có nhiều lượt thích nhất</p>
        <div className="h-[400px] w-[300px] flex justify-center items-center">
          {!isGetting ? (
            <img
              className="object-cover w-20 h-20 rounded-full"
              src="/loading.gif"
              alt="gif"
            />
          ) : (
            <img
              src={post?.imageOfPost[0]}
              className="w-full h-full object-cover rounded-md cursor-pointer"
              alt="hình ảnh bài đăng"
              onClick={() => navigate(`/p/${post.id}`)}
            />
          )}
          <PieChart width={400} height={300}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
