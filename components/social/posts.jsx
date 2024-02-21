"use client";
import { fetchPosts } from "@/Apis/posts";
import { Suspense, useEffect, useState } from "react";
import { Post } from "./post";
import { AuthenticationModal } from "./authentication-modal";
import { Pagination, Stack } from "@mui/material";
import Loading from "@/app/loading";

export function Posts() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResult, SetTotalResult] = useState(0);

  const updatePosts = async () => {
    const posts = await fetchPosts(10, page);
    // SetTotalResult(pos)
    setPosts(posts);
  };

  useEffect(() => {
    updatePosts();
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Stack
        alignContent={"center"}
        gap={4}
        alignItems={"center"}
        sx={{ bgcolor: "#393939" }}
        pt={2}
      >
        {posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        ))}
        {showModal && (
          <AuthenticationModal
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </Stack>

      <Stack alignItems={"center"} mt={6} mb={6}>
        <Pagination
          count={5}
          color={"primary"}
          bgcolor={"white"}
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </>
  );
}
