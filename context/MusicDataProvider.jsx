import { fetchMusicList } from "@/Apis/music";
import React, { createContext, useCallback, useContext, useState } from "react";

const MusicContext = createContext();

export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("Something is wrong with the MusicContext");
  }
  return context;
};

const MusicDataProvider = ({ children }) => {
  const [currentMusic, setCurrentMusic] = useState();
  const [musicList, setMusicList] = useState([]);
  const [musicPage, setMusicPage] = useState(1);
  const [favSongs, setFavSongs] = useState([]);
  const [isFav, setIsFav] = useState(false);

  const updateMusicList = useCallback(async () => {
    const musicList = await fetchMusicList(musicPage, 10);
    console.log("musicList", musicList);
    setMusicList(musicList);
  }, [musicPage]);

  const musicData = {
    musicVal: {
      updateMusicList,
      setMusicPage,
      musicPage,
      musicList,
      setMusicList,
      currentMusic,
      setCurrentMusic,
    },
    favData: {
      favSongs,
      setFavSongs,
      isFav,
      setIsFav,
    },
  };
  return (
    <MusicContext.Provider value={musicData}>{children}</MusicContext.Provider>
  );
};

export default MusicDataProvider;
