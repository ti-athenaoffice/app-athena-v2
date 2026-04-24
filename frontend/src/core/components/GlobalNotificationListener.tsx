import { useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import { selectUser, selectIsAuthenticated } from "../store/selectors/authSelectors";
import { notifyBrowser, requestNotificationPermission } from "../utils/browserNotification";
import { ouvirNovoChamado } from "../../modules/chamados/service/chamadosRealTime";
import echo from "../../echo";
import type { Chamado } from "../../modules/chamados/types/Chamado";

export default function GlobalNotificationListener() {
  const usuario = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      requestNotificationPermission();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated || !usuario?.id) return;

    const onNovoChamado = (novoChamado: Chamado) => {
      notifyBrowser({
        title: "Novo chamado para seu setor",
        body: novoChamado.titulo ?? "Um novo chamado foi aberto",
        tag: `chamado-${novoChamado.id}`,
        renotify: true,
        icon: "/logo-athena-white.png",
        badge: "/logo-athena-white.png",
        preventWhenVisible: false,
        onClick: (_event, notification) => {
          window.focus();
          notification.close();
          window.location.href = `/chamados`;
        },
      });
    };

    const onNovaMensagem = (event: any) => {
      const mensagem = event.mensagem || (event as any);
      const autorId = mensagem.usuario_id || mensagem.user_id || mensagem.autor_id;
      
      if (String(autorId) === String(usuario.id)) return;

      const chamadoId = mensagem.chamado_id || event.id;
      const texto = mensagem.descricao || mensagem.texto || "Você recebeu uma nova mensagem";

      notifyBrowser({
        title: `Nova mensagem no chamado #${chamadoId}`,
        body: texto,
        tag: `chamado-msg-${chamadoId}`,
        renotify: true,
        icon: "/logo-athena-white.png",
        badge: "/logo-athena-white.png",
        requireInteraction: true,
        preventWhenVisible: false,
        onClick: (_event, n) => {
          window.focus();
          n.close();
          window.location.href = `/chamados`;
        }
      });
    };

    const onNotification = (notification: any) => {
      notifyBrowser({
        title: notification.title || "Nova Notificação",
        body: notification.message || notification.body || "Você tem uma nova atualização",
        tag: notification.id || `notif-${Date.now()}`,
        icon: "/logo-athena-white.png",
        preventWhenVisible: false,
        onClick: (_event, n) => {
          window.focus();
          n.close();
        }
      });
    };

    const activeChannels: { stopListening: (event: string, callback?: any) => void }[] = [];

    const userChannel = echo.private(`App.Models.User.${usuario.id}`);
    userChannel.notification(onNotification);
    userChannel.listen(".nova.mensagem.chamado", onNovaMensagem);
    activeChannels.push(userChannel as any);

    const setores = usuario.setores_permitidos?.length ? usuario.setores_permitidos : [usuario.setor];
    
    const setoresValidos = [
      'TI', 'RH', 'MARKETING', 'JURIDICO', 'FINANCEIRO', 
      'ADMINISTRATIVO', 'COMERCIAL', 'CONTABILIDADE', 'SECRETARIA'
    ];

    setores.filter(Boolean).forEach(setor => {
      const chNovo = ouvirNovoChamado(setor!, onNovoChamado);
      activeChannels.push(chNovo as any);

      const sectorChannel = echo.private(`chamados.${setor}`);
      sectorChannel.listen(".nova.mensagem.chamado", onNovaMensagem);
      activeChannels.push(sectorChannel as any);

      setoresValidos.forEach(outroSetor => {
        const chMensagensRecebidas = echo.private(`mensagens-chamados.${setor}.${outroSetor}`);
        chMensagensRecebidas.listen(".nova.mensagem.chamado", onNovaMensagem);
        activeChannels.push(chMensagensRecebidas as any);

        const chMensagensEnviadas = echo.private(`mensagens-chamados.${outroSetor}.${setor}`);
        chMensagensEnviadas.listen(".nova.mensagem.chamado", onNovaMensagem);
        activeChannels.push(chMensagensEnviadas as any);
      });
    });

    return () => {
      activeChannels.forEach(channel => {
        channel.stopListening(".novo.chamado", onNovoChamado);
        channel.stopListening(".nova.mensagem.chamado", onNovaMensagem);
      });
      setores.filter(Boolean).forEach(setor => {
        echo.leave(`chamados.${setor}`);
        setoresValidos.forEach(outroSetor => {
           echo.leave(`mensagens-chamados.${setor}.${outroSetor}`);
           echo.leave(`mensagens-chamados.${outroSetor}.${setor}`);
        });
      });
      echo.leave(`App.Models.User.${usuario.id}`);
    };
  }, [isAuthenticated, usuario?.id, usuario?.setor, usuario?.setores_permitidos]);

  return null;
}