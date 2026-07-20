import { ArrowLeft, MagnifyingGlass, CaretLeft } from '@phosphor-icons/react'
import styles from './TopBar.module.css'

interface TopBarProps {
  title?: string
  showBack?: boolean
  onBack?: () => void
  onSearch?: () => void
  actions?: React.ReactNode
}

export function TopBar({ title, showBack, onBack, onSearch, actions }: TopBarProps) {
  return (
    <header className={styles.topbar} role="banner">
      <div className={styles.topbarInner}>
        <div className={styles.left}>
          {showBack && (
            <button
              type="button"
              className={styles.backBtn}
              onClick={onBack}
              aria-label="Go back"
            >
              <CaretLeft weight="regular" size={20} />
            </button>
          )}
          {title && <h1 className={styles.title}>{title}</h1>}
        </div>
        <div className={styles.right}>
          {actions}
          {onSearch && (
            <button
              type="button"
              className={styles.iconBtn}
              onClick={onSearch}
              aria-label="Search workspaces"
            >
              <MagnifyingGlass weight="regular" size={20} />
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
