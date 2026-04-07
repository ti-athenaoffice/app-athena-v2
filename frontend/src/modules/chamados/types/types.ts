import type { Chamado } from "./Chamado";

export const mockChamados: Chamado[] = [
  {
    id: "1",
    protocolo: "2026001",
    titulo: "Erro no acesso ao ERP",
    status: "ABERTO",
    setor_solicitado: "Financeiro",
    setor_solicitante: "TI",
    data: "06/04/2026",
  },
  {
    id: "2",
    protocolo: "2026002",
    titulo: "Troca de toner impressora",
    status: "EM_ATENDIMENTO",
    setor_solicitado: "RH",
    setor_solicitante: "TI",
    data: "05/04/2026",
  },
  {
    id: "3",
    protocolo: "2026003",
    titulo: "Ajuste de permissão",
    status: "CONCLUIDO",
    setor_solicitado: "TI",
    setor_solicitante: "TI",
    data: "04/04/2026",
  },
];
