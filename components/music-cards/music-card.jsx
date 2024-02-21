import { useMusicContext } from "@/context/MusicDataProvider";
import { Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";

export function MusicCard({ music, onClick }) {
  // const { favSongs, setFavSongs, isFav, setIsFav } = useMusicContext().favData;

  return (
    <Paper
      sx={{
        width: "17vw",
        height: "40vh",
        borderRadius: "15px",
        bgcolor: "#393939",
        color: "#FFFFFF",
        cursor: "pointer",
        position: "relative",
        transition: "0.5s ease-in-out",
        "&:hover": {
          scale: "1.15",
        },
      }}
      id="music-card"
    >
      <img id="music-thumbnail" style={styles.image} src={music.thumbnail} />

      <div id="play-icon-container" style={styles.play_container}>
        <Image
          onClick={() => {
            onClick();
          }}
          src={"https://www.svgrepo.com/show/111229/play-button.svg"}
          alt="play"
          height={50}
          width={50}
        />
      </div>
      <Stack pl={0.5} pr={0.5} mt={1} gap={0.5} textAlign={"center"}>
        <Typography variant="h5" fontSize={"20px"}>
          {music.title}
        </Typography>
        <Typography variant="body2" fontSize={"12px"}>
          {music.artist.map((artist) => artist.name).join(" & ")}
        </Typography>
      </Stack>
    </Paper>
  );
}

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
