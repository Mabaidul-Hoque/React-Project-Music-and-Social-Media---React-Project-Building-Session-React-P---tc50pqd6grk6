import axios from "./axios-instance";

export async function fetchPosts(limit, page) {
  const res = await axios.get(
    `https://academics.newtonschool.co/api/v1/quora/post?limit=${limit}&page=${page}`
  );
  return res.data.data;
}

export async function likePost(postId) {
  const token = localStorage.getItem("token");
  const res = await axios.post(
    `https://academics.newtonschool.co/api/v1/quora/like/${postId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(res.data);
}

export async function fetchComments(postId) {
  const token = localStorage.getItem("token");
  const res = await axios.get(
    `https://academics.newtonschool.co/api/v1/quora/post/${postId}/comments`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.data;
}
