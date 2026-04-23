import axios from "axios";
import api from "../../../core/service/api";
import type { Login } from "../types/Login";

const APP_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

async function ensureCsrfCookie() {
  await axios.get(`${APP_URL}/sanctum/csrf-cookie`, {
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
  });
}

export async function processarLogin(login: Login) {
  await ensureCsrfCookie();

  const response = await api.post("/login", {
    email: login.email,
    senha: login.senha,
  });
  return response.data; 
}

export async function processarLogout() {
  await ensureCsrfCookie();
  await api.post("/logout");
}
