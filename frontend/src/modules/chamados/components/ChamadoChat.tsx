import { useState } from "react";
import { MessageSquareText } from "lucide-react";
import {
  useCreateMensagemChamado,
  useMensagemChamado,
} from "../hooks/useMensagemChamados";
import toast from "react-hot-toast";
import Button from "../../../core/components/button";
import TimelineItem from "./TimelineItem";
import { obterIconPerfil } from "../../../core/utils";
import Loading from "../../../core/components/loading";
import ErroMensagem from "../../../core/components/erroMensagem";
import { Alert } from "@mui/material";
import type { Chamado } from "../types/Chamado";
import type { Usuario } from "../../../core/store/types/authTypes";

interface ChamadoChatProps {
  chamado: Chamado;
  usuario: Usuario
}

export default function ChamadoChat({ usuario, chamado }: ChamadoChatProps) {
  const { data: mensagens, isLoading, error } = useMensagemChamado(chamado.id);
  const { mutate: criarMensagemMutate, isPending } = useCreateMensagemChamado();

  const [novaMensagem, setNovaMensagem] = useState("");

  const postarMensagemChamado = () => {
    if (!novaMensagem.trim()) {
      toast.error("Digite uma mensagem.");
      return;
    }

    criarMensagemMutate(
      {
        chamado_id: chamado.id,
        descricao: novaMensagem,
      },
      {
        onSuccess: () => {
          setNovaMensagem("");
          toast.success("Mensagem publicada com sucesso!");
        },
        onError: () => {
          toast.error("Erro ao publicar mensagem.");
        },
      },
    );
  };

  if (isLoading) {
    return <Loading message="Carregando mensagens... Só um instante." />;
  }

  if (error) {
    return (
      <ErroMensagem message="Erro ao carregar mensagens. Tente novamente mais tarde" />
    );
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2.5 text-slate-800">
          <MessageSquareText size={20} className="text-blue-700" />
          <h2 className="text-lg font-bold tracking-tight">Mensagens</h2>
        </div>
      </div>

      <div className="space-y-6">
        {mensagens?.data?.length ? (
          mensagens.data.map((msg) => (
            <TimelineItem
              key={msg.id}
              icon={obterIconPerfil(msg.usuario?.nome || "U")}
              usuarioNome={msg.usuario?.nome || "Usuário"}
              usuarioSetor={msg.usuario?.setor || ""}
              date={msg.created_at.toString()}
              descricao={msg.descricao}
            />
          ))
        ) : (
          <Alert severity="info" sx={{ mt: 2 }}>
            Sem mensagens por enquanto. Assim que alguém responder, as mensagens
            aparecerão aqui.
          </Alert>
        )}
        {chamado.status !== "CONCLUIDO" && (
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex gap-4">
              <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-sm">
                {usuario?.nome?.charAt(0) || "U"}
              </div>

              <div className="flex-1">
                <textarea
                  placeholder="Responder ou adicionar atualização..."
                  className="w-full p-3.5 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-100 transition-all resize-none"
                  rows={2}
                  value={novaMensagem}
                  onChange={(e) => setNovaMensagem(e.target.value)}
                />

                <div className="flex justify-end mt-2">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={postarMensagemChamado}
                    isLoading={isPending}
                  >
                    Publicar Resposta
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
