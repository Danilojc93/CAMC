import { useMemo, useState } from 'react';
import {
  Search,
  Plus,
  Users,
  UserCheck,
  UserPlus,
  ShoppingBag,
  Pencil,
  Trash2,
  Phone,
  Mail,
  X,
} from 'lucide-react';

const clientesIniciais = [
  {
    id: 1,
    nome: 'Ana Paula Silva',
    email: 'ana.paula@email.com',
    telefone: '(11) 99999-1111',
    pedidos: 12,
    status: 'Ativo',
  },
  {
    id: 2,
    nome: 'Carlos Henrique',
    email: 'carlos@email.com',
    telefone: '(11) 98888-2222',
    pedidos: 8,
    status: 'Ativo',
  },
  {
    id: 3,
    nome: 'Mariana Santos',
    email: 'mariana@email.com',
    telefone: '(11) 97777-3333',
    pedidos: 5,
    status: 'Ativo',
  },
  {
    id: 4,
    nome: 'João Oliveira',
    email: 'joao@email.com',
    telefone: '(11) 96666-4444',
    pedidos: 3,
    status: 'Inativo',
  },
  {
    id: 5,
    nome: 'Fernanda Costa',
    email: 'fernanda@email.com',
    telefone: '(11) 95555-5555',
    pedidos: 17,
    status: 'Ativo',
  },
];

function CardResumo({ titulo, valor, descricao, icon: Icon, bg, color }) {
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

export default function Clientes() {
  const [clientes, setClientes] = useState(clientesIniciais);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);

  const [novoCliente, setNovoCliente] = useState({
    nome: '',
    email: '',
    telefone: '',
  });

  const clientesFiltrados = useMemo(() => {
    const termo = busca.toLowerCase();

    return clientes.filter(
      (cliente) =>
        cliente.nome.toLowerCase().includes(termo) ||
        cliente.email.toLowerCase().includes(termo) ||
        cliente.telefone.includes(termo)
    );
  }, [clientes, busca]);

  const clientesAtivos = clientes.filter(
    (cliente) => cliente.status === 'Ativo'
  ).length;

  const novosClientes = clientes.length;

  const totalPedidos = clientes.reduce(
    (total, cliente) => total + cliente.pedidos,
    0
  );

  function adicionarCliente(event) {
    event.preventDefault();

    if (!novoCliente.nome || !novoCliente.email) {
      return;
    }

    const cliente = {
      id: Date.now(),
      nome: novoCliente.nome,
      email: novoCliente.email,
      telefone: novoCliente.telefone || 'Não informado',
      pedidos: 0,
      status: 'Ativo',
    };

    setClientes((lista) => [...lista, cliente]);

    setNovoCliente({
      nome: '',
      email: '',
      telefone: '',
    });

    setModalAberto(false);
  }

  function excluirCliente(id) {
    setClientes((lista) => lista.filter((cliente) => cliente.id !== id));
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <p className="text-sm font-semibold text-amber-700">
            Gestão de relacionamento
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-900">
            Clientes & CRM
          </h2>

          <p className="mt-1 text-gray-500">
            Gerencie clientes, contatos e histórico de pedidos.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalAberto(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-amber-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-amber-800"
        >
          <Plus size={19} />
          Novo Cliente
        </button>
      </section>

      {/* Cards */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <CardResumo
          titulo="Total de Clientes"
          valor={clientes.length}
          descricao="Clientes cadastrados"
          icon={Users}
          bg="bg-amber-100"
          color="text-amber-700"
        />

        <CardResumo
          titulo="Clientes Ativos"
          valor={clientesAtivos}
          descricao="Clientes em atividade"
          icon={UserCheck}
          bg="bg-emerald-100"
          color="text-emerald-600"
        />

        <CardResumo
          titulo="Novos Clientes"
          valor={novosClientes}
          descricao="Base atual do sistema"
          icon={UserPlus}
          bg="bg-blue-100"
          color="text-blue-600"
        />

        <CardResumo
          titulo="Pedidos"
          valor={totalPedidos}
          descricao="Pedidos realizados"
          icon={ShoppingBag}
          bg="bg-purple-100"
          color="text-purple-600"
        />
      </section>

      {/* Busca */}
      <section className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            placeholder="Pesquisar cliente por nome, e-mail ou telefone..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 outline-none transition focus:border-amber-500 focus:bg-white"
          />
        </div>
      </section>

      {/* Tabela */}
      <section className="overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <h3 className="font-bold text-gray-900">Lista de Clientes</h3>

          <p className="mt-1 text-sm text-gray-500">
            {clientesFiltrados.length} cliente(s) encontrado(s)
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-amber-50/60">
              <tr className="text-left text-sm text-gray-600">
                <th className="px-5 py-4 font-semibold">Cliente</th>
                <th className="px-5 py-4 font-semibold">Contato</th>
                <th className="px-5 py-4 font-semibold">Pedidos</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 text-right font-semibold">Ações</th>
              </tr>
            </thead>

            <tbody>
              {clientesFiltrados.map((cliente) => (
                <tr
                  key={cliente.id}
                  className="border-t border-gray-100 hover:bg-amber-50/30"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 font-bold text-amber-700">
                        {cliente.nome.charAt(0)}
                      </div>

                      <div>
                        <p className="font-semibold text-gray-900">
                          {cliente.nome}
                        </p>

                        <p className="text-xs text-gray-500">
                          ID #{cliente.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={15} />
                        {cliente.email}
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone size={15} />
                        {cliente.telefone}
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="font-semibold text-gray-800">
                      {cliente.pedidos}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        cliente.status === 'Ativo'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {cliente.status}
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
                        onClick={() => excluirCliente(cliente.id)}
                        className="rounded-lg p-2 text-gray-500 hover:bg-red-100 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {clientesFiltrados.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-10 text-center text-gray-500"
                  >
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal Novo Cliente */}
      {modalAberto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Novo Cliente
                </h3>

                <p className="text-sm text-gray-500">
                  Cadastre um novo cliente no CRM.
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

            <form onSubmit={adicionarCliente} className="space-y-4 p-5">
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Nome
                </label>

                <input
                  type="text"
                  value={novoCliente.nome}
                  onChange={(event) =>
                    setNovoCliente({
                      ...novoCliente,
                      nome: event.target.value,
                    })
                  }
                  placeholder="Nome completo"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  E-mail
                </label>

                <input
                  type="email"
                  value={novoCliente.email}
                  onChange={(event) =>
                    setNovoCliente({
                      ...novoCliente,
                      email: event.target.value,
                    })
                  }
                  placeholder="cliente@email.com"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Telefone
                </label>

                <input
                  type="text"
                  value={novoCliente.telefone}
                  onChange={(event) =>
                    setNovoCliente({
                      ...novoCliente,
                      telefone: event.target.value,
                    })
                  }
                  placeholder="(00) 00000-0000"
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
                  Cadastrar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
