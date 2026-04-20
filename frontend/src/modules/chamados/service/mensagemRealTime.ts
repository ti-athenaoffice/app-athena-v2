import echo from "../../../echo.ts";

export function entrarCanalMensagensChamado(setor_solicitante: string, setor_solicitado: string) {
    return echo.private(`mensagens-chamados.${setor_solicitado}.${setor_solicitante}`);
}

export function ouvirNovaMensagemChamado(
    setor_solicitante: string,
    setor_solicitado: string,
    callback: (event: any) => void
) {
    const channel = entrarCanalMensagensChamado(setor_solicitante, setor_solicitado);
    channel.listen(".nova.mensagem.chamado", (event: any) => {
        callback(event);
    });
    return channel;
}