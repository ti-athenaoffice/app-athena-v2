import api from "../../../core/service/api";
import type { Page } from "../../../core/types/Page";
import type { Usuario } from "../types/Usuario";

const ENDPOINT = "/usuarios";

export const listarUsuarios = async (page = 1, filters: any = {}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    ...filters
  });
  const { data } = await api.get<Page<Usuario>>(`${ENDPOINT}?${params.toString()}`);
  return data; 
};