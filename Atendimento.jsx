import { useEffect, useMemo, useState } from 'react';
import {
  Search,
  User,
  Plus,
  Trash2,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  X,
} from 'lucide-react';

import { supabase } from './supabase';

export default function Atendimento() {
  const [chamados, setChamados] = useState([]);
  const [clientes, setClientes] = useState([]);

  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('Todos');

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const [modalAberto, setModalAberto] = useState(false);

  const [novoChamado, setNovoChamado] = useState({
    cliente_id: '',
    assunto: '',
    mensagem: '',
    categoria: '',
    prioridade: 'Normal',
    status: 'Aberto',
  });

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    setCarregando(true);
    setErro('');

    const { data: dadosAtendimentos, error: erroAtendimentos } =
      await supabase
        .from('atendimentos')
        .select('*');

    if (erroAtendimentos) {
      console.error('Erro ao carregar atendimentos:', erroAtendimentos);
      setErro(erroAtendimentos.message);
      setCarregando(false);
      return;
    }

    const { data: dadosClientes, error: erroClientes } =
      await supabase
        .from('clientes')
        .select('id, nome');

    if (erroClientes) {
      console.error('Erro ao carregar clientes:', erroClientes);
      setErro(erroClientes.message);
      setCarregando(false);
      return;
    }

    const atendimentosComClientes = (dadosAtendimentos || []).map(
      (chamado) => {
        const clienteEncontrado = (dadosClientes || []).find(
          (cliente) =>
            String(cliente.id) === String(chamado.cliente_id)
        );

        return {
          ...chamado,
          cliente:
            clienteEncontrado?.nome ||
            'Cliente não encontrado',
        };
      }
    );

    setChamados(atendimentosComClientes);
    setClientes(dadosClientes || []);
    setCarregando(false);
  }

  const chamadosFiltrados = useMemo(() => {
    const termo = busca.toLowerCase().trim();

    return chamados.filter((chamado) => {
      const correspondeBusca =
        !termo ||
        String(chamado.cliente || '')
          .toLowerCase()
          .includes(termo) ||
        String(chamado.assunto || '')
          .toLowerCase()
          .includes(termo) ||
        String(chamado.categoria || '')
          .toLowerCase()
          .includes(termo);

      const correspondeStatus =
        filtroStatus === 'Todos' ||
        chamado.status === filtroStatus;

      return correspondeBusca && correspondeStatus;
    });
  }, [chamados, busca, filtroStatus]);

  const totalChamados = chamados.length;

  const abertos = chamados.filter(
    (chamado) => chamado.status === 'Aberto'
  ).length;

  const emAtendimento = chamados.filter(
    (chamado) =>
      chamado.status === 'Em atendimento' ||
      chamado.status === 'Em Atendimento'
  ).length;

  const resolvidos = chamados.filter(
    (chamado) => chamado.status === 'Resolvido'
  ).length;

  async function alterarStatus(id, novoStatus) {
    const { error } = await supabase
      .from('atendimentos')
      .update({
        status: novoStatus,
      })
      .eq('id', id);

    if (error) {
      console.error('Erro ao atualizar status:', error);
      alert(
        'Erro ao atualizar status: ' +
          error.message
      );
      return;
    }

    setChamados((atual) =>
      atual.map((chamado) =>
        chamado.id === id
          ? {
              ...chamado,
              status: novoStatus,
            }
          : chamado
      )
    );
  }

  async function excluirChamado(id) {
    const confirmar = window.confirm(
      'Deseja realmente excluir este atendimento?'
    );

    if (!confirmar) {
      return;
    }

    const { error } = await supabase
      .from('atendimentos')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao excluir:', error);

      alert(
        'Erro ao excluir atendimento: ' +
          error.message
      );

      return;
    }

    setChamados((atual) =>
      atual.filter(
        (chamado) => chamado.id !== id
      )
    );
  }

  async function criarChamado(e) {
    e.preventDefault();

    if (!novoChamado.cliente_id) {
      alert('Selecione um cliente.');
      return;
    }

    if (!novoChamado.assunto.trim()) {
      alert('Digite o assunto.');
      return;
    }

    if (!novoChamado.mensagem.trim()) {
      alert('Digite a mensagem.');
      return;
    }

    const dadosParaSalvar = {
      cliente_id: novoChamado.cliente_id,
      assunto: novoChamado.assunto,
      mensagem: novoChamado.mensagem,
      categoria: novoChamado.categoria,
      prioridade: novoChamado.prioridade,
      status: novoChamado.status,
    };

    const { data, error } = await supabase
      .from('atendimentos')
      .insert([dadosParaSalvar])
      .select()
      .single();

    if (error) {
      console.error(
        'Erro ao criar atendimento:',
        error
      );

      alert(
        'Erro ao criar atendimento: ' +
          error.message
      );

      return;
    }

    const clienteSelecionado = clientes.find(
      (cliente) =>
        String(cliente.id) ===
        String(data.cliente_id)
    );

    const chamadoCompleto = {
      ...data,
      cliente:
        clienteSelecionado?.nome ||
        'Cliente',
    };

    setChamados((atual) => [
      ...atual,
      chamadoCompleto,
    ]);

    setNovoChamado({
      cliente_id: '',
      assunto: '',
      mensagem: '',
      categoria: '',
      prioridade: 'Normal',
      status: 'Aberto',
    });

    setModalAberto(false);
  }

  function corPrioridade(prioridade) {
    if (prioridade === 'Alta') {
      return 'bg-red-100 text-red-700';
    }

    if (prioridade === 'Baixa') {
      return 'bg-blue-100 text-blue-700';
    }

    return 'bg-amber-100 text-amber-700';
  }

  return (
    <div className="space-y-6">

      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <p className="text-sm font-medium text-amber-700">
            Central de atendimento
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            Atendimento
          </h1>

          <p className="mt-2 text-gray-500">
            Gerencie solicitações, dúvidas e chamados dos clientes.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalAberto(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-amber-700 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-amber-800"
        >
          <Plus size={20} />
          Novo Atendimento
        </button>

      </section>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total de Chamados
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900">
                {totalChamados}
              </h2>

              <p className="mt-2 text-xs text-gray-500">
                Atendimentos registrados
              </p>
            </div>

            <div className="rounded-2xl bg-amber-100 p-4 text-amber-700">
              <FileText size={28} />
            </div>

          </div>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Abertos
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900">
                {abertos}
              </h2>

              <p className="mt-2 text-xs text-gray-500">
                Aguardando atendimento
              </p>
            </div>

            <div className="rounded-2xl bg-red-100 p-4 text-red-600">
              <AlertCircle size={28} />
            </div>

          </div>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Em Atendimento
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900">
                {emAtendimento}
              </h2>

              <p className="mt-2 text-xs text-gray-500">
                Chamados em andamento
              </p>
            </div>

            <div className="rounded-2xl bg-blue-100 p-4 text-blue-600">
              <Clock size={28} />
            </div>

          </div>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Resolvidos
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900">
                {resolvidos}
              </h2>

              <p className="mt-2 text-xs text-gray-500">
                Atendimentos concluídos
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-100 p-4 text-emerald-600">
              <CheckCircle2 size={28} />
            </div>

          </div>
        </div>

      </section>

      <section className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-4 lg:flex-row">

          <div className="relative flex-1">

            <Search
              size={22}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={busca}
              onChange={(e) =>
                setBusca(e.target.value)
              }
              placeholder="Pesquisar cliente, assunto ou categoria..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-4 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
            />

          </div>

          <select
            value={filtroStatus}
            onChange={(e) =>
              setFiltroStatus(e.target.value)
            }
            className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none focus:border-amber-500"
          >
            <option value="Todos">
              Todos
            </option>

            <option value="Aberto">
              Abertos
            </option>

            <option value="Em atendimento">
              Em atendimento
            </option>

            <option value="Resolvido">
              Resolvidos
            </option>

          </select>

        </div>

      </section>

      {erro && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {erro}
        </div>
      )}

      <section className="overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm">

        <div className="border-b border-gray-100 px-6 py-5">

          <h2 className="text-lg font-bold text-gray-900">
            Chamados de Atendimento
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {chamadosFiltrados.length} atendimento(s) encontrado(s)
          </p>

        </div>

        {carregando ? (

          <div className="p-10 text-center text-gray-500">
            Carregando atendimentos...
          </div>

        ) : chamadosFiltrados.length === 0 ? (

          <div className="p-12 text-center text-gray-500">
            Nenhum atendimento encontrado.
          </div>

        ) : (

          <div className="divide-y divide-gray-100">

            {chamadosFiltrados.map((chamado) => (

              <div
                key={chamado.id}
                className="p-6 transition hover:bg-amber-50/40"
              >

                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                  <div className="flex flex-1 gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                      <User size={20} />
                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-3">

                        <h3 className="text-lg font-bold text-gray-900">
                          {chamado.assunto}
                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${corPrioridade(
                            chamado.prioridade
                          )}`}
                        >
                          {chamado.prioridade || 'Normal'}
                        </span>

                      </div>

                      <p className="mt-3 font-medium text-gray-700">
                        {chamado.cliente}
                      </p>

                      <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-500">
                        {chamado.mensagem || 'Sem mensagem.'}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">

                        {chamado.categoria && (
                          <span className="rounded-lg bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                            {chamado.categoria}
                          </span>
                        )}

                        <span className="rounded-lg bg-gray-100 px-3 py-1 text-xs text-gray-600">
                          Atendimento #{chamado.id}
                        </span>

                      </div>

                    </div>

                  </div>

                  <div className="flex shrink-0 items-center gap-3">

                    <select
                      value={chamado.status || 'Aberto'}
                      onChange={(e) =>
                        alterarStatus(
                          chamado.id,
                          e.target.value
                        )
                      }
                      className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-amber-500"
                    >

                      <option value="Aberto">
                        Aberto
                      </option>

                      <option value="Em atendimento">
                        Em atendimento
                      </option>

                      <option value="Resolvido">
                        Resolvido
                      </option>

                    </select>

                    <button
                      type="button"
                      onClick={() =>
                        excluirChamado(chamado.id)
                      }
                      className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 size={17} />
                      Excluir
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

      {modalAberto && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-gray-100 p-6">

              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  Novo Atendimento
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Registre uma nova solicitação de cliente.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setModalAberto(false)
                }
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={22} />
              </button>

            </div>

            <form
              onSubmit={criarChamado}
              className="space-y-5 p-6"
            >

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Cliente
                </label>

                <select
                  value={novoChamado.cliente_id}
                  onChange={(e) =>
                    setNovoChamado({
                      ...novoChamado,
                      cliente_id: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-500"
                >

                  <option value="">
                    Selecione um cliente
                  </option>

                  {clientes.map((cliente) => (

                    <option
                      key={cliente.id}
                      value={cliente.id}
                    >
                      {cliente.nome}
                    </option>

                  ))}

                </select>

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Assunto
                </label>

                <input
                  type="text"
                  value={novoChamado.assunto}
                  onChange={(e) =>
                    setNovoChamado({
                      ...novoChamado,
                      assunto: e.target.value,
                    })
                  }
                  placeholder="Ex: Dúvida sobre pedido"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-500"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Mensagem
                </label>

                <textarea
                  rows="5"
                  value={novoChamado.mensagem}
                  onChange={(e) =>
                    setNovoChamado({
                      ...novoChamado,
                      mensagem: e.target.value,
                    })
                  }
                  placeholder="Descreva a solicitação do cliente..."
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-500"
                />

              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Categoria
                  </label>

                  <input
                    type="text"
                    value={novoChamado.categoria}
                    onChange={(e) =>
                      setNovoChamado({
                        ...novoChamado,
                        categoria: e.target.value,
                      })
                    }
                    placeholder="Ex: Pedido"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-500"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Prioridade
                  </label>

                  <select
                    value={novoChamado.prioridade}
                    onChange={(e) =>
                      setNovoChamado({
                        ...novoChamado,
                        prioridade: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-500"
                  >

                    <option value="Baixa">
                      Baixa
                    </option>

                    <option value="Normal">
                      Normal
                    </option>

                    <option value="Alta">
                      Alta
                    </option>

                  </select>

                </div>

              </div>

              <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">

                <button
                  type="button"
                  onClick={() =>
                    setModalAberto(false)
                  }
                  className="rounded-xl border border-gray-200 px-5 py-3 font-medium text-gray-600 hover:bg-gray-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-amber-700 px-6 py-3 font-semibold text-white transition hover:bg-amber-800"
                >
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