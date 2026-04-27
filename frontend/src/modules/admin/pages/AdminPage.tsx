import { Table, type Column } from "../../../core/components/table";
import { useUsuarios } from "../hooks/useUsuario";
import { AdminUsuariosColumns } from "./AdminUsuarioColumns";
import Modal from "../../../core/components/modal";
import AdminUsuarioDetalhes from "./AdminUsuarioDetalhes";
import { useState } from "react"; 
import type { Funcionario } from "../types/Funcionario";
import {Paginacao} from "../../../core/components/paginacao.tsx";
import UsuariosFilters from "../components/UsuarioFiltros.tsx";
import UsuariosHeader from "../components/UsuarioHeader.tsx";

export default function AdminPage() {
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState<Funcionario | null>(null);
    const [nomeInput, setNomeInput] = useState("");
    const [filtros, setFiltros] = useState<any>({
        nome: "",
        setor: "",
    });
    const { data: usuarios, isFetching } = useUsuarios(page, filtros);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setUsuarioSelecionado(null);
    };

    const handleRowClick = (item: any) => {
        setIsModalOpen(true);
        setUsuarioSelecionado(item);
    };

    const columns = AdminUsuariosColumns as unknown as Column<{ id: string | number }>[];

    const handleChangeFiltro = (
        field: string,
        value: unknown
    ) => {
        setFiltros((prev: any) => ({
            ...prev,
            [field]: value,
        }));
        setPage(1);
    };
  return (
      <div className="space-y-6">
        <UsuariosHeader />
        <UsuariosFilters
            filtros={filtros}
            nomeInput={nomeInput}
            onNomeInputChange={setNomeInput}
            onSearch={() => handleChangeFiltro("nome", nomeInput)}
            onChange={handleChangeFiltro}
            onClear={() => {
                setNomeInput("");
                setFiltros({
                    nome: "",
                    setor: "",
                });
                setPage(1);
            }}
        />
        <Table
            columns={columns}
            data={usuarios?.data ?? []}
            onRowClick={handleRowClick}
            isLoading={isFetching}
            emptyMessage="Nenhum chamado encontrado."
        />
        <Paginacao
            meta={usuarios}
            onPageChange={(newPage) => setPage(newPage)}
        />

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        {usuarioSelecionado && (
          <AdminUsuarioDetalhes
            usuario={usuarioSelecionado}
            onClose={handleCloseModal}
          />
        )}
      </Modal>
    </div>
  );
}
