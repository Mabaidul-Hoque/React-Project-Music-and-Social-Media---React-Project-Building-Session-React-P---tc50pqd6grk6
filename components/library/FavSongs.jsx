"use client";

import { useMusicContext } from "@/context/MusicDataProvider";
import { Pagination, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavSongCard from "./FavSongCard";

const FavSongs = () => {
  const [favPage, setFavPage] = useState(1);
  const { isFav, setIsFav } = useMusicContext().favData;
  const [paginatedSongsId, setPaginatedSongsId] = useState([]);

  useEffect(() => {
    const favoriteMusicIds = JSON.parse(localStorage.getItem("favoriteMusic"));
    const lastIndx = favPage * 10;
    const firstIndx = lastIndx - 10;
    setPaginatedSongsId(() => favoriteMusicIds?.slice(firstIndx, lastIndx));
  }, [isFav, favPage]);

  const handleChange = (event, value) => {
    setFavPage(value);
  };
  const handleRemoveFav = (id) => {
    const favoriteMusicIds = JSON.parse(localStorage.getItem("favoriteMusic"));
    const indexToDelete = favoriteMusicIds?.findIndex(
      (musicId) => musicId === id
    );
    favoriteMusicIds?.splice(indexToDelete, 1);
    localStorage.setItem("favoriteMusic", JSON.stringify(favoriteMusicIds));
    setIsFav((prev) => !prev);
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
        {paginatedSongsId?.length > 0 ? (
          paginatedSongsId.map((Id) => (
            <FavSongCard
              key={Id}
              favSongId={Id}
              handleRemoveFav={handleRemoveFav}
            />
          ))
        ) : (
          <Typography
            variant="h3"
            component={"h3"}
            sx={{ textAlign: "center", color: "white" }}
          >
            No Favourites are Found
          </Typography>
        )}
      </Stack>
      <Stack alignItems={"center"} mt={6} mb={6}>
        <Pagination
          count={Math.ceil(
            JSON.parse(localStorage.getItem("favoriteMusic"))?.length / 10
          )}
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
