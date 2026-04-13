import { useState } from "react";
import { Table } from "../../../core/components/table";
import Modal from "../../../core/components/modal";
import ChamadosHeader from "../components/ChamadosHeader";
import ChamadosFilters from "../components/ChamadosFilters";
import ChamadosKanban from "../components/ChamadosKanban";
import ChamadosDetalhes from "./ChamadosDetalhes";
import { chamadosColumns } from "../components/ChamadosColumns";
import { useChamados } from "../hooks/useChamados";
import Button from "../../../core/components/button";
import { useQueryClient } from "@tanstack/react-query";
import type { ChamadosFiltros } from "../service/chamadoService";

export default function ChamadosPage() {
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");
  const [page, setPage] = useState(1);
  const [selectedChamadoId, setSelectedChamadoId] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [protocoloInput, setProtocoloInput] = useState("");

  const [filtros, setFiltros] = useState<ChamadosFiltros>({
    protocolo: "",
    status: "",
    visualizar: "",
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

  const handleFilterChange = (field: keyof ChamadosFiltros, value: string) => {
    setPage(1);
    setFiltros((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClearFilters = () => {
    setPage(1);
    setProtocoloInput("");
    setFiltros({
      protocolo: "",
      status: "",
      visualizar: "",
      prioridade: "",
    });
  };


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
        <Table
          columns={chamadosColumns}
          data={chamados?.data ?? []}
          onRowClick={handleRowClick}
          isLoading={isFetching || isLoading}
          emptyMessage="Nenhum chamado encontrado."
        />
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
