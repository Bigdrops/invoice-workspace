import type { Client, InvoiceData, LineItem, LineGroup, UnitType } from './types'

let _id = 0
export const uid = () => `s${++_id}-${Math.random().toString(36).slice(2, 7)}`

export const CLIENTS: Client[] = [
  { id: 'c1', name: 'Dangote Industries', email: 'accounts@dangote.com', address: '14 Marina, Lagos' },
  { id: 'c2', name: 'Zenith Bank Plc', email: 'ap@zenithbank.com', address: '47 Marina, Lagos' },
  { id: 'c3', name: 'MTN Nigeria', email: 'procurement@mtn.com', address: '4 NWALC Road, Lagos' },
  { id: 'c4', name: 'Nigerian Breweries', email: 'finance@nbplc.com', address: '1 Love Garden, Lagos' },
]

export const UNITS: { value: UnitType; label: string }[] = [
  { value: 'pcs', label: 'Pcs' }, { value: 'kg', label: 'Kg' }, { value: 'lb', label: 'Lb' },
  { value: 'hr', label: 'Hr' }, { value: 'day', label: 'Day' }, { value: 'lot', label: 'Lot' },
  { value: 'set', label: 'Set' }, { value: 'box', label: 'Box' },
]

function makeItem(desc: string, qty: number, unit: UnitType, price: number): LineItem {
  return { id: uid(), description: desc, quantity: qty, unit, unitPrice: price }
}

function makeGroup(title: string, items: LineItem[]): LineGroup {
  return { id: uid(), title, collapsed: false, items }
}

export function emptyItem(): LineItem {
  return { id: uid(), description: '', quantity: 1, unit: 'pcs', unitPrice: 0 }
}

export function emptyGroup(): LineGroup {
  return { id: uid(), title: '', collapsed: false, items: [emptyItem()] }
}

export function sampleInvoice(): InvoiceData {
  return {
    invoiceNumber: `INV-${Date.now().toString(36).toUpperCase().slice(-6)}`,
    title: 'Supply of Industrial Equipment',
    client: CLIENTS[0],
    purchaseOrder: 'PO-2026-0847',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    groups: [
      makeGroup('Equipment', [
        makeItem('Caterpillar 320F Hydraulic Excavator', 1, 'pcs', 45000000),
        makeItem('CAT Engine Oil Filter — 1R-0750', 12, 'pcs', 28500),
        makeItem('Hydraulic Oil ISO VG 46 — 20L Drum', 8, 'pcs', 67500),
      ]),
      makeGroup('Services', [
        makeItem('Installation & Commissioning', 1, 'lot', 3500000),
        makeItem('Operator Training Program', 6, 'day', 150000),
      ]),
    ],
    standaloneItems: [],
    commercial: {
      paymentTerms: 'Net 30',
      discount: { type: 'percentage', value: 5, timing: 'before_tax' },
      vat: { enabled: true, percentage: 7.5 },
      wht: { type: 'none', value: 0 },
      charges: { items: [], timing: 'after_tax' },
    },
    notes: '',
  }
}
