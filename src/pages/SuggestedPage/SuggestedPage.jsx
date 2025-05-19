import React from "react";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";
import SuggestedUser from "../../components/suggestedUser/SuggestedUser";
import { BsFillPatchQuestionFill } from "react-icons/bs";
const SuggestedPage = () => {
  const { suggestedUsers, isLoading } = useGetSuggestedUsers();
  const findSuggestedUsers = suggestedUsers.length > 0 && !isLoading; 
  return (
    <div className="w-full flex flex-col text-white items-center gap-y-10">
      {findSuggestedUsers ? (
        <div className="flex flex-col gap-y-5 mt-10 sm:w-md max-sm:w-[320px]">
          <p className="text-xl font-bold">Gợi ý</p>
          {suggestedUsers.map((user) => (
            <SuggestedUser key={user.uid} user={user} />
          ))}
        </div>
      ) : (
        <div className="w-full h-[80vh] flex items-center justify-center flex-col gap-y-2">
          <BsFillPatchQuestionFill className="text-7xl text-color-btn-gray" />
          <p className="text-xl">Bạn không còn gợi ý nào</p>
        </div>
      )}
      <p className="break-words text-xs text-color-text-gray">
        Giới thiệu Trợ giúp Báo chí API Việc làm Quyền riêng tư Điều khoản Vị
        trí Ngôn ngữ Meta đã xác minh
      </p>
      <p className="break-words text-sm text-color-text-gray">
        © 2025 Instagram from Meta
      </p>
    </div>
  );
};

export default SuggestedPage;
