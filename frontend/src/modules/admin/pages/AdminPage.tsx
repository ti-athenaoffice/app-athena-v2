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
    const { data: usuarios, isFetching } = useUsuarios(page);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUsuarioSelecionado(null);
  };

  const handleRowClick = (item: any) => {
    setIsModalOpen(true);
    setUsuarioSelecionado(item);
  };

  const columns = AdminUsuariosColumns as unknown as Column<{ id: string | number }>[];
    const [filtros, setFiltros] = useState<[]>({
        nome: "",
        setor: "",
        status: "",
        role: "",
    });

    const handleChangeFiltro = (
        field: keyof Array,
        value: unknown
    ) => {
        setFiltros((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
  return (
      <div className="space-y-6">
        <UsuariosHeader />
        <UsuariosFilters
            filtros={filtros}
            onChange={handleChangeFiltro}
            onClear={() =>
                setFiltros({
                    nome: "",
                    setor: "",
                    status: "",
                    role: "",
                })
            }
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
