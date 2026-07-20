import { useState, useCallback } from 'react'
import { ChevronDown, Plus, Trash2 } from 'lucide-react'
import { uid } from './data'
import type { CommercialSettings, AdditionalCharge } from './types'

function Row({ label, summary, open: d = false, children }: { label: string; summary: string; open?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(d)
  return (
    <div style={{ borderBottom: '1px solid var(--veil)' }}>
      <button type="button" onClick={() => setOpen(!open)} className="w-full text-left flex items-center justify-between"
        style={{ padding: '14px 20px', background: 'transparent', border: 'none', cursor: 'pointer' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 400, fontSize: '13px', color: 'var(--ink)' }}>{label}</div>
          <div style={{ fontSize: '11px', color: 'var(--mist)', marginTop: '2px' }}>{summary}</div>
        </div>
        <ChevronDown size={12} style={{ color: 'var(--mist)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0, marginLeft: '8px' }} />
      </button>
      {open && <div style={{ padding: '0 20px 16px', animation: 'amr-fade-in 0.2s ease-out' }}>{children}</div>}
    </div>
  )
}

function Toggle({ options, value, onChange }: { options: { value: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="amr-toggle">
      {options.map((o) => (
        <button key={o.value} type="button" onClick={() => onChange(o.value)} className={`amr-toggle-item ${value === o.value ? 'amr-toggle-active' : ''}`}>{o.label}</button>
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
  const updateCharge = useCallback((id: string, patch: Partial<AdditionalCharge>) => onUpdate({ ...settings, charges: { ...settings.charges, items: settings.charges.items.map((c) => c.id === id ? { ...c, ...patch } : c) } }), [settings])
  const removeCharge = useCallback((id: string) => onUpdate({ ...settings, charges: { ...settings.charges, items: settings.charges.items.filter((c) => c.id !== id) } }), [settings])

  return (
    <div className="amr-card" style={{ overflow: 'hidden', padding: 0 }}>
      <div style={{ padding: '14px 20px 8px' }}><span className="amr-badge amr-badge-lavender" style={{ fontSize: '9px' }}>Commercial</span></div>

      <Row label="Payment Terms" summary={settings.paymentTerms || 'Not set'}>
        <select value={settings.paymentTerms} onChange={(e) => onUpdate({ ...settings, paymentTerms: e.target.value })} className="amr-select" style={{ width: '100%' }}>
          <option value="">None</option>
          {['Due on Receipt', 'Net 7', 'Net 14', 'Net 30', 'Net 45', 'Net 60', 'Net 90'].map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </Row>

      <Row label="Discount" summary={discSum}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Toggle options={[{ value: 'percentage', label: 'Percentage' }, { value: 'flat', label: 'Flat' }]} value={settings.discount.type === 'none' ? 'percentage' : settings.discount.type} onChange={(v) => onUpdate({ ...settings, discount: { ...settings.discount, type: v as any } })} />
          {settings.discount.type !== 'none' && <input type="number" value={settings.discount.value} onChange={(e) => onUpdate({ ...settings, discount: { ...settings.discount, value: parseFloat(e.target.value) || 0 } })} placeholder="Value" className="amr-input-compact" />}
          <Toggle options={[{ value: 'before_tax', label: 'Before Tax' }, { value: 'after_tax', label: 'After Tax' }]} value={settings.discount.timing} onChange={(v) => onUpdate({ ...settings, discount: { ...settings.discount, timing: v as any } })} />
        </div>
      </Row>

      <Row label="VAT" summary={vatSum}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="number" value={settings.vat.enabled ? settings.vat.percentage : ''} onChange={(e) => onUpdate({ ...settings, vat: { enabled: true, percentage: parseFloat(e.target.value) || 0 } })} placeholder="%" className="amr-input-compact" style={{ width: '80px' }} step="0.5" />
          <span style={{ fontSize: '12px', color: 'var(--mist)' }}>%</span>
        </div>
        <button type="button" onClick={() => onUpdate({ ...settings, vat: { ...settings.vat, enabled: false } })} className="amr-btn amr-btn-sm amr-btn-ghost" style={{ fontSize: '10px', padding: '3px 10px', marginTop: '6px' }}>Disable</button>
      </Row>

      <Row label="Withholding Tax" summary={whtSum}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Toggle options={[{ value: 'percentage', label: 'Percentage' }, { value: 'flat', label: 'Flat' }]} value={settings.wht.type === 'none' ? 'percentage' : settings.wht.type} onChange={(v) => onUpdate({ ...settings, wht: { ...settings.wht, type: v as any } })} />
          {settings.wht.type !== 'none' && <input type="number" value={settings.wht.value} onChange={(e) => onUpdate({ ...settings, wht: { ...settings.wht, value: parseFloat(e.target.value) || 0 } })} placeholder="Amount" className="amr-input-compact" />}
        </div>
      </Row>

      <Row label="Additional Charges" summary={chargeSum}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Toggle options={[{ value: 'before_tax', label: 'Before Tax' }, { value: 'after_tax', label: 'After Tax' }]} value={settings.charges.timing} onChange={(v) => onUpdate({ ...settings, charges: { ...settings.charges, timing: v as any } })} />
          {settings.charges.items.map((c) => (
            <div key={c.id} className="amr-charge-row">
              <input type="text" value={c.title} onChange={(e) => updateCharge(c.id, { title: e.target.value })} placeholder="Charge title" className="amr-input-compact" />
              <input type="text" value={c.value ? fmtNum(String(c.value)) : ''} onChange={(e) => updateCharge(c.id, { value: parseFloat(e.target.value.replace(/[^0-9.]/g, '')) || 0 })} placeholder="0" className="amr-input-compact amr-input-right" />
              <button type="button" onClick={() => removeCharge(c.id)} style={{ background: 'none', border: 'none', color: 'var(--mist)', cursor: 'pointer', padding: '2px', display: 'flex', justifyContent: 'center' }}><Trash2 size={10} /></button>
            </div>
          ))}
          <button type="button" onClick={addCharge} className="amr-btn amr-btn-sm amr-btn-ghost" style={{ fontSize: '10px', padding: '3px 10px', alignSelf: 'flex-start' }}><Plus size={10} /> Add charge</button>
        </div>
      </Row>
    </div>
  )
}
