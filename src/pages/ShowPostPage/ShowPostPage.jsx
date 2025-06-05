import React, { useState } from "react";
import SlideImage from "../../components/slideImage/SlideImage";
import CommentBox from "../../components/comments/CommentBox";
import { useParams } from "react-router-dom";
import useGetPostByPostId from "../../hooks/useGetPostByPostId";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import convertDateTime from "../../utils/convertDateTime";
const ShowPostPage = () => {
  const { postId } = useParams();
  const [picked, setPicked] = useState(0);
  const { post, isLoading } = useGetPostByPostId({ postId });
  return (
    post && (
      <div className="flex flex-col lg:max-w-5xl mx-auto gap-y-12 p-4 ">
        <div className="text-white flex w-full max-sm:flex-col max-sm:flex-2 max-sm:gap-y-4">
          <div className="flex-3 flex shrink-0">
            <SlideImage
              picked={picked}
              setPicked={setPicked}
              selectedFile={post.imageOfPost}
            />
          </div>
          <div className="flex flex-2 border border-color-btn-gray border-l-0 max-sm:hidden">
            <CommentBox post={post} />
          </div>
          <div className="sm:hidden flex-2 flex flex-col gap-y-[5px] text-sm">
            <div className="flex justify-between items-center text-2xl">
              <div className="flex items-center gap-x-4 ">
                <FaRegHeart className="cursor-pointer" />
                <FaRegComment className="cursor-pointer" />
              </div>
              <FaRegBookmark className="cursor-pointer" />
            </div>
            <p>100 Lượt thích</p>
            <p className="break-all">
              <span className="mr-2 font-semibold">{post.byUserName}</span>
              {post.caption}
            </p>
            <p className="text-sm text-color-text-gray">
              {convertDateTime(post.createdAt)} trước
            </p>
          </div>
        </div>
        <hr className="border border-color-dash"/>
         <div className="flex flex-col gap-y-2">
            <p></p>
        </div>
      </div>
    )
  );
};

export default ShowPostPage;
