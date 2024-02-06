"use client";

import { fetchMusicList } from "@/Apis/music";
import { MusicCard } from "./music-card";
import { useCallback, useEffect, useRef, useState } from "react";

export function MusicCardsList({ setCurrentMusic }) {
  const [musicList, setMusicList] = useState([]);
  const page = useRef(1);

  const updateMusicList = useCallback(async () => {
    console.log(page.current);
    const musicList = await fetchMusicList(page.current, 20);
    setMusicList((prev) => {
      return [...prev, ...musicList];
    });
  }, [page.current]);

  useEffect(() => {
    updateMusicList();
  }, []);

  return (
    <div style={styles.main_container}>
      <div id="music-cards-container" style={styles.container}>
        {musicList.map((music) => (
          <MusicCard
            key={music._id}
            music={music}
            onClick={() => {
              setCurrentMusic(music);
            }}
          />
        ))}
      </div>
      <button
        style={styles.button}
        onClick={() => {
          page.current += 1;
          updateMusicList();
        }}
      >
        Load More
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    border: "none",
    backgroundColor: "orange",
    color: "white",
    padding: 10,
    cursor: "pointer",
  },
  main_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 30,
    paddingBottom: 150,
  },
};
