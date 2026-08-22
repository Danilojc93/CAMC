import {
  Package,
  Plus,
  Minus,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Boxes,
} from 'lucide-react';

const insumos = [
  {
    nome: 'Mel',
    categoria: 'Matéria-prima',
    estoque: '1.850',
    unidade: 'L',
    minimo: '500 L',
    status: 'Estoque normal',
    statusClass: 'bg-emerald-100 text-emerald-700',
    icon: '🍯',
  },
  {
    nome: 'Chia',
    categoria: 'Matéria-prima',
    estoque: '420',
    unidade: 'kg',
    minimo: '100 kg',
    status: 'Estoque normal',
    statusClass: 'bg-emerald-100 text-emerald-700',
    icon: '🌱',
  },
  {
    nome: 'Embalagens',
    categoria: 'Embalagem',
    estoque: '2.800',
    unidade: 'unid.',
    minimo: '1.000 unid.',
    status: 'Estoque normal',
    statusClass: 'bg-emerald-100 text-emerald-700',
    icon: '📦',
  },
  {
    nome: 'Rótulos',
    categoria: 'Embalagem',
    estoque: '3.200',
    unidade: 'unid.',
    minimo: '1.000 unid.',
    status: 'Estoque normal',
    statusClass: 'bg-emerald-100 text-emerald-700',
    icon: '🏷️',
  },
  {
    nome: 'Caixas para Transporte',
    categoria: 'Logística',
    estoque: '680',
    unidade: 'unid.',
    minimo: '300 unid.',
    status: 'Estoque normal',
    statusClass: 'bg-emerald-100 text-emerald-700',
    icon: '🚚',
  },
];

function EstoqueInsumos() {
  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-amber-700">
            Controle de materiais
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-900">
            Estoque de Insumos
          </h2>

          <p className="mt-1 text-gray-500">
            Controle os materiais utilizados nas operações do sistema CAMC.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl bg-amber-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-amber-800"
        >
          <Plus size={19} />
          Registrar Entrada
        </button>
      </section>

      {/* Indicadores */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total de Insumos</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">5</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
              <Boxes size={24} className="text-amber-700" />
            </div>
          </div>

          <p className="mt-3 text-sm text-emerald-600">Materiais cadastrados</p>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Entradas no mês</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">428</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
              <TrendingUp size={24} className="text-emerald-600" />
            </div>
          </div>

          <p className="mt-3 text-sm text-emerald-600">
            +12% em relação ao mês anterior
          </p>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Saídas no mês</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">286</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <TrendingDown size={24} className="text-blue-600" />
            </div>
          </div>

          <p className="mt-3 text-sm text-blue-600">Materiais utilizados</p>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Estoque baixo</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
              <AlertTriangle size={24} className="text-green-600" />
            </div>
          </div>

          <p className="mt-3 text-sm text-emerald-600">
            Nenhum alerta no momento
          </p>
        </div>
      </section>

      {/* Tabela */}
      <section className="rounded-2xl border border-amber-100 bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-gray-100 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Inventário Atual
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Situação atual dos materiais disponíveis.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Package size={17} />
            Atualizado hoje
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead className="bg-amber-50 text-sm text-gray-600">
              <tr>
                <th className="px-6 py-4 font-semibold">Insumo</th>
                <th className="px-6 py-4 font-semibold">Categoria</th>
                <th className="px-6 py-4 font-semibold">Estoque Atual</th>
                <th className="px-6 py-4 font-semibold">Estoque Mínimo</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 text-center font-semibold">Ações</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {insumos.map((item) => (
                <tr key={item.nome} className="transition hover:bg-amber-50/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50 text-xl">
                        {item.icon}
                      </div>

                      <div>
                        <p className="font-semibold text-gray-900">
                          {item.nome}
                        </p>
                        <p className="text-xs text-gray-500">
                          Unidade: {item.unidade}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.categoria}
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-900">
                      {item.estoque}
                    </span>{' '}
                    <span className="text-sm text-gray-500">
                      {item.unidade}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.minimo}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${item.statusClass}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        type="button"
                        className="rounded-lg bg-emerald-50 p-2 text-emerald-700 transition hover:bg-emerald-100"
                        title="Registrar entrada"
                      >
                        <Plus size={17} />
                      </button>

                      <button
                        type="button"
                        className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                        title="Registrar saída"
                      >
                        <Minus size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Movimentações */}
      <section className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900">
          Últimas Movimentações
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Histórico recente de entradas e saídas.
        </p>

        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between rounded-xl bg-emerald-50 p-4">
            <div>
              <p className="font-semibold text-gray-900">Entrada de Mel</p>
              <p className="text-sm text-gray-500">Fornecedor CAMC • Hoje</p>
            </div>

            <span className="font-bold text-emerald-700">+250 L</span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-blue-50 p-4">
            <div>
              <p className="font-semibold text-gray-900">Saída de Chia</p>
              <p className="text-sm text-gray-500">
                Produção Barra Mel + Chia • Ontem
              </p>
            </div>

            <span className="font-bold text-blue-700">-48 kg</span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-amber-50 p-4">
            <div>
              <p className="font-semibold text-gray-900">
                Entrada de Embalagens
              </p>
              <p className="text-sm text-gray-500">
                Fornecedor CAMC • 18/08/2026
              </p>
            </div>

            <span className="font-bold text-amber-700">+800 unid.</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EstoqueInsumos;
