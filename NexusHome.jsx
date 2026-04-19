import { useState } from 'react'
import './NexusHome.css'

// ── Mock Data ──────────────────────────────────────────────

const MOCK_BIG_NUMBERS = {
  '7d': [
    { label: 'Documentos Ativos',  value: '3.241',  delta: '+4,1% vs semana anterior', positive: true },
    { label: 'Eficiência Geral',   value: '31,8%',  delta: '+0,6pp nesta semana',      positive: true },
    { label: 'Prazos a Vencer',    value: '42',     delta: '11 vencem amanhã',         positive: false, highlight: true },
    { label: 'Usuários Ativos',    value: '892',    delta: '+18 novos usuários',       positive: true },
  ],
  '30d': [
    { label: 'Documentos Ativos',  value: '12.847', delta: '+8,3% vs mês anterior',   positive: true },
    { label: 'Eficiência Geral',   value: '34,2%',  delta: '+2,1pp este mês',         positive: true },
    { label: 'Prazos a Vencer',    value: '187',    delta: '40 vencem esta semana',   positive: false, highlight: true },
    { label: 'Usuários Ativos',    value: '1.204',  delta: '+124 novos usuários',     positive: true },
  ],
  '90d': [
    { label: 'Documentos Ativos',  value: '38.512', delta: '+21,7% vs trimestre ant.', positive: true },
    { label: 'Eficiência Geral',   value: '29,4%',  delta: '-1,3pp vs trimestre ant.', positive: false },
    { label: 'Prazos a Vencer',    value: '534',    delta: '187 vencem este mês',     positive: false, highlight: true },
    { label: 'Usuários Ativos',    value: '1.204',  delta: '+341 novos usuários',     positive: true },
  ],
}

const MOCK_PRODUCTS = [
  {
    category: 'Processos Digitais',
    items: [
      { id: '1doc',  initials: '1D', color: '#4F6EF7', name: '1Doc',       desc: 'Gestão documental · 3 setores', kpi: '44 não lidos',    status: 'ativo' },
      { id: 'solar', initials: 'SB', color: '#6366F1', name: 'Solar BPM',  desc: 'Processos · 2 setores',         kpi: '8 em andamento', status: 'ativo' },
    ],
  },
  {
    category: 'Transformação Digital',
    items: [
      { id: 'obras', initials: 'OG', color: '#F59E0B', name: 'Obras.gov',         desc: 'Obras · 1 setor',                kpi: '7 alertas', status: 'atencao' },
      { id: 'saj',   initials: 'SP', color: '#8B5CF6', name: 'SAJ Procuradorias', desc: 'Jurídico · não configurado',      kpi: '',          status: 'setup' },
      { id: 'gpla',  initials: 'GP', color: '#10B981', name: 'GPLA',              desc: 'Licenciamento · não contratado',  kpi: '',          status: 'disabled' },
      { id: 'saff',  initials: 'SF', color: '#6B7280', name: 'SAFF',              desc: 'Financeiro · não contratado',     kpi: '',          status: 'disabled' },
    ],
  },
  {
    category: 'Plataforma',
    items: [
      { id: '1map',       initials: '1M', color: '#06B6D4', name: '1map',       desc: 'Geoespacial · em breve',  kpi: '', status: 'soon' },
      { id: 'analytics',  initials: 'AN', color: '#3B82F6', name: 'Analytics',  desc: 'Inteligência · em breve', kpi: '', status: 'soon' },
      { id: 'mensageria', initials: 'ME', color: '#EC4899', name: 'Mensageria', desc: 'Comunicação · em breve',  kpi: '', status: 'soon' },
    ],
  },
]

const MOCK_FEED = [
  { text: 'Memorando 081/2025 aguardando assinatura de Aguardando Inácio',  product: '1Doc',      color: '#4F6EF7', time: 'há 12 min' },
  { text: 'Requisição #4821 aprovada pelo almoxarife',                       product: 'Solar BPM', color: '#6366F1', time: 'há 34 min' },
  { text: 'Prazo da obra 12-B vence em 3 dias',                              product: 'Obras.gov', color: '#F59E0B', time: 'há 1h' },
  { text: 'Circular 01/2025 publicada — leitura obrigatória',                product: '1Doc',      color: '#4F6EF7', time: 'há 2h' },
  { text: 'Estoque de cimento abaixo do mínimo — reposição sugerida',        product: 'Obras.gov', color: '#F59E0B', time: 'há 3h' },
  { text: 'Processo 2025/034 avançou para fase de aprovação final',          product: 'Solar BPM', color: '#6366F1', time: 'há 4h' },
  { text: 'Ofício 027/2025 encaminhado ao setor jurídico',                   product: '1Doc',      color: '#4F6EF7', time: 'há 5h' },
  { text: 'Medição do contrato OB-2024-112 registrada com sucesso',          product: 'Obras.gov', color: '#F59E0B', time: 'há 6h' },
  { text: 'Novo usuário adicionado ao setor de Planejamento',                product: '1Doc',      color: '#4F6EF7', time: 'há 7h' },
  { text: 'Fluxo "Aprovação de Licença" publicado em produção',              product: 'Solar BPM', color: '#6366F1', time: 'há 8h' },
  { text: 'Relatório mensal de obras gerado automaticamente',                product: 'Obras.gov', color: '#F59E0B', time: 'ontem' },
  { text: 'Assinatura eletrônica coletada — Decreto 003/2025',               product: '1Doc',      color: '#4F6EF7', time: 'ontem' },
]

const MOCK_ALERTS = [
  { type: 'error',   text: '40 prazos vencem esta semana',        sub: 'Obras.gov · 1Doc' },
  { type: 'warning', text: 'SAJ aguarda configuração inicial',    sub: 'Produto contratado, não ativado' },
  { type: 'info',    text: '24 assinaturas pendentes',            sub: '1Doc · aguardam sua ação' },
  { type: 'success', text: 'Solar BPM dentro do fluxo ideal',     sub: 'Eficiência 61% · acima da meta' },
]

const MOCK_EFFICIENCY = {
  '7d':  [
    { name: '1Doc',      value: 18, color: '#4F6EF7' },
    { name: 'Solar BPM', value: 55, color: '#6366F1' },
    { name: 'Obras.gov', value: 41, color: '#F59E0B' },
  ],
  '30d': [
    { name: '1Doc',      value: 22, color: '#4F6EF7' },
    { name: 'Solar BPM', value: 61, color: '#6366F1' },
    { name: 'Obras.gov', value: 38, color: '#F59E0B' },
  ],
  '90d': [
    { name: '1Doc',      value: 31, color: '#4F6EF7' },
    { name: 'Solar BPM', value: 58, color: '#6366F1' },
    { name: 'Obras.gov', value: 27, color: '#F59E0B' },
  ],
}

const MOCK_SPARKLINE = {
  '7d':  [30, 27, 35, 28, 45, 40, 68],
  '30d': [18, 22, 15, 28, 32, 19, 24, 30, 27, 35, 28, 22, 38, 42, 35, 28, 45, 40, 38, 50, 44, 52, 48, 55, 50, 62, 58, 65, 70, 68],
  '90d': [12, 18, 14, 20, 22, 17, 25, 28, 24, 30, 18, 22, 15, 28, 32, 19, 24, 30, 27, 35, 28, 22, 38, 42, 35, 28, 45, 40, 38, 50, 44, 52, 48, 55, 50, 62, 58, 65, 70, 68, 72, 78, 74, 80, 76, 82, 85, 88, 84, 90, 87, 92, 89, 94, 91, 96, 93, 97, 95, 98, 94, 97, 92, 96, 90, 94, 88, 91, 86, 89, 84, 87, 82, 85, 80, 83, 78, 81, 76, 79, 74, 77, 72, 75, 70, 73, 68, 71, 66, 69],
}

const MOCK_COVERAGE = [
  { name: 'Processos Digitais', contracted: 2, total: 2 },
  { name: 'Transf. Digital',    contracted: 1, total: 4 },
  { name: 'Plataforma',         contracted: 0, total: 3 },
]

const STATUS_LABEL = {
  ativo:    'ativo',
  atencao:  'atenção',
  setup:    'setup',
  soon:     'em breve',
  disabled: 'não contratado',
}

const ALERT_ICON = {
  error:   <i className="fa-solid fa-triangle-exclamation" style={{ color: '#ef4444' }} />,
  warning: <i className="fa-solid fa-circle-exclamation"  style={{ color: '#f59e0b' }} />,
  info:    <i className="fa-solid fa-circle-info"          style={{ color: '#6366f1' }} />,
  success: <i className="fa-solid fa-circle-check"         style={{ color: '#10b981' }} />,
}


function formatDate() {
  const d = new Date()
  return d.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })
}

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Bom dia'
  if (h < 18) return 'Boa tarde'
  return 'Boa noite'
}

// ── Component ──────────────────────────────────────────────

export default function NexusHome() {
  const [period, setPeriod] = useState('30d')

  const bigNumbers  = MOCK_BIG_NUMBERS[period]
  const efficiency  = MOCK_EFFICIENCY[period]
  const sparkline   = MOCK_SPARKLINE[period]
  const sparkMax    = Math.max(...sparkline)

  return (
    <div className="nexus-home">
      {/* Header */}
      <div className="nexus-home__header">
        <div>
          <h1 className="nexus-home__greeting">{greeting()}, Cris</h1>
          <p className="nexus-home__subtitle">
            Visão geral do ecossistema Softplan · {formatDate()}
          </p>
        </div>
        <div className="nexus-home__period-btns">
          {['7d', '30d', '90d'].map(p => (
            <button
              key={p}
              className={`nexus-home__period-btn${period === p ? ' nexus-home__period-btn--active' : ''}`}
              onClick={() => setPeriod(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="nexus-home__body">

        {/* Big Numbers */}
        <div className="nexus-home__bignumbers">
          {bigNumbers.map(n => (
            <div key={n.label} className="nh-bignum">
              <div className="nh-bignum__label">{n.label}</div>
              <div className={`nh-bignum__value${n.highlight ? ' nh-bignum__value--highlight' : ''}`}>
                {n.value}
              </div>
              <div className={`nh-bignum__delta nh-bignum__delta--${n.positive ? 'positive' : 'negative'}`}>
                <i className={`fa-solid fa-circle-dot`} style={{ fontSize: 7 }} />
                {n.delta}
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="nexus-home__main-grid">

          {/* Products list — card style */}
          <div className="nh-card">
            <div className="nh-card__title">Produtos Contratados</div>
            <div className="nh-products-body">
              {MOCK_PRODUCTS.map(group => (
                <div key={group.category}>
                  <div className="nh-product-group__label">{group.category}</div>
                  {group.items.map(p => {
                    const muted = p.status === 'disabled' || p.status === 'soon'
                    return (
                      <div
                        key={p.id}
                        className={`nh-product-card${muted ? ' nh-product-card--muted' : ''}`}
                      >
                        <div
                          className="nh-product-icon"
                          style={{ background: muted ? p.color + '44' : p.color }}
                        >
                          {p.initials}
                        </div>
                        <div className="nh-product-info">
                          <div className="nh-product-name">{p.name}</div>
                          <div className="nh-product-desc">{p.desc}</div>
                        </div>
                        {p.kpi
                          ? <div className="nh-product-kpi">{p.kpi}</div>
                          : <div className="nh-product-kpi">—</div>
                        }
                        <span className={`nh-status nh-status--${p.status}`}>
                          {STATUS_LABEL[p.status]}
                        </span>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Side column — só feed */}
          <div className="nexus-home__side">
            <div className="nh-card">
              <div className="nh-card__title">Atividade Recente</div>
              {MOCK_FEED.map((item, i) => (
                <div key={i} className="nh-feed-item">
                  <div className="nh-feed-dot" style={{ background: item.color }} />
                  <div className="nh-feed-content">
                    <div className="nh-feed-text">{item.text}</div>
                    <div className="nh-feed-meta">
                      <span
                        className="nh-feed-product"
                        style={{ background: item.color + '33', color: item.color }}
                      >
                        {item.product}
                      </span>
                      <span className="nh-feed-time">{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Grid — 2 colunas */}
        <div className="nexus-home__bottom-grid">

          {/* Eficiência + Sparkline juntos */}
          <div className="nh-card">
            <div className="nh-card__title">Eficiência por Produto</div>
            {efficiency.map(item => (
              <div key={item.name} className="nh-eff-row">
                <span className="nh-eff-name">{item.name}</span>
                <div className="nh-eff-bar-bg">
                  <div
                    className="nh-eff-bar-fill"
                    style={{ width: `${item.value}%`, background: item.color }}
                  />
                </div>
                <span className="nh-eff-pct">{item.value}%</span>
              </div>
            ))}
            <div className="nh-card__title" style={{ marginTop: 8 }}>Documentos Criados (30D)</div>
            <div className="nh-sparkline-wrap">
              <div className="nh-sparkline">
                {sparkline.map((v, i) => (
                  <div
                    key={i}
                    className="nh-spark-bar"
                    style={{ height: `${(v / sparkMax) * 100}%` }}
                    title={`Dia ${i + 1}: ${v}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Alertas */}
          <div className="nh-card">
            <div className="nh-card__title">Alertas do Ecossistema</div>
            {MOCK_ALERTS.map((alert, i) => (
              <div key={i} className={`nh-alert nh-alert--${alert.type}`}>
                <span className="nh-alert-icon">{ALERT_ICON[alert.type]}</span>
                <div>
                  <div className="nh-alert-text">{alert.text}</div>
                  <div className="nh-alert-sub">{alert.sub}</div>
                </div>
              </div>
            ))}
            <button className="nh-alert-more">O que mais mostrar aqui? ↗</button>
          </div>

        </div>
      </div>
    </div>
  )
}
