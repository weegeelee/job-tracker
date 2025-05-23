import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      console.log("Request headers:", config.headers);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("After setting Authorization:", config.headers);
      } else {
        console.log("No token found in localStorage");
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

export default api;