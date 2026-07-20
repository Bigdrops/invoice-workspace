import { useState, useRef } from 'react'
import { ChevronDown, Plus, Trash2, PenTool, X, ImagePlus } from 'lucide-react'
import type { AdditionalInfo } from '@/types/invoice'

interface AdditionalInfoProps {
  additional: AdditionalInfo
  onUpdate: (additional: AdditionalInfo) => void
}

function ExpandableSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
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
        <span style={{ fontWeight: 500, fontSize: '12px' }}>{title}</span>
        <ChevronDown size={12} style={{ color: 'var(--ash)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>
      {open && (
        <div style={{ padding: '0 16px 12px', animation: 'fade-in-up 0.2s ease-out' }}>
          {children}
        </div>
      )}
    </div>
  )
}

/* ── Signature Picker ── */
function SignaturePicker({
  value,
  onChange,
}: {
  value: string
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
      <div className="signature-picker">
        <img src={value} alt="Signature" className="signature-preview" />
        <div className="flex items-center gap-2" style={{ marginTop: '8px' }}>
          <button type="button" onClick={() => fileRef.current?.click()} className="btn-ghost" style={{ fontSize: '11px', padding: '3px 8px' }}>
            <PenTool size={11} /> Replace
          </button>
          <button type="button" onClick={() => onChange('')} className="btn-ghost" style={{ fontSize: '11px', padding: '3px 8px', color: '#b91c1c' }}>
            <X size={11} /> Remove
          </button>
        </div>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
      </div>
    )
  }

  return (
    <div className="signature-picker" onClick={() => fileRef.current?.click()} style={{ cursor: 'pointer', textAlign: 'center' }}>
      <div style={{ padding: '16px', color: 'var(--ash)' }}>
        <ImagePlus size={24} style={{ margin: '0 auto 6px' }} />
        <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--ink-black)' }}>Upload signature</div>
        <div style={{ fontSize: '10px' }}>Choose or upload signature image</div>
      </div>
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
    </div>
  )
}

export function AdditionalInfoPanel({ additional, onUpdate }: AdditionalInfoProps) {
  return (
    <div className="surface-card" style={{ overflow: 'hidden' }}>
      <div style={{ padding: '10px 16px 6px' }}>
        <span className="typo-eyebrow">Additional Information</span>
      </div>

      <ExpandableSection title="Notes" defaultOpen={false}>
        <textarea
          value={additional.notes}
          onChange={(e) => onUpdate({ ...additional, notes: e.target.value })}
          placeholder="Additional notes..."
          rows={3}
          className="input-textarea"
        />
      </ExpandableSection>

      <ExpandableSection title="Terms & Conditions" defaultOpen={false}>
        <textarea
          value={additional.terms}
          onChange={(e) => onUpdate({ ...additional, terms: e.target.value })}
          placeholder="Payment terms, warranty..."
          rows={4}
          className="input-textarea"
        />
      </ExpandableSection>

      <ExpandableSection title="Signatory" defaultOpen={false}>
        <SignaturePicker
          value={additional.signatureUrl}
          onChange={(url) => onUpdate({ ...additional, signatureUrl: url })}
        />
        <div style={{ marginTop: '8px' }}>
          <input
            type="text"
            value={additional.signatory}
            onChange={(e) => onUpdate({ ...additional, signatory: e.target.value })}
            placeholder="Signatory name"
            className="input-compact"
          />
        </div>
      </ExpandableSection>

      <ExpandableSection title="Reference Links" defaultOpen={false}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {additional.referenceLinks.map((link, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                value={link.label}
                onChange={(e) => {
                  const links = [...additional.referenceLinks]
                  links[idx] = { ...links[idx], label: e.target.value }
                  onUpdate({ ...additional, referenceLinks: links })
                }}
                placeholder="Label"
                className="input-compact"
                style={{ width: '70px', flex: 'none' }}
              />
              <input
                type="url"
                value={link.url}
                onChange={(e) => {
                  const links = [...additional.referenceLinks]
                  links[idx] = { ...links[idx], url: e.target.value }
                  onUpdate({ ...additional, referenceLinks: links })
                }}
                placeholder="https://..."
                className="input-compact"
                style={{ flex: 1 }}
              />
              <button
                type="button"
                onClick={() => {
                  onUpdate({
                    ...additional,
                    referenceLinks: additional.referenceLinks.filter((_, i) => i !== idx),
                  })
                }}
                className="btn-icon btn-icon-sm"
              >
                <Trash2 size={11} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              onUpdate({
                ...additional,
                referenceLinks: [...additional.referenceLinks, { label: '', url: '' }],
              })
            }}
            className="btn-ghost"
            style={{ fontSize: '10px', padding: '2px 8px', alignSelf: 'flex-start' }}
          >
            <Plus size={11} /> Add link
          </button>
        </div>
      </ExpandableSection>
    </div>
  )
}
