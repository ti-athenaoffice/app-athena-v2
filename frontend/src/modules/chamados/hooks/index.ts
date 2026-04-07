import { useState, useEffect, useCallback } from "react";
import type { 
  Chamado, 
  CriarChamadoRequest, 
  EditarChamadoRequest, 
} from "../types/Chamado";
import { 
  alterarStatusChamado, 
  apagarChamado, 
  buscarChamado, 
  criarChamado, 
  editarChamado, 
  listarChamados 
} from "../service/chamadoService";
import type { Page } from "../../../core/types/Page";

export function useChamados(page = 1) {
  const [pagination, setPagination] = useState<Page<Chamado> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChamados = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await listarChamados(page);
      setPagination(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao carregar chamados");
    } finally {
      setLoading(false);
    }
  }, [page]); // Recarrega se a página mudar

  useEffect(() => {
    fetchChamados();
  }, [fetchChamados]);

  return {
    chamados: pagination?.data || [], 
    meta: {
      total: pagination?.total || 0,
      currentPage: pagination?.current_page || 1,
      lastPage: pagination?.last_page || 1,
      perPage: pagination?.per_page || 10
    },
    loading, 
    error, 
    refetch: fetchChamados 
  };
}

// 2. Hook para buscar um único chamado (Mantém igual, pois não é paginado)
export function useChamado(id: string | undefined) {
  const [chamado, setChamado] = useState<Chamado | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChamado = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await buscarChamado(id);
      setChamado(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao carregar chamado");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchChamado();
  }, [fetchChamado]);

  return { chamado, loading, error, refetch: fetchChamado };
}

// Hooks de Ação (Create, Update, Status, Delete)
// Estes permanecem iguais, pois apenas disparam a requisição sem gerenciar estado de lista
export function useCreateChamado() {
  const [loading, setLoading] = useState(false);
  const create = async (data: CriarChamadoRequest) => {
    setLoading(true);
    try { return await criarChamado(data); } finally { setLoading(false); }
  };
  return { createChamado: create, loading };
}

export function useUpdateChamado() {
  const [loading, setLoading] = useState(false);
  const update = async (id: string, data: EditarChamadoRequest) => {
    setLoading(true);
    try { return await editarChamado(id, data); } finally { setLoading(false); }
  };
  return { updateChamado: update, loading };
}

export function useUpdateStatusChamado() {
  const [loading, setLoading] = useState(false);
  const update = async (id: string, data: string) => {
    setLoading(true);
    try { return await alterarStatusChamado(id, data); } finally { setLoading(false); }
  };
  return { updateStatus: update, loading };
}

export function useDeleteChamado() {
  const [loading, setLoading] = useState(false);
  const remove = async (id: string) => {
    setLoading(true);
    try { await apagarChamado(id); } finally { setLoading(false); }
  };
  return { deleteChamado: remove, loading };
}