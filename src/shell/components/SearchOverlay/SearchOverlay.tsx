import { useRef, useState, useEffect, useCallback } from 'react'
import { MagnifyingGlass, X, GridFour } from '@phosphor-icons/react'
import type { ShellWorkspace } from '../../types'
import styles from './SearchOverlay.module.css'

interface SearchOverlayProps {
  workspaces: ShellWorkspace[]
  onSelect: (id: string) => void
  onClose: () => void
}

export function SearchOverlay({ workspaces, onSelect, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const filtered = query.trim()
    ? workspaces.filter(
        (w) =>
          w.name.toLowerCase().includes(query.toLowerCase()) ||
          w.category.toLowerCase().includes(query.toLowerCase()),
      )
    : workspaces

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  return (
    <div className={styles.overlay} role="dialog" aria-label="Search workspaces" onKeyDown={handleKeyDown}>
      <div className={styles.searchHeader}>
        <MagnifyingGlass weight="regular" size={20} className={styles.searchIcon} />
        <input
          ref={inputRef}
          type="text"
          className={styles.searchInput}
          placeholder="Search workspaces..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search workspaces"
        />
        <button type="button" className={styles.cancelBtn} onClick={onClose} aria-label="Cancel search">
          Cancel
        </button>
      </div>

      <div className={styles.results} role="listbox" aria-label="Search results">
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <X weight="regular" size={48} className={styles.emptyIcon} />
            <p className={styles.emptyText}>No workspaces match your search.</p>
          </div>
        ) : (
          filtered.map((ws) => (
            <button
              key={ws.id}
              type="button"
              className={styles.resultItem}
              role="option"
              onClick={() => onSelect(ws.id)}
              aria-label={`${ws.name} — ${ws.category}`}
            >
              <div className={styles.resultIcon}>
                <GridFour weight="regular" size={16} />
              </div>
              <div className={styles.resultInfo}>
                <div className={styles.resultName}>{ws.name}</div>
                <div className={styles.resultCategory}>{ws.category}</div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
