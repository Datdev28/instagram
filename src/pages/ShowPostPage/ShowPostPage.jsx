import React, { useEffect, useState } from "react";
import SlideImage from "../../components/slideImage/SlideImage";
import CommentBox from "../../components/comments/CommentBox";
import { useNavigate, useParams } from "react-router-dom";
import useGetPostByPostId from "../../hooks/useGetPostByPostId";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import convertDateTime from "../../utils/convertDateTime";
import useGetRelatedPosts from "../../hooks/useGetRelatedPosts";
import { FaHeart } from "react-icons/fa6";
import { FaComment } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";
import Footer from "../../components/footer/Footer";
const ShowPostPage = () => {
  const { postId } = useParams();
  const [picked, setPicked] = useState(0);
  const { post } = useGetPostByPostId(postId);
  const { relatedPosts } = useGetRelatedPosts(post?.createBy, postId);
  const navigate = useNavigate()
  useEffect(() => {
  window.scrollTo(0, 0);
}, [postId]);
  return (
    post && (
      <div className="flex flex-col lg:max-w-5xl mx-auto gap-y-12 p-4 text-white">
        <div className=" flex w-full max-sm:flex-col max-sm:flex-2 max-sm:gap-y-4">
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
        <hr className="border border-color-dash" />
        <div className="flex flex-col gap-y-2">
          <p className="text-color-text-gray text-sm font-semibold">
            Thêm các bài viết từ{" "}
            <span className="text-white">{post.byUserName}</span>
          </p>
          {relatedPosts && (
            <div className="grid grid-cols-3 gap-1 w-full"
            >
              {relatedPosts.length > 0 &&
                relatedPosts.map((item) => (
                  <div className="flex relative group"
                   onClick={() => navigate(`/p/${item.id}`)}
                  
                  >
                    <img
                      src={item.imageOfPost[0]}
                      className="object-cover w-full max-h-[440px] hover:opacity-40 cursor-pointer"
                      alt="bài đăng"
                    />
                    <div className="flex absolute top-1/2 left-1/2 items-center gap-x-6 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-white">
                      <div className="flex items-center gap-x-2">
                        <FaHeart />
                        <span className="font-semibold text-xl mt-[-3px]">
                          {item.likes.length}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <FaComment />
                        <span className="font-semibold text-xl mt-[-3px]">
                          {item.comments.length}
                        </span>
                      </div>
                    </div>
                    {item.imageOfPost.length > 1 && (
                      <div className="absolute top-2 right-2">
                        <IoMdImages className="text-xl" />
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
        <Footer/>
      </div>
    )
  );
};

export default ShowPostPage;
