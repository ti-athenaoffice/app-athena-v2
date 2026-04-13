import { Filter, Search } from "lucide-react";
import Input from "../../../core/components/input";
import Select from "../../../core/components/select";
import Button from "../../../core/components/button";
import {
  getStatusOptions,
  getVisualizarOptions,
} from "../../../core/utils/selectOptions";
import type { ChamadosFiltros } from "../service/chamadoService";

interface ChamadosFiltersProps {
  filtros: ChamadosFiltros;
  protocoloInput: string;
  onProtocoloInputChange: (value: string) => void;
  onSearch: () => void;
  onChange: (field: keyof ChamadosFiltros, value: string) => void;
  onClear: () => void;
}
export default function ChamadosFilters({
  filtros,
  onChange,
  onClear,
  protocoloInput,
  onProtocoloInputChange,
  onSearch,
}: ChamadosFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
      <div className="flex">
        <Input
          label="Pesquisar Protocolo"
          placeholder="Ex: 2026001..."
          value={protocoloInput}
          onChange={(e) => onProtocoloInputChange(e.target.value)}
        />
        <Button
          variant="contained"
          size="small"
          onClick={onSearch}
          sx={{
            height: "30px",
            minWidth: "30px",
            marginLeft: "-30px",
            marginTop: "20px",
            padding: 0,
          }}
        >
          <Search size={16} />
        </Button>
      </div>

      <div>
        <Select
          label="Status"
          placeholder="Todos os Status"
          options={getStatusOptions()}
          value={filtros.status ?? ""}
          onChange={(e) => onChange("status", e.target.value)}
        />
      </div>

      <div>
        <Select
          label="Chamados"
          placeholder="Todos"
          options={getVisualizarOptions()}
          value={filtros.visualizar ?? "PARA_MEU_SETOR"}
          onChange={(e) => onChange("visualizar", e.target.value)}
        />
      </div>

      <Button
        variant="outlined"
        startIcon={<Filter size={16} />}
        onClick={onClear}
      >
        Limpar Filtros
      </Button>
    </div>
  );
}
