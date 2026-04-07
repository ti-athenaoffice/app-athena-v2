import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { selectIsAuthenticated, selectIsInitialized } from "../store/selectors/authSelectors";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Componente que protege rotas, redirecionando para login se não autenticado
 * Aguarda inicialização do Redux antes de renderizar
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isInitialized = useAppSelector(selectIsInitialized);

  // Aguarda inicialização do Redux
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-900 rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-600 font-medium">Carregando autenticação...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
