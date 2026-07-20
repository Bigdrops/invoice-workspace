import { Package } from '@phosphor-icons/react'
import styles from './EmptyState.module.css'

interface EmptyStateProps {
  message?: string
  secondary?: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({
  message = 'No workspaces available.',
  secondary,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className={styles.empty} role="status" aria-live="polite">
      <Package weight="regular" size={48} className={styles.icon} />
      <p className={styles.primary}>{message}</p>
      {secondary && <p className={styles.secondary}>{secondary}</p>}
      {actionLabel && onAction && (
        <button type="button" className={styles.action} onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}
