import { CalendarDays, Check, Edit2, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../../core/components/button";
import type { Chamado } from "../types/Chamado";
import { useDeleteChamado, useUpdateStatusChamado } from "../hooks/useChamados";
import { useState } from "react";
import Confirmacao from "../../../core/components/confirmacao";
import toast from "react-hot-toast";
import {formatDateBR} from "../../../core/utils";

interface ChamadoHeaderProps {
  usuario: any;
  chamado: Chamado;
  onClose: () => void;
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    ABERTO: "bg-amber-100 text-amber-800 border-amber-200",
    EM_ATENDIMENTO: "bg-blue-100 text-blue-800 border-blue-200",
    CONCLUIDO: "bg-emerald-100 text-emerald-800 border-emerald-200",
    CANCELADO: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${styles[status] || "bg-slate-100 text-slate-600 border-slate-200"}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}

export default function ChamadoHeader({
  usuario,
  chamado,
  onClose,
}: ChamadoHeaderProps) {
  const navigate = useNavigate();

  const [confirmarFinalizacao, setConfirmarFinalizacao] = useState(false);
  const [confirmarEmAndamento, setConfirmarEmAndamento] = useState(false);
  const [confirmarExclusao, setConfirmarExclusao] = useState(false);
  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateStatusChamado();
  const { mutate: apagarChamado, isPending: isDeleting } = useDeleteChamado();
  const isFinalizado =
    chamado.status === "CONCLUIDO" || chamado.status === "CANCELADO";

  const onFinalizar = async () => {
    updateStatus(
      { id: chamado.id, status: "CONCLUIDO" },
      {
        onSuccess: () => {
          toast.success("Chamado finalizado com sucesso!");
          setConfirmarFinalizacao(false);
          onClose();
        },
        onError: () => {
          toast.error("Erro ao excluir chamado. Tente novamente mais tarde.");
        },
      },
    );
  };

  const onEmAndamento = async () => {
    updateStatus(
      { id: chamado.id, status: "EM_ANDAMENTO" },
      {
        onSuccess: () => {
          toast.success("Chamado assumido com sucesso.");
          setConfirmarEmAndamento(false);
          onClose();
        },
        onError: () => {
          toast.error("Erro ao assumir chamado. Tente novamente mais tarde.");
        },
      },
    );
  };

  const onDelete = async () => {
    apagarChamado(chamado.id, {
      onSuccess: () => {
        toast.success("Chamado excluído com sucesso!");
        onClose();
      },
      onError: () => {
        toast.error("Erro ao excluir chamado. Tente novamente mais tarde.");
      },
    });
  };

  // @ts-ignore
    return (
    <div className="flex justify-between items-start gap-4 pb-4 border-b border-slate-200">
      <div>
        <div className="flex items-center gap-2 text-slate-500 mb-1">
          <span className="font-mono text-sm bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            #{String(chamado.id).padStart(3, "0")}
          </span>
          <StatusBadge status={chamado.status} />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-950 tracking-tighter leading-tight">
          {chamado.titulo}
        </h1>
        <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5">
          <CalendarDays size={14} /> Aberto em{" "}
          {formatDateBR(chamado?.created_at?.toString() ?? "")} por{" "}
          {chamado.nome_funcionario || "Sistema"}
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0 pt-2">
        {!isFinalizado &&
          usuario?.setor === chamado.setor_solicitante &&
          chamado.status !== "EM_ANDAMENTO" && (
            <>
              <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<Trash size={16} />}
                onClick={() => setConfirmarExclusao(true)}
                isLoading={isDeleting}
              >
                Excluir
              </Button>

              <Button
                variant="outlined"
                color="primary"
                size="small"
                startIcon={<Edit2 size={16} />}
                onClick={() =>
                  navigate(`/chamados/editar/${chamado.id}`, {
                    state: { chamado },
                  })
                }
              >
                Editar
              </Button>
            </>
          )}
        {!isFinalizado &&
          usuario.setor === chamado.setor_solicitado &&
          chamado.status === "PENDENTE" && (
            <Button
              variant="contained"
              color="info"
              size="small"
              startIcon={<Check size={16} />}
              onClick={() => setConfirmarEmAndamento(true)}
              isLoading={isUpdating}
            >
              Assumir
            </Button>
          )}
        {!isFinalizado &&
          usuario?.setor !== chamado.setor_solicitante &&
          chamado.status === "EM_ANDAMENTO" && (
            <Button
              variant="contained"
              color="success"
              size="small"
              startIcon={<Check size={16} />}
              onClick={() => setConfirmarFinalizacao(true)}
              isLoading={isUpdating}
            >
              Finalizar
            </Button>
          )}
      </div>
      <Confirmacao
        message="Deseja realmente finalizar este chamado? Esta ação não poderá ser desfeita."
        onClose={() => setConfirmarFinalizacao(false)}
        isLoading={isUpdating}
        onConfirm={onFinalizar}
        open={confirmarFinalizacao}
      />
      <Confirmacao
        message="Deseja realmente assumir este chamado?"
        onClose={() => setConfirmarEmAndamento(false)}
        isLoading={isUpdating}
        onConfirm={onEmAndamento}
        open={confirmarEmAndamento}
      />
      <Confirmacao
        message="Deseja realmente excluir este chamado? Esta ação não poderá ser desfeita."
        onClose={() => setConfirmarExclusao(false)}
        onConfirm={onDelete}
        isLoading={isDeleting}
        open={confirmarExclusao}
      />
    </div>
  );
}
