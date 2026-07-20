import { useState, lazy, Suspense } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Gallery } from './gallery'

const PRAVInvoice = lazy(() => import('./workspaces/invoice/prav/InvoiceWorkspace'))
const SackvilleInvoice = lazy(() => import('./workspaces/invoice/sackville/InvoiceWorkspace'))
const AMRAInvoice = lazy(() => import('./workspaces/invoice/amra/InvoiceWorkspace'))

interface WorkspaceEntry {
  id: string
  name: string
  theme: string
  description: string
  component: React.LazyExoticComponent<React.ComponentType>
  themeClass: string
}

const WORKSPACES: WorkspaceEntry[] = [
  {
    id: 'invoice-prav',
    name: 'PRAV',
    theme: 'Pravah',
    description: 'Engineering dossier — warm parchment, ink-black hierarchy, 4px radius',
    component: PRAVInvoice,
    themeClass: 'pav-root',
  },
  {
    id: 'invoice-sackville',
    name: 'Sackville',
    theme: 'Sackville & Co.',
    description: 'Editorial risograph — cream paper, cobalt ink, oval outlined actions',
    component: SackvilleInvoice,
    themeClass: 'sak-root',
  },
  {
    id: 'invoice-amra',
    name: 'AMRA',
    theme: 'Amra',
    description: 'Monochrome minimal — white canvas, lavender accent, 44px radius',
    component: AMRAInvoice,
    themeClass: 'amr-root',
  },
]

function LoadingFallback() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f1ed' }}>
      <div style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '13px', color: '#aaaaaa' }}>Loading workspace...</div>
    </div>
  )
}

export default function App() {
  const [activeId, setActiveId] = useState<string | null>(null)

  const active = WORKSPACES.find((w) => w.id === activeId)

  if (!active) {
    return <Gallery workspaces={WORKSPACES} onSelect={setActiveId} />
  }

  const WorkspaceComponent = active.component

  return (
    <div className={active.themeClass}>
      {/* Back button */}
      <button
        type="button"
        onClick={() => setActiveId(null)}
        style={{
          position: 'fixed',
          top: '12px',
          left: '12px',
          zIndex: 60,
          width: '36px',
          height: '36px',
          borderRadius: active.themeClass === 'amr-root' ? '8px' : '50%',
          border: '1px solid',
          borderColor: active.themeClass === 'sak-root' ? 'var(--cobalt)' : active.themeClass === 'amr-root' ? 'var(--veil)' : 'var(--bone)',
          background: active.themeClass === 'sak-root' ? 'var(--cream)' : active.themeClass === 'amr-root' ? 'var(--paper)' : 'var(--parchment)',
          color: active.themeClass === 'sak-root' ? 'var(--cobalt)' : active.themeClass === 'amr-root' ? 'var(--ink)' : 'var(--ink-black)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.15s',
        }}
        title="Back to gallery"
      >
        <ArrowLeft size={16} />
      </button>

      <Suspense fallback={<LoadingFallback />}>
        <WorkspaceComponent />
      </Suspense>
    </div>
  )
}
