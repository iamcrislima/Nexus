import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import "./OnboardingTour.css";

// Tour guiado (spotlight + balão) exibido após o onConcluir do cadastro.
// Lê a posição dos alvos na Softbar real (ids sb-visao-geral / sb-produtos /
// sb-meu-perfil) via getBoundingClientRect e recalcula no resize.

interface OnboardingTourProps {
  onFim: () => void;
}

interface StepDef {
  targetId: string | null; // null = passo central, sem holofote
  titulo: string;
  texto: string;
}

const STEPS: StepDef[] = [
  {
    targetId: null,
    titulo: "Bem-vindo ao ecossistema Softplan",
    texto: "Sua conta agora é única. Deixa a gente te mostrar rapidinho como navegar entre seus produtos — leva menos de 1 minuto.",
  },
  {
    targetId: "sb-visao-geral",
    titulo: "Visão geral",
    texto: "Aqui no topo você abre o painel unificado da Softplan: uma visão cruzada de todos os seus produtos em um só lugar.",
  },
  {
    targetId: "sb-produtos",
    titulo: "Seus produtos",
    texto: "Estes são os produtos aos quais sua conta tem acesso. Clique em qualquer um para alternar — sem precisar entrar de novo.",
  },
  {
    targetId: "sb-meu-perfil",
    titulo: "Minha conta",
    texto: "No rodapé fica o seu perfil: gerencie seus dados, sua segurança e veja todos os produtos vinculados à sua conta.",
  },
  {
    targetId: null,
    titulo: "Tudo pronto!",
    texto: "Você já pode explorar o ecossistema. Sempre que precisar, seu perfil está ali no rodapé da barra lateral. Bom trabalho!",
  },
];

const PAD = 8; // folga do holofote ao redor do alvo
const GAP = 24; // distância do balão ao holofote

export default function OnboardingTour({ onFim }: OnboardingTourProps) {
  const [i, setI] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const balloonRef = useRef<HTMLDivElement>(null);

  const step = STEPS[i];
  const isFirst = i === 0;
  const isLast = i === STEPS.length - 1;

  const measure = useCallback(() => {
    const def = STEPS[i];
    if (!def.targetId) {
      setRect(null);
      setPos(null);
      return;
    }
    const el = document.getElementById(def.targetId);
    if (!el) {
      setRect(null);
      setPos(null);
      return;
    }
    const r = el.getBoundingClientRect();
    setRect(r);

    const bh = balloonRef.current?.offsetHeight ?? 220;
    const bw = balloonRef.current?.offsetWidth ?? 320;
    // alvo fica na Softbar (esquerda) → balão à direita; fallback à esquerda
    let left = r.right + GAP;
    if (left + bw > window.innerWidth - 16) left = r.left - GAP - bw;
    left = Math.max(16, left);
    let top = r.top + r.height / 2 - bh / 2;
    top = Math.max(16, Math.min(top, window.innerHeight - bh - 16));
    setPos({ left, top });
  }, [i]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measure]);

  const next = () => (isLast ? onFim() : setI((v) => v + 1));
  const prev = () => !isFirst && setI((v) => v - 1);

  const centered = !rect;

  return (
    <div className="nx-tour" role="dialog" aria-modal="true" aria-label="Tour de introdução">
      {centered ? (
        <div className="veil" />
      ) : (
        <div
          className="spot"
          style={{
            left: rect.left - PAD,
            top: rect.top - PAD,
            width: rect.width + PAD * 2,
            height: rect.height + PAD * 2,
          }}
        />
      )}

      <div
        ref={balloonRef}
        className={`balloon${centered ? " center enter" : ""}`}
        style={centered ? undefined : { left: pos?.left ?? 16, top: pos?.top ?? 16 }}
      >
        <span className="b-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 2 2.4 5.4L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-.6L12 2Z" />
          </svg>
          Conhecendo a Softplan
        </span>

        <h3>{step.titulo}</h3>
        <p className="b-text">{step.texto}</p>

        <div className="b-foot">
          <div className="dots">
            {STEPS.map((_, idx) => (
              <i key={idx} className={idx === i ? "on" : ""} />
            ))}
          </div>
          <div className="b-btns">
            {!isLast && (
              <button className="skip" type="button" onClick={onFim}>Pular</button>
            )}
            {!isFirst && (
              <button className="btn ghost" type="button" onClick={prev}>Anterior</button>
            )}
            <button className="btn primary" type="button" onClick={next}>
              {isFirst ? "Começar" : isLast ? "Concluir" : "Próximo"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
