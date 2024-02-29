// const CustomPaper = styled(Paper)({
//   position: "fixed",
//   width: 300,
//   height: 200,
//   border: "none",
//   backgroundColor: "white",
//   padding: 20,
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   gap: 20,
//   top: "calc(50vh - 100px)",
//   left: "calc(50vw - 150px)",
// });

import * as React from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid white",
  p: 4,
  borderRadius: "10px",
};

export function AuthenticationModal({ showModal, setShowModal }) {
  const router = useRouter();

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div>
      {/* BEFORE LOGIN MODAL */}
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* MODAL CONTENT */}
        <Box sx={{ ...style, width: { xs: 300, sm: 400 } }}>
          {/* MODAL CLOSE BTN */}
          <Stack flexDirection={"row"} justifyContent={"flex-end"}>
            <Button
              sx={{
                marginTop: "-1.5rem",
                textTransform: "none",
                color: "tomato",
              }}
              onClick={handleClose}
            >
              close
            </Button>
          </Stack>
          {/* MODAL TITLE */}
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              fontFamily: "-moz-initial",
              textAlign: "center",
              fontWeight: "600",
              fontSize: "20px",
            }}
          >
            You need to login to like or comment on this post
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2.5,
              mb: 1,
              fontWeight: "600",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            If you don't have any account signup here
          </Typography>
          {/* SIGNUP BTN */}
          <Stack flexDirection={"row"} justifyContent={"center"}>
            <Button
              variant="contained"
              onClick={() => {
                router.push("/signup");
              }}
            >
              Sign up
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
