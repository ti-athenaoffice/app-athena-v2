import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  alterarStatusChamado,
  apagarChamado,
  buscarChamado,
  criarChamado,
  editarChamado,
  listarChamados,
} from "../service/chamadoService";

export function useChamados(page = 1) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["chamados", page],
    staleTime: Infinity,
    queryFn: () => listarChamados(page),
  });
  return { data, isLoading, error };
}

export function useChamado(id: string | undefined) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["chamado", id],
    queryFn: () => buscarChamado(id!),
    enabled: !!id,
  });
  return { data, isLoading, error };
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