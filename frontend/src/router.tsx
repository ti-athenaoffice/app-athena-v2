import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "./core/layouts/AppLayout";
import ProtectedRoute from "./core/components/ProtectedRoute";
import ChamadosPage from "./modules/chamados/pages/ChamadosPage";
import ChamadosForm from "./modules/chamados/pages/ChamadosForm";
import DashboardPage from "./modules/dashboard/pages/DashboardPage";
import LoginPage from "./modules/auth/pages/LoginPage";

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
        path: "admin",
        element: <div className="text-2xl font-bold">Admin (Em breve)</div>,
      },
    ],
  },
]);