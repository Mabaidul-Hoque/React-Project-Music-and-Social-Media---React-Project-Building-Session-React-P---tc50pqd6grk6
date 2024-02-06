import axios from "axios";

const instance = axios.create({
  headers: {
    projectID: "5kvx381vd5uu",
  },
});

export default instance;
