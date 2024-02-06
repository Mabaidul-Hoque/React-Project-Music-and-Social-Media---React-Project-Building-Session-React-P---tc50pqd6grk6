"use client";

import { useEffect, useRef } from "react";

export function Player() {
  const audioRef = useRef();
  const playMusic = () => {
    audioRef.current.play();
  };
  const pauseMusic = () => {
    audioRef.current.pause();
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="https://newton-project-resume-backend.s3.amazonaws.com/audio/64cf907d47ae38c3e33a189a.mp3"
      />
      <button onClick={playMusic}>Play music</button>
      <button onClick={pauseMusic}>Pause music</button>
    </>
  );
}
