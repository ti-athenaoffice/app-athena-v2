import { 
  Ticket, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  PlusCircle, 
  Users, 
  FileText, 
  ArrowUpRight 
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Cabeçalho de Boas-vindas */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Olá, Guilherme! 👋</h1>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Seção de Atalhos Rápidos */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-bold text-blue-900">Ações Rápidas</h2>
          <div className="grid grid-cols-1 gap-3">
            <QuickAction 
              icon={<PlusCircle size={20} />} 
              label="Novo Chamado" 
              description="Abrir solicitação de suporte"
              color="bg-blue-900"
            />
            <QuickAction 
              icon={<Users size={20} />} 
              label="Gerenciar Equipe" 
              description="Acessar controle de usuários"
              color="bg-slate-700"
            />
            <QuickAction 
              icon={<FileText size={20} />} 
              label="Relatórios" 
              description="Exportar dados em PDF/Excel"
              color="bg-slate-700"
            />
          </div>
        </div>

        {/* Resumo de Atividade Recente (Placeholder de Gráfico/Lista) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">Chamados Recentes</h2>
            <button className="text-sm font-bold text-blue-600 hover:underline cursor-pointer">Ver todos</button>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Ticket size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700">Erro de acesso ao banco de dados</p>
                    <p className="text-xs text-slate-400">Há 15 minutos • #2026-042</p>
                  </div>
                </div>
                <ArrowUpRight size={18} className="text-slate-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-componente para os Cards de Estatística
function StatCard({ title, value, icon, trend, warning }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
          {icon}
        </div>
        {trend && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${warning ? 'bg-amber-100 text-amber-700' : 'bg-blue-50 text-blue-600'}`}>
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

// Sub-componente para os Atalhos
function QuickAction({ icon, label, description, color }: any) {
  return (
    <button className="flex items-center gap-4 p-4 w-full bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all group text-left cursor-pointer">
      <div className={`h-12 w-12 rounded-lg ${color} text-white flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-slate-800">{label}</p>
        <p className="text-xs text-slate-400">{description}</p>
      </div>
    </button>
  );
}