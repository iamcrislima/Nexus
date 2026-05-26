import { useState } from "react";
import FAIcon from "../softbar/FAIcon";
import "./ObrasGov.css";

interface SidebarItem {
  label: string;
  icon: string;
}

interface MiniIcon {
  label: string;
  icon: string;
  color: string;
}

interface Metric {
  value: number;
  label: string;
  color: string;
}

interface Card {
  title: string;
  metrics: Metric[];
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { label: "Contratos",       icon: "fa-solid fa-file-contract" },
  { label: "Obras e Serviços", icon: "fa-solid fa-building" },
  { label: "Cronogramas",     icon: "fa-solid fa-calendar-days" },
  { label: "Diário de Obras", icon: "fa-solid fa-book" },
  { label: "Convênios",       icon: "fa-solid fa-handshake" },
  { label: "Empreendimentos", icon: "fa-solid fa-city" },
  { label: "Medições",        icon: "fa-solid fa-ruler-combined" },
  { label: "Financeiro",      icon: "fa-solid fa-wallet" },
  { label: "Consultas",       icon: "fa-solid fa-magnifying-glass-chart" },
  { label: "Indicadores",     icon: "fa-solid fa-chart-pie" },
  { label: "Relatórios",      icon: "fa-solid fa-file-invoice" },
  { label: "Tabelas",         icon: "fa-solid fa-table" },
];

const MINI_ICONS: MiniIcon[] = [
  { label: "FAV",  icon: "fa-solid fa-star",             color: "#f39c12" },
  { label: "BUSCA", icon: "fa-solid fa-magnifying-glass", color: "#fff" },
  { label: "SCO",  icon: "fa-solid fa-cube",             color: "#4dd0e1" },
  { label: "SMO",  icon: "fa-solid fa-flag",             color: "#fff" },
  { label: "SEG",  icon: "fa-solid fa-link",             color: "#fff" },
];

const HEADER_NAV_ITEMS = [
  { icon: "fa-solid fa-house",            label: "Página Inicial" },
  { icon: "fa-solid fa-map-location-dot", label: "Mapa de Obras" },
  { icon: "fa-solid fa-circle-question",  label: "Central de Ajuda" },
  { icon: "fa-solid fa-user",             label: "Perfil" },
] as const;

const CARDS: Card[] = [
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
      { value: 5,  label: "Adiantados", color: "green" },
      { value: 4,  label: "No prazo",   color: "orange" },
      { value: 35, label: "Atrasados",  color: "red" },
    ],
  },
  {
    title: "Situação prazo de vigência dos contratos",
    metrics: [
      { value: 38, label: "No prazo", color: "green" },
      { value: 8,  label: "A vencer", color: "orange" },
      { value: 54, label: "Vencidos", color: "red" },
    ],
  },
  {
    title: "Status das Medições",
    metrics: [
      { value: 3, label: "Em Andamento", color: "blue" },
      { value: 2, label: "Finalizadas",  color: "green" },
      { value: 0, label: "Reprovadas",   color: "gray" },
    ],
  },
];

export default function ObrasGov() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="obras">
      <aside className="obras__mini-sidebar">
        {MINI_ICONS.map((item) => (
          <div key={item.label} className="obras__mini-item">
            <FAIcon icon={item.icon} style={{ color: item.color }} />
            <span>{item.label}</span>
          </div>
        ))}
      </aside>

      <aside className={`obras__sidebar ${sidebarOpen ? "" : "obras__sidebar--collapsed"}`}>
        <nav className="obras__sidebar-nav">
          {SIDEBAR_ITEMS.map((item) => (
            <div key={item.label} className="obras__sidebar-item">
              {item.label}
              <FAIcon icon="fa-solid fa-chevron-right" />
            </div>
          ))}
        </nav>
      </aside>

      <div className="obras__main">
        <div className="obras__header">
          <div className="obras__header-left">
            <button
              className="obras__header-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FAIcon icon={`fa-solid ${sidebarOpen ? "fa-xmark" : "fa-bars"}`} />
            </button>
            <div className="obras__header-logo">
              <FAIcon icon="fa-solid fa-helmet-safety" />
              <span>obras<b>.gov</b></span>
            </div>
          </div>
          <div className="obras__header-right">
            {HEADER_NAV_ITEMS.map((item) => (
              <div key={item.label} className="obras__header-nav-item">
                <FAIcon icon={item.icon} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="obras__welcome-bar">
          <h1>Bem-vindo, Cris</h1>
          <div className="obras__welcome-actions">
            <button className="obras__btn">
              <FAIcon icon="fa-regular fa-circle-plus" /> Novo Chart
            </button>
            <button className="obras__btn obras__btn--primary">
              <FAIcon icon="fa-solid fa-chart-bar" /> Charts
            </button>
            <button className="obras__btn obras__btn--icon">
              <FAIcon icon="fa-regular fa-pen-to-square" />
            </button>
            <button className="obras__btn obras__btn--icon">
              <FAIcon icon="fa-regular fa-circle-info" />
            </button>
          </div>
        </div>

        <div className="obras__content">
          <div className="obras__cards">
            {CARDS.map((card) => (
              <div key={card.title} className="obras__card">
                <div className="obras__card-title">{card.title}</div>
                <div className="obras__card-values">
                  {card.metrics.map((m) => (
                    <div key={m.label} className="obras__card-metric">
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
