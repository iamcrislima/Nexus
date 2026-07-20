import { useState } from "react";
import "./LoginSoftplan.css";

// Tela de login — porta de entrada MOCKADA do app de demonstração.
// Reproduz fielmente softplan-login.html (dark navy + índigo).
// onEntrar() é chamado sem validar nada — qualquer credencial autentica.

interface LoginSoftplanProps {
  onEntrar: () => void;
}

export default function LoginSoftplan({ onEntrar }: LoginSoftplanProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEntrar();
  };

  return (
    <div className="nx-shell">
      {/* ======= ESQUERDA : constelação de produtos ======= */}
      <section className="nx-stage">
        <div className="nx-brand">
          <div className="mark">
            <svg viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0.868724 20.06H15.165C19.1556 20.06 21.8411 17.5054 21.8411 13.6775C21.8411 9.84951 19.1556 7.51308 15.165 7.51308H7.14813C6.13264 7.51308 5.58919 7.03707 5.58919 6.16437C5.58919 5.29168 6.13264 4.81567 7.14813 4.81567H20.8256V0H6.67609C2.68551 0 0 2.55461 0 6.38255C0 10.2105 2.68551 12.4755 6.67609 12.4755H14.6969C15.7124 12.4755 16.2559 12.9872 16.2559 13.8639C16.2559 14.7405 15.7124 15.2523 14.6969 15.2523H0.868724V20.0679V20.06Z" fill="white" />
              <path d="M1.58671 22.0679H5.39482V25.876C5.39482 26.7526 4.68476 27.4627 3.80811 27.4627H0V23.6546C0 22.7779 0.710054 22.0679 1.58671 22.0679Z" fill="white" />
            </svg>
          </div>
          <div>
            <div className="word">Softplan</div>
          </div>
        </div>

        <div className="nx-constellation">
          <svg viewBox="0 0 560 440" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="nxLinkGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#4f6ef7" stopOpacity="0.15" />
              </linearGradient>
              <radialGradient id="nxCore" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#4f56e0" />
              </radialGradient>
              <filter id="nxGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* centro */}
            <g transform="translate(280,220)">
              {/* linhas até cada produto */}
              <path className="nx-link" d="M0,0 L-190,-140" />
              <path className="nx-link" d="M0,0 L200,-96" />
              <path className="nx-link" d="M0,0 L-210,44" />
              <path className="nx-link" d="M0,0 L150,150" />
              <path className="nx-link" d="M0,0 L-80,168" />

              <circle className="nx-core-pulse" r="46" fill="none" stroke="#6366f1" strokeWidth="1.2" />
              <circle r="34" fill="url(#nxCore)" filter="url(#nxGlow)" />
              <text className="nx-core-label" x="0" y="5" textAnchor="middle" fontSize="11">Softplan</text>
            </g>

            {/* nós de produto — <g> externo posiciona, <g> interno anima
               (em SVG o transform do CSS sobrescreve o transform de atributo,
                então posição e float ficam em grupos separados) */}
            <g transform="translate(90,80)">
              <g className="nx-node f1">
                <circle r="7" fill="#16163a" stroke="#6366f1" strokeWidth="1.6" />
                <circle r="2.6" fill="#a5b4fc" />
                <text className="nx-node-label" x="0" y="-14" textAnchor="middle">Processos Digitais</text>
              </g>
            </g>
            <g transform="translate(480,124)">
              <g className="nx-node f2">
                <circle r="7" fill="#16163a" stroke="#6366f1" strokeWidth="1.6" />
                <circle r="2.6" fill="#a5b4fc" />
                <text className="nx-node-label" x="0" y="-14" textAnchor="middle">Procuradorias</text>
              </g>
            </g>
            <g transform="translate(70,264)">
              <g className="nx-node f3">
                <circle r="7" fill="#16163a" stroke="#6366f1" strokeWidth="1.6" />
                <circle r="2.6" fill="#a5b4fc" />
                <text className="nx-node-label" x="0" y="-14" textAnchor="middle">Obras Públicas</text>
              </g>
            </g>
            <g transform="translate(430,370)">
              <g className="nx-node f1">
                <circle r="7" fill="#16163a" stroke="#6366f1" strokeWidth="1.6" />
                <circle r="2.6" fill="#a5b4fc" />
                <text className="nx-node-label" x="0" y="-14" textAnchor="middle">Licenciamento Ambiental</text>
              </g>
            </g>
            <g transform="translate(200,388)">
              <g className="nx-node f2">
                <circle r="7" fill="#16163a" stroke="#6366f1" strokeWidth="1.6" />
                <circle r="2.6" fill="#a5b4fc" />
                <text className="nx-node-label" x="0" y="-14" textAnchor="middle">Gestão de Projetos</text>
              </g>
            </g>
          </svg>
        </div>

        <div className="nx-tagline">
          <h1>Um único acesso para <em>todo o ecossistema</em> Softplan.</h1>
          <p>Entre uma vez e transite entre seus produtos contratados sem novo login. Um só ponto de acesso para a Softplan.</p>
        </div>
      </section>

      {/* ======= DIREITA : formulário ======= */}
      <section className="nx-panel">
        <div className="nx-card">
          <h2 className="nx-welcome">Boas-vindas à Prefeitura de Tubarão</h2>
          <p className="nx-sub">Acesse sua conta para entrar no ecossistema Softplan.</p>

          <form className="nx-form" onSubmit={handleSubmit}>
            <div className="nx-field">
              <label htmlFor="nx-email">E-mail</label>
              <div className="nx-input-wrap">
                <input className="nx-input" id="nx-email" type="email" autoComplete="username" placeholder="voce@dominio.com.br" />
              </div>
            </div>

            <div className="nx-field">
              <label htmlFor="nx-pw">Senha</label>
              <div className="nx-input-wrap">
                <input
                  className="nx-input pw"
                  id="nx-pw"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                />
                <button
                  className="nx-eye"
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.9 4.24A9.1 9.1 0 0 1 12 4c6.5 0 10 7 10 7a13.2 13.2 0 0 1-1.67 2.53" />
                      <path d="M6.06 6.06C3.4 7.7 2 10 2 11s3.5 7 10 7a9.7 9.7 0 0 0 3.94-.81" />
                      <path d="M1 1l22 22" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="nx-row-forgot">
              <a className="nx-link-a" href="#" onClick={(e) => e.preventDefault()}>Esqueci minha senha</a>
            </div>

            <button className="nx-btn" type="submit">Entrar</button>

            <div className="nx-divider">ou continue com</div>

            <div className="nx-sso">
              <button className="nx-sso-btn" type="button" onClick={onEntrar}>
                <span className="gov"><b>gov</b><span className="br">.br</span></span>
              </button>
              <button className="nx-sso-btn" type="button" onClick={onEntrar}>
                <span className="nx-adgrid"><span /><span /><span /><span /></span>
                Active Directory
              </button>
            </div>
          </form>

          <div className="nx-foot">
            <a href="#" onClick={(e) => e.preventDefault()}>Central de Atendimento</a>
            <span className="tiny-brand">
              <svg viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.868724 20.06H15.165C19.1556 20.06 21.8411 17.5054 21.8411 13.6775C21.8411 9.84951 19.1556 7.51308 15.165 7.51308H7.14813C6.13264 7.51308 5.58919 7.03707 5.58919 6.16437C5.58919 5.29168 6.13264 4.81567 7.14813 4.81567H20.8256V0H6.67609C2.68551 0 0 2.55461 0 6.38255C0 10.2105 2.68551 12.4755 6.67609 12.4755H14.6969C15.7124 12.4755 16.2559 12.9872 16.2559 13.8639C16.2559 14.7405 15.7124 15.2523 14.6969 15.2523H0.868724V20.0679V20.06Z" fill="white" />
                <path d="M1.58671 22.0679H5.39482V25.876C5.39482 26.7526 4.68476 27.4627 3.80811 27.4627H0V23.6546C0 22.7779 0.710054 22.0679 1.58671 22.0679Z" fill="white" />
              </svg>
              Softplan
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
