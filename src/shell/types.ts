export interface ShellWorkspace {
  id: string
  name: string
  description: string
  icon: string
  category: string
  status: 'active' | 'draft' | 'archived'
  component: React.LazyExoticComponent<React.ComponentType>
  themeClass: string
}

export type ThemeMode = 'light' | 'dark' | 'system'

export type ShellScreen = 'gallery' | 'settings' | 'workspace'
