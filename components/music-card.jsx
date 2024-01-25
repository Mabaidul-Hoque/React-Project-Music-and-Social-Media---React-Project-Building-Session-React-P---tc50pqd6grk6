import React, { useEffect, useState } from "react";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import "./styles/musicStyle.css";

const MusicCard = ({ song }) => {
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    setArtists(song.artist);
  });
  return (
    <div style={style.container} id="music-card">
      <img style={style.image} src={song.thumbnail} alt={song.title} />
      <h4 style={style.h4}>{song.title}</h4>
      <h6 style={style.h6}>
        {artists.map((artist) => artist.name).join(" & ")}
      </h6>
      <div style={style.playIcon} id="icon">
        <PlayCircleFilledWhiteOutlinedIcon
          htmlColor={"#E44B3C"}
          fontSize="large"
        />
      </div>
    </div>
  );
};

const style = {
  container: {
    width: "12vw",
    height: "33vh",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",

    color: "#FFFFFF",
    cursor: "pointer",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  image: {
    width: "12vw",
    height: "22vh",
    borderRadius: "10px",
    position: "relative",
  },
  h4: {
    fontWeight: "400",
    paddingTop: "5px",
  },
  h6: {
    fontWeight: "400",
    color: "#C8BEBD",
  },
  playIcon: {
    position: "absolute",
    // left: "50%",
    // top: "50%",
    width: "12vw",
    height: "22vh",
    // width: "12vw",
    // height: "33vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
};

export default MusicCard;
