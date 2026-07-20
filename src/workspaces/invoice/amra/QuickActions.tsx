import { useState, useRef, useEffect } from 'react'
import { MoreHorizontal, Save, FileText, Trash2 } from 'lucide-react'

export function QuickActions({ onSave, onClearAll }: { onSave: () => void; onClearAll: () => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }; document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h) }, [])

  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen(!open)} className="amr-btn-icon" style={{ background: open ? 'var(--ink)' : 'transparent', color: open ? 'var(--paper)' : 'var(--ink)', borderRadius: 'var(--radius-btn)' }}>
        <MoreHorizontal size={14} />
      </button>
      {open && (
        <div className="amr-menu" style={{ right: 0, top: '100%', marginTop: '6px', width: '160px' }}>
          <button type="button" className="amr-menu-item" onClick={() => { onSave(); setOpen(false) }}><Save size={11} /> Save</button>
          <button type="button" className="amr-menu-item amr-menu-del" onClick={() => { onClearAll(); setOpen(false) }}><Trash2 size={11} /> Clear All</button>
        </div>
      )}
    </div>
  )
}
