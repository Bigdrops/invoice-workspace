import {
  Receipt,
  Users,
  Package,
  FileText,
  Folder,
  GridFour,
  type IconProps,
} from '@phosphor-icons/react'
import type { ComponentType } from 'react'
import styles from './WorkspaceCard.module.css'

const iconMap: Record<string, ComponentType<IconProps>> = {
  receipt: Receipt,
  users: Users,
  package: Package,
  'file-text': FileText,
  folder: Folder,
  grid: GridFour,
}

interface WorkspaceCardProps {
  name: string
  description: string
  icon: string
  category: string
  onClick: () => void
}

export function WorkspaceCard({ name, description, icon, category, onClick }: WorkspaceCardProps) {
  const Icon = iconMap[icon] || GridFour

  return (
    <button
      type="button"
      className={styles.card}
      onClick={onClick}
      aria-label={`${name} workspace`}
    >
      <div>
        <div className={styles.cardTop}>
          <div className={styles.iconWrap}>
            <Icon weight="regular" />
          </div>
        </div>
        <div className={styles.name}>{name}</div>
        <div className={styles.description}>{description}</div>
        <span className={styles.chip}>{category}</span>
      </div>
    </button>
  )
}
