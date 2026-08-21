import {
  Star,
  MessageSquare,
  Users,
  ThumbsUp,
  AlertCircle,
} from 'lucide-react';

const feedbacks = [
  {
    cliente: 'Mercado São Paulo',
    nota: 5,
    comentario:
      'Excelente qualidade do mel e das barras. A entrega também foi muito rápida.',
    data: '18/08/2026',
    produto: 'Mel + Chia',
    status: 'Positivo',
    statusClass: 'bg-emerald-100 text-emerald-700',
  },
  {
    cliente: 'Empório Natural',
    nota: 5,
    comentario:
      'Produto muito bom. A barra de mel com chia teve ótima aceitação dos clientes.',
    data: '17/08/2026',
    produto: 'Barra Mel + Chia',
    status: 'Positivo',
    statusClass: 'bg-emerald-100 text-emerald-700',
  },
  {
    cliente: 'Casa do Produtor',
    nota: 4,
    comentario:
      'Gostei bastante do produto. Apenas o prazo de entrega poderia ser menor.',
    data: '16/08/2026',
    produto: 'Mel Puro',
    status: 'Resolvido',
    statusClass: 'bg-blue-100 text-blue-700',
  },
  {
    cliente: 'Mercado Verde',
    nota: 3,
    comentario:
      'O produto é bom, mas tivemos um pequeno problema com a embalagem.',
    data: '15/08/2026',
    produto: 'Chia',
    status: 'Atenção',
    statusClass: 'bg-amber-100 text-amber-700',
  },
];

function Estrelas({ nota }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((estrela) => (
        <Star
          key={estrela}
          size={17}
          className={
            estrela <= nota
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300'
          }
        />
      ))}
    </div>
  );
}

function FeedbackClientes() {
  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <section>
        <p className="text-sm font-semibold text-amber-700">
          Relacionamento com clientes
        </p>

        <h2 className="mt-1 text-2xl font-bold text-gray-900">
          Feedback Clientes
        </h2>

        <p className="mt-1 text-gray-500">
          Acompanhe avaliações, opiniões e satisfação dos clientes CAMC.
        </p>
      </section>

      {/* Indicadores */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avaliação média</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">4,6</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100">
              <Star size={24} className="fill-yellow-400 text-yellow-400" />
            </div>
          </div>

          <div className="mt-3">
            <Estrelas nota={5} />
          </div>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total de avaliações</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">146</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <MessageSquare size={24} className="text-blue-600" />
            </div>
          </div>

          <p className="mt-3 text-sm text-blue-600">Avaliações registradas</p>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avaliações positivas</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">128</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
              <ThumbsUp size={24} className="text-emerald-600" />
            </div>
          </div>

          <p className="mt-3 text-sm text-emerald-600">87,7% dos clientes</p>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Atenção necessária</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">8</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
              <AlertCircle size={24} className="text-amber-600" />
            </div>
          </div>

          <p className="mt-3 text-sm text-amber-600">
            Feedbacks para acompanhar
          </p>
        </div>
      </section>

      {/* Satisfação */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900">
            Satisfação dos Clientes
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Distribuição das avaliações recebidas.
          </p>

          <div className="mt-6 space-y-4">
            {[
              { nota: 5, quantidade: 92, percentual: 63 },
              { nota: 4, quantidade: 36, percentual: 25 },
              { nota: 3, quantidade: 12, percentual: 8 },
              { nota: 2, quantidade: 4, percentual: 3 },
              { nota: 1, quantidade: 2, percentual: 1 },
            ].map((item) => (
              <div key={item.nota}>
                <div className="mb-2 flex items-center gap-3">
                  <span className="w-10 text-sm font-semibold">
                    {item.nota} ★
                  </span>

                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-yellow-400"
                      style={{ width: `${item.percentual}%` }}
                    />
                  </div>

                  <span className="w-8 text-right text-sm text-gray-500">
                    {item.quantidade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900">
            Resumo do Relacionamento
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Indicadores de satisfação do período.
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-emerald-50 p-4">
              <span className="font-medium">Clientes satisfeitos</span>
              <span className="font-bold text-emerald-700">87,7%</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-blue-50 p-4">
              <span className="font-medium">Clientes recorrentes</span>
              <span className="font-bold text-blue-700">72%</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-yellow-50 p-4">
              <span className="font-medium">Nota média</span>
              <span className="font-bold text-yellow-700">4,6 / 5</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-purple-50 p-4">
              <span className="font-medium">Clientes avaliadores</span>
              <span className="font-bold text-purple-700">146</span>
            </div>
          </div>
        </div>
      </section>

      {/* Histórico */}
      <section className="rounded-2xl border border-amber-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100">
              <Users size={20} className="text-yellow-700" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Histórico de Feedbacks
              </h3>

              <p className="text-sm text-gray-500">
                Avaliações recentes dos clientes.
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {feedbacks.map((feedback) => (
            <div
              key={`${feedback.cliente}-${feedback.data}`}
              className="p-6 transition hover:bg-amber-50/40"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100 font-bold text-amber-800">
                    {feedback.cliente.charAt(0)}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h4 className="font-bold text-gray-900">
                        {feedback.cliente}
                      </h4>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${feedback.statusClass}`}
                      >
                        {feedback.status}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <Estrelas nota={feedback.nota} />

                      <span className="text-sm text-gray-500">
                        {feedback.data}
                      </span>

                      <span className="text-sm font-medium text-amber-700">
                        {feedback.produto}
                      </span>
                    </div>

                    <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">
                      "{feedback.comentario}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default FeedbackClientes;
