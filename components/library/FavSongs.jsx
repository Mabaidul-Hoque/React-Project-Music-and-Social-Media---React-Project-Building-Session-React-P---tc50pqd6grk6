"use client";

import { useMusicContext } from "@/context/MusicDataProvider";
import { Pagination, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavSongCard from "./FavSongCard";

const FavSongs = () => {
  const [favPage, setFavPage] = useState(1);
  const { favSongs, setFavSongs } = useMusicContext().favData;
  const [paginatedSongs, setpaginatedSongs] = useState([]);

  useEffect(() => {
    const songsData = JSON.parse(localStorage.getItem("favSongs"));
    setFavSongs(songsData);

    const lastIndx = favPage * 10;
    const firstIndx = lastIndx - 10;
    setpaginatedSongs(() => favSongs.slice(firstIndx, lastIndx));
  }, []);

  const handleChange = (event, value) => {
    setFavPage(value);
  };
  const handleRemoveFav = (id) => {
    const indexToDelete = favSongs.findIndex((song) => song._id === id);
    console.log("indexToDelete", indexToDelete);
    if (indexToDelete !== -1) {
      favSongs.splice(indexToDelete, 1);
      localStorage.setItem("favSongs", JSON.stringify(favSongs));
    }
  };

  // const lastIndx = favPage * 10;
  // const firstIndx = lastIndx - 10;
  // const paginatedSongs = favSongs.slice(firstIndx, lastIndx);

  return (
    <Stack pt={4}>
      <Stack
        flexWrap={"wrap"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"flex-start"}
        gap={3.5}
      >
        {paginatedSongs?.map((music) => (
          <FavSongCard
            key={music._id}
            favSong={music}
            handleRemoveFav={handleRemoveFav}
          />
        ))}
      </Stack>
      <Stack alignItems={"center"} mt={6} mb={6}>
        <Pagination
          count={Math.ceil(favSongs.length / 10)}
          color={"primary"}
          bgcolor={"white"}
          page={favPage}
          onChange={handleChange}
        />
      </Stack>
    </Stack>
  );
};

export default FavSongs;
