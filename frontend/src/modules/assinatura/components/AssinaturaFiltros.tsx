import { Filter, Search } from "lucide-react";
import Input from "../../../core/components/input";
import Button from "../../../core/components/button";

interface AssinaturaFiltrosProps {
    filtros: any;
    emailInput: string;
    onEmailInputChange: (value: string) => void;
    onSearch: () => void;
    onChange: (field: string, value: unknown) => void;
    onClear: () => void;
}

export default function AssinaturaFiltros({
                                            filtros,
                                            emailInput,
                                            onEmailInputChange,
                                            onSearch,
                                            onChange,
                                            onClear,
                                        }: AssinaturaFiltrosProps) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                <div className="flex items-end">
                    <div className="flex-1">
                        <Input
                            label="Email do Cliente"
                            placeholder="Pesquisar por email"
                            value={emailInput}
                            onChange={(e) => onEmailInputChange(e.target.value)}
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

                <Input
                    label="Plano"
                    placeholder="Filtrar por plano"
                    value={filtros.plano ?? ""}
                    onChange={(e) => onChange("plano", e.target.value)}
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