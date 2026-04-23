import axios from "axios";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000") + "/api";

const api = axios.create({
    baseURL: API_URL,
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    },
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
});

/**
 * Interceptador de resposta para lidar com erros de autenticação
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
    }
    return Promise.reject(error);
  }
);

export default api;