import { useState, useCallback, useRef } from 'react'
import { sampleInvoice } from './data'
import type { InvoiceData, InvoiceTotals } from './types'
import { InvoiceHeader } from './InvoiceHeader'
import { LineItemsSection } from './LineItemsSection'
import { CommercialSettings } from './CommercialSettings'
import { TotalsSection } from './TotalsSection'
import { AdditionalInfo } from './AdditionalInfo'
import { FloatingSave } from './FloatingSave'
import { QuickActions } from './QuickActions'
import './index.css'

function toWords(n: number): string {
  if (n === 0) return 'Zero Naira Only'
  const o = ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen']
  const t = ['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety']
  const h = (n: number): string => { if (n===0) return ''; if (n<20) return o[n]; if (n<100) return t[Math.floor(n/10)]+(n%10?' '+o[n%10]:''); return o[Math.floor(n/100)]+' Hundred'+(n%100?' and '+h(n%100):'') }
  const ni = Math.floor(n); const k = Math.round((n-ni)*100)
  let r = ''
  if (ni>=1000000){r+=h(Math.floor(ni/1000000))+' Million ';const rm=ni%1000000;if(rm>=1000)r+=h(Math.floor(rm/1000))+' Thousand ';else if(rm>0)r+=h(rm)}
  else if(ni>=1000){r+=h(Math.floor(ni/1000))+' Thousand ';const rm=ni%1000;if(rm>0)r+=h(rm)}
  else r+=h(ni)
  r=r.trim()+' Naira'; if(k>0) r+=' and '+h(k)+' Kobo'; return r+' Only'
}

function computeTotals(data: InvoiceData): InvoiceTotals {
  const allItems = [...data.standaloneItems, ...data.groups.flatMap((g) => g.items)]
  const subtotal = allItems.reduce((s, i) => s + i.quantity * i.unitPrice, 0)
  let discount = 0
  if (data.commercial.discount.type === 'percentage') discount = subtotal * (data.commercial.discount.value / 100)
  else if (data.commercial.discount.type === 'flat') discount = data.commercial.discount.value
  const afterDisc = subtotal - discount
  const vat = data.commercial.vat.enabled ? afterDisc * (data.commercial.vat.percentage / 100) : 0
  let wht = 0
  if (data.commercial.wht.type === 'percentage') wht = afterDisc * (data.commercial.wht.value / 100)
  else if (data.commercial.wht.type === 'flat') wht = data.commercial.wht.value
  const chargeItems = data.commercial.charges.items.filter((c) => c.title.trim() && c.value > 0).map((c) => ({ title: c.title, value: c.value }))
  const chargeTotal = chargeItems.reduce((s, c) => s + c.value, 0)
  const grand = Math.max(0, afterDisc + vat - wht + chargeTotal)
  return { subtotal, discount, vat, wht, chargeItems, grandTotal: grand, words: toWords(grand) }
}

export default function InvoiceWorkspace() {
  const [data, setData] = useState<InvoiceData>(sampleInvoice)
  const [confirmClear, setConfirmClear] = useState(false)

  const update = useCallback((patch: Partial<InvoiceData>) => setData((prev) => ({ ...prev, ...patch })), [])
  const totals = computeTotals(data)

  const handleSave = useCallback(() => console.log('Save AMRA:', data), [data])
  const handleClear = useCallback(() => {
    setData((prev) => ({
      ...prev, groups: [], standaloneItems: [],
      commercial: { ...prev.commercial, discount: { type: 'none', value: 0, timing: 'before_tax' }, vat: { enabled: true, percentage: 7.5 }, wht: { type: 'none', value: 0 }, charges: { items: [], timing: 'after_tax' } },
      notes: '',
    }))
    setConfirmClear(false)
  }, [])

  return (
    <div className="amr-root" style={{ overflowX: 'hidden' }}>
      {confirmClear && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(20,20,20,0.3)', padding: '16px' }} onClick={() => setConfirmClear(false)}>
          <div className="amr-card" style={{ maxWidth: '340px', width: '100%', padding: '24px' }} onClick={(e) => e.stopPropagation()}>
            <div className="amr-heading" style={{ marginBottom: '8px' }}>Clear all data?</div>
            <p style={{ fontSize: '13px', color: 'var(--mist)', lineHeight: 1.5, marginBottom: '20px' }}>This will remove all items, groups, charges, and notes. This cannot be undone.</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button type="button" onClick={() => setConfirmClear(false)} className="amr-btn amr-btn-sm">Cancel</button>
              <button type="button" onClick={handleClear} className="amr-btn amr-btn-sm" style={{ color: '#b91c1c', borderColor: '#b91c1c' }}>Clear All</button>
            </div>
          </div>
        </div>
      )}

      <header style={{ borderBottom: '1px solid var(--veil)', padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="flex items-center gap-3">
          <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--ink)', letterSpacing: '-0.01em' }}>BIGDROPS</span>
          <span style={{ color: 'var(--veil)', fontSize: '14px' }}>/</span>
          <span className="amr-label" style={{ fontSize: '11px' }}>Invoice — AMRA</span>
        </div>
        <QuickActions onSave={handleSave} onClearAll={() => setConfirmClear(true)} />
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <InvoiceHeader data={data} onUpdate={update} />
        <LineItemsSection data={data} onUpdate={update} />
        <div style={{ marginTop: '32px' }}><CommercialSettings settings={data.commercial} onUpdate={(c) => update({ commercial: c })} /></div>
        <div style={{ marginTop: '32px' }}><TotalsSection totals={totals} /></div>
        <div style={{ marginTop: '32px', paddingBottom: '80px' }}><AdditionalInfo notes={data.notes} onUpdate={(n) => update({ notes: n })} /></div>
      </main>

      <FloatingSave onSave={handleSave} />
    </div>
  )
}
