import { useState } from "react";
import {
  User,
  Building2,
  ArrowRight,
  UserCheck,
  UserCogIcon,
  Calendar,
  Clock,
  CheckCircle2,
  X,
  Check,
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";

import type { Chamado } from "../types/Chamado";
import { formatDateTimeFullBR } from "../../../core/utils";
import { DateTimeInput } from "../../../core/components/dateTimeInput";
import Button from "../../../core/components/button";
import { useAppSelector } from "../../../core/store/hooks";
import { selectUser } from "../../../core/store/selectors/authSelectors";
import { useUpdateAdicionarPrazoChamado } from "../hooks/useChamados";

interface ChamadoTechnicalInfoProps {
  chamado: Chamado;
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
      {title}
    </h3>
  );
}

function TechnicalInfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
        <Icon size={16} strokeWidth={2.5} />
      </div>
      <div>
        <p className="text-[11px] font-medium text-slate-400 leading-none">
          {label}
        </p>
        <p className="text-sm font-semibold mt-1 text-slate-800">{value}</p>
      </div>
    </div>
  );
}

export default function ChamadoTechnicalInfo({ chamado }: ChamadoTechnicalInfoProps) {
  const [isEditingPrazo, setIsEditingPrazo] = useState(false);
  const usuario = useAppSelector(selectUser);
  const { mutateAsync: addPrazoChamado } = useUpdateAdicionarPrazoChamado();

  const usuarioPodeAlterarPrazo =
    usuario?.setor && usuario.setor !== chamado.setor_solicitante;

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      prazo_estimado_finalizacao: chamado.prazo_estimado_finalizacao || "",
    },
  });

  const onSavePrazo = async (data: any) => {
    try {
      await addPrazoChamado({
        id: chamado.id,
        prazo_estimado_finalizacao: data.prazo_estimado_finalizacao
      });
      toast.success("Prazo definido com sucesso!");
      setIsEditingPrazo(false);
    } catch (error) {
      toast.error("Erro ao salvar o prazo.");
    }
  };

  return (
    <div className="lg:col-span-1 space-y-6 border-r border-slate-100 pr-6">
      <SectionTitle title="Dados Técnicos" />

      <TechnicalInfoItem icon={User} label="Solicitante" value={chamado.nome_funcionario || "Não informado"} />
      <TechnicalInfoItem icon={Building2} label="Setor Origem" value={chamado.setor_solicitante} />
      <TechnicalInfoItem icon={ArrowRight} label="Setor Destino" value={chamado.setor_solicitado} />
      <TechnicalInfoItem icon={UserCogIcon} label="Alvo da Solicitação" value={chamado.nome_funcionario_requisitado || "Nenhum"} />
      <TechnicalInfoItem icon={UserCheck} label="Técnico Responsável" value={chamado.nome_funcionario_responsavel || "Aguardando Atribuição"} />

      <div className="pt-4 mt-4 border-t border-slate-50 space-y-4">
        <SectionTitle title="Cronograma" />

        {/* 1. EXIBIÇÃO DO PRAZO (Sempre visível se existir) */}
        {!isEditingPrazo && (
          <div className="relative group">
            <TechnicalInfoItem
              icon={Clock}
              label="Prazo Estimado"
              value={chamado.prazo_estimado_finalizacao 
                ? formatDateTimeFullBR(chamado.prazo_estimado_finalizacao) 
                : "Não definido"}
            />
          </div>
        )}

        {/* 2. FORMULÁRIO DE EDIÇÃO/ADICIONAL (Aparece se for editar ou se não tiver prazo e puder add) */}
        {usuarioPodeAlterarPrazo && !chamado.data_fim_processo && (isEditingPrazo || !chamado.prazo_estimado_finalizacao) && (
          <div className="mt-2 rounded-xl border border-blue-100 bg-blue-50/60 p-4 shadow-sm">
            <form onSubmit={handleSubmit(onSavePrazo)} className="space-y-3">
              <Controller
                name="prazo_estimado_finalizacao"
                control={control}
                rules={{ required: "O prazo é obrigatório" }}
                render={({ field }) => (
                  <DateTimeInput
                    label={chamado.prazo_estimado_finalizacao ? "Alterar Prazo" : "Definir Prazo"}
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.prazo_estimado_finalizacao}
                    fullWidth
                  />
                )}
              />
              <div className="flex gap-2">
                <Button type="submit" variant="contained" disabled={isSubmitting} className="flex-1">
                  <Check size={16} className="mr-2" /> Confirmar
                </Button>
                {chamado.prazo_estimado_finalizacao && (
                  <Button type="button" variant="outlined" onClick={() => setIsEditingPrazo(false)}>
                    <X size={16} />
                  </Button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* 3. INÍCIO */}
        {chamado.data_inicio_processo && (
          <TechnicalInfoItem
            icon={Calendar}
            label="Início do Atendimento"
            value={formatDateTimeFullBR(chamado.data_inicio_processo)}
          />
        )}

        {/* 4. FIM */}
        {chamado.data_fim_processo && (
          <TechnicalInfoItem
            icon={CheckCircle2}
            label="Finalizado em"
            value={formatDateTimeFullBR(chamado.data_fim_processo)}
          />
        )}
      </div>
    </div>
  );
}
