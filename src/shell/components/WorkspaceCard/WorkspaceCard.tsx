import styles from './WorkspaceCard.module.css'

interface WorkspaceCardProps {
  name: string
  description: string
  onClick: () => void
  tag?: string
  tagColor?: 'green' | 'orange' | 'blue' | 'amber'
}

const tagColorMap = {
  green: '#22c55e',
  orange: 'var(--shell-color-accent)',
  blue: '#3b82f6',
  amber: '#f59e0b',
}

export function WorkspaceCard({ name, description, onClick, tag, tagColor = 'green' }: WorkspaceCardProps) {
  return (
    <button type="button" className={styles.card} onClick={onClick}>
      <div className={styles.header}>
        <span className={styles.name}>{name}</span>
        {tag && (
          <span className={styles.tag} style={{ background: tagColorMap[tagColor] }}>
            {tag}
          </span>
        )}
      </div>
      <p className={styles.description}>{description}</p>
    </button>
  )
}
