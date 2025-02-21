import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Replace with your actual backend URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensures cookies (if using authentication)
});

// Request Interceptor: Attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Avoid redirecting if the failed request is to the login endpoint
      const isLoginRequest = error.config.url.includes("/auth/login"); // Adjust path to match your login endpoint

      if (error.response.status === 401 && !isLoginRequest) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
