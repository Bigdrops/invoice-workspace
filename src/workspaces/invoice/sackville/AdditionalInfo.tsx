import { useState } from 'react'
import { ChevronDown, Plus, Trash2 } from 'lucide-react'

function Expand({ title, children, open: d = false }: { title: string; children: React.ReactNode; open?: boolean }) {
  const [open, setOpen] = useState(d)
  return (
    <div style={{ borderBottom: '1px solid rgba(35,31,32,0.1)' }}>
      <button type="button" onClick={() => setOpen(!open)} className="w-full text-left flex items-center justify-between" style={{ padding: '10px 16px', background: 'transparent', border: 'none', cursor: 'pointer' }}>
        <span style={{ fontWeight: 400, fontSize: '12px' }}>{title}</span>
        <ChevronDown size={11} style={{ color: 'var(--mid)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>
      {open && <div style={{ padding: '0 16px 12px', animation: 'sack-fade-in 0.2s ease-out' }}>{children}</div>}
    </div>
  )
}

export function AdditionalInfo({ notes, onUpdate }: { notes: string; onUpdate: (v: string) => void }) {
  return (
    <div className="sack-card" style={{ overflow: 'hidden' }}>
      <div style={{ padding: '10px 16px 6px' }}>
        <span className="sack-tag sack-tag-cobalt">Notes</span>
      </div>
      <Expand title="Notes & Terms">
        <textarea value={notes} onChange={(e) => onUpdate(e.target.value)} placeholder="Additional notes, terms, or conditions..." rows={4} className="sack-textarea" />
      </Expand>
    </div>
  )
}
