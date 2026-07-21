import { AppWindow } from '../../components/AppWindow/AppWindow'
import { SidebarNav, SidebarItem } from '../../components/SidebarNav/SidebarNav'

interface SettingsProps {
  workspaceCount: number
  onBack: () => void
}

export function Settings({ workspaceCount, onBack }: SettingsProps) {
  return (
    <AppWindow title="settings.mdx" sidebar={
      <SidebarNav>
        <SidebarItem label="Workspaces" onClick={onBack} />
        <SidebarItem label="Settings" active onClick={() => {}} />
      </SidebarNav>
    }>
      <p className="shell-micro" style={{ marginBottom: 'var(--shell-spacing-20)' }}>
        Preferences
      </p>

      <div style={{
        border: '1px solid var(--shell-color-border)',
        borderRadius: 'var(--shell-radius-sm)',
        overflow: 'hidden',
      }}>
        <Row label="Workspaces" value={String(workspaceCount)} />
        <Divider />
        <Row label="Version" value="0.1.0" />
        <Divider />
        <Row label="Product" value="BGD UI" />
      </div>

      <p style={{
        marginTop: 'var(--shell-spacing-20)',
        fontSize: 'var(--shell-text-caption)',
        color: 'var(--shell-color-text-muted)',
        textAlign: 'center',
      }}>
        BGD UI · Offline-first mobile UI library
      </p>
    </AppWindow>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 'var(--shell-spacing-12) var(--shell-spacing-16)',
    }}>
      <span style={{ fontSize: 'var(--shell-text-caption)', color: 'var(--shell-color-text)' }}>
        {label}
      </span>
      <span style={{ fontSize: 'var(--shell-text-caption)', color: 'var(--shell-color-text-muted)' }}>
        {value}
      </span>
    </div>
  )
}

function Divider() {
  return <div style={{ height: 1, background: 'var(--shell-color-border)', margin: '0 var(--shell-spacing-16)' }} />
}
