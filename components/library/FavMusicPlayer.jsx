"use client";
import "../styles/musicStyle.css";
import {
  Box,
  Button,
  Paper,
  Slider,
  Stack,
  Typography,
  styled,
} from "@mui/material";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";

import { useMusicContext } from "@/context/MusicDataProvider";

import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { TokenContext } from "@/context/AuthProvider";

const MusicSlider = styled(Slider)({
  color: "#0C936C",
  width: "15vw",
  height: 8,

  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
});

export function FavMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const currentTimeInterval = useRef();
  const audioRef = useRef();
  const { token } = useContext(TokenContext);
  const { currFav } = useMusicContext().favSongsData;

  const getTimeInString = (time) => {
    const minutes = String(parseInt(time / 60));
    const seconds = String(time % 60);
    return `${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
  };

  const playPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      clearInterval(currentTimeInterval.current);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      currentTimeInterval.current = setInterval(() => {
        updateCurrentTime();
      }, 1000);
    }
  };

  const updateCurrentTime = () => {
    setCurrentTime((prev) => {
      if (prev === totalTime) {
        setIsPlaying(false);
        clearInterval(currentTimeInterval.current);
        setCurrentTime(0);
      }
      return Math.ceil(audioRef.current.currentTime);
    });
  };

  const updateTotalTime = () => {
    const interval = setInterval(() => {
      const duration = audioRef.current.duration;
      if (duration) {
        setTotalTime(Math.ceil(duration));
        clearInterval(interval);
      }
    }, 200);
  };

  useEffect(() => {
    if (currFav && token) {
      setIsPlaying(false);
      updateTotalTime();
      setCurrentTime(0);
      setVolume(audioRef.current.volume * 100);
    }
    return () => {
      clearInterval(currentTimeInterval.current);
    };
  }, [currFav, token]);

  if (!currFav) return null;

  return (
    <Paper style={styles.container}>
      {/* current music thumbnail */}
      <img style={styles.thumbnail} src={currFav.thumbnail} />
      {/* song title and artist name */}
      <Stack textAlign={"center"}>
        <Typography variant="h5" sx={{ fontWeight: "700", color: "#FFFFFF" }}>
          {currFav.title}
        </Typography>
        <Typography
          sx={{ fontSize: "14px", fontWeight: "600", color: "#FFFFFF" }}
        >
          {currFav.artist.map((artist) => artist.name).join(" & ")}
        </Typography>
      </Stack>
      {/* play btn */}
      <Button
        onClick={playPause}
        sx={{
          width: "4rem",
        }}
      >
        {isPlaying ? (
          <PauseCircleOutlineIcon fontSize="large" />
        ) : (
          <PlayCircleOutlineOutlinedIcon fontSize="large" />
        )}
      </Button>
      {/* current time and total time section */}
      <Stack flexDirection={"row"} gap={1}>
        <Typography sx={{ fontWeight: "500", color: "#FFFFFF" }}>
          {getTimeInString(currentTime)}
        </Typography>
        <Typography sx={{ fontWeight: "500", color: "#FFFFFF" }}>/</Typography>
        <Typography sx={{ fontWeight: "500", color: "#FFFFFF" }}>
          {getTimeInString(totalTime)}
        </Typography>
      </Stack>
      {/* song forward backword slider */}
      <MusicSlider
        value={currentTime}
        min={0}
        max={totalTime}
        valueLabelDisplay="auto"
        aria-label="time slider"
        onChange={(e) => {
          setCurrentTime(e.target.value);
          audioRef.current.currentTime = e.target.value;
        }}
      />
      {/* volume forward backword */}
      <Stack
        flexDirection={"row"}
        gap={3}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <div className="volume-icon">
          <VolumeUpIcon
            sx={{
              cursor: "pointer",
            }}
            fontSize="large"
            htmlColor="white"
          />
          <MusicSlider
            className="volume-slider"
            value={volume}
            min={0}
            max={100}
            valueLabelDisplay="auto"
            aria-label="volume slider"
            onChange={(e) => {
              setVolume(e.target.value);
              audioRef.current.volume = e.target.value / 100;
            }}
          />
        </div>
      </Stack>

      <audio ref={audioRef} src={currFav.audio_url} />
    </Paper>
  );
}

const styles = {
  container: {
    height: 120,
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#FF894B",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "20px",
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginLeft: 40,
    borderRadius: "5px",
  },
  title: {
    color: "white",
  },
  playPauseButton: {
    border: "none",
    backgroundColor: "white",
    width: 50,
    height: 50,
    borderRadius: "50%",
    fontSize: 26,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  timeContainer: {
    display: "flex",
    color: "white",
    gap: 10,
  },
  slider: {
    width: 200,
    height: 50,
    marginRight: 40,
  },
};
