import axios from "axios";

export const URL = axios.create({
  // baseURL: "https://ecommercebe.onrender.com",
  baseURL: "http://localhost:4000/",
  withCredentials: true,
});

export const IMGURL = "https://ecommercebe.onrender.com/";
// export const IMGURL = 'http://localhost:4000/'
