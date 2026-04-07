import { ArrowLeftRight } from "lucide-react";
import type { Column } from "../../../core/components/table";
import type { Chamado } from "../types/Chamado";
import { formatShortDate, formatRelativeTime } from "../../../core/utils/dateUtils";

export const chamadosColumns: Column<Chamado>[] = [
  {
    header: "Protocolo",
    // O log mostrou que não vem 'protocolo', vem 'id'
    accessor: (item) => (
      <span className="font-bold text-blue-600">
        #{String(item.id).padStart(3, "0")}
      </span>
    ),
  },
  { 
    header: "Título", 
    accessor: "titulo", // Este está correto (bate com o log)
    className: "font-medium text-slate-700" 
  },
  {
    header: "Fluxo",
    accessor: (item: any) => (
      <div className="flex items-center gap-2 text-[11px]">
        {/* No log veio 'setor_solicitante' e 'setor_solicitado' */}
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
    accessor: (item) => {
      const styles = {
        PENDENTE: "bg-amber-100 text-amber-700 border-amber-200", // Adicionado PENDENTE (estava no log)
        ABERTO: "bg-amber-100 text-amber-700 border-amber-200",
        EM_ATENDIMENTO: "bg-blue-100 text-blue-700 border-blue-200",
        CONCLUIDO: "bg-emerald-100 text-emerald-700 border-emerald-200",
      };

      return (
        <span
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
            styles[item.status as keyof typeof styles] || "bg-slate-100 text-slate-600"
          }`}
        >
          {item.status.replace("_", " ")}
        </span>
      );
    },
  },
  {
    header: "Criado em",
    accessor: (item: any) => (
      <div className="text-xs">
        <div className="font-medium text-slate-700">
          {formatShortDate(item.created_at)}
        </div>
        <div className="text-slate-500">
          {formatRelativeTime(item.created_at)}
        </div>
      </div>
    ),
    className: "text-slate-500"
  },
];