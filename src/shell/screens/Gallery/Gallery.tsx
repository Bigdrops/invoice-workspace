import { ChevronRight, ArrowLeft, Settings } from 'lucide-react'
import type { ShellTopic, ShellWorkspace, ThemeMode } from '../../types'
import { AppWindow } from '../../components/AppWindow/AppWindow'
import { SidebarNav, SidebarItem } from '../../components/SidebarNav/SidebarNav'
import { WorkspaceCard } from '../../components/WorkspaceCard/WorkspaceCard'
import { EmptyState } from '../../components/EmptyState/EmptyState'
import { LoadingState } from '../../components/LoadingState/LoadingState'

interface GalleryProps {
  topics: ShellTopic[]
  workspaces: ShellWorkspace[]
  loading?: boolean
  themeMode: ThemeMode
  resolved: 'light' | 'dark'
  onToggleTheme: () => void
  onSelectTopic: (topicId: string) => void
  onSelectWorkspace: (id: string) => void
  onOpenSettings: () => void
  onBackToTopics: () => void
  activeTopicId: string | null
}

export function Gallery({
  topics,
  workspaces,
  loading,
  onSelectTopic,
  onSelectWorkspace,
  onOpenSettings,
  onBackToTopics,
  activeTopicId,
}: GalleryProps) {
  if (activeTopicId) {
    const topic = topics.find((t) => t.id === activeTopicId)
    if (!topic) return null

    return (
      <AppWindow title={`${topic.name}.workspace`}>
        <div style={{ marginBottom: 'var(--shell-spacing-24)' }}>
          <button
            type="button"
            className="shell-link"
            onClick={onBackToTopics}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--shell-spacing-8)' }}
          >
            <ArrowLeft size={16} />
            All workspaces
          </button>
        </div>
        <p className="shell-micro" style={{ marginBottom: 'var(--shell-spacing-20)' }}>
          {topic.workspaces.length} workspace{topic.workspaces.length !== 1 ? 's' : ''}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 'var(--shell-spacing-16)' }}>
          {topic.workspaces.map((entry) => {
            const ws = workspaces.find((w) => w.id === entry.id)
            return (
              <WorkspaceCard
                key={entry.id}
                name={entry.name}
                description={entry.description || ''}
                onClick={() => onSelectWorkspace(entry.id)}
                tag={ws?.status === 'active' ? 'Active' : undefined}
                tagColor={ws?.status === 'active' ? 'green' : 'amber'}
              />
            )
          })}
        </div>
      </AppWindow>
    )
  }

  return (
    <AppWindow title="workspaces.mdx" sidebar={
      <SidebarNav>
        <SidebarItem label="All Workspaces" active onClick={() => {}} />
        <SidebarItem label="Settings" icon={<Settings size={16} />} onClick={onOpenSettings} />
      </SidebarNav>
    }>
      <p className="shell-micro" style={{ marginBottom: 'var(--shell-spacing-24)' }}>
        {topics.reduce((s, t) => s + t.workspaces.length, 0)} total
      </p>

      {loading ? (
        <LoadingState />
      ) : topics.length === 0 ? (
        <EmptyState />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--shell-spacing-12)' }}>
          {topics.map((topic) => (
            <button
              key={topic.id}
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: 'var(--shell-spacing-20) var(--shell-spacing-24)',
                border: '1px solid var(--shell-color-border)',
                borderRadius: 'var(--shell-radius-lg)',
                background: 'var(--shell-color-surface)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'border-color var(--shell-transition), background var(--shell-transition)',
              }}
              onClick={() => onSelectTopic(topic.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--shell-color-surface-alt)'
                e.currentTarget.style.borderColor = 'var(--shell-color-accent)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--shell-color-surface)'
                e.currentTarget.style.borderColor = 'var(--shell-color-border)'
              }}
            >
              <span style={{
                fontFamily: 'var(--shell-font-display)',
                fontSize: 'var(--shell-text-heading)',
                fontWeight: 'var(--shell-font-weight)',
                color: 'var(--shell-color-text)',
                letterSpacing: '0.02em',
              }}>
                {topic.name}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--shell-spacing-12)' }}>
                <span className="shell-caption">{topic.workspaces.length}</span>
                <ChevronRight size={16} style={{ color: 'var(--shell-color-text-muted)' }} />
              </div>
            </button>
          ))}
        </div>
      )}
    </AppWindow>
  )
}
