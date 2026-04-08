import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { criarMensagem, listarMensagensChamados } from "../service/mensagemChamado";

export function useMensagemChamado(chamadoId: string | undefined) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["mensagem-chamado", chamadoId],
    queryFn: () => listarMensagensChamados(chamadoId!),
    staleTime: Infinity,
    enabled: !!chamadoId,
  });
  return { data, isLoading, error };
}

export function useCreateMensagemChamado() {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, error, data } = useMutation({
    mutationFn: (data: any) => criarMensagem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mensagem-chamado"] });
    },
  });
  return { mutate, mutateAsync, isPending, error, data };
}