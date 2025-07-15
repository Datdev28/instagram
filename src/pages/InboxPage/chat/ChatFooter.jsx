import React, { useState } from "react";
import AutoResizeTextarea from "../../../components/custom/textarea";
import { FaRegImage } from "react-icons/fa6";
import { MdKeyboardVoice } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { BsEmojiSmile } from "react-icons/bs";
import Emoj from "../../../components/emojPicker/Emoj";
const ChatFooter = ({isInfoOpen}) => {
  const [showEmoj, setShowEmoj] = useState(false);
  return (
    <div className={`p-4 w-full absolute bottom-0 bg-black z-50 ${isInfoOpen ? "pr-82" : "pr-0"}`}>
      <div className="flex items-center space-x-3 rounded-2xl border border-color-note px-4 py-1">
        <div className="w-4 h-full flex items-center justify-center relative">
          <BsEmojiSmile
            className="cursor-pointer text-2xl max-sm:absolute max-sm:right-0 "
            onClick={() => setShowEmoj(!showEmoj)}
          />
          {showEmoj && (
            <div className="absolute top-[-180px] left-[0px] right-40 max-xl:right-60">
              <Emoj />
            </div>
          )}
        </div>
        <div className="flex-1 flex items-center">
          <AutoResizeTextarea />
        </div>
        <div className="flex items-center gap-x-4 text-xl">
          <MdKeyboardVoice className="cursor-pointer" />
          <FaRegImage />
          <FaRegHeart />
        </div>
      </div>
    </div>
  );
};

export default ChatFooter;
