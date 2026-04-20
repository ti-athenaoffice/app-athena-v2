import api from "../../../core/service/api";
import type { Page } from "../../../core/types/Page";
import type { Usuario } from "../../auth/types/Usuario";
import type { Funcionario } from "../types/Funcionario";

const ENDPOINT = "/usuarios";

export const listarUsuarios = async (chamadoId: string, page = 1) => {
  const { data } = await api.get<Page<Usuario>>(`${ENDPOINT}/${chamadoId}/mensagens?page=${page}`);
  return data; 
};

export const criarUsuario = async (payload: Funcionario) => {
  const { data } = await api.post<Usuario>(`${ENDPOINT}`, payload);
  return data;
};

export const editarUsuario = async (id: string, payload: Funcionario) => {
  const { data } = await api.put<Usuario>(`${ENDPOINT}/${id}`, payload);
  return data;
};

export const apagarUsuario = async (id: string) => {
  const { data } = await api.delete<Usuario>(`${ENDPOINT}/${id}`);
  return data;
};
