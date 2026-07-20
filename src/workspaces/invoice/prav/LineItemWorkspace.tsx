import { useState, useCallback, useRef, useEffect } from 'react'
import { Plus, ChevronDown, ChevronRight, Trash2, Copy, ArrowUp, ArrowDown, CornerDownRight, Camera, Type, X, ImagePlus } from 'lucide-react'
import { cn, generateId, formatCurrency } from '@/lib/utils'
import type { LineItem, LineGroup, CustomColumn, UnitType } from '@/types/invoice'
import { createEmptyItem, createEmptyGroup } from '@/lib/mock-data'

interface LineItemWorkspaceProps {
  groups: LineGroup[]
  standaloneItems: LineItem[]
  onUpdateGroups: (groups: LineGroup[]) => void
  onUpdateStandalone: (items: LineItem[]) => void
  customColumns: CustomColumn[]
}

const UNITS: { value: UnitType; label: string }[] = [
  { value: 'pcs', label: 'Pcs' }, { value: 'kg', label: 'Kg' }, { value: 'lb', label: 'Lb' },
  { value: 'hr', label: 'Hr' }, { value: 'day', label: 'Day' }, { value: 'mth', label: 'Mth' },
  { value: 'lot', label: 'Lot' }, { value: 'set', label: 'Set' }, { value: 'box', label: 'Box' },
]

/* ── Image Picker ── */
function ImagePicker({
  value,
  onChange,
}: {
  value?: string
  onChange: (url: string) => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      onChange(ev.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  if (value) {
    return (
      <div style={{ marginTop: '8px', animation: 'fade-in-up 0.2s ease-out' }}>
        <div className="image-picker">
          <img src={value} alt="Item" className="image-picker-preview" />
          <div className="image-picker-info">
            <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--ink-black)' }}>Image selected</div>
            <div style={{ fontSize: '10px', color: 'var(--ash)' }}>Tap to change</div>
          </div>
          <div className="image-picker-actions">
            <button type="button" onClick={() => fileRef.current?.click()} className="btn-icon btn-icon-sm">
              <Camera size={14} />
            </button>
            <button type="button" onClick={() => onChange('')} className="btn-icon btn-icon-sm" style={{ color: '#b91c1c' }}>
              <X size={14} />
            </button>
          </div>
        </div>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
      </div>
    )
  }

  return (
    <div style={{ marginTop: '8px', animation: 'fade-in-up 0.2s ease-out' }}>
      <div className="image-picker" onClick={() => fileRef.current?.click()}>
        <div className="image-picker-empty">
          <ImagePlus size={20} />
        </div>
        <div className="image-picker-info">
          <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--ink-black)' }}>Add photo</div>
          <div style={{ fontSize: '10px', color: 'var(--ash)' }}>Upload or choose image</div>
        </div>
      </div>
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
    </div>
  )
}

/* ── Item Actions (inline) ── */
function ItemActions({
  onInsertBelow,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete,
}: {
  onInsertBelow: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  onDuplicate: () => void
  onDelete: () => void
}) {
  return (
    <div className="action-row">
      <button type="button" onClick={onInsertBelow}>
        <CornerDownRight size={11} /> Insert
      </button>
      <button type="button" onClick={onMoveUp}>
        <ArrowUp size={11} /> Up
      </button>
      <button type="button" onClick={onMoveDown}>
        <ArrowDown size={11} /> Down
      </button>
      <button type="button" onClick={onDuplicate}>
        <Copy size={11} /> Dup
      </button>
      <div className="flex-1" />
      <button type="button" onClick={onDelete} className="action-destructive">
        <Trash2 size={11} />
      </button>
    </div>
  )
}

/* ── Compressed Line Item Card ── */
function LineItemCard({
  item,
  rowNumber,
  onUpdate,
  onInsertBelow,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onRemove,
}: {
  item: LineItem
  rowNumber: number
  onUpdate: (patch: Partial<LineItem>) => void
  onInsertBelow: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  onDuplicate: () => void
  onRemove: () => void
}) {
  const [showSubDesc, setShowSubDesc] = useState(!!item.subDescription)
  const [showPhoto, setShowPhoto] = useState(!!item.imageUrl)
  const lineTotal = item.quantity * item.unitPrice * (1 - (item.discountOverride ?? 0) / 100)

  return (
    <div className="item-card animate-fade-in">
      {/* Row number + Description */}
      <div className="flex items-start gap-2">
        <span style={{
          fontWeight: 700,
          fontSize: '10px',
          color: 'var(--ash)',
          background: 'var(--parchment)',
          borderRadius: 'var(--radius)',
          padding: '2px 5px',
          marginTop: '3px',
          flexShrink: 0,
          fontVariantNumeric: 'tabular-nums',
        }}>
          {rowNumber}
        </span>
        <input
          type="text"
          value={item.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Item description"
          className="input-compact"
          style={{ fontWeight: 700, fontSize: '13px', color: 'var(--ink-black)', padding: '2px 0 3px', flex: 1 }}
        />
      </div>

      {/* Sub-desc + Photo buttons */}
      <div className="flex items-center gap-1" style={{ marginTop: '4px', marginLeft: '24px' }}>
        <button
          type="button"
          onClick={() => setShowSubDesc(!showSubDesc)}
          className={cn('btn-ghost', showSubDesc && 'btn-square')}
          style={{ fontSize: '10px', padding: '2px 8px' }}
        >
          <Type size={10} /> Sub
        </button>
        <button
          type="button"
          onClick={() => setShowPhoto(!showPhoto)}
          className={cn('btn-ghost', showPhoto && 'btn-square')}
          style={{ fontSize: '10px', padding: '2px 8px' }}
        >
          <Camera size={10} /> Photo
        </button>
      </div>

      {/* Sub-description */}
      {showSubDesc && (
        <div style={{ marginTop: '4px', marginLeft: '24px', animation: 'fade-in-up 0.2s ease-out' }}>
          <input
            type="text"
            value={item.subDescription ?? ''}
            onChange={(e) => onUpdate({ subDescription: e.target.value })}
            placeholder="Additional details"
            className="input-compact"
            style={{ fontSize: '12px' }}
          />
        </div>
      )}

      {/* Photo picker */}
      {showPhoto && (
        <div style={{ marginLeft: '24px' }}>
          <ImagePicker value={item.imageUrl} onChange={(url) => onUpdate({ imageUrl: url })} />
        </div>
      )}

      {/* Quantity + Rate */}
      <div className="item-card-row" style={{ marginTop: '8px' }}>
        <div>
          <span className="typo-label" style={{ display: 'block', marginBottom: '2px', fontSize: '9px' }}>Qty</span>
          <input
            type="number"
            value={item.quantity || ''}
            onChange={(e) => onUpdate({ quantity: parseFloat(e.target.value) || 0 })}
            placeholder="0"
            className="input-compact input-compact-right"
          />
        </div>
        <div>
          <span className="typo-label" style={{ display: 'block', marginBottom: '2px', fontSize: '9px' }}>Rate</span>
          <input
            type="number"
            value={item.unitPrice || ''}
            onChange={(e) => onUpdate({ unitPrice: parseFloat(e.target.value) || 0 })}
            placeholder="0.00"
            className="input-compact input-compact-right"
          />
        </div>
      </div>

      {/* Unit + Make */}
      <div className="item-card-row" style={{ marginTop: '6px' }}>
        <div>
          <span className="typo-label" style={{ display: 'block', marginBottom: '2px', fontSize: '9px' }}>Unit</span>
          <select
            value={item.unit}
            onChange={(e) => onUpdate({ unit: e.target.value as UnitType })}
            className="input-compact"
            style={{ fontSize: '12px' }}
          >
            {UNITS.map((u) => (
              <option key={u.value} value={u.value}>{u.label}</option>
            ))}
          </select>
        </div>
        <div>
          <span className="typo-label" style={{ display: 'block', marginBottom: '2px', fontSize: '9px' }}>Make</span>
          <input
            type="text"
            value={item.make ?? ''}
            onChange={(e) => onUpdate({ make: e.target.value })}
            placeholder="—"
            className="input-compact"
            style={{ fontSize: '12px' }}
          />
        </div>
      </div>

      {/* Line Total */}
      <div
        className="flex items-center justify-between"
        style={{ marginTop: '6px', paddingTop: '4px', borderTop: '1px solid var(--bone)' }}
      >
        <span style={{ fontWeight: 700, fontSize: '9px', color: 'var(--ash)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total</span>
        <span style={{ fontWeight: 700, fontSize: '13px', fontVariantNumeric: 'tabular-nums', color: 'var(--ink-black)' }}>
          {formatCurrency(lineTotal)}
        </span>
      </div>

      {/* Actions */}
      <ItemActions
        onInsertBelow={onInsertBelow}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        onDuplicate={onDuplicate}
        onDelete={onRemove}
      />
    </div>
  )
}

/* ── Group Header ── */
function GroupHeader({
  group,
  onUpdate,
  onRemove,
  onAddItem,
  onToggleCollapse,
}: {
  group: LineGroup
  onUpdate: (patch: Partial<LineGroup>) => void
  onRemove: () => void
  onAddItem: () => void
  onToggleCollapse: () => void
}) {
  const subtotal = group.items.reduce((sum, item) =>
    sum + item.quantity * item.unitPrice * (1 - (item.discountOverride ?? 0) / 100), 0
  )

  return (
    <div
      className="flex items-center gap-2"
      style={{
        background: 'var(--parchment)',
        padding: '8px 12px',
        borderRadius: 'var(--radius) var(--radius) 0 0',
        borderBottom: '2px solid var(--ink-black)',
      }}
    >
      <button type="button" onClick={onToggleCollapse} className="btn-icon btn-icon-sm" style={{ color: 'var(--ink-black)', width: '24px', height: '24px' }}>
        {group.collapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
      </button>

      <input
        type="text"
        value={group.title}
        onChange={(e) => onUpdate({ title: e.target.value })}
        placeholder="Group title"
        style={{
          background: 'transparent',
          border: 'none',
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: '12px',
          color: 'var(--ink-black)',
          flex: 1,
          outline: 'none',
          padding: '2px 0',
          minWidth: 0,
        }}
      />

      <span className="badge badge-white" style={{ fontSize: '8px', padding: '1px 6px' }}>
        {group.items.length}
      </span>

      <span style={{ fontWeight: 700, fontSize: '11px', fontVariantNumeric: 'tabular-nums', color: 'var(--ink-black)' }}>
        {formatCurrency(subtotal)}
      </span>

      <button type="button" onClick={onAddItem} className="btn-icon btn-icon-sm" style={{ color: 'var(--ink-black)', width: '24px', height: '24px' }}>
        <Plus size={12} />
      </button>
      <button type="button" onClick={onRemove} className="btn-icon btn-icon-sm" style={{ color: 'var(--ash)', width: '24px', height: '24px' }}>
        <Trash2 size={11} />
      </button>
    </div>
  )
}

/* ── Main Workspace ── */
export function LineItemWorkspace({ groups, standaloneItems, onUpdateGroups, onUpdateStandalone, customColumns }: LineItemWorkspaceProps) {
  let globalRowCounter = 0

  // Standalone operations
  const addStandaloneItem = useCallback(() => {
    onUpdateStandalone([...standaloneItems, createEmptyItem()])
  }, [standaloneItems, onUpdateStandalone])

  const updateStandaloneItem = useCallback((itemId: string, patch: Partial<LineItem>) => {
    onUpdateStandalone(standaloneItems.map((item) => (item.id === itemId ? { ...item, ...patch } : item)))
  }, [standaloneItems, onUpdateStandalone])

  const removeStandaloneItem = useCallback((itemId: string) => {
    onUpdateStandalone(standaloneItems.filter((item) => item.id !== itemId))
  }, [standaloneItems, onUpdateStandalone])

  const insertStandaloneBelow = useCallback((itemId: string) => {
    const idx = standaloneItems.findIndex((item) => item.id === itemId)
    const newItems = [...standaloneItems]
    newItems.splice(idx + 1, 0, createEmptyItem())
    onUpdateStandalone(newItems)
  }, [standaloneItems, onUpdateStandalone])

  const moveStandaloneItem = useCallback((itemId: string, direction: 'up' | 'down') => {
    const idx = standaloneItems.findIndex((item) => item.id === itemId)
    const newIdx = direction === 'up' ? idx - 1 : idx + 1
    if (newIdx < 0 || newIdx >= standaloneItems.length) return
    const newItems = [...standaloneItems]
    ;[newItems[idx], newItems[newIdx]] = [newItems[newIdx], newItems[idx]]
    onUpdateStandalone(newItems)
  }, [standaloneItems, onUpdateStandalone])

  const duplicateStandaloneItem = useCallback((itemId: string) => {
    const idx = standaloneItems.findIndex((item) => item.id === itemId)
    const duplicate = { ...standaloneItems[idx], id: generateId() }
    const newItems = [...standaloneItems]
    newItems.splice(idx + 1, 0, duplicate)
    onUpdateStandalone(newItems)
  }, [standaloneItems, onUpdateStandalone])

  // Group operations
  const addGroup = useCallback(() => {
    onUpdateGroups([...groups, createEmptyGroup()])
  }, [groups, onUpdateGroups])

  const updateGroup = useCallback((groupId: string, patch: Partial<LineGroup>) => {
    onUpdateGroups(groups.map((g) => (g.id === groupId ? { ...g, ...patch } : g)))
  }, [groups, onUpdateGroups])

  const removeGroup = useCallback((groupId: string) => {
    onUpdateGroups(groups.filter((g) => g.id !== groupId))
  }, [groups, onUpdateGroups])

  const addItemToGroup = useCallback((groupId: string) => {
    onUpdateGroups(groups.map((g) =>
      g.id === groupId ? { ...g, items: [...g.items, createEmptyItem(groupId)] } : g
    ))
  }, [groups, onUpdateGroups])

  const updateGroupItem = useCallback((groupId: string, itemId: string, patch: Partial<LineItem>) => {
    onUpdateGroups(groups.map((g) =>
      g.id === groupId
        ? { ...g, items: g.items.map((item) => (item.id === itemId ? { ...item, ...patch } : item)) }
        : g
    ))
  }, [groups, onUpdateGroups])

  const removeGroupItem = useCallback((groupId: string, itemId: string) => {
    onUpdateGroups(groups.map((g) =>
      g.id === groupId ? { ...g, items: g.items.filter((item) => item.id !== itemId) } : g
    ))
  }, [groups, onUpdateGroups])

  const insertGroupItemBelow = useCallback((groupId: string, itemId: string) => {
    onUpdateGroups(groups.map((g) => {
      if (g.id !== groupId) return g
      const idx = g.items.findIndex((item) => item.id === itemId)
      const newItems = [...g.items]
      newItems.splice(idx + 1, 0, createEmptyItem(groupId))
      return { ...g, items: newItems }
    }))
  }, [groups, onUpdateGroups])

  const moveGroupItem = useCallback((groupId: string, itemId: string, direction: 'up' | 'down') => {
    onUpdateGroups(groups.map((g) => {
      if (g.id !== groupId) return g
      const idx = g.items.findIndex((item) => item.id === itemId)
      const newIdx = direction === 'up' ? idx - 1 : idx + 1
      if (newIdx < 0 || newIdx >= g.items.length) return g
      const newItems = [...g.items]
      ;[newItems[idx], newItems[newIdx]] = [newItems[newIdx], newItems[idx]]
      return { ...g, items: newItems }
    }))
  }, [groups, onUpdateGroups])

  const duplicateGroupItem = useCallback((groupId: string, itemId: string) => {
    onUpdateGroups(groups.map((g) => {
      if (g.id !== groupId) return g
      const idx = g.items.findIndex((item) => item.id === itemId)
      const duplicate = { ...g.items[idx], id: generateId() }
      const newItems = [...g.items]
      newItems.splice(idx + 1, 0, duplicate)
      return { ...g, items: newItems }
    }))
  }, [groups, onUpdateGroups])

  const hasContent = standaloneItems.length > 0 || groups.length > 0

  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* Empty State */}
      {!hasContent && (
        <div className="surface-card" style={{ padding: '36px 16px', textAlign: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--ink-black)', opacity: 0.15, marginBottom: '6px' }}>No items yet</div>
          <p style={{ fontSize: '12px', color: 'var(--ash)', marginBottom: '16px' }}>
            Add items or groups to start
          </p>
          <div className="flex items-center justify-center gap-2">
            <button type="button" onClick={addStandaloneItem} className="btn-dark" style={{ fontSize: '11px', padding: '7px 16px' }}>
              <Plus size={12} /> Add Item
            </button>
            <button type="button" onClick={addGroup} className="btn-pill" style={{ fontSize: '11px', padding: '6px 16px' }}>
              <Plus size={12} /> Add Group
            </button>
          </div>
        </div>
      )}

      {/* Standalone Items */}
      {standaloneItems.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
          {standaloneItems.map((item) => {
            globalRowCounter++
            return (
              <LineItemCard
                key={item.id}
                item={item}
                rowNumber={globalRowCounter}
                onUpdate={(patch) => updateStandaloneItem(item.id, patch)}
                onInsertBelow={() => insertStandaloneBelow(item.id)}
                onMoveUp={() => moveStandaloneItem(item.id, 'up')}
                onMoveDown={() => moveStandaloneItem(item.id, 'down')}
                onDuplicate={() => duplicateStandaloneItem(item.id)}
                onRemove={() => removeStandaloneItem(item.id)}
              />
            )
          })}
        </div>
      )}

      {/* Groups */}
      {groups.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {groups.map((group) => (
            <div key={group.id} className="surface-card" style={{ overflow: 'visible', padding: 0 }}>
              <GroupHeader
                group={group}
                onUpdate={(patch) => updateGroup(group.id, patch)}
                onRemove={() => removeGroup(group.id)}
                onAddItem={() => addItemToGroup(group.id)}
                onToggleCollapse={() => updateGroup(group.id, { collapsed: !group.collapsed })}
              />
              {!group.collapsed && (
                <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {group.items.length === 0 ? (
                    <div style={{ padding: '16px', textAlign: 'center' }}>
                      <button type="button" onClick={() => addItemToGroup(group.id)} className="btn-ghost" style={{ fontSize: '10px' }}>
                        + Add item
                      </button>
                    </div>
                  ) : (
                    group.items.map((item) => {
                      globalRowCounter++
                      return (
                        <LineItemCard
                          key={item.id}
                          item={item}
                          rowNumber={globalRowCounter}
                          onUpdate={(patch) => updateGroupItem(group.id, item.id, patch)}
                          onInsertBelow={() => insertGroupItemBelow(group.id, item.id)}
                          onMoveUp={() => moveGroupItem(group.id, item.id, 'up')}
                          onMoveDown={() => moveGroupItem(group.id, item.id, 'down')}
                          onDuplicate={() => duplicateGroupItem(group.id, item.id)}
                          onRemove={() => removeGroupItem(group.id, item.id)}
                        />
                      )
                    })
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Bottom Actions */}
      {hasContent && (
        <div className="flex items-center gap-2" style={{ marginTop: '12px' }}>
          <button type="button" onClick={addStandaloneItem} className="btn-dark" style={{ fontSize: '11px', padding: '7px 16px' }}>
            <Plus size={12} /> Add Item
          </button>
          <button type="button" onClick={addGroup} className="btn-pill" style={{ fontSize: '11px', padding: '6px 16px' }}>
            <Plus size={12} /> Add Group
          </button>
        </div>
      )}
    </div>
  )
}
