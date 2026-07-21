import { Home, Grid3X3, FolderOpen, BookOpen, Github } from 'lucide-react'

interface MobileNavProps {
  onNavigateToShell?: () => void
}

export function MobileNav({ onNavigateToShell }: MobileNavProps) {
  return (
    <nav className="bgd-mobile-nav">
      <div className="bgd-mobile-nav__inner">
        <a href="#" className="bgd-mobile-nav__item bgd-mobile-nav__item--active">
          <span className="bgd-mobile-nav__icon">
            <Home size={20} />
          </span>
          Home
        </a>
        <a href="#components" className="bgd-mobile-nav__item">
          <span className="bgd-mobile-nav__icon">
            <Grid3X3 size={20} />
          </span>
          Components
        </a>
        <a href="#workspaces" className="bgd-mobile-nav__item">
          <span className="bgd-mobile-nav__icon">
            <FolderOpen size={20} />
          </span>
          Workspaces
        </a>
        <a href="#docs" className="bgd-mobile-nav__item">
          <span className="bgd-mobile-nav__icon">
            <BookOpen size={20} />
          </span>
          Docs
        </a>
        <a href="https://github.com" className="bgd-mobile-nav__item" target="_blank" rel="noopener noreferrer">
          <span className="bgd-mobile-nav__icon">
            <Github size={20} />
          </span>
          GitHub
        </a>
      </div>
    </nav>
  )
}
