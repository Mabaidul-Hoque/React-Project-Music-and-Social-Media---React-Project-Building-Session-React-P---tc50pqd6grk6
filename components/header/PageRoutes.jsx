import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";

const routeStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 0.5,
  cursor: "pointer",
};
const PageRoutes = ({ onHomeClick, onLibraryClick, onSocialClick }) => {
  return (
    <>
      {/* HOME ROUTE */}
      <Stack onClick={onHomeClick} sx={{ ...routeStyle }}>
        <Box mb={-0.6}>
          <HomeSharpIcon htmlColor="#FFFFFF" fontSize="medium" />
        </Box>
        <Typography variant="h5" color={"#FFFFFF"}>
          Home
        </Typography>
      </Stack>
      {/* SOCIAL ROUTE */}

      <Stack onClick={onSocialClick} sx={{ ...routeStyle }}>
        <Box mb={-0.6}>
          <ConnectWithoutContactIcon htmlColor="#FFFFFF" fontSize="medium" />
        </Box>
        <Typography variant="h5" color={"#FFFFFF"}>
          Social
        </Typography>
      </Stack>

      {/* LIBRARY ROUTE */}
      <Stack onClick={onLibraryClick} sx={{ ...routeStyle }}>
        <Box mb={-0.6}>
          <HeadphonesIcon htmlColor="#FFFFFF" fontSize="medium" />
        </Box>
        <Typography variant="h5" color={"#FFFFFF"}>
          Library
        </Typography>
      </Stack>
    </>
  );
};

export default PageRoutes;
