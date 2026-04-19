# Softbar — Nexus Project · Softplan

Barra lateral de navegação entre produtos da Softplan.  
Este é o **passo 0 do Projeto Nexus**: permitir que usuários naveguem entre os produtos da Softplan a partir de qualquer produto contratado.

---

## Estrutura do projeto

```
src/
  components/
    Softbar/
      Softbar.jsx          ← Componente principal
      Softbar.css          ← Estilos da barra
      SoftbarModal.jsx     ← Modal de produto não contratado
      SoftbarModal.css     ← Estilos do modal
      softbar.config.js    ← Configuração dos produtos
      index.js             ← Exports
  App.jsx                  ← Demo standalone
  main.jsx
  index.css
```

---

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`

---

## Como usar no projeto 1Doc (ou qualquer produto)

### 1. Copie a pasta `src/components/Softbar` para o seu projeto

### 2. Importe o componente no layout raiz

```jsx
import Softbar from "@/components/Softbar";

export default function RootLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Softbar
        activeProductId="processos-digitais"
        clientProducts={user.contractedProducts}
      />
      <main style={{ marginLeft: 56 }}>
        {children}
      </main>
    </div>
  );
}
```

### 3. Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| `activeProductId` | `string` | ID do produto atual. Ex: `"processos-digitais"` |
| `clientProducts` | `string[]` | Lista de IDs de produtos contratados pelo cliente. Vem da API. |

---

## IDs de produtos disponíveis

| ID | Produto |
|----|---------|
| `processos-digitais` | 1Doc — Processos Digitais |
| `procuradorias` | Procuradorias |
| `obras` | Obras Públicas |
| `licenciamento` | Licenciamento Ambiental |
| `gestao-projetos` | Gestão de Projetos |

---

## Adicionar um novo produto

Edite `softbar.config.js`:

```js
{
  id: "novo-produto",
  label: "Nome do Produto",
  description: "Frase curta de impacto",
  url: "https://...",
  badge: "Categoria",
  tagline: "Headline do modal",
  longDesc: "Descrição completa...",
  features: ["Feature 1", "Feature 2"],
  chips: ["Tag 1", "Tag 2"],
  Icon: IconNovoProduto,
}
```

---

## Roadmap Nexus

- [x] Passo 0 — Softbar com navegação e modal de discovery
- [ ] Passo 1 — SSO unificado entre produtos
- [ ] Passo 2 — Design system compartilhado
- [ ] Passo 3 — Contexto de cliente compartilhado entre produtos
