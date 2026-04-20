import api from "../../../core/service/api";
import type { Page } from "../../../core/types/Page";
import type MensagemChamado from "../types/MensagemChamado";

const ENDPOINT = "/chamados";

export async function buscarMensagensChamado(
  chamadoId: number | string,
  page = 1
) {
  const response = await api.get<Page<MensagemChamado>>(`${ENDPOINT}/${chamadoId}/mensagens`, {
    params: { page },
  });
  return response.data;
}

export const criarMensagem = async (payload: any) => {
  const { data } = await api.post<MensagemChamado>(`${ENDPOINT}/mensagem`, payload);
  return data;
};
