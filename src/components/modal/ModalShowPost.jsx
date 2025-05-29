import React, { useState } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import userProfileStore from "../../store/userProfileStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import usePostStore from "../../store/postStore";
import useGetPostFromArray from "../../utils/getPostFromArray";
import SlideImage from "../slideImage/SlideImage";
import CommentBox from "../comments/CommentBox";
const ModalShowPost = () => {
  const navigate = useNavigate()
  const {postId} = useParams();
  const [picked, setPicked] = useState(0);
  const post = useGetPostFromArray(postId); 
  console.log("post", post);
  console.log("post caption", post?.caption);
  return (
    <div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={true}
        onRequestClose={() => navigate(-1)}
        preventScroll={false}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 50,
          },
          content: {
            top: "5rem",
            left: "auto",
            right: "auto",
            bottom: "auto",
            padding: 0,
            border: "none",
            background: "transparent",
            borderRadius: "0.5rem",
            overflow: "hidden",
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
          className="bg-color-dash text-white w-full flex"
        >
          {post && (
            <div className="flex-1 flex shrink-0 max-w-[450px]">
              <SlideImage picked={picked} setPicked={setPicked} selectedFile={post.imageOfPost}/>
            </div>
          )}
          <div className="flex flex-1 max-w-[450px]">
             <CommentBox post={post}/>
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default ModalShowPost;
