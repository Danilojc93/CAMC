import { useMemo, useState } from "react";
import {
  Sprout,
  Plus,
  Scale,
  Target,
  BarChart3,
  CalendarDays,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

const colheitasIniciais = [
  {
    id: 1,
    data: "18/08/2026",
    area: "Talhão A",
    quantidade: 185,
    qualidade: "Excelente",
    responsavel: "Carlos",
    status: "Concluída",
  },
  {
    id: 2,
    data: "15/08/2026",
    area: "Talhão B",
    quantidade: 142,
    qualidade: "Boa",
    responsavel: "Marcos",
    status: "Concluída",
  },
  {
    id: 3,
    data: "12/08/2026",
    area: "Talhão A",
    quantidade: 168,
    qualidade: "Excelente",
    responsavel: "Carlos",
    status: "Concluída",
  },
  {
    id: 4,
    data: "09/08/2026",
    area: "Talhão C",
    quantidade: 126,
    qualidade: "Boa",
    responsavel: "Fernanda",
    status: "Concluída",
  },
];

function CardChia({
  titulo,
  valor,
  descricao,
  icon: Icon,
  bg,
  color,
}) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{titulo}</p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {valor}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {descricao}
          </p>
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

export default function ProducaoChia() {
  const [colheitas, setColheitas] = useState(colheitasIniciais);
  const [modalAberto, setModalAberto] = useState(false);

  const [novaColheita, setNovaColheita] = useState({
    data: "18/08/2026",
    area: "Talhão A",
    quantidade: "",
    qualidade: "Excelente",
    responsavel: "",
  });

  const totalColhido = useMemo(
    () =>
      colheitas.reduce(
        (total, colheita) => total + Number(colheita.quantidade),
        0
      ),
    [colheitas]
  );

  const mediaColheita =
    colheitas.length > 0
      ? Math.round(totalColhido / colheitas.length)
      : 0;

  const metaSafra = 2000;

  const percentualMeta = Math.min(
    Math.round((totalColhido / metaSafra) * 100),
    100
  );

  function registrarColheita(event) {
    event.preventDefault();

    if (!novaColheita.quantidade || !novaColheita.responsavel) {
      return;
    }

    const colheita = {
      id: Date.now(),
      data: novaColheita.data,
      area: novaColheita.area,
      quantidade: Number(novaColheita.quantidade),
      qualidade: novaColheita.qualidade,
      responsavel: novaColheita.responsavel,
      status: "Concluída",
    };

    setColheitas((lista) => [colheita, ...lista]);

    setNovaColheita({
      data: "18/08/2026",
      area: "Talhão A",
      quantidade: "",
      qualidade: "Excelente",
      responsavel: "",
    });

    setModalAberto(false);
  }

  function excluirColheita(id) {
    setColheitas((lista) =>
      lista.filter((colheita) => colheita.id !== id)
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <p className="text-sm font-semibold text-emerald-700">
            Gestão da produção agrícola
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-900">
            Produção de Chia
          </h2>

          <p className="mt-1 text-gray-500">
            Controle do cultivo, colheita e qualidade da chia.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalAberto(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-800"
        >
          <Plus size={19} />
          Registrar Colheita
        </button>
      </section>

      {/* Indicadores */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <CardChia
          titulo="Chia Colhida"
          valor={`${totalColhido} kg`}
          descricao="Quantidade registrada"
          icon={Scale}
          bg="bg-emerald-100"
          color="text-emerald-700"
        />

        <CardChia
          titulo="Meta da Safra"
          valor={`${metaSafra} kg`}
          descricao={`${percentualMeta}% da meta atingida`}
          icon={Target}
          bg="bg-amber-100"
          color="text-amber-600"
        />

        <CardChia
          titulo="Média por Colheita"
          valor={`${mediaColheita} kg`}
          descricao="Média das colheitas"
          icon={BarChart3}
          bg="bg-blue-100"
          color="text-blue-600"
        />

        <CardChia
          titulo="Registros"
          valor={colheitas.length}
          descricao="Colheitas realizadas"
          icon={CalendarDays}
          bg="bg-purple-100"
          color="text-purple-600"
        />
      </section>

      {/* Meta da safra */}
      <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Meta da Safra 2026
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Acompanhamento da produção de chia.
            </p>
          </div>

          <span className="text-lg font-bold text-emerald-700">
            {totalColhido} / {metaSafra} kg
          </span>
        </div>

        <div className="mt-5 h-4 overflow-hidden rounded-full bg-emerald-100">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: `${percentualMeta}%` }}
          />
        </div>

        <p className="mt-2 text-sm text-gray-500">
          {percentualMeta}% da meta alcançada
        </p>
      </section>

      {/* Histórico */}
      <section className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <Sprout size={20} className="text-emerald-600" />

            <h3 className="font-bold text-gray-900">
              Histórico de Colheitas
            </h3>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Registro das colheitas realizadas nas áreas de cultivo.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead className="bg-emerald-50/60">
              <tr className="text-left text-sm text-gray-600">
                <th className="px-5 py-4 font-semibold">Data</th>
                <th className="px-5 py-4 font-semibold">Área</th>
                <th className="px-5 py-4 font-semibold">
                  Quantidade
                </th>
                <th className="px-5 py-4 font-semibold">Qualidade</th>
                <th className="px-5 py-4 font-semibold">
                  Responsável
                </th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 text-right font-semibold">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody>
              {colheitas.map((colheita) => (
                <tr
                  key={colheita.id}
                  className="border-t border-gray-100 hover:bg-emerald-50/30"
                >
                  <td className="px-5 py-4 text-sm text-gray-700">
                    {colheita.data}
                  </td>

                  <td className="px-5 py-4">
                    <span className="font-semibold text-gray-900">
                      {colheita.area}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="font-bold text-emerald-700">
                      {colheita.quantidade} kg
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        colheita.qualidade === "Excelente"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {colheita.qualidade}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {colheita.responsavel}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {colheita.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        title="Editar"
                        className="rounded-lg p-2 text-gray-500 hover:bg-emerald-100 hover:text-emerald-700"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        type="button"
                        title="Excluir"
                        onClick={() =>
                          excluirColheita(colheita.id)
                        }
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
                  Registrar Colheita
                </h3>

                <p className="text-sm text-gray-500">
                  Adicione uma nova colheita de chia.
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
              onSubmit={registrarColheita}
              className="space-y-4 p-5"
            >
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Data da colheita
                </label>

                <input
                  type="date"
                  value={novaColheita.data
                    .split("/")
                    .reverse()
                    .join("-")}
                  onChange={(event) => {
                    const [ano, mes, dia] =
                      event.target.value.split("-");

                    setNovaColheita({
                      ...novaColheita,
                      data: `${dia}/${mes}/${ano}`,
                    });
                  }}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Área de cultivo
                </label>

                <select
                  value={novaColheita.area}
                  onChange={(event) =>
                    setNovaColheita({
                      ...novaColheita,
                      area: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-emerald-500"
                >
                  <option>Talhão A</option>
                  <option>Talhão B</option>
                  <option>Talhão C</option>
                  <option>Talhão D</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Quantidade colhida (kg)
                </label>

                <input
                  type="number"
                  min="1"
                  value={novaColheita.quantidade}
                  onChange={(event) =>
                    setNovaColheita({
                      ...novaColheita,
                      quantidade: event.target.value,
                    })
                  }
                  placeholder="Ex.: 180"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Qualidade
                </label>

                <select
                  value={novaColheita.qualidade}
                  onChange={(event) =>
                    setNovaColheita({
                      ...novaColheita,
                      qualidade: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-emerald-500"
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
                  value={novaColheita.responsavel}
                  onChange={(event) =>
                    setNovaColheita({
                      ...novaColheita,
                      responsavel: event.target.value,
                    })
                  }
                  placeholder="Nome do responsável"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-emerald-500"
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
                  className="rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
                >
                  Registrar Colheita
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}