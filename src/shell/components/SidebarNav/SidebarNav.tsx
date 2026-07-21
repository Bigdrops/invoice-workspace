import type { ReactNode } from 'react'
import styles from './SidebarNav.module.css'

interface SidebarNavProps {
  children: ReactNode
}

export function SidebarNav({ children }: SidebarNavProps) {
  return <nav className={styles.nav}>{children}</nav>
}

interface SidebarItemProps {
  label: string
  active?: boolean
  onClick: () => void
  icon?: ReactNode
}

export function SidebarItem({ label, active, onClick, icon }: SidebarItemProps) {
  return (
    <button
      type="button"
      className={`${styles.item} ${active ? styles.active : ''}`}
      onClick={onClick}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{label}</span>
    </button>
  )
}
