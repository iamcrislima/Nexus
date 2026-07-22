import { useState } from "react";
import "./MinhaConta.css";

// Tela "Minha conta" — perfil e acesso ao ecossistema (MOCK, sem backend).
// Reproduz nexus-minha-conta_1.html. Renderiza como tela ativa dentro do
// <main> do shell (a Softbar real fica ao lado — não recriada aqui).
// Único comportamento dinâmico: olho da senha (estado React).

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="11" width="16" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// ícones de origem das contas vinculadas
function OriginIcon({ tipo }: { tipo: ContaTipo }) {
  switch (tipo) {
    case "email":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "ad":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="3" width="8" height="8" rx="1.2" />
          <rect x="13" y="3" width="8" height="8" rx="1.2" />
          <rect x="3" y="13" width="8" height="8" rx="1.2" />
          <rect x="13" y="13" width="8" height="8" rx="1.2" />
        </svg>
      );
    case "softplan":
      return (
        <svg viewBox="0 0 22 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M0.868724 20.06H15.165C19.1556 20.06 21.8411 17.5054 21.8411 13.6775C21.8411 9.84951 19.1556 7.51308 15.165 7.51308H7.14813C6.13264 7.51308 5.58919 7.03707 5.58919 6.16437C5.58919 5.29168 6.13264 4.81567 7.14813 4.81567H20.8256V0H6.67609C2.68551 0 0 2.55461 0 6.38255C0 10.2105 2.68551 12.4755 6.67609 12.4755H14.6969C15.7124 12.4755 16.2559 12.9872 16.2559 13.8639C16.2559 14.7405 15.7124 15.2523 14.6969 15.2523H0.868724V20.0679V20.06Z" />
          <path d="M1.58671 22.0679H5.39482V25.876C5.39482 26.7526 4.68476 27.4627 3.80811 27.4627H0V23.6546C0 22.7779 0.710054 22.0679 1.58671 22.0679Z" />
        </svg>
      );
    case "google":
      return <span className="acct-glyph">G</span>;
    case "1doc":
      return <span className="acct-glyph">1D</span>;
  }
}

type ContaTipo = "email" | "ad" | "softplan" | "google" | "1doc";

interface ContaVinculada {
  id: string;
  origem: string;
  tipo: ContaTipo;
  principal?: boolean;
}

const CONTAS_VINCULADAS: ContaVinculada[] = [
  { id: "cristiano.silva@tubarao.sc.gov.br", origem: "E-mail institucional", tipo: "email", principal: true },
  { id: "cris.silva", origem: "Login de rede · Active Directory", tipo: "ad" },
  { id: "cris.lima@softplan.com.br", origem: "Conta Softplan", tipo: "softplan" },
  { id: "cris@gmail.com", origem: "Google", tipo: "google" },
  { id: "cris@1doc.com.br", origem: "1Doc", tipo: "1doc" },
];

export default function MinhaConta() {
  const [showPw1, setShowPw1] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [contas, setContas] = useState<ContaVinculada[]>(CONTAS_VINCULADAS);

  // handlers mock (sem backend por enquanto)
  const handleAdicionarConta = () => console.log("[mock] Adicionar conta");
  const handleDesvincular = (id: string) => {
    console.log("[mock] Desvincular", id);
    setContas((cur) => cur.filter((c) => c.id !== id));
  };

  return (
    <div className="nx-conta">
      <div className="topbar">
        <span>Softplan</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
        <b>Minha conta</b>
      </div>

      <div className="wrap">
        <h1 className="page-h">Minha conta</h1>
        <p className="page-sub">Gerencie seus dados e seu acesso ao ecossistema Softplan.</p>

        {/* hero */}
        <div className="hero">
          <div className="avatar">CS</div>
          <div className="hero-info">
            <div className="hero-name">Cristiano da Silva</div>
            <div className="hero-mail">cristiano.silva@tubarao.sc.gov.br</div>
            <div className="chips">
              <span className="chip"><span className="d" /> Conta ativa</span>
              <span className="chip">Servidor público</span>
              <span className="chip">Prefeitura de Tubarão</span>
            </div>
          </div>
        </div>

        {/* dados pessoais */}
        <section className="card">
          <div className="card-h"><h2>Dados pessoais</h2><p>Informações usadas em todos os produtos Softplan.</p></div>
          <div className="card-b">
            <div className="grid2">
              <div className="fg full">
                <label htmlFor="nome">Nome completo</label>
                <input className="inp" id="nome" defaultValue="Cristiano da Silva" />
              </div>
              <div className="fg">
                <label htmlFor="cpf">CPF</label>
                <div className="locked">
                  <input className="inp" id="cpf" value="047.***.***-12" readOnly />
                  <span className="lk"><LockIcon /></span>
                </div>
                <div className="hint"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg> Identifica sua conta única e não pode ser alterado.</div>
              </div>
              <div className="fg">
                <label htmlFor="func">Função</label>
                <input className="inp" id="func" defaultValue="Analista administrativo" />
              </div>
              <div className="fg full">
                <label htmlFor="email">E-mail</label>
                <input className="inp" id="email" type="email" defaultValue="cristiano.silva@tubarao.sc.gov.br" />
              </div>
            </div>
            <div className="actions">
              <button className="btn ghost" type="button">Cancelar</button>
              <button className="btn primary" type="button">Salvar alterações</button>
            </div>
          </div>
        </section>

        {/* acesso e segurança */}
        <section className="card">
          <div className="card-h"><h2>Acesso e segurança</h2><p>Como você entra na plataforma e sua senha.</p></div>
          <div className="card-b">
            <div className="row">
              <div>
                <div className="k">Como você entra</div>
                <div className="v">Use seu e-mail ou CPF para acessar todos os produtos.</div>
              </div>
              <div className="accbadges">
                <span className="accbadge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg> E-mail</span>
                <span className="accbadge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 8h10M7 12h6M7 16h8" /></svg> CPF</span>
              </div>
            </div>

            <div className="divider" />

            <div className="accts-head">
              <div>
                <div className="k">Contas vinculadas</div>
                <div className="v">Origens de acesso conectadas à sua conta única.</div>
              </div>
              <button className="btn ghost sm" type="button" onClick={handleAdicionarConta}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
                Adicionar conta
              </button>
            </div>
            <div className="accts">
              {contas.map((c) => (
                <div className="acct" key={c.id}>
                  <div className="acct-ic"><OriginIcon tipo={c.tipo} /></div>
                  <div className="acct-tx">
                    <div className="acct-id">{c.id}</div>
                    <div className="acct-or">{c.origem}</div>
                  </div>
                  {c.principal ? (
                    <span className="acct-tag">Principal</span>
                  ) : (
                    <button className="acct-unlink" type="button" onClick={() => handleDesvincular(c.id)}>Desvincular</button>
                  )}
                </div>
              ))}
            </div>

            <div className="divider" />

            <div className="k" style={{ marginBottom: 14 }}>Alterar senha</div>
            <div className="grid2">
              <div className="fg">
                <label htmlFor="pw1">Nova senha</label>
                <div className="pwwrap">
                  <input className="inp" id="pw1" type={showPw1 ? "text" : "password"} placeholder="••••••••" />
                  <button className="pweye" type="button" onClick={() => setShowPw1((v) => !v)} aria-label={showPw1 ? "Ocultar senha" : "Mostrar senha"}><EyeIcon /></button>
                </div>
              </div>
              <div className="fg">
                <label htmlFor="pw2">Confirmar nova senha</label>
                <div className="pwwrap">
                  <input className="inp" id="pw2" type={showPw2 ? "text" : "password"} placeholder="••••••••" />
                  <button className="pweye" type="button" onClick={() => setShowPw2((v) => !v)} aria-label={showPw2 ? "Ocultar senha" : "Mostrar senha"}><EyeIcon /></button>
                </div>
              </div>
            </div>
            <div className="actions">
              <button className="btn primary" type="button">Atualizar senha</button>
            </div>
          </div>
        </section>

        {/* produtos */}
        <section className="card">
          <div className="card-h"><h2>Seus produtos</h2><p>Produtos do ecossistema a que sua conta tem acesso.</p></div>
          <div className="card-b">
            <div className="prodgrid">
              <div className="prod"><div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg></div><div><div className="nm">Processos Digitais</div><div className="st"><span className="d" /> Acesso ativo</div></div></div>
              <div className="prod"><div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3 2 8l10 5 10-5-10-5Z" /></svg></div><div><div className="nm">Procuradorias</div><div className="st"><span className="d" /> Acesso ativo</div></div></div>
              <div className="prod"><div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 21h18M6 21V9l6-4 6 4v12" /></svg></div><div><div className="nm">Obras Públicas</div><div className="st"><span className="d" /> Acesso ativo</div></div></div>
              <div className="prod"><div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2v20M2 7h20M2 17h20" /></svg></div><div><div className="nm">Gestão de Projetos</div><div className="st"><span className="d" /> Acesso ativo</div></div></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
