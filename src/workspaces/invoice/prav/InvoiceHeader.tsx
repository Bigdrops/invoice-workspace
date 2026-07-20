import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check, Plus, X } from 'lucide-react'
import { MOCK_CLIENTS } from '@/lib/mock-data'
import type { InvoiceHeader as InvoiceHeaderType } from '@/types/invoice'

interface InvoiceHeaderProps {
  header: InvoiceHeaderType
  onUpdate: (patch: Partial<InvoiceHeaderType>) => void
  selectedClientId: string
}

export function InvoiceHeader({ header, onUpdate }: InvoiceHeaderProps) {
  const [showClientDropdown, setShowClientDropdown] = useState(false)
  const [clientSearch, setClientSearch] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedClient = MOCK_CLIENTS.find((c) => c.id === header.clientId)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowClientDropdown(false)
        setClientSearch('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredClients = MOCK_CLIENTS.filter((c) =>
    c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(clientSearch.toLowerCase())
  )

  return (
    <div className="surface-card" style={{ padding: '16px' }}>
      {/* Row 1: Badge + Title + Invoice No */}
      <div className="flex flex-col gap-2" style={{ marginBottom: '12px' }}>
        <div className="flex items-center gap-2">
          <span className="badge badge-dark">Invoice</span>
          <input
            type="text"
            value={header.invoiceNumber}
            onChange={(e) => onUpdate({ invoiceNumber: e.target.value })}
            className="input-compact"
            style={{ width: '120px', fontWeight: 700, fontSize: '12px', textAlign: 'right' }}
          />
        </div>
        <input
          type="text"
          value={header.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Invoice title or subject"
          className="input-compact"
          style={{ fontWeight: 400, fontSize: '15px', color: 'var(--ink-black)' }}
        />
      </div>

      {/* Row 2: Client + PO + Dates */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-2"
        style={{ paddingTop: '12px', borderTop: '1px solid var(--bone)' }}
      >
        {/* Client */}
        <div className="relative" ref={dropdownRef}>
          <span className="typo-label" style={{ display: 'block', marginBottom: '2px', fontSize: '9px' }}>Bill To</span>
          <button
            type="button"
            onClick={() => setShowClientDropdown(!showClientDropdown)}
            className="w-full text-left"
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: showClientDropdown ? '2px solid var(--ink-black)' : '1px solid var(--bone)',
              padding: '4px 24px 4px 0',
              fontSize: '13px',
              fontFamily: 'var(--font-body)',
              color: selectedClient ? 'var(--ink-black)' : 'var(--ash)',
              cursor: 'pointer',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23181011' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 2px center',
              transition: 'border-color 0.2s',
            }}
          >
            {selectedClient?.name || 'Select client'}
          </button>

          {showClientDropdown && (
            <div
              className="absolute z-50 w-full"
              style={{
                top: '100%',
                marginTop: '4px',
                background: 'var(--pure-white)',
                border: '1px solid var(--bone)',
                borderRadius: 'var(--radius)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                maxHeight: '200px',
                overflowY: 'auto',
              }}
            >
              <div style={{ padding: '6px 10px', borderBottom: '1px solid var(--bone)' }}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={clientSearch}
                  onChange={(e) => setClientSearch(e.target.value)}
                  className="input-compact"
                  autoFocus
                />
              </div>
              <div className="scrollbar-thin" style={{ maxHeight: '160px', overflowY: 'auto', padding: '4px' }}>
                {filteredClients.map((client) => (
                  <button
                    key={client.id}
                    type="button"
                    onClick={() => {
                      onUpdate({ clientId: client.id })
                      setShowClientDropdown(false)
                      setClientSearch('')
                    }}
                    className="w-full text-left flex items-center gap-2"
                    style={{
                      padding: '8px 10px',
                      fontSize: '12px',
                      background: header.clientId === client.id ? 'rgba(24,16,17,0.04)' : 'transparent',
                      border: 'none',
                      borderRadius: 'var(--radius)',
                      cursor: 'pointer',
                      color: 'var(--ink-black)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <div style={{ fontWeight: 700, fontSize: '12px' }}>{client.name}</div>
                      <div style={{ fontSize: '10px', color: 'var(--ash)' }}>{client.email}</div>
                    </div>
                    {header.clientId === client.id && <Check size={12} color="var(--ink-black)" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Purchase Order */}
        <div>
          <span className="typo-label" style={{ display: 'block', marginBottom: '2px', fontSize: '9px' }}>Purchase Order</span>
          <input
            type="text"
            value={header.purchaseOrder}
            onChange={(e) => onUpdate({ purchaseOrder: e.target.value })}
            placeholder="PO number"
            className="input-compact"
          />
        </div>

        {/* Issue Date + Due Date */}
        <div className="sm:col-span-2 grid grid-cols-2 gap-3">
          <div>
            <span className="typo-label" style={{ display: 'block', marginBottom: '2px', fontSize: '9px' }}>Issue Date</span>
            <input
              type="date"
              value={header.issueDate}
              onChange={(e) => onUpdate({ issueDate: e.target.value })}
              className="input-compact"
              style={{ fontSize: '12px' }}
            />
          </div>
          <div>
            <span className="typo-label" style={{ display: 'block', marginBottom: '2px', fontSize: '9px' }}>Due Date</span>
            <input
              type="date"
              value={header.dueDate}
              onChange={(e) => onUpdate({ dueDate: e.target.value })}
              className="input-compact"
              style={{ fontSize: '12px' }}
            />
          </div>
        </div>
      </div>

      {/* Custom Header Fields — inline rows */}
      <div style={{ marginTop: '10px' }}>
        {header.customFields.map((field, idx) => (
          <div key={idx} className="flex items-center gap-2" style={{ marginBottom: '4px' }}>
            <input
              type="text"
              value={field.label}
              onChange={(e) => {
                const fields = [...header.customFields]
                fields[idx] = { ...fields[idx], label: e.target.value }
                onUpdate({ customFields: fields })
              }}
              placeholder="Title"
              className="input-compact"
              style={{ width: '80px', flex: 'none', fontSize: '12px' }}
            />
            <input
              type="text"
              value={field.value}
              onChange={(e) => {
                const fields = [...header.customFields]
                fields[idx] = { ...fields[idx], value: e.target.value }
                onUpdate({ customFields: fields })
              }}
              placeholder="Value"
              className="input-compact"
              style={{ flex: 1, fontSize: '12px' }}
            />
            <button
              type="button"
              onClick={() => {
                onUpdate({ customFields: header.customFields.filter((_, i) => i !== idx) })
              }}
              className="btn-icon btn-icon-sm"
              style={{ width: '20px', height: '20px' }}
            >
              <X size={10} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            onUpdate({
              customFields: [...header.customFields, { label: '', value: '' }],
            })
          }}
          className="btn-ghost"
          style={{ fontSize: '10px', padding: '2px 6px' }}
        >
          <Plus size={10} /> Add field
        </button>
      </div>
    </div>
  )
}
