import React from "react";
import SuggestedHeader from "./suggestedHeader";
import SuggestedUser from "./SuggestedUser";
const SuggestedUsers = () => {
  return (
    <div className="flex flex-col  w-full max-w-[18rem] gap-y-8">
      <SuggestedHeader />
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <p className="text-color-text-gray font-bold ">Gợi ý cho bạn</p>
          <span className="font-semibold cursor-pointer">Xem tất cả</span>
        </div>
        <div className="flex flex-col gap-y-5 mt-2">
          <SuggestedUser name="t1_faker" avatar="faker.jpg" />
          <SuggestedUser name="ronaldinho" avatar="ronaldinho.jpg" />
          <SuggestedUser name="vinicius.jr" avatar="vini.jpg" />
        </div>
      </div>
      <p className="break-words text-xs text-color-text-gray">
        Giới thiệu Trợ giúp Báo chí API Việc làm Quyền riêng tư Điều khoản Vị
        trí Ngôn ngữ Meta đã xác minh
      </p>
      <p className="break-words text-sm text-color-text-gray">© 2025 Instagram from Meta</p>
    </div>
  );
};

export default SuggestedUsers;
