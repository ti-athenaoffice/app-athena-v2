import { useEffect } from "react";
import { useAppSelector } from "../store/hooks.ts";
import { selectUser, selectIsAuthenticated } from "../store/selectors/authSelectors.ts";
import { notifyBrowser, requestNotificationPermission } from "../utils/browserNotification.ts";
import { ouvirNovoChamado, ouvirChamadoAtualizado } from "../../modules/chamados/service/chamadosRealTime.ts";
import echo from "../../echo.ts";
import type { Chamado } from "../../modules/chamados/types/Chamado.ts";

// Lista fixa de todos os setores que existem no sistema
const SETORES_DO_SISTEMA = [
  'TI', 'RH', 'MARKETING', 'JURIDICO', 'FINANCEIRO',
  'ADMINISTRATIVO', 'COMERCIAL', 'CONTABILIDADE', 'SECRETARIA'
];

// ─── Funções que criam notificações ──────────────────────────────────────────
// Cada função sabe exatamente qual mensagem mostrar para cada evento.

function notificarNovoChamado(chamado: Chamado) {
  notifyBrowser({
    title: "Novo chamado para seu setor",
    body: chamado.titulo ?? "Um novo chamado foi aberto",
    tag: `chamado-${chamado.id}`,
    renotify: true,
    icon: "/logo-athena-white.png",
    badge: "/logo-athena-white.png",
    preventWhenVisible: false,
    onClick: (_event, notification) => {
      window.focus();
      notification.close();
      window.location.href = "/chamados";
    },
  });
}

function notificarAtualizacaoChamado(chamado: Chamado) {
  notifyBrowser({
    title: `O status do chamado #${chamado.id} foi atualizado`,
    body: chamado.titulo ?? "Seu chamado foi atualizado",
    tag: `chamado-${chamado.id}`,
    renotify: true,
    icon: "/logo-athena-white.png",
    badge: "/logo-athena-white.png",
    preventWhenVisible: false,
    onClick: (_event, notification) => {
      window.focus();
      notification.close();
      window.location.href = "/chamados";
    },
  });
}

function notificarNovaMensagem(event: any, usuarioAtualId: string | number) {
  const mensagem = event.mensagem || event;

  // Ignora mensagens enviadas pelo próprio usuário
  const autorId = mensagem.usuario_id ?? mensagem.user_id ?? mensagem.autor_id;
  if (String(autorId) === String(usuarioAtualId)) return;

  const chamadoId = mensagem.chamado_id ?? event.id;
  const texto = mensagem.descricao ?? mensagem.texto ?? "Você recebeu uma nova mensagem";

  notifyBrowser({
    title: `Nova mensagem no chamado #${chamadoId}`,
    body: texto,
    tag: `chamado-msg-${chamadoId}`,
    renotify: true,
    icon: "/logo-athena-white.png",
    badge: "/logo-athena-white.png",
    requireInteraction: true,
    preventWhenVisible: false,
    onClick: (_event, notification) => {
      window.focus();
      notification.close();
      window.location.href = "/chamados";
    },
  });
}

function notificarNotificacaoGenerica(notification: any) {
  notifyBrowser({
    title: notification.title ?? "Nova Notificação",
    body: notification.message ?? notification.body ?? "Você tem uma nova atualização",
    tag: notification.id ?? `notif-${Date.now()}`,
    icon: "/logo-athena-white.png",
    preventWhenVisible: false,
    onClick: (_event, n) => {
      window.focus();
      n.close();
    },
  });
}

// ─── Funções que registram/cancelam a escuta nos canais ──────────────────────
// Separa a lógica de "o que ouvir" da lógica de "o que fazer ao ouvir".

function ouvirCanalDoUsuario(usuarioId: number, callbacks: {
  onMensagem: (event: any) => void;
  onNotificacao: (notification: any) => void;
}) {
  const canal = echo.private(`App.Models.User.${usuarioId}`);
  canal.notification(callbacks.onNotificacao);
  canal.listen(".nova.mensagem.chamado", callbacks.onMensagem);
  return canal;
}

function ouvirCanaisDoSetor(setor: string, callbacks: {
  onNovoChamado: (chamado: Chamado) => void;
  onChamadoAtualizado: (chamado: Chamado) => void;
  onMensagem: (event: any) => void;
}) {
  const canaisAbertos: any[] = [];

  // Ouve novos chamados criados nesse setor
  const canalNovoChamado = ouvirNovoChamado(setor, callbacks.onNovoChamado);
  canaisAbertos.push(canalNovoChamado);

  // Ouve chamados atualizados nesse setor
  const canalChamadoAtualizado = ouvirChamadoAtualizado(setor, callbacks.onChamadoAtualizado);
  canaisAbertos.push(canalChamadoAtualizado);

  // Ouve mensagens de chamados do próprio setor
  const canalSetor = echo.private(`chamados.${setor}`);
  canalSetor.listen(".nova.mensagem.chamado", callbacks.onMensagem);
  canaisAbertos.push(canalSetor);

  // Ouve mensagens trocadas entre esse setor e qualquer outro setor do sistema
  SETORES_DO_SISTEMA.forEach((outroSetor) => {
    const canalEnviadas = echo.private(`mensagens-chamados.${setor}.${outroSetor}`);
    canalEnviadas.listen(".nova.mensagem.chamado", callbacks.onMensagem);
    canaisAbertos.push(canalEnviadas);

    const canalRecebidas = echo.private(`mensagens-chamados.${outroSetor}.${setor}`);
    canalRecebidas.listen(".nova.mensagem.chamado", callbacks.onMensagem);
    canaisAbertos.push(canalRecebidas);
  });

  return canaisAbertos;
}

function sairDosCanaisDoSetor(setor: string) {
  echo.leave(`chamados.${setor}`);
  SETORES_DO_SISTEMA.forEach((outroSetor) => {
    echo.leave(`mensagens-chamados.${setor}.${outroSetor}`);
    echo.leave(`mensagens-chamados.${outroSetor}.${setor}`);
  });
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function GlobalNotificationListener() {
  const usuario = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  // Pede permissão para notificações assim que o usuário faz login
  useEffect(() => {
    if (isAuthenticated) {
      requestNotificationPermission();
    }
  }, [isAuthenticated]);

  // Registra os ouvintes de eventos quando o usuário está logado
  useEffect(() => {
    if (!isAuthenticated || !usuario?.id) return;

    // Prepara os callbacks passando o id do usuário para ignorar as próprias mensagens
    const onMensagem = (event: any) => notificarNovaMensagem(event, usuario.id);

    // Canal pessoal do usuário (notificações gerais + mensagens diretas)
    const canalUsuario = ouvirCanalDoUsuario(Number(usuario.id), {
      onMensagem,
      onNotificacao: notificarNotificacaoGenerica,
    });

    // Canal de cada setor que o usuário tem acesso
    const setoresDoUsuario = usuario.setores_permitidos?.length
        ? usuario.setores_permitidos
        : [usuario.setor];

    const todosOsCanaisDeSetor = setoresDoUsuario
        .filter(Boolean)
        .flatMap((setor) =>
            ouvirCanaisDoSetor(setor!, {
              onNovoChamado: notificarNovoChamado,
              onChamadoAtualizado: notificarAtualizacaoChamado,
              onMensagem,
            })
        );

    // Cleanup: para de ouvir todos os canais quando o usuário sai ou o componente desmonta
    return () => {
      canalUsuario.stopListening(".nova.mensagem.chamado");
      echo.leave(`App.Models.User.${usuario.id}`);

      setoresDoUsuario.filter(Boolean).forEach((setor) => {
        sairDosCanaisDoSetor(setor!);
      });

      todosOsCanaisDeSetor.forEach((canal) => {
        canal.stopListening?.(".nova.mensagem.chamado");
        canal.stopListening?.(".novo.chamado");
        canal.stopListening?.(".editar.chamado");
      });
    };
  }, [isAuthenticated, usuario?.id, usuario?.setor, usuario?.setores_permitidos]);

  return null;
}