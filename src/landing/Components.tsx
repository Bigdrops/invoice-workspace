import { Square, LayoutGrid, Table, Type, ChevronDown, MessageSquare, BarChart } from 'lucide-react'

interface ComponentsProps {
  onNavigateToShell?: () => void
}

const COMPONENTS = [
  { name: 'Button', icon: Square },
  { name: 'Card', icon: LayoutGrid },
  { name: 'Table', icon: Table },
  { name: 'Input', icon: Type },
  { name: 'Select', icon: ChevronDown },
  { name: 'Dialog', icon: MessageSquare },
  { name: 'Chart', icon: BarChart },
]

export function Components({ onNavigateToShell }: ComponentsProps) {
  return (
    <section className="mp-section mp-section-alt" id="components">
      <div className="mp-container">
        <div className="mp-section-label">
          <h2>Components</h2>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigateToShell?.() }}
            style={{ fontFamily: 'var(--mp-font-display)', fontSize: 16, color: 'var(--mp-color-electric)', textDecoration: 'none' }}
          >
            View all →
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 'var(--mp-space-16)' }}>
          {COMPONENTS.map((comp) => {
            const Icon = comp.icon
            return (
              <article
                key={comp.name}
                className="mp-shot"
                tabIndex={0}
                style={{ textAlign: 'center', padding: 'var(--mp-space-32) var(--mp-space-24)' }}
                onClick={(e) => { e.preventDefault(); onNavigateToShell?.() }}
              >
                <div style={{ marginBottom: 'var(--mp-space-16)', color: 'var(--mp-color-electric)' }}>
                  <Icon size={32} />
                </div>
                <h3 className="shot-name" style={{ fontSize: 18 }}>{comp.name}</h3>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
