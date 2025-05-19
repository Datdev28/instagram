import React from "react";
import Posts from "../../components/posts/posts";
import SuggestedUsers from "../../components/suggestedUser/SuggestedUsers"
const HomePage = () => {
  return (
    <div className="flex w-full pt-6 text-sm text-white">
      <div className="flex-7 max-sm:px-2 flex justify-center">
        <Posts />
      </div>
      <div className="flex-3 max-lg:hidden px-2">
        <SuggestedUsers/>
      </div>
    </div>
  );
};

export default HomePage;
