import {listarRoles} from "../service/authService.ts";
import {useQuery} from "@tanstack/react-query";


export function useRoles () {
    const { data, isLoading, isFetching, error } = useQuery({
        queryKey: ["roles"],
        staleTime: Infinity,
        queryFn: () => listarRoles(),
    });
    return { data, isLoading, isFetching, error };
}