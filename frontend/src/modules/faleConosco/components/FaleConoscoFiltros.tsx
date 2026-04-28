import { Filter, Search } from "lucide-react";
import Input from "../../../core/components/input";
import Select from "../../../core/components/select";
import Button from "../../../core/components/button";
import {getSiteOptions, getStatusOptions} from "../utils/options.ts";

export interface FaleConoscoFiltros {
    status?: string;
    nome?: string;
    remetente?: string;
}

interface FaleConoscoFiltersProps {
    filtros: FaleConoscoFiltros;
    empresaInput: string;
    onEmpresaInputChange: (value: string) => void;
    onSearch: () => void;
    onChange: (field: keyof FaleConoscoFiltros, value: unknown) => void;
    onClear: () => void;
}

export default function FaleConoscoFilters({
                                               filtros,
                                               empresaInput,
                                               onEmpresaInputChange,
                                               onSearch,
                                               onChange,
                                               onClear,
                                           }: FaleConoscoFiltersProps) {
    return (
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="flex">
                <Input
                    label="Nome"
                    placeholder="Digite o nome..."
                    value={empresaInput}
                    onChange={(e) => onEmpresaInputChange(e.target.value)}
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
                    label="Remetente"
                    placeholder="Todos os Sites"
                    options={getSiteOptions()}
                    value={filtros.remetente ?? ""}
                    onChange={(e) => onChange("remetente", e.target.value)}
                />
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