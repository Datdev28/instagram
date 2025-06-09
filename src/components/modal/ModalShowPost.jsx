import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import SlideImage from "../slideImage/SlideImage";
import CommentBox from "../comments/CommentBox";
import useGetPostByPostId from "../../hooks/useGetPostByPostId";
const ModalShowPost = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [picked, setPicked] = useState(0);
  const {post} = useGetPostByPostId(postId);
  console.log("post", post)
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);
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
          className="bg-color-dash text-white flex w-full max-h-[90vh]"
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
            <CommentBox post={post} />
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default ModalShowPost;
