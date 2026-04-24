import { useMemo } from "react";
import type { ReactNode } from "react";
import {
    Ticket,
    Clock,
    CheckCircle2,
    AlertCircle,
    ArrowUpRight,
    LayoutGrid,
    UserCog,
    Megaphone,
    Boxes,
    Users,
    Sparkles,
    ReceiptText,
    Building2,
    ShieldCheck,
    ArrowRight,
    Banknote,
    Mail,
    MoreHorizontal
} from "lucide-react";

import { useAppSelector } from "../../../core/store/hooks";
import { selectUser } from "../../../core/store/selectors/authSelectors";

export default function DashboardPage() {
    const usuario = useAppSelector(selectUser);

    // Simulação de roles (ajuste conforme a estrutura real do seu Redux/Backend)
    const roles = useMemo(() => {
        const r = usuario?.roles;
        if (!r) return [];
        return Array.isArray(r) ? r : [r];
    }, [usuario]);

    const hasRole = (...allowed: string[]) => {
        if (roles.includes('admin')) return true;
        return allowed.some(role => roles.includes(role));
    };

    // Definição das seções traduzida do Vue para o React
    const sections = useMemo(() => {
        const allSections = [
            {
                title: 'Aplicações',
                icon: LayoutGrid,
                description: 'Acesso rápido aos principais módulos.',
                show: true,
                items: [
                    {
                        title: 'Editar perfil',
                        description: 'Atualize seus dados e segurança.',
                        icon: UserCog,
                        href: '/profile/edit',
                        badge: 'Conta',
                        show: true,
                    },
                ],
            },
            {
                title: "Outros",
                icon: MoreHorizontal,
                description: "Acesso a chamados e funcionalidades complementares do sistema.",
                show: true,
                items: [
                    {
                        title: "Chamados",
                        description: "Acompanhe solicitações, avisos e acionamentos do seu setor.",
                        icon: Ticket,
                        href: "/chamados",
                        badge: "Chamados",
                        show: true,
                    },
                ],
            },
            {
                title: 'Financeiro',
                icon: Banknote,
                description: 'Cobranças, faturas e relatórios.',
                show: hasRole('financeiro'),
                items: [
                    {
                        title: 'Envio de Faturas',
                        description: 'Fila, enviados e não enviados.',
                        icon: Mail,
                        href: '/faturas',
                        badge: 'Financeiro',
                        show: hasRole('financeiro'),
                    },
                ],
            },
            {
                title: 'Marketing',
                icon: Megaphone,
                description: 'Conteúdo, automações e publicação.',
                show: hasRole('marketing'),
                items: [
                    {
                        title: 'Automação do Blog',
                        description: 'Gerar e organizar posts automaticamente.',
                        icon: Sparkles,
                        href: '/post-wordpress',
                        badge: 'Marketing',
                        show: hasRole('marketing'),
                    },
                ],
            },
            {
                title: 'Contabilidade',
                icon: ReceiptText,
                description: 'Notas fiscais e cadastros de unidade.',
                show: hasRole('contabilidade'),
                items: [
                    {
                        title: 'Notas Fiscais',
                        description: 'Emitir, listar e remover notas.',
                        icon: ReceiptText,
                        href: '/nota',
                        badge: 'NF',
                        show: hasRole('contabilidade'),
                    },
                    {
                        title: 'Unidades',
                        description: 'Gerenciar unidades e permissões.',
                        icon: Building2,
                        href: '/unidade',
                        badge: 'Cadastros',
                        show: hasRole('contabilidade'),
                    },
                ],
            },
            {
                title: 'Admin',
                icon: ShieldCheck,
                description: 'Acesso restrito a administradores.',
                show: hasRole('admin'),
                items: [
                    {
                        title: 'Gerenciar usuários',
                        description: 'Criar, editar e remover usuários.',
                        icon: Users,
                        href: '/admin',
                        badge: 'Admin',
                        show: hasRole('admin'),
                    },
                ],
            },
        ];

        return allSections
            .filter(section => section.show)
            .map(section => ({
                ...section,
                items: section.items.filter(item => item.show),
            }))
            .filter(section => section.items.length > 0);
    }, [roles]);

    const calendarSrc = "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FFortaleza&src=cHJpbmNpcGFsQGF0aGVuYW9mZmljZS5jb20&src=cHQtYnIuYnJhemlsaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039be5&color=%230b8043";

    return (
        <div className="space-y-8 pb-10">
            {/* Cabeçalho de Boas-vindas */}
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Olá, {usuario?.nome || 'Usuário'}! 👋</h1>
                <p className="text-sm text-slate-500 font-medium">Veja o que está acontecendo no App Athena hoje.</p>
            </div>

            {/* Grid de Métricas (KPIs) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total de Chamados"
                    value="128"
                    icon={<Ticket className="text-blue-600" />}
                    trend="+12% este mês"
                />
                <StatCard
                    title="Em Aberto"
                    value="14"
                    icon={<AlertCircle className="text-amber-500" />}
                    trend="4 urgentes"
                    warning
                />
                <StatCard
                    title="Em Atendimento"
                    value="23"
                    icon={<Clock className="text-blue-400" />}
                />
                <StatCard
                    title="Concluídos (Hoje)"
                    value="09"
                    icon={<CheckCircle2 className="text-emerald-500" />}
                />
            </div>

            {/* Calendário Integrado */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="aspect-[16/9] w-full md:aspect-[21/9]">
                    <iframe
                        className="h-full w-full"
                        src={calendarSrc}
                        title="Calendário Athena"
                    />
                </div>
            </div>

            {/* Grid Principal: Atalhos vs Atividade Recente */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Seção de Atalhos Organizados (Substitui os atalhos rápidos antigos) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center gap-2 text-sm text-slate-600 font-medium mb-2">
                        <Boxes className="h-4 w-4" />
                        <span>Atalhos organizados por área</span>
                    </div>

                    <div className="space-y-6">
                        {sections.map((section) => {
                            const SectionIcon = section.icon;
                            return (
                                <section
                                    key={section.title}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                                >
                                    {/* Cabeçalho da Seção */}
                                    <div className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50/70 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                                                <SectionIcon className="h-5 w-5 text-slate-700" />
                                            </div>
                                            <div>
                                                <h3 className="text-base font-bold text-slate-800">{section.title}</h3>
                                                <p className="text-sm text-slate-500">{section.description}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Cards (Tiles) da Seção */}
                                    <div className="p-6">
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            {section.items.map((item) => {
                                                const ItemIcon = item.icon;
                                                return (
                                                    <a
                                                        key={item.title}
                                                        href={item.href}
                                                        className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-slate-900/20 block"
                                                    >
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 ring-1 ring-slate-200 transition group-hover:bg-blue-900 group-hover:text-white group-hover:ring-blue-900 text-slate-600">
                                                                <ItemIcon className="h-5 w-5" />
                                                            </div>

                                                            {item.badge && (
                                                                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 ring-1 ring-slate-200">
                                  {item.badge}
                                </span>
                                                            )}
                                                        </div>

                                                        <div className="mt-4">
                                                            <div className="flex items-center justify-between gap-2">
                                                                <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                                                                <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-600" />
                                                            </div>
                                                            <p className="mt-1 text-xs text-slate-500 font-medium line-clamp-2">
                                                                {item.description}
                                                            </p>
                                                        </div>

                                                        {/* Efeito de hover de background */}
                                                        <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-blue-900/0 blur-2xl transition group-hover:bg-blue-900/5" />
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </section>
                            );
                        })}

                        {/* Fallback caso não haja permissão para nada */}
                        {sections.length === 0 && (
                            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
                                <p className="text-sm text-slate-600 font-medium">
                                    Não há módulos disponíveis para o seu perfil no momento.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Resumo de Atividade Recente (Mantido do Original) */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-slate-800">Chamados Recentes</h2>
                            <button className="text-sm font-bold text-blue-600 hover:underline cursor-pointer">Ver todos</button>
                        </div>

                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
                                            <Ticket size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-700">Erro de acesso ao banco</p>
                                            <p className="text-xs text-slate-400 font-medium">Há 15 min • #2026-04{i}</p>
                                        </div>
                                    </div>
                                    <ArrowUpRight size={18} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

interface StatCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
    trend?: string;
    warning?: boolean;
}

// Sub-componente para os Cards de Estatística (Mantido do original)
function StatCard({ title, value, icon, trend, warning }: StatCardProps) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    {icon}
                </div>
                {trend && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${warning ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
            {trend}
          </span>
                )}
            </div>
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
                <p className="text-3xl font-black text-slate-800 mt-1">{value}</p>
            </div>
        </div>
    );
}