export interface Chamado {
  id: string;
  titulo: string;
  descricao?: string;
  status: "ABERTO" | "EM_ATENDIMENTO" | "CONCLUIDO" | "CANCELADO";
  setor_solicitante: string;
  setor_solicitado: string;
  prioridade: "Baixa" | "Média" | "Alta";
  nome_funcionario: string;
  nome_funcionario_responsavel?: string;
  nome_funcionario_requisitado?: string;
  data_fim_processo?: string;
  data_inicio_processo?: string;
  prazo_estimado_finalizacao?: string;
  usuario_id?: string;
  created_at?: Date;
  updated_at?: Date;
}

export const defaultValuesChamado: Partial<Chamado> = {
  prioridade: "Média",
  descricao: "",
};
