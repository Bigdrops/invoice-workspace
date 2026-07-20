import { useState, useRef, useEffect, useCallback } from 'react'
import { MoreHorizontal, Save, FileText, Trash2 } from 'lucide-react'

export function QuickActions({ onSave, onClearAll }: { onSave: () => void; onClearAll: () => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen(!open)} className="sack-btn sack-btn-sm sack-btn-dark" style={{ padding: '5px 10px' }}>
        <MoreHorizontal size={14} />
      </button>
      {open && (
        <div className="sack-menu" style={{ right: 0, top: '100%', marginTop: '6px', width: '150px' }}>
          <button type="button" className="sack-menu-item" onClick={() => { onSave(); setOpen(false) }}><Save size={11} /> Save</button>
          <button type="button" className="sack-menu-item sack-menu-item-destructive" onClick={() => { onClearAll(); setOpen(false) }}><Trash2 size={11} /> Clear All</button>
        </div>
      )}
    </div>
  )
}
