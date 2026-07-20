import type { InvoiceTotals } from './types'

function Row({ label, value, dim = false }: { label: string; value: string; dim?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
      <span style={{ fontSize: '12px', color: dim ? 'var(--mist)' : 'var(--ink)', letterSpacing: '0.029em' }}>{label}</span>
      <span style={{ fontSize: '12px', fontVariantNumeric: 'tabular-nums', color: dim ? 'var(--mist)' : 'var(--ink)' }}>{value}</span>
    </div>
  )
}

export function TotalsSection({ totals }: { totals: InvoiceTotals }) {
  return (
    <div className="amr-card" style={{ overflow: 'hidden', padding: 0 }}>
      <div style={{ padding: '14px 20px 8px' }}><span className="amr-badge amr-badge-lavender" style={{ fontSize: '9px' }}>Totals</span></div>
      <div style={{ padding: '0 20px' }}>
        {totals.subtotal > 0 && <Row label="Subtotal" value={`₦${totals.subtotal.toLocaleString()}`} />}
        {totals.discount > 0 && <Row label="Discount" value={`−₦${totals.discount.toLocaleString()}`} />}
        {totals.vat > 0 && <Row label="VAT" value={`₦${totals.vat.toLocaleString()}`} />}
        {totals.wht > 0 && <Row label="WHT" value={`−₦${totals.wht.toLocaleString()}`} />}
        {totals.chargeItems.map((c, i) => <Row key={i} label={c.title || 'Charge'} value={`₦${c.value.toLocaleString()}`} />)}
      </div>
      <div className="amr-grand-total">
        <div className="amr-grand-label">Grand Total</div>
        <div className="amr-grand-value">₦{totals.grandTotal.toLocaleString()}</div>
      </div>
      {totals.words && (
        <div style={{ padding: '16px 20px' }}>
          <p style={{ fontWeight: 400, fontStyle: 'italic', fontSize: '11px', lineHeight: 1.6, color: 'var(--mist)' }}>{totals.words}</p>
        </div>
      )}
    </div>
  )
}
