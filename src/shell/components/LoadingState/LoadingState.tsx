import styles from './LoadingState.module.css'

export function LoadingState() {
  return (
    <div className={styles.grid} role="status" aria-live="polite" aria-label="Loading workspaces">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className={styles.skeleton} aria-hidden="true">
          <div className={styles.skeletonIcon} />
          <div className={`${styles.skeletonLine} ${styles.skeletonLineWide}`} />
          <div className={`${styles.skeletonLine} ${styles.skeletonLineShort}`} />
          <div className={styles.skeletonChip} />
        </div>
      ))}
    </div>
  )
}
