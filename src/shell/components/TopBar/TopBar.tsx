import { Sun, Moon } from 'lucide-react'
import styles from './TopBar.module.css'

interface TopBarProps {
  onToggleTheme?: () => void
  themeIsDark?: boolean
  onNavigate?: (page: string) => void
  currentPage?: string
}

export function TopBar({ onToggleTheme, themeIsDark, onNavigate, currentPage }: TopBarProps) {
  return (
    <header className={styles.topbar}>
      <nav className={styles.nav}>
        <a href="/" className={styles.logo}>BGD</a>
        <button
          className={`${styles.navItem} ${currentPage === 'workspaces' ? styles.navItemActive : ''}`}
          onClick={() => onNavigate?.('workspaces')}
        >
          Workspaces
        </button>
        <button
          className={`${styles.navItem} ${currentPage === 'components' ? styles.navItemActive : ''}`}
          onClick={() => onNavigate?.('components')}
        >
          Components
        </button>
        <button
          className={`${styles.navItem} ${currentPage === 'docs' ? styles.navItemActive : ''}`}
          onClick={() => onNavigate?.('docs')}
        >
          Docs
        </button>
      </nav>
      <div className={styles.actions}>
        {onToggleTheme && (
          <button
            type="button"
            className={styles.themeBtn}
            onClick={onToggleTheme}
            aria-label={themeIsDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {themeIsDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        )}
      </div>
    </header>
  )
}
