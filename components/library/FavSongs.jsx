"use client";

import { useMusicContext } from "@/context/MusicDataProvider";
import { Pagination, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavSongCard from "./FavSongCard";

const FavSongs = () => {
  const [favPage, setFavPage] = useState(1);
  const { favSongs, setFavSongs } = useMusicContext().favData;

  useEffect(() => {
    const songsData = JSON.parse(localStorage.getItem("favSongs"));
    setFavSongs(songsData);
  }, []);

  const handleChange = (event, value) => {
    setFavPage(value);
  };

  const lastIndx = favPage * 10;
  const firstIndx = lastIndx - 10;
  const paginatedSongs = favSongs.slice(firstIndx, lastIndx);

  console.log(
    "favSongs in FavSongs component",
    JSON.parse(localStorage.getItem("favSongs"))
  );

  console.log("favSongs in FavSongs component not ls", favSongs);

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
          <FavSongCard key={music._id} favSong={music} />
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
