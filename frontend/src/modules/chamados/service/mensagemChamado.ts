import api from "../../../core/service/api";
import type { Page } from "../../../core/types/Page";
import type MensagemChamado from "../types/MensagemChamado";

const ENDPOINT = "api/chamados";

export const listarMensagensChamados = async (chamadoId: string, page = 1) => {
  const { data } = await api.get<Page<MensagemChamado>>(`${ENDPOINT}/${chamadoId}/mensagens?page=${page}`);
  return data; 
};

export const criarMensagem = async (payload: any) => {
  const { data } = await api.post<MensagemChamado>(`${ENDPOINT}/mensagem`, payload);
  return data;
};
