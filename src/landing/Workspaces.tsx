import { FileText, Users, BarChart3 } from 'lucide-react'

interface WorkspacesProps {
  onNavigateToShell?: () => void
}

const WORKSPACES = [
  {
    name: 'Invoice',
    description: 'Professional invoicing with line items, totals, and PDF export.',
    tags: ['Finance', 'PDF'],
    icon: FileText,
  },
  {
    name: 'CRM',
    description: 'Customer relationship management with pipeline tracking.',
    tags: ['Sales', 'Pipeline'],
    icon: Users,
  },
  {
    name: 'Admin',
    description: 'Dashboard analytics with charts, tables, and user management.',
    tags: ['Analytics', 'Dashboard'],
    icon: BarChart3,
  },
]

export function Workspaces({ onNavigateToShell }: WorkspacesProps) {
  return (
    <section className="mp-section" id="workspaces">
      <div className="mp-container">
        <div className="mp-section-label">
          <h2>Workspaces</h2>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigateToShell?.() }}
            style={{ fontFamily: 'var(--mp-font-display)', fontSize: 16, color: 'var(--mp-color-electric)', textDecoration: 'none' }}
          >
            View all →
          </a>
        </div>

        <div className="mp-shot-grid">
          {WORKSPACES.map((ws) => {
            const Icon = ws.icon
            return (
              <article
                key={ws.name}
                className="mp-shot"
                tabIndex={0}
                onClick={(e) => { e.preventDefault(); onNavigateToShell?.() }}
              >
                <div className="shot-preview" style={{ '--shot-bg': 'var(--mp-color-chalk)', '--shot-accent': 'var(--mp-color-electric)' } as React.CSSProperties}>
                  <div style={{ margin: 'auto', color: 'var(--mp-color-electric)' }}>
                    <Icon size={48} />
                  </div>
                </div>
                <div className="shot-meta">
                  <h3 className="shot-name">{ws.name}</h3>
                  <p className="shot-domain">{ws.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
