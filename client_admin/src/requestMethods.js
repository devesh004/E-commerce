import axios from "axios";

let BaseUrl = "https://shopping-app04.herokuapp.com/api/";
if (process.env.NODE_ENV === "development") {
  BaseUrl = "http://localhost:3000/api/";
}

let Token = null;
if (
  localStorage.getItem("persist:root") &&
  JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
    .currentUser !== null
) {
  Token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
    .currentUser.accessToken;
}

export const publicRequest = axios.create({
  baseURL: BaseUrl,
});

export const userRequest = axios.create({
  baseURL: BaseUrl,
  headers: { token: `Bearer ${Token}` },
});
