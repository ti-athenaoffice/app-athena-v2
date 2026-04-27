import { LayoutGrid, LayoutList, Plus, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../../core/components/button";

interface UsuariosHeaderProps {
    viewMode?: "list" | "grid";
    onChangeViewMode?: (mode: "list" | "grid") => void;
}

export default function UsuariosHeader({
                           }: UsuariosHeaderProps) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <div className="flex items-center gap-2">
                    <Users className="h-6 w-6 text-blue-900" />

                    <h1 className="text-2xl font-bold text-slate-800">
                        Administração de Usuários
                    </h1>
                </div>

                <p className="mt-1 text-sm font-medium text-slate-500">
                    Gerencie usuários, permissões, setores e acessos do sistema
                </p>
            </div>

                <Button
                    variant="contained"
                    startIcon={<Plus size={18} />}
                    onClick={() => navigate("/admin/usuario/novo")}
                >
                    Novo Usuário
                </Button>
            </div>
    );
}