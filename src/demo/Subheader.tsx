import { useState, useRef, useEffect } from "react";
import FAIcon from "../softbar/FAIcon";
import "./Subheader.css";

interface Setor {
  sigla: string;
  nome: string;
  badge?: number;
}

interface SetorGrupo {
  sigla: string;
  nome: string;
  children: Setor[];
}

const SETORES: SetorGrupo[] = [
  { sigla: "AR", nome: "Alessandros Realm", children: [] },
  {
    sigla: "COPIRN",
    nome: "COPIRN",
    children: [
      { sigla: "AJ", nome: "ASSESSORIA JURÍDICA", badge: 51 },
      { sigla: "COF", nome: "COORD. DE ORÇAMENTO E FINANÇAS" },
      { sigla: "CPGI", nome: "COORD. PLANEJ. GESTÃO E INOVAÇÃO" },
      { sigla: "CPL", nome: "CPL" },
      { sigla: "DE", nome: "Diretoria Executiva" },
      { sigla: "P", nome: "PRESIDENTE" },
    ],
  },
];

export default function Subheader() {
  const [selectedSetor, setSelectedSetor] = useState("SADM - Secretaria de Administração");
  const [showSetorDropdown, setShowSetorDropdown] = useState(false);
  const [searchSetor, setSearchSetor] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      setShowSetorDropdown(false);
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, []);

  const filteredSetores = SETORES.filter((grupo) => {
    const q = searchSetor.toLowerCase();
    return (
      !q ||
      grupo.nome.toLowerCase().includes(q) ||
      grupo.sigla.toLowerCase().includes(q) ||
      grupo.children.some(
        (c) => c.nome.toLowerCase().includes(q) || c.sigla.toLowerCase().includes(q)
      )
    );
  });

  return (
    <div className="onb-subheader">
      <div className="onb-subheader__left">
        <span className="onb-subheader__breadcrumb">Central de Ações /</span>
      </div>

      <div className="onb-subheader__right" ref={ref}>
        <span className="onb-subheader__dept">{selectedSetor}</span>
        <button
          className="onb-subheader__btn"
          onClick={() => setShowSetorDropdown((v) => !v)}
        >
          Trocar de setor
          <span className="onb-subheader__btn-badge">51</span>
          <FAIcon icon="fa-solid fa-chevron-down" style={{ fontSize: 10 }} />
        </button>

        {showSetorDropdown && (
          <div className="onb-subheader__setor-dropdown">
            <div className="onb-subheader__setor-search">
              <FAIcon icon="fa-solid fa-magnifying-glass" style={{ color: "#999", fontSize: 13 }} />
              <input
                type="text"
                placeholder="Digite o nome do setor"
                value={searchSetor}
                onChange={(e) => setSearchSetor(e.target.value)}
                autoFocus
              />
            </div>

            <div className="onb-subheader__setor-list">
              {filteredSetores.map((grupo) => {
                const filteredChildren = grupo.children.filter((child) => {
                  const q = searchSetor.toLowerCase();
                  return !q || child.nome.toLowerCase().includes(q) || child.sigla.toLowerCase().includes(q);
                });
                return (
                  <div key={grupo.sigla}>
                    <div
                      className="onb-subheader__setor-grupo"
                      onClick={() => {
                        if (grupo.children.length === 0) {
                          setSelectedSetor(`${grupo.sigla} - ${grupo.nome}`);
                          setShowSetorDropdown(false);
                        }
                      }}
                    >
                      <strong>{grupo.sigla} - {grupo.nome}</strong>
                    </div>
                    {filteredChildren.map((child) => (
                      <div
                        key={child.sigla}
                        className="onb-subheader__setor-item"
                        onClick={() => {
                          setSelectedSetor(`${child.sigla} - ${child.nome}`);
                          setShowSetorDropdown(false);
                        }}
                      >
                        <span className="onb-subheader__setor-line" />
                        {child.sigla} - {child.nome}
                        {child.badge !== undefined && (
                          <span className="onb-subheader__setor-badge">{child.badge}</span>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
