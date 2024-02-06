import axios from "./axios-instance";
export async function fetchMusicList(page, limit) {
  const res = await axios.get(
    `https://academics.newtonschool.co/api/v1/music/song?page=${page}&limit=${limit}`
  );
  return res.data.data;
}
