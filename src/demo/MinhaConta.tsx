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

export default function MinhaConta() {
  const [showPw1, setShowPw1] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

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

            <div className="row">
              <div>
                <div className="k">Login de rede vinculado</div>
                <div className="v">Mantido da sua conta anterior para continuidade.</div>
              </div>
              <div className="locked" style={{ width: 180 }}>
                <input className="inp" value="cris.silva" readOnly />
                <span className="lk"><LockIcon /></span>
              </div>
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
