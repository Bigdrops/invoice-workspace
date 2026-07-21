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
    <section className="bgd-section" id="components">
      <div className="bgd-section__inner">
        <div className="bgd-section__header">
          <h2 className="bgd-section__title">Components</h2>
          <a href="#" className="bgd-section__link" onClick={(e) => { e.preventDefault(); onNavigateToShell?.() }}>
            View all →
          </a>
        </div>

        <div className="bgd-components__grid">
          {COMPONENTS.map((comp) => {
            const Icon = comp.icon
            return (
              <a
                key={comp.name}
                href="#"
                className="bgd-component-card"
                onClick={(e) => { e.preventDefault(); onNavigateToShell?.() }}
              >
                <div className="bgd-component-card__icon">
                  <Icon size={24} />
                </div>
                <span className="bgd-component-card__name">{comp.name}</span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
