import React, { forwardRef, memo } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const Emoj = forwardRef(({ handleClickEmoj, isOpenModalToEdit }, emojiRef) => {
  return (
    <div className={`absolute ${isOpenModalToEdit ? "top-[-9rem]" :"top-[-4rem]"} max-h-[200px]  custom-scrollbar z-10 `} ref={emojiRef}>
      <Picker data={data} onEmojiSelect={handleClickEmoj} perLine={6}/>
    </div>
  );
});

export default memo(Emoj);