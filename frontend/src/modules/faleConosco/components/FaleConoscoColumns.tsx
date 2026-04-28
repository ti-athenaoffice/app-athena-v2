import type { Column } from "../../../core/components/table";
import { formatDateTimeFullBR } from "../../../core/utils";
import type { FaleConosco } from "../types/FaleConosco";

export const faleConoscoColumns: Column<FaleConosco>[] = [
  {
    header: "ID",
    accessor: "id",
    width: "60px",
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
    header: "Telefone",
    accessor: "telefone",
  },
  {
    header: "Serviço",
    accessor: "servico",
  },
  {
    header: "Site",
    accessor: "remetente",
  },
  {
    header: "Status",
    accessor: (item) => item.status || "PENDENTE",
  },
  {
    header: "Data",
    accessor: (item) =>
      item.created_at ? formatDateTimeFullBR(item.created_at) : "-"
  },
];
