import { useState, useCallback } from 'react'
import { ChevronDown, Plus, Trash2 } from 'lucide-react'
import { uid } from './data'
import type { CommercialSettings, AdditionalCharge } from './types'

function Row({ label, summary, open: defaultOpen = false, children }: { label: string; summary: string; open?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ borderBottom: '1px solid rgba(35,31,32,0.1)' }}>
      <button type="button" onClick={() => setOpen(!open)} className="w-full text-left flex items-center justify-between" style={{ padding: '10px 16px', background: 'transparent', border: 'none', cursor: 'pointer' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 400, fontSize: '12px', color: 'var(--ink)' }}>{label}</div>
          <div style={{ fontSize: '10px', color: 'var(--mid)', marginTop: '1px' }}>{summary}</div>
        </div>
        <ChevronDown size={11} style={{ color: 'var(--mid)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0, marginLeft: '8px' }} />
      </button>
      {open && <div style={{ padding: '0 16px 12px', animation: 'sack-fade-in 0.2s ease-out' }}>{children}</div>}
    </div>
  )
}

function Toggle({ options, value, onChange }: { options: { value: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="sack-toggle">
      {options.map((o) => (
        <button key={o.value} type="button" onClick={() => onChange(o.value)} className={`sack-toggle-item ${value === o.value ? 'sack-toggle-item-active' : ''}`}>{o.label}</button>
      ))}
    </div>
  )
}

function fmtNum(v: string) { const r = v.replace(/[^0-9]/g, ''); return r ? parseInt(r, 10).toLocaleString('en-US') : '' }

export function CommercialSettings({ settings, onUpdate }: { settings: CommercialSettings; onUpdate: (s: CommercialSettings) => void }) {
  const discSum = settings.discount.type === 'none' ? 'Not set' : settings.discount.type === 'percentage' ? `${settings.discount.value}%` : `₦${settings.discount.value.toLocaleString()}`
  const vatSum = settings.vat.enabled ? `${settings.vat.percentage}%` : 'Not set'
  const whtSum = settings.wht.type === 'none' ? 'Not set' : settings.wht.type === 'percentage' ? `${settings.wht.value}%` : `₦${settings.wht.value.toLocaleString()}`
  const chargeCount = settings.charges.items.length
  const chargeTotal = settings.charges.items.reduce((s, c) => s + c.value, 0)
  const chargeSum = chargeCount === 0 ? 'Not set' : `${chargeCount} charge${chargeCount !== 1 ? 's' : ''} — ₦${chargeTotal.toLocaleString()}`

  const addCharge = useCallback(() => onUpdate({ ...settings, charges: { ...settings.charges, items: [...settings.charges.items, { id: uid(), title: '', value: 0 }] } }), [settings])
  const updateCharge = useCallback((id: string, patch: Partial<AdditionalCharge>) => {
    onUpdate({ ...settings, charges: { ...settings.charges, items: settings.charges.items.map((c) => c.id === id ? { ...c, ...patch } : c) } })
  }, [settings])
  const removeCharge = useCallback((id: string) => {
    onUpdate({ ...settings, charges: { ...settings.charges, items: settings.charges.items.filter((c) => c.id !== id) } })
  }, [settings])

  return (
    <div className="sack-card" style={{ overflow: 'hidden' }}>
      <div style={{ padding: '10px 16px 6px' }}>
        <span className="sack-tag sack-tag-cobalt">Commercial</span>
      </div>

      <Row label="Payment Terms" summary={settings.paymentTerms || 'Not set'}>
        <select value={settings.paymentTerms} onChange={(e) => onUpdate({ ...settings, paymentTerms: e.target.value })} className="sack-select" style={{ width: '100%' }}>
          <option value="">None</option>
          {['Due on Receipt', 'Net 7', 'Net 14', 'Net 30', 'Net 45', 'Net 60', 'Net 90'].map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </Row>

      <Row label="Discount" summary={discSum}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Toggle options={[{ value: 'percentage', label: 'Percentage' }, { value: 'flat', label: 'Flat' }]} value={settings.discount.type === 'none' ? 'percentage' : settings.discount.type} onChange={(v) => onUpdate({ ...settings, discount: { ...settings.discount, type: v as any } })} />
          {settings.discount.type !== 'none' && <input type="number" value={settings.discount.value} onChange={(e) => onUpdate({ ...settings, discount: { ...settings.discount, value: parseFloat(e.target.value) || 0 } })} placeholder="Value" className="sack-compact" />}
          <Toggle options={[{ value: 'before_tax', label: 'Before Tax' }, { value: 'after_tax', label: 'After Tax' }]} value={settings.discount.timing} onChange={(v) => onUpdate({ ...settings, discount: { ...settings.discount, timing: v as any } })} />
        </div>
      </Row>

      <Row label="VAT" summary={vatSum}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <input type="number" value={settings.vat.enabled ? settings.vat.percentage : ''} onChange={(e) => onUpdate({ ...settings, vat: { enabled: true, percentage: parseFloat(e.target.value) || 0 } })} placeholder="%" className="sack-compact" style={{ width: '80px' }} step="0.5" />
          <span style={{ fontSize: '11px', color: 'var(--mid)' }}>%</span>
        </div>
        <button type="button" onClick={() => onUpdate({ ...settings, vat: { ...settings.vat, enabled: false } })} className="sack-btn sack-btn-sm sack-btn-ghost" style={{ fontSize: '9px', padding: '2px 8px', marginTop: '4px' }}>Disable</button>
      </Row>

      <Row label="Withholding Tax" summary={whtSum}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Toggle options={[{ value: 'percentage', label: 'Percentage' }, { value: 'flat', label: 'Flat' }]} value={settings.wht.type === 'none' ? 'percentage' : settings.wht.type} onChange={(v) => onUpdate({ ...settings, wht: { ...settings.wht, type: v as any } })} />
          {settings.wht.type !== 'none' && <input type="number" value={settings.wht.value} onChange={(e) => onUpdate({ ...settings, wht: { ...settings.wht, value: parseFloat(e.target.value) || 0 } })} placeholder="Amount" className="sack-compact" />}
        </div>
      </Row>

      <Row label="Additional Charges" summary={chargeSum}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Toggle options={[{ value: 'before_tax', label: 'Before Tax' }, { value: 'after_tax', label: 'After Tax' }]} value={settings.charges.timing} onChange={(v) => onUpdate({ ...settings, charges: { ...settings.charges, timing: v as any } })} />
          {settings.charges.items.map((c) => (
            <div key={c.id} className="sack-charge-row">
              <input type="text" value={c.title} onChange={(e) => updateCharge(c.id, { title: e.target.value })} placeholder="Charge title" className="sack-compact" />
              <input type="text" value={c.value ? fmtNum(String(c.value)) : ''} onChange={(e) => updateCharge(c.id, { value: parseFloat(e.target.value.replace(/[^0-9.]/g, '')) || 0 })} placeholder="0" className="sack-compact sack-compact-right" />
              <button type="button" onClick={() => removeCharge(c.id)} style={{ background: 'none', border: 'none', color: 'var(--mid)', cursor: 'pointer', padding: '2px', display: 'flex', justifyContent: 'center' }}><Trash2 size={10} /></button>
            </div>
          ))}
          <button type="button" onClick={addCharge} className="sack-btn sack-btn-sm sack-btn-ghost" style={{ fontSize: '10px', padding: '3px 10px', alignSelf: 'flex-start' }}><Plus size={10} /> Add charge</button>
        </div>
      </Row>
    </div>
  )
}
