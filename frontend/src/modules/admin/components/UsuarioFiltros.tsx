import { Filter, Search } from "lucide-react";
import Input from "../../../core/components/input";
import Select from "../../../core/components/select";
import Button from "../../../core/components/button";
import {getSetoresOptions} from "../../../core/utils/selectOptions.ts";

interface UsuariosFiltersProps {
    filtros: any;
    nomeInput: string;
    onNomeInputChange: (value: string) => void;
    onSearch: () => void;
    onChange: (field: string, value: unknown) => void;
    onClear: () => void;
}

export default function UsuariosFilters({
                                            filtros,
                                            nomeInput,
                                            onNomeInputChange,
                                            onSearch,
                                            onChange,
                                            onClear,
                                        }: UsuariosFiltersProps) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                <div className="flex items-end">
                    <div className="flex-1">
                        <Input
                            label="Nome"
                            placeholder="Pesquisar usuário"
                            value={nomeInput}
                            onChange={(e) => onNomeInputChange(e.target.value)}
                        />
                    </div>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={onSearch}
                        sx={{
                            height: "30px",
                            minWidth: "30px",
                            marginLeft: "-30px",
                            marginTop: "20px",
                            marginBottom: "10px",
                            padding: 0,
                        }}
                    >
                        <Search size={16} />
                    </Button>
                </div>

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
                        className="w-full h-[42px]"
                    >
                        Limpar filtros
                    </Button>
                </div>
            </div>
        </div>
    );
}