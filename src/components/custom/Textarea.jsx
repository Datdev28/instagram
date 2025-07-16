import React, { memo, useRef } from "react";

const AutoResizeTextarea = ({setCommentInput, commentInput, setCommentPost, handleComment,  isMess = false}) => {
  const textareaRef = useRef(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; 
      const maxHeight = 24 * 4; 
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    }
  };
  const handleOnKeyDown = (e) => {
     if(e.key === "Enter"){
      e.preventDefault();
      handleComment();
     }
  }
  const handleOnChage = (e) => {
    setCommentInput(e.target.value);
    if(e.target.value.trim().length > 0){
      setCommentPost(true);
    }else {
      setCommentPost(false);
    }
  }
  return (
    <textarea
      ref={textareaRef}
      placeholder={`${isMess ? "Nhắn tin..." : "Bình luận..."}`}
      rows={1}
      cols={32}
      onChange={handleOnChage}
      onKeyDown={handleOnKeyDown}
      value={commentInput}
      maxLength={isMess ? 1000 : 300}
      onInput={handleInput}
      className="placeholder:text-color-text-gray custom-scrollbar text-white outline-none resize-none w-full"
      style={{ lineHeight: "24px", maxHeight: "120px" }}
    />
  );
};

export default memo(AutoResizeTextarea);
