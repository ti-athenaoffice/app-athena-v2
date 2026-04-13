import api from "../../../core/service/api";
import type { Page } from "../../../core/types/Page";
import type {
  Chamado
} from "../types/Chamado";

const ENDPOINT = "api/chamados";

export interface ChamadosFiltros {
  protocolo?: string;
  status?: string;
  visualizar?: string;
  prioridade?: string;
}

/**
 * Listar chamados (Suporta paginação do Laravel)
 */
export const listarChamados = async (
  page = 1,
  filtros: ChamadosFiltros = {},
) => {
  const params = {
    page,
    ...Object.fromEntries(
      Object.entries(filtros).filter(([_, value]) => value !== "" && value != null),
    ),
  };

  const { data } = await api.get<Page<Chamado>>(ENDPOINT, { params });
  return data;
};

/**
 * Criar novo
 */
export const criarChamado = async (payload: any) => {
  const { data } = await api.post<Chamado>(`${ENDPOINT}`, payload);
  return data;
};

/**
 * Editar existente
 */
export const editarChamado = async (id: string, payload: any) => {
  const { data } = await api.put<Chamado>(`${ENDPOINT}/${id}`, payload);
  return data;
};

/**
 * Alterar apenas Status
 */
export const alterarStatusChamado = async (id: string, payload: string) => {
  const { data } = await api.put<Chamado>(`${ENDPOINT}/${id}/status`, { status: payload });
  return data;
};


export const adicionarPrazoNoChamado = async (id: string, payload: string) => {
  const { data } = await api.put<Chamado>(`${ENDPOINT}/${id}/adicionar-prazo`, { prazo_estimado_finalizacao: payload });
  return data;
};

/**
 * Deletar
 */
export const apagarChamado = async (id: string) => {
  await api.delete(`${ENDPOINT}/${id}`);
};

/**
 * Buscar um único
 */
export const buscarChamado = async (id: string) => {
  const { data } = await api.get<Chamado>(`${ENDPOINT}/${id}`);
  return data;
};