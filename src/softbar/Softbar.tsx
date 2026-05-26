import { useState } from "react";
import SoftbarModal from "./SoftbarModal";
import FAIcon from "./FAIcon";
import { PRODUCTS } from "./softbar.config";
import type { ModalProduct } from "./types";
import "./Softbar.css";
import logoSoftplan from "./logo softplan.svg";

interface SoftbarProps {
  activeProductId?: string;
  clientProducts?: string[];
  notifications?: Record<string, number>;
  onProductChange?: (id: string) => void;
  onLogoClick?: () => void;
}

const SOON_TOOLS: ModalProduct[] = [
  { id: "map", label: "Map", description: "Visualização geoespacial", soon: true, Icon: IconMap },
  { id: "analytics", label: "Analytics", description: "Inteligência de dados", soon: true, Icon: IconAnalytics },
  { id: "mensageria", label: "Mensageria", description: "Automação de mensagens", soon: true, Icon: IconMensageria },
];

export default function Softbar({
  activeProductId = "processos-digitais",
  clientProducts = [],
  notifications = {},
  onProductChange,
  onLogoClick,
}: SoftbarProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [modalProduct, setModalProduct] = useState<ModalProduct | null>(null);

  const handleItemClick = (product: { id: string; url?: string; soon?: boolean }) => {
    const isContracted = clientProducts.includes(product.id);
    if (isContracted && onProductChange) {
      onProductChange(product.id);
    } else if (isContracted && product.url) {
      window.location.href = product.url;
    } else {
      setModalProduct(product as ModalProduct);
    }
  };

  return (
    <>
      <nav className="softbar" aria-label="Navegação de produtos Softplan">
        <div className="softbar__logo" onClick={onLogoClick} title="Nexus — Visão geral">
          <img src={logoSoftplan} alt="Softplan" style={{ width: 28, height: 28 }} />
        </div>

        <div className="softbar__divider" />

        <ul className="softbar__list">
          {PRODUCTS.map((product) => {
            const isActive = product.id === activeProductId;
            const isContracted = clientProducts.includes(product.id);
            const isHovered = hoveredId === product.id;
            const notificationCount = notifications[product.id] ?? null;

            return (
              <li key={product.id} className="softbar__item-wrapper">
                <button
                  className={[
                    "softbar__item",
                    isActive ? "softbar__item--active" : "",
                    !isContracted ? "softbar__item--disabled" : "",
                  ].filter(Boolean).join(" ")}
                  onClick={() => handleItemClick(product)}
                  onMouseEnter={() => setHoveredId(product.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  aria-label={product.label}
                  aria-current={isActive ? "page" : undefined}
                >
                  <product.Icon />
                  {notificationCount !== null && (
                    <span className="softbar__notification-badge" aria-label={`${notificationCount} notificações`}>
                      {notificationCount}
                    </span>
                  )}
                  {!isContracted && !isActive && (
                    <span className="softbar__lock-dot" aria-hidden="true" />
                  )}
                </button>

                {isHovered && (
                  <div className="softbar__tooltip" role="tooltip">
                    <span className={`softbar__tooltip-tag ${isContracted ? "softbar__tooltip-tag--active" : "softbar__tooltip-tag--disabled"}`}>
                      {isActive ? "Você está aqui" : isContracted ? "Contratado" : "Não contratado"}
                    </span>
                    <span className="softbar__tooltip-name">{product.label}</span>
                    <span className="softbar__tooltip-desc">{product.description}</span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="softbar__divider" />

        <ul className="softbar__list">
          {SOON_TOOLS.map((tool) => (
            <li key={tool.id} className="softbar__item-wrapper">
              <button
                className="softbar__item softbar__item--disabled softbar__item--soon"
                onMouseEnter={() => setHoveredId(tool.id)}
                onMouseLeave={() => setHoveredId(null)}
                aria-label={tool.label}
                onClick={() => setModalProduct(tool)}
              >
                {tool.Icon && <tool.Icon />}
              </button>
              {hoveredId === tool.id && (
                <div className="softbar__tooltip" role="tooltip">
                  <span className="softbar__tooltip-tag softbar__tooltip-tag--soon">Em breve</span>
                  <span className="softbar__tooltip-name">{tool.label}</span>
                  <span className="softbar__tooltip-desc">{tool.description}</span>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="softbar__bottom">
          <div className="softbar__divider" />
          <ul className="softbar__list" style={{ marginBottom: "12px" }}>
            <li className="softbar__item-wrapper">
              <button
                className="softbar__item softbar__item--disabled"
                onMouseEnter={() => setHoveredId("profile")}
                onMouseLeave={() => setHoveredId(null)}
                aria-label="Meu perfil"
              >
                <FAIcon icon="fa-duotone fa-user" />
              </button>
              {hoveredId === "profile" && (
                <div className="softbar__tooltip" role="tooltip">
                  <span className="softbar__tooltip-name">Meu perfil</span>
                  <span className="softbar__tooltip-desc">Configurações da conta</span>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {modalProduct && (
        <SoftbarModal
          product={modalProduct}
          onClose={() => setModalProduct(null)}
        />
      )}
    </>
  );
}

function IconMap() {
  return <FAIcon icon="fa-duotone fa-map" />;
}

function IconAnalytics() {
  return <FAIcon icon="fa-duotone fa-chart-line" />;
}

function IconMensageria() {
  return <FAIcon icon="fa-duotone fa-message-check" />;
}
