import { useMemo, useState } from "react";
import {
  PackageCheck,
  Plus,
  Boxes,
  Target,
  BarChart3,
  CalendarDays,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

const lotesIniciais = [
  {
    id: 1,
    data: "18/08/2026",
    lote: "L-2026-001",
    quantidade: 850,
    mel: 42,
    chia: 18,
    responsavel: "Carlos",
    status: "Concluído",
  },
  {
    id: 2,
    data: "15/08/2026",
    lote: "L-2026-002",
    quantidade: 720,
    mel: 36,
    chia: 15,
    responsavel: "Marcos",
    status: "Concluído",
  },
  {
    id: 3,
    data: "12/08/2026",
    lote: "L-2026-003",
    quantidade: 980,
    mel: 49,
    chia: 21,
    responsavel: "Fernanda",
    status: "Em produção",
  },
  {
    id: 4,
    data: "09/08/2026",
    lote: "L-2026-004",
    quantidade: 900,
    mel: 45,
    chia: 20,
    responsavel: "Carlos",
    status: "Concluído",
  },
];

function CardBarra({
  titulo,
  valor,
  descricao,
  icon: Icon,
  bg,
  color,
}) {
  return (
    <div className="rounded-2xl border border-yellow-100 bg-white p-5 shadow-sm">
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

export default function BarraMelChia() {
  const [lotes, setLotes] = useState(lotesIniciais);
  const [modalAberto, setModalAberto] = useState(false);

  const [novoLote, setNovoLote] = useState({
    data: "18/08/2026",
    quantidade: "",
    mel: "",
    chia: "",
    responsavel: "",
  });

  const totalBarras = useMemo(
    () =>
      lotes.reduce(
        (total, lote) => total + Number(lote.quantidade),
        0
      ),
    [lotes]
  );

  const mediaPorLote =
    lotes.length > 0
      ? Math.round(totalBarras / lotes.length)
      : 0;

  const metaProducao = 10000;

  const percentualMeta = Math.min(
    Math.round((totalBarras / metaProducao) * 100),
    100
  );

  const lotesEmProducao = lotes.filter(
    (lote) => lote.status === "Em produção"
  ).length;

  function registrarLote(event) {
    event.preventDefault();

    if (
      !novoLote.quantidade ||
      !novoLote.mel ||
      !novoLote.chia ||
      !novoLote.responsavel
    ) {
      return;
    }

    const novo = {
      id: Date.now(),
      data: novoLote.data,
      lote: `L-2026-${String(lotes.length + 1).padStart(3, "0")}`,
      quantidade: Number(novoLote.quantidade),
      mel: Number(novoLote.mel),
      chia: Number(novoLote.chia),
      responsavel: novoLote.responsavel,
      status: "Em produção",
    };

    setLotes((lista) => [novo, ...lista]);

    setNovoLote({
      data: "18/08/2026",
      quantidade: "",
      mel: "",
      chia: "",
      responsavel: "",
    });

    setModalAberto(false);
  }

  function excluirLote(id) {
    setLotes((lista) =>
      lista.filter((lote) => lote.id !== id)
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <p className="text-sm font-semibold text-yellow-700">
            Produção do produto final
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-900">
            Barra Mel + Chia
          </h2>

          <p className="mt-1 text-gray-500">
            Controle dos lotes e produção das barras de mel com chia.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalAberto(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-yellow-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-yellow-700"
        >
          <Plus size={19} />
          Registrar Produção
        </button>
      </section>

      {/* Indicadores */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <CardBarra
          titulo="Barras Produzidas"
          valor={totalBarras.toLocaleString("pt-BR")}
          descricao="Quantidade total"
          icon={PackageCheck}
          bg="bg-yellow-100"
          color="text-yellow-700"
        />

        <CardBarra
          titulo="Meta de Produção"
          valor={metaProducao.toLocaleString("pt-BR")}
          descricao={`${percentualMeta}% da meta atingida`}
          icon={Target}
          bg="bg-emerald-100"
          color="text-emerald-600"
        />

        <CardBarra
          titulo="Média por Lote"
          valor={mediaPorLote.toLocaleString("pt-BR")}
          descricao="Barras por lote"
          icon={BarChart3}
          bg="bg-blue-100"
          color="text-blue-600"
        />

        <CardBarra
          titulo="Lotes em Produção"
          valor={lotesEmProducao}
          descricao="Produções em andamento"
          icon={Boxes}
          bg="bg-purple-100"
          color="text-purple-600"
        />
      </section>

      {/* Meta */}
      <section className="rounded-2xl border border-yellow-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Meta de Produção 2026
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Acompanhamento da fabricação das barras.
            </p>
          </div>

          <span className="text-lg font-bold text-yellow-700">
            {totalBarras.toLocaleString("pt-BR")} /{" "}
            {metaProducao.toLocaleString("pt-BR")} barras
          </span>
        </div>

        <div className="mt-5 h-4 overflow-hidden rounded-full bg-yellow-100">
          <div
            className="h-full rounded-full bg-yellow-500 transition-all"
            style={{ width: `${percentualMeta}%` }}
          />
        </div>

        <p className="mt-2 text-sm text-gray-500">
          {percentualMeta}% da meta alcançada
        </p>
      </section>

      {/* Histórico */}
      <section className="overflow-hidden rounded-2xl border border-yellow-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <PackageCheck
              size={20}
              className="text-yellow-600"
            />

            <h3 className="font-bold text-gray-900">
              Histórico de Produção
            </h3>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Registro dos lotes fabricados.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-yellow-50/60">
              <tr className="text-left text-sm text-gray-600">
                <th className="px-5 py-4 font-semibold">
                  Data
                </th>

                <th className="px-5 py-4 font-semibold">
                  Lote
                </th>

                <th className="px-5 py-4 font-semibold">
                  Barras
                </th>

                <th className="px-5 py-4 font-semibold">
                  Mel
                </th>

                <th className="px-5 py-4 font-semibold">
                  Chia
                </th>

                <th className="px-5 py-4 font-semibold">
                  Responsável
                </th>

                <th className="px-5 py-4 font-semibold">
                  Status
                </th>

                <th className="px-5 py-4 text-right font-semibold">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody>
              {lotes.map((lote) => (
                <tr
                  key={lote.id}
                  className="border-t border-gray-100 hover:bg-yellow-50/30"
                >
                  <td className="px-5 py-4 text-sm text-gray-700">
                    {lote.data}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700">
                      {lote.lote}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="font-bold text-yellow-700">
                      {lote.quantidade.toLocaleString("pt-BR")}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {lote.mel} kg
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {lote.chia} kg
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {lote.responsavel}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        lote.status === "Concluído"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {lote.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        title="Editar"
                        className="rounded-lg p-2 text-gray-500 hover:bg-yellow-100 hover:text-yellow-700"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        type="button"
                        title="Excluir"
                        onClick={() => excluirLote(lote.id)}
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
                  Registre um novo lote de barras.
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
              onSubmit={registrarLote}
              className="space-y-4 p-5"
            >
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Data de fabricação
                </label>

                <input
                  type="date"
                  value={novoLote.data
                    .split("/")
                    .reverse()
                    .join("-")}
                  onChange={(event) => {
                    const [ano, mes, dia] =
                      event.target.value.split("-");

                    setNovoLote({
                      ...novoLote,
                      data: `${dia}/${mes}/${ano}`,
                    });
                  }}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Quantidade de barras
                </label>

                <input
                  type="number"
                  min="1"
                  value={novoLote.quantidade}
                  onChange={(event) =>
                    setNovoLote({
                      ...novoLote,
                      quantidade: event.target.value,
                    })
                  }
                  placeholder="Ex.: 1000"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-yellow-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">
                    Mel utilizado (kg)
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={novoLote.mel}
                    onChange={(event) =>
                      setNovoLote({
                        ...novoLote,
                        mel: event.target.value,
                      })
                    }
                    placeholder="Ex.: 50"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-yellow-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">
                    Chia utilizada (kg)
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={novoLote.chia}
                    onChange={(event) =>
                      setNovoLote({
                        ...novoLote,
                        chia: event.target.value,
                      })
                    }
                    placeholder="Ex.: 20"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-yellow-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Responsável
                </label>

                <input
                  type="text"
                  value={novoLote.responsavel}
                  onChange={(event) =>
                    setNovoLote({
                      ...novoLote,
                      responsavel: event.target.value,
                    })
                  }
                  placeholder="Nome do responsável"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-yellow-500"
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
                  className="rounded-xl bg-yellow-600 px-5 py-3 font-semibold text-white hover:bg-yellow-700"
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