import { Menu } from 'lucide-react'

interface HeaderProps {
  onNavigateToShell?: () => void
}

export function Header({ onNavigateToShell }: HeaderProps) {
  return (
    <header className="bgd-header">
      <div className="bgd-header__inner">
        <a href="/" className="bgd-header__brand">
          <div className="bgd-header__logo">B</div>
          BGD
        </a>

        <nav className="bgd-header__nav">
          <a href="#workspaces" className="bgd-header__link bgd-header__link--active">Workspaces</a>
          <a href="#components" className="bgd-header__link">Components</a>
          <a href="#docs" className="bgd-header__link">Docs</a>
          <a href="https://github.com" className="bgd-header__link" target="_blank" rel="noopener noreferrer">GitHub</a>
          <button className="bgd-header__cta" onClick={onNavigateToShell}>
            Open Shell
          </button>
        </nav>

        <button className="bgd-header__mobile-toggle" aria-label="Menu">
          <Menu size={20} />
        </button>
      </div>
    </header>
  )
}
