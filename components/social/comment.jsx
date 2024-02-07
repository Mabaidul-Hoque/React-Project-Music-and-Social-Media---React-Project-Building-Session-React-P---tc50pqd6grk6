import { Box, Typography } from "@mui/material";

export function Comment({ comment }) {
  return (
    <Box mt={2} p={2} border={"1px solid #FFFFFF"}>
      <Typography textAlign={"center"}>{comment.content}</Typography>
    </Box>
  );
}
