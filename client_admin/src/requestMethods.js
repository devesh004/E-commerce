import axios from "axios";

let BaseUrl = process.env.BASE_URL || "https://backend-mpwz.onrender.com/api/";
if (process.env.NODE_ENV === "development") {
  BaseUrl = "http://localhost:3001/api/";
}

let Token = null;
if (
  localStorage.getItem("persist:root") &&
  JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user) &&
  JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currUser
) {
  Token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
    .currUser.accessToken;
}

// console.log(Token);

export const publicRequest = axios.create({
  baseURL: BaseUrl,
});

export const userRequest = axios.create({
  baseURL: BaseUrl,
  headers: { token: `Bearer ${Token}` },
});
