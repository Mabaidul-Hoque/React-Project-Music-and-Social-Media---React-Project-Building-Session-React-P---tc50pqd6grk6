import axios from "./axios-instance";

export async function fetchSearchedSong(songTitle) {
  const url = `https://academics.newtonschool.co/api/v1/music/song?search={"title":"${songTitle}"}`;

  try {
    const res = await axios.get(url);
    return res;
  } catch (error) {
    console.log("Something is wrong with the search song api", error);
  }
}
