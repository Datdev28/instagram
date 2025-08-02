import { useRef, useState, useEffect } from "react";
import { Play, Pause, X } from "lucide-react";
import useSendMessage from "../../../hooks/useSendMess";
import useUploadAudio from "../../../hooks/useUploadAudio";
import { useParams } from "react-router-dom";
import useAuthStore from "../../../store/authStore";

const VoiceChat = ({ setRecording }) => {
  const [isRecording, setIsRecording] = useState(false);
  const {chatId} = useParams();
  const user = useAuthStore(state => state.user);
  const [audioURL, setAudioURL] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [waveformData, setWaveformData] = useState(Array(40).fill(0));

  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const timerRef = useRef(null);
  const streamRef = useRef(null);
  const audioRef = useRef(null);
  const animationRef = useRef(null);
  const {sendMessage} = useSendMessage();
  const {uploadAudio} = useUploadAudio();
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);

  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        setWaveformData((prev) =>
          prev.map(() => {
            const random = Math.random();
            if (random < 0.1) return Math.random() * 100;
            if (random < 0.3) return Math.random() * 60;
            return Math.random() * 30;
          })
        );
        animationRef.current = requestAnimationFrame(animate);
      };
      animate();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setWaveformData(
        Array(40)
          .fill(0)
          .map(() => Math.random() * 40 + 10)
      );
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  const formatTime = (seconds) => {
    if (!isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunks.current = [];
      setRecording(true);
      setIsRecording(true);
      setRecordingTime(0);
      setAudioURL(null);

      mediaRecorderRef.current.ondataavailable = (e) => {
        audioChunks.current.push(e.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        const file = new File([blob], `voice-${Date.now()}.webm`, {
          type: "audio/webm",
        });
        setAudioFile(file);
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }
      };
      mediaRecorderRef.current.start();
    } catch {
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      console.log("Dừng ghi âm");
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setRecordingTime(0);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    }
    setAudioURL(null);
    setRecording(false);
    setRecordingTime(0);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleWaveformClick = (e) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

 const handleClickSendVoice = async () => {
  if (!audioFile) return;
      setAudioURL(null);
    setAudioFile(null);
    setRecording(false);
  const uploadedUrl = await uploadAudio(audioFile); 
  if (uploadedUrl) {
    await sendMessage(chatId, user?.uid, "", [], uploadedUrl); 
  }
};
  if (isRecording) {
    return (
      <div className="text-white rounded-3xl h-10 w-full">
        <div className="flex items-center space-x-3 w-full">
          <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-blue-400 transition-all duration-1000 ease-linear"
              style={{ width: `${Math.min((recordingTime / 60) * 100, 100)}%` }}
            />
          </div>
          <button
            onClick={stopRecording}
            className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer"
          >
            <div className="w-3 h-3 bg-white rounded-sm"></div>
          </button>

          <div className="bg-gray-700 rounded-full px-3 py-1 text-sm font-mono">
            {formatTime(recordingTime)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {!audioURL && (
        <div className="flex items-center space-x-4 justify-end">
          <div
            onClick={toggleRecording}
            className="inline-block p-3rounded-full cursor-pointer select-none"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          </div>
        </div>
      )}
      {audioURL && (
        <div className="flex items-center gap-x-2 w-full">
          <button
            onClick={cancelRecording}
            className=" p-1 bg-white rounded-full flex items-center justify-center  cursor-pointer"
          >
            <X className="w-4 h-4 text-black" />
          </button>
          <div className="bg-blue-500 rounded-3xl shadow-sm px-3 w-full">
            <div className="flex items-center space-x-3">
              <button
                onClick={togglePlayPause}
                className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="w-3 h-3 text-blue-500" fill="blue" />
                ) : (
                  <Play className="w-3 h-3 text-blue-500 ml-0.5" fill="blue" />
                )}
              </button>
              <div className="flex-1 px-2">
                <div
                  className="flex items-center justify-center space-x-0.5 h-10 crsor-pointer"
                  onClick={handleWaveformClick}
                >
                  {waveformData.map((height, index) => {
                    const progress = duration ? currentTime / duration : 0;
                    const isActive = index < progress * waveformData.length;
                    return (
                      <div
                        key={index}
                        className={`rounded-full transition-all duration-75 ${
                          isActive ? "bg-black" : "bg-gray-300"
                        }`}
                        style={{
                          width: "2px",
                          height: `${Math.max(4, height / 2)}px`,
                          opacity: isActive ? 1 : 0.6,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="text-xs text-white font-medium min-w-[35px] text-right">
                {formatTime(Math.floor(currentTime || duration))}
              </div>
            </div>
            <audio
              ref={audioRef}
              src={audioURL}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleAudioEnded}
              className="hidden"
            />
          </div>
          <p className=" text-blue-500 px-4 rounded-full text-sm font-medium cursor-pointer"
           onClick={handleClickSendVoice}
          >
            Send
          </p>
        </div>
      )}
    </div>
  );
};

export default VoiceChat;
