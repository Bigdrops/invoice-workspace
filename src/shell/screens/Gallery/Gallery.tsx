import { useMemo, useState } from 'react'
import type { ShellWorkspace } from '../../types'
import { TopBar } from '../../components/TopBar/TopBar'
import { BottomTabBar } from '../../components/BottomTabBar/BottomTabBar'
import { CategoryFilter } from '../../components/CategoryFilter/CategoryFilter'
import { WorkspaceCard } from '../../components/WorkspaceCard/WorkspaceCard'
import { EmptyState } from '../../components/EmptyState/EmptyState'
import { LoadingState } from '../../components/LoadingState/LoadingState'
import { SearchOverlay } from '../../components/SearchOverlay/SearchOverlay'
import styles from './Gallery.module.css'

interface GalleryProps {
  workspaces: ShellWorkspace[]
  loading?: boolean
  onSelectWorkspace: (id: string) => void
  onOpenSettings: () => void
}

export function Gallery({ workspaces, loading, onSelectWorkspace, onOpenSettings }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchOpen, setSearchOpen] = useState(false)

  const categories = useMemo(() => {
    const cats = new Set(workspaces.map((w) => w.category))
    return Array.from(cats).sort()
  }, [workspaces])

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return workspaces
    return workspaces.filter((w) => w.category === activeCategory)
  }, [workspaces, activeCategory])

  return (
    <>
      <TopBar title="Workspaces" onSearch={() => setSearchOpen(true)} />

      <main className={styles.gallery}>
        {loading ? (
          <LoadingState />
        ) : workspaces.length === 0 ? (
          <EmptyState
            message="No workspaces available."
            secondary="Add a workspace to get started."
          />
        ) : (
          <>
            <CategoryFilter
              categories={categories}
              active={activeCategory}
              onSelect={setActiveCategory}
            />
            <div className={styles.sectionLabel}>Available</div>
            <div className={styles.grid} role="list" aria-label="Workspaces">
              {filtered.map((ws) => (
                <div key={ws.id} role="listitem">
                  <WorkspaceCard
                    name={ws.name}
                    description={ws.description}
                    icon={ws.icon}
                    category={ws.category}
                    onClick={() => onSelectWorkspace(ws.id)}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <BottomTabBar active="gallery" onTabChange={(tab) => {
        if (tab === 'settings') onOpenSettings()
      }} />

      {searchOpen && (
        <SearchOverlay
          workspaces={workspaces}
          onSelect={(id) => {
            setSearchOpen(false)
            onSelectWorkspace(id)
          }}
          onClose={() => setSearchOpen(false)}
        />
      )}
    </>
  )
}
