import type { InvoiceTotals } from './types'

function Row({ label, value, dim = false }: { label: string; value: string; dim?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
      <span style={{ fontSize: '12px', color: dim ? 'var(--mid)' : 'var(--ink)' }}>{label}</span>
      <span style={{ fontSize: '12px', fontVariantNumeric: 'tabular-nums', color: dim ? 'var(--mid)' : 'var(--ink)' }}>{value}</span>
    </div>
  )
}

export function TotalsSection({ totals }: { totals: InvoiceTotals }) {
  return (
    <div className="sack-card" style={{ overflow: 'hidden', padding: 0 }}>
      <div style={{ padding: '10px 16px 6px' }}>
        <span className="sack-tag sack-tag-cobalt">Totals</span>
      </div>

      <div style={{ padding: '0 16px' }}>
        {totals.subtotal > 0 && <Row label="Subtotal" value={`₦${totals.subtotal.toLocaleString()}`} />}
        {totals.discount > 0 && <Row label="Discount" value={`−₦${totals.discount.toLocaleString()}`} />}
        {totals.vat > 0 && <Row label="VAT" value={`₦${totals.vat.toLocaleString()}`} />}
        {totals.wht > 0 && <Row label="WHT" value={`−₦${totals.wht.toLocaleString()}`} />}
        {totals.chargeItems.map((c, i) => (
          <Row key={i} label={c.title || 'Charge'} value={`₦${c.value.toLocaleString()}`} />
        ))}
      </div>

      <div className="sack-grand-total">
        <div style={{ fontWeight: 400, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '3px' }}>Grand Total</div>
        <div style={{ fontWeight: 400, fontSize: '22px', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>₦{totals.grandTotal.toLocaleString()}</div>
      </div>

      {totals.words && (
        <div style={{ padding: '10px 16px' }}>
          <p className="sack-serif" style={{ fontSize: '11px' }}>{totals.words}</p>
        </div>
      )}
    </div>
  )
}
