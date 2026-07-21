import { FileText, Users, BarChart3, ArrowRight } from 'lucide-react'

interface WorkspacesProps {
  onNavigateToShell?: () => void
}

const WORKSPACES = [
  {
    name: 'Invoice',
    description: 'Professional invoicing with line items, totals, and PDF export.',
    tags: ['Finance', 'PDF'],
    status: 'active',
    icon: FileText,
  },
  {
    name: 'CRM',
    description: 'Customer relationship management with pipeline tracking.',
    tags: ['Sales', 'Pipeline'],
    status: 'active',
    icon: Users,
  },
  {
    name: 'Admin',
    description: 'Dashboard analytics with charts, tables, and user management.',
    tags: ['Analytics', 'Dashboard'],
    status: 'active',
    icon: BarChart3,
  },
]

export function Workspaces({ onNavigateToShell }: WorkspacesProps) {
  return (
    <section className="bgd-section" id="workspaces">
      <div className="bgd-section__inner">
        <div className="bgd-section__header">
          <h2 className="bgd-section__title">Workspaces</h2>
          <a href="#" className="bgd-section__link" onClick={(e) => { e.preventDefault(); onNavigateToShell?.() }}>
            View all →
          </a>
        </div>

        <div className="bgd-workspaces__grid">
          {WORKSPACES.map((ws) => {
            const Icon = ws.icon
            return (
              <a
                key={ws.name}
                href="#"
                className="bgd-workspace-card"
                onClick={(e) => { e.preventDefault(); onNavigateToShell?.() }}
              >
                <div className="bgd-workspace-card__preview">
                  <Icon size={48} className="bgd-workspace-card__preview-icon" />
                </div>
                <h3 className="bgd-workspace-card__name">{ws.name}</h3>
                <p className="bgd-workspace-card__desc">{ws.description}</p>
                <div className="bgd-workspace-card__tags">
                  {ws.tags.map((tag) => (
                    <span key={tag} className="bgd-tag">{tag}</span>
                  ))}
                </div>
                <div className="bgd-workspace-card__footer">
                  <span className="bgd-workspace-card__status">
                    <span className="bgd-workspace-card__status-dot" />
                    {ws.status}
                  </span>
                  <span className="bgd-workspace-card__action">
                    Preview Workspace <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
