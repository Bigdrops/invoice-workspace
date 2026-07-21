import { BookOpen, Code, Layers, Zap, Search, ArrowRight, ChevronRight } from 'lucide-react'
import './styles.css'

const GUIDES = [
  { title: 'Getting Started', description: 'Install BGD and set up your first project in minutes.', icon: Zap },
  { title: 'Installation', description: 'Step-by-step guide to installing BGD in your project.', icon: Code },
  { title: 'Components', description: 'Browse the full component library with live examples.', icon: Layers },
  { title: 'Theming', description: 'Customize colors, typography, and spacing to match your brand.', icon: BookOpen },
]

const PAGES = [
  { title: 'Quick Start', category: 'Introduction' },
  { title: 'Installation', category: 'Introduction' },
  { title: 'Project Structure', category: 'Introduction' },
  { title: 'Button', category: 'Components' },
  { title: 'Card', category: 'Components' },
  { title: 'Table', category: 'Components' },
  { title: 'Form', category: 'Components' },
  { title: 'Theming', category: 'Customization' },
  { title: 'Dark Mode', category: 'Customization' },
  { title: 'Typography', category: 'Customization' },
]

export function DocsPage() {
  return (
    <div className="docs-page">
      <div className="docs-page__header">
        <h1 className="docs-page__title">Documentation</h1>
        <p className="docs-page__subtitle">
          Everything you need to build with BGD UI.
        </p>
      </div>

      <div className="docs-page__search">
        <Search size={18} />
        <input type="text" placeholder="Search documentation..." />
      </div>

      <div className="docs-page__guides">
        {GUIDES.map((guide) => {
          const Icon = guide.icon
          return (
            <a key={guide.title} href="#" className="guide-card">
              <div className="guide-card__icon">
                <Icon size={24} />
              </div>
              <h3 className="guide-card__title">{guide.title}</h3>
              <p className="guide-card__desc">{guide.description}</p>
              <span className="guide-card__action">
                Read more <ArrowRight size={14} />
              </span>
            </a>
          )
        })}
      </div>

      <div className="docs-page__pages">
        <h2 className="docs-page__pages-title">Popular Pages</h2>
        <div className="docs-page__pages-list">
          {PAGES.map((page) => (
            <a key={page.title} href="#" className="page-link">
              <div className="page-link__content">
                <span className="page-link__category">{page.category}</span>
                <span className="page-link__title">{page.title}</span>
              </div>
              <ChevronRight size={16} className="page-link__arrow" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
