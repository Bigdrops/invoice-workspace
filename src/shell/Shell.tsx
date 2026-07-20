import { useState, useCallback, lazy, Suspense } from 'react'
import type { ShellWorkspace, ThemeMode } from './types'
import { useTheme } from './hooks/useTheme'
import { Gallery } from './screens/Gallery/Gallery'
import { Settings } from './screens/Settings/Settings'
import { TopBar } from './components/TopBar/TopBar'
import { BottomTabBar } from './components/BottomTabBar/BottomTabBar'

import './styles/tokens.css'
import './styles/reset.css'
import './styles/typography.css'

type ShellScreen = 'gallery' | 'settings' | 'workspace'

interface ShellProps {
  workspaces: ShellWorkspace[]
  loading?: boolean
}

export function Shell({ workspaces, loading }: ShellProps) {
  const { mode, resolved, setMode } = useTheme()
  const [screen, setScreen] = useState<ShellScreen>('gallery')
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string | null>(null)

  const activeWorkspace = activeWorkspaceId
    ? workspaces.find((w) => w.id === activeWorkspaceId)
    : null

  const WorkspaceComponent = activeWorkspace?.component

  const handleSelectWorkspace = useCallback((id: string) => {
    setActiveWorkspaceId(id)
    setScreen('workspace')
  }, [])

  const handleBackToGallery = useCallback(() => {
    setActiveWorkspaceId(null)
    setScreen('gallery')
  }, [])

  const handleOpenSettings = useCallback(() => {
    setScreen('settings')
  }, [])

  return (
    <div className="bgd-shell" data-theme={resolved}>
      {screen === 'workspace' && WorkspaceComponent ? (
        <>
          <TopBar
            title={activeWorkspace?.name}
            showBack
            onBack={handleBackToGallery}
          />
          <div style={{ paddingTop: 'var(--shell-topbar-height)' }}>
            <Suspense
              fallback={
                <div
                  style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--shell-color-canvas)',
                  }}
                >
                  <span className="shell-text-body-sm" style={{ color: 'var(--shell-color-text-tertiary)' }}>
                    Loading workspace...
                  </span>
                </div>
              }
            >
              <WorkspaceComponent />
            </Suspense>
          </div>
        </>
      ) : screen === 'settings' ? (
        <Settings
          themeMode={mode}
          onThemeChange={setMode}
          workspaceCount={workspaces.length}
          onBack={handleBackToGallery}
        />
      ) : (
        <Gallery
          workspaces={workspaces}
          loading={loading}
          onSelectWorkspace={handleSelectWorkspace}
          onOpenSettings={handleOpenSettings}
        />
      )}
    </div>
  )
}
