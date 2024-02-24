"use client";
import { MusicCardsList } from "@/components/music-cards";
import { MusicPlayer } from "@/components/music-player";
import { Stack } from "@mui/material";
import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Home() {
  return (
    <Stack>
      <MusicCardsList />
      <MusicPlayer />
    </Stack>
  );
}
