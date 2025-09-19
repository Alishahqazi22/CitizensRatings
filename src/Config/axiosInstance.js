import axios from "axios";
import { toast } from "react-toastify";

// ✅ Axios instance
export const axiosInstance = axios.create({
  baseURL: "https://citizensratingsapi.dev-sh.xyz/api",
});

const TOKEN_KEY = "accessToken"; 

// ✅ Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// ✅ Response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const status = error?.response?.status;
    const RESP = error?.response?.data;

    if (status === 401) {
      toast.error("Session expired. Please login again.");
      localStorage.removeItem(TOKEN_KEY); 
      window.location.href = "/";
      return;
    }

    if (RESP?.message) {
      toast.error(RESP.message || "Something went wrong");
    }

    return Promise.reject(error);
  }
);

