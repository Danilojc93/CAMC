import { useMemo, useState } from "react";
import {
  Flower2,
  Plus,
  Droplets,
  Target,
  BarChart3,
  CalendarDays,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

const producoesIniciais = [
  {
    id: 1,
    data: "18/08/2026",
    apiario: "Apiário A",
    volume: 185,
    qualidade: "Excelente",
    responsavel: "Carlos",
    status: "Concluída",
  },
  {
    id: 2,
    data: "15/08/2026",
    apiario: "Apiário B",
    volume: 142,
    qualidade: "Boa",
    responsavel: "Marcos",
    status: "Concluída",
  },
  {
    id: 3,
    data: "12/08/2026",
    apiario: "Apiário A",
    volume: 168,
    qualidade: "Excelente",
    responsavel: "Carlos",
    status: "Concluída",
  },
  {
    id: 4,
    data: "09/08/2026",
    apiario: "Apiário C",
    volume: 126,
    qualidade: "Boa",
    responsavel: "Fernanda",
    status: "Concluída",
  },
];

function CardMel({ titulo, valor, descricao, icon: Icon, bg, color }) {
  return (
    <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{titulo}</p>

          <p className="mt-2 text-3xl font-bold text-gray-900">{valor}</p>

          <p className="mt-1 text-xs text-gray-500">{descricao}</p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${bg}`}
        >
          <Icon size={24} className={color} />
        </div>
      </div>
    </div>
  );
}

export default function ProducaoMel() {
  const [producoes, setProducoes] = useState(producoesIniciais);
  const [modalAberto, setModalAberto] = useState(false);

  const [novaProducao, setNovaProducao] = useState({
    data: "18/08/2026",
    apiario: "Apiário A",
    volume: "",
    qualidade: "Excelente",
    responsavel: "",
  });

  const totalProduzido = useMemo(
    () =>
      producoes.reduce(
        (total, producao) => total + Number(producao.volume),
        0
      ),
    [producoes]
  );

  const mediaProducao =
    producoes.length > 0
      ? Math.round(totalProduzido / producoes.length)
      : 0;

  const metaSafra = 2500;
  const percentualMeta = Math.min(
    Math.round((totalProduzido / metaSafra) * 100),
    100
  );

  function registrarProducao(event) {
    event.preventDefault();

    if (!novaProducao.volume || !novaProducao.responsavel) {
      return;
    }

    const producao = {
      id: Date.now(),
      data: novaProducao.data,
      apiario: novaProducao.apiario,
      volume: Number(novaProducao.volume),
      qualidade: novaProducao.qualidade,
      responsavel: novaProducao.responsavel,
      status: "Concluída",
    };

    setProducoes((lista) => [producao, ...lista]);

    setNovaProducao({
      data: "18/08/2026",
      apiario: "Apiário A",
      volume: "",
      qualidade: "Excelente",
      responsavel: "",
    });

    setModalAberto(false);
  }

  function excluirProducao(id) {
    setProducoes((lista) =>
      lista.filter((producao) => producao.id !== id)
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <p className="text-sm font-semibold text-amber-700">
            Gestão da produção apícola
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-900">
            Produção de Mel
          </h2>

          <p className="mt-1 text-gray-500">
            Controle da produção, coleta e qualidade do mel.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalAberto(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-amber-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-amber-800"
        >
          <Plus size={19} />
          Registrar Produção
        </button>
      </section>

      {/* Cards */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <CardMel
          titulo="Produção Total"
          valor={`${totalProduzido} L`}
          descricao="Volume registrado"
          icon={Droplets}
          bg="bg-amber-100"
          color="text-amber-700"
        />

        <CardMel
          titulo="Meta da Safra"
          valor={`${metaSafra} L`}
          descricao={`${percentualMeta}% da meta atingida`}
          icon={Target}
          bg="bg-emerald-100"
          color="text-emerald-600"
        />

        <CardMel
          titulo="Média por Coleta"
          valor={`${mediaProducao} L`}
          descricao="Média das produções"
          icon={BarChart3}
          bg="bg-blue-100"
          color="text-blue-600"
        />

        <CardMel
          titulo="Registros"
          valor={producoes.length}
          descricao="Coletas realizadas"
          icon={CalendarDays}
          bg="bg-purple-100"
          color="text-purple-600"
        />
      </section>

      {/* Meta da safra */}
      <section className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Meta da Safra 2026
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Acompanhamento da produção de mel.
            </p>
          </div>

          <span className="text-lg font-bold text-amber-700">
            {totalProduzido} / {metaSafra} L
          </span>
        </div>

        <div className="mt-5 h-4 overflow-hidden rounded-full bg-amber-100">
          <div
            className="h-full rounded-full bg-amber-500 transition-all"
            style={{ width: `${percentualMeta}%` }}
          />
        </div>

        <p className="mt-2 text-sm text-gray-500">
          {percentualMeta}% da meta alcançada
        </p>
      </section>

      {/* Histórico */}
      <section className="overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <Flower2 size={20} className="text-amber-600" />

            <h3 className="font-bold text-gray-900">
              Histórico de Produção
            </h3>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Registro das coletas realizadas nos apiários.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead className="bg-amber-50/60">
              <tr className="text-left text-sm text-gray-600">
                <th className="px-5 py-4 font-semibold">Data</th>
                <th className="px-5 py-4 font-semibold">Apiário</th>
                <th className="px-5 py-4 font-semibold">Volume</th>
                <th className="px-5 py-4 font-semibold">Qualidade</th>
                <th className="px-5 py-4 font-semibold">Responsável</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 text-right font-semibold">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody>
              {producoes.map((producao) => (
                <tr
                  key={producao.id}
                  className="border-t border-gray-100 hover:bg-amber-50/30"
                >
                  <td className="px-5 py-4 text-sm text-gray-700">
                    {producao.data}
                  </td>

                  <td className="px-5 py-4">
                    <span className="font-semibold text-gray-900">
                      {producao.apiario}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="font-bold text-amber-700">
                      {producao.volume} L
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        producao.qualidade === "Excelente"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {producao.qualidade}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {producao.responsavel}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {producao.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        title="Editar"
                        className="rounded-lg p-2 text-gray-500 hover:bg-amber-100 hover:text-amber-700"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        type="button"
                        title="Excluir"
                        onClick={() => excluirProducao(producao.id)}
                        className="rounded-lg p-2 text-gray-500 hover:bg-red-100 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal */}
      {modalAberto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Registrar Produção
                </h3>

                <p className="text-sm text-gray-500">
                  Adicione uma nova coleta de mel.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModalAberto(false)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={registrarProducao}
              className="space-y-4 p-5"
            >
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Data da coleta
                </label>

                <input
                  type="date"
                  value={novaProducao.data
                    .split("/")
                    .reverse()
                    .join("-")}
                  onChange={(event) => {
                    const [ano, mes, dia] =
                      event.target.value.split("-");

                    setNovaProducao({
                      ...novaProducao,
                      data: `${dia}/${mes}/${ano}`,
                    });
                  }}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Apiário
                </label>

                <select
                  value={novaProducao.apiario}
                  onChange={(event) =>
                    setNovaProducao({
                      ...novaProducao,
                      apiario: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-500"
                >
                  <option>Apiário A</option>
                  <option>Apiário B</option>
                  <option>Apiário C</option>
                  <option>Apiário D</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Volume produzido (litros)
                </label>

                <input
                  type="number"
                  min="1"
                  value={novaProducao.volume}
                  onChange={(event) =>
                    setNovaProducao({
                      ...novaProducao,
                      volume: event.target.value,
                    })
                  }
                  placeholder="Ex.: 180"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Qualidade
                </label>

                <select
                  value={novaProducao.qualidade}
                  onChange={(event) =>
                    setNovaProducao({
                      ...novaProducao,
                      qualidade: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-500"
                >
                  <option>Excelente</option>
                  <option>Boa</option>
                  <option>Regular</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Responsável
                </label>

                <input
                  type="text"
                  value={novaProducao.responsavel}
                  onChange={(event) =>
                    setNovaProducao({
                      ...novaProducao,
                      responsavel: event.target.value,
                    })
                  }
                  placeholder="Nome do responsável"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setModalAberto(false)}
                  className="rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-amber-700 px-5 py-3 font-semibold text-white hover:bg-amber-800"
                >
                  Registrar Produção
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}