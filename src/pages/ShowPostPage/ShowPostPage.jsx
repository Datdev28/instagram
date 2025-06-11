import { useEffect, useState } from "react";
import SlideImage from "../../components/slideImage/SlideImage";
import CommentBox from "../../components/commentBox/CommentBox";
import { useNavigate, useParams } from "react-router-dom";
import useGetPostByPostId from "../../hooks/useGetPostByPostId";
import useGetRelatedPosts from "../../hooks/useGetRelatedPosts";
import { FaHeart } from "react-icons/fa6";
import { FaComment } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";
import Footer from "../../components/footer/Footer";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import InteractWithPost from "../../components/commentBox/InteractWithPost";
import ModalLikePostWithoutLogin from "../../components/modal/ModalLikePostWithoutLogin";
const ShowPostPage = () => {
  const { postId } = useParams();
  const [picked, setPicked] = useState(0);
  const { post } = useGetPostByPostId(postId);
  const { relatedPosts } = useGetRelatedPosts(post?.createBy, postId);
  const [isOpenModalLikePostWithoutLogin, setIsOpenModalLikePostWithoutLogin] =
    useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postId]);
  return (
    post && (
      <div className="flex shrink-0 flex-col lg:max-w-5xl mx-auto gap-y-4 p-4 text-white">
        <div className="flex px-4 justify-between items-center sm:hidden max-sm:mt-6">
          <div className="flex items-center gap-x-4">
            <img
              src={post.byAvaUser}
              className="w-8 h-8 rounded-full object-cover cursor-pointer"
              alt="hình ảnh đại diện"
              onClick={() => navigate(`/${post.byUserName}`)}
            />
            <p
              className="text-sm cursor-pointer font-bold hover:text-color-text-gray"
              onClick={() => navigate(`/${post.byUserName}`)}
            >
              {post.byUserName}
            </p>
          </div>
          <HiOutlineDotsHorizontal className="cursor-pointer text-2xl" />
        </div>
        <div className=" flex w-full max-sm:flex-col max-sm:flex-2 max-sm:gap-y-4 sm:max-h-[80vh] min-h-[600px]">
          <div className="flex-[3] flex ">
            <SlideImage
              picked={picked}
              setPicked={setPicked}
              selectedFile={post.imageOfPost}
            />
          </div>
          <div className="flex flex-2 border border-color-btn-gray border-l-0 max-sm:hidden ">
            <CommentBox
              post={post}
              setIsOpenModalLikePostWithoutLogin={
                setIsOpenModalLikePostWithoutLogin
              }
            />
          </div>
          <div className="sm:hidden flex-2 flex flex-col text-sm">
            <InteractWithPost post={post} setIsOpenModalLikePostWithoutLogin={setIsOpenModalLikePostWithoutLogin}/>
          </div>
        </div>
        <hr className="border border-color-dash mt-4" />
        <div className="flex flex-col gap-y-2 mt-2">
          {relatedPosts.length > 0 && (
            <p className="text-color-text-gray text-sm font-semibold">
              Thêm các bài viết từ{" "}
              <span className="text-white">{post.byUserName}</span>
            </p>
          )}
          {relatedPosts && (
            <div className="grid grid-cols-3 gap-1 w-full">
              {relatedPosts.length > 0 &&
                relatedPosts.map((item) => (
                  <div
                    key={item.id}
                    className="flex relative group"
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
          {isOpenModalLikePostWithoutLogin && (
            <ModalLikePostWithoutLogin
              isOpenModalLikePostWithoutLogin={isOpenModalLikePostWithoutLogin}
              setIsOpenModalLikePostWithoutLogin={
                setIsOpenModalLikePostWithoutLogin
              }
            />
          )}
        </div>
        <Footer />
      </div>
    )
  );
};

export default ShowPostPage;
