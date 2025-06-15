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
import { UserNotFound } from "../ProfilePage/ProfilePage";
import ModalShowLikes from "../../components/modal/ModalShowLikes";
import ModalSaveWithoutLogin from "../../components/modal/ModalSaveWithoutLogin";
const ShowPostPage = () => {
  const { postId } = useParams();
  const [picked, setPicked] = useState(0);
  const { post, isLoading } = useGetPostByPostId(postId);
  const { relatedPosts } = useGetRelatedPosts(post?.createBy, postId);
  const [isOpenModalLikePostWithoutLogin, setIsOpenModalLikePostWithoutLogin] =
    useState(false);
  const [isOpenModalShowLikes, setIsOpenModalShowLikes] = useState(false);
  const [showLikesWithoutLogin, setShowLikesWithoutLogin] = useState(false);
  const [isOpenModalSaveWithoutLogin, setIsOpenModalSaveWithoutLogin] =
    useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postId]);
  const postNotFound = !post && !isLoading;
  if (postNotFound) return <UserNotFound />;
  return (
    post && (
      <div className="flex shrink-0 flex-col lg:max-w-5xl mx-auto gap-y-3 p-4 text-white">
        <div className="flex justify-between items-center sm:hidden max-sm:mt-6">
          <CommentBox
            post={post}
            setIsOpenModalLikePostWithoutLogin={
              setIsOpenModalLikePostWithoutLogin
            }
            setIsOpenModalShowLikes={setIsOpenModalShowLikes}
            setShowLikesWithoutLogin={setShowLikesWithoutLogin}
            setIsOpenModalSaveWithoutLogin={setIsOpenModalSaveWithoutLogin}
            responsiveMobile={true}
          />
        </div>

        <div className="flex w-full max-sm:flex-col max-sm:flex-2 max-sm:gap-y-2 sm:max-h-[80vh] min-h-[600px]">
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
              setIsOpenModalShowLikes={setIsOpenModalShowLikes}
              setShowLikesWithoutLogin={setShowLikesWithoutLogin}
              setIsOpenModalSaveWithoutLogin={setIsOpenModalSaveWithoutLogin}
            />
          </div>
          <div className="sm:hidden flex-2 flex flex-col text-sm">
            <InteractWithPost
              post={post}
              setIsOpenModalLikePostWithoutLogin={
                setIsOpenModalLikePostWithoutLogin
              }
              setIsOpenModalShowLikes={setIsOpenModalShowLikes}
              setShowLikesWithoutLogin={setShowLikesWithoutLogin}
              setIsOpenModalSaveWithoutLogin={setIsOpenModalSaveWithoutLogin}
            />
          </div>
        </div>
        <hr className="border border-color-dash sm:mt-4"/>
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
              showLikesWithoutLogin={showLikesWithoutLogin}
            />
          )}
          {isOpenModalShowLikes && (
            <ModalShowLikes
              post={post}
              isOpenModalShowLikes={isOpenModalShowLikes}
              setIsOpenModalShowLikes={setIsOpenModalShowLikes}
            />
          )}
          {isOpenModalSaveWithoutLogin && (
            <ModalSaveWithoutLogin
              isOpenModalSaveWithoutLogin={isOpenModalSaveWithoutLogin}
              setIsOpenModalSaveWithoutLogin={setIsOpenModalSaveWithoutLogin}
              post={post}
            />
          )}
        </div>
        <Footer />
      </div>
    )
  );
};

export default ShowPostPage;
