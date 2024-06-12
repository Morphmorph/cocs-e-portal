// axiosConfig.js

import axios from "axios";

const BASE_URL = "http://127.0.0.1:8081";

// Create an instance of axios with custom configuration
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Set defaults for CSRF token handling
axiosInstance.defaults.xsrfCookieName = "csrftoken";
axiosInstance.defaults.xsrfHeaderName = "X-CSRFToken";

// Add an interceptor to include CSRF token in headers for every request
axiosInstance.interceptors.request.use(
  (config) => {
    const csrfToken = getCsrfToken(); // You need to implement this function to fetch the CSRF token from the cookie
    config.headers["X-CSRFToken"] = csrfToken;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to fetch CSRF token from cookies
function getCsrfToken() {
  const csrfCookie = document.cookie
    .split(";")
    .find((cookie) => cookie.trim().startsWith("csrftoken="));
  if (csrfCookie) {
    return csrfCookie.split("=")[1];
  }
  return null;
}

export default axiosInstance;
