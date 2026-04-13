import type { Setores } from "../enums/Setores";
import type { PrioridadeChamado } from "../enums/PrioridadeChamado";
import type { StatusChamado } from "../enums/StatusChamado";

interface SelectOption {
  value: string;
  label: string;
}

// Mapeamento de setores para labels legíveis
const SETORES_LABELS: Record<Setores, string> = {
  TI: "Tecnologia da Informação",
  RH: "Recursos Humanos",
  MARKETING: "Marketing",
  JURIDICO: "Jurídico",
  FINANCEIRO: "Financeiro",
  ADMINISTRATIVO: "Administrativo",
  COMERCIAL: "Comercial",
  CONTABILIDADE: "Contabilidade",
  SECRETARIA: "Secretaria",
};

// Mapeamento de prioridades para labels legíveis
const PRIORIDADES_LABELS: Record<PrioridadeChamado, string> = {
  BAIXA: "Baixa",
  MEDIA: "Média",
  ALTA: "Alta",
  URGENTE: "Urgente",
};

// Mapeamento de status para labels legíveis
const STATUS_LABELS: Record<StatusChamado, string> = {
  EM_ANDAMENTO: "Em Andamento",
  PENDENTE: "Pendente",
  CONCLUIDO: "Concluído",
  CANCELADO: "Cancelado",
};

const VISUALIZAR_CHAMADOS: Record<string, string> = {
  PARA_MEU_SETOR: "Para meu Setor",
  DO_MEU_SETOR: "Do meu Setor"
} 

export function getVisualizarOptions(): SelectOption[] {
  return (Object.keys(VISUALIZAR_CHAMADOS) as Setores[]).map((setor) => ({
    value: setor,
    label: VISUALIZAR_CHAMADOS[setor],
  }));
}

// Função para obter opções de setores
export function getSetoresOptions(): SelectOption[] {
  return (Object.keys(SETORES_LABELS) as Setores[]).map((setor) => ({
    value: setor,
    label: SETORES_LABELS[setor],
  }));
}

// Função para obter opções de prioridades
export function getPrioridadesOptions(): SelectOption[] {
  return (Object.keys(PRIORIDADES_LABELS) as PrioridadeChamado[]).map((prioridade) => ({
    value: prioridade,
    label: PRIORIDADES_LABELS[prioridade],
  }));
}

// Função para obter opções de status
export function getStatusOptions(): SelectOption[] {
  return (Object.keys(STATUS_LABELS) as StatusChamado[]).map((status) => ({
    value: status,
    label: STATUS_LABELS[status],
  }));
}

// Função para obter apenas os valores do enum StatusChamado
export function getStatusValues(): StatusChamado[] {
  return Object.keys(STATUS_LABELS) as StatusChamado[];
}