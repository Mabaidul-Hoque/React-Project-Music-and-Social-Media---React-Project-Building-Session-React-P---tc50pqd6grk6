"use client";
import { fetchComments, likePost } from "@/Apis/posts";
import { useContext, useState } from "react";
import { Comment } from "./comment";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { TokenContext } from "@/context/AuthProvider";

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
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "likedPost",
            JSON.stringify([...likedPost, post?._id])
          );
        }

        await likePost(post?._id);
        setLikes((likes) => likes + 1);
      } catch (err) {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "likedPost",
            JSON.stringify(
              likedPost?.filter((likedItem) => likedItem !== post?._id)
            )
          );
        }
        toast.info(err?.response?.data?.message, {
          theme: "colored",
        });
      }
    }
    console.log("likedPost--->", getLikedPostFromLS());
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
    <Paper
      sx={{
        width: "50vw",
        maxheight: "50vh",
        boxShadow: "none",
      }}
    >
      <Stack
        alignItems={"center"}
        p={2}
        sx={{
          height: "100%",
          bgcolor: "#393939",
          color: "#FFFFFF",
          border: "1px solid black",
          borderRadius: "10px",
          "&:hover": {
            borderColor: "#FFFFFF",
          },
        }}
      >
        <Stack mb={3} flexDirection={"row"} gap={2} alignItems={"center"}>
          <img
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
            }}
            src={post.author.profileImage}
          />
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

        <Typography textAlign={"center"} variant="h6">
          {post.content}
        </Typography>

        <div
          style={{
            display: "flex",
            padding: 10,
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
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
          <Stack flexDirection={"row"} gap={2}>
            <Typography
              sx={{
                cursor: "pointer",
                color: getLikedPostFromLS().includes(post?._id)
                  ? "blue"
                  : "white",
              }}
              onClick={onLike}
            >
              Likes:{likes}
            </Typography>
            <Typography
              style={{
                cursor: "pointer",
              }}
              onClick={onComment}
            >
              Comments:{post.commentCount}
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
    </Paper>
  );
}
