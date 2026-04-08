import { useMemo, useState } from "react";
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

export default function ChamadosPage() {
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");
  const [search, setSearch] = useState("");
  const [selectedChamado, setSelectedChamado] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: chamados, isLoading, error } = useChamados();
  const queryClient = useQueryClient();

  const filteredChamados = useMemo(
    () =>
      chamados?.data?.filter(
        (item) =>
          item.id.toString().includes(search.toLowerCase()) ||
          item.titulo.toLowerCase().includes(search.toLowerCase()),
      ),
    [chamados, search],
  );

  const handleRowClick = (item: any) => {
    setSelectedChamado(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedChamado(null);
  };

  const handleRefetch = () => {
    queryClient.invalidateQueries({ queryKey: ["chamados"] });
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

      <ChamadosFilters search={search} onSearch={setSearch} />
      {viewMode === "list" ? (
        <Table
          columns={chamadosColumns}
          data={filteredChamados}
          onRowClick={handleRowClick}
          isLoading={isLoading}
          emptyMessage="Nenhum chamado encontrado."
        />
      ) : (
        <ChamadosKanban data={filteredChamados} onCardClick={handleRowClick} />
      )}

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        title={
          selectedChamado
            ? `Chamado #${String(selectedChamado.id).padStart(3, "0")}`
            : ""
        }
        maxWidth="lg"
      >
        {selectedChamado && (
          <ChamadosDetalhes
            chamado={selectedChamado}
            onClose={handleCloseModal}
          />
        )}
      </Modal>
    </div>
  );
}