import { useState } from "react";
import Softbar from "./Softbar";
import Header from "./Header";
import Subheader from "./Subheader";
import CentralDeAcoes from "./CentralDeAcoes";
import ObrasGov from "./ObrasGov";
import NexusHome from "./NexusHome";

// ============================================================
// DEMO: Simulação da Softbar no contexto Nexus
//
// activeProductId  → ID do produto atual (vem do app host)
// clientProducts   → lista de IDs contratados (vem da API)
// ============================================================

const MOCK_CONTRACTED = [
  "processos-digitais",
  "obras",
];

export default function App() {
  const [activeProduct, setActiveProduct] = useState("processos-digitais");

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden", display: "flex" }}>
      {/* Softbar — barra lateral fixa */}
      <Softbar
        activeProductId={activeProduct}
        clientProducts={MOCK_CONTRACTED}
        onProductChange={setActiveProduct}
        onLogoClick={() => setActiveProduct("nexus-home")}
      />

      {/* Conteúdo principal — muda conforme produto ativo */}
      <main style={{
        marginLeft: "56px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}>
        {activeProduct === "nexus-home" && (
          <NexusHome />
        )}

        {activeProduct === "processos-digitais" && (
          <>
            <Header />
            <Subheader />
            <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <CentralDeAcoes />
            </div>
          </>
        )}

        {activeProduct === "obras" && (
          <ObrasGov />
        )}
      </main>
    </div>
  );
}
