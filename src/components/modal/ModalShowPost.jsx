import { useEffect, useState } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import SlideImage from "../slideImage/SlideImage";
import CommentBox from "../commentBox/CommentBox";
import useGetPostByPostId from "../../hooks/useGetPostByPostId";
import ModalShowLikes from "./ModalShowLikes";
import useIsBlockedUser from "../../hooks/useIsBlockedUser";
const ModalShowPost = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [picked, setPicked] = useState(0);
  const {post} = useGetPostByPostId(postId);
  const {isBlocked} = useIsBlockedUser(post?.createBy);
  const [isOpenModalShowLikes, setIsOpenModalShowLikes] = useState(false);
  useEffect(() => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollbarWidth}px`;

  return () => {
    document.body.style.overflow = "unset";
    document.body.style.paddingRight = "0px";
  };
}, []);
  useEffect(() => {
    if(isBlocked && post) navigate('/404');
  },[isBlocked, post])
  return (
    <div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={true}
        onRequestClose={() => navigate(-1)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 50,
            width: "100%",
          },
          content: {
            top: "auto",
            left: "auto",
            right: "auto",
            bottom: "auto",
            padding: 0,
            border: "none",
            background: "transparent",
            borderRadius: "0.5rem",
            overflow: "visible",
            width: "100%",
            maxWidth: "900px",
          },
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="bg-color-dash text-white flex w-full max-h-[90vh] "
        >
          {post && (
            <div className="flex-1 max-w-[500px]">
              <SlideImage
                picked={picked}
                setPicked={setPicked}
                selectedFile={post.imageOfPost}
                fromModalShow={true}
              />
            </div>
          )}
          <div className="flex flex-1 max-w-[400px]">
            <CommentBox post={post} setIsOpenModalShowLikes={setIsOpenModalShowLikes}/>
          </div>
          {isOpenModalShowLikes && (
            <ModalShowLikes isOpenModalShowLikes={isOpenModalShowLikes} setIsOpenModalShowLikes={setIsOpenModalShowLikes} post={post}/>
          )}
        </motion.div>
      </Modal>
    </div>
  );
};

export default ModalShowPost;
