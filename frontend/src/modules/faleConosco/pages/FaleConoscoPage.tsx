import { useState } from "react";
import { Table } from "../../../core/components/table";
import { Paginacao } from "../../../core/components/paginacao";
import FaleConoscoFilters, {type FaleConoscoFiltros} from "../components/FaleConoscoFiltros.tsx";
import { useFaleConosco } from "../hooks/useFaleConosco";
import { faleConoscoColumns } from "../components/FaleConoscoColumns";
import Modal from "../../../core/components/modal";
import FaleConoscoDetalhes from "../components/FaleConoscoDetalhes";
import type { FaleConosco } from "../types/FaleConosco";
import FaleConoscoHeader from "../components/FaleConoscoHeader.tsx";

export default function FaleConoscoPage() {
    const [page, setPage] = useState(1);
    const [empresaInput, setEmpresaInput] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contatoSelecionadoId, setContatoSelecionadoId] = useState<number | null>(null);
    const [filtros, setFiltros] = useState<FaleConoscoFiltros>({
        status: "",
        nome: "",
        remetente: ""
    });

    const { data: faleConosco, isLoading, isFetching } = useFaleConosco(page, filtros);

    const handleFilterChange = (
        field: keyof FaleConoscoFiltros,
        value: unknown
    ) => {
        setPage(1);
        setFiltros((prev) => ({
            ...prev,
            [field]: value as string,
        }));
    };

    const handleClearFilters = () => {
        setPage(1);
        setEmpresaInput("");
        setFiltros({
            nome: "",
            status: "",
            remetente: ""
        });
    };

    const handleRowClick = (item: FaleConosco) => {
        setContatoSelecionadoId(item.id);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setContatoSelecionadoId(null);
    };

    return (
        <div className="space-y-6">
            <FaleConoscoHeader />

            <FaleConoscoFilters
                filtros={filtros}
                empresaInput={empresaInput}
                onEmpresaInputChange={setEmpresaInput}
                onSearch={() => handleFilterChange("nome", empresaInput)}
                onChange={handleFilterChange}
                onClear={handleClearFilters}
            />

            <Table<FaleConosco>
                columns={faleConoscoColumns}
                data={faleConosco?.data ?? []}
                isLoading={isFetching || isLoading}
                onRowClick={handleRowClick}
                emptyMessage="Nenhum contato encontrado."
            />

            <Paginacao
                meta={faleConosco}
                onPageChange={(newPage) => setPage(newPage)}
            />

            <Modal open={isModalOpen} onClose={handleCloseModal}>
                {contatoSelecionadoId && (
                    <FaleConoscoDetalhes
                        id={contatoSelecionadoId}
                        onClose={handleCloseModal}
                    />
                )}
            </Modal>
        </div>
    );
}