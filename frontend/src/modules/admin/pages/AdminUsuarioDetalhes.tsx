import { CalendarDays, Edit2, Mail, Trash, User, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import Button from "../../../core/components/button";
import Confirmacao from "../../../core/components/confirmacao";
import type { Funcionario } from "../types/Funcionario";
import { useDeleteUsuario } from "../hooks/useUsuario";


interface AdminUsuarioDetalhesProps {
  usuario: Funcionario;
  onClose: () => void;
}

export default function AdminUsuarioDetalhes({
  usuario,
  onClose,
}: AdminUsuarioDetalhesProps) {
  const navigate = useNavigate();
  const [confirmarExclusao, setConfirmarExclusao] = useState(false);

  const { mutateAsync: apagarUsuario, isPending: isDeleting } = useDeleteUsuario();

  const onDelete = async() => {
    if (!usuario.id) return;
    await apagarUsuario(usuario.id.toString(), {
      onSuccess: () => {
        toast.success("Usuário excluído com sucesso!");
        setConfirmarExclusao(false);
        onClose();
      },
      onError: () => {
        toast.error("Erro ao excluir usuário. Tente novamente mais tarde.");
      },
    });
  };

  return (
    <div className="flex justify-between items-start gap-4 pb-4">
      <div>
        <div className="flex items-center gap-2 text-slate-500 mb-1">
          <span className="font-mono text-sm bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            #{String(usuario.id ?? 0).padStart(3, "0")}
          </span>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-950 tracking-tighter leading-tight flex items-center gap-2">
          <User size={28} />
          {usuario.nome}
        </h1>

        <div className="mt-3 space-y-2 text-sm text-slate-600">
          <p className="flex items-center gap-2">
            <Mail size={14} />
            {usuario.email}
          </p>

          <p className="flex items-center gap-2">
            <Briefcase size={14} />
            Setor: {usuario.setor}
          </p>

          {usuario.created_at && (
            <p className="flex items-center gap-2">
              <CalendarDays size={14} />
              Cadastrado em{" "}
              {new Date(usuario.created_at).toLocaleDateString("pt-BR")}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0 pt-2">
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
            navigate(`/admin/usuario/editar/${usuario.id}`, {
              state: { usuario },
            })
          }
        >
          Editar
        </Button>
      </div>

      <Confirmacao
        message="Deseja realmente excluir este usuário? Esta ação não poderá ser desfeita."
        onClose={() => setConfirmarExclusao(false)}
        onConfirm={onDelete}
        isLoading={isDeleting}
        open={confirmarExclusao}
      />
    </div>
  );
}