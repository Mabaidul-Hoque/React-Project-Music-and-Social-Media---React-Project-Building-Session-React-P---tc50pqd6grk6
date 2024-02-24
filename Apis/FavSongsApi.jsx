import axios from "./axios-instance";

export async function fetchFavSong(songId) {
  const url = `https://academics.newtonschool.co/api/v1/music/song/${songId}`;
  const resp = await axios.get(url);
  return resp.data;
}
