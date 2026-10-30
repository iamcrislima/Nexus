import { useState } from "react";
import { Badge, Button, Divider, Tag, Tooltip, toast } from "@1doc/1ds-react";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faChartLine, faCommentDots, faMap, faUser } from "@fortawesome/free-solid-svg-icons";
import SoftbarModal from "./SoftbarModal";
import { PRODUCTS } from "./softbar.config";
import type { ModalProduct } from "./types";
import "./nexus-palette.css";
import "./Softbar.css";
import logoSoftplan from "./logo softplan.svg";

interface SoftbarProps {
  activeProductId?: string;
  clientProducts?: string[];
  notifications?: Record<string, number>;
  onProductChange?: (id: string) => void;
  onLogoClick?: () => void;
  onProfileClick?: () => void;
  /** Pedido de avaliação de um produto não contratado. Sem ele, o modal só tem "Fechar". */
  onRequestEvaluation?: (productId: string) => void;
  /** Inscrição no aviso de lançamento de um módulo em breve. Sem ele, o modal só tem "Fechar". */
  onNotifyWhenAvailable?: (productId: string) => void;
}

type ItemState = "default" | "active" | "locked" | "soon";

const SOON_TOOLS: ModalProduct[] = [
  { id: "map", label: "Map", description: "Visualização geoespacial", soon: true, icon: faMap },
  { id: "analytics", label: "Analytics", description: "Inteligência de dados", soon: true, icon: faChartLine },
  { id: "mensageria", label: "Mensageria", description: "Automação de mensagens", soon: true, icon: faCommentDots },
];

// O texto da tag e a classe de cor (paleta Nexus) de cada estado.
const STATUS_TAG: Record<ItemState, { label: string; tone: "active" | "disabled" | "soon" }> = {
  active: { label: "Você está aqui", tone: "active" },
  default: { label: "Contratado", tone: "active" },
  locked: { label: "Não contratado", tone: "disabled" },
  soon: { label: "Em breve", tone: "soon" },
};

const MAX_COUNT = 99;

function formatCount(count: number) {
  return count > MAX_COUNT ? `${MAX_COUNT}+` : String(count);
}

export default function Softbar({
  activeProductId = "processos-digitais",
  clientProducts = [],
  notifications = {},
  onProductChange,
  onLogoClick,
  onProfileClick,
  onRequestEvaluation,
  onNotifyWhenAvailable,
}: SoftbarProps) {
  const [modalProduct, setModalProduct] = useState<ModalProduct | null>(null);

  const handleItemClick = (product: ModalProduct, isContracted: boolean) => {
    if (isContracted && onProductChange) {
      onProductChange(product.id);
    } else if (isContracted && product.url) {
      window.location.href = product.url;
    } else {
      setModalProduct(product);
    }
  };

  const modalHandler = modalProduct?.soon ? onNotifyWhenAvailable : onRequestEvaluation;

  const handleModalConfirm = () => {
    if (!modalProduct || !modalHandler) return;
    modalHandler(modalProduct.id);
    toast(
      modalProduct.soon
        ? {
            variant: "positive",
            message: "Pronto, vamos te avisar",
            description: `Você recebe um aviso quando ${modalProduct.label} estiver disponível.`,
          }
        : {
            variant: "positive",
            message: "Pedido de avaliação enviado",
            description: `A equipe Softplan vai entrar em contato para apresentar ${modalProduct.label}.`,
          }
    );
    setModalProduct(null);
  };

  return (
    <>
      <nav className="softbar" aria-label="Navegação de produtos Softplan">
        <Tooltip
          side="right"
          variant="dark"
          asChild
          title="Nexus"
          content={<span className="softbar__tip">Visão geral do ecossistema Softplan</span>}
        >
          <Button
            id="sb-visao-geral"
            className="softbar__logo"
            variant="icon"
            size="md"
            iconTone="inverse"
            ariaLabel="Nexus: visão geral"
            disabled={!onLogoClick}
            onClick={onLogoClick}
          >
            <img src={logoSoftplan} alt="" />
          </Button>
        </Tooltip>

        <Divider className="softbar__divider" spacing="none" />

        <ul id="sb-produtos" className="softbar__list">
          {PRODUCTS.map((product) => {
            const isActive = product.id === activeProductId;
            const isContracted = clientProducts.includes(product.id);
            const state: ItemState = isActive ? "active" : isContracted ? "default" : "locked";

            return (
              <SoftbarItem
                key={product.id}
                label={product.label}
                description={product.description}
                icon={product.icon}
                state={state}
                count={isContracted || isActive ? notifications[product.id] : undefined}
                onClick={() => handleItemClick(product, isContracted)}
              />
            );
          })}
        </ul>

        <Divider className="softbar__divider" spacing="none" />

        <ul className="softbar__list">
          {SOON_TOOLS.map((tool) => (
            <SoftbarItem
              key={tool.id}
              label={tool.label}
              description={tool.description ?? ""}
              icon={tool.icon!}
              state="soon"
              onClick={() => setModalProduct(tool)}
            />
          ))}
        </ul>

        <div className="softbar__bottom">
          <Divider className="softbar__divider" spacing="none" />
          <ul className="softbar__list">
            <SoftbarItem
              id="sb-meu-perfil"
              label="Meu perfil"
              description="Configurações da conta"
              icon={faUser}
              state="default"
              showTag={false}
              disabled={!onProfileClick}
              onClick={onProfileClick}
            />
          </ul>
        </div>
      </nav>

      <SoftbarModal
        product={modalProduct}
        onConfirm={modalHandler ? handleModalConfirm : undefined}
        onClose={() => setModalProduct(null)}
      />
    </>
  );
}

interface SoftbarItemProps {
  id?: string;
  label: string;
  description: string;
  icon: IconDefinition;
  state: ItemState;
  count?: number;
  showTag?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

function SoftbarItem({ id, label, description, icon, state, count, showTag = true, disabled, onClick }: SoftbarItemProps) {
  const countText = count ? formatCount(count) : null;
  const tag = STATUS_TAG[state];

  return (
    <li className="softbar__item-wrapper">
      <Tooltip
        side="right"
        variant="dark"
        asChild
        title={label}
        content={
          <span className="softbar__tip">
            {showTag && (
              <Tag size="xs" appearance="soft" className={`softbar__tag softbar__tag--${tag.tone}`} label={tag.label} />
            )}
            {/* espaço para a descrição lida pelo leitor de tela não colar na tag */}
            {" "}
            <span className="softbar__tip-desc">{description}</span>
          </span>
        }
      >
        <Button
          id={id}
          className={`softbar__item softbar__item--${state}`}
          variant="icon"
          size="md"
          iconTone="inverse"
          startIcon={icon}
          ariaLabel={countText ? `${label}, ${countText} notificações` : label}
          disabled={disabled}
          onClick={onClick}
        />
      </Tooltip>
      {state === "locked" && <span className="softbar__lock-dot" aria-hidden="true" />}
      {countText && (
        <span className="softbar__count" aria-hidden="true">
          <Badge variant="negative" appearance="solid" size="counter">{countText}</Badge>
        </span>
      )}
    </li>
  );
}
