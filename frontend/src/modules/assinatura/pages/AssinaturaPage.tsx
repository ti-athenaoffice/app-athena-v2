import { useState } from "react";
import { Table, type Column } from "../../../core/components/table";
import Modal from "../../../core/components/modal";
import { Paginacao } from "../../../core/components/paginacao.tsx";
import AssinaturaFiltros from "../components/AssinaturaFiltros.tsx";
import AssinaturaDetalhes from "../components/AssinaturaDetalhes.tsx";
import { AssinaturaColumns } from "../components/AssinaturaColumns.tsx";
import { useAssinaturas } from "../hooks/useAssinatura.ts";
import type { Assinatura } from "../types/Assinatura.ts";

export default function AssinaturaPage() {
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [assinaturaSelecionada, setAssinaturaSelecionada] = useState<Assinatura | null>(null);
    const [emailInput, setEmailInput] = useState("");
    const [filtros, setFiltros] = useState<any>({
        email_cliente: "",
        plano: "",
    });

    const { data: assinaturas, isFetching, isLoading } = useAssinaturas(page, filtros);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setAssinaturaSelecionada(null);
    };

    const handleRowClick = (item: any) => {
        setIsModalOpen(true);
        setAssinaturaSelecionada(item);
    };

    const handleChangeFiltro = (field: string, value: unknown) => {
        setFiltros((prev: any) => ({
            ...prev,
            [field]: value,
        }));
        setPage(1);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-slate-900">Assinaturas</h1>
                <p className="text-sm text-slate-500">Gerencie e visualize todas as assinaturas do sistema.</p>
            </div>

            <AssinaturaFiltros
                filtros={filtros}
                emailInput={emailInput}
                onEmailInputChange={setEmailInput}
                onSearch={() => handleChangeFiltro("email_cliente", emailInput)}
                onChange={handleChangeFiltro}
                onClear={() => {
                    setEmailInput("");
                    setFiltros({
                        email_cliente: "",
                        plano: "",
                    });
                    setPage(1);
                }}
            />

            <Table
                columns={AssinaturaColumns as unknown as Column<any>[]}
                data={assinaturas?.data ?? []}
                onRowClick={handleRowClick}
                isLoading={isLoading || isFetching}
                emptyMessage="Nenhuma assinatura encontrada."
            />

            <Paginacao
                meta={assinaturas}
                onPageChange={(newPage) => setPage(newPage)}
            />

            <Modal open={isModalOpen} onClose={handleCloseModal}>
                {assinaturaSelecionada && (
                    <AssinaturaDetalhes
                        assinatura={assinaturaSelecionada}
                        onClose={handleCloseModal}
                    />
                )}
            </Modal>
        </div>
    );
}