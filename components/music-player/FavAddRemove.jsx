import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useMusicContext } from "@/context/MusicDataProvider";

const FavAddRemove = ({ currentMusic }) => {
  //   const [isFav, setIsFav] = useState(false);

  const { favSongs, setFavSongs, isFav, setIsFav } = useMusicContext().favData;

  //   console.log("isFav", isFav);

  useEffect(() => {
    handleAddFav();
    handleRemoveFav();
  }, [isFav]);

  const handleAddFav = () => {
    // console.log("favSongs", favSongs);
    const indxExistFav = favSongs.findIndex(
      (song) => song._id === currentMusic._id
    );
    // console.log("indxExistFav", indxExistFav);
    if (favSongs.length === 0 || indxExistFav < 0) {
      setFavSongs((prev) => [...prev, currentMusic]);
    }
    const jsonFavSongs = JSON.stringify(favSongs);
    localStorage.setItem("favSongs", jsonFavSongs);
    console.log(
      "local storage songs",
      JSON.parse(localStorage.getItem("favSongs"))
    );
  };

  const handleRemoveFav = () => {};

  return (
    <Box
      onClick={() => {
        setIsFav((prev) => !prev);
      }}
    >
      {isFav ? (
        <Box sx={{ cursor: "pointer" }}>
          <FavoriteOutlinedIcon fontSize="large" htmlColor="#E20E4E " />
        </Box>
      ) : (
        <Box sx={{ cursor: "pointer" }}>
          <FavoriteBorderOutlinedIcon fontSize="large" htmlColor="#E20E4E " />
        </Box>
      )}
    </Box>
  );
};

export default FavAddRemove;
