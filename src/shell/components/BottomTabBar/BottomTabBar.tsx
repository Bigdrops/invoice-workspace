import { GridFour, GearSix } from '@phosphor-icons/react'
import styles from './BottomTabBar.module.css'

export type TabId = 'gallery' | 'settings'

interface BottomTabBarProps {
  active: TabId
  onTabChange: (tab: TabId) => void
}

export function BottomTabBar({ active, onTabChange }: BottomTabBarProps) {
  return (
    <nav className={styles.tabbar} role="tablist" aria-label="Main navigation">
      <div className={styles.tabbarInner}>
        <button
          type="button"
          role="tab"
          aria-selected={active === 'gallery'}
          className={`${styles.tab} ${active === 'gallery' ? styles.tabActive : ''}`}
          onClick={() => onTabChange('gallery')}
        >
          <GridFour weight={active === 'gallery' ? 'fill' : 'regular'} size={22} />
          <span className={styles.tabLabel}>Home</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={active === 'settings'}
          className={`${styles.tab} ${active === 'settings' ? styles.tabActive : ''}`}
          onClick={() => onTabChange('settings')}
        >
          <GearSix weight={active === 'settings' ? 'fill' : 'regular'} size={22} />
          <span className={styles.tabLabel}>Settings</span>
        </button>
      </div>
    </nav>
  )
}
