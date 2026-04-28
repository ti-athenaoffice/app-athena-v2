import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "./core/layouts/AppLayout";
import ProtectedRoute from "./core/components/ProtectedRoute";
import ChamadosPage from "./modules/chamados/pages/ChamadosPage";
import ChamadosForm from "./modules/chamados/pages/ChamadosForm";
import DashboardPage from "./modules/dashboard/pages/DashboardPage";
import LoginPage from "./modules/auth/pages/LoginPage";
import PerfilPage from "./modules/auth/pages/PerfilPage";
import AdminPage from "./modules/admin/pages/AdminPage";
import AdminUsuarioForm from "./modules/admin/pages/AdminUsuarioForm";
import FaleConoscoPage from "./modules/faleConosco/pages/FaleConoscoPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },

      {
        path: "chamados",
        element: <ChamadosPage />,
      },
      {
        path: "chamados/novo",
        element: <ChamadosForm />,
      },
      {
        path: "chamados/editar/:id",
        element: <ChamadosForm />,
      },

      {
        path: "admin",
        element: <AdminPage />
      },
      {
        path: "admin/usuario/novo",
        element: <AdminUsuarioForm />
      },
      {
        path: "admin/usuario/editar/:id",
        element: <AdminUsuarioForm />
      },

      {
        path: "fale-conosco",
        element: <FaleConoscoPage />
      },

      {
        path: "configuracoes",
        element: <PerfilPage />,
      },
    ],
  },
]);