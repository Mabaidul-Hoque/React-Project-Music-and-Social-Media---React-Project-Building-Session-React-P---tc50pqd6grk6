"use client";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useMusicContext } from "@/context/MusicDataProvider";

const FavAddRemove = ({ currentMusic }) => {
  const { isFav, setIsFav } = useMusicContext().favData;

  useEffect(() => {
    // Check if current music is already in localStorage
    const favMusic = JSON.parse(
      typeof window !== "undefined" && localStorage.getItem("favoriteMusic")
    );
    if (favMusic && favMusic.includes(currentMusic?._id)) {
      setIsFav(true);
    }
  }, [currentMusic]);

  const handleAddFav = () => {
    // Add current music to localStorage
    const favMusic =
      JSON.parse(
        typeof window !== "undefined" && localStorage.getItem("favoriteMusic")
      ) || [];
    if (!favMusic.includes(currentMusic?._id)) {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "favoriteMusic",
          JSON.stringify([...favMusic, currentMusic?._id])
        );
      }

      setIsFav(true);
    }
  };

  const handleRemoveFav = () => {
    // Remove current music from localStorage
    const favMusic =
      JSON.parse(
        typeof window !== "undefined" && localStorage.getItem("favoriteMusic")
      ) || [];
    const updatedFavMusic = favMusic.filter((id) => id !== currentMusic?._id);
    if (typeof window !== "undefined") {
      localStorage.setItem("favoriteMusic", JSON.stringify(updatedFavMusic));
    }
    setIsFav(false);
  };

  return (
    <Box
    // onClick={() => {
    //   setIsFav((prev) => !prev);
    // }}
    >
      {isFav ? (
        <div onClick={handleRemoveFav} sx={{ cursor: "pointer" }}>
          {/* already added in the library */}
          <FavoriteOutlinedIcon fontSize="large" htmlColor="#E20E4E" />
        </div>
      ) : (
        <div onClick={handleAddFav} sx={{ cursor: "pointer" }}>
          {/* not added to the library */}
          <FavoriteBorderOutlinedIcon fontSize="large" htmlColor="#E20E4E " />
        </div>
      )}
    </Box>
  );
};

export default FavAddRemove;
