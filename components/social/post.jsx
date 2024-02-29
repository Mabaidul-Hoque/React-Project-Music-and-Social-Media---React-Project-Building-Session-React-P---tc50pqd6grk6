"use client";
import { fetchComments, likePost } from "@/Apis/posts";
import { useContext, useState } from "react";
import { Comment } from "./comment";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { TokenContext } from "@/context/AuthProvider";

const cardStyle = {
  alignItems: "center",
  height: "100%",
  bgcolor: "#393939",
  color: "#FFFFFF",
  borderRadius: "10px",
};

const channelStyle = {
  display: "flex",
  padding: 10,
  justifyContent: "space-between",
  width: "100%",
  alignItems: "center",
};
export function Post({ post, setShowModal }) {
  const { token } = useContext(TokenContext);
  const [likes, setLikes] = useState(post.likeCount);
  const [comments, setComments] = useState([]);
  const [isComment, setIsComment] = useState(false);

  const onLike = async () => {
    const likedPost = getLikedPostFromLS();
    if (!token) {
      setShowModal(true);
    } else {
      try {
        await likePost(post?._id);
        setLikes((likes) => likes + 1);

        if (typeof window !== "undefined") {
          if (!likedPost.includes(post?._id)) {
            localStorage.setItem(
              "likedPost",
              JSON.stringify([...likedPost, post?._id])
            );
          }
        }
      } catch (err) {
        toast.info(err?.response?.data?.message, {
          theme: "colored",
        });
      }
    }
  };

  const getLikedPostFromLS = () => {
    const likedPost = JSON.parse(
      typeof window !== "undefined" && localStorage.getItem("likedPost")
    );
    const validatedLikedPost = likedPost === null ? [] : likedPost;
    return validatedLikedPost;
  };

  const onComment = async () => {
    setIsComment((prev) => !prev);
    if (!token) {
      setShowModal(true);
    } else {
      setComments(await fetchComments(post._id));
    }
  };
  return (
    <Box
      sx={{
        width: { xs: "90vw", sm: "35rem", md: "40rem" },
        maxheight: "50vh",
        boxShadow: "none",
        border: "1px solid black",
        borderRadius: "10px",
        "&:hover": {
          borderColor: "#FFFFFF",
        },
      }}
    >
      {/* POST CARD */}
      <Stack sx={{ ...cardStyle, p: { xs: 1, sm: 2 } }}>
        {/* CARD IMG AND TITLE CONTAINER */}
        <Stack
          sx={{ mb: 3, flexDirection: "row", alignItems: "center", gap: 2 }}
        >
          {/* CARD IMG */}
          <img
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
            }}
            src={post.author.profileImage}
          />
          {/* CARD TITLE */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <Typography textAlign={"center"} variant="h5">
              {post.title}
            </Typography>
            <Typography textAlign={"center"}>By: {post.author.name}</Typography>
          </div>
        </Stack>
        {/* CARD CONTENT */}
        <Typography sx={{ mb: 2, textAlign: "center" }}>
          {post.content}
        </Typography>
        {/* CARD CHANNEL CONTAINER */}
        <div style={{ ...channelStyle }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <img
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
              }}
              src={post.channel.image}
            />
            <h4>Channel: {post.channel.name}</h4>
          </div>
          {/* LIKE AND COMMENT CONTAINER */}
          <Stack sx={{ flexDirection: "row", gap: 2, flexWrap: "wrap" }}>
            {/* LIKE */}
            <Typography
              sx={{
                cursor: "pointer",
                color: getLikedPostFromLS().includes(post?._id)
                  ? "green"
                  : "white",
              }}
              onClick={onLike}
            >
              Likes: {likes}
            </Typography>
            {/* COMMENT */}
            <Typography
              style={{
                cursor: "pointer",
              }}
              onClick={onComment}
            >
              Comments: {post.commentCount}
            </Typography>
          </Stack>
        </div>
        {isComment ? (
          <Stack>
            <Typography variant="h5" mb={2} textAlign={"center"}>
              Comments:
            </Typography>
            <Box border={"1px solid #FFFFFF"} p={2}>
              <Stack>
                <Stack>
                  {comments.map((comment) => (
                    <Comment key={comment._id} comment={comment} />
                  ))}
                </Stack>
              </Stack>
            </Box>
          </Stack>
        ) : (
          ""
        )}
      </Stack>
    </Box>
  );
}
