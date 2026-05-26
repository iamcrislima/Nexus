# HANDOFF — Softbar · Nexus Project
> Data: 2026-05-26
> Stack: React 19 + TypeScript + Vite + FontAwesome Pro 7

---

## O que é esse projeto

Softbar é um componente React de navegação global para o ecossistema Nexus da Softplan. Trata-se de uma barra lateral fixa (56px de largura) que persiste em todos os produtos do ecossistema, permitindo que o usuário alterne entre soluções contratadas, veja o estado das não contratadas e descubra ferramentas em desenvolvimento. O repositório tem dois ocupantes bem separados: o **módulo entregável** (`src/softbar/`) — que é o que sai daqui para produção — e um **app de demonstração contextual** (`src/demo/`) — que simula três produtos (NexusHome, Processos Digitais e Obras) apenas para validação visual.

---

## Como rodar localmente

1. `npm install`
2. Copiar `.env.example` para `.env` e preencher `FA_TOKEN` com o token FontAwesome Pro
3. `npm run dev`
4. Abrir http://localhost:5173

> **Atenção:** o `npm install` depende do `FA_TOKEN` estar no ambiente antes de rodar. O `.npmrc` aponta o registry privado do FontAwesome Pro (`npm.fontawesome.com`) e autentica com a variável. Sem o token no `.env`, a instalação falha com erro 401.

---

## Variáveis de ambiente

| Variável | Descrição | Obrigatória |
|----------|-----------|-------------|
| `FA_TOKEN` | Token de autenticação no registry FontAwesome Pro (`npm.fontawesome.com`) | Sim |

O `.npmrc` commitado usa `${FA_TOKEN}` — o token nunca vai em claro no repositório. Em CI/CD (Vercel, GitHub Actions), adicionar `FA_TOKEN` como secret/variável de ambiente da plataforma.

---

## Estrutura do projeto

O ponto central desta reorganização: **`src/softbar/` é o módulo que vai para produção. `src/demo/` não vai.**

```
Softbar/
│
├── index.ts                    ← API pública do módulo (re-exporta de src/softbar/)
│
├── src/
│   ├── softbar/                ← MÓDULO ENTREGÁVEL — o que sai daqui para produção
│   │   ├── index.ts            ← Barrel: Softbar, SoftbarModal, FAIcon, PRODUCTS, tipos
│   │   ├── types.ts            ← Interfaces: ProductConfig, ModalProduct
│   │   ├── softbar.config.tsx  ← Catálogo estático dos 5 produtos do ecossistema Nexus
│   │   ├── Softbar.tsx         ← Componente principal: barra 56px, tooltips, badges, modal
│   │   ├── Softbar.css         ← Estilos da barra lateral
│   │   ├── SoftbarModal.tsx    ← Modal de produto não contratado / "em breve"
│   │   ├── SoftbarModal.css    ← Estilos do modal
│   │   ├── FAIcon.tsx          ← Wrapper FA Pro: isola SVGs do React via dangerouslySetInnerHTML
│   │   └── logo softplan.svg   ← Logo usado no botão superior da Softbar
│   │
│   └── demo/                   ← SHELL DE DEMONSTRAÇÃO — não vai para produção
│       ├── main.tsx            ← Entry point: FA JS → index.css → App → data-theme="1doc"
│       ├── App.tsx             ← Monta Softbar + produto ativo; mostra o contrato de integração
│       ├── index.css           ← Reset e estilos globais da demo
│       ├── Header.tsx          ← Header do produto Processos Digitais (mock)
│       ├── Header.css
│       ├── Subheader.tsx       ← Subheader com dropdown de setores e busca em tempo real (mock)
│       ├── Subheader.css
│       ├── CentralDeAcoes.tsx  ← Tela principal de Processos Digitais (mock)
│       ├── CentralDeAcoes.css
│       ├── NexusHome.tsx       ← Dashboard home do ecossistema (mock)
│       ├── NexusHome.css
│       ├── ObrasGov.tsx        ← Tela do produto Obras Públicas (mock)
│       └── ObrasGov.css
│
├── index.html                  ← HTML shell do Vite (aponta para src/demo/main.tsx)
├── vite.config.ts              ← Build com manualChunks: vendor-react + vendor-fa + app
├── tsconfig.json               ← strict: true, noUnusedLocals/Parameters: false
├── tsconfig.node.json          ← TypeScript para vite.config.ts
├── vite-env.d.ts               ← Tipos de ambiente Vite
├── vercel.json                 ← buildCommand, outputDirectory, security headers
├── package.json                ← React 19.2.6, TypeScript 6, Vite 5, FA Pro 7
├── .npmrc                      ← Registry FA Pro via ${FA_TOKEN} — commitado, sem token em claro
├── .env.example                ← Modelo de .env para novos devs
└── .gitignore                  ← .env está na linha 6
```

### Regra de encapsulamento

A demo importa do módulo assim: `import Softbar from "../softbar"` — nunca diretamente de arquivos internos (`../softbar/Softbar`, `../softbar/types`). O módulo expõe tudo o que precisa pelo seu `index.ts`. Quem integrar a Softbar em outro app deve seguir o mesmo padrão: importar de `"softbar"` (o `index.ts` da raiz), nunca de subarquivos.

---

## O que está implementado

- ✅ **Componente Softbar** (`src/softbar/Softbar.tsx`) — barra 56px, `<nav>` com `aria-label`, lista de produtos com `aria-current="page"` no item ativo, tooltips hover com nome + descrição + status de contratação, badge de notificação numérico, lock-dot para produtos não contratados
- ✅ **SoftbarModal** (`src/softbar/SoftbarModal.tsx`) — modal de produto não contratado com chips, features, tagline, longDesc; modal alternativo para itens "em breve"; Escape key + click-outside para fechar; `aria-modal` + `aria-labelledby`
- ✅ **FAIcon wrapper** (`src/softbar/FAIcon.tsx`) — encapsula `<i class="...">` via `dangerouslySetInnerHTML`; previne que React destrua SVGs injetados pelo motor FA JS
- ✅ **Catálogo de produtos** (`src/softbar/softbar.config.tsx`) — 5 produtos: Procuradorias, Obras Públicas, Licenciamento Ambiental, Gestão de Projetos, Processos Digitais; cada produto carrega seu `Icon: React.ComponentType` tipado
- ✅ **Ferramentas "Em breve"** — Map, Analytics, Mensageria; hardcoded em `SOON_TOOLS` dentro de `Softbar.tsx`
- ✅ **API pública limpa** — `index.ts` (raiz) + `src/softbar/index.ts` exportam consistentemente: `Softbar` (default), `SoftbarModal`, `FAIcon`, `PRODUCTS`, `ProductConfig`, `ModalProduct`
- ✅ **Props de integração** — `activeProductId`, `clientProducts`, `notifications`, `onProductChange`, `onLogoClick`; todas opcionais com defaults sensatos; Softbar notifica, não navega
- ✅ **TypeScript strict** — interfaces em `types.ts`; `SoftbarProps`, `ModalProduct`, `ProductConfig` sem `any`; `tsc --noEmit` passa; build em ~2.5s
- ✅ **Bundle split** — `vendor-react` (~192 KB), `vendor-fa` (~14 MB, cache separado), app code (~42 KB)
- ✅ **Demo shell** (`src/demo/App.tsx`) — simula `MOCK_CONTRACTED` e `MOCK_NOTIFICATIONS`; demonstra o contrato de integração em contexto real com 3 produtos navegáveis
- ✅ **Deploy Vercel configurado** — `vercel.json` com `buildCommand`, `outputDirectory` e security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`)
- ✅ **Segurança de token** — `.npmrc` commitado com `${FA_TOKEN}`; `.env` no `.gitignore` (linha 6)

---

## O que ainda é mock

- 🟡 **CTA do SoftbarModal** — o botão "Solicitar avaliação" / "Me notifique quando lançar" (`src/softbar/SoftbarModal.tsx:76`) fecha o modal sem fazer nada. Há um `// TODO: integrar com formulário/API de avaliação`. É o CTA mais visível do componente — em qualquer apresentação a stakeholders ou clientes, precisa pelo menos de um estado de confirmação visual ("Interesse registrado ✓") mesmo sem backend real.
- 🟡 **`clientProducts`** — hoje `MOCK_CONTRACTED = ["processos-digitais", "obras"]` hardcoded em `src/demo/App.tsx`. Em produção, deve vir de `GET /api/user/products` autenticado.
- 🟡 **`notifications`** — hoje `MOCK_NOTIFICATIONS = { "processos-digitais": 6 }` hardcoded em `src/demo/App.tsx`. Em produção, deve vir de `GET /api/notifications/summary`.
- 🟡 **Catálogo de produtos** (`src/softbar/softbar.config.tsx`) — lista estática de 5 produtos no bundle. Novos produtos, descontinuados ou URLs mudadas requerem alteração no código e redeploy. Em produção real, esse catálogo provavelmente precisa vir de API gerenciada.
- 🟡 **Dados de usuário nos mocks** — `cris.lima@1doc.com.br` em `src/demo/Header.tsx:148`, "Moacir Silva de Matos Junior Admin" em `src/demo/CentralDeAcoes.tsx:98`, além de ~14 outros nomes próprios espalhados pelos arquivos demo. Aceitável internamente; substituir por dados fictícios antes de qualquer URL pública ser compartilhada fora da equipe.

---

## Endpoints que precisarão existir

Não há nenhuma chamada `fetch`/`axios` no projeto hoje. A Softbar recebe tudo por props — a integração com API é responsabilidade do app host.

| # | Endpoint | Substitui | Prioridade |
|---|----------|-----------|------------|
| 1 | `GET /api/user/products` | `MOCK_CONTRACTED` em `App.tsx` | Bloqueante para integração real |
| 2 | `GET /api/notifications/summary` | `MOCK_NOTIFICATIONS` em `App.tsx` | Alta |
| 3 | `POST /api/notify-me` | No-op do botão em `SoftbarModal.tsx:76` | Média |
| 4 | `GET /api/products` | `PRODUCTS` em `softbar.config.tsx` | Baixa (opcional) |

---

## Decisões técnicas tomadas

- **`src/softbar/` vs `src/demo/`** — a reorganização flat→módulo/demo foi feita para deixar explícito o que é entregável e o que é scaffolding de demonstração. O `index.ts` na raiz re-exporta de `src/softbar/` como única porta de entrada. Consumidores externos nunca devem importar de `src/softbar/` diretamente.
- **FAIcon via `dangerouslySetInnerHTML`** — o motor FA Pro injeta SVGs via JavaScript no DOM após o render do React. React reutiliza nós DOM e destrói esses SVGs ao reconciliar. O wrapper `FAIcon` isola o `<i>` em um `<span>` cujo `innerHTML` o React não toca. Alternativa mais segura seria `@fortawesome/react-fontawesome` com tree-shaking — mas contradiz a arquitetura definida no CLAUDE.md e requereria refatorar todos os usos.
- **`ProductConfig.Icon: React.ComponentType`** — cada produto carrega seu próprio componente de ícone (`IconObras`, `IconProcessos`, etc.) em vez de uma string. Permite `<product.Icon />` com type-safety. Os wrappers de uso único são intencionais — eliminá-los exigiria mudar a interface pública.
- **`manualChunks` no `vite.config.ts`** — FA Pro `all.min.js` pesa ~14 MB. Separado em `vendor-fa` garante cache independente do app code. Impacta apenas o primeiro carregamento.
- **Softbar notifica, não navega** — `onProductChange` e `onLogoClick` são callbacks opcionais. O roteamento é responsabilidade do app host. A Softbar não tem dependência de router.
- **`host: true` no `vite.config.ts`** — expõe o servidor de dev em `0.0.0.0` (todas as interfaces). Útil para testar em dispositivos na mesma rede. Risco em redes corporativas ou públicas — ver seção de segurança.
- **TypeScript 6 com `strict: true`** e `noUnusedLocals/Parameters: false` — strict ativado para segurança de tipos; flags de unused desativadas para não bloquear desenvolvimento iterativo.
- **Sem `@1doc/1ds-react`** — o projeto usa CSS próprio (arquivos `.css` por componente) com cores hardcoded. O design system 1DS não está instalado apesar de constar no CLAUDE.md. Decisão de escopo deste protótipo.

---

## Segurança — pontos de atenção

**Resolvidos:**
- Token FA Pro nunca em claro no repositório; `.env` no `.gitignore`
- Sem `localStorage`/`sessionStorage` com dados sensíveis
- Sem CPFs, senhas ou tokens financeiros nos mocks
- `vercel.json` com `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`

**Pendentes:**

| Severidade | Item | Localização | Ação |
|-----------|------|-------------|------|
| ALTO | `host: true` expõe dev server em `0.0.0.0` | `vite.config.ts:7` | Mudar para `host: 'localhost'` se não precisar de acesso em rede local |
| MÉDIO | `dangerouslySetInnerHTML` sem sanitização em `FAIcon` | `src/softbar/FAIcon.tsx:12` | Adicionar `icon.replace(/[^a-z0-9 -]/gi, '')` como defesa em profundidade (risco teórico hoje) |
| MÉDIO | Nomes reais de pessoas nos mocks | `src/demo/Header.tsx:148`, `CentralDeAcoes.tsx:98` e outros | Substituir por dados fictícios antes de qualquer URL pública externa |
| MÉDIO | Sem `ErrorBoundary` nos produtos demo | `NexusHome`, `CentralDeAcoes`, `ObrasGov` | Implementar antes de produção |
| BAIXO | HSTS ausente no `vercel.json` | `vercel.json` | Adicionar `Strict-Transport-Security` antes de domínio próprio |
| BAIXO | Sem autenticação | Por design (protótipo) | App host é responsável; `clientProducts` deve vir de fonte autenticada |

---

## O que o time tech precisa fazer primeiro

1. **Resolver o CTA do `SoftbarModal`** — o botão "Solicitar avaliação" não pode ser a âncora visual do componente e não fazer nada. Mínimo: estado de confirmação visual mesmo sem backend. (`src/softbar/SoftbarModal.tsx:76`)
2. **Implementar `GET /api/user/products`** — bloqueante para qualquer integração real; substitui `MOCK_CONTRACTED`
3. **Implementar `GET /api/notifications/summary`** — substitui `MOCK_NOTIFICATIONS`
4. **Substituir nomes reais nos mocks** — antes de qualquer URL ser enviada fora da equipe interna
5. **Mudar `host: true` para `host: 'localhost'`** em `vite.config.ts`
6. **Implementar `POST /api/notify-me`** e conectar ao `SoftbarModal`
7. **Adicionar `ErrorBoundary`** em `NexusHome`, `CentralDeAcoes` e `ObrasGov`

---

## Limitações conhecidas

- ⚠️ **Bundle FA Pro ~14 MB** — `all.min.js` carrega os 7.000+ ícones FA Pro. Inevitável com a arquitetura atual. Tree-shaking via `@fortawesome/fontawesome-svg-core` reduziria para ~50 KB, mas requer refatorar o `FAIcon` wrapper e importar ícones individualmente.
- ⚠️ **Sem i18n** — todos os textos são PT-BR hardcoded. O CLAUDE.md define PT/EN como padrão, mas não foi implementado neste protótipo.
- ⚠️ **Sem alto contraste nem modo escuro** — `data-contrast` e `data-dark` documentados no CLAUDE.md estão ausentes. Nenhum handler implementado.
- ⚠️ **Sem `@1doc/1ds-react`** — CSS próprio por componente; migração para tokens 1DS é trabalho não estimado.
- ⚠️ **`softbar.config.tsx` estático** — novos produtos do ecossistema exigem alteração no código e redeploy.
- ⚠️ **`SoftbarProps.clientProducts` sem granularidade de roles** — a prop determina "contratado vs. não contratado" mas não distingue roles dentro de um produto. Se a Softbar precisar esconder itens por role, isso não está modelado.

---

## Contato

Dúvidas sobre decisões de produto/design: a confirmar
Dúvidas sobre token FontAwesome Pro: conta em https://fontawesome.com/account
Repositório remoto: a confirmar
Projeto Vercel: a confirmar

---

## Seções marcadas como "a confirmar"

3 itens precisam ser preenchidos pelo autor antes de enviar este documento:

1. **Contato de produto/design** — quem responde por decisões de escopo e UX do componente
2. **URL do repositório remoto** — GitHub/GitLab não encontrado no projeto
3. **Nome do projeto Vercel** — não identificado nos arquivos de configuração
