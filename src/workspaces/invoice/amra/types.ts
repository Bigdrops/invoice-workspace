export type UnitType = 'pcs' | 'kg' | 'lb' | 'hr' | 'day' | 'lot' | 'set' | 'box'

export interface AdditionalCharge { id: string; title: string; value: number }

export interface LineItem {
  id: string; description: string; quantity: number; unit: UnitType; unitPrice: number
}

export interface LineGroup {
  id: string; title: string; collapsed: boolean; items: LineItem[]
}

export interface CommercialSettings {
  paymentTerms: string
  discount: { type: 'none' | 'percentage' | 'flat'; value: number; timing: 'before_tax' | 'after_tax' }
  vat: { enabled: boolean; percentage: number }
  wht: { type: 'none' | 'percentage' | 'flat'; value: number }
  charges: { items: AdditionalCharge[]; timing: 'before_tax' | 'after_tax' }
}

export interface InvoiceData {
  invoiceNumber: string
  title: string
  client: { id: string; name: string; email: string; address?: string } | null
  purchaseOrder: string
  issueDate: string
  dueDate: string
  groups: LineGroup[]
  standaloneItems: LineItem[]
  commercial: CommercialSettings
  notes: string
}

export interface InvoiceTotals {
  subtotal: number; discount: number; vat: number; wht: number
  chargeItems: Array<{ title: string; value: number }>
  grandTotal: number; words: string
}
