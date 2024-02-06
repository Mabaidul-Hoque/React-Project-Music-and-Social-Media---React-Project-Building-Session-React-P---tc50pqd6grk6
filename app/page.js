"use client";
import { MusicCardsList } from "@/components/music-cards";
import { MusicPlayer } from "@/components/music-player";
import { Stack } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [currentMusic, setCurrentMusic] = useState();
  return (
    <Stack>
      <MusicCardsList setCurrentMusic={setCurrentMusic} />
      <MusicPlayer currentMusic={currentMusic} />
    </Stack>
  );
}
