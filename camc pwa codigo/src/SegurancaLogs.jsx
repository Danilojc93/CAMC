import {
  ShieldCheck,
  Users,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  LogIn,
  Package,
  FileText,
  Settings,
} from 'lucide-react';

const logs = [
  {
    data: '18/08/2026',
    horario: '09:42',
    usuario: 'Carlos',
    acao: 'Login realizado no sistema',
    modulo: 'Autenticação',
    status: 'Sucesso',
    statusClass: 'bg-emerald-100 text-emerald-700',
    icon: LogIn,
  },
  {
    data: '18/08/2026',
    horario: '09:35',
    usuario: 'Marcos',
    acao: 'Atualização de estoque de Chia',
    modulo: 'Estoque',
    status: 'Sucesso',
    statusClass: 'bg-emerald-100 text-emerald-700',
    icon: Package,
  },
  {
    data: '18/08/2026',
    horario: '08:57',
    usuario: 'Fernanda',
    acao: 'Registro de produção de Barra Mel + Chia',
    modulo: 'Produção',
    status: 'Sucesso',
    statusClass: 'bg-emerald-100 text-emerald-700',
    icon: FileText,
  },
  {
    data: '17/08/2026',
    horario: '17:21',
    usuario: 'Carlos',
    acao: 'Alteração de pedido',
    modulo: 'Pedidos',
    status: 'Sucesso',
    statusClass: 'bg-emerald-100 text-emerald-700',
    icon: Settings,
  },
  {
    data: '17/08/2026',
    horario: '15:44',
    usuario: 'Marcos',
    acao: 'Tentativa de acesso com senha incorreta',
    modulo: 'Autenticação',
    status: 'Atenção',
    statusClass: 'bg-amber-100 text-amber-700',
    icon: AlertTriangle,
  },
];

function SegurancaLogs() {
  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <section>
        <p className="text-sm font-semibold text-amber-700">
          Controle e monitoramento
        </p>

        <h2 className="mt-1 text-2xl font-bold text-gray-900">
          Segurança & Logs
        </h2>

        <p className="mt-1 text-gray-500">
          Monitore acessos, atividades e eventos do sistema CAMC.
        </p>
      </section>

      {/* Indicadores */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Status do Sistema</p>

              <p className="mt-2 text-2xl font-bold text-emerald-700">Seguro</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
              <ShieldCheck size={24} className="text-emerald-600" />
            </div>
          </div>

          <p className="mt-3 text-sm text-emerald-600">
            Todos os serviços operacionais
          </p>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Usuários Ativos</p>

              <p className="mt-2 text-3xl font-bold text-gray-900">8</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <Users size={24} className="text-blue-600" />
            </div>
          </div>

          <p className="mt-3 text-sm text-blue-600">Usuários conectados</p>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Atividades Hoje</p>

              <p className="mt-2 text-3xl font-bold text-gray-900">146</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
              <Activity size={24} className="text-amber-700" />
            </div>
          </div>

          <p className="mt-3 text-sm text-amber-700">Eventos registrados</p>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Alertas</p>

              <p className="mt-2 text-3xl font-bold text-gray-900">1</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
              <AlertTriangle size={24} className="text-amber-600" />
            </div>
          </div>

          <p className="mt-3 text-sm text-amber-600">Requer atenção</p>
        </div>
      </section>

      {/* Segurança */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100">
              <ShieldCheck size={22} className="text-emerald-700" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Segurança do Sistema
              </h3>

              <p className="text-sm text-gray-500">
                Situação dos principais controles.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-emerald-50 p-4">
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-emerald-600" />
                <span className="font-medium">Autenticação</span>
              </div>

              <span className="text-sm font-semibold text-emerald-700">
                Ativa
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-emerald-50 p-4">
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-emerald-600" />
                <span className="font-medium">Controle de acesso</span>
              </div>

              <span className="text-sm font-semibold text-emerald-700">
                Ativo
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-emerald-50 p-4">
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-emerald-600" />
                <span className="font-medium">Registro de atividades</span>
              </div>

              <span className="text-sm font-semibold text-emerald-700">
                Ativo
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-emerald-50 p-4">
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-emerald-600" />
                <span className="font-medium">Backup de dados</span>
              </div>

              <span className="text-sm font-semibold text-emerald-700">
                Ativo
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
              <Users size={22} className="text-blue-700" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Usuários do Sistema
              </h3>

              <p className="text-sm text-gray-500">
                Usuários com acesso ao CAMC.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-700 font-bold text-white">
                  C
                </div>

                <div>
                  <p className="font-semibold text-gray-900">Carlos</p>
                  <p className="text-xs text-gray-500">Administrador</p>
                </div>
              </div>

              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Online
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                  M
                </div>

                <div>
                  <p className="font-semibold text-gray-900">Marcos</p>
                  <p className="text-xs text-gray-500">Estoque</p>
                </div>
              </div>

              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Online
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 font-bold text-white">
                  F
                </div>

                <div>
                  <p className="font-semibold text-gray-900">Fernanda</p>
                  <p className="text-xs text-gray-500">Produção</p>
                </div>
              </div>

              <span className="flex items-center gap-1 text-xs font-semibold text-gray-400">
                <span className="h-2 w-2 rounded-full bg-gray-400" />
                Offline
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Logs */}
      <section className="rounded-2xl border border-amber-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100">
              <Activity size={22} className="text-amber-700" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Registro de Atividades
              </h3>

              <p className="text-sm text-gray-500">
                Histórico das ações realizadas no sistema.
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <thead className="bg-amber-50 text-sm text-gray-600">
              <tr>
                <th className="px-6 py-4 font-semibold">Data</th>
                <th className="px-6 py-4 font-semibold">Horário</th>
                <th className="px-6 py-4 font-semibold">Usuário</th>
                <th className="px-6 py-4 font-semibold">Ação</th>
                <th className="px-6 py-4 font-semibold">Módulo</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {logs.map((log) => {
                const Icon = log.icon;

                return (
                  <tr
                    key={`${log.data}-${log.horario}-${log.usuario}`}
                    className="transition hover:bg-amber-50/50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {log.data}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock size={15} />
                        {log.horario}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-400" />
                        <span className="font-medium text-gray-800">
                          {log.usuario}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Icon size={17} className="text-amber-700" />

                        <span className="text-sm text-gray-700">
                          {log.acao}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {log.modulo}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${log.statusClass}`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Alerta */}
      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle size={22} className="mt-0.5 shrink-0 text-amber-600" />

          <div>
            <h3 className="font-bold text-amber-900">Atenção de Segurança</h3>

            <p className="mt-1 text-sm leading-6 text-amber-800">
              Foi registrada uma tentativa de acesso com senha incorreta.
              Recomenda-se acompanhar novas tentativas de autenticação.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SegurancaLogs;
