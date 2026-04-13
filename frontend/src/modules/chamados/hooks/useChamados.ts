import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  adicionarPrazoNoChamado,
  alterarStatusChamado,
  apagarChamado,
  buscarChamado,
  criarChamado,
  editarChamado,
  listarChamados,
  type ChamadosFiltros,
} from "../service/chamadoService";

export function useChamados(page = 1, filtros: ChamadosFiltros = {}) {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["chamados", page, filtros],
    queryFn: () => listarChamados(page, filtros),
    staleTime: Infinity,
  });

  return { data, isLoading, isFetching, error };
}

export function useChamado(id: string | undefined) {
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["chamado", id],
    queryFn: () => buscarChamado(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    initialData: () => {
      const queries = queryClient.getQueriesData({ queryKey: ["chamados"] });
      for (const [, queryData] of queries) {
        const chamado = (queryData as any)?.data?.find(
          (item: any) => String(item.id) === String(id)
        );
        if (chamado) return chamado;
      }
      return undefined;
    },
  });
  return { data, isLoading, isFetching, error };
}

export function useCreateChamado() {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, error, data } = useMutation({
    mutationFn: (data: any) => criarChamado(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chamados"] });
    },
  });
  return { mutate, mutateAsync, isPending, error, data };
}

export function useUpdateChamado() {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, error, data } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      editarChamado(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["chamados"] });
      queryClient.invalidateQueries({ queryKey: ["chamado", variables.id] });
    },
  });
  return { mutate, mutateAsync, isPending, error, data };
}

export function useUpdateStatusChamado() {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, error, data } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      alterarStatusChamado(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["chamados"] });
      queryClient.invalidateQueries({ queryKey: ["chamado", variables.id] });
    },
  });
  return { mutate, mutateAsync, isPending, error, data };
}

export function useUpdateAdicionarPrazoChamado() {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, error, data } = useMutation({
    mutationFn: ({
      id,
      prazo_estimado_finalizacao,
    }: {
      id: string;
      prazo_estimado_finalizacao: string;
    }) => adicionarPrazoNoChamado(id, prazo_estimado_finalizacao),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["chamados"] });
      queryClient.invalidateQueries({ queryKey: ["chamado", variables.id] });
    },
  });

  return { mutate, mutateAsync, isPending, error, data };
}

export function useDeleteChamado() {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, error } = useMutation({
    mutationFn: (id: string) => apagarChamado(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chamados"] });
    },
  });
  return { mutate, mutateAsync, isPending, error };
}