type MensagemItem = {
    created_at?: string | Date | number;
};

type PaginaMensagens = {
    data?: MensagemItem[];
};

type MensagensResposta = {
    pages?: PaginaMensagens[];
};

export const ordenarMensagens = (dados: MensagensResposta) => {
    return (
        dados?.pages
            ?.flatMap((page: PaginaMensagens) => page.data ?? [])
            .sort((a: MensagemItem, b: MensagemItem) => {
                const dataA = new Date(a.created_at ?? 0).getTime();
                const dataB = new Date(b.created_at ?? 0).getTime();
                return dataA - dataB;
            }) ?? []
    );
};

export function scrollToBottom(container: HTMLElement | null) {
    if (!container) return;

    requestAnimationFrame(() => {
        container.scrollTop = container.scrollHeight;
    });
}