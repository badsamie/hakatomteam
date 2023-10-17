import React, { useState, useRef } from "react";
import toto from "./toto.mp3";
import { MusicNoteOutlined, MusicOffOutlined } from "@mui/icons-material";

const Sound = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const audioUrl = toto;

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
      <div className="control text-black uppercase font-light -mt-10 ">
        <button onClick={playPauseHandler}>
          {isPlaying ? <MusicNoteOutlined/> : <MusicOffOutlined/>}
        </button>
      </div>
    </div>
  );
};

export default Sound;
