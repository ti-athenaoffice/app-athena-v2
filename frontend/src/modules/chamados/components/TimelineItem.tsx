import { History } from "lucide-react";
import { formatDateTimeBR } from "../../../core/utils";

interface TimelineItemProps {
  icon: string;
  usuarioNome: string;
  usuarioSetor?: string;
  date: string;
  descricao: string;
  isSystem?: boolean;
}

export default function TimelineItem({ icon, usuarioNome, usuarioSetor, date, descricao, isSystem }: TimelineItemProps) {
  return (
    <div className="flex gap-4">
      <div className={`h-9 w-9 rounded-full flex items-center justify-center font-black text-sm shrink-0 shadow-inner ${isSystem ? 'bg-slate-100 text-slate-400' : 'bg-blue-50 text-blue-700'}`}>
        {isSystem ? <History size={16} /> : icon}
      </div>
      <div className={`flex-1 ${isSystem ? 'py-1' : ''}`}>
        <p className="text-sm">
          <span className="font-semibold text-slate-900">{usuarioNome ?? "Usuário"} ({usuarioSetor ?? "Setor não especificado"})</span>
          {isSystem ? <span className="text-slate-500"> (Nota do Sistema)</span> : ''}
          <span className="text-slate-400 text-xs ml-1"> • {formatDateTimeBR(date)}</span>
        </p>
        <div className={`text-sm mt-1 leading-relaxed ${isSystem ? 'text-slate-500 italic' : 'text-slate-700'}`}>
          {descricao}
        </div>
      </div>
    </div>
  );
}