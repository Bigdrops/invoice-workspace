import { useState } from 'react'
import { ChevronDown, Plus, Trash2 } from 'lucide-react'

function Expand({ title, children, open: d = false }: { title: string; children: React.ReactNode; open?: boolean }) {
  const [open, setOpen] = useState(d)
  return (
    <div style={{ borderBottom: '1px solid var(--veil)' }}>
      <button type="button" onClick={() => setOpen(!open)} className="w-full text-left flex items-center justify-between"
        style={{ padding: '14px 20px', background: 'transparent', border: 'none', cursor: 'pointer' }}>
        <span style={{ fontWeight: 400, fontSize: '13px' }}>{title}</span>
        <ChevronDown size={12} style={{ color: 'var(--mist)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>
      {open && <div style={{ padding: '0 20px 16px', animation: 'amr-fade-in 0.2s ease-out' }}>{children}</div>}
    </div>
  )
}

export function AdditionalInfo({ notes, onUpdate }: { notes: string; onUpdate: (v: string) => void }) {
  return (
    <div className="amr-card" style={{ overflow: 'hidden', padding: 0 }}>
      <div style={{ padding: '14px 20px 8px' }}><span className="amr-badge amr-badge-lavender" style={{ fontSize: '9px' }}>Notes</span></div>
      <Expand title="Notes & Terms">
        <textarea value={notes} onChange={(e) => onUpdate(e.target.value)} placeholder="Additional notes, terms, or conditions..." rows={4} className="amr-textarea" />
      </Expand>
    </div>
  )
}
