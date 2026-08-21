import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  X,
  Send,
} from "lucide-react";

const chamadosIniciais = [
  {
    id: 1001,
    cliente: "Ana Paula Silva",
    assunto: "Dúvida sobre pedido",
    categoria: "Pedido",
    prioridade: "Normal",
    status: "Em atendimento",
    data: "18/08/2026",
    mensagem: "Cliente deseja informações sobre o prazo de entrega.",
  },
  {
    id: 1002,
    cliente: "Carlos Henrique",
    assunto: "Produto com embalagem danificada",
    categoria: "Reclamação",
    prioridade: "Alta",
    status: "Aberto",
    data: "18/08/2026",
    mensagem: "Cliente informou que recebeu uma embalagem danificada.",
  },
  {
    id: 1003,
    cliente: "Mariana Santos",
    assunto: "Informações sobre Barra Mel + Chia",
    categoria: "Informação",
    prioridade: "Normal",
    status: "Resolvido",
    data: "17/08/2026",
    mensagem: "Cliente solicitou informações sobre os ingredientes.",
  },
  {
    id: 1004,
    cliente: "João Oliveira",
    assunto: "Solicitação de troca",
    categoria: "Troca",
    prioridade: "Alta",
    status: "Aberto",
    data: "17/08/2026",
    mensagem: "Cliente solicitou troca de produto.",
  },
];

function CardAtendimento({ titulo, valor, descricao, icon: Icon, bg, color }) {
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

export default function Atendimento() {
  const [chamados, setChamados] = useState(chamadosIniciais);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [modalAberto, setModalAberto] = useState(false);

  const [novoChamado, setNovoChamado] = useState({
    cliente: "",
    assunto: "",
    categoria: "Informação",
    prioridade: "Normal",
    mensagem: "",
  });

  const chamadosFiltrados = useMemo(() => {
    const termo = busca.toLowerCase();

    return chamados.filter((chamado) => {
      const correspondeBusca =
        chamado.cliente.toLowerCase().includes(termo) ||
        chamado.assunto.toLowerCase().includes(termo) ||
        chamado.categoria.toLowerCase().includes(termo);

      const correspondeStatus =
        filtroStatus === "Todos" || chamado.status === filtroStatus;

      return correspondeBusca && correspondeStatus;
    });
  }, [chamados, busca, filtroStatus]);

  const abertos = chamados.filter(
    (chamado) => chamado.status === "Aberto"
  ).length;

  const atendimento = chamados.filter(
    (chamado) => chamado.status === "Em atendimento"
  ).length;

  const resolvidos = chamados.filter(
    (chamado) => chamado.status === "Resolvido"
  ).length;

  function criarChamado(event) {
    event.preventDefault();

    if (!novoChamado.cliente || !novoChamado.assunto) {
      return;
    }

    const chamado = {
      id: Date.now(),
      cliente: novoChamado.cliente,
      assunto: novoChamado.assunto,
      categoria: novoChamado.categoria,
      prioridade: novoChamado.prioridade,
      status: "Aberto",
      data: "18/08/2026",
      mensagem: novoChamado.mensagem || "Sem descrição.",
    };

    setChamados((lista) => [chamado, ...lista]);

    setNovoChamado({
      cliente: "",
      assunto: "",
      categoria: "Informação",
      prioridade: "Normal",
      mensagem: "",
    });

    setModalAberto(false);
  }

  function alterarStatus(id, novoStatus) {
    setChamados((lista) =>
      lista.map((chamado) =>
        chamado.id === id
          ? { ...chamado, status: novoStatus }
          : chamado
      )
    );
  }

  function excluirChamado(id) {
    setChamados((lista) =>
      lista.filter((chamado) => chamado.id !== id)
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <p className="text-sm font-semibold text-amber-700">
            Central de atendimento
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-900">
            Atendimento
          </h2>

          <p className="mt-1 text-gray-500">
            Gerencie solicitações, dúvidas e chamados dos clientes.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalAberto(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-amber-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-amber-800"
        >
          <Plus size={19} />
          Novo Atendimento
        </button>
      </section>

      {/* Cards */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <CardAtendimento
          titulo="Total de Chamados"
          valor={chamados.length}
          descricao="Atendimentos registrados"
          icon={MessageSquare}
          bg="bg-amber-100"
          color="text-amber-700"
        />

        <CardAtendimento
          titulo="Abertos"
          valor={abertos}
          descricao="Aguardando atendimento"
          icon={AlertCircle}
          bg="bg-red-100"
          color="text-red-600"
        />

        <CardAtendimento
          titulo="Em Atendimento"
          valor={atendimento}
          descricao="Chamados em andamento"
          icon={Clock}
          bg="bg-blue-100"
          color="text-blue-600"
        />

        <CardAtendimento
          titulo="Resolvidos"
          valor={resolvidos}
          descricao="Atendimentos concluídos"
          icon={CheckCircle2}
          bg="bg-emerald-100"
          color="text-emerald-600"
        />
      </section>

      {/* Filtros */}
      <section className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
              placeholder="Pesquisar cliente, assunto ou categoria..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 outline-none transition focus:border-amber-500 focus:bg-white"
            />
          </div>

          <select
            value={filtroStatus}
            onChange={(event) => setFiltroStatus(event.target.value)}
            className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-amber-500"
          >
            <option>Todos</option>
            <option>Aberto</option>
            <option>Em atendimento</option>
            <option>Resolvido</option>
          </select>
        </div>
      </section>

      {/* Lista */}
      <section className="overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <h3 className="font-bold text-gray-900">
            Chamados de Atendimento
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {chamadosFiltrados.length} atendimento(s) encontrado(s)
          </p>
        </div>

        <div className="divide-y divide-gray-100">
          {chamadosFiltrados.map((chamado) => (
            <div
              key={chamado.id}
              className="p-5 transition hover:bg-amber-50/30"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                    <User size={20} />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-bold text-gray-900">
                        {chamado.assunto}
                      </h4>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          chamado.prioridade === "Alta"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {chamado.prioridade}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-gray-600">
                      {chamado.cliente}
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                      {chamado.mensagem}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-amber-100 px-3 py-1 font-medium text-amber-700">
                        {chamado.categoria}
                      </span>

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-600">
                        #{chamado.id}
                      </span>

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-600">
                        {chamado.data}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                  <select
                    value={chamado.status}
                    onChange={(event) =>
                      alterarStatus(chamado.id, event.target.value)
                    }
                    className={`rounded-lg border px-3 py-2 text-sm font-semibold outline-none ${
                      chamado.status === "Resolvido"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : chamado.status === "Em atendimento"
                          ? "border-blue-200 bg-blue-50 text-blue-700"
                          : "border-red-200 bg-red-50 text-red-700"
                    }`}
                  >
                    <option>Aberto</option>
                    <option>Em atendimento</option>
                    <option>Resolvido</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => excluirChamado(chamado.id)}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}

          {chamadosFiltrados.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              Nenhum atendimento encontrado.
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {modalAberto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Novo Atendimento
                </h3>

                <p className="text-sm text-gray-500">
                  Registre uma nova solicitação.
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

            <form onSubmit={criarChamado} className="space-y-4 p-5">
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Cliente
                </label>

                <input
                  type="text"
                  value={novoChamado.cliente}
                  onChange={(event) =>
                    setNovoChamado({
                      ...novoChamado,
                      cliente: event.target.value,
                    })
                  }
                  placeholder="Nome do cliente"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Assunto
                </label>

                <input
                  type="text"
                  value={novoChamado.assunto}
                  onChange={(event) =>
                    setNovoChamado({
                      ...novoChamado,
                      assunto: event.target.value,
                    })
                  }
                  placeholder="Assunto do atendimento"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">
                    Categoria
                  </label>

                  <select
                    value={novoChamado.categoria}
                    onChange={(event) =>
                      setNovoChamado({
                        ...novoChamado,
                        categoria: event.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-500"
                  >
                    <option>Informação</option>
                    <option>Pedido</option>
                    <option>Reclamação</option>
                    <option>Troca</option>
                    <option>Sugestão</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">
                    Prioridade
                  </label>

                  <select
                    value={novoChamado.prioridade}
                    onChange={(event) =>
                      setNovoChamado({
                        ...novoChamado,
                        prioridade: event.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-500"
                  >
                    <option>Normal</option>
                    <option>Alta</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Mensagem
                </label>

                <textarea
                  value={novoChamado.mensagem}
                  onChange={(event) =>
                    setNovoChamado({
                      ...novoChamado,
                      mensagem: event.target.value,
                    })
                  }
                  placeholder="Descreva a solicitação do cliente..."
                  rows="4"
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-500"
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
                  className="flex items-center gap-2 rounded-xl bg-amber-700 px-5 py-3 font-semibold text-white hover:bg-amber-800"
                >
                  <Send size={18} />
                  Criar Atendimento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}