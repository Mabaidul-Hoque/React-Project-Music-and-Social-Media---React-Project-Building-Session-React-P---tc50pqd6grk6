"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./header.css";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useMusicContext } from "@/context/MusicDataProvider";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { fetchSearchedSong } from "@/Apis/SearchApi";
import { toast } from "react-toastify";
import { TokenContext } from "@/context/AuthProvider";

const CustomButton = styled(Button)({
  width: "42px",
  height: "42px",
  minWidth: "20px",
  backgroundColor: "#FFFFFF",
  borderRadius: "50%",
  "&:hover": {
    backgroundColor: "#FFFFFF",
  },
});

const CustomInput = styled("input")({
  width: "20vw",
  height: "45px",
  border: "none",
  borderRadius: "20px",
  paddingLeft: "20px",
  fontSize: "18px",
  outlineColor: "#FFFFFF",
});
export function Header() {
  const [searchInput, setSearchInput] = useState("");
  const { token, setToken } = useContext(TokenContext);

  const router = useRouter();

  const { updateMusicList, musicPage, setMusicPage, musicList, setMusicList } =
    useMusicContext().musicVal;

  const handleHomeClick = () => {
    setMusicPage(1);
    updateMusicList();
  };
  const handleSearch = async () => {
    const filteredData = await fetchSearchedSong(searchInput);
    setMusicList(filteredData.data.data);
  };

  const onLoginLogout = () => {
    if (token) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
      setToken();
      toast.success("You have logged out", {
        theme: "colored",
      });
    }
    router.push("/signin");
  };

  return (
    <Stack
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      p={2}
      sx={{ width: "92%", margin: "0 auto" }}
    >
      <img
        width={"80px"}
        height={"40px"}
        src="https://e7.pngegg.com/pngimages/711/190/png-clipart-soundcloud-computer-icons-social-media-logo-music-sound-of-colors-company-internet.png"
      />

      <Link onClick={handleHomeClick} href={"/"}>
        <Stack flexDirection={"row"} alignItems={"center"} gap={0.5}>
          <Box mb={-0.6}>
            <HomeSharpIcon htmlColor="#FFFFFF" fontSize="medium" />
          </Box>
          <Typography variant="h5" color={"#FFFFFF"}>
            Home
          </Typography>
        </Stack>
      </Link>
      <Link href={"/social"}>
        <Stack flexDirection={"row"} alignItems={"center"} gap={0.5}>
          <Box mb={-0.6}>
            <ConnectWithoutContactIcon htmlColor="#FFFFFF" fontSize="medium" />
          </Box>
          <Typography variant="h5" color={"#FFFFFF"}>
            Social
          </Typography>
        </Stack>
      </Link>
      <Link href={"/library"}>
        {" "}
        <Stack flexDirection={"row"} alignItems={"center"} gap={0.5}>
          <Box mb={-0.6}>
            <HeadphonesIcon htmlColor="#FFFFFF" fontSize="medium" />
          </Box>
          <Typography variant="h5" color={"#FFFFFF"}>
            Library
          </Typography>
        </Stack>
      </Link>

      <Stack flexDirection={"row"} alignItems={"center"}>
        <CustomInput
          id="outlined-basic"
          placeholder="Search songs"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={() => setSearchInput("")}
        />
        <CustomButton sx={{ marginLeft: "-50px" }} onClick={handleSearch}>
          <SearchOutlinedIcon htmlColor="gray" />
        </CustomButton>
      </Stack>
      <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
        <PersonOutlineOutlinedIcon fontSize="medium" htmlColor="white" />
        <Typography
          variant="h6"
          color={"#FFFFFF"}
          onClick={onLoginLogout}
          sx={{ cursor: "pointer" }}
        >
          {token ? "Logout" : "Login"}
        </Typography>
      </Stack>
    </Stack>
  );
}
