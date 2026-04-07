import {
  LayoutDashboard,
  Ticket,
  Users,
  UserCircle,
  LogOut,
  ChevronRight,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { processarLogout } from "../../modules/auth/service/authService";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/selectors/authSelectors";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Ticket, label: "Chamados", path: "/chamados" },
  { icon: Users, label: "Administração", path: "/admin" },
  { icon: Settings, label: "Configurações", path: "/config" },
];

const getPageTitle = (pathname: string): string => {
  const segments = pathname.split("/").filter(Boolean);
  const page = segments[0];
  const titles: { [key: string]: string } = {
    dashboard: "Dashboard",
    chamados: "Chamados",
    admin: "Administração",
    config: "Configurações",
  };
  return titles[page] || "App Athena";
};

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const user = useAppSelector(selectUser);

  const fazerLogout = async() => {
    await processarLogout();
    navigate("/login");
  }

  return (
    <div className="flex h-screen w-screen bg-slate-50 overflow-hidden font-sans">
      <aside
        className={`${
          collapsed ? "w-20" : "w-64"
        } flex flex-col bg-[#2250cf] text-white transition-all duration-300 ease-in-out shadow-xl`}
      >
        {/* Logo / Header da Sidebar */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-blue-800">
          {!collapsed && (
            <span className="text-xl font-bold tracking-tight">App Athena</span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-lg p-1.5 hover:bg-[#1d48be] cursor-pointer transition-colors"
          >
            <ChevronRight
              className={`h-5 w-5 transition-transform ${collapsed ? "" : "rotate-180"}`}
            />
          </button>
        </div>

        {/* Links de Navegação */}
        <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
          {menuItems.map((item) => (
            <NavItem
              key={item.path}
              icon={<item.icon size={22} />}
              label={item.label}
              collapsed={collapsed}
              active={currentPath === item.path}
              onClick={() => navigate(item.path)}
            />
          ))}
        </nav>

        {/* Footer da Sidebar (Perfil/Logout) */}
        <div className="border-t border-blue-800 p-2 space-y-1">
          <NavItem
            icon={<UserCircle size={22} />}
            label="Meu Perfil"
            collapsed={collapsed}
            onClick={() => navigate("/profile")}
          />
          <NavItem
            icon={<LogOut size={22} className="text-red-400" />}
            label="Sair do Sistema"
            collapsed={collapsed}
            className="text-red-300 hover:bg-red-900/30"
            onClick={() => fazerLogout()}
          />
        </div>
      </aside>

      {/* Área Principal (Header + Conteúdo) */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header Superior Branco */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-8 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Módulos / <span className="text-slate-900">{getPageTitle(currentPath)}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-700 leading-none">
                {user?.nome || "Usuário"}
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                {user?.setor?.nome || "Setor de TI"}
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold uppercase">
               {user?.nome ? user.nome.substring(0, 2) : "US"}
            </div>
          </div>
        </header>

        {/* Conteúdo Dinâmico */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-50">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  active?: boolean;
  className?: string;
  onClick?: () => void;
}

function NavItem({ icon, label, collapsed, active, className, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full cursor-pointer flex items-center gap-4 rounded-lg px-3 py-2.5 transition-all justify-start
        ${active ? "bg-[#1d48be] text-white shadow-md" : "text-blue-100 hover:bg-[#1d48be]"}
        ${className}
      `}
    >
      <div className="shrink-0">{icon}</div>
      {!collapsed && (
        <span className="text-sm font-medium whitespace-nowrap">{label}</span>
      )}
    </button>
  );
}
