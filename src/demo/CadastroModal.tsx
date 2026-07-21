import { useState } from "react";
import "./CadastroModal.css";

// Modal de ativação de conta (1º acesso) — MOCK, sem backend.
// Reproduz nexus-cadastro-modal_1.html: 2 passos (boas-vindas com o login de
// rede vinculado → formulário), barra de progresso, máscara de CPF, olho da
// senha, checagem de "senhas conferem" e gate do consentimento LGPD.
// onConcluir() apenas fecha o modal.

interface CadastroModalProps {
  onConcluir: () => void;
}

// máscara de CPF: 000.000.000-00 (idêntica ao HTML de referência)
function maskCpf(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

const SoftplanMark = () => (
  <svg viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M0.868724 20.06H15.165C19.1556 20.06 21.8411 17.5054 21.8411 13.6775C21.8411 9.84951 19.1556 7.51308 15.165 7.51308H7.14813C6.13264 7.51308 5.58919 7.03707 5.58919 6.16437C5.58919 5.29168 6.13264 4.81567 7.14813 4.81567H20.8256V0H6.67609C2.68551 0 0 2.55461 0 6.38255C0 10.2105 2.68551 12.4755 6.67609 12.4755H14.6969C15.7124 12.4755 16.2559 12.9872 16.2559 13.8639C16.2559 14.7405 15.7124 15.2523 14.6969 15.2523H0.868724V20.0679V20.06Z" fill="white" />
    <path d="M1.58671 22.0679H5.39482V25.876C5.39482 26.7526 4.68476 27.4627 3.80811 27.4627H0V23.6546C0 22.7779 0.710054 22.0679 1.58671 22.0679Z" fill="white" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default function CadastroModal({ onConcluir }: CadastroModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [showPw1, setShowPw1] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [cpf, setCpf] = useState("");
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [agree, setAgree] = useState(false);
  const [finishing, setFinishing] = useState(false);

  const s2 = step === 2;
  const senhasConferem = pw1.length > 0 && pw1 === pw2;

  const handleFinish = () => {
    if (!agree || finishing) return;
    setFinishing(true);
    // breve estado de "Concluindo…" antes de fechar (mock, sem backend)
    setTimeout(onConcluir, 900);
  };

  return (
    <div className="nx-cadastro">
      <div className="modal" role="dialog" aria-modal="true">
        <div className="head">
          <div className="head-row">
            <div className="bmark">
              <div className="mk"><SoftplanMark /></div>
              <span>Softplan</span>
            </div>
            <span className="stepnum">Passo {s2 ? 2 : 1} de 2</span>
          </div>
          <div className="prog"><i style={{ width: s2 ? "100%" : "50%" }} /></div>
        </div>

        {/* PASSO 1 */}
        {!s2 && (
          <div className="body">
            <h1>Sua conta agora é única</h1>
            <p className="lead">Um só acesso para transitar entre todos os seus produtos Softplan, sem entrar de novo a cada um. Para ativar, confirme alguns dados nas próximas telas.</p>
            <div className="oneoff">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
              Confirmação obrigatória, feita uma única vez — leva menos de 2 minutos.
            </div>
            <div className="linked">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 0-.01M15 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0" /><path d="M9 12h6" /></svg></div>
              <div className="tx"><b>cris.silva</b><small>Seu login de rede permanece vinculado à conta.</small></div>
              <span className="tag">Vinculado</span>
            </div>
          </div>
        )}

        {/* PASSO 2 */}
        {s2 && (
          <div className="body">
            <h1>Complete seu cadastro</h1>
            <p className="lead">A partir de agora você entrará com <b style={{ color: "var(--t70)", fontWeight: 600 }}>e-mail ou CPF</b>.</p>

            <div className="grid" style={{ marginTop: 22 }}>
              <div className="fg full">
                <label htmlFor="nome">Nome completo</label>
                <input className="inp" id="nome" placeholder="Como consta em seus documentos" />
              </div>
              <div className="fg">
                <label htmlFor="email">E-mail</label>
                <input className="inp" id="email" type="email" placeholder="voce@dominio.gov.br" />
              </div>
              <div className="fg">
                <label htmlFor="cpf">CPF</label>
                <input
                  className="inp"
                  id="cpf"
                  inputMode="numeric"
                  placeholder="000.000.000-00"
                  maxLength={14}
                  value={cpf}
                  onChange={(e) => setCpf(maskCpf(e.target.value))}
                />
              </div>
              <div className="fg full">
                <label htmlFor="func">Função</label>
                <input className="inp" id="func" placeholder="Ex.: Analista administrativo" />
              </div>
              <div className="fg">
                <label htmlFor="pw1">Senha</label>
                <div className="pwwrap">
                  <input
                    className="inp"
                    id="pw1"
                    type={showPw1 ? "text" : "password"}
                    placeholder="••••••••"
                    value={pw1}
                    onChange={(e) => setPw1(e.target.value)}
                  />
                  <button className="pweye" type="button" onClick={() => setShowPw1((v) => !v)} aria-label={showPw1 ? "Ocultar senha" : "Mostrar senha"}>
                    <EyeIcon />
                  </button>
                </div>
              </div>
              <div className="fg">
                <label htmlFor="pw2">Confirmar senha</label>
                <div className="pwwrap">
                  <input
                    className="inp"
                    id="pw2"
                    type={showPw2 ? "text" : "password"}
                    placeholder="••••••••"
                    value={pw2}
                    onChange={(e) => setPw2(e.target.value)}
                  />
                  <button className="pweye" type="button" onClick={() => setShowPw2((v) => !v)} aria-label={showPw2 ? "Ocultar senha" : "Mostrar senha"}>
                    <EyeIcon />
                  </button>
                </div>
              </div>
            </div>
            <div className={`match${senhasConferem ? " show" : ""}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg> As senhas conferem
            </div>

            <label className="consent">
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
              <span>Li e concordo com a <a href="#" target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()}>Política de Privacidade</a> e autorizo o tratamento dos meus dados para unificação do meu acesso, conforme a LGPD.</span>
            </label>
          </div>
        )}

        <div className="foot">
          <span className="priv">Usamos seus dados apenas para unificar seu acesso aos produtos contratados.</span>
          <div className="btns">
            {s2 && <button className="btn ghost" type="button" onClick={() => setStep(1)}>Voltar</button>}
            {!s2 && <button className="btn primary" type="button" onClick={() => setStep(2)}>Continuar</button>}
            {s2 && (
              <button className="btn primary" type="button" onClick={handleFinish} disabled={!agree || finishing}>
                {finishing ? "Concluindo…" : "Concluir cadastro"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
