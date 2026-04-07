import { MessageSquareText, History } from "lucide-react";
import Button from "../../../core/components/button";

interface ChamadoHistoryProps {
  // For now, static, but can be made dynamic later
}

function TimelineItem({ user, userName, date, content, isSystem }: { user: string; userName: string; date: string; content: string; isSystem?: boolean }) {
  return (
    <div className="flex gap-4">
      <div className={`h-9 w-9 rounded-full flex items-center justify-center font-black text-sm shrink-0 shadow-inner ${isSystem ? 'bg-slate-100 text-slate-400' : 'bg-blue-50 text-blue-700'}`}>
        {isSystem ? <History size={16} /> : user}
      </div>
      <div className={`flex-1 ${isSystem ? 'py-1' : ''}`}>
        <p className="text-sm">
          <span className="font-semibold text-slate-900">{userName}</span>
          {isSystem ? <span className="text-slate-500"> (Nota do Sistema)</span> : ''}
          <span className="text-slate-400 text-xs ml-2"> • {date}</span>
        </p>
        <div className={`text-sm mt-1 leading-relaxed ${isSystem ? 'text-slate-500 italic' : 'text-slate-700'}`}>
          {content}
        </div>
      </div>
    </div>
  );
}

export default function ChamadoHistory({}: ChamadoHistoryProps) {
  return (
    <section>
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2.5 text-slate-800">
          <MessageSquareText size={20} className="text-blue-700" />
          <h2 className="text-lg font-bold tracking-tight">Interações e Notas</h2>
        </div>
      </div>

      <div className="space-y-6">
        {/* Exemplo de Timeline/Histórico */}
        <TimelineItem
          user="GS"
          userName="Gabriel Santos (TI)"
          date="Amanhã às 10:30 (Previsão)"
          content="A prioridade foi ajustada para Alta devido à criticidade do setor."
          isSystem
        />
        <TimelineItem
          user="AM"
          userName="Alice Moreira (TI)"
          date="06/04/2026 às 14:20"
          content="Chamado atribuído à equipe de Infraestrutura para análise."
        />

        {/* INPUT DE NOVA MENSAGEM - MAIS DISCRETO */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex gap-4">
            <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-sm">JS</div>
            <div className="flex-1">
              <textarea
                placeholder="Responder ou adicionar atualização..."
                className="w-full p-3.5 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-100 transition-all resize-none"
                rows={2}
              />
              <div className="flex justify-end mt-2">
                <Button variant="contained" size="small">Publicar Resposta</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}