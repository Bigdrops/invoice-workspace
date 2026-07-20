import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check, Plus, X } from 'lucide-react'
import { CLIENTS } from './data'
import type { InvoiceData } from './types'

export function InvoiceHeader({ data, onUpdate }: { data: InvoiceData; onUpdate: (p: Partial<InvoiceData>) => void }) {
  const [clientOpen, setClientOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) { setClientOpen(false); setSearch('') } }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const filtered = CLIENTS.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
  const client = data.client

  return (
    <div className="amr-card" style={{ marginBottom: '32px' }}>
      {/* Title row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '24px' }}>
        <div className="amr-badge amr-badge-lavender">Invoice</div>
        <div style={{ flex: 1 }}>
          <input type="text" value={data.invoiceNumber} onChange={(e) => onUpdate({ invoiceNumber: e.target.value })}
            className="amr-input-compact amr-input-right"
            style={{ width: '140px', fontWeight: 400, fontSize: '12px', float: 'right' }} />
          <input type="text" value={data.title} onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="Invoice title"
            className="amr-input"
            style={{ fontSize: '18px', color: 'var(--ink)', letterSpacing: '-0.2px' }} />
        </div>
      </div>

      <div style={{ height: '1px', background: 'var(--veil)', margin: '0 0 20px' }} />

      {/* Fields */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Client */}
        <div className="relative" ref={ref}>
          <span className="amr-label" style={{ display: 'block', marginBottom: '6px' }}>Bill To</span>
          <button type="button" onClick={() => setClientOpen(!clientOpen)} className="w-full text-left"
            style={{ background: 'transparent', border: 'none', borderBottom: clientOpen ? '2px solid var(--lavender)' : '1px solid var(--veil)', padding: '6px 24px 6px 0', fontSize: '14px', fontFamily: 'var(--font-body)', fontWeight: 400, color: client ? 'var(--ink)' : 'var(--mist)', cursor: 'pointer',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23141414' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat', backgroundPosition: 'right 4px center', transition: 'border-color 0.2s' }}>
            {client?.name || 'Select client'}
          </button>
          {clientOpen && (
            <div className="absolute z-50 w-full" style={{ top: '100%', marginTop: '4px', background: 'var(--paper)', border: '1px solid var(--veil)', borderRadius: 'var(--radius-btn)', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', maxHeight: '200px', overflowY: 'auto' }}>
              <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--veil)' }}>
                <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="amr-input-compact" autoFocus />
              </div>
              <div className="scrollbar-amr" style={{ maxHeight: '160px', overflowY: 'auto', padding: '4px' }}>
                {filtered.map((c) => (
                  <button key={c.id} type="button" onClick={() => { onUpdate({ client: c }); setClientOpen(false); setSearch('') }}
                    className="w-full text-left flex items-center gap-2"
                    style={{ padding: '8px 12px', fontSize: '13px', background: client?.id === c.id ? 'var(--lavender-soft)' : 'transparent', border: 'none', borderRadius: '6px', cursor: 'pointer', color: 'var(--ink)', fontFamily: 'var(--font-body)' }}>
                    <div className="flex-1 min-w-0">
                      <div style={{ fontWeight: 400 }}>{c.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--mist)' }}>{c.email}</div>
                    </div>
                    {client?.id === c.id && <Check size={12} color="var(--lavender)" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* PO */}
        <div>
          <span className="amr-label" style={{ display: 'block', marginBottom: '6px' }}>Purchase Order</span>
          <input type="text" value={data.purchaseOrder} onChange={(e) => onUpdate({ purchaseOrder: e.target.value })} placeholder="PO number" className="amr-input" />
        </div>

        {/* Dates */}
        <div>
          <span className="amr-label" style={{ display: 'block', marginBottom: '6px' }}>Issue Date</span>
          <input type="date" value={data.issueDate} onChange={(e) => onUpdate({ issueDate: e.target.value })} className="amr-input" style={{ fontSize: '13px' }} />
        </div>
        <div>
          <span className="amr-label" style={{ display: 'block', marginBottom: '6px' }}>Due Date</span>
          <input type="date" value={data.dueDate} onChange={(e) => onUpdate({ dueDate: e.target.value })} className="amr-input" style={{ fontSize: '13px' }} />
        </div>
      </div>
    </div>
  )
}
