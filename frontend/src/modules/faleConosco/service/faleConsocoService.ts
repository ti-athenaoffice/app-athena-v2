import api from "../../../core/service/api";
import type { Page } from "../../../core/types/Page";
import type { FaleConosco } from "../types/FaleConosco";

const ENDPOINT = "/fale-conosco";

export const listarFaleConosco = async (page = 1, filters: any = {}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    ...filters
  });
  const { data } = await api.get<Page<FaleConosco>>(`${ENDPOINT}?${params.toString()}`);
  return data;
};

export const buscarFaleConosco = async (id: number | string) => {
  const { data } = await api.get<FaleConosco>(`${ENDPOINT}/${id}`);
  return data;
};

export const atualizarStatusFaleConosco = async (id: number, payload: any) => {
  const { data } = await api.put<FaleConosco>(`${ENDPOINT}/${id}`, payload);
  return data;
}