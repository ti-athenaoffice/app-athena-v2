import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { criarMensagem, buscarMensagensChamado } from "../service/mensagemChamado";
import type MensagemChamado from "../types/MensagemChamado.ts";

export function useMensagemChamado(chamadoId: number | string) {
  return useInfiniteQuery({
    queryKey: ["mensagens-chamado", String(chamadoId)],
    queryFn: ({ pageParam = 1 }) =>
      buscarMensagensChamado(chamadoId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.current_page < lastPage.last_page) {
        return lastPage.current_page + 1;
      }
      return undefined;
    },
  });
}

export function useAddMensagemChamadoInCache() {
  const queryClient = useQueryClient();

  return (chamadoId: string | number, mensagem: MensagemChamado) => {
    queryClient.setQueryData(
        ["mensagens-chamado", String(chamadoId)],
        (oldData: { pages: Array<{ data?: MensagemChamado[] }> } | undefined) => {
          if (!oldData) return oldData;
          const jaExiste = oldData.pages.some((page) =>
              (page.data ?? []).some(
                  (item) => String(item.id) === String(mensagem.id)
              )
          );
          if (jaExiste) return oldData;
          return {
            ...oldData,
              pages: oldData.pages.map((page, index) =>
                  index === oldData.pages.length - 1
                      ? { ...page, data: [...(page.data ?? []), mensagem] }
                      : page
              )
          };
        }
    );
  };
}

export function useCreateMensagemChamado() {
    const addMensagemChamadoInCache = useAddMensagemChamadoInCache();
    return useMutation({
        mutationFn: (data: { chamado_id: number | string; descricao: string }) =>
            criarMensagem(data),
        onSuccess: (novaMsg, variables) => {
            addMensagemChamadoInCache(variables.chamado_id, novaMsg);
        },
    });
}