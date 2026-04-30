import { useMemo } from "react";
import {
    Ticket,
    ArrowUpRight,
    LayoutGrid,
    UserCog,
    Boxes,
    ArrowRight,
    Banknote,
    MoreHorizontal,
    PlusCircle, Speech,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useAppSelector } from "../../../core/store/hooks";
import { selectUser } from "../../../core/store/selectors/authSelectors";
import {hasPermission} from "../../../core/utils/permissions.ts";

export default function DashboardPage() {
    const usuario = useAppSelector(selectUser);

    const quickActions = [
        {
            title: "Abrir chamado",
            description: "Criar nova solicitação",
            icon: PlusCircle,
            href: "/chamados/novo",
        },
        {
            title: "Meus chamados",
            description: "Acompanhar solicitações",
            icon: Ticket,
            href: "/chamados",
        },
        {
            title: "Editar perfil",
            description: "Atualizar dados da conta",
            icon: UserCog,
            href: "/configuracoes",
        },
    ];

    const sections = useMemo(() => {
        const allSections = [
            {
                title: "Meu Perfil",
                icon: LayoutGrid,
                description: "Acesso rápido aos principais módulos.",
                show: true,
                items: [
                    {
                        title: "Editar perfil",
                        description: "Atualize seus dados e segurança.",
                        icon: UserCog,
                        href: "/configuracoes",
                        badge: "Conta",
                        show: true,
                    },
                ],
            },
            {
                title: "Chamados",
                icon: MoreHorizontal,
                description: "Solicitações, avisos e acionamentos internos.",
                show: hasPermission(usuario, "chamado.listar"),
                items: [
                    {
                        title: "Central de chamados",
                        description: "Acompanhe solicitações do seu setor.",
                        icon: Ticket,
                        href: "/chamados",
                        badge: "Chamados",
                        show: hasPermission(usuario, "chamado.listar"),
                    },
                ],
            },
            {
                title: "Fale Conosco",
                icon: Speech,
                description: "Solicitações dos clientes pelo site",
                show: hasPermission(usuario, "fale_conosco.listar"),
                items: [
                    {
                        title: "Fale Conosco",
                        description: "Gerencie contatos do site.",
                        icon: Speech,
                        href: "/fale-conosco",
                        badge: "Comercial",
                        show: hasPermission(usuario, "fale_conosco.listar"),
                    },
                ],
            },
            {
                title: "Assinaturas",
                icon: Banknote,
                description: "Gestão de assinaturas e clientes",
                show: hasPermission(usuario, "assinatura.listar"),
                items: [
                    {
                        title: "Lista de assinaturas",
                        description: "Gerencie contratos e planos.",
                        icon: Banknote,
                        href: "/assinaturas",
                        badge: "Assinaturas",
                        show: hasPermission(usuario, "assinatura.listar"),
                    },
                ],
            },
        ];

        return allSections
            .filter((section) => section.show)
            .map((section) => ({
                ...section,
                items: section.items.filter((item) => item.show),
            }))
            .filter((section) => section.items.length > 0);
    }, [usuario]);

    return (
        <div className="space-y-8 pb-10">
            <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 p-8 text-white shadow-sm">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm font-medium text-blue-200">
                            App Athena Office
                        </p>

                        <h1 className="mt-2 text-3xl font-black">
                            Olá, {usuario?.nome || "Usuário"}!
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm text-slate-300">
                            Acompanhe chamados, acesse módulos importantes e veja os principais
                            atalhos do sistema.
                        </p>
                    </div>

                    <Link
                        to="/chamados/novo"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-sm transition hover:bg-slate-100"
                    >
                        <PlusCircle size={18} />
                        Novo chamado
                    </Link>
                </div>
            </section>

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {quickActions.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.title}
                            to={item.href}
                            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-900 group-hover:text-white">
                                    <Icon size={22} />
                                </div>

                                <ArrowUpRight className="h-5 w-5 text-slate-300 transition group-hover:text-blue-600" />
                            </div>

                            <h3 className="mt-5 text-sm font-bold text-slate-800">
                                {item.title}
                            </h3>

                            <p className="mt-1 text-xs font-medium text-slate-500">
                                {item.description}
                            </p>
                        </Link>
                    );
                })}
            </section>

            <section className="space-y-6">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <Boxes className="h-4 w-4" />
                    <span>Módulos disponíveis</span>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {sections.map((section) => {
                        const SectionIcon = section.icon;

                        return (
                            <section
                                key={section.title}
                                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                            >
                                <div className="flex items-start gap-3 border-b border-slate-200 bg-slate-50/80 px-6 py-5">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm ring-1 ring-slate-200">
                                        <SectionIcon className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <h3 className="text-base font-black text-slate-800">
                                            {section.title}
                                        </h3>

                                        <p className="text-sm text-slate-500">
                                            {section.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 p-6">
                                    {section.items.map((item) => {
                                        const ItemIcon = item.icon;

                                        return (
                                            <Link
                                                key={item.title}
                                                to={item.href}
                                                className="group rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:bg-blue-50/30"
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-blue-900 group-hover:text-white">
                                                        <ItemIcon className="h-5 w-5" />
                                                    </div>

                                                    {item.badge && (
                                                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 ring-1 ring-slate-200">
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="mt-4">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <h4 className="text-sm font-bold text-slate-800">
                                                            {item.title}
                                                        </h4>

                                                        <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-600" />
                                                    </div>

                                                    <p className="mt-1 text-xs font-medium text-slate-500">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </section>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}