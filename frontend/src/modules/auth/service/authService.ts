import api from "../../../core/service/api";
import type { Login } from "../types/Login";
import axios from "axios";

export async function processarLogin(login: Login) {
  await axios.get(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, {
    withCredentials: true,
    withXSRFToken: true,
  });
  const response = await api.post("/login", {
    email: login.email,
    senha: login.senha,
  });
  return response.data; 
}

export async function processarLogout() {
  await axios.get(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, {
    withCredentials: true,
    withXSRFToken: true,
  });
  await api.post("/logout");
}