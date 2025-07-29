import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

const VoicePlayer = ({ src, isOwn }) => {
  const audioRef = useRef(null);
  const animationRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [waveformData, setWaveformData] = useState(Array(40).fill(10));

  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        setWaveformData((prev) =>
          prev.map((prevVal) =>
            prevVal * 0.5 + Math.random() * 20 * 0.5 
          )
        );
        animationRef.current = requestAnimationFrame(animate);
      };
      animate();
    } else {
      cancelAnimationFrame(animationRef.current);
    }

    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const formatTime = (seconds) => {
    if (!isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
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

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleWaveformClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    const newTime = percent * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className={`${isOwn ? "bg-blue-500" : "bg-color-dash"} rounded-full px-3 py-1 shadow w-full max-w-xs mt-3`}>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => {
            togglePlayPause();
            setIsPlaying(!isPlaying);
          }}
          className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
        >
          {isPlaying ? (
            <Pause className={`w-4 h-4 ${isOwn ? "text-blue-500" : "text-black" } cursor-pointer`} />
          ) : (
            <Play className={`w-4 h-4 ${isOwn ? "text-blue-500" : "text-black" } ml-0.5 cursor-pointer`} />
          )}
        </button>

        <div className="flex-1" onClick={handleWaveformClick}>
          <div className="flex items-center gap-[1px] h-10 cursor-pointer">
            {waveformData.map((height, index) => {
              const progress = duration ? currentTime / duration : 0;
              const isActive = index < progress * waveformData.length;
              return (
                <div
                  key={index}
                  className={`rounded-full ${
                    isActive ? "bg-black" : "bg-gray-300"
                  }`}
                  style={{
                    width: "3px",
                    height: `${Math.max(6, height * 1.2)}px`,
                    opacity: isActive ? 1 : 0.6,
                    transition: "height 0.2s ease",
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="text-xs text-white min-w-[35px] text-right font-mono">
          {formatTime(currentTime || duration)}
        </div>
      </div>

      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        className="hidden"
      />
    </div>
  );
};

export default VoicePlayer;
