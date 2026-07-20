import { useState, useCallback } from 'react'
import { ChevronDown, Plus, Trash2 } from 'lucide-react'
import { PAYMENT_TERMS } from '@/lib/mock-data'
import { generateId, formatCurrency } from '@/lib/utils'
import type { CommercialSettings } from '@/types/invoice'

interface CommercialSettingsProps {
  commercial: CommercialSettings
  onUpdate: (commercial: CommercialSettings) => void
}

function SettingsRow({
  label,
  summary,
  children,
  defaultOpen = false,
}: {
  label: string
  summary: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div style={{ borderBottom: '1px solid var(--bone)' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-center justify-between"
        style={{ padding: '10px 16px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--charcoal)' }}
      >
        <div className="flex-1 min-w-0">
          <div style={{ fontWeight: 500, fontSize: '12px', color: 'var(--ink-black)' }}>{label}</div>
          <div style={{ fontSize: '11px', color: 'var(--ash)', marginTop: '1px' }}>{summary}</div>
        </div>
        <ChevronDown size={12} style={{ color: 'var(--ash)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0, marginLeft: '8px' }} />
      </button>
      {open && (
        <div style={{ padding: '0 16px 12px', animation: 'fade-in-up 0.2s ease-out' }}>
          {children}
        </div>
      )}
    </div>
  )
}

function ToggleGroup({
  options,
  value,
  onChange,
}: {
  options: Array<{ value: string; label: string }>
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="toggle-group">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`toggle-item ${value === opt.value ? 'toggle-item-active' : ''}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

function formatNumberInput(value: string): string {
  const raw = value.replace(/[^0-9]/g, '')
  if (!raw) return ''
  return parseInt(raw, 10).toLocaleString('en-US')
}

export function CommercialSettingsPanel({ commercial, onUpdate }: CommercialSettingsProps) {
  const discountSummary = commercial.discount.type === 'none'
    ? 'Not set'
    : commercial.discount.type === 'percentage'
      ? `${commercial.discount.value}%`
      : `₦${commercial.discount.value.toLocaleString()}`

  const vatSummary = commercial.vat.enabled ? `${commercial.vat.percentage}%` : 'Not set'

  const whtSummary = commercial.wht.type === 'none'
    ? 'Not set'
    : commercial.wht.type === 'percentage'
      ? `${commercial.wht.value}%`
      : `₦${commercial.wht.value.toLocaleString()}`

  const chargeCount = commercial.additionalCharges.items.length
  const chargeTotal = commercial.additionalCharges.items.reduce((sum, c) => sum + c.value, 0)
  const chargeSummary = chargeCount === 0
    ? 'Not set'
    : `${chargeCount} charge${chargeCount !== 1 ? 's' : ''} — ${formatCurrency(chargeTotal)}`

  const addCharge = useCallback(() => {
    onUpdate({
      ...commercial,
      additionalCharges: {
        ...commercial.additionalCharges,
        items: [...commercial.additionalCharges.items, { id: generateId(), title: '', value: 0 }],
      },
    })
  }, [commercial, onUpdate])

  const updateCharge = useCallback((chargeId: string, patch: Partial<{ title: string; value: number }>) => {
    onUpdate({
      ...commercial,
      additionalCharges: {
        ...commercial.additionalCharges,
        items: commercial.additionalCharges.items.map((c) =>
          c.id === chargeId ? { ...c, ...patch } : c
        ),
      },
    })
  }, [commercial, onUpdate])

  const removeCharge = useCallback((chargeId: string) => {
    onUpdate({
      ...commercial,
      additionalCharges: {
        ...commercial.additionalCharges,
        items: commercial.additionalCharges.items.filter((c) => c.id !== chargeId),
      },
    })
  }, [commercial, onUpdate])

  return (
    <div className="surface-card" style={{ overflow: 'hidden' }}>
      <div style={{ padding: '10px 16px 6px' }}>
        <span className="typo-eyebrow">Commercial Settings</span>
      </div>

      {/* Payment Terms */}
      <SettingsRow label="Payment Terms" summary={commercial.paymentTerms?.label || 'Not set'}>
        <select
          value={commercial.paymentTerms?.id ?? ''}
          onChange={(e) => {
            const term = PAYMENT_TERMS.find((p) => p.id === e.target.value) ?? null
            onUpdate({ ...commercial, paymentTerms: term })
          }}
          className="input-compact"
          style={{ width: '100%' }}
        >
          <option value="">None</option>
          {PAYMENT_TERMS.map((t) => (
            <option key={t.id} value={t.id}>{t.label}</option>
          ))}
        </select>
      </SettingsRow>

      {/* Discount */}
      <SettingsRow label="Discount" summary={discountSummary}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <ToggleGroup
            options={[
              { value: 'percentage', label: 'Percentage' },
              { value: 'flat', label: 'Flat Amount' },
            ]}
            value={commercial.discount.type === 'none' ? 'percentage' : commercial.discount.type}
            onChange={(v) => onUpdate({
              ...commercial,
              discount: { ...commercial.discount, type: v as any },
            })}
          />
          {commercial.discount.type !== 'none' && (
            <input
              type="number"
              value={commercial.discount.value}
              onChange={(e) => onUpdate({
                ...commercial,
                discount: { ...commercial.discount, value: parseFloat(e.target.value) || 0 },
              })}
              placeholder={commercial.discount.type === 'percentage' ? 'Percentage' : 'Amount'}
              className="input-compact"
            />
          )}
          <ToggleGroup
            options={[
              { value: 'before_tax', label: 'Before Tax' },
              { value: 'after_tax', label: 'After Tax' },
            ]}
            value={commercial.discount.timing}
            onChange={(v) => onUpdate({
              ...commercial,
              discount: { ...commercial.discount, timing: v as any },
            })}
          />
        </div>
      </SettingsRow>

      {/* VAT */}
      <SettingsRow label="VAT" summary={vatSummary}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={commercial.vat.enabled ? commercial.vat.percentage : ''}
              onChange={(e) => onUpdate({
                ...commercial,
                vat: { enabled: true, percentage: parseFloat(e.target.value) || 0 },
              })}
              placeholder="Percentage"
              className="input-compact"
              style={{ width: '100px' }}
              step="0.5"
            />
            <span style={{ fontSize: '11px', color: 'var(--ash)' }}>%</span>
          </div>
          <button
            type="button"
            onClick={() => onUpdate({ ...commercial, vat: { ...commercial.vat, enabled: false } })}
            className="btn-ghost"
            style={{ fontSize: '10px', padding: '2px 8px', alignSelf: 'flex-start' }}
          >
            Disable
          </button>
        </div>
      </SettingsRow>

      {/* WHT */}
      <SettingsRow label="Withholding Tax" summary={whtSummary}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <ToggleGroup
            options={[
              { value: 'percentage', label: 'Percentage' },
              { value: 'flat', label: 'Flat Amount' },
            ]}
            value={commercial.wht.type === 'none' ? 'percentage' : commercial.wht.type}
            onChange={(v) => onUpdate({
              ...commercial,
              wht: { ...commercial.wht, type: v as any },
            })}
          />
          {commercial.wht.type !== 'none' && (
            <input
              type="number"
              value={commercial.wht.value}
              onChange={(e) => onUpdate({
                ...commercial,
                wht: { ...commercial.wht, value: parseFloat(e.target.value) || 0 },
              })}
              placeholder="Amount"
              className="input-compact"
            />
          )}
        </div>
      </SettingsRow>

      {/* Additional Charges — Title + Value list */}
      <SettingsRow label="Additional Charges" summary={chargeSummary}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Timing toggle — always visible */}
          <ToggleGroup
            options={[
              { value: 'before_tax', label: 'Before Tax' },
              { value: 'after_tax', label: 'After Tax' },
            ]}
            value={commercial.additionalCharges.timing}
            onChange={(v) => onUpdate({
              ...commercial,
              additionalCharges: { ...commercial.additionalCharges, timing: v as any },
            })}
          />

          {/* Charge rows */}
          {commercial.additionalCharges.items.map((charge) => (
            <div key={charge.id} className="charge-row">
              <input
                type="text"
                value={charge.title}
                onChange={(e) => updateCharge(charge.id, { title: e.target.value })}
                placeholder="Charge title"
                className="input-compact"
              />
              <input
                type="text"
                value={charge.value ? formatNumberInput(String(charge.value)) : ''}
                onChange={(e) => updateCharge(charge.id, { value: parseFloat(e.target.value.replace(/[^0-9.]/g, '')) || 0 })}
                placeholder="0"
                className="input-compact input-compact-right"
              />
              <button
                type="button"
                onClick={() => removeCharge(charge.id)}
                className="btn-icon btn-icon-sm"
                style={{ width: '20px', height: '20px', flexShrink: 0, color: 'var(--ash)' }}
              >
                <Trash2 size={11} />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addCharge}
            className="btn-ghost"
            style={{ fontSize: '11px', padding: '4px 8px', alignSelf: 'flex-start' }}
          >
            <Plus size={12} /> Add charge
          </button>
        </div>
      </SettingsRow>
    </div>
  )
}
