import {
  BarChart3,
  TrendingUp,
  Package,
  Truck,
  Flower2,
  Sprout,
  ShoppingCart,
  Star,
  Download,
} from 'lucide-react';

const indicadores = [
  {
    titulo: 'Produção de Mel',
    valor: '1.250 L',
    variacao: '+12%',
    descricao: 'em relação ao mês anterior',
    icon: Flower2,
    bg: 'bg-amber-100',
    color: 'text-amber-700',
  },
  {
    titulo: 'Produção de Chia',
    valor: '780 kg',
    variacao: '+8%',
    descricao: 'em relação ao mês anterior',
    icon: Sprout,
    bg: 'bg-emerald-100',
    color: 'text-emerald-700',
  },
  {
    titulo: 'Barras Produzidas',
    valor: '3.450',
    variacao: '+18%',
    descricao: 'em relação ao mês anterior',
    icon: Package,
    bg: 'bg-yellow-100',
    color: 'text-yellow-700',
  },
  {
    titulo: 'Pedidos Realizados',
    valor: '128',
    variacao: '+15%',
    descricao: 'em relação ao mês anterior',
    icon: ShoppingCart,
    bg: 'bg-blue-100',
    color: 'text-blue-700',
  },
];

const producao = [
  {
    produto: 'Mel',
    meta: 1600,
    realizado: 1250,
    unidade: 'L',
    percentual: 78,
  },
  {
    produto: 'Chia',
    meta: 1250,
    realizado: 780,
    unidade: 'kg',
    percentual: 62,
  },
  {
    produto: 'Barra Mel + Chia',
    meta: 4000,
    realizado: 3450,
    unidade: 'unid.',
    percentual: 86,
  },
];

const pedidos = [
  {
    status: 'Entregues',
    quantidade: 108,
    percentual: 84,
    classe: 'bg-emerald-500',
  },
  {
    status: 'Em transporte',
    quantidade: 8,
    percentual: 6,
    classe: 'bg-blue-500',
  },
  {
    status: 'Em preparação',
    quantidade: 12,
    percentual: 10,
    classe: 'bg-amber-500',
  },
];

function Relatorios() {
  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-amber-700">
            Análise de desempenho
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-900">Relatórios</h2>

          <p className="mt-1 text-gray-500">
            Acompanhe os principais indicadores e resultados do sistema CAMC.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl bg-amber-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-amber-800"
        >
          <Download size={19} />
          Exportar Relatório
        </button>
      </section>

      {/* Indicadores */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {indicadores.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.titulo}
              className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{item.titulo}</p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {item.valor}
                  </p>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.bg}`}
                >
                  <Icon size={24} className={item.color} />
                </div>
              </div>

              <div className="mt-3 flex items-center gap-1 text-sm">
                <TrendingUp size={16} className="text-emerald-600" />

                <span className="font-semibold text-emerald-600">
                  {item.variacao}
                </span>

                <span className="text-gray-500">{item.descricao}</span>
              </div>
            </div>
          );
        })}
      </section>

      {/* Produção */}
      <section className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100">
            <BarChart3 size={22} className="text-amber-700" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Desempenho da Produção
            </h3>

            <p className="text-sm text-gray-500">
              Comparação entre metas e produção realizada.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {producao.map((item) => (
            <div key={item.produto}>
              <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="font-semibold text-gray-900">
                    {item.produto}
                  </span>

                  <span className="ml-2 text-sm text-gray-500">
                    {item.realizado.toLocaleString('pt-BR')} /{' '}
                    {item.meta.toLocaleString('pt-BR')} {item.unidade}
                  </span>
                </div>

                <span className="font-bold text-amber-700">
                  {item.percentual}%
                </span>
              </div>

              <div className="h-4 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-amber-500 transition-all"
                  style={{ width: `${item.percentual}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gráficos/resumos */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Pedidos */}
        <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
              <Truck size={22} className="text-blue-700" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Situação dos Pedidos
              </h3>

              <p className="text-sm text-gray-500">
                Distribuição dos pedidos atuais.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            {pedidos.map((item) => (
              <div key={item.status}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-gray-700">
                    {item.status}
                  </span>

                  <span className="font-semibold text-gray-900">
                    {item.quantidade}
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full ${item.classe}`}
                    style={{ width: `${item.percentual}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between rounded-xl bg-blue-50 p-4">
            <span className="font-medium text-gray-700">Total de pedidos</span>

            <span className="text-xl font-bold text-blue-700">128</span>
          </div>
        </div>

        {/* Satisfação */}
        <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-100">
              <Star size={22} className="fill-yellow-400 text-yellow-500" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Satisfação dos Clientes
              </h3>

              <p className="text-sm text-gray-500">
                Indicadores de relacionamento.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-6">
            <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full border-8 border-yellow-400">
              <span className="text-2xl font-bold text-gray-900">4,6</span>

              <span className="text-xs text-gray-500">de 5</span>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Avaliações positivas</p>

                <p className="text-xl font-bold text-emerald-600">87,7%</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Total de avaliações</p>

                <p className="text-xl font-bold text-gray-900">146</p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-emerald-50 p-4">
            <p className="text-sm font-medium text-emerald-800">
              Excelente desempenho no relacionamento com os clientes.
            </p>
          </div>
        </div>
      </section>

      {/* Resumo geral */}
      <section className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900">Resumo Geral CAMC</h3>

        <p className="mt-1 text-sm text-gray-500">
          Visão consolidada dos principais resultados.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-amber-50 p-5">
            <Flower2 size={22} className="text-amber-700" />

            <p className="mt-3 text-sm text-gray-500">Produção de Mel</p>

            <p className="mt-1 text-2xl font-bold text-gray-900">1.250 L</p>
          </div>

          <div className="rounded-xl bg-emerald-50 p-5">
            <Sprout size={22} className="text-emerald-700" />

            <p className="mt-3 text-sm text-gray-500">Produção de Chia</p>

            <p className="mt-1 text-2xl font-bold text-gray-900">780 kg</p>
          </div>

          <div className="rounded-xl bg-yellow-50 p-5">
            <Package size={22} className="text-yellow-700" />

            <p className="mt-3 text-sm text-gray-500">Barras Produzidas</p>

            <p className="mt-1 text-2xl font-bold text-gray-900">3.450</p>
          </div>

          <div className="rounded-xl bg-blue-50 p-5">
            <ShoppingCart size={22} className="text-blue-700" />

            <p className="mt-3 text-sm text-gray-500">Pedidos</p>

            <p className="mt-1 text-2xl font-bold text-gray-900">128</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Relatorios;
