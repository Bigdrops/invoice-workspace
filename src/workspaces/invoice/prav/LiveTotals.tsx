import { formatCurrency } from '@/lib/utils'
import type { InvoiceTotals } from '@/types/invoice'

interface LiveTotalsProps {
  totals: InvoiceTotals
}

export function LiveTotals({ totals }: LiveTotalsProps) {
  return (
    <div className="surface-card" style={{ overflow: 'hidden', padding: 0 }}>
      <div style={{ padding: '10px 16px 6px' }}>
        <span className="typo-eyebrow">Totals</span>
      </div>

      {/* Supporting values */}
      <div style={{ padding: '0 16px' }}>
        {totals.subtotal > 0 && (
          <div className="flex items-center justify-between" style={{ padding: '3px 0' }}>
            <span style={{ fontSize: '12px', color: 'var(--ash)' }}>Subtotal</span>
            <span style={{ fontSize: '12px', fontVariantNumeric: 'tabular-nums', color: 'var(--ink-black)' }}>{formatCurrency(totals.subtotal)}</span>
          </div>
        )}

        {totals.discount > 0 && (
          <div className="flex items-center justify-between" style={{ padding: '3px 0' }}>
            <span style={{ fontSize: '12px', color: 'var(--ash)' }}>Discount</span>
            <span style={{ fontSize: '12px', fontVariantNumeric: 'tabular-nums', color: 'var(--ink-black)' }}>−{formatCurrency(totals.discount)}</span>
          </div>
        )}

        {totals.vat > 0 && (
          <div className="flex items-center justify-between" style={{ padding: '3px 0' }}>
            <span style={{ fontSize: '12px', color: 'var(--ash)' }}>VAT</span>
            <span style={{ fontSize: '12px', fontVariantNumeric: 'tabular-nums', color: 'var(--ink-black)' }}>{formatCurrency(totals.vat)}</span>
          </div>
        )}

        {totals.wht > 0 && (
          <div className="flex items-center justify-between" style={{ padding: '3px 0' }}>
            <span style={{ fontSize: '12px', color: 'var(--ash)' }}>WHT</span>
            <span style={{ fontSize: '12px', fontVariantNumeric: 'tabular-nums', color: 'var(--ink-black)' }}>−{formatCurrency(totals.wht)}</span>
          </div>
        )}

        {/* Individual charges by title */}
        {totals.additionalChargeItems.map((charge, idx) => (
          <div key={idx} className="flex items-center justify-between" style={{ padding: '3px 0' }}>
            <span style={{ fontSize: '12px', color: 'var(--ash)' }}>{charge.title || 'Charge'}</span>
            <span style={{ fontSize: '12px', fontVariantNumeric: 'tabular-nums', color: 'var(--ink-black)' }}>{formatCurrency(charge.value)}</span>
          </div>
        ))}

        {totals.installTotal > 0 && (
          <div className="flex items-center justify-between" style={{ padding: '3px 0' }}>
            <span style={{ fontSize: '12px', color: 'var(--ash)' }}>Install</span>
            <span style={{ fontSize: '12px', fontVariantNumeric: 'tabular-nums', color: 'var(--ink-black)' }}>{formatCurrency(totals.installTotal)}</span>
          </div>
        )}
      </div>

      {/* Grand Total — dominant */}
      <div className="grand-total-row" style={{ marginTop: '8px' }}>
        <div className="grand-total-label">Grand Total</div>
        <div className="grand-total-value">{formatCurrency(totals.grandTotal)}</div>
      </div>

      {/* Amount in words — secondary */}
      {totals.amountInWords && (
        <div style={{ padding: '10px 16px' }}>
          <p style={{
            fontWeight: 400,
            fontStyle: 'italic',
            fontSize: '11px',
            lineHeight: 1.5,
            color: 'var(--ash)',
          }}>
            {totals.amountInWords}
          </p>
        </div>
      )}
    </div>
  )
}
