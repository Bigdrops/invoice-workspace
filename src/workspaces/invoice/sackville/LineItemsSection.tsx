import { useState, useRef, useEffect, useCallback } from 'react'
import { Plus, ChevronDown, ChevronRight, Trash2, Copy, ArrowUp, ArrowDown, CornerDownRight, Camera, Type, X, ImagePlus } from 'lucide-react'
import { uid, emptyItem, emptyGroup, UNITS } from './data'
import type { LineItem, LineGroup, InvoiceData, UnitType } from './types'

/* ── Image Picker ── */
function ImgPicker({ value, onChange }: { value?: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLInputElement>(null)
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    const r = new FileReader()
    r.onload = (ev) => onChange(ev.target?.result as string)
    r.readAsDataURL(f)
  }
  if (value) {
    return (
      <div className="sack-animate-in" style={{ marginTop: '6px' }}>
        <div className="sack-img-picker">
          <img src={value} alt="" className="sack-img-thumb" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '10px', fontWeight: 400, color: 'var(--ink)' }}>Image selected</div>
          </div>
          <button type="button" onClick={() => ref.current?.click()} className="sack-btn sack-btn-sm sack-btn-ghost" style={{ padding: '3px 8px', fontSize: '10px' }}><Camera size={10} /> Change</button>
          <button type="button" onClick={() => onChange('')} className="sack-btn sack-btn-sm sack-btn-fire" style={{ padding: '3px 8px', fontSize: '10px' }}><X size={10} /></button>
        </div>
        <input ref={ref} type="file" accept="image/*" onChange={handle} style={{ display: 'none' }} />
      </div>
    )
  }
  return (
    <div className="sack-animate-in" style={{ marginTop: '6px' }}>
      <div className="sack-img-picker" onClick={() => ref.current?.click()}>
        <div className="sack-img-empty"><ImagePlus size={16} /></div>
        <div style={{ flex: 1 }}><div style={{ fontSize: '10px', color: 'var(--cobalt)' }}>Add photo</div></div>
      </div>
      <input ref={ref} type="file" accept="image/*" onChange={handle} style={{ display: 'none' }} />
    </div>
  )
}

/* ── Item Card (mobile-first, stacked, never collapses) ── */
function ItemCard({ item, row, onPatch, onInsert, onMoveUp, onMoveDown, onDup, onDel }: {
  item: LineItem; row: number
  onPatch: (p: Partial<LineItem>) => void; onInsert: () => void
  onMoveUp: () => void; onMoveDown: () => void; onDup: () => void; onDel: () => void
}) {
  const [subOpen, setSubOpen] = useState(false)
  const [photoOpen, setPhotoOpen] = useState(false)
  const total = item.quantity * item.unitPrice

  return (
    <div className="sack-card-soft" style={{ padding: '12px 14px' }}>
      {/* Row number + description */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
        <span style={{ fontWeight: 400, fontSize: '10px', color: 'var(--cobalt)', background: 'var(--bone)', borderRadius: '4px', padding: '2px 5px', marginTop: '2px', flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>{row}</span>
        <input type="text" value={item.description} onChange={(e) => onPatch({ description: e.target.value })} placeholder="Item description" className="sack-compact" style={{ fontWeight: 400, fontSize: '13px', color: 'var(--ink)', padding: '2px 0', flex: 1 }} />
      </div>

      {/* Toggle buttons */}
      <div style={{ display: 'flex', gap: '4px', marginTop: '4px', marginLeft: '28px' }}>
        <button type="button" onClick={() => setSubOpen(!subOpen)} className={subOpen ? 'sack-btn sack-btn-sm' : 'sack-btn sack-btn-sm sack-btn-ghost'} style={{ fontSize: '9px', padding: '2px 8px' }}><Type size={9} /> Sub</button>
        <button type="button" onClick={() => setPhotoOpen(!photoOpen)} className={photoOpen ? 'sack-btn sack-btn-sm' : 'sack-btn sack-btn-sm sack-btn-ghost'} style={{ fontSize: '9px', padding: '2px 8px' }}><Camera size={9} /> Photo</button>
      </div>

      {subOpen && <div style={{ marginLeft: '28px', marginTop: '4px' }}><input type="text" value={item.description ?? ''} onChange={(e) => onPatch({ description: e.target.value })} placeholder="Sub-description" className="sack-compact" style={{ fontSize: '11px' }} /></div>}
      {photoOpen && <div style={{ marginLeft: '28px' }}><ImgPicker value={undefined} onChange={() => {}} /></div>}

      {/* Qty + Rate */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '8px' }}>
        <div>
          <span className="sack-caption" style={{ display: 'block', marginBottom: '2px', fontSize: '9px' }}>Qty</span>
          <input type="number" value={item.quantity || ''} onChange={(e) => onPatch({ quantity: parseFloat(e.target.value) || 0 })} placeholder="0" className="sack-compact sack-compact-right" />
        </div>
        <div>
          <span className="sack-caption" style={{ display: 'block', marginBottom: '2px', fontSize: '9px' }}>Rate</span>
          <input type="number" value={item.unitPrice || ''} onChange={(e) => onPatch({ unitPrice: parseFloat(e.target.value) || 0 })} placeholder="0.00" className="sack-compact sack-compact-right" />
        </div>
      </div>

      {/* Unit */}
      <div style={{ marginTop: '6px' }}>
        <span className="sack-caption" style={{ display: 'block', marginBottom: '2px', fontSize: '9px' }}>Unit</span>
        <select value={item.unit} onChange={(e) => onPatch({ unit: e.target.value as UnitType })} className="sack-select" style={{ width: '100%', fontSize: '11px' }}>
          {UNITS.map((u) => <option key={u.value} value={u.value}>{u.label}</option>)}
        </select>
      </div>

      {/* Total */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', paddingTop: '4px', borderTop: '1px solid rgba(35,31,32,0.08)' }}>
        <span style={{ fontWeight: 400, fontSize: '9px', color: 'var(--mid)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total</span>
        <span style={{ fontWeight: 400, fontSize: '12px', fontVariantNumeric: 'tabular-nums', color: 'var(--ink)' }}>₦{total.toLocaleString()}</span>
      </div>

      {/* Actions */}
      <div className="sack-actions">
        <button type="button" onClick={onInsert}><CornerDownRight size={9} /> Insert</button>
        <button type="button" onClick={onMoveUp}><ArrowUp size={9} /> Up</button>
        <button type="button" onClick={onMoveDown}><ArrowDown size={9} /> Down</button>
        <button type="button" onClick={onDup}><Copy size={9} /> Dup</button>
        <div style={{ flex: 1 }} />
        <button type="button" onClick={onDel} className="sack-del"><Trash2 size={9} /></button>
      </div>
    </div>
  )
}

/* ── Group Header ── */
function GroupHeader({ group, onUpdate, onRemove, onAddItem, onToggle }: {
  group: LineGroup; onUpdate: (p: Partial<LineGroup>) => void
  onRemove: () => void; onAddItem: () => void; onToggle: () => void
}) {
  const sub = group.items.reduce((s, i) => s + i.quantity * i.unitPrice, 0)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--cobalt)', color: 'var(--cream)', padding: '8px 14px', borderRadius: '10px 10px 0 0' }}>
      <button type="button" onClick={onToggle} style={{ background: 'none', border: 'none', color: 'var(--cream)', cursor: 'pointer', padding: '2px', display: 'flex' }}>
        {group.collapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
      </button>
      <input type="text" value={group.title} onChange={(e) => onUpdate({ title: e.target.value })} placeholder="Group title"
        style={{ background: 'transparent', border: 'none', fontFamily: 'var(--font-grotesk)', fontWeight: 400, fontSize: '12px', color: 'var(--cream)', flex: 1, outline: 'none', padding: '2px 0', minWidth: 0 }} />
      <span className="sack-tag" style={{ borderColor: 'var(--cream)', color: 'var(--cream)', fontSize: '8px', padding: '1px 6px' }}>{group.items.length}</span>
      <span style={{ fontWeight: 400, fontSize: '10px', fontVariantNumeric: 'tabular-nums' }}>₦{sub.toLocaleString()}</span>
      <button type="button" onClick={onAddItem} style={{ background: 'none', border: 'none', color: 'var(--cream)', cursor: 'pointer', padding: '2px', display: 'flex', opacity: 0.7 }}><Plus size={11} /></button>
      <button type="button" onClick={onRemove} style={{ background: 'none', border: 'none', color: 'var(--cream)', cursor: 'pointer', padding: '2px', display: 'flex', opacity: 0.5 }}><Trash2 size={10} /></button>
    </div>
  )
}

/* ── Main Section ── */
export function LineItemsSection({ data, onUpdate }: { data: InvoiceData; onUpdate: (p: Partial<InvoiceData>) => void }) {
  let rowCounter = 0

  const setGroups = (groups: LineGroup[]) => onUpdate({ groups })
  const setStandalone = (standaloneItems: LineItem[]) => onUpdate({ standaloneItems })

  const addStandalone = useCallback(() => setStandalone([...data.standaloneItems, emptyItem()]), [data.standaloneItems])
  const addGroup = useCallback(() => setGroups([...data.groups, emptyGroup()]), [data.groups])

  const updateItem = useCallback((list: 'standalone' | 'group', groupId: string | null, itemId: string, patch: Partial<LineItem>) => {
    if (list === 'standalone') {
      setStandalone(data.standaloneItems.map((i) => i.id === itemId ? { ...i, ...patch } : i))
    } else {
      setGroups(data.groups.map((g) => g.id === groupId ? { ...g, items: g.items.map((i) => i.id === itemId ? { ...i, ...patch } : i) } : g))
    }
  }, [data.standaloneItems, data.groups])

  const removeItem = useCallback((list: 'standalone' | 'group', groupId: string | null, itemId: string) => {
    if (list === 'standalone') setStandalone(data.standaloneItems.filter((i) => i.id !== itemId))
    else setGroups(data.groups.map((g) => g.id === groupId ? { ...g, items: g.items.filter((i) => i.id !== itemId) } : g))
  }, [data.standaloneItems, data.groups])

  const insertBelow = useCallback((list: 'standalone' | 'group', groupId: string | null, itemId: string) => {
    if (list === 'standalone') {
      const idx = data.standaloneItems.findIndex((i) => i.id === itemId)
      const items = [...data.standaloneItems]; items.splice(idx + 1, 0, emptyItem()); setStandalone(items)
    } else {
      setGroups(data.groups.map((g) => {
        if (g.id !== groupId) return g
        const idx = g.items.findIndex((i) => i.id === itemId)
        const items = [...g.items]; items.splice(idx + 1, 0, emptyItem())
        return { ...g, items }
      }))
    }
  }, [data.standaloneItems, data.groups])

  const moveItem = useCallback((list: 'standalone' | 'group', groupId: string | null, itemId: string, dir: 'up' | 'down') => {
    const swap = (items: LineItem[]) => {
      const idx = items.findIndex((i) => i.id === itemId)
      const ni = dir === 'up' ? idx - 1 : idx + 1
      if (ni < 0 || ni >= items.length) return items
      const arr = [...items]; ;[arr[idx], arr[ni]] = [arr[ni], arr[idx]]; return arr
    }
    if (list === 'standalone') setStandalone(swap(data.standaloneItems))
    else setGroups(data.groups.map((g) => g.id === groupId ? { ...g, items: swap(g.items) } : g))
  }, [data.standaloneItems, data.groups])

  const dupItem = useCallback((list: 'standalone' | 'group', groupId: string | null, itemId: string) => {
    const dup = (items: LineItem[]) => {
      const idx = items.findIndex((i) => i.id === itemId)
      const d = { ...items[idx], id: uid() }
      const arr = [...items]; arr.splice(idx + 1, 0, d); return arr
    }
    if (list === 'standalone') setStandalone(dup(data.standaloneItems))
    else setGroups(data.groups.map((g) => g.id === groupId ? { ...g, items: dup(g.items) } : g))
  }, [data.standaloneItems, data.groups])

  const updateGroup = useCallback((gid: string, patch: Partial<LineGroup>) => {
    setGroups(data.groups.map((g) => g.id === gid ? { ...g, ...patch } : g))
  }, [data.groups])

  const removeGroup = useCallback((gid: string) => {
    setGroups(data.groups.filter((g) => g.id !== gid))
  }, [data.groups])

  const addItemToGroup = useCallback((gid: string) => {
    setGroups(data.groups.map((g) => g.id === gid ? { ...g, items: [...g.items, emptyItem()] } : g))
  }, [data.groups])

  const has = data.standaloneItems.length > 0 || data.groups.length > 0

  const renderCard = (item: LineItem, list: 'standalone' | 'group', gid: string | null) => {
    rowCounter++
    return (
      <ItemCard key={item.id} item={item} row={rowCounter}
        onPatch={(p) => updateItem(list, gid, item.id, p)}
        onInsert={() => insertBelow(list, gid, item.id)}
        onMoveUp={() => moveItem(list, gid, item.id, 'up')}
        onMoveDown={() => moveItem(list, gid, item.id, 'down')}
        onDup={() => dupItem(list, gid, item.id)}
        onDel={() => removeItem(list, gid, item.id)}
      />
    )
  }

  return (
    <div>
      {!has && (
        <div className="sack-card" style={{ padding: '36px 20px', textAlign: 'center' }}>
          <div className="sack-heading" style={{ opacity: 0.12, marginBottom: '6px' }}>No items yet</div>
          <p className="sack-caption" style={{ marginBottom: '14px' }}>Add items or groups to begin</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <button type="button" onClick={addStandalone} className="sack-btn"><Plus size={12} /> Add Item</button>
            <button type="button" onClick={addGroup} className="sack-btn sack-btn-dark"><Plus size={12} /> Add Group</button>
          </div>
        </div>
      )}

      {data.standaloneItems.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
          {data.standaloneItems.map((item) => renderCard(item, 'standalone', null))}
        </div>
      )}

      {data.groups.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {data.groups.map((group) => (
            <div key={group.id} className="sack-card" style={{ overflow: 'visible', padding: 0 }}>
              <GroupHeader group={group} onUpdate={(p) => updateGroup(group.id, p)} onRemove={() => removeGroup(group.id)} onAddItem={() => addItemToGroup(group.id)} onToggle={() => updateGroup(group.id, { collapsed: !group.collapsed })} />
              {!group.collapsed && (
                <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {group.items.length === 0 ? (
                    <div style={{ padding: '14px', textAlign: 'center' }}>
                      <button type="button" onClick={() => addItemToGroup(group.id)} className="sack-btn sack-btn-sm sack-btn-ghost" style={{ fontSize: '10px' }}><Plus size={10} /> Add item</button>
                    </div>
                  ) : group.items.map((item) => renderCard(item, 'group', group.id))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {has && (
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          <button type="button" onClick={addStandalone} className="sack-btn sack-btn-sm"><Plus size={11} /> Add Item</button>
          <button type="button" onClick={addGroup} className="sack-btn sack-btn-sm sack-btn-dark"><Plus size={11} /> Add Group</button>
        </div>
      )}
    </div>
  )
}
