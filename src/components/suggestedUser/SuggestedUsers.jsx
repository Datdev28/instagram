import SuggestedHeader from "./suggestedHeader";
import SuggestedUser from "./SuggestedUser";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
const SuggestedUsers = () => {
  const { suggestedUsers } = useGetSuggestedUsers();
  return (
    suggestedUsers && (
      <div className="flex flex-col  w-full max-w-[18rem] gap-y-8">
        <SuggestedHeader />
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <p className="text-color-text-gray font-bold ">Gợi ý cho bạn</p>
            <Link to="/explore">
              <span className="font-semibold cursor-pointer">Xem tất cả</span>
            </Link>
          </div>
          <div className="flex flex-col gap-y-5 mt-2">
            {suggestedUsers.slice(0, 5).map((user) => (
              <SuggestedUser key={user.uid} user={user} />
            ))}
          </div>
        </div>
        <Footer/>
      </div>
    )
  );
};

export default SuggestedUsers;
