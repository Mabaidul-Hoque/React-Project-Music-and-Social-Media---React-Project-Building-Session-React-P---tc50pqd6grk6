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
  const [musicList, setMusicList] = useState([]);
  const [musicPage, setMusicPage] = useState(1);

  const updateMusicList = useCallback(async () => {
    const musicList = await fetchMusicList(musicPage, 10);
    console.log("musicList", musicList);
    setMusicList(musicList);
  }, [musicPage]);

  const handleChange = (event, value) => {
    setMusicPage(value);
  };

  const musicData = {
    musicVal: {
      handleChange,
      updateMusicList,
      setMusicPage,
      musicPage,
      musicList,
      setMusicList,
    },
    // searchVal: {
    //   handleSearch,
    // },
  };
  return (
    <MusicContext.Provider value={musicData}>{children}</MusicContext.Provider>
  );
};

export default MusicDataProvider;
