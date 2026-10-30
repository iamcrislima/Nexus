import { Modal, Tag } from "@1doc/1ds-react";
import type { ModalProduct } from "./types";
import "./SoftbarModal.css";

interface SoftbarModalProps {
  /** Produto mostrado. `null` fecha o modal. */
  product: ModalProduct | null;
  /** Ação principal. Sem ela, o modal só oferece "Fechar". */
  onConfirm?: () => void;
  onClose: () => void;
}

// Modal do 1DS: foco preso no diálogo, Esc e clique fora fecham, e o foco volta
// para o item da Softbar que abriu. Fica sempre montado: o 1DS só devolve o foco
// quando `open` passa a false, não quando o modal é desmontado. Sem `portal`: no
// 1DS 2.26.0, com ele o foco não volta ao fechar (pedido aberto para o DS).
export default function SoftbarModal({ product, onConfirm, onClose }: SoftbarModalProps) {
  const isSoon = product?.soon;

  return (
    <Modal
      open={!!product}
      size="md"
      layout="content"
      className="sbmodal-dialog"
      title={isSoon ? product?.label : product?.tagline}
      description={
        isSoon
          ? `${product?.label} está sendo preparado e em breve estará disponível para contratação.`
          : product?.longDesc
      }
      confirmLabel={onConfirm ? (isSoon ? "Me notifique quando lançar" : "Solicitar avaliação") : undefined}
      cancelLabel="Fechar"
      closeLabel="Fechar"
      onConfirm={onConfirm}
      onCancel={onClose}
      onClose={onClose}
    >
      {product && (
        <div className="sbmodal">
          <Tag
            pill
            size="sm"
            className={`sbmodal__badge${isSoon ? " sbmodal__badge--soon" : ""}`}
            label={isSoon ? "Em breve" : product.badge}
          />

          {!isSoon && product.chips && (
            <ul className="sbmodal__chips" aria-label="Recursos principais">
              {product.chips.map((chip) => (
                <li key={chip}>
                  <Tag size="sm" className="sbmodal__chip" label={chip} />
                </li>
              ))}
            </ul>
          )}

          {!isSoon && product.features && (
            <ul className="sbmodal__features">
              {product.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          )}

          {!isSoon && (
            <p className="sbmodal__integrate">
              Integra com: <strong>Processos Digitais · 1Doc</strong>
            </p>
          )}
        </div>
      )}
    </Modal>
  );
}
