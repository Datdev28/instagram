import { useCallback, useEffect, useRef, useState } from "react";
import AutoResizeTextarea from "../../../components/custom/textarea";
import { FaRegImage } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import Emoj from "../../../components/emojPicker/Emoj";
import { BsEmojiSmile } from "react-icons/bs";
import VoiceChat from "../voiceChat/VoiceChat";
import usePreviewImage from "../../../hooks/usePreviewImage";
import useSendMessage from "../../../hooks/useSendMess";
import { useParams } from "react-router-dom";
import useAuthStore from "../../../store/authStore";
import useUpAndGetImage from "../../../hooks/useUpAndGetImage";
const ChatFooter = ({ isInfoOpen }) => {
  const [showEmoj, setShowEmoj] = useState(false);
  const [recording, setRecording] = useState(false);
  const inputRef = useRef(null);
  const { selectedFile, handleImageChange, setSelectedFile } =
    usePreviewImage();
  const [messInput, setMessInput] = useState("");
  const { handleImageUpload } = useUpAndGetImage();
  const [messSend, setMessSend] = useState(false);
  const user = useAuthStore((state) => state.user);
  const emojiRef = useRef(null);
  const { sendMessage } = useSendMessage();
  const { chatId } = useParams();
  const handleClickSendMess = async () => {
    if (selectedFile.length > 0) {
      setSelectedFile([]);
      setMessSend(false);
      setMessInput("");
      const imageURLs = await handleImageUpload(selectedFile);
      await sendMessage(chatId, user.uid, messInput, imageURLs, "");
    } else {
      if (messInput.length === 0) {
        setMessInput("");
        await sendMessage(chatId, user.uid, "❤️", [], "");
      } else {
        setMessInput("");
        setMessSend(false);
        await sendMessage(chatId, user.uid, messInput, [], "");
      }
    }
  };
  const handleClickEmoj = useCallback(
    (emojiData) => {
      if (messInput.length + emojiData.native.length <= 300) {
        setMessInput((prev) => prev + emojiData.native);
        setShowEmoj(false);
        setMessSend(true);
      }
    },
    [messInput]
  );
  const handleRemovePicked = (index) => {
    const selectedImg = selectedFile.filter((_, i) => i !== index);
    setSelectedFile(selectedImg);
  };
  const handleClickPickedImage = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmoj(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div
      className={`pb-4 w-full absolute bottom-0 bg-black z-50 ${
        isInfoOpen ? "pr-82" : "pr-4"
      } `}
    >
      <div className="flex flex-col border border-color-note rounded-2xl px-4 py-3 gap-y-2">
        {selectedFile.length > 0 && (
          <div className="flex items-center gap-x-5 relative">
            <div
              className="p-6 rounded-sm bg-color-dash cursor-pointer"
              onClick={handleClickPickedImage}
            >
              <FaRegImage />
            </div>
            {selectedFile.map((image, index) => (
              <div className="relative">
                <img
                  className="w-16 h-16 rounded-sm object-cover"
                  src={image}
                  alt="ảnh tải lên"
                />
                <button
                  className="absolute top-[-6px] right-[-10px] bg-black hover:bg-black border border-color-note text-white rounded-full cursor-pointer p-1 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemovePicked(index);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center space-x-3">
          {!recording && (
            <div className="w-4 h-full flex items-center justify-center relative">
              <BsEmojiSmile
                className="cursor-pointer text-2xl max-sm:absolute max-sm:right-0 "
                onClick={() => setShowEmoj(!showEmoj)}
              />
              {showEmoj && (
                <div className="absolute top-[-180px] left-[0px] right-40 max-xl:right-60">
                  <Emoj handleClickEmoj={handleClickEmoj} ref={emojiRef} />
                </div>
              )}
            </div>
          )}
          {!recording && (
            <div className="flex-1 flex items-center py-2">
              <AutoResizeTextarea
                commentInput={messInput}
                setCommentInput={setMessInput}
                setCommentPost={setMessSend}
                isMess={true}
                handleClickSendMess={handleClickSendMess}
              />
            </div>
          )}
          {messSend || selectedFile.length > 0 ? (
            <p
              className="text-blue-500 font-semibold cursor-pointer py-[6px]"
              onClick={handleClickSendMess}
            >
              Send
            </p>
          ) : (
            <div
              className={`flex items-center gap-x-4  ${
                recording ? "flex-1" : ""
              }`}
            >
              <VoiceChat
                setRecording={setRecording}
                handleClickSendMess={handleClickSendMess}
              />
              {!recording && (
                <>
                  <FaRegImage
                    className="cursor-pointer text-4xl"
                    onClick={handleClickPickedImage}
                  />
                  <FaRegHeart className="cursor-pointer text-4xl" 
                   onClick={handleClickSendMess}
                  />
                </>
              )}
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatFooter;
