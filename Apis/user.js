import axios from "./axios-instance";

export async function signup(userInfo) {
  try {
    const response = await axios.post(
      `https://academics.newtonschool.co/api/v1/user/signup`,
      { ...userInfo, appType: "music" }
    );
    return response.data;
  } catch (error) {
    console.log("user infomation is incorrect!");
  }
}

export async function signin(userInfo) {
  try {
    const response = await axios.post(
      `https://academics.newtonschool.co/api/v1/user/login`,
      { ...userInfo, appType: "music" }
    );
    return response.data;
  } catch (error) {
    console.log("user infomation is incorrect!");
  }
}
