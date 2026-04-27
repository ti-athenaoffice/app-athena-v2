import { Filter } from "lucide-react";
import Input from "../../../core/components/input";
import Select from "../../../core/components/select";
import Button from "../../../core/components/button";
import {getSetoresOptions} from "../../../core/utils/selectOptions.ts";

interface UsuariosFiltersProps {
    filtros: any;
    onChange: (field: string, value: unknown) => void;
    onClear: () => void;
}

export default function UsuariosFilters({
                                            filtros,
                                            onChange,
                                            onClear,
                                        }: UsuariosFiltersProps) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                <Input
                    label="Nome"
                    placeholder="Pesquisar usuário"
                    value={filtros.nome ?? ""}
                    onChange={(e) => onChange("nome", e.target.value)}
                />

                <Select
                    label="Setor"
                    placeholder="Todos os setores"
                    options={getSetoresOptions()}
                    value={filtros.setor ?? ""}
                    onChange={(e) => onChange("setor", e.target.value)}
                />

                <div className="flex items-end">
                    <Button
                        variant="outlined"
                        startIcon={<Filter size={16} />}
                        onClick={onClear}
                        className="w-full"
                    >
                        Limpar filtros
                    </Button>
                </div>
            </div>
        </div>
    );
}