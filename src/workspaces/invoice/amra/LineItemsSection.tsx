import { useState, useRef, useEffect, useCallback } from 'react'
import { Plus, ChevronDown, ChevronRight, Trash2, Copy, ArrowUp, ArrowDown, CornerDownRight, Camera, Type, X, ImagePlus } from 'lucide-react'
import { uid, emptyItem, emptyGroup, UNITS } from './data'
import type { LineItem, LineGroup, InvoiceData, UnitType } from './types'

/* ── Image Picker ── */
function ImgPicker({ value, onChange }: { value?: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLInputElement>(null)
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return
    const r = new FileReader(); r.onload = (ev) => onChange(ev.target?.result as string); r.readAsDataURL(f)
  }
  if (value) return (
    <div className="amr-animate-in" style={{ marginTop: '8px' }}>
      <div className="amr-img-picker">
        <img src={value} alt="" className="amr-img-thumb" />
        <div style={{ flex: 1 }}><div style={{ fontSize: '11px', color: 'var(--lavender)' }}>Image selected</div></div>
        <button type="button" onClick={() => ref.current?.click()} className="amr-btn amr-btn-sm amr-btn-ghost" style={{ padding: '4px 10px', fontSize: '11px' }}><Camera size={11} /> Change</button>
        <button type="button" onClick={() => onChange('')} className="amr-btn amr-btn-sm" style={{ padding: '4px 10px', fontSize: '11px', color: '#b91c1c', borderColor: '#b91c1c' }}><X size={11} /></button>
      </div>
      <input ref={ref} type="file" accept="image/*" onChange={handle} style={{ display: 'none' }} />
    </div>
  )
  return (
    <div className="amr-animate-in" style={{ marginTop: '8px' }}>
      <div className="amr-img-picker" onClick={() => ref.current?.click()}>
        <div className="amr-img-empty"><ImagePlus size={18} /></div>
        <div style={{ flex: 1 }}><div style={{ fontSize: '11px', color: 'var(--lavender)' }}>Add photo</div></div>
      </div>
      <input ref={ref} type="file" accept="image/*" onChange={handle} style={{ display: 'none' }} />
    </div>
  )
}

/* ── Item Actions ── */
function ItemActions({ onInsert, onUp, onDown, onDup, onDel }: {
  onInsert: () => void; onUp: () => void; onDown: () => void; onDup: () => void; onDel: () => void
}) {
  return (
    <div className="amr-actions">
      <button type="button" onClick={onInsert}><CornerDownRight size={10} /> Insert</button>
      <button type="button" onClick={onUp}><ArrowUp size={10} /> Up</button>
      <button type="button" onClick={onDown}><ArrowDown size={10} /> Down</button>
      <button type="button" onClick={onDup}><Copy size={10} /> Dup</button>
      <div style={{ flex: 1 }} />
      <button type="button" onClick={onDel} className="amr-del"><Trash2 size={10} /></button>
    </div>
  )
}

/* ── Item Card ── */
function ItemCard({ item, row, onPatch, onInsert, onUp, onDown, onDup, onDel }: {
  item: LineItem; row: number
  onPatch: (p: Partial<LineItem>) => void; onInsert: () => void
  onUp: () => void; onDown: () => void; onDup: () => void; onDel: () => void
}) {
  const [subOpen, setSubOpen] = useState(false)
  const [photoOpen, setPhotoOpen] = useState(false)
  const total = item.quantity * item.unitPrice

  return (
    <div className="amr-card amr-animate-in" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        <span style={{ fontWeight: 400, fontSize: '10px', color: 'var(--lavender)', background: 'var(--lavender-soft)', borderRadius: 'var(--radius-btn)', padding: '2px 6px', marginTop: '4px', flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>{row}</span>
        <input type="text" value={item.description} onChange={(e) => onPatch({ description: e.target.value })} placeholder="Item description"
          className="amr-input-compact" style={{ fontWeight: 400, fontSize: '14px', color: 'var(--ink)', padding: '2px 0', flex: 1 }} />
      </div>

      <div style={{ display: 'flex', gap: '4px', marginTop: '6px', marginLeft: '32px' }}>
        <button type="button" onClick={() => setSubOpen(!subOpen)} className={subOpen ? 'amr-btn amr-btn-sm' : 'amr-btn amr-btn-sm amr-btn-ghost'} style={{ fontSize: '10px', padding: '3px 10px' }}><Type size={10} /> Sub</button>
        <button type="button" onClick={() => setPhotoOpen(!photoOpen)} className={photoOpen ? 'amr-btn amr-btn-sm' : 'amr-btn amr-btn-sm amr-btn-ghost'} style={{ fontSize: '10px', padding: '3px 10px' }}><Camera size={10} /> Photo</button>
      </div>

      {subOpen && <div style={{ marginLeft: '32px', marginTop: '6px' }}><input type="text" value={item.description ?? ''} onChange={(e) => onPatch({ description: e.target.value })} placeholder="Sub-description" className="amr-input-compact" style={{ fontSize: '12px' }} /></div>}
      {photoOpen && <div style={{ marginLeft: '32px' }}><ImgPicker value={undefined} onChange={() => {}} /></div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
        <div>
          <span className="amr-label" style={{ display: 'block', marginBottom: '4px', fontSize: '10px' }}>Qty</span>
          <input type="number" value={item.quantity || ''} onChange={(e) => onPatch({ quantity: parseFloat(e.target.value) || 0 })} placeholder="0" className="amr-input-compact amr-input-right" />
        </div>
        <div>
          <span className="amr-label" style={{ display: 'block', marginBottom: '4px', fontSize: '10px' }}>Rate</span>
          <input type="number" value={item.unitPrice || ''} onChange={(e) => onPatch({ unitPrice: parseFloat(e.target.value) || 0 })} placeholder="0.00" className="amr-input-compact amr-input-right" />
        </div>
      </div>

      <div style={{ marginTop: '8px' }}>
        <span className="amr-label" style={{ display: 'block', marginBottom: '4px', fontSize: '10px' }}>Unit</span>
        <select value={item.unit} onChange={(e) => onPatch({ unit: e.target.value as UnitType })} className="amr-select" style={{ width: '100%', fontSize: '11px' }}>
          {UNITS.map((u) => <option key={u.value} value={u.value}>{u.label}</option>)}
        </select>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--veil)' }}>
        <span style={{ fontWeight: 400, fontSize: '10px', color: 'var(--mist)', letterSpacing: '0.029em', textTransform: 'uppercase' as const }}>Total</span>
        <span style={{ fontWeight: 400, fontSize: '14px', fontVariantNumeric: 'tabular-nums', color: 'var(--ink)' }}>₦{total.toLocaleString()}</span>
      </div>

      <ItemActions onInsert={onInsert} onUp={onUp} onDown={onDown} onDup={onDup} onDel={onDel} />
    </div>
  )
}

/* ── Group Header ── */
function GroupHeader({ group, onUpdate, onRemove, onAdd, onToggle }: {
  group: LineGroup; onUpdate: (p: Partial<LineGroup>) => void
  onRemove: () => void; onAdd: () => void; onToggle: () => void
}) {
  const sub = group.items.reduce((s, i) => s + i.quantity * i.unitPrice, 0)
  return (
    <div className="flex items-center gap-3" style={{ padding: '14px 20px', background: 'var(--lavender-soft)', borderRadius: 'var(--radius-card) var(--radius-card) 0 0' }}>
      <button type="button" onClick={onToggle} className="amr-btn-icon amr-btn-icon-sm" style={{ color: 'var(--ink)' }}>
        {group.collapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
      </button>
      <input type="text" value={group.title} onChange={(e) => onUpdate({ title: e.target.value })} placeholder="Group title"
        style={{ background: 'transparent', border: 'none', fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '14px', color: 'var(--ink)', flex: 1, outline: 'none', padding: '2px 0', minWidth: 0 }} />
      <span className="amr-badge amr-badge-outline" style={{ fontSize: '9px', padding: '2px 8px' }}>{group.items.length}</span>
      <span style={{ fontWeight: 400, fontSize: '13px', fontVariantNumeric: 'tabular-nums', color: 'var(--ink)' }}>₦{sub.toLocaleString()}</span>
      <button type="button" onClick={onAdd} className="amr-btn-icon amr-btn-icon-sm" style={{ color: 'var(--lavender)' }}><Plus size={14} /></button>
      <button type="button" onClick={onRemove} className="amr-btn-icon amr-btn-icon-sm" style={{ color: 'var(--mist)' }}><Trash2 size={12} /></button>
    </div>
  )
}

/* ── Main ── */
export function LineItemsSection({ data, onUpdate }: { data: InvoiceData; onUpdate: (p: Partial<InvoiceData>) => void }) {
  let rowCounter = 0
  const setGroups = (groups: LineGroup[]) => onUpdate({ groups })
  const setStandalone = (standaloneItems: LineItem[]) => onUpdate({ standaloneItems })

  const addStandalone = useCallback(() => setStandalone([...data.standaloneItems, emptyItem()]), [data.standaloneItems])
  const addGroup = useCallback(() => setGroups([...data.groups, emptyGroup()]), [data.groups])

  const updateItem = useCallback((list: 's' | 'g', gid: string | null, itemId: string, patch: Partial<LineItem>) => {
    if (list === 's') setStandalone(data.standaloneItems.map((i) => i.id === itemId ? { ...i, ...patch } : i))
    else setGroups(data.groups.map((g) => g.id === gid ? { ...g, items: g.items.map((i) => i.id === itemId ? { ...i, ...patch } : i) } : g))
  }, [data.standaloneItems, data.groups])

  const removeItem = useCallback((list: 's' | 'g', gid: string | null, itemId: string) => {
    if (list === 's') setStandalone(data.standaloneItems.filter((i) => i.id !== itemId))
    else setGroups(data.groups.map((g) => g.id === gid ? { ...g, items: g.items.filter((i) => i.id !== itemId) } : g))
  }, [data.standaloneItems, data.groups])

  const insertBelow = useCallback((list: 's' | 'g', gid: string | null, itemId: string) => {
    if (list === 's') { const idx = data.standaloneItems.findIndex((i) => i.id === itemId); const items = [...data.standaloneItems]; items.splice(idx + 1, 0, emptyItem()); setStandalone(items) }
    else setGroups(data.groups.map((g) => { if (g.id !== gid) return g; const idx = g.items.findIndex((i) => i.id === itemId); const items = [...g.items]; items.splice(idx + 1, 0, emptyItem()); return { ...g, items } }))
  }, [data.standaloneItems, data.groups])

  const moveItem = useCallback((list: 's' | 'g', gid: string | null, itemId: string, dir: 'up' | 'down') => {
    const swap = (items: LineItem[]) => { const idx = items.findIndex((i) => i.id === itemId); const ni = dir === 'up' ? idx - 1 : idx + 1; if (ni < 0 || ni >= items.length) return items; const a = [...items]; ;[a[idx], a[ni]] = [a[ni], a[idx]]; return a }
    if (list === 's') setStandalone(swap(data.standaloneItems))
    else setGroups(data.groups.map((g) => g.id === gid ? { ...g, items: swap(g.items) } : g))
  }, [data.standaloneItems, data.groups])

  const dupItem = useCallback((list: 's' | 'g', gid: string | null, itemId: string) => {
    const dup = (items: LineItem[]) => { const idx = items.findIndex((i) => i.id === itemId); const d = { ...items[idx], id: uid() }; const a = [...items]; a.splice(idx + 1, 0, d); return a }
    if (list === 's') setStandalone(dup(data.standaloneItems))
    else setGroups(data.groups.map((g) => g.id === gid ? { ...g, items: dup(g.items) } : g))
  }, [data.standaloneItems, data.groups])

  const updateGroup = useCallback((gid: string, p: Partial<LineGroup>) => setGroups(data.groups.map((g) => g.id === gid ? { ...g, ...p } : g)), [data.groups])
  const removeGroup = useCallback((gid: string) => setGroups(data.groups.filter((g) => g.id !== gid)), [data.groups])
  const addItemToGroup = useCallback((gid: string) => setGroups(data.groups.map((g) => g.id === gid ? { ...g, items: [...g.items, emptyItem()] } : g)), [data.groups])

  const has = data.standaloneItems.length > 0 || data.groups.length > 0
  const renderCard = (item: LineItem, list: 's' | 'g', gid: string | null) => {
    rowCounter++
    return <ItemCard key={item.id} item={item} row={rowCounter}
      onPatch={(p) => updateItem(list, gid, item.id, p)} onInsert={() => insertBelow(list, gid, item.id)}
      onUp={() => moveItem(list, gid, item.id, 'up')} onDown={() => moveItem(list, gid, item.id, 'down')}
      onDup={() => dupItem(list, gid, item.id)} onDel={() => removeItem(list, gid, item.id)} />
  }

  return (
    <div>
      {!has && (
        <div className="amr-card" style={{ padding: '48px 24px', textAlign: 'center' }}>
          <div className="amr-heading" style={{ opacity: 0.12, marginBottom: '8px' }}>No items yet</div>
          <p style={{ fontSize: '13px', color: 'var(--mist)', marginBottom: '20px' }}>Add items or groups to begin</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <button type="button" onClick={addStandalone} className="amr-btn amr-btn-lavender"><Plus size={12} /> Add Item</button>
            <button type="button" onClick={addGroup} className="amr-btn"><Plus size={12} /> Add Group</button>
          </div>
        </div>
      )}

      {data.standaloneItems.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
          {data.standaloneItems.map((item) => renderCard(item, 's', null))}
        </div>
      )}

      {data.groups.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {data.groups.map((group) => (
            <div key={group.id} className="amr-card" style={{ overflow: 'visible', padding: 0 }}>
              <GroupHeader group={group} onUpdate={(p) => updateGroup(group.id, p)} onRemove={() => removeGroup(group.id)} onAdd={() => addItemToGroup(group.id)} onToggle={() => updateGroup(group.id, { collapsed: !group.collapsed })} />
              {!group.collapsed && (
                <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {group.items.length === 0 ? (
                    <div style={{ padding: '20px', textAlign: 'center' }}>
                      <button type="button" onClick={() => addItemToGroup(group.id)} className="amr-btn amr-btn-sm amr-btn-ghost" style={{ fontSize: '10px' }}><Plus size={10} /> Add item</button>
                    </div>
                  ) : group.items.map((item) => renderCard(item, 'g', group.id))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {has && (
        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <button type="button" onClick={addStandalone} className="amr-btn amr-btn-sm amr-btn-lavender"><Plus size={11} /> Add Item</button>
          <button type="button" onClick={addGroup} className="amr-btn amr-btn-sm"><Plus size={11} /> Add Group</button>
        </div>
      )}
    </div>
  )
}
