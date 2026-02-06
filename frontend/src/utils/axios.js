import axios from "axios";

const api = axios.create({
  baseURL: "https://realtimechatapp-backend-undf.onrender.com",
  withCredentials: true,
});

export default api;
