import type { Column } from "../../../core/components/table";
import { formatDateTimeFullBR } from "../../../core/utils";
import type { Assinatura } from "../types/Assinatura";

export const AssinaturaColumns: Column<Assinatura>[] = [
  {
    header: "ID",
    accessor: "id",
  },
  {
    header: "Plano",
    accessor: "plano",
  },
  {
    header: "Cliente Email",
    accessor: "email_cliente",
  },
  {
    header: "Documentos Enviados",
    accessor: (item) => item.foiEnviadoDocumentos ? "Sim" : "Não",
  },
  {
      header: "Criado em",
      accessor: (item) =>
        item.created_at ? formatDateTimeFullBR(item.created_at.toString()) : "-"
    },
];
