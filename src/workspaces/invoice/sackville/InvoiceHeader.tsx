import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check, Plus, X } from 'lucide-react'
import { CLIENTS } from './data'
import type { InvoiceData } from './types'

export function InvoiceHeader({ data, onUpdate }: { data: InvoiceData; onUpdate: (p: Partial<InvoiceData>) => void }) {
  const [clientOpen, setClientOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) { setClientOpen(false); setSearch('') }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const filtered = CLIENTS.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
  const client = data.client

  return (
    <div className="sack-card" style={{ padding: '20px' }}>
      {/* Top: badge + invoice number + title */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
        <span className="sack-tag sack-tag-filled">Invoice</span>
        <div style={{ flex: 1 }}>
          <input
            type="text"
            value={data.invoiceNumber}
            onChange={(e) => onUpdate({ invoiceNumber: e.target.value })}
            className="sack-compact"
            style={{ width: '140px', fontWeight: 400, fontSize: '11px', textAlign: 'right', float: 'right' }}
          />
          <input
            type="text"
            value={data.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="Invoice title"
            className="sack-compact"
            style={{ fontSize: '16px', color: 'var(--charcoal)', marginTop: '2px' }}
          />
        </div>
      </div>

      <hr className="sack-divider" style={{ marginBottom: '14px' }} />

      {/* Fields grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {/* Client */}
        <div className="relative" ref={ref}>
          <span className="sack-caption" style={{ display: 'block', marginBottom: '3px' }}>Bill To</span>
          <button
            type="button"
            onClick={() => setClientOpen(!clientOpen)}
            className="w-full text-left"
            style={{
              background: 'transparent', border: 'none',
              borderBottom: clientOpen ? '2px solid var(--cobalt)' : '1px solid var(--mid)',
              padding: '4px 20px 4px 0', fontSize: '13px', fontFamily: 'var(--font-grotesk)',
              color: client ? 'var(--ink)' : 'var(--mid)', cursor: 'pointer',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23231f20' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat', backgroundPosition: 'right 2px center',
            }}
          >
            {client?.name || 'Select client'}
          </button>
          {clientOpen && (
            <div className="absolute z-50 w-full" style={{ top: '100%', marginTop: '4px', background: 'var(--cream)', border: '1px solid var(--ink)', borderRadius: '10px', maxHeight: '180px', overflowY: 'auto' }}>
              <div style={{ padding: '6px 10px', borderBottom: '1px solid rgba(35,31,32,0.1)' }}>
                <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="sack-compact" autoFocus />
              </div>
              <div className="scrollbar-sack" style={{ maxHeight: '140px', overflowY: 'auto', padding: '4px' }}>
                {filtered.map((c) => (
                  <button key={c.id} type="button" onClick={() => { onUpdate({ client: c }); setClientOpen(false); setSearch('') }}
                    className="w-full text-left flex items-center gap-2"
                    style={{ padding: '7px 10px', fontSize: '12px', background: client?.id === c.id ? 'rgba(36,93,197,0.06)' : 'transparent', border: 'none', borderRadius: '6px', cursor: 'pointer', color: 'var(--ink)', fontFamily: 'var(--font-grotesk)' }}
                  >
                    <div className="flex-1 min-w-0">
                      <div style={{ fontWeight: 400 }}>{c.name}</div>
                      <div style={{ fontSize: '10px', color: 'var(--mid)' }}>{c.email}</div>
                    </div>
                    {client?.id === c.id && <Check size={12} color="var(--cobalt)" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* PO */}
        <div>
          <span className="sack-caption" style={{ display: 'block', marginBottom: '3px' }}>Purchase Order</span>
          <input type="text" value={data.purchaseOrder} onChange={(e) => onUpdate({ purchaseOrder: e.target.value })} placeholder="PO number" className="sack-compact" />
        </div>

        {/* Dates */}
        <div>
          <span className="sack-caption" style={{ display: 'block', marginBottom: '3px' }}>Issue Date</span>
          <input type="date" value={data.issueDate} onChange={(e) => onUpdate({ issueDate: e.target.value })} className="sack-compact" style={{ fontSize: '12px' }} />
        </div>
        <div>
          <span className="sack-caption" style={{ display: 'block', marginBottom: '3px' }}>Due Date</span>
          <input type="date" value={data.dueDate} onChange={(e) => onUpdate({ dueDate: e.target.value })} className="sack-compact" style={{ fontSize: '12px' }} />
        </div>
      </div>
    </div>
  )
}
