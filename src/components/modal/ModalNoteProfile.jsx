import React, { useEffect, useRef} from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import Emoj from "../emojPicker/Emoj";
import useAuthStore from "../../store/authStore";
const ModalNote = ({ setModalIsOpenNote, modalIsOpenNote }) => {
  const {user} = useAuthStore();
  const [valueText, setValueText] = useState("");
  const [showEmoj, setShowEmoj] = useState(false)
  const emojiRef = useRef(null); 
  const handleOnChange = (e) => {
    setValueText(e.target.value);
  }
  const handleClickEmoj = (emojiData) => {
    setValueText((prev) => prev + emojiData.native)
  }
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
      <div>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={modalIsOpenNote}
        onRequestClose={() => setModalIsOpenNote(false)}
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
            overflow: "visible",
            maxWidth: "600px",
            width: "100%",
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
          className="bg-color-dash text-white p-4 rounded-3xl w-full flex flex-col items-center gap-y-14 select-none"
        >
          <div className="w-full flex justify-between items-center">
            <span
              className="text-white text-2xl cursor-pointer"
              onClick={() => setModalIsOpenNote(false)}
            >
              ✕
            </span>
            <p className="font-bold text-2xl">Ghi chú mới</p>
            <p className={`text-blue-400 opacity-30 ${valueText ? "opacity-100" : ""} cursor-pointer`}>Chia sẻ</p>
          </div>
          <div className="w-[10rem] h-[10rem] relative">
            <img
              className="w-full h-full object-cover rounded-full cursor-pointer"
              src={user?.profilePicURL || "defaultProfilePic.jpg"}
              alt="avatar"
            />
            <div className="absolute top-[-2.5rem] bg-color-note h-[4rem] w-full rounded-2xl flex items-center px-2">
              <textarea
                placeholder="Chia sẻ suy nghĩ..."
                maxLength={60}
                className="text-sm rounded-xl outline-none resize-none  bg-color-note text-center w-full"
                onChange={(e) => handleOnChange(e)}
                value={valueText}
              ></textarea>
              <div className="absolute bottom-[-0.7rem] left-[1rem] rounded-full  bg-color-note  w-[1.5rem] h-[1.5rem]">
                <div className="absolute top-[1.5rem] left-[1rem] rounded-full  bg-color-note  w-[0.5rem] h-[0.5rem]"></div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center relative">
             <BsEmojiSmile className="cursor-pointer" onClick={() => setShowEmoj(!showEmoj)}/>
              {showEmoj && <Emoj handleClickEmoj={handleClickEmoj} ref={emojiRef}/> }
          </div>
        </motion.div>
      </Modal>
    </div>
    )
};

export default ModalNote;
