import {
  Truck,
  Package,
  Clock,
  CheckCircle,
  MapPin,
  ShoppingCart,
  ArrowRight,
} from 'lucide-react';

const pedidos = [
  {
    id: 'PED-2026-001',
    data: '18/08/2026',
    cliente: 'Mercado São Paulo',
    produtos: 'Mel + Chia',
    quantidade: '120 unid.',
    valor: 'R$ 2.400,00',
    destino: 'São Paulo - SP',
    status: 'Em transporte',
    statusClass: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'PED-2026-002',
    data: '17/08/2026',
    cliente: 'Empório Natural',
    produtos: 'Barra Mel + Chia',
    quantidade: '250 unid.',
    valor: 'R$ 4.750,00',
    destino: 'Campinas - SP',
    status: 'Entregue',
    statusClass: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'PED-2026-003',
    data: '16/08/2026',
    cliente: 'Casa do Produtor',
    produtos: 'Mel Puro',
    quantidade: '80 L',
    valor: 'R$ 3.200,00',
    destino: 'Sorocaba - SP',
    status: 'Em preparação',
    statusClass: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'PED-2026-004',
    data: '15/08/2026',
    cliente: 'Mercado Verde',
    produtos: 'Chia',
    quantidade: '150 kg',
    valor: 'R$ 3.900,00',
    destino: 'Santos - SP',
    status: 'Pendente',
    statusClass: 'bg-red-100 text-red-700',
  },
];

function PedidosLogistica() {
  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-amber-700">
            Distribuição e entregas
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-900">
            Pedidos & Logística
          </h2>

          <p className="mt-1 text-gray-500">
            Acompanhe pedidos, transporte e entregas dos produtos CAMC.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl bg-amber-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-amber-800"
        >
          <ShoppingCart size={19} />
          Novo Pedido
        </button>
      </section>

      {/* Indicadores */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total de Pedidos</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">128</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
              <Package size={24} className="text-amber-700" />
            </div>
          </div>

          <p className="mt-3 text-sm text-amber-700">Pedidos registrados</p>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Em preparação</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">12</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
              <Clock size={24} className="text-amber-600" />
            </div>
          </div>

          <p className="mt-3 text-sm text-amber-600">Aguardando despacho</p>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Em transporte</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">8</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <Truck size={24} className="text-blue-600" />
            </div>
          </div>

          <p className="mt-3 text-sm text-blue-600">Em rota de entrega</p>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Entregues</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">108</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
              <CheckCircle size={24} className="text-emerald-600" />
            </div>
          </div>

          <p className="mt-3 text-sm text-emerald-600">Entregas concluídas</p>
        </div>
      </section>

      {/* Acompanhamento */}
      <section className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900">
          Acompanhamento Logístico
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Situação atual dos pedidos CAMC.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-amber-50 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                <Package size={20} className="text-amber-700" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Preparação</p>
                <p className="font-bold text-gray-900">12 pedidos</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-blue-50 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <Truck size={20} className="text-blue-700" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Transporte</p>
                <p className="font-bold text-gray-900">8 pedidos</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-emerald-50 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <CheckCircle size={20} className="text-emerald-700" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Entregues</p>
                <p className="font-bold text-gray-900">108 pedidos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Histórico */}
      <section className="rounded-2xl border border-amber-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900">
            Histórico de Pedidos
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Registro dos pedidos e respectivas entregas.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left">
            <thead className="bg-amber-50 text-sm text-gray-600">
              <tr>
                <th className="px-6 py-4 font-semibold">Pedido</th>
                <th className="px-6 py-4 font-semibold">Data</th>
                <th className="px-6 py-4 font-semibold">Cliente</th>
                <th className="px-6 py-4 font-semibold">Produto</th>
                <th className="px-6 py-4 font-semibold">Quantidade</th>
                <th className="px-6 py-4 font-semibold">Valor</th>
                <th className="px-6 py-4 font-semibold">Destino</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 text-center font-semibold">Ações</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {pedidos.map((pedido) => (
                <tr key={pedido.id} className="transition hover:bg-amber-50/50">
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {pedido.id}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {pedido.data}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {pedido.cliente}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {pedido.produtos}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {pedido.quantidade}
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                    {pedido.valor}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin size={15} />
                      {pedido.destino}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${pedido.statusClass}`}
                    >
                      {pedido.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      type="button"
                      className="mx-auto flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
                    >
                      Ver
                      <ArrowRight size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default PedidosLogistica;
