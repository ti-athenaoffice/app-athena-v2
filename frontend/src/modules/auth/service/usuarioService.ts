import api from "../../../core/service/api";
import type { Page } from "../../../core/types/Page";
import type { Usuario } from "../types/Usuario";

const ENDPOINT = "/usuarios";

export const listarUsuarios = async (page = 1) => {
  const { data } = await api.get<Page<Usuario>>(`${ENDPOINT}?page=${page}`);
  return data; 
};