import type { Column } from "../../../core/components/table";
import { formatDateTimeFullBR } from "../../../core/utils";
import type { Usuario } from "../../auth/types/Usuario";

export const AdminUsuariosColumns: Column<Usuario>[] = [
  {
    header: "ID",
    accessor: "id",
  },
  {
    header: "Nome",
    accessor: "nome",
  },
  {
    header: "E-mail",
    accessor: "email",
  },
  {
    header: "Setor",
    accessor: (item) => item.setor || "-",
  },
  {
    header: "Criado em",
    accessor: (item) =>
      formatDateTimeFullBR(item.created_at.toString())
  },
];