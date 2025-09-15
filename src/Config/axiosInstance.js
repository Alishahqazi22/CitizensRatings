import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      console.log("Network Error");
    } else {
      switch (error.responce.status) {
        case 400:
          console.log("Bad Request");
          break;
        case 401:
          console.log("Unauthorized: Redirecting to login");
          localStorage.removeItem("token");
          window.location.href = "/login";
          break;
        case 403:
          console.log("Forbidden");
          break;
        case 404:
          console.log("Not Found");
          break;
        case 500:
          console.log("Internal Server Error");
          break;
        case 503:
          console.log("Service not unavailable");
          break;
        default:
          console.log("Unexpected Error", error.responce.status);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
