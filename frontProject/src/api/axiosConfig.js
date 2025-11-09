// src/api/axiosConfig.js
import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE || "https://backend-a2qq.onrender.com";
axios.defaults.baseURL = BASE;
axios.defaults.headers.common["Content-Type"] = "application/json";

axios.interceptors.request.use((config) => {
  try {
    const persisted = localStorage.getItem("persist:UserInfo");
    if (persisted) {
      const parsed = JSON.parse(persisted);
      let token = parsed?.token;
      try { token = JSON.parse(token); } catch {}
      if (token) {
        token = String(token).replace(/^"|"$/g, "");
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch (e) { /* ignore parse errors */ }
  return config;
}, (err) => Promise.reject(err));

export default axios;