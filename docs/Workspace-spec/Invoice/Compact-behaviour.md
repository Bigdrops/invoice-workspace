```markdown
# Invoice Workspace — Behavioral Architecture (Final)
**Version:** 2.3 | **Date:** 2026-07-21 | **Status:** Final
---
## 1. Purpose
This document defines the behavioral architecture of the Invoice Workspace — a mobile‑first, offline‑ready invoice builder. It describes what the form does and how it should behave, without prescribing visual design, layout, or positioning.
Any design system can implement this behavior while maintaining its own visual identity.
---
## 2. Core Data Model
```typescript
interface Invoice {
  id: string;
  header: InvoiceHeader;
  groups: LineGroup[];
  standaloneItems: LineItem[];
  commercial: CommercialSettings;
  payment: PaymentDetails;
  additional: AdditionalInfo;
  totals: InvoiceTotals;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  createdAt: string;
  updatedAt: string;
}
interface InvoiceHeader {
  title?: string;                    // Optional — what the invoice is for
  client: string;
  invoiceNumber: string;
  poNumber: string;
  issueDate: string;
  dueDate: string;
  customFields: CustomField[];
}
interface CustomField {
  id: string;
  label: string;
  value: string;
}
interface LineGroup {
  id: string;
  name: string;
  items: LineItem[];
  subtotal: number;                  // Derived: sum of item totals in group
}
interface LineItem {
  id: string;
  number: number;                    // Auto-assigned, sequential
  description: string;
  subDescription: string;
  quantity: number;
  unitPrice: number;
  total: number;                     // Derived: quantity × unitPrice
  hasPhoto: boolean;
  photoData?: string;
  // Additional columns are flexible — more than description, qty, rate
}
interface CommercialSettings {
  paymentTerms: string;
  customPaymentTerms: string;
  discount: Discount;
  vat: Vat;
  wht: Wht;
  additionalCharges: AdditionalCharge[];
  additionalFields: AdditionalField[];
}
interface Discount {
  enabled: boolean;
  value: number;
  type: 'percentage' | 'flat';
  timing: 'beforeTax' | 'afterTax';
}
interface Vat {
  enabled: boolean;
  rate: number;
}
interface Wht {
  enabled: boolean;
  rate: number;
  unit: 'percentage' | 'flat';
}
interface AdditionalCharge {
  id: string;
  label: string;
  value: number;
  taxable: boolean;                   // true = taxable, false = non-taxable (default)
}
interface AdditionalField {
  id: string;
  label: string;
  value: string;
}
interface PaymentDetails {
  bankAccount: BankAccount;
  showOnInvoice: boolean;
}
interface BankAccount {
  id: string;
  name: string;
  accountNumber: string;
  bankName: string;
}
interface AdditionalInfo {
  notes: string;                      // Rich text
  terms: string;                      // Rich text
  signatoryName: string;
  signatoryTitle: string;
  signature: Signature;
  referenceLinks: ReferenceLink[];
}
interface Signature {
  type: 'signed' | 'uploaded' | 'saved' | 'none';
  data?: string;
  name?: string;
}
interface ReferenceLink {
  id: string;
  url: string;
}
interface InvoiceTotals {
  subtotal: number;
  discount: number;
  vat: number;
  wht: number;
  taxedCharges: number;              // Charges that are taxable
  nonTaxedCharges: number;           // Charges that are NOT taxable
  grandTotal: number;
  amountInWords: string;             // Text representation of grand total
}
```
## 3. State Management
### 3.1 Primary State Owner
The InvoiceWorkspace component holds the single source of truth for all invoice data.
### 3.2 Component State Hierarchy

| Component | State Managed |
| :--- | :--- |
| **InvoiceWorkspace** | Full Invoice object; derived totals |
| **InvoiceHeader** | Title, client, dates, numbers, custom fields |
| **LineItemsSection** | Groups, standalone items, item‑level actions |
| **CommercialSettings** | Discount, VAT, WHT, charges, fields |
| **PaymentDetails** | Bank account selection, visibility toggle |
| **AdditionalInfo** | Notes, terms, signatory, signature, links |
| **TotalsSection** | Derived totals (read‑only) |

### 3.3 State Update Flow
```
User Interaction
    ↓
Component Event Handler
    ↓
Update Local Component State
    ↓
Callback to Parent (`onUpdate`)
    ↓
Parent Updates Full Invoice State
    ↓
Derived Totals Recalculate
    ↓
UI Re‑render
```
## 4. Header Section
### 4.1 Header Fields

| Field | Type | Behavior |
| :--- | :--- | :--- |
| **Title** | Text input | Optional; describes what the invoice is for |
| **Client** | Select dropdown | Editable list; required |
| **Invoice #** | Text input | Auto‑generated but editable |
| **PO #** | Text input | Optional |
| **Issue Date** | Date picker | Defaults to today |
| **Due Date** | Date picker | Defaults to 30 days from issue date | <br> > **Design note:** No fixed order is imposed on header fields. Each implementation may arrange them (e.g., client before title, dates anywhere) to suit its visual language. <br> > <br> ### 4.2 Custom Header Fields
| Behavior | Description |
| :--- | :--- |
| **Nature** | Same as additionalFields — different position only |
| **Add** | Click to create new field pair (Label + Value) |
| **Remove** | Each field pair has a remove button |
| **Multiple** | Unlimited fields; add/remove | <br> ## 5. Line Items — Core Behavior <br> ### 5.1 Item Types
| Type | Description | Container |
| :--- | :--- | :--- |
| **Grouped Item** | Belongs to a named group | LineGroup |
| **Standalone Item** | Independent item, no group | standaloneItems array | <br> ### 5.2 Item Properties
| Property | Behavior |
| :--- | :--- |
| **Number** | Auto‑assigned, sequential, non‑editable |
| **Description** | Text input, multiline, auto‑height |
| **Sub‑description** | Optional, multiline |
| **Quantity** | Number input, min 0, step 1 |
| **Unit Price** | Number input, min 0, step 0.01 |
| **Total** | Auto‑calculated: quantity × unitPrice |
| **Photo** | Optional, togglable, stores image reference | <br> ### 5.3 Flexible Columns
| Rule | Description |
| :--- | :--- |
| **Minimum columns** | Description, Quantity, Rate (3 columns) |
| **Maximum columns** | 6+ columns (flexible) |
| **Mobile behavior** | Columns drop vertically, never expand horizontally |
| **No horizontal scroll** | All content must fit within viewport width |
| **Vertical stacking** | On mobile, fields stack vertically within each row | <br> ### 5.4 Item Lifecycle
| Action | Behavior |
| :--- | :--- |
| **Add item** | Create new empty item; append to standalone list |
| **Add item to group** | Create new empty item; append to specified group (via group footer) |
| **Duplicate item** | Copy item data; append copy with new ID |
| **Delete item** | Remove item; confirm first; × button on each row |
| **Move up** | Swap with previous sibling item in same group/standalone |
| **Move down** | Swap with next sibling item in same group/standalone |
| **Insert below** | Create new empty item; insert immediately after current item within same container |
| **Add photo** | Toggle photo state; open image picker if adding |
| **Remove photo** | Clear photo data if present | <br> ### 5.5 Group Lifecycle
| Action | Behavior |
| :--- | :--- |
| **Add group** | Create new empty group with default name |
| **Delete group** | Remove group; move all items to standalone |
| **Rename group** | Edit group name inline |
| **Add item to group** | Button in group footer — creates new item inside group | <br> ### 5.6 Group Behavior Rules
| Rule | Description |
| :--- | :--- |
| **Insert below within group** | Creates new row inside the same group, not outside |
| **Add item button location** | Group footer (bottom of group), not top |
| **Group subtotal prominence** | Must be visually prominent — shows sum of all item totals in the group |
| **Item movement within group** | Move up/down stays within the same group | <br> ### 5.7 Row Actions <br> Each line item row must have:
| Action | Visual | Behavior |
| :--- | :--- | :--- |
| **Insert below** | Button | Insert new item after current row (same container) |
| **Move up** | Up arrow | Swap with previous item in same container |
| **Move down** | Down arrow | Swap with next item in same container |
| **Duplicate** | Duplicate icon | Copy item; append to same container |
| **Delete** | × button | Remove item; confirm first | <br> ### 5.8 Row Subtotal Prominence
| Element | Prominence Requirement |
| :--- | :--- |
| **Individual item total** | Must be visually prominent — shows quantity × unitPrice for that row |
| **Group subtotal** | Must be visually prominent — shows sum of all item totals in the group | <br> Both the individual item total and the group subtotal must stand out clearly. The design may use size, weight, color, or spacing to achieve this, but both are considered important numeric values. <br> ### 5.9 Line Item Collapsible Rule
| Rule | Behavior |
| :--- | :--- |
| **Line items are NOT collapsible** | Items remain fully visible at all times |
| **No collapse capability** | Do not allow collapsing/hiding of line items |
| **Sub‑description** | Can be expanded/collapsed (this is a separate field, not the item itself) | <br> ## 6. Commercial Settings <br> ### 6.1 Payment Terms
| Field | Type | Behavior |
| :--- | :--- | :--- |
| **Payment terms** | Select dropdown | Options: Due on receipt, Net 15, Net 30, Net 60, Custom |
| **Custom payment terms** | Text input | Visible when "Custom" selected | <br> ### 6.2 Discount
| Field | Type | Behavior |
| :--- | :--- | :--- |
| **Default state** | Closed (collapsed) | User expands to configure |
| **Value** | Number input | Min 0; step 0.01 |
| **Type** | Segmented control | Flat |
| **Timing** | Segmented control | Before Tax |
| **Calculation** | Applied based on timing selection |  |
| **Visibility** | Hidden if value is 0 |  | <br> **Calculation Formulas:** <br> * **Before Tax:** \text{(subtotal - discount)} \times (1 + \text{vatRate}) <br> * **After Tax:** (\text{subtotal} \times (1 + \text{vatRate})) - \text{discount} <br> ### 6.3 VAT
| Behavior | Description |
| :--- | :--- |
| **Default state** | Open (expanded) |
| **Rate** | Number input; min 0; step 0.01 |
| **Calculation** | Applied based on discount timing selection |
| **Visibility** | Hidden if rate is 0 | <br> ### 6.4 WHT (Withholding Tax)
| Field | Type | Behavior |
| :--- | :--- | :--- |
| **Default state** | Closed (collapsed) |  |
| **Rate** | Number input | Min 0; step 0.01 |
| **Unit** | Segmented control | Percentage |
| **Calculation** | Applied after VAT |  |
| **Visibility** | Hidden if rate is 0 |  | <br> ### 6.5 Additional Charges
| Field | Type | Behavior |
| :--- | :--- | :--- |
| **Default state** | Closed (collapsed) |  |
| **Add charge** | + button | Creates new charge entry (unlimited) |
| **Label** | Text input | Required if charge is added |
| **Value** | Number input | Min 0; step 0.01 |
| **Taxable** | Toggle/checkbox | Default: OFF (non‑taxable) |
| **Tax status display** | Footer below value | Shows "Taxable" or "Non‑taxable" badge |
| **Removal** | Each charge has remove button |  |
| **Display** | When filled, charge appears in totals |  | <br> ### 6.6 Additional Fields
| Behavior | Description |
| :--- | :--- |
| **Nature** | Same as customHeaderFields — different position only |
| **Default state** | Closed (collapsed) |
| **Add** | Click to create new field pair |
| **Fields** | Label + Value text inputs |
| **Remove** | Each field pair has remove button |
| **Multiple** | Unlimited fields; add/remove | <br> ## 7. Payment Details <br> ### 7.1 Bank Account Selection
| Behavior | Description |
| :--- | :--- |
| **Account list** | Pre‑defined list of bank accounts |
| **Selection** | Single select; highlight selected |
| **Add new** | Option to connect/add new account |
| **Default** | First account selected | <br> ### 7.2 Payment Visibility Switch
| Behavior | Description |
| :--- | :--- |
| **Default state** | On (visible) |
| **Toggle** | Switch to show/hide payment details on invoice output |
| **Impact** | Affects PDF/print output only; data retained | <br> ## 8. Additional Information <br> ### 8.1 Notes
| Behavior | Description |
| :--- | :--- |
| **Type** | Rich text editor (not plain textarea) |
| **Default** | Empty |
| **Auto‑height** | Expands with content | <br> ### 8.2 Terms & Conditions
| Behavior | Description |
| :--- | :--- |
| **Type** | Rich text editor (not plain textarea) |
| **Default** | Empty |
| **Auto‑height** | Expands with content | <br> ### 8.3 Signatory
| Field | Behavior |
| :--- | :--- |
| **Name** | Text input |
| **Title** | Text input | <br> ### 8.4 Signature
| Behavior | Description |
| :--- | :--- |
| **Interaction** | Tap to open signature picker |
| **Options** | Sign now (draw), Upload (image), Saved (pre‑existing) |
| **Preview** | Show signature thumbnail or placeholder |
| **Clear** | Remove signature | <br> ### 8.5 Reference Links
| Behavior | Description |
| :--- | :--- |
| **Add** | Create new link field |
| **URL** | Text input (URL format) |
| **Remove** | Delete link |
| **Multiple** | Array of links; add/remove | <br> ## 9. Action Menu (Kebab) <br> ### 9.1 Menu Items
| Item | Behavior |
| :--- | :--- |
| **Scroll to notes** | Smooth scroll to the Additional Information section |
| **Import** | Open import dialog/sheet |
| **Save** | Save current invoice state |
| **Table settings** | Open column visibility/ordering settings |
| **Clear all** | Clear all line items; require confirmation |

## 10. Totals Calculation
### 10.1 Calculation Order
```
1. Subtotal = Σ (quantity × unitPrice) for all items
2. Discount Amount
   - If discount.type = 'percentage': subtotal × (discount.value / 100)
   - If discount.type = 'flat': discount.value
3. Taxable Charges = Σ (charge.value) for charges where taxable = true
4. Non‑Taxable Charges = Σ (charge.value) for charges where taxable = false
5. VAT Calculation based on discount timing:
   If discount.timing = 'beforeTax':
     - After Discount = subtotal - discountAmount
     - VAT Amount = (afterDiscount + taxableCharges) × (vat.rate / 100)
     - After VAT = afterDiscount + vatAmount + taxableCharges
   If discount.timing = 'afterTax':
     - VAT Amount = subtotal × (vat.rate / 100)
     - After VAT = subtotal + vatAmount
     - After Discount = afterVAT - discountAmount + taxableCharges
6. WHT Amount
   - If wht.unit = 'percentage': (subtotal - discountAmount) × (wht.rate / 100)
   - If wht.unit = 'flat': wht.rate
7. Grand Total = (After VAT - WHT Amount) + Non‑Taxable Charges
8. Amount in Words = text representation of Grand Total (e.g., "Six thousand four hundred eighty dollars")
```
### 10.2 Summary Order (Visual Display)
The totals summary must display in this exact order:

| Order | Row | Visible When |
| :--- | :--- | :--- |
| **1** | Subtotal | Always |
| **2** | Discount (before tax) | Discount value > 0 AND timing = "beforeTax" |
| **3** | Charges (taxed) | Any charge where taxable = true |
| **4** | VAT | VAT rate > 0 |
| **5** | Discount (after tax) | Discount value > 0 AND timing = "afterTax" |
| **6** | Charges (non‑taxed) | Any charge where taxable = false |
| **7** | WHT | WHT rate > 0 |
| **8** | Grand Total | Always |
| **9** | Amount in Words | Always (displayed alongside Grand Total) | <br> > **Design note:** Amount in words should be displayed adjacent to or near the Grand Total, but its exact placement is left to the design. <br> > <br> ## 11. Save Behavior <br> ### 11.1 Floating Save Button
| Behavior | Description |
| :--- | :--- |
| **Position** | Fixed, bottom‑right corner |
| **Style** | Icon‑only (floppy disk or similar) |
| **Visibility** | Always visible |
| **Interaction** | Tap to save current state |
| **Feedback** | Toast confirmation or loading state |
| **Importance** | Non‑negotiable — must exist regardless of design | <br> ### 11.2 Bottom Save & Cancel
| Element | Behavior |
| :--- | :--- |
| **Save button** | Save current state; show validation errors |
| **Cancel button** | Confirm discard changes; reset to last saved state | <br> ### 11.3 Validation
| Check | Behavior |
| :--- | :--- |
| **Title present** | Optional — no validation |
| **Client selected** | Required; warn if empty |
| **At least one line item** | Required; warn if empty |
| **All items have description** | Warn if empty | <br> ### 11.4 Save Feedback
| State | Behavior |
| :--- | :--- |
| **Success** | Show confirmation toast; update status |
| **Error** | Show error toast; scroll to first error | <br> ## 12. Photo Picker <br> ### 12.1 Item Photo
| Behavior | Description |
| :--- | :--- |
| **Toggle** | Show/hide photo attachment status |
| **Add** | Open native/custom image picker |
| **Remove** | Clear photo data | <br> ### 12.2 Signature Photo
| Behavior | Description |
| :--- | :--- |
| **Sign now** | Open signature capture (draw) |
| **Upload** | Open native/custom image picker |
| **Saved** | Select pre‑existing saved signature |
| **Preview** | Show thumbnail of signature | <br> ## 13. Keyboard Interactions <br> ### 13.1 Tab Order <br> No fixed tab order is prescribed. Each design may define its own logical flow. <br> ### 13.2 Enter Behavior
| Element | Behavior |
| :--- | :--- |
| **Item description** | Insert newline (textarea) |
| **Other inputs** | Move to next field (implementation‑dependent) | <br> ### 13.3 Escape Behavior
| Element | Behavior |
| :--- | :--- |
| **Action menu** | Close dropdown |
| **Import sheet** | Close sheet |
| **Table settings** | Close sheet | <br> ## 14. Touch Interactions
| Interaction | Element | Behavior |
| :--- | :--- | :--- |
| **Tap** | Button | Trigger action |
| **Tap** | Input | Focus; open keyboard |
| **Tap** | Date picker | Open date selection |
| **Tap** | Bank account | Select account |
| **Tap** | Signature picker | Open signature options |
| **Tap** | Photo button | Toggle photo state |
| **Tap** | Kebab menu | Open dropdown |
| **Swipe** | Sheet | Dismiss | <br> ## 15. Mobile‑First Rules <br> ### 15.1 Vertical Stacking
| Rule | Description |
| :--- | :--- |
| **Columns drop vertically** | On mobile, fields stack vertically within each row |
| **No horizontal scroll** | All content must fit within viewport width |
| **Full‑width fields** | Each field takes full width on mobile | <br> ### 15.2 Responsive Behaviors
| Device | Behavior |
| :--- | :--- |
| **Mobile (default)** | Single column; full‑width controls; bottom sheets |
| **Tablet** | Two‑column grid for some sections; wider cards |
| **Desktop** | Two‑column layout; hover states; more compact density | <br> ## 16. Accessibility Requirements
| Requirement | Implementation |
| :--- | :--- |
| **Labels** | Every field has visible label |
| **Focus** | Logical tab order |
| **Touch targets** | Minimum 44×44px |
| **Focus trap** | In dialogs and sheets |
| **Close** | Escape key closes dialogs |
| **Screen reader** | Announced on focus |
| **Disabled** | aria-disabled when applicable |
| **Loading** | aria-busy during save | <br> ## 17. Event Handlers <br> ### 17.1 Header Events
| Event | Payload | Behavior |
| :--- | :--- | :--- |
| onHeaderUpdate | Partial<InvoiceHeader> | Update header fields |
| onAddCustomField | field: CustomField | Add custom field to header |
| onRemoveCustomField | fieldId: string | Remove custom field | <br> ### 17.2 Line Items Events
| Event | Payload | Behavior |
| :--- | :--- | :--- |
| onAddItem | groupId? | Add item to group or standalone |
| onAddGroup | name | Create new group |
| onUpdateItem | itemId, updates | Update item fields |
| onDuplicateItem | itemId | Duplicate item |
| onDeleteItem | itemId | Delete item (× button) |
| onDeleteGroup | groupId | Delete group; move items to standalone |
| onMoveItem | itemId, direction | Move item up/down |
| onInsertBelow | itemId | Insert new item below current (within same container) |
| onAddPhoto | itemId, photoData | Add photo to item |
| onRemovePhoto | itemId | Remove photo from item | <br> ### 17.3 Commercial Events
| Event | Payload | Behavior |
| :--- | :--- | :--- |
| onUpdateCommercial | Partial<CommercialSettings> | Update commercial settings |
| onAddCharge | charge: AdditionalCharge | Add new additional charge |
| onUpdateCharge | chargeId, updates | Update charge |
| onRemoveCharge | chargeId | Remove charge |
| onAddField | field: AdditionalField | Add additional field |
| onUpdateField | fieldId, updates | Update field |
| onRemoveField | fieldId | Remove field | <br> ### 17.4 Payment Events
| Event | Payload | Behavior |
| :--- | :--- | :--- |
| onSelectBank | bankAccountId | Select bank account |
| onTogglePaymentVisibility | boolean | Toggle payment details visibility | <br> ### 17.5 Additional Info Events
| Event | Payload | Behavior |
| :--- | :--- | :--- |
| onUpdateAdditional | Partial<AdditionalInfo> | Update additional info |
| onUpdateSignature | Signature | Update signature |
| onAddReference | url | Add reference link |
| onDeleteReference | linkId | Delete reference link | <br> ## 18. Data Persistence <br> ### 18.1 Auto‑save (Future)
| Behavior | Description |
| :--- | :--- |
| **Trigger** | After 2 seconds of inactivity |
| **Scope** | Full invoice state |
| **Storage** | Local SQLite / IndexedDB |
| **Conflict** | Last write wins | <br> ### 18
```