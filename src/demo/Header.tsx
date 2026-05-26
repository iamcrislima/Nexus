import { useState, useRef, useEffect } from "react";
import FAIcon from "../softbar/FAIcon";
import "./Header.css";

interface NavItem {
  icon: string;
  label: string;
}

const NOVO_ITEMS: NavItem[] = [
  { icon: "fa-regular fa-memo", label: "Memorando" },
  { icon: "fa-regular fa-arrows-spin", label: "Ciclo de Vida" },
  { icon: "fa-regular fa-file-lines", label: "Documento" },
  { icon: "fa-regular fa-clipboard", label: "Ata" },
  { icon: "fa-regular fa-bullhorn", label: "Circular" },
  { icon: "fa-regular fa-envelope-open-text", label: "Ofício Manual" },
  { icon: "fa-regular fa-envelope", label: "Ofício" },
  { icon: "fa-regular fa-file-certificate", label: "Alvará" },
  { icon: "fa-regular fa-comments", label: "Ouvidoria" },
  { icon: "fa-regular fa-screwdriver-wrench", label: "Chamado técnico" },
  { icon: "fa-regular fa-gavel", label: "Sessão Plenária" },
  { icon: "fa-regular fa-magnifying-glass-chart", label: "Análise de Projeto (atual)" },
  { icon: "fa-regular fa-receipt", label: "Protocolo" },
  { icon: "fa-regular fa-receipt", label: "Protocolo Pref." },
  { icon: "fa-regular fa-magnifying-glass-chart", label: "Análise de Projeto" },
  { icon: "fa-regular fa-clipboard-list-check", label: "Fiscalização" },
  { icon: "fa-regular fa-scale-balanced", label: "Proc. Administrativo" },
  { icon: "fa-regular fa-file-shield", label: "Ato oficial" },
  { icon: "fa-regular fa-database", label: "Entrada de dados" },
  { icon: "fa-regular fa-scale-balanced", label: "Processo Judicial" },
  { icon: "fa-regular fa-landmark", label: "Matéria Legislativa" },
  { icon: "fa-regular fa-file-pen", label: "Parecer" },
];

const LISTAR_ITEMS: NavItem[] = [
  { icon: "fa-regular fa-memo", label: "Memorandos" },
  { icon: "fa-regular fa-arrows-spin", label: "Ciclos de Vida" },
  { icon: "fa-regular fa-comments", label: "Ouvidoria e-Ouve" },
  { icon: "fa-regular fa-file-lines", label: "Documentos" },
  { icon: "fa-regular fa-clipboard", label: "Atas" },
  { icon: "fa-regular fa-bullhorn", label: "Circulares" },
  { icon: "fa-regular fa-envelope", label: "Ofícios" },
  { icon: "fa-regular fa-file-certificate", label: "Alvarás" },
  { icon: "fa-regular fa-comments", label: "Ouvidorias" },
  { icon: "fa-regular fa-screwdriver-wrench", label: "Chamados" },
  { icon: "fa-regular fa-gavel", label: "Sessões Plenárias" },
  { icon: "fa-regular fa-magnifying-glass-chart", label: "Análises de Projetos (atual)" },
  { icon: "fa-regular fa-receipt", label: "Protocolos" },
  { icon: "fa-regular fa-magnifying-glass-chart", label: "Análises de Projetos" },
  { icon: "fa-regular fa-clipboard-list-check", label: "Fiscalizações" },
  { icon: "fa-regular fa-scale-balanced", label: "Proc. Administrativos" },
  { icon: "fa-regular fa-file-shield", label: "Atos oficiais" },
  { icon: "fa-regular fa-file-lines", label: "Documentos GOVBR" },
  { icon: "fa-regular fa-database", label: "Entradas de dados" },
  { icon: "fa-regular fa-clipboard-list-check", label: "Itens fiscalizados" },
];

export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!menuRef.current || menuRef.current.contains(e.target as Node)) return;
      setOpenMenu(null);
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, []);

  const toggle = (id: string) => setOpenMenu((prev) => (prev === id ? null : id));

  return (
    <header className="onb-header" ref={menuRef}>
      <div className="onb-header__left">
        <span className="onb-header__logo">1Doc</span>

        <nav className="onb-header__nav">
          <span className="onb-header__nav-item">Início</span>

          <span className="onb-header__nav-item" onClick={() => toggle("inbox")}>
            Inbox <FAIcon icon="fa-solid fa-chevron-down" style={{ fontSize: 10 }} />
            {openMenu === "inbox" && (
              <div className="onb-header__dropdown">
                <div className="onb-header__dropdown-item">Inbox de SADM</div>
                <div className="onb-header__dropdown-item">Inbox pessoal</div>
              </div>
            )}
          </span>

          <span className="onb-header__nav-item" onClick={() => toggle("novo")}>
            Novo <FAIcon icon="fa-solid fa-chevron-down" style={{ fontSize: 10 }} />
            {openMenu === "novo" && (
              <div className="onb-header__dropdown onb-header__dropdown--tall">
                {NOVO_ITEMS.map((item) => (
                  <div key={item.label} className="onb-header__dropdown-item">
                    <FAIcon icon={item.icon} style={{ width: 18, textAlign: "center", color: "#555" }} />
                    {item.label}
                  </div>
                ))}
              </div>
            )}
          </span>

          <span className="onb-header__nav-item" onClick={() => toggle("listar")}>
            Listar <span className="onb-header__badge">4</span>
            <FAIcon icon="fa-solid fa-chevron-down" style={{ fontSize: 10 }} />
            {openMenu === "listar" && (
              <div className="onb-header__dropdown onb-header__dropdown--tall">
                {LISTAR_ITEMS.map((item) => (
                  <div key={item.label} className="onb-header__dropdown-item">
                    <FAIcon icon={item.icon} style={{ width: 18, textAlign: "center", color: "#555" }} />
                    {item.label}
                  </div>
                ))}
              </div>
            )}
          </span>

          <span className="onb-header__nav-item">Fila de Assinaturas</span>
        </nav>
      </div>

      <div className="onb-header__right">
        <div className="onb-header__search">
          <input className="onb-header__search-input" type="text" placeholder="Buscar" />
          <FAIcon icon="fa-solid fa-magnifying-glass" style={{ fontSize: 14, color: "#888", position: "absolute", right: 10, pointerEvents: "none" }} />
        </div>

        <div className="onb-header__actions">
          <span className="onb-header__action-btn"><FAIcon icon="fa-regular fa-desktop" /></span>
          <span className="onb-header__action-btn">
            <FAIcon icon="fa-regular fa-bell" />
            <span className="onb-header__bell-dot" />
          </span>
        </div>

        <div className="onb-header__user" onClick={() => toggle("user")}>
          <div className="onb-header__avatar">CL</div>
          <span>Cris Lima</span>
          <FAIcon icon="fa-solid fa-chevron-down" style={{ fontSize: 10, color: "#888" }} />

          {openMenu === "user" && (
            <div className="onb-header__dropdown onb-header__dropdown--user">
              <div className="onb-header__user-info">
                <div>
                  <strong>Cris - Administrador</strong>
                  <div style={{ fontSize: 12, color: "#888" }}>cris.lima@1doc.com.br</div>
                </div>
                <div className="onb-header__user-avatar-lg">CL</div>
              </div>
              <button className="onb-header__user-pref-btn">Preferências da conta</button>
              <div className="onb-header__dropdown-divider" />
              {["Plano 1Doc", "Central de Ajuda", "Novidades", "Blog da 1Doc"].map((item) => (
                <div key={item} className="onb-header__dropdown-item">{item}</div>
              ))}
              <div className="onb-header__dropdown-divider" />
              {["Administração", "Relatórios", "Central de Atendimento", "Chat com Suporte"].map((item) => (
                <div key={item} className="onb-header__dropdown-item">{item}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
