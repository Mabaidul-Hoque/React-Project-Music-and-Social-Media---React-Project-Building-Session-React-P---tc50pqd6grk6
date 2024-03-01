"use client";
import "../styles/musicStyle.css";
import {
  Button,
  Paper,
  Slider,
  Stack,
  Typography,
  styled,
  Box,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import { useMusicContext } from "@/context/MusicDataProvider";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { TokenContext } from "@/context/AuthProvider";
import {
  PauseOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from "@ant-design/icons";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

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
const PlayPasueBtn = styled(Button)({
  p: 0,
  width: "fit-content",
  "&:hover": { bgcolor: "#212020", color: "#212020" },
  "&:focus": { bgcolor: "#212020", color: "#212020" },
  "&:active": { bgcolor: "#212020", color: "#212020" },
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
    <Paper
      sx={{
        ...styles.container,
        height: { xs: 200, md: 100 },
        gap: { xs: 0, md: "20px" },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {/* PLAY PAUSE NEXT PREV CONATINER */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* PREV SONG BUTTON */}
          <StepBackwardOutlined
            style={{ fontSize: "35px", color: "white", cursor: "no-drop" }}
          />
          {/* PLAY BUTTON */}
          <PlayPasueBtn onClick={playPause}>
            {isPlaying ? (
              <PauseOutlined style={{ fontSize: "35px", color: "white" }} />
            ) : (
              <PlayArrowIcon style={{ fontSize: "40px", color: "white" }} />
            )}
          </PlayPasueBtn>
          {/* NEXT SONG BUTTON */}
          <StepForwardOutlined
            style={{ fontSize: "35px", color: "white", cursor: "no-drop" }}
          />
        </Box>
        {/* CURRENT TIME AND TOTAL TIME CONATINER */}
        <Stack flexDirection={"row"} gap={1}>
          <Typography sx={{ fontWeight: "500", color: "#FFFFFF" }}>
            {getTimeInString(currentTime)}
          </Typography>
          <Typography sx={{ fontWeight: "500", color: "#FFFFFF" }}>
            /
          </Typography>
          <Typography sx={{ fontWeight: "500", color: "#FFFFFF" }}>
            {getTimeInString(totalTime)}
          </Typography>
        </Stack>
      </Box>
      {/* CURRENT SONG THUMBNAIL AND TITLE CONATINER */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* current music thumbnail */}
        <img style={styles.thumbnail} src={currFav.thumbnail} />
        {/* song title and artist name */}
        <Stack textAlign={"center"}>
          <Typography variant="h6" sx={{ fontWeight: "500", color: "#FFFFFF" }}>
            {currFav.title}
          </Typography>
          <Typography
            sx={{ fontSize: "12px", fontWeight: "450", color: "#FFFFFF" }}
          >
            {currFav.artist.map((artist) => artist.name).join(" & ")}
          </Typography>
        </Stack>
      </Box>
      {/* SLIDERS CONTAINER */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", sm: "column" },
          alignItems: "center",
        }}
      >
        {/* song forward backword slider */}
        <MusicSlider
          sx={{ width: { xs: 100, sm: 200 } }}
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
              sx={{ width: { xs: 100, sm: 180 } }}
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
      </Box>
    </Paper>
  );
}

const styles = {
  container: {
    height: 100,
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#212020",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap",
    p: 2,
  },
  thumbnail: {
    width: 70,
    height: 60,
    borderRadius: "5px",
  },
  title: {
    color: "white",
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
