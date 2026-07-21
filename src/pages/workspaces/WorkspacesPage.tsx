import { FileText, Users, BarChart3, ArrowRight, ShoppingCart, Briefcase, Building2 } from 'lucide-react'
import './styles.css'

const WORKSPACES = [
  {
    name: 'Invoice',
    description: 'Professional invoicing with line items, totals, and PDF export. Includes payment tracking and multi-currency support.',
    tags: ['Finance', 'PDF'],
    status: 'active',
    icon: FileText,
    tech: ['React', 'TypeScript', 'Tailwind'],
  },
  {
    name: 'CRM',
    description: 'Customer relationship management with pipeline tracking, contact management, and deal analytics.',
    tags: ['Sales', 'Pipeline'],
    status: 'active',
    icon: Users,
    tech: ['React', 'TypeScript', 'Charts'],
  },
  {
    name: 'Admin',
    description: 'Dashboard analytics with charts, tables, and user management. Real-time data visualization.',
    tags: ['Analytics', 'Dashboard'],
    status: 'active',
    icon: BarChart3,
    tech: ['React', 'D3.js', 'Real-time'],
  },
  {
    name: 'E-Commerce',
    description: 'Full-featured e-commerce platform with product catalog, cart, and checkout flow.',
    tags: ['Commerce', 'Payments'],
    status: 'draft',
    icon: ShoppingCart,
    tech: ['React', 'Stripe', 'Inventory'],
  },
  {
    name: 'Project Manager',
    description: 'Kanban boards, task tracking, and team collaboration tools for project management.',
    tags: ['Tasks', 'Teams'],
    status: 'draft',
    icon: Briefcase,
    tech: ['React', 'DnD', 'Notifications'],
  },
  {
    name: 'Real Estate',
    description: 'Property listings, search filters, and agent management for real estate platforms.',
    tags: ['Listings', 'Search'],
    status: 'archived',
    icon: Building2,
    tech: ['React', 'Maps', 'Filters'],
  },
]

export function WorkspacesPage() {
  return (
    <div className="workspaces-page">
      <div className="workspaces-page__header">
        <h1 className="workspaces-page__title">Workspaces</h1>
        <p className="workspaces-page__subtitle">
          Premium application templates ready to customize and deploy.
        </p>
      </div>

      <div className="workspaces-page__grid">
        {WORKSPACES.map((ws) => {
          const Icon = ws.icon
          return (
            <a key={ws.name} href="#" className="workspace-card">
              <div className="workspace-card__preview">
                <Icon size={48} />
              </div>
              <div className="workspace-card__content">
                <div className="workspace-card__header">
                  <h3 className="workspace-card__name">{ws.name}</h3>
                  <span className={`workspace-card__status workspace-card__status--${ws.status}`}>
                    {ws.status}
                  </span>
                </div>
                <p className="workspace-card__desc">{ws.description}</p>
                <div className="workspace-card__tags">
                  {ws.tags.map((tag) => (
                    <span key={tag} className="workspace-card__tag">{tag}</span>
                  ))}
                </div>
                <div className="workspace-card__footer">
                  <div className="workspace-card__tech">
                    {ws.tech.map((t) => (
                      <span key={t} className="workspace-card__tech-item">{t}</span>
                    ))}
                  </div>
                  <span className="workspace-card__action">
                    Preview <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
