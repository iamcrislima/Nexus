import { useState } from "react";
import "./ObrasGov.css";

const SIDEBAR_ITEMS = [
  { label: "Contratos", icon: "fa-solid fa-file-contract" },
  { label: "Obras e Serviços", icon: "fa-solid fa-building" },
  { label: "Cronogramas", icon: "fa-solid fa-calendar-days" },
  { label: "Diário de Obras", icon: "fa-solid fa-book" },
  { label: "Convênios", icon: "fa-solid fa-handshake" },
  { label: "Empreendimentos", icon: "fa-solid fa-city" },
  { label: "Medições", icon: "fa-solid fa-ruler-combined" },
  { label: "Financeiro", icon: "fa-solid fa-wallet" },
  { label: "Consultas", icon: "fa-solid fa-magnifying-glass-chart" },
  { label: "Indicadores", icon: "fa-solid fa-chart-pie" },
  { label: "Relatórios", icon: "fa-solid fa-file-invoice" },
  { label: "Tabelas", icon: "fa-solid fa-table" },
];

const MINI_ICONS = [
  { label: "FAV", icon: "fa-solid fa-star", color: "#f39c12" },
  { label: "BUSCA", icon: "fa-solid fa-magnifying-glass", color: "#fff" },
  { label: "SCO", icon: "fa-solid fa-cube", color: "#4dd0e1" },
  { label: "SMO", icon: "fa-solid fa-flag", color: "#fff" },
  { label: "SEG", icon: "fa-solid fa-link", color: "#fff" },
];

const CARDS = [
  {
    title: "Situação prazo de execução dos contratos",
    metrics: [
      { value: 17, label: "No prazo", color: "green" },
      { value: 11, label: "A vencer", color: "orange" },
      { value: 35, label: "Vencidos", color: "red" },
    ],
  },
  {
    title: "Previsto x Realizado",
    metrics: [
      { value: 5, label: "Adiantados", color: "green" },
      { value: 4, label: "No prazo", color: "orange" },
      { value: 35, label: "Atrasados", color: "red" },
    ],
  },
  {
    title: "Situação prazo de vigência dos contratos",
    metrics: [
      { value: 38, label: "No prazo", color: "green" },
      { value: 8, label: "A vencer", color: "orange" },
      { value: 54, label: "Vencidos", color: "red" },
    ],
  },
  {
    title: "Status das Medições",
    metrics: [
      { value: 3, label: "Em Andamento", color: "blue" },
      { value: 2, label: "Finalizadas", color: "green" },
      { value: 0, label: "Reprovadas", color: "gray" },
    ],
  },
];

export default function ObrasGov() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="obras">
      {/* ── Mini sidebar (always visible) ──────────── */}
      <aside className="obras__mini-sidebar">
        {MINI_ICONS.map((item, i) => (
          <div key={i} className="obras__mini-item">
            <i className={item.icon} style={{ color: item.color }} />
            <span>{item.label}</span>
          </div>
        ))}
      </aside>

      {/* ── Full sidebar (collapsible) ─────────────── */}
      <aside className={`obras__sidebar ${sidebarOpen ? "" : "obras__sidebar--collapsed"}`}>
        <nav className="obras__sidebar-nav">
          {SIDEBAR_ITEMS.map((item) => (
            <div key={item.label} className="obras__sidebar-item">
              {item.label}
              <i className="fa-solid fa-chevron-right" />
            </div>
          ))}
        </nav>
      </aside>

      {/* ── Main Content ───────────────────────────── */}
      <div className="obras__main">
        {/* Teal header bar */}
        <div className="obras__header">
          <div className="obras__header-left">
            <button
              className="obras__header-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <i className={`fa-solid ${sidebarOpen ? "fa-bars" : "fa-bars"}`} />
            </button>
            <div className="obras__header-logo">
              <i className="fa-solid fa-helmet-safety" />
              <span>obras<b>.gov</b></span>
            </div>
          </div>
          <div className="obras__header-right">
            <div className="obras__header-nav-item">
              <i className="fa-solid fa-house" />
              <span>Página Inicial</span>
            </div>
            <div className="obras__header-nav-item">
              <i className="fa-solid fa-map-location-dot" />
              <span>Mapa de Obras</span>
            </div>
            <div className="obras__header-nav-item">
              <i className="fa-solid fa-circle-question" />
              <span>Central de Ajuda</span>
            </div>
            <div className="obras__header-nav-item">
              <i className="fa-solid fa-user" />
              <span>Perfil</span>
            </div>
          </div>
        </div>

        {/* Welcome bar (white) */}
        <div className="obras__welcome-bar">
          <h1>Bem-vindo, Cris</h1>
          <div className="obras__welcome-actions">
            <button className="obras__btn">
              <i className="fa-regular fa-circle-plus" /> Novo Chart
            </button>
            <button className="obras__btn obras__btn--primary">
              <i className="fa-solid fa-chart-bar" /> Charts
            </button>
            <button className="obras__btn obras__btn--icon">
              <i className="fa-regular fa-pen-to-square" />
            </button>
            <button className="obras__btn obras__btn--icon">
              <i className="fa-regular fa-circle-info" />
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="obras__content">
          <div className="obras__cards">
            {CARDS.map((card, ci) => (
              <div key={ci} className="obras__card">
                <div className="obras__card-title">{card.title}</div>
                <div className="obras__card-values">
                  {card.metrics.map((m, mi) => (
                    <div key={mi} className="obras__card-metric">
                      <span className={`obras__card-number obras__card-number--${m.color}`}>
                        {m.value}
                      </span>
                      <span className="obras__card-label">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
