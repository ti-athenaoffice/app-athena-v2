import { User, Building2, ArrowRight, UserCheck } from "lucide-react";

interface ChamadoTechnicalInfoProps {
  chamado: {
    nome_funcionario?: string;
    setor_solicitante: string;
    setor_solicitado: string;
    nome_funcionario_responsavel?: string;
    prioridade?: string;
  };
}

function SectionTitle({ title }: { title: string }) {
  return <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">{title}</h3>;
}

function TechnicalInfoItem({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
        <Icon size={16} strokeWidth={2.5} />
      </div>
      <div>
        <p className="text-[11px] font-medium text-slate-400 leading-none">{label}</p>
        <p className="text-sm font-semibold mt-1 text-slate-800">{value}</p>
      </div>
    </div>
  );
}

export default function ChamadoTechnicalInfo({ chamado }: ChamadoTechnicalInfoProps) {
  return (
    <div className="lg:col-span-1 space-y-6 border-r border-slate-100 pr-6">
      <SectionTitle title="Dados Técnicos" />

      <TechnicalInfoItem icon={User} label="Solicitante" value={chamado.nome_funcionario || 'Não informado'} />
      <TechnicalInfoItem icon={Building2} label="Setor Origem" value={chamado.setor_solicitante} />
      <TechnicalInfoItem icon={ArrowRight} label="Setor Destino" value={chamado.setor_solicitado} />
      <TechnicalInfoItem icon={UserCheck} label="Responsável" value={chamado.nome_funcionario_responsavel || 'Aguardando Atribuição'} />
    </div>
  );
}