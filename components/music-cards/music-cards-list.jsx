"use client";

import { fetchMusicList } from "@/Apis/music";
import { MusicCard } from "./music-card";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pagination, Stack } from "@mui/material";
import { useMusicContext } from "@/context/MusicDataProvider";

export function MusicCardsList() {
  const {
    setMusicPage,
    musicPage,
    updateMusicList,
    musicList,
    setCurrentMusic,
  } = useMusicContext().musicVal;

  // const updateMusicList = useCallback(async () => {
  //   const musicList = await fetchMusicList(musicPage, 10);
  //   console.log("musicList", musicList);
  //   setMusicList(musicList);
  // }, [musicPage]);

  useEffect(() => {
    updateMusicList();
  }, [musicPage]);

  const handleChange = (event, value) => {
    setMusicPage(value);
  };

  return (
    <Stack pt={4}>
      <Stack
        flexWrap={"wrap"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"flex-start"}
        gap={3.5}
      >
        {musicList.map((music) => (
          <MusicCard
            key={music._id}
            music={music}
            onClick={() => {
              setCurrentMusic(music);
            }}
          />
        ))}
      </Stack>
      <Stack alignItems={"center"} mt={6} mb={6}>
        <Pagination
          count={musicList.length < 10 ? 1 : 50}
          color={"primary"}
          bgcolor={"white"}
          page={musicPage}
          onChange={handleChange}
        />
      </Stack>
    </Stack>
  );
}
