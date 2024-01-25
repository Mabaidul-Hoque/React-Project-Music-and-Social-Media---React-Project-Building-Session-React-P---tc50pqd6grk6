import axios from "./axios-instance";

export async function fetchMusicList(page, limit) {
  try {
    const res = await axios.get(
      `https://academics.newtonschool.co/api/v1/music/song?page=${page}&limit=${limit}`
    );
    return res;
  } catch (error) {
    console.log("couldn't fetch", error);
  }
}
