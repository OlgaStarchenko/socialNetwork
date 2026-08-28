import axios from "axios";

export const instance = axios.create({
  baseURL: "https://dummyjson.com",
});

let accessToken = localStorage.getItem("accessToken") || "";

export const setAccessToken = (newToken) => {
  if (newToken) {
    localStorage.setItem("accessToken", newToken);
    accessToken = newToken;
  }
};

instance.interceptors.request.use((config) => {
  if (!config.headers.Authorization && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
