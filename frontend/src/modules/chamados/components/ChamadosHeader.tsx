import {LayoutList, LayoutGrid, Plus, Ticket} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../../core/components/button";

interface ChamadosHeaderProps {
  viewMode: "list" | "kanban";
  onChangeViewMode: (mode: "list" | "kanban") => void;
}

export default function ChamadosHeader({ viewMode, onChangeViewMode }: ChamadosHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <Ticket className="h-6 w-6 text-blue-900" />

          <h1 className="text-2xl font-bold text-slate-800">
            Central de Chamados
          </h1>
        </div>

        <p className="mt-1 text-sm font-medium text-slate-500">
          Gerenciamento de solicitações internas da empresa
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex bg-white border border-slate-200 rounded-lg shadow-sm">
          <Button
            onClick={() => onChangeViewMode("list")}
            variant={viewMode === "list" ? "contained" : "text"}
            size="small"
            className={`h-6 p-2 rounded-md transition-all ${
              viewMode === "list"
                ? "bg-blue-900 text-white shadow-md"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <LayoutList size={20} />
          </Button>
          <Button
            onClick={() => onChangeViewMode("kanban")}
            variant={viewMode === "kanban" ? "contained" : "text"}
            size="small"
            className={`h-6 p-2 rounded-md transition-all ${
              viewMode === "kanban"
                ? "bg-blue-900 text-white shadow-md"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <LayoutGrid size={20} />
          </Button>
        </div>

        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={() => navigate("/chamados/novo")}
        >
          Novo Chamado
        </Button>
      </div>
    </div>
  );
}
