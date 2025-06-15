import React from "react";

const ProfileSavePost = () => {
  return (
    <div className="w-full flex flex-col mt-4 gap-y-6">
      <div className="flex justify-between items-center max-sm:px-4 whitespace-nowrap max-sm:gap-x-4">
        <p className="text-color-text-gray text-xs">
          Chỉ mình bạn mới có thể xem mục đã lưu
        </p>
        <p className="cursor-pointer text-blue-500 max-sm:text-xs">
          + Bộ sưu tập mới
        </p>
      </div>
      <div className="flex max-sm:justify-center">
        <div className="w-[280px] h-[280px] relative bg-gradient-to-b from-black to-color-dash hover:from-black hover:to-black border border-color-btn-gray cursor-pointer">
          <img
            src="/background1.jpg"
            alt="thumbnail"
            className="absolute top-0 right-0 w-1/4 aspect-square object-cover rounded-bl-md"
          />
          <p className="absolute bottom-6 left-6">Tất cả bài viết</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSavePost;
