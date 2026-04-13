import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { selectIsAuthenticated, selectIsInitialized } from "../store/selectors/authSelectors";
import Loading from "./loading";

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
    return <Loading message="Carregando sistema... Aguarde só um instante." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
