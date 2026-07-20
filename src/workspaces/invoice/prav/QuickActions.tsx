import { useState, useRef, useEffect } from 'react'
import { MoreHorizontal, Save, FileText, Link } from 'lucide-react'

interface QuickActionsProps {
  onSave: () => void
  onCancel: () => void
  onClearAll: () => void
  onScrollToAdditional: () => void
}

export function QuickActions({
  onSave,
  onCancel,
  onClearAll,
  onScrollToAdditional,
}: QuickActionsProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const actions = [
    { label: 'Save Changes', icon: Save, onClick: () => { onSave(); setOpen(false) } },
    { label: 'Cancel', icon: FileText, onClick: () => { onCancel(); setOpen(false) } },
    { label: 'Notes & Terms', icon: FileText, onClick: () => { onScrollToAdditional(); setOpen(false) } },
  ]

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="btn-icon"
        style={{
          background: open ? 'var(--ink-black)' : 'transparent',
          color: open ? 'var(--parchment)' : 'var(--ink-black)',
          borderRadius: 'var(--radius)',
          width: '32px',
          height: '32px',
        }}
      >
        <MoreHorizontal size={14} />
      </button>

      {open && (
        <div className="context-menu" style={{ right: 0, top: '100%', marginTop: '6px', width: '160px' }}>
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={action.onClick}
              className="context-menu-item"
              style={{ fontSize: '12px', padding: '6px 10px' }}
            >
              <action.icon size={12} />
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
