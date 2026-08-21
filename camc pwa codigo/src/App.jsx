import { useState } from 'react';
import Clientes from './Clientes';
import Atendimento from './Atendimento';
import ProducaoMel from './ProducaoMel';
import ProducaoChia from './ProducaoChia';
import BarraMelChia from './BarraMelChia';
import EstoqueInsumos from './EstoqueInsumos';
import PedidosLogistica from './PedidosLogistica';
import FeedbackClientes from './FeedbackClientes';
import SegurancaLogs from './SegurancaLogs';
import Relatorios from './Relatorios';

import {
  LayoutDashboard,
  Users,
  Ticket,
  Flower2,
  Sprout,
  PackageCheck,
  Boxes,
  Truck,
  Star,
  ShieldCheck,
  BarChart3,
  Menu,
  X,
  Bell,
  TrendingUp,
} from 'lucide-react';

import './App.css';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: Users, label: 'Clientes & CRM' },
  { icon: Ticket, label: 'Atendimento' },
  { icon: Flower2, label: 'Produção de Mel' },
  { icon: Sprout, label: 'Produção de Chia' },
  { icon: PackageCheck, label: 'Barra Mel + Chia' },
  { icon: Boxes, label: 'Estoque Insumos' },
  { icon: Truck, label: 'Pedidos & Logística' },
  { icon: Star, label: 'Feedback Clientes' },
  { icon: ShieldCheck, label: 'Segurança & Logs' },
  { icon: BarChart3, label: 'Relatórios' },
];

const metrics = [
  {
    title: 'Produção de Mel',
    value: '1.250',
    unit: 'L',
    change: '+12% no mês',
    icon: Flower2,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    title: 'Chia Colhida',
    value: '780',
    unit: 'kg',
    change: '+8% no mês',
    icon: Sprout,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    title: 'Barras Produzidas',
    value: '3.450',
    unit: 'unid.',
    change: '+18% no mês',
    icon: PackageCheck,
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-700',
  },
  {
    title: 'Pedidos em Andamento',
    value: '28',
    unit: 'pedidos',
    change: 'Em processamento',
    icon: Truck,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-semibold text-amber-700">
          Safra 2026 / Ativo
        </p>

        <h2 className="mt-1 text-2xl font-bold text-gray-900">
          Dashboard CAMC
        </h2>

        <p className="mt-1 text-gray-500">
          Acompanhe produção, estoque e pedidos em tempo real.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.title}
              className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{metric.title}</p>

                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {metric.value}
                    </span>

                    <span className="mb-1 text-sm text-gray-500">
                      {metric.unit}
                    </span>
                  </div>

                  <p className="mt-2 flex items-center gap-1 text-sm font-medium text-emerald-600">
                    <TrendingUp size={16} />
                    {metric.change}
                  </p>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${metric.iconBg}`}
                >
                  <Icon size={24} className={metric.iconColor} />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900">Produção da Safra</h3>

          <p className="mt-1 text-sm text-gray-500">
            Acompanhamento dos principais produtos CAMC.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium">Mel</span>
                <span>78%</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-amber-100">
                <div className="h-full w-[78%] rounded-full bg-amber-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium">Chia</span>
                <span>62%</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-emerald-100">
                <div className="h-full w-[62%] rounded-full bg-emerald-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium">Barra Mel + Chia</span>
                <span>86%</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-yellow-100">
                <div className="h-full w-[86%] rounded-full bg-yellow-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900">
            Resumo Operacional
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Situação atual das operações.
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-amber-50 p-4">
              <span className="font-medium">Estoque de Mel</span>
              <span className="font-bold text-amber-700">1.850 L</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-emerald-50 p-4">
              <span className="font-medium">Estoque de Chia</span>
              <span className="font-bold text-emerald-700">420 kg</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-blue-50 p-4">
              <span className="font-medium">Pedidos pendentes</span>
              <span className="font-bold text-blue-700">28</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-purple-50 p-4">
              <span className="font-medium">Clientes ativos</span>
              <span className="font-bold text-purple-700">146</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Placeholder({ title }) {
  return (
    <div className="rounded-2xl border border-amber-100 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

      <p className="mt-2 text-gray-500">Módulo CAMC em desenvolvimento.</p>
    </div>
  );
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('Dashboard');

  function renderPage() {
    if (currentPage === 'Dashboard') {
      return <Dashboard />;
    }

    if (currentPage === 'Clientes & CRM') {
      return <Clientes />;
    }

    if (currentPage === 'Atendimento') {
      return <Atendimento />;
    }

    if (currentPage === 'Produção de Mel') {
      return <ProducaoMel />;
    }

    if (currentPage === 'Produção de Chia') {
      return <ProducaoChia />;
    }

    if (currentPage === 'Barra Mel + Chia') {
      return <BarraMelChia />;
    }

    if (currentPage === 'Estoque Insumos') {
      return <EstoqueInsumos />;
    }

    if (currentPage === 'Pedidos & Logística') {
      return <PedidosLogistica />;
    }

    if (currentPage === 'Feedback Clientes') {
      return <FeedbackClientes />;
    }

    if (currentPage === 'Segurança & Logs') {
      return <SegurancaLogs />;
    }

    if (currentPage === 'Relatórios') {
      return <Relatorios />;
    }

    return <Placeholder title={currentPage} />;
  }

  return (
    <div className="min-h-screen bg-amber-50/30 text-gray-800">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-amber-950 text-amber-50 shadow-xl transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex h-20 items-center justify-between border-b border-amber-800 px-5">
          <div>
            <h1 className="text-xl font-bold">CAMC</h1>
            <p className="text-xs text-amber-300">Gestão Integrada</p>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 hover:bg-amber-900 md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = currentPage === item.label;

              return (
                <button
                  type="button"
                  key={item.label}
                  onClick={() => {
                    setCurrentPage(item.label);
                    setSidebarOpen(false);
                  }}
                  aria-current={active ? 'page' : undefined}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                    active
                      ? 'bg-amber-700 text-white shadow'
                      : 'text-amber-100 hover:bg-amber-900'
                  }`}
                >
                  <Icon size={19} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-amber-800 p-4">
          <div className="rounded-xl bg-amber-900 p-3">
            <p className="text-xs text-amber-300">Sistema</p>
            <p className="mt-1 text-sm font-semibold">CAMC Ativo</p>
          </div>
        </div>
      </aside>

      <div className="md:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-amber-100 bg-white/95 px-4 shadow-sm backdrop-blur md:px-6">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          >
            <Menu size={24} />
          </button>

          <div className="hidden md:block">
            <p className="text-sm font-semibold text-gray-800">Sistema CAMC</p>
            <p className="text-xs text-gray-500">Gestão da Cadeia Alimentar</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            >
              <Bell size={21} />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-amber-700 font-bold text-white sm:flex">
              C
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-4rem)] p-4 sm:p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
