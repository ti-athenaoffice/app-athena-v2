import { useEffect, useMemo, useRef, useState } from "react";
import { MessageSquareText } from "lucide-react";
import {
  useAddMensagemChamadoInCache,
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
import {ouvirNovaMensagemChamado} from "../service/mensagemRealTime.ts";
import {ordenarMensagens, scrollToBottom} from "../utils/utils.ts";

interface ChamadoChatProps {
  chamado: Chamado;
  usuario: any;
}

export default function ChamadoChat({ usuario, chamado }: ChamadoChatProps) {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMensagemChamado(chamado.id);
  const { mutate: criarMensagemMutate, isPending } = useCreateMensagemChamado();
  const addMensagemChamadoInCache = useAddMensagemChamadoInCache();
  const [novaMensagem, setNovaMensagem] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const jaPosicionouNoFimRef = useRef(false);
  const deveRolarAposEnvioRef = useRef(false);
  const mensagens = useMemo(() => ordenarMensagens(data as any), [data]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !deveRolarAposEnvioRef.current) return;
    if (!mensagens.length) return;

    requestAnimationFrame(() => {
      container.scrollTop = container.scrollHeight;
      deveRolarAposEnvioRef.current = false;
    });
  }, [mensagens.length]);

  const postarMensagemChamado = () => {
    if (!novaMensagem.trim()) {
      toast.error("Digite uma mensagem.");
      return;
    }
    deveRolarAposEnvioRef.current = true;
    criarMensagemMutate({
        chamado_id: chamado.id,
        descricao: novaMensagem,
      },{
        onSuccess: () => {
          setNovaMensagem("");
          toast.success("Mensagem publicada com sucesso!");
          scrollToBottom(scrollRef.current);
        },
        onError: () => {
          toast.error("Erro ao publicar mensagem.");
          deveRolarAposEnvioRef.current = false;
        },
      },
    );
  };

  useEffect(() => {
    const onNovaMensagem = (mensagem: any) => {
      addMensagemChamadoInCache(chamado.id, mensagem.mensagem);

      const autorDaMensagem = String(mensagem.mensagem.usuario_id);
      const meuUsuarioId = String(usuario?.id);

      if (autorDaMensagem === meuUsuarioId) {
        return;
      }
    };

    const channel = ouvirNovaMensagemChamado(
        chamado.setor_solicitante,
        chamado.setor_solicitado,
        onNovaMensagem
    );

    return () => {
      channel.stopListening(".nova.mensagem.chamado", onNovaMensagem);
    };
  }, [chamado.id, chamado.setor_solicitante, chamado.setor_solicitado, usuario?.id, addMensagemChamadoInCache]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = async () => {
      if (container.scrollTop <= 80 && hasNextPage && !isFetchingNextPage) {
        const alturaAntes = container.scrollHeight;
        const scrollTopAntes = container.scrollTop;

        await fetchNextPage();

        requestAnimationFrame(() => {
          const novaAltura = container.scrollHeight;
          container.scrollTop = novaAltura - alturaAntes + scrollTopAntes;
        });
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || jaPosicionouNoFimRef.current || !mensagens.length) return;
    container.scrollTop = container.scrollHeight;
    jaPosicionouNoFimRef.current = true;
  }, [mensagens.length]);

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
        <div
          ref={scrollRef}
          className="max-h-[420px] overflow-y-auto pr-2"
        >
          {mensagens.length ? (
            <div className="space-y-6">
              {isFetchingNextPage && (
                <div className="flex items-center justify-center py-2">
                  <Loading size={30} message="Buscando mensagens..." />
                </div>
              )}

              {mensagens.map((msg: any) => (
                <TimelineItem
                  key={msg.id}
                  icon={obterIconPerfil(msg.usuario?.nome || "U")}
                  usuarioNome={msg.usuario?.nome || "Usuário"}
                  usuarioSetor={msg.usuario?.setor || ""}
                  date={msg?.created_at?.toString()}
                  descricao={msg.descricao}
                />
              ))}
            </div>
          ) : (
            <Alert severity="info" sx={{ mt: 2 }}>
              Sem mensagens por enquanto. Assim que alguém responder, as
              mensagens aparecerão aqui.
            </Alert>
          )}
        </div>

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