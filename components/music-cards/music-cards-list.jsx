"use client";

import { fetchMusicList } from "@/Apis/music";
import { MusicCard } from "./music-card";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pagination, Stack } from "@mui/material";

export function MusicCardsList({ setCurrentMusic }) {
  const [musicList, setMusicList] = useState([]);
  const [musicPage, setMusicPage] = useState(1);
  // const page = useRef(1);

  const updateMusicList = useCallback(async () => {
    // console.log(page.current);
    const musicList = await fetchMusicList(musicPage, 10);
    console.log("musicList", musicList);
    setMusicList(musicList);
    // setMusicList((prev) => {
    //   return [...prev, ...musicList];
    // });
  }, [musicPage]);

  useEffect(() => {
    updateMusicList();
  }, [musicPage]);

  const handleChange = (event, value) => {
    setMusicPage(value);
  };

  return (
    <Stack sx={{ width: "98%", margin: "0 auto", bgcolor: "#393939" }} pt={4}>
      <Stack
        flexWrap={"wrap"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"flex-start"}
        gap={3.5}
      >
        {musicList.map((music) => (
          <MusicCard
            key={music._id}
            music={music}
            onClick={() => {
              setCurrentMusic(music);
            }}
          />
        ))}
      </Stack>
      {/* <button
        style={styles.button}
        onClick={() => {
          page.current += 1;
          updateMusicList();
        }}
      >
        Load More
      </button> */}
      <Stack alignItems={"center"} mt={6} mb={6}>
        <Pagination
          count={50}
          color={"info"}
          page={musicPage}
          onChange={handleChange}
        />
      </Stack>

      <Stack>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos dolores
        harum laborum sapiente, tempora natus, omnis dolorum repellendus rerum
        vero eos quia voluptates pariatur totam quaerat, quo soluta unde dolore
        iure qui? Pariatur voluptatum expedita eum modi tempore. Similique
        laboriosam iusto, necessitatibus nulla tenetur porro. Doloribus quisquam
        soluta voluptatum voluptatibus maxime optio illo? Explicabo alias sit
        obcaecati, vero error, harum possimus, ea earum repellat eos impedit?
        Vitae aspernatur aliquam ut ea voluptates esse porro tenetur in
        architecto consequatur excepturi, repellendus culpa. Vero quas explicabo
        aspernatur nostrum temporibus incidunt fugit eius odio impedit quaerat,
        quidem iste quisquam dicta alias deleniti minima praesentium quia
        corporis beatae deserunt! Incidunt quisquam perferendis neque, quam,
        accusantium harum dolorum non necessitatibus nobis nisi corporis
        dignissimos! Consequuntur exercitationem ad earum veniam obcaecati
        officiis dolorum quae et pariatur non. Nulla dolore expedita ut dolorum
        animi, cupiditate esse non blanditiis fuga voluptates architecto
        consequuntur, consectetur illum omnis accusantium quas iste magnam.
        Doloribus, qui! Enim minima dolores ipsum illum nostrum nulla nam
        magnam. Neque deserunt, repellat hic similique vero accusamus, dolorum
        est et ipsa, earum optio quis eligendi cum eum necessitatibus! Impedit
        mollitia, in aspernatur beatae voluptate laudantium ex doloremque quo
        sint ut accusamus quisquam delectus laborum a, dolor itaque?
      </Stack>
    </Stack>
  );
}

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    border: "none",
    backgroundColor: "orange",
    color: "white",
    padding: 10,
    cursor: "pointer",
  },
};
