"use client";
import { fetchPosts } from "@/apis/posts";
import { useEffect, useState } from "react";
import { Post } from "./post";
import { AuthenticationModal } from "./authentication-modal";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        padding: 20,
      }}
    >
      {posts.map((post) => (
        <Post key={post._id} post={post} setShowModal={setShowModal} />
      ))}
      {showModal && <AuthenticationModal setShowModal={setShowModal} />}
    </div>
  );
}
