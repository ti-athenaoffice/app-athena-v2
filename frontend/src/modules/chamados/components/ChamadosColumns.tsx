import { ArrowLeftRight } from "lucide-react";
import type { Chamado } from "../types/Chamado";
import { formatShortDate, formatDateTimeFullBR } from "../../../core/utils/dateUtils";
import type { Column } from "../../../core/components/table";

export const chamadosColumns: Column<Chamado>[] = [
  {
    header: "Protocolo",
    accessor: (item: Chamado) => (
        <span className="font-bold text-blue-600">
        #{String(item.id).padStart(3, "0")}
      </span>
    ),
  },
  {
    header: "Título",
    accessor: "titulo" as keyof Chamado,
  },
  {
    header: "Fluxo",
    accessor: (item: Chamado) => (
        <div className="flex items-center gap-2 text-[11px]">
        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
          {item.setor_solicitante}
        </span>
          <ArrowLeftRight size={12} className="text-slate-400" />
          <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100 font-semibold">
          {item.setor_solicitado}
        </span>
        </div>
    ),
  },
  {
    header: "Status",
    accessor: (item: Chamado) => {
      const styles: Record<string, string> = {
        PENDENTE: "bg-amber-100 text-amber-700 border-amber-200",
        ABERTO: "bg-amber-100 text-amber-700 border-amber-200",
        EM_ATENDIMENTO: "bg-blue-100 text-blue-700 border-blue-200",
        EM_ANDAMENTO: "bg-blue-100 text-blue-700 border-blue-200",
        CONCLUIDO: "bg-emerald-100 text-emerald-700 border-emerald-200",
        CANCELADO: "bg-red-100 text-red-700 border-red-200",
      };

      return (
          <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
                  styles[item.status] || "bg-slate-100 text-slate-600 border-slate-200"
              }`}
          >
          {item.status.replace("_", " ")}
        </span>
      );
    },
  },
  {
    header: "Prioridade",
    accessor: (item: Chamado) => {
      const styles: Record<string, string> = {
        Baixa: "bg-green-100 text-green-700 border-green-200",
        Média: "bg-yellow-100 text-yellow-700 border-yellow-200",
        Alta: "bg-orange-100 text-orange-700 border-orange-200",
        BAIXA: "bg-green-100 text-green-700 border-green-200",
        MEDIA: "bg-yellow-100 text-yellow-700 border-yellow-200",
        MÉDIA: "bg-yellow-100 text-yellow-700 border-yellow-200",
        ALTA: "bg-orange-100 text-orange-700 border-orange-200",
        URGENTE: "bg-red-100 text-red-700 border-red-200",
      };

      return (
          <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
                  styles[item.prioridade] || "bg-slate-100 text-slate-600 border-slate-200"
              }`}
          >
          {item.prioridade.replace("_", " ")}
        </span>
      );
    },
  },
  {
    header: "Solicitado em",
    accessor: (item: Chamado) => {
      const createdAt = item.created_at ? new Date(item.created_at) : null;

      return (
          <div className="text-xs">
            <div className="font-medium text-slate-700">
              {createdAt ? formatDateTimeFullBR(createdAt.toDateString()) : "—"}
            </div>
            <div className="text-slate-500">
              {createdAt ? formatShortDate(createdAt.toDateString()) : "—"}
            </div>
          </div>
      );
    },
  },
];