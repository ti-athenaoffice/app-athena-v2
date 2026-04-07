export interface Chamado {
  id: string;
  protocolo: string;
  titulo: string;
  descricao?: string;
  status: "ABERTO" | "EM_ATENDIMENTO" | "CONCLUIDO" | "CANCELADO";
  setor_solicitante: string;
  setor_solicitado: string;
  prioridade?: "Baixa" | "Média" | "Alta";
  nome_funcionario?: string;
  nome_funcionario_responsavel?: string;
  data: string;
  created_at?: string;
}

export interface CriarChamadoRequest {
  titulo: string;
  descricao: string;
  setorDestino: string;
  prioridade: "Baixa" | "Média" | "Alta";
}

export interface EditarChamadoRequest {
  titulo?: string;
  descricao?: string;
  setorDestino?: string;
  prioridade?: "Baixa" | "Média" | "Alta";
}