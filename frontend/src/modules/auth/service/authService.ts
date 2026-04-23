import api from "../../../core/service/api";
import type { Login } from "../types/Login";

export async function processarLogin(login: Login) {
  const response = await api.post("/login", {
    email: login.email,
    senha: login.senha,
  });
  return response.data; 
}

export async function processarLogout() {
  await api.post("/logout");
}
