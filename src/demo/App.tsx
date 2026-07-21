import { useState } from "react";
import Softbar from "../softbar";
import Header from "./Header";
import Subheader from "./Subheader";
import CentralDeAcoes from "./CentralDeAcoes";
import ObrasGov from "./ObrasGov";
import NexusHome from "./NexusHome";
import LoginSoftplan from "./LoginSoftplan";
import CadastroModal from "./CadastroModal";
import MinhaConta from "./MinhaConta";
import OnboardingTour from "./OnboardingTour";

// DEMO: Simulação da Softbar no contexto Nexus
// activeProductId  → ID do produto atual (vem do app host)
// clientProducts   → lista de IDs contratados (vem da API)

const MOCK_CONTRACTED = ["processos-digitais", "obras"];

const MOCK_NOTIFICATIONS: Record<string, number> = {
  "processos-digitais": 6,
};

export default function App() {
  const [autenticado, setAutenticado] = useState(false);
  // mock: 1º acesso exige ativação da conta (cadastro) sobre a home
  const [precisaCadastro, setPrecisaCadastro] = useState(true);
  // tour guiado: acionado logo após concluir o cadastro
  const [mostrarTour, setMostrarTour] = useState(false);
  const [activeProduct, setActiveProduct] = useState("processos-digitais");

  if (!autenticado) {
    return <LoginSoftplan onEntrar={() => setAutenticado(true)} />;
  }

  return (
    <>
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden", display: "flex" }}>
      <Softbar
        activeProductId={activeProduct}
        clientProducts={MOCK_CONTRACTED}
        notifications={MOCK_NOTIFICATIONS}
        onProductChange={setActiveProduct}
        onLogoClick={() => setActiveProduct("nexus-home")}
        onProfileClick={() => setActiveProduct("minha-conta")}
      />

      <main style={{
        marginLeft: "56px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}>
        {activeProduct === "nexus-home" && <NexusHome />}

        {activeProduct === "processos-digitais" && (
          <>
            <Header />
            <Subheader />
            <CentralDeAcoes />
          </>
        )}

        {activeProduct === "obras" && <ObrasGov />}

        {activeProduct === "minha-conta" && <MinhaConta />}
      </main>
    </div>

    {precisaCadastro && (
      <CadastroModal
        onConcluir={() => {
          setPrecisaCadastro(false);
          setMostrarTour(true);
        }}
      />
    )}

    {mostrarTour && <OnboardingTour onFim={() => setMostrarTour(false)} />}
    </>
  );
}
