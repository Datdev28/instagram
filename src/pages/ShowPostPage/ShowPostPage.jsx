import React, { useState } from "react";
import SlideImage from "../../components/slideImage/SlideImage";
import CommentBox from "../../components/comments/CommentBox";
import useGetPostFromArray from "../../hooks/useGetPostFromArray";
import { useParams } from "react-router-dom";
const ShowPostPage = () => {
  const { postId } = useParams();
  const [picked, setPicked] = useState(0);
  const post = useGetPostFromArray(postId);
  console.log(2);
  return (
    <div
      className=" text-white flex w-full"
    >
      ádasdsad
      ádasdsadqưqwqwqwqwqwqwq
      ádasdsad
      ádasdsad
      {/* {post && (
        <div className="flex-1 flex shrink-0 max-w-[500px]">
          <SlideImage
            picked={picked}
            setPicked={setPicked}
            selectedFile={post.imageOfPost}
          />
        </div>
      )}
      <div className="flex flex-1 max-w-[400px]">
        <CommentBox post={post} />
      </div> */}
    </div>
  );
};

export default ShowPostPage;
