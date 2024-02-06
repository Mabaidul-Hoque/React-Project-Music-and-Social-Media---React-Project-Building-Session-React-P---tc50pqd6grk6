import axios from "./axios-instance";

export async function signup(userInfo) {
  const response = await axios.post(
    `https://academics.newtonschool.co/api/v1/user/signup`,
    { ...userInfo, appType: "music" }
  );
  return response.data;
}

export async function signin(userInfo) {
  const response = await axios.post(
    `https://academics.newtonschool.co/api/v1/user/login`,
    { ...userInfo, appType: "music" }
  );
  return response.data;
}
