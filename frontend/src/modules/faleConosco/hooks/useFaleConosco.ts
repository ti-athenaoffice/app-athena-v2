import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { listarFaleConosco, buscarFaleConosco, atualizarStatusFaleConosco as atualizarStatusFaleConoscoService } from "../service/faleConsocoService";
import type {Page} from "../../../core/types/Page.ts";
import type {FaleConosco} from "../types/FaleConosco.ts";

export function useFaleConosco(page = 1, filters: any = {}) {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["faleConosco", page, filters],
    staleTime: Infinity,
    queryFn: () => listarFaleConosco(page, filters),
  });
  return { data, isLoading, isFetching, error };
}

export function useFaleConoscoItem(id: number | undefined) {
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["faleConoscoItem", id],
    queryFn: () => buscarFaleConosco(id!),
    enabled: !!id,
    staleTime: Infinity,
    initialData: () => {
      const queries = queryClient.getQueriesData({ queryKey: ["faleConosco"] });
      for (const [, queryData] of queries) {
        const item = (queryData as any)?.data?.find(
            (i: any) => String(i.id) === String(id)
        );
        if (item) return item;
      }
      return undefined;
    },
  });
  return { data, isLoading, isFetching, error };
}

export function useUpdateFaleConoscoInCache() {
  const queryClient = useQueryClient();
  return (updatedItem: FaleConosco) => {
    queryClient.setQueriesData({ queryKey: ["faleConosco"] }, (oldData: Page<FaleConosco> | undefined) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        data: oldData.data.map((item) =>
          item.id === updatedItem.id ? { ...item, ...updatedItem } : item
        ),
      };
    });
    queryClient.setQueryData(["faleConoscoItem", updatedItem.id], updatedItem);
  };
}

export function useUpdateStatusFaleConosco() {
  const updateFaleConoscoInCache = useUpdateFaleConoscoInCache();

  const { mutate, mutateAsync, isPending, error, data } = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: any }) =>
        atualizarStatusFaleConoscoService(id, payload),
    onSuccess: (_) => {
      updateFaleConoscoInCache(_);
    },
  });

  return { mutate, mutateAsync, isPending, error, data };
}