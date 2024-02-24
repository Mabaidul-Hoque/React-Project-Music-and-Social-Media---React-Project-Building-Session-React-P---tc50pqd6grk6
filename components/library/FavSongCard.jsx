import { fetchFavSong } from "@/Apis/FavSongsApi";
import { Button, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const FavSongCard = ({ favSongId, handleRemoveFav }) => {
  const [favSong, setFavSong] = useState(null);
  useEffect(() => {
    favSongFromLs();
  }, [favSongId]);
  const favSongFromLs = async () => {
    const resp = await fetchFavSong(favSongId);
    setFavSong(resp.data);
  };

  return (
    <Paper sx={paperStyle} id="music-card">
      <img id="music-thumbnail" style={styles.image} src={favSong?.thumbnail} />
      <div id="play-icon-container" style={styles.play_container}>
        <Image
          //   onClick={onClick}
          src={"https://www.svgrepo.com/show/111229/play-button.svg"}
          alt="play"
          height={50}
          width={50}
        />
      </div>
      <Stack pl={0.5} pr={0.5} mt={1} gap={0.5} textAlign={"center"}>
        <Typography variant="h5" fontSize={"20px"} sx={{ ...overFlowStyle }}>
          {favSong?.title}
        </Typography>
        <Typography fontSize={"11px"} sx={{ ...overFlowStyle }}>
          {favSong?.artist?.map((artist) => artist?.name).join(" & ")}
        </Typography>
      </Stack>
      <Stack sx={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <Button sx={{ ...muiBtn }} onClick={() => handleRemoveFav(favSongId)}>
          <CloseIcon htmlColor="#FF474D" />
        </Button>
      </Stack>
    </Paper>
  );
};

const paperStyle = {
  width: "17vw",
  height: "41vh",
  borderRadius: "15px",
  bgcolor: "#393939",
  color: "#FFFFFF",
  cursor: "pointer",
  position: "relative",
  transition: "0.5s ease-in-out",
  "&:hover": {
    scale: "1.15",
  },
};
const styles = {
  image: {
    width: "100%",
    height: "24vh",
    borderRadius: "15px 15px 0 0",
    objetFit: "contain",
  },
  play_container: {
    position: "absolute",
    top: 70,
    left: 90,
    width: 100,
    height: 100,
  },
};
const overFlowStyle = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
};
const muiBtn = {
  "&:hover": {
    bgcolor: "#393939",
  },
};

export default FavSongCard;
