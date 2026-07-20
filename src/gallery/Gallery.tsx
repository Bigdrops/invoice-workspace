import { ArrowRight, Layers } from 'lucide-react'

interface WorkspaceEntry {
  id: string
  name: string
  theme: string
  description: string
}

interface GalleryProps {
  workspaces: WorkspaceEntry[]
  onSelect: (id: string) => void
}

export function Gallery({ workspaces, onSelect }: GalleryProps) {
  return (
    <div style={{ minHeight: '100vh', background: '#f6f6f6', fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid #e5e5e5', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#141414', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Layers size={14} color="#ffffff" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '14px', color: '#141414', letterSpacing: '-0.01em' }}>BIGDROPS</span>
          </div>
          <span style={{ fontSize: '12px', color: '#a9a9ac', letterSpacing: '0.025em' }}>Workspaces</span>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px 80px' }}>
        {/* Hero */}
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontSize: '40px', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.025em', color: '#141414', marginBottom: '8px' }}>
            Invoice Workspaces
          </h1>
          <p style={{ fontSize: '16px', lineHeight: 1.5, color: '#6d6d70', maxWidth: '520px' }}>
            Production-ready invoice implementations. Each workspace explores a unique design language. Browse, study, copy, and reuse.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '32px', marginBottom: '40px', padding: '20px 24px', background: '#ffffff', borderRadius: '12px', border: '1px solid #e5e5e5' }}>
          <div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#141414', lineHeight: 1 }}>{workspaces.length}</div>
            <div style={{ fontSize: '12px', color: '#a9a9ac', marginTop: '4px', letterSpacing: '0.025em' }}>Workspaces</div>
          </div>
          <div style={{ width: '1px', background: '#e5e5e5' }} />
          <div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#141414', lineHeight: 1 }}>3</div>
            <div style={{ fontSize: '12px', color: '#a9a9ac', marginTop: '4px', letterSpacing: '0.025em' }}>Design Languages</div>
          </div>
          <div style={{ width: '1px', background: '#e5e5e5' }} />
          <div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#141414', lineHeight: 1 }}>1</div>
            <div style={{ fontSize: '12px', color: '#a9a9ac', marginTop: '4px', letterSpacing: '0.025em' }}>Business Domain</div>
          </div>
        </div>

        {/* Section label */}
        <div style={{ marginBottom: '16px' }}>
          <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' as const, color: '#a9a9ac' }}>Available</span>
        </div>

        {/* Workspace cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
          {workspaces.map((ws) => (
            <button
              key={ws.id}
              type="button"
              onClick={() => onSelect(ws.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '24px',
                background: '#ffffff',
                border: '1px solid #e5e5e5',
                borderRadius: '12px',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                transition: 'border-color 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#38383a'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e5e5'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' as const, color: '#8d2676', background: '#f7f1ff', padding: '3px 8px', borderRadius: '4px' }}>
                    Invoice
                  </span>
                  <span style={{ fontSize: '10px', color: '#a9a9ac', letterSpacing: '0.025em' }}>v1.0</span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#141414', lineHeight: 1.3, marginBottom: '6px' }}>
                  {ws.name}
                </h3>
                <p style={{ fontSize: '13px', lineHeight: 1.5, color: '#6d6d70', marginBottom: '4px' }}>
                  {ws.description}
                </p>
                <span style={{ fontSize: '11px', color: '#a9a9ac', letterSpacing: '0.025em' }}>
                  {ws.theme}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e5e5' }}>
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#141414' }}>Open Workspace</span>
                <ArrowRight size={14} color="#141414" />
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e5e5e5', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: '#a9a9ac', letterSpacing: '0.025em' }}>© BIGDROPS 2026</span>
          <span style={{ fontSize: '11px', color: '#a9a9ac', letterSpacing: '0.025em' }}>Invoice Workspace Collection</span>
        </div>
      </footer>
    </div>
  )
}
