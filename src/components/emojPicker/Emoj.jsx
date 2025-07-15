import React, { forwardRef, memo } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const Emoj = forwardRef(({ handleClickEmoj, isOpenModalToEdit }, emojiRef) => {
  return (
    <div
      className={`absolute ${
        isOpenModalToEdit ? "top-[-9rem]" : "top-[-4rem]"
      } z-10`}
      ref={emojiRef}
    >
      <div className="max-h-[210px] overflow-y-auto custom-scrollbar rounded-md shadow-md">
        <Picker
          data={data}
          onEmojiSelect={handleClickEmoj}
              previewPosition="none"
    searchPosition="none"
    navPosition="none"
          perLine={6}
          maxFrequentRows={0}
        />
      </div>
    </div>
  );
});

export default memo(Emoj);
