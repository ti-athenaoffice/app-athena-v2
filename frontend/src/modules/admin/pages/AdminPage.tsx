import { Plus } from "lucide-react";
import Button from "../../../core/components/button";
import { Table } from "../../../core/components/table";
import { useUsuarios } from "../hooks/useUsuario";
import { AdminUsuariosColumns } from "./AdminUsuarioColumns";
import { useNavigate } from "react-router-dom";
import Modal from "../../../core/components/modal";
import AdminUsuarioDetalhes from "./AdminUsuarioDetalhes";
import { useState } from "react"; 
import type { Funcionario } from "../types/Funcionario";

export default function AdminPage() {
  const { data: usuarios, isFetching } = useUsuarios();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Funcionario>(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUsuarioSelecionado(null);
  };

  const handleRowClick = (item: any) => {
    setIsModalOpen(true);
    setUsuarioSelecionado(item);
  };

  return (
    <>
      <div className="w-full flex justify-end py-6">
        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={() => navigate("/admin/usuario/novo")}
        >
          Novo Usuário
        </Button>
      </div>
      <Table
        columns={AdminUsuariosColumns}
        data={usuarios?.data ?? []}
        onRowClick={handleRowClick}
        isLoading={isFetching}
        emptyMessage="Nenhum chamado encontrado."
      />

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        {usuarioSelecionado && (
          <AdminUsuarioDetalhes
            usuario={usuarioSelecionado}
            onClose={handleCloseModal}
          />
        )}
      </Modal>
    </>
  );
}
