import type { ReactNode } from 'react'
import styles from './AppWindow.module.css'

interface AppWindowProps {
  children: ReactNode
  title?: string
  sidebar?: ReactNode
}

export function AppWindow({ children, title, sidebar }: AppWindowProps) {
  return (
    <div className={styles.window}>
      <div className={styles.titleBar}>
        <div className={styles.controls}>
          <span className={styles.dot} style={{ background: '#f54e00' }} />
          <span className={styles.dot} style={{ background: '#eb9d2a' }} />
          <span className={styles.dot} style={{ background: '#6aa84f' }} />
        </div>
        {title && <span className={styles.filename}>{title}</span>}
        <div className={styles.spacer} />
      </div>
      <div className={styles.body}>
        {sidebar && <aside className={styles.sidebar}>{sidebar}</aside>}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}
