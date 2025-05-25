import React, { forwardRef, memo } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const Emoj = forwardRef(({ handleClickEmoj }, emojiRef) => {
  return (
    <div className="absolute top-[-4rem] max-h-[200px] custom-scrollbar overflow-auto z-10" ref={emojiRef}>
      <Picker data={data} onEmojiSelect={handleClickEmoj} perLine={6}/>
    </div>
  );
});

export default memo(Emoj);