import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listarUsuarios } from "../../auth/service/usuarioService";
import { apagarUsuario, criarUsuario, editarUsuario } from "../service/api";

export function useUsuarios(page = 1, filters: any = {}) {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["usuarios", page, filters],
    staleTime: Infinity,
    queryFn: () => listarUsuarios(page, filters),
  });
  return { data, isLoading, isFetching, error };
}

export function useCreateUsuario() {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, error, data } = useMutation({
    mutationFn: (data: any) => criarUsuario(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });
  return { mutate, mutateAsync, isPending, error, data };
}

export function useUpdateUsuario() {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, error, data } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => editarUsuario(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });

  return { mutate, mutateAsync, isPending, error, data };
}

export function useDeleteUsuario(){
  const queryClient = useQueryClient();
    const { mutate, mutateAsync, isPending, error } = useMutation({
      mutationFn: (id: string) => apagarUsuario(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["usuarios"] });
      },
    });
    return { mutate, mutateAsync, isPending, error };
}