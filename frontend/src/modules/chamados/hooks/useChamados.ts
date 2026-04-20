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
import type {Chamado} from "../types/Chamado.ts";

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

export function useAddChamadoInCache() {
  const queryClient = useQueryClient();
  return (chamado: Chamado) => {
    queryClient.setQueriesData({ queryKey: ["chamados"] }, (oldData: any) => {
      if (!oldData?.data) return oldData;
      const alreadyExists = oldData.data.some(
          (item: Chamado) => String(item.id) === String(chamado.id)
      );
      if (alreadyExists) return oldData;
      return {
        ...oldData,
        data: [chamado, ...oldData.data],
      };
    });
    queryClient.setQueryData(["chamado", chamado.id], chamado);
  };
}

export function useDeleteChamadoInCache() {
  const queryClient = useQueryClient();
  return (id: string) => {
    queryClient.setQueriesData({ queryKey: ["chamados"] }, (oldData: any) => {
      if (!oldData) return oldData;
      if (Array.isArray(oldData.data)) {
        return {
          ...oldData,
          data: oldData.data.filter((item: any) => String(item.id) !== id),
        };
      }
      if (Array.isArray(oldData)) {
        return oldData.filter((item: any) => String(item.id) !== id);
      }
      return oldData;
    });
    queryClient.removeQueries({ queryKey: ["chamado", id] });
  };
}

export function useUpdateChamadoInCache() {
  const queryClient = useQueryClient();
  return (chamadoAtualizado: Chamado) => {
    queryClient.setQueriesData(
        { queryKey: ["chamados"] },
        (oldData: any) => {
          if (!oldData) return oldData;
          if (Array.isArray(oldData.data)) {
            return {
              ...oldData,
              data: oldData.data.map((item: Chamado) =>
                  String(item.id) === String(chamadoAtualizado.id)
                      ? chamadoAtualizado
                      : item
              ),
            };
          }
          if (Array.isArray(oldData)) {
            return oldData.map((item: Chamado) =>
                String(item.id) === String(chamadoAtualizado.id)
                    ? chamadoAtualizado
                    : item
            );
          }
          return oldData;
        }
    );
    queryClient.setQueryData(
        ["chamado", chamadoAtualizado.id],
        chamadoAtualizado
    );
  };
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