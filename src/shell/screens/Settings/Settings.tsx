import type { ThemeMode } from '../../types'
import { TopBar } from '../../components/TopBar/TopBar'
import { BottomTabBar } from '../../components/BottomTabBar/BottomTabBar'
import styles from './Settings.module.css'

interface SettingsProps {
  themeMode: ThemeMode
  onThemeChange: (mode: ThemeMode) => void
  workspaceCount: number
  onBack: () => void
}

export function Settings({ themeMode, onThemeChange, workspaceCount, onBack }: SettingsProps) {
  const isDark = themeMode === 'dark'

  return (
    <>
      <TopBar title="Settings" showBack onBack={onBack} />

      <main className={styles.settings}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Appearance</div>
          <div className={styles.list}>
            <button
              type="button"
              className={styles.listItem}
              onClick={() => onThemeChange(isDark ? 'light' : 'dark')}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              <span className={styles.listItemLabel}>Dark mode</span>
              <div className={`${styles.toggle} ${isDark ? styles.toggleActive : ''}`}>
                <div className={styles.toggleKnob} />
              </div>
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Workspaces</div>
          <div className={styles.list}>
            <div className={styles.listItem}>
              <span className={styles.listItemLabel}>Total workspaces</span>
              <span className={styles.listItemValue}>{workspaceCount}</span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>About</div>
          <div className={styles.list}>
            <div className={styles.listItem}>
              <span className={styles.listItemLabel}>Version</span>
              <span className={styles.listItemValue}>0.1.0</span>
            </div>
            <div className={styles.listItem}>
              <span className={styles.listItemLabel}>Product</span>
              <span className={styles.listItemValue}>BGD UI</span>
            </div>
          </div>
        </div>

        <div className={styles.appInfo}>
          <div className={styles.appVersion}>BGD UI — Offline-first mobile UI library</div>
        </div>
      </main>

      <BottomTabBar active="settings" onTabChange={(tab) => {
        if (tab === 'gallery') onBack()
      }} />
    </>
  )
}
