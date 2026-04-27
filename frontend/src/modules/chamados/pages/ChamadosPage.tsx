import { useEffect, useState } from "react";
import { Table } from "../../../core/components/table";
import Modal from "../../../core/components/modal";
import ChamadosHeader from "../components/ChamadosHeader";
import ChamadosFilters from "../components/ChamadosFilters";
import ChamadosKanban from "../components/ChamadosKanban";
import ChamadosDetalhes from "./ChamadosDetalhes";
import { chamadosColumns } from "../components/ChamadosColumns";
import {
  useAddChamadoInCache,
  useChamados,
  useDeleteChamadoInCache,
  useUpdateChamadoInCache
} from "../hooks/useChamados";
import Button from "../../../core/components/button";
import { useQueryClient } from "@tanstack/react-query";
import type { ChamadosFiltros } from "../service/chamadoService";
import {
  ouvirChamadoAtualizado, ouvirChamadoDeletado,
  ouvirNovoChamado,
} from "../service/chamadosRealTime";
import { selectUser } from "../../../core/store/selectors/authSelectors";
import { useAppSelector } from "../../../core/store/hooks";
import toast from "react-hot-toast";
import type { Chamado } from "../types/Chamado";
import {Paginacao} from "../../../core/components/paginacao.tsx";

export default function ChamadosPage() {
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");
  const [page, setPage] = useState(1);
  const [selectedChamadoId, setSelectedChamadoId] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [protocoloInput, setProtocoloInput] = useState("");
  const usuario = useAppSelector(selectUser);
  const addChamadoInCache = useAddChamadoInCache();
  const updateChamadoInCache = useUpdateChamadoInCache();
  const deleteChamadoInCache = useDeleteChamadoInCache();

  const [filtros, setFiltros] = useState<ChamadosFiltros>({
    protocolo: "",
    status: "",
    visualizar: "PARA_MEU_SETOR",
    prioridade: "",
  });

  const {
    data: chamados,
    isLoading,
    isFetching,
    error,
  } = useChamados(page, filtros);
  const queryClient = useQueryClient();

  const handleRowClick = (item: any) => {
    setSelectedChamadoId(item.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedChamadoId(null);
  };

  const handleRefetch = () => {
    queryClient.invalidateQueries({ queryKey: ["chamados"] });
  };

  const handleFilterChange = (field: keyof ChamadosFiltros, value: unknown) => {
    setPage(1);
    setFiltros((prev) => ({
      ...prev,
      [field]: value as string,
    }));
  };

  const handleClearFilters = () => {
    setPage(1);
    setProtocoloInput("");
    setFiltros({
      protocolo: "",
      status: "",
      visualizar: "PARA_MEU_SETOR",
      prioridade: "",
    });
  };

  useEffect(() => {
    if (!usuario?.setor) return;
    const onNovoChamado = (novoChamado: Chamado) => {
      const chamadoCompleto: Chamado = {
        ...novoChamado,
        id: String(novoChamado.id),
      };
      addChamadoInCache(chamadoCompleto);
    };

    const onChamadoAtualizado = (chamadoAtualizado: Chamado) => {
      const chamadoCompleto: Chamado = {
        ...chamadoAtualizado,
        id: String(chamadoAtualizado.id),
      };
      toast.success(`Chamado atualizado: ${chamadoCompleto.titulo}`);
      updateChamadoInCache(chamadoCompleto);
    };

    const onChamadoDeletado = (event: any) => {
      const id = String(event.chamadoId);
      deleteChamadoInCache(id);
    };

    const channel = ouvirNovoChamado(usuario.setor, onNovoChamado);
    const channelEdit = ouvirChamadoAtualizado(usuario.setor, onChamadoAtualizado);
    const channelDelete = ouvirChamadoDeletado(usuario.setor, onChamadoDeletado);

    return () => {
      channel.stopListening(".novo.chamado", onNovoChamado);
      channelEdit.stopListening(".editar.chamado", onChamadoAtualizado);
      channelDelete.stopListening(".apagar.chamado", onChamadoDeletado);
    };
  }, [usuario?.setor, queryClient]);

  if (error) {
    return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 font-medium mb-2">
              Erro ao carregar chamados
            </p>
            <p className="text-slate-600 text-sm my-5">
              {error instanceof Error ? error.message : "Erro desconhecido"}
            </p>
            <Button onClick={handleRefetch} variant="contained">
              Tentar novamente
            </Button>
          </div>
        </div>
    );
  }

  return (
      <div className="space-y-6">
        <ChamadosHeader viewMode={viewMode} onChangeViewMode={setViewMode} />

        <ChamadosFilters
            filtros={filtros}
            protocoloInput={protocoloInput}
            onProtocoloInputChange={setProtocoloInput}
            onSearch={() =>
                handleFilterChange("protocolo", protocoloInput.replace(/^0+/, ""))
            }
            onChange={handleFilterChange}
            onClear={handleClearFilters}
        />

        {viewMode === "list" ? (
            <>
              <Table
                  columns={chamadosColumns}
                  data={chamados?.data ?? []}
                  onRowClick={handleRowClick}
                  isLoading={isFetching || isLoading}
                  emptyMessage="Nenhum chamado encontrado."
              />
              <Paginacao
                  meta={chamados}
                  onPageChange={(newPage) => setPage(newPage)}
              />
            </>

        ) : (
            <ChamadosKanban
                data={chamados?.data ?? []}
                onCardClick={handleRowClick}
            />
        )}

        <Modal open={isModalOpen} onClose={handleCloseModal}>
          {selectedChamadoId && (
              <ChamadosDetalhes
                  chamadoId={selectedChamadoId}
                  onClose={handleCloseModal}
              />
          )}
        </Modal>
      </div>
  );
}