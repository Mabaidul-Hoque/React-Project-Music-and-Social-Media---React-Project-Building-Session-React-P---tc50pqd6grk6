"use client";
import { fetchMusicList } from "../Apis/music";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MusicCard from "./music-card";
// import "./styles.css/musicStyle.css";

const MusicCardsList = () => {
  const [songs, setSongs] = useState([]);
  const page = useRef(1);

  const updateSongs = useCallback(() => {
    fetchMusicList(page.current, 20).then((res) => {
      setSongs((prevSongs) => [...prevSongs, ...res.data.data]);
    });
  });
  useEffect(() => {
    updateSongs();
  }, []);
  return (
    <>
      <div style={style.container} id="music-card-list">
        {songs.map((song) => (
          <MusicCard key={song._id} song={song} />
        ))}
      </div>
      <div
        style={{
          background: "#393939",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          paddingTop: "30px",
          paddingBottom: "30px",
        }}
      >
        <button
          style={style.button}
          onClick={() => {
            page.current += 1;
            updateSongs();
          }}
        >
          Load more...
        </button>
      </div>
    </>
  );
};

const style = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "2rem",
    paddingTop: "1rem",
    backgroundColor: "#393939",
    paddingLeft: "10px",
    padingRight: "10px",
  },
  button: {
    border: "none",
    backgroundColor: "orange",
    color: "white",
    padding: "20px",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "7px",
  },
};

export default MusicCardsList;
