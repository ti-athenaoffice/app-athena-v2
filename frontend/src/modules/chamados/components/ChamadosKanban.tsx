import type { Chamado } from "../types/Chamado";
import { getStatusValues } from "../../../core/utils/selectOptions";
import {formatDateTimeBR} from "../../../core/utils";

interface ChamadosKanbanProps {
  data: Chamado[];
  onCardClick?: (item: Chamado) => void;
}

export default function ChamadosKanban({ data, onCardClick }: ChamadosKanbanProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {getStatusValues().map((status) => (
        <div key={status} className="flex flex-col bg-slate-100/50 rounded-xl border border-slate-200">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-bold text-blue-900 text-sm uppercase tracking-wider">
              {status.replace("_", " ")}
            </h3>
            <span className="bg-white px-2 py-0.5 rounded text-xs font-bold text-slate-500 shadow-sm">
              {data.filter((chamado) => chamado.status === status).length}
            </span>
          </div>
          <div className="p-3 space-y-3 overflow-y-auto h-200">
            {data
              .filter((chamado) => chamado.status === status)
              .map((chamado) => (
                <div
                  key={chamado.id}
                  className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:border-blue-400 transition-all cursor-pointer group "
                  onClick={onCardClick ? () => onCardClick(chamado) : undefined}
                >
                  <p className="text-[10px] font-bold text-blue-600 mb-1">#{chamado.id}</p>
                  <h4 className="text-sm font-bold text-slate-800 leading-tight group-hover:text-blue-900">
                    {chamado.titulo}
                  </h4>
                  <div className="mt-3 pt-3 border-t border-slate-50 flex justify-between items-center text-[10px] text-slate-500">
                    <span>De: {chamado.setor_solicitante}</span>
                    <span className="font-medium">{formatDateTimeBR(chamado?.created_at?.toString() ?? "") ?? "-"}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
