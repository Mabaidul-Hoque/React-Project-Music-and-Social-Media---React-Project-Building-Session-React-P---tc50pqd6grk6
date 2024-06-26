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
import { useMusicContext } from "@/context/MusicDataProvider";
import FavAddRemove from "./FavAddRemove";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { TokenContext } from "@/context/AuthProvider";
import {
  PauseOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from "@ant-design/icons";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

const MusicSlider = styled(Slider)({
  color: "#0C936C",
  height: 3,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
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

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const currentTimeInterval = useRef();
  const audioRef = useRef();
  const { token } = useContext(TokenContext);
  const router = useRouter();
  const { currentMusic, setCurrentMusic, musicList } =
    useMusicContext().musicVal;

  const prevNextMusic = (text) => {
    const indexOfCurr = musicList.indexOf(currentMusic);
    if (text === "next") {
      setCurrentMusic(musicList[indexOfCurr + 1]);
    } else if (text === "prev") {
      setCurrentMusic(musicList[indexOfCurr - 1]);
    }
  };

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
    if (currentMusic && token) {
      setIsPlaying(false);
      updateTotalTime();
      setCurrentTime(0);
      setVolume(audioRef.current.volume * 100);
    }
    return () => {
      clearInterval(currentTimeInterval.current);
    };
  }, [currentMusic, token]);

  if (!currentMusic) return null;

  return token ? (
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
            onClick={() => prevNextMusic("prev")}
            style={{ fontSize: "35px", color: "white" }}
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
            onClick={() => prevNextMusic("next")}
            style={{ fontSize: "35px", color: "white" }}
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
        {/* CURRENT SONG THUMBNAIL */}
        <img style={styles.thumbnail} src={currentMusic.thumbnail} />
        {/* SONG TITLE AND NAME */}
        <Stack>
          <Typography variant="h6" sx={{ fontWeight: "500", color: "#FFFFFF" }}>
            {currentMusic.title}
          </Typography>
          <Typography
            sx={{ fontSize: "12px", fontWeight: "450", color: "#FFFFFF" }}
          >
            {currentMusic.artist.map((artist) => artist.name).join(" & ")}
          </Typography>
        </Stack>
        {/* ADD TO LIBRARY */}
        <FavAddRemove currentMusic={currentMusic} />
      </Box>
      {/* SLIDERS CONTAINER */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", sm: "column" },
          alignItems: "center",
        }}
      >
        {/* SONG FORWARD AND BACKWARD SLIDER */}
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

        {/* VOLUME FORWARD BACKWARD*/}
        <div className="volume-icon">
          <MusicSlider
            sx={{ width: { xs: 100, sm: 150 } }}
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
          {volume === 0 ? (
            <VolumeOffIcon
              onClick={() => {
                setVolume(() => {
                  if (volume === 0) return audioRef.current.volume * 100;
                });
                audioRef.current.volume = 1;
              }}
              sx={{
                cursor: "pointer",
              }}
              fontSize="large"
              htmlColor="white"
            />
          ) : (
            <VolumeUpIcon
              onClick={() => {
                setVolume(() => {
                  if (volume > 0) return 0;
                });
                audioRef.current.volume = 0;
              }}
              sx={{
                cursor: "pointer",
              }}
              fontSize="large"
              htmlColor="white"
            />
          )}
        </div>

        <audio ref={audioRef} src={currentMusic.audio_url} />
      </Box>
    </Paper>
  ) : (
    // if user not logged in show this
    <Box
      sx={{
        ...styles.container,
        pl: { xs: 1, sm: 5 },
        justifyContent: "center",
        gap: 2,
        flexWrap: "nowrap",
      }}
    >
      <img
        width={"70px"}
        height={"70px"}
        src={currentMusic.thumbnail}
        alt={currentMusic.title}
      />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Typography variant="h6" color={"white"}>
          Please sign up first
        </Typography>
        <Button
          sx={{ textTransform: "none" }}
          variant="contained"
          onClick={() => {
            router.push("/signup");
          }}
        >
          Sign up here
        </Button>
      </Box>
    </Box>
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
