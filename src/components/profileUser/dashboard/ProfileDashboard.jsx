import useMostInteractedPost from "../../../hooks/useMostInteractedPost";
import { BsFillPieChartFill } from "react-icons/bs";
import { IoBarChart } from "react-icons/io5";
import useAuthStore from "../../../store/authStore";
import { NoPosts } from "../ProfileUserPosts";
import { useNavigate } from "react-router-dom";
import { IoIosCreate } from "react-icons/io";
import PieChartPost from "./PieChartPost";
import BarChartPost from "./BarChartPost";
import { useState } from "react";
const ProfileDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const { mostPostLike, isGetting } = useMostInteractedPost(user?.uid);
  const noPost = !mostPostLike && isGetting;
  const navigate = useNavigate();
  const [pickChart, setPickChart] = useState("pie");
  if (noPost) return <NoPosts />;
  const chartData = [
    { name: "Likes", value: mostPostLike?.likeCount, color: "#ec4899" },
    { name: "Comments", value: mostPostLike?.commentCount, color: "#3b82f6" },
  ];
  return (
    <div className="flex justify-between min-h-[50vh] py-4 max-md:flex-col max-md:items-center max-md:gap-y-10">
      {mostPostLike && (
        <>
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center">
              <IoIosCreate className="inline text-3xl" />
              <p className="font-bold">
                Bài đăng nhiều lượt thích nhất của bạn
              </p>
            </div>
            <div className="h-[400px] w-[300px] flex justify-center items-center">
              <img
                src={mostPostLike?.imageOfPost[0]}
                className="w-full h-full object-cover rounded-md cursor-pointer"
                alt="hình ảnh bài đăng"
                onClick={() => navigate(`/p/${mostPostLike.id}`)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-center py-2 gap-x-2">
              <button
                className={`${
                  pickChart === "pie" ? "bg-blue-500" : "bg-color-dash"
                } px-4 py-1 flex gap-x-2 items-center rounded-sm cursor-pointer`}
                onClick={() => setPickChart("pie")}
              >
                <BsFillPieChartFill />
                <p>Pie chart</p>
              </button>
              <button
                className={`${
                  pickChart === "bar" ? "bg-blue-500" : "bg-color-dash"
                } px-4 py-1 flex gap-x-2 items-center rounded-sm cursor-pointer`}
                onClick={() => setPickChart("bar")}
              >
                <IoBarChart />
                <p>Bar chart</p>
              </button>
            </div>
            {pickChart === "bar" ? (
              <BarChartPost chartData={chartData} mostPostLike={mostPostLike} />
            ) : (
              <PieChartPost chartData={chartData} mostPostLike={mostPostLike} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDashboard;
