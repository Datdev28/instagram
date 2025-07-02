import { useState } from "react";
import ModalShowLikes from "../modal/ModalShowLikes";
const PostFooter = ({ post }) => {
  const [isOpenModalShowLikes, setIsOpenModalShowLikes] = useState(false);
  return (
    <div className="flex flex-col gap-y-2">
      {isOpenModalShowLikes && (
        <ModalShowLikes
          post={post}
          isOpenModalShowLikes={isOpenModalShowLikes}
          setIsOpenModalShowLikes={setIsOpenModalShowLikes}
        />
      )}
    </div>
  );
};

export default PostFooter;
