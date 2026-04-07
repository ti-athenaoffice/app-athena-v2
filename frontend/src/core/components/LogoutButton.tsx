import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/slices/authSlice";
import { selectIsLoading, selectUser } from "../store/selectors/authSelectors";

/**
 * Componente exemplo para botão de logout
 */
export default function LogoutButton() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectIsLoading);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success("Desconectado com sucesso!");
      navigate("/login");
    } catch (err) {
      toast.error("Erro ao desconectar");
      console.error("Erro ao fazer logout:", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
      title={user?.email || "Logout"}
    >
      <LogOut size={16} />
      <span className="hidden sm:inline">Sair</span>
    </button>
  );
}
