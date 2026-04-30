import { useQuery } from "@tanstack/react-query";
import { listarAssinaturas, buscarAssinatura } from "../service/assinaturaService";

export function useAssinaturas(page = 1, filters: any = {}) {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["assinaturas", page, filters],
    staleTime: 5000,
    queryFn: () => listarAssinaturas(page, filters),
  });
  return { data, isLoading, isFetching, error };
}

export function useAssinatura(id: string) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["assinatura", id],
        queryFn: () => buscarAssinatura(id),
        enabled: !!id,
    });
    return { data, isLoading, error };
}
