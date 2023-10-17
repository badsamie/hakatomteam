import React, { useState, useRef } from "react";
import AarneAudio from "./Aarne.mp3";

const Sound = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const audioUrl = AarneAudio; // Путь к аудиофайлу

  const playPauseHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="mt-10">
      <audio src={audioUrl} ref={audioRef}></audio>
      <div className="controls">
        <button onClick={playPauseHandler}>
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
};

export default Sound;
