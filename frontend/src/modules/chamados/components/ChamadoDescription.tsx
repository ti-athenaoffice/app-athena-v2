import { FileText } from "lucide-react";

interface ChamadoDescriptionProps {
  descricao?: string;
}

export default function ChamadoDescription({
  descricao,
}: ChamadoDescriptionProps) {
  return (
    <section className="bg-slate-50 p-6 rounded-xl border border-slate-100">
      <div className="flex items-center gap-2 text-slate-800 mb-4">
        <FileText size={20} className="text-blue-700" />
        <h2 className="text-lg font-bold tracking-tight">
          Descrição Detalhada
        </h2>
      </div>
      <div
        className="prose prose-sm text-slate-700"
        dangerouslySetInnerHTML={{ __html: descricao || "" }}
      />
    </section>
  );
}
