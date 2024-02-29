import { FavMusicPlayer } from "@/components/library/FavMusicPlayer";
import FavSongs from "@/components/library/FavSongs";
import { Stack } from "@mui/material";
import React from "react";

const Library = () => {
  return (
    <Stack>
      <FavSongs />
      <FavMusicPlayer />
    </Stack>
  );
};

export default Library;
