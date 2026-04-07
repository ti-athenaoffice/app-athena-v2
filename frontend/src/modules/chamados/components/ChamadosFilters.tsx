import { Filter } from "lucide-react";
import Input from "../../../core/components/input";
import Select from "../../../core/components/select";
import Button from "../../../core/components/button";
import { getStatusOptions } from "../../../core/utils/selectOptions";

interface ChamadosFiltersProps {
  search: string;
  onSearch: (value: string) => void;
}

export default function ChamadosFilters({ search, onSearch }: ChamadosFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
      <div className="md:col-span-1">
        <Input
          label="Pesquisar Protocolo"
          placeholder="Ex: 2026001..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div>
        <Select
          label="Status"
          placeholder="Todos os Status"
          options={getStatusOptions()}
        />
      </div>

      <div>
        <Select
          label="Direcionamento"
          placeholder="Tudo"
          options={[
            { value: "BY_SECTOR", label: "Pelo meu setor" },
            { value: "TO_SECTOR", label: "Para o meu setor" },
          ]}
        />
      </div>

      <Button variant="outlined" startIcon={<Filter size={16} />}>
        Limpar Filtros
      </Button>
    </div>
  );
}
