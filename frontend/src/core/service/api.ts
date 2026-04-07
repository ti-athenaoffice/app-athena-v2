import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  withCredentials: true,
});

/**
 * Interceptador de resposta para lidar com erros de autenticação
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido - remove do localStorage
      // Não redireciona automaticamente, deixa o Redux lidar com isso
      localStorage.removeItem("authToken");
      // O Redux será atualizado quando o usuário tentar fazer uma requisição
    }
    return Promise.reject(error);
  }
);

export default api;