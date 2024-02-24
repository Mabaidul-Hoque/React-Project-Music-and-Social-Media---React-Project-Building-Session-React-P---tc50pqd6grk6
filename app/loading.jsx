import { Box } from "@mui/material";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <h1
        style={{
          color: "white",
          textAlign: "center",
          position: "absolute",
          left: "50%",
          right: "50%",
        }}
      >
        Loading...
      </h1>
    </>
  );
}
