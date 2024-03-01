"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import "../styles/header.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Box, Button, Modal, Stack, Typography, styled } from "@mui/material";
import { useMusicContext } from "@/context/MusicDataProvider";
import { fetchSearchedSong } from "@/Apis/SearchApi";
import { toast } from "react-toastify";
import { TokenContext } from "@/context/AuthProvider";
import Image from "next/image";
import PageRoutes from "./PageRoutes";
import CloseIcon from "@mui/icons-material/Close";

const SearchButton = styled("button")({
  width: "48px",
  height: "40px",
  minWidth: "20px",
  backgroundColor: "#FFFFFF",
  borderTopRightRadius: "18px",
  borderBottomRightRadius: "18px",
  borderLeft: "1px solid ",
  border: "none",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#FFFFFF",
  },
  "&:focus": {
    backgroundColor: "#FFFFFF",
  },
});

const SearchInput = styled("input")({
  height: "40px",
  border: "none",
  borderRight: "1px solid gray",
  borderTopLeftRadius: "18px",
  borderBottomLeftRadius: "18px",
  paddingLeft: "25px",
  paddingRight: "40px",
  fontSize: "16px",
  outlineColor: "#FFFFFF",
});

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "black",
  color: "white",
  border: "1px solid white",
  p: 6,
  borderRadius: 5,
};
export function Header() {
  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = useState(false);
  const { token, setToken } = useContext(TokenContext);
  const router = useRouter();
  const { updateMusicList, setMusicPage, setMusicList } =
    useMusicContext().musicVal;
  const { setSearchedSongs } = useMusicContext().searchedData;

  const handleSearch = async () => {
    const searchedRes = await fetchSearchedSong(searchInput);
    if (searchedRes?.data?.status === "success") {
      setMusicList(searchedRes?.data?.data);
      setSearchedSongs(searchedRes?.data?.results);
    } else {
      toast.error("There are no songs in this name!!", { theme: "colored" });
    }
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

  const handleHomeClick = () => {
    setMusicPage(1);
    updateMusicList();
    router.push("/");
    setOpen(false);
  };

  const handleLibraryClick = () => {
    if (token) router.push("/library");
    else toast.error("You have to login!", { theme: "colored" });
    setOpen(false);
  };
  const handleLiabraryClick = () => {
    router.push("/social");
    setOpen(false);
  };
  const handleMenuOpen = () => {
    setOpen(true);
  };
  const handleMenuClose = () => {
    setOpen(false);
  };

  return (
    <Stack
      sx={{
        width: "95vw",
        margin: "0 auto",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        p: { xs: 0.5, sm: 2 },
        pt: { xs: 2, sm: 2 },
      }}
    >
      {/* APP LOGO */}
      <Image
        className="app_logo"
        width={60}
        height={50}
        alt="app-logo"
        src={"/Apple_Music_logo.png"}
      />
      {/* RESPONSIVE HAMBURGER MENU CONTAINER */}
      <Box>
        {/* MENU BUTTON */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            gap: 1,
            cursor: "pointer",
          }}
          onClick={handleMenuOpen}
        >
          <div style={{ width: 40, height: 2, backgroundColor: "white" }}></div>
          <div style={{ width: 40, height: 2, backgroundColor: "white" }}></div>
          <div style={{ width: 40, height: 2, backgroundColor: "white" }}></div>
        </Box>
        {/* MENU LIST */}
        <Modal
          open={open}
          sx={{ bgcolor: "black", width: "100vw", height: "100vh" }}
        >
          <>
            <Box
              onClick={handleMenuClose}
              sx={{
                position: "absolute",
                top: 40,
                right: 80,
                cursor: "pointer",
              }}
            >
              <CloseIcon fontSize="large" htmlColor="white" />
            </Box>
            <Box sx={{ ...modalStyle }}>
              <Box
                sx={{
                  display: { xs: "flex", md: "none" },
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <PageRoutes
                  onHomeClick={handleHomeClick}
                  onLibraryClick={handleLibraryClick}
                  onSocialClick={handleLiabraryClick}
                />
              </Box>
            </Box>
          </>
        </Modal>
      </Box>
      {/* PAGES ROUTES */}
      <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
        <PageRoutes
          onHomeClick={handleHomeClick}
          onLibraryClick={handleLibraryClick}
          onSocialClick={handleLiabraryClick}
        />
      </Box>

      {/* MUSIC SEARCH CONTAINER  */}
      <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
        <SearchInput
          sx={{ width: { xs: "50vw", md: "20vw" } }}
          id="outlined-basic"
          placeholder="Search songs"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={() => setSearchInput("")}
        />
        <SearchButton onClick={handleSearch}>
          <SearchOutlinedIcon fontSize="medium" htmlColor="gray" />
        </SearchButton>
      </Stack>
      {/* LOGIN/LOGOUT CONTAINER */}
      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
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
