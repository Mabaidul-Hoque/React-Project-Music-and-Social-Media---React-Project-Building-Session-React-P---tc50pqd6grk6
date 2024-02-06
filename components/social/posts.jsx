"use client";
import { fetchPosts } from "@/Apis/posts";
import { useEffect, useState } from "react";
import { Post } from "./post";
import { AuthenticationModal } from "./authentication-modal";
import { Stack } from "@mui/material";

export function Posts() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const updatePosts = async () => {
    const posts = await fetchPosts(20, page);
    setPosts(posts);
  };
  useEffect(() => {
    updatePosts();
  }, []);
  return (
    <Stack
      alignContent={"center"}
      gap={4}
      alignItems={"center"}
      sx={{ bgcolor: "#393939" }}
      pt={2}
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   alignItems: "center",
      //   gap: 20,
      //   padding: 20,
      // }}
    >
      {posts.map((post) => (
        <Post key={post._id} post={post} setShowModal={setShowModal} />
      ))}
      {showModal && <AuthenticationModal setShowModal={setShowModal} />}
    </Stack>
  );
}
