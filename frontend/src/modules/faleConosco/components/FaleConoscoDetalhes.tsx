import { useState } from "react";
import { formatDateTimeFullBR } from "../../../core/utils";
import Button from "../../../core/components/button";
import {Pencil} from "lucide-react";
import Modal from "../../../core/components/modal.tsx";
import FaleConoscoAtualizarStatus from "./FaleConoscoAtualizarStatus.tsx";
import {useUpdateStatusFaleConosco, useFaleConoscoItem} from "../hooks/useFaleConosco.ts";
import toast from "react-hot-toast";

interface FaleConoscoDetalhesProps {
  id: number;
  onClose: () => void;
}

export default function FaleConoscoDetalhes({
                                              id,
                                              onClose,
                                            }: FaleConoscoDetalhesProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { data: contato, isLoading } = useFaleConoscoItem(id);
  const { mutateAsync: atualizarStatus } = useUpdateStatusFaleConosco();

  const handleUpdate = async (data: any) => {
    try {
      const { id, ...payload } = data;
      await atualizarStatus({ id, payload });
      toast.success("Status atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar status.");
      console.error(error);
    }
  };

  if (isLoading || !contato) {
      return (
          <div className="p-10 flex justify-center">
              <p className="text-slate-500">Carregando detalhes...</p>
          </div>
      );
  }

  return (
      <div className="p-6 w-full">
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Detalhes do Contato
            </h2>
            <p className="text-sm text-slate-500">ID: #{contato.id}</p>
          </div>

          <Button
              variant="outlined"
              onClick={() => setIsEditModalOpen(true)}
              startIcon={<Pencil size={16} />}
          >
            Editar
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Nome
              </label>
              <p className="text-slate-700 font-medium">{contato.nome}</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                E-mail
              </label>
              <p className="text-slate-700 font-medium">{contato.email}</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Telefone
              </label>
              <p className="text-slate-700 font-medium">
                {contato.telefone || "-"}
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Cidade
              </label>
              <p className="text-slate-700 font-medium">
                {contato.cidade || "-"}
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Func. Responsável
              </label>
              <p className="text-slate-700 font-medium">
                {contato.nome_funcionario_responsavel || "-"}
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Site / Remetente
              </label>
              <p className="text-slate-700 font-medium">{contato.remetente}</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Serviço
              </label>
              <p className="text-slate-700 font-medium">{contato.servico}</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Status
              </label>
              <div className="mt-1">
              <span
                  className={`px-2 py-1 text-xs font-bold rounded-full ${
                      contato.status === "PENDENTE"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-emerald-100 text-emerald-700"
                  }`}
              >
                {contato.status}
              </span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Data do Envio
              </label>
              <p className="text-slate-700 font-medium">
                {formatDateTimeFullBR(contato.created_at!)}
              </p>
            </div>
          </section>

          <section className="col-span-full space-y-2 pt-4 border-t">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Assunto
            </label>
            <p className="text-slate-700 font-semibold">{contato.assunto}</p>
          </section>

          <section className="col-span-full space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Mensagem
            </label>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                {contato.mensagem}
              </p>
            </div>
          </section>

          <section className="col-span-full space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Observações
            </label>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                {contato.observacoes || "Nenhuma observação adicionada."}
              </p>
            </div>
          </section>
        </div>

          <div className="mt-8 flex justify-end">
            <Button variant="outlined" onClick={onClose}>
              Fechar
            </Button>
          </div>

          <Modal open={isEditModalOpen}
                 onClose={() => setIsEditModalOpen(false)}
                 maxWidth="md"
          >
            <FaleConoscoAtualizarStatus
                contato={contato}
                setIsEditModalOpen={setIsEditModalOpen}
                onUpdate={handleUpdate}
            />
          </Modal>
        </div>
  );
}