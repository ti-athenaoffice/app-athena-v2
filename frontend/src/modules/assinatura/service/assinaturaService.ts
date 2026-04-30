import api from "../../../core/service/api";
import type { Page } from "../../../core/types/Page";
import type { Assinatura } from "../types/Assinatura";

const ENDPOINT = "/assinaturas";

export const listarAssinaturas = async (page = 1, filters: any = {}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    ...filters
  });
  const { data } = await api.get<Page<Assinatura>>(`${ENDPOINT}?${params.toString()}`);
  return data; 
};

export const buscarAssinatura = async (id: string) => {
    const { data } = await api.get<Assinatura>(`${ENDPOINT}/${id}`);
    return data;
};
