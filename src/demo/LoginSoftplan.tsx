import { useState } from "react";
import "./LoginSoftplan.css";

// Tela de login — porta de entrada MOCKADA do app de demonstração.
// Reproduz fielmente softplan-login-dark-pro_2.html (dark navy + índigo,
// cards flutuantes arredondados, fontes Plus Jakarta Sans + Inter).
// onEntrar() é chamado sem validar nada — qualquer credencial autentica.

interface LoginSoftplanProps {
  onEntrar: () => void;
}

export default function LoginSoftplan({ onEntrar }: LoginSoftplanProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    // breve estado de carregando antes de autenticar (mock)
    setTimeout(onEntrar, 1400);
  };

  return (
    <div className="nx-login">
      {/* ======= HERO — constelação ======= */}
      <section className="hero">
        <div className="constel">
          <svg viewBox="0 0 560 440" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#4f6ef7" stopOpacity="0.15" />
              </linearGradient>
              <radialGradient id="core" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#4f56e0" />
              </radialGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g transform="translate(280,220)">
              <path className="c-link" d="M0,0 L-190,-140" />
              <path className="c-link" d="M0,0 L200,-96" />
              <path className="c-link" d="M0,0 L-210,44" />
              <path className="c-link" d="M0,0 L150,150" />
              <path className="c-link" d="M0,0 L-80,168" />
              <circle className="pulse" r="46" fill="none" stroke="#6366f1" strokeWidth="1.2" />
              <circle r="34" fill="url(#core)" filter="url(#glow)" />
              <text className="c-core" x="0" y="5" textAnchor="middle" fontSize="11">Softplan</text>
            </g>
            <g transform="translate(90,80)">
              <g className="node f1">
                <circle r="7" fill="#16163a" stroke="#6366f1" strokeWidth="1.6" />
                <circle r="2.6" fill="#a5b4fc" />
                <text className="c-lbl" x="0" y="-14" textAnchor="middle">Processos Digitais</text>
              </g>
            </g>
            <g transform="translate(480,124)">
              <g className="node f2">
                <circle r="7" fill="#16163a" stroke="#6366f1" strokeWidth="1.6" />
                <circle r="2.6" fill="#a5b4fc" />
                <text className="c-lbl" x="0" y="-14" textAnchor="middle">Procuradorias</text>
              </g>
            </g>
            <g transform="translate(70,264)">
              <g className="node f3">
                <circle r="7" fill="#16163a" stroke="#6366f1" strokeWidth="1.6" />
                <circle r="2.6" fill="#a5b4fc" />
                <text className="c-lbl" x="0" y="-14" textAnchor="middle">Obras Públicas</text>
              </g>
            </g>
            <g transform="translate(430,370)">
              <g className="node f1">
                <circle r="7" fill="#16163a" stroke="#6366f1" strokeWidth="1.6" />
                <circle r="2.6" fill="#a5b4fc" />
                <text className="c-lbl" x="0" y="-14" textAnchor="middle">Licenciamento Ambiental</text>
              </g>
            </g>
            <g transform="translate(200,388)">
              <g className="node f2">
                <circle r="7" fill="#16163a" stroke="#6366f1" strokeWidth="1.6" />
                <circle r="2.6" fill="#a5b4fc" />
                <text className="c-lbl" x="0" y="-14" textAnchor="middle">Gestão de Projetos</text>
              </g>
            </g>
          </svg>
        </div>

        <div className="tag">
          <h2>Um único acesso para <em>todo o ecossistema</em> Softplan.</h2>
          <p>Entre uma vez e transite entre seus produtos contratados, sem novo login.</p>
        </div>
      </section>

      {/* ======= PAINEL — form ======= */}
      <section className="panel">
        <div className="form">
          <h1 className="title">Boas-vindas à Prefeitura de Tubarão</h1>
          <p className="sub">Acesse sua conta para entrar no ecossistema Softplan.</p>

          <form className="fields" onSubmit={handleSubmit}>
            <div className="fg">
              <label htmlFor="email">E-mail</label>
              <div className="wrap">
                <input className="inp" id="email" type="email" autoComplete="username" placeholder="voce@dominio.com.br" />
                <span className="lead">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="fg">
              <label htmlFor="pw">Senha</label>
              <div className="wrap">
                <input
                  className="inp pw"
                  id="pw"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                />
                <span className="lead">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="11" width="16" height="9" rx="2" />
                    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                  </svg>
                </span>
                <button
                  className="eye"
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

            <div className="forgot"><a href="#" onClick={(e) => e.preventDefault()}>Esqueci a senha</a></div>

            <button className="btn" type="submit" disabled={loading}>
              {loading && <span className="spin" />}
              <span>{loading ? "Entrando" : "Entrar"}</span>
            </button>

            <div className="div">ou continue com</div>

            <div className="sso">
              <button className="sso-btn" type="button" onClick={onEntrar}>
                <span className="gov"><b>gov</b><span className="br">.br</span></span>
              </button>
              <button className="sso-btn" type="button" onClick={onEntrar}>
                <span className="adg"><span /><span /><span /><span /></span>
                Active Directory
              </button>
            </div>
          </form>

          <div className="foot">
            <a href="#" onClick={(e) => e.preventDefault()}>Central de Atendimento</a>
            <span className="fb">
              <svg viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.868724 20.06H15.165C19.1556 20.06 21.8411 17.5054 21.8411 13.6775C21.8411 9.84951 19.1556 7.51308 15.165 7.51308H7.14813C6.13264 7.51308 5.58919 7.03707 5.58919 6.16437C5.58919 5.29168 6.13264 4.81567 7.14813 4.81567H20.8256V0H6.67609C2.68551 0 0 2.55461 0 6.38255C0 10.2105 2.68551 12.4755 6.67609 12.4755H14.6969C15.7124 12.4755 16.2559 12.9872 16.2559 13.8639C16.2559 14.7405 15.7124 15.2523 14.6969 15.2523H0.868724V20.0679V20.06Z" fill="rgba(255,255,255,0.30)" />
                <path d="M1.58671 22.0679H5.39482V25.876C5.39482 26.7526 4.68476 27.4627 3.80811 27.4627H0V23.6546C0 22.7779 0.710054 22.0679 1.58671 22.0679Z" fill="rgba(255,255,255,0.30)" />
              </svg>
              Softplan
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
