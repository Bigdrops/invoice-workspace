import { useState, useMemo, useRef, useCallback, useEffect, memo } from "react";
import {
  Plus, Trash2, Copy, ChevronUp, ChevronDown,
  Upload, PenLine, FolderOpen, X, Save, ArrowDown,
  FolderPlus, ListPlus, Check, Landmark, EllipsisVertical,
  FileText, SlidersHorizontal, Link2, ArrowUp,
} from "lucide-react";

/* ---------------------------------------------------------
   DESIGN TOKENS
--------------------------------------------------------- */
const token = {
  bg: "#f5f6f4",
  card: "linear-gradient(160deg, #ffffff 0%, #f2f4f1 100%)",
  cardShadow: "0 1px 2px rgba(20,25,20,0.04), 0 10px 30px -12px rgba(20,25,20,0.10)",
  border: "#e4e7e2",
  borderStrong: "#d3d8d0",
  ink: "#181a17",
  inkSoft: "#6f766c",
  inkFaint: "#a2a89c",
  green: "#0e9f6e",
  greenDeep: "#0a7d57",
  greenSoft: "#e7f5ef",
  glow: "0 0 0 3px rgba(14,159,110,0.14), 0 0 24px -4px rgba(14,159,110,0.35)",
  glowStrong: "0 0 0 4px rgba(14,159,110,0.16), 0 8px 28px -6px rgba(14,159,110,0.55)",
  red: "#d1453b",
};

const fontDisplay = "'Fraunces', ui-serif, Georgia, serif";
const fontBody = "'Inter', ui-sans-serif, system-ui, sans-serif";

/* ---------- simple number-to-words for amounts up to trillions ---------- */
function numberToWords(num) {
  if (num === 0) return "zero";
  const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  const scales = ["", "thousand", "million", "billion", "trillion"];

  const convertHundreds = (n) => {
    let str = "";
    if (n >= 100) {
      str += ones[Math.floor(n / 100)] + " hundred ";
      n %= 100;
    }
    if (n >= 20) {
      str += tens[Math.floor(n / 10)] + (n % 10 ? "-" + ones[n % 10] : " ") + " ";
    } else if (n >= 10) {
      str += teens[n - 10] + " ";
    } else if (n > 0) {
      str += ones[n] + " ";
    }
    return str;
  };

  let whole = Math.floor(Math.abs(num));
  let decimal = Math.round((Math.abs(num) - whole) * 100);
  let result = whole === 0 ? "zero" : "";

  let i = 0;
  while (whole > 0) {
    if (whole % 1000 !== 0) {
      result = convertHundreds(whole % 1000) + scales[i] + " " + result;
    }
    whole = Math.floor(whole / 1000);
    i++;
  }

  result = result.trim();
  if (decimal > 0) {
    result += " and " + decimal + "/100";
  }
  if (num < 0) result = "minus " + result;
  return result.charAt(0).toUpperCase() + result.slice(1);
}

let uid = 100;
const nextId = () => `id${uid++}`;
const money = (n) =>
  (Number.isFinite(n) ? n : 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ---------------------------------------------------------
   PRIMITIVES
--------------------------------------------------------- */
function Card({ title, badge, children, right }) {
  return (
    <section
      className="rounded-3xl border p-3.5 sm:p-5 mb-2.5"
      style={{ background: token.card, borderColor: token.border, boxShadow: token.cardShadow }}
    >
      {(title || right) && (
        <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
          <h2 style={{ fontFamily: fontDisplay, fontWeight: 500, color: token.ink }} className="text-lg sm:text-xl">
            {title}
          </h2>
          {right}
          {badge && (
            <span
              className="text-[11px] font-medium uppercase tracking-wide px-3 py-1 rounded-full"
              style={{ color: token.green, background: token.greenSoft, border: `1px solid ${token.green}33` }}
            >
              {badge}
            </span>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

function Field({ label, children, className = "" }) {
  return (
    <div className={`flex flex-col gap-1 w-full min-w-0 ${className}`}>
      {label && (
        <label
          className="text-[10.5px] font-medium uppercase tracking-wide"
          style={{ color: token.inkSoft, fontFamily: fontBody }}
        >
          {label}
        </label>
      )}
      {children}
    </div>
  );
}

const inputBase =
  "w-full px-3 py-2 rounded-xl text-[15px] outline-none transition-shadow duration-150 bg-white";
function inputStyle(focused) {
  return {
    border: `1px solid ${focused ? token.green : token.border}`,
    color: token.ink,
    fontFamily: fontBody,
    boxShadow: focused ? token.glow : "inset 0 1px 2px rgba(20,25,20,0.03)",
  };
}

function TextInput({ value, onChange, placeholder, type = "text", align, min, step }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      value={value}
      min={min}
      step={step}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholder={placeholder}
      className={inputBase}
      style={{ ...inputStyle(focused), textAlign: align || "left" }}
    />
  );
}

function Select({ value, onChange, options }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={inputBase + " appearance-none pr-8 bg-no-repeat"}
      style={{
        ...inputStyle(focused),
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236f766c' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
        backgroundPosition: "right 12px center",
      }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function GhostButton({ children, onClick, danger, small }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`inline-flex items-center gap-1.5 rounded-full font-medium uppercase tracking-wide transition-colors ${
        small ? "text-[11px] px-3 py-1.5" : "text-[13px] px-4 py-2"
      }`}
      style={{
        fontFamily: fontBody,
        border: `1px solid ${danger && hover ? token.red : hover ? token.borderStrong : token.border}`,
        color: danger && hover ? token.red : hover ? token.ink : token.inkSoft,
        background: danger && hover ? "#fdecea" : hover ? "#fbfbfa" : "white",
        minHeight: small ? 34 : 40,
      }}
    >
      {children}
    </button>
  );
}

function PrimaryButton({ children, onClick, full }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl text-sm font-semibold tracking-wide px-6 py-2.5 transition-all ${
        full ? "w-full" : ""
      }`}
      style={{
        fontFamily: fontBody,
        background: `linear-gradient(160deg, ${token.green}, ${token.greenDeep})`,
        color: "white",
        boxShadow: hover ? token.glowStrong : token.glow,
        transform: hover ? "translateY(-1px)" : "none",
      }}
    >
      {children}
    </button>
  );
}

function RowIcon({ label, onClick, danger, tone, children }) {
  const [hover, setHover] = useState(false);
  const active = tone === "accent";
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={label}
      title={label}
      className="inline-flex items-center justify-center rounded-full shrink-0"
      style={{
        width: 32,
        height: 32,
        border: `1px solid ${danger && hover ? token.red : active ? token.green : hover ? token.borderStrong : token.border}`,
        color: danger && hover ? token.red : active ? token.green : hover ? token.ink : token.inkSoft,
        background: danger && hover ? "#fdecea" : active ? token.greenSoft : "white",
        transition: "all .15s ease",
      }}
    >
      {children}
    </button>
  );
}

function ActionMenu({ items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="More actions"
        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
        style={{ border: `1px solid ${token.border}`, color: token.inkSoft, background: "white" }}
      >
        <EllipsisVertical size={17} />
      </button>
      {open && (
        <div
          className="absolute right-0 top-11 rounded-2xl overflow-hidden z-50"
          style={{ background: "white", border: `1px solid ${token.border}`, boxShadow: token.cardShadow, minWidth: 190 }}
        >
          {items.map((it, i) =>
            it.divider ? (
              <hr key={i} style={{ border: "none", borderTop: `1px solid ${token.border}`, margin: "4px 8px" }} />
            ) : (
              <button
                key={i}
                onClick={() => { setOpen(false); it.onClick(); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-[13px] font-medium"
                style={{ color: it.danger ? token.red : token.ink }}
              >
                {it.icon}
                {it.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

function Collapsible({ label, hint, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b last:border-b-0" style={{ borderColor: token.border }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-2.5 text-left"
        style={{ minHeight: 40 }}
      >
        <span
          className="text-[13px] font-semibold uppercase tracking-wide"
          style={{ color: token.ink, fontFamily: fontBody }}
        >
          {label}{" "}
          {hint && (
            <span className="font-normal normal-case tracking-normal text-xs" style={{ color: token.inkFaint }}>
              — {hint}
            </span>
          )}
        </span>
        <ChevronDown
          size={16}
          style={{ color: token.inkSoft, transition: "transform .2s ease", transform: open ? "rotate(180deg)" : "none" }}
        />
      </button>
      {open && <div className="pb-3">{children}</div>}
    </div>
  );
}

function LabelValueRow({ label, value, onLabel, onValue, onRemove, labelPh = "Label", valuePh = "Value" }) {
  return (
    <div className="grid gap-2 items-end" style={{ gridTemplateColumns: "1fr 1fr auto" }}>
      <TextInput value={label} onChange={onLabel} placeholder={labelPh} />
      <TextInput value={value} onChange={onValue} placeholder={valuePh} />
      <RowIcon label="Remove field" danger onClick={onRemove}>
        <X size={14} />
      </RowIcon>
    </div>
  );
}

/* ---------------------------------------------------------
   LINE ITEM ROW (memoised for performance)
--------------------------------------------------------- */
const ItemRow = memo(({
  item,
  index,
  onChange,
  onInsertBelow,
  onInsertAbove,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete,
}) => {
  const total = (Number(item.qty) || 0) * (Number(item.price) || 0);
  const taRef = useRef(null);
  const [showSub, setShowSub] = useState(false);

  const autoGrow = useCallback((el) => {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }, []);

  return (
    <div
      className="rounded-2xl p-2.5 sm:p-3 flex flex-col gap-2 bg-white"
      style={{ border: `1px solid ${token.border}` }}
    >
      <div className="flex items-start gap-2">
        {/* Index + up/down arrows stacked vertically to the right of index */}
        <div className="flex items-start gap-1 shrink-0">
          <span
            className="text-base font-light pt-0.5"
            style={{ color: token.inkFaint, fontFamily: fontDisplay, minWidth: 18 }}
          >
            {index}
          </span>
          <div className="flex flex-col -space-y-0.5 pt-0.5">
            <RowIcon label="Move up" onClick={onMoveUp}>
              <ChevronUp size={12} />
            </RowIcon>
            <RowIcon label="Move down" onClick={onMoveDown}>
              <ChevronDown size={12} />
            </RowIcon>
          </div>
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          <textarea
            ref={(el) => { taRef.current = el; autoGrow(el); }}
            rows={1}
            value={item.description}
            onChange={(e) => { onChange({ ...item, description: e.target.value }); autoGrow(e.target); }}
            placeholder="Description"
            className="w-full resize-none outline-none bg-transparent leading-snug"
            style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: 16, color: token.ink, minHeight: 22 }}
          />

          {/* Sub-description dropdown */}
          {showSub ? (
            <textarea
              value={item.subDescription ?? ""}
              onChange={(e) => onChange({ ...item, subDescription: e.target.value })}
              placeholder="Additional details..."
              rows={2}
              className="w-full rounded-xl px-2 py-1 text-sm outline-none resize-y bg-white"
              style={{ border: `1px solid ${token.border}`, color: token.ink }}
            />
          ) : (
            <button
              className="text-[11px] font-medium uppercase tracking-wide underline self-start pb-0.5"
              style={{ color: token.inkSoft }}
              onClick={() => setShowSub(true)}
            >
              + Add sub-description
            </button>
          )}

          {/* Qty and price in a grid, with total as bold prominent row below */}
          <div
            className="grid gap-2 pt-1.5"
            style={{ borderTop: `1px solid ${token.border}`, gridTemplateColumns: "68px 90px 1fr" }}
          >
            <Field label="Qty">
              <TextInput
                type="number" min={0} step={1} align="right"
                value={item.qty}
                onChange={(v) => onChange({ ...item, qty: v === '' ? 0 : Number(v) })}
              />
            </Field>
            <Field label="Price">
              <TextInput
                type="number" min={0} step={0.01} align="right"
                value={item.price}
                onChange={(v) => onChange({ ...item, price: v === '' ? 0 : Number(v) })}
              />
            </Field>
            <div /> {/* spacer */}
          </div>

          {/* Bold, prominent row total */}
          <div
            className="flex justify-between items-baseline pt-1.5"
            style={{ borderTop: `2px solid ${token.ink}` }}
          >
            <span className="text-[11px] font-medium uppercase tracking-wide" style={{ color: token.inkSoft }}>Total</span>
            <span
              className="text-lg font-bold"
              style={{ fontFamily: fontDisplay, color: token.ink }}
            >
              ${money(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom toolbar: duplicate and delete right-aligned; insert text buttons above the toolbar */}
      <div className="flex flex-col gap-1 mt-1">
        {/* Insert buttons */}
        <div className="flex items-center gap-3">
          {index === 1 && (
            <button
              className="text-[11px] font-medium uppercase tracking-wide underline"
              style={{ color: token.green }}
              onClick={onInsertAbove}
            >
              Insert above
            </button>
          )}
          <button
            className="text-[11px] font-medium uppercase tracking-wide underline"
            style={{ color: token.green }}
            onClick={onInsertBelow}
          >
            Insert below
          </button>
        </div>

        {/* Row actions: duplicate (left) and delete (right) */}
        <div className="flex items-center gap-1.5 pt-1.5" style={{ borderTop: `1px solid ${token.border}` }}>
          <RowIcon label="Duplicate" onClick={onDuplicate}><Copy size={13} /></RowIcon>
          <div className="flex-1" />
          <RowIcon label="Delete row" danger onClick={onDelete}><X size={13} color={token.red} /></RowIcon>
        </div>
      </div>
    </div>
  );
});

/* ---------------------------------------------------------
   MAIN COMPONENT
--------------------------------------------------------- */
export default function InvoiceWorkspace() {
  const [header, setHeader] = useState({
    client: "Acme Corp",
    title: "Website Development — Q2 2026",
    number: "INV-2026-001",
    po: "",
    issueDate: "2026-07-22",
    dueDate: "2026-08-21",
  });
  const [clients, setClients] = useState(["Acme Corp", "Beta Inc.", "Gamma Studios", "Delta Labs"]);
  const [customHeaderFields, setCustomHeaderFields] = useState([]);

  const [sections, setSections] = useState([
    {
      type: "group",
      id: "g1",
      name: "Design Phase",
      items: [
        { id: nextId(), description: "Homepage Design", qty: 1, price: 1200 },
        { id: nextId(), description: "Dashboard UI", qty: 2, price: 850 },
        { id: nextId(), description: "Brand Identity & Logo", qty: 1, price: 600 },
      ],
    },
    { type: "item", id: nextId(), description: "React Frontend Build", qty: 1, price: 2500 },
    { type: "item", id: nextId(), description: "Server Setup & Deployment", qty: 1, price: 400 },
  ]);

  const [paymentTerms, setPaymentTerms] = useState("Net 30");
  const [customTerms, setCustomTerms] = useState("");
  const [discount, setDiscount] = useState({ value: 0, type: "percentage", timing: "beforeTax" });
  const [vatRate, setVatRate] = useState(20);
  const [wht, setWht] = useState({ rate: 0, unit: "percentage" });
  const [charges, setCharges] = useState([{ id: nextId(), label: "Shipping", value: 25, taxable: true }]);
  const [additionalFields, setAdditionalFields] = useState([]);

  const [banks] = useState([
    { id: "b1", name: "Chase", account: "•••• 4821" },
    { id: "b2", name: "Bank of America", account: "•••• 7392" },
    { id: "b3", name: "Wells Fargo", account: "•••• 1546" },
  ]);
  const [selectedBank, setSelectedBank] = useState("b1");
  const [showPayment, setShowPayment] = useState(true);

  const [notes, setNotes] = useState("Thank you for your business.");
  const [terms, setTerms] = useState("Payment due within 30 days.");
  const [signatoryName, setSignatoryName] = useState("");
  const [signatoryTitle, setSignatoryTitle] = useState("");
  const [signature, setSignature] = useState(null);
  const [refLinks, setRefLinks] = useState([]);
  const additionalCardRef = useRef(null);

  const [toast, setToast] = useState("");
  const [showClearAllModal, setShowClearAllModal] = useState(false);
  const toastTimer = useRef(null);
  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2000);
  };

  /* ---- line item helpers (stable callbacks via useCallback) ---- */
  const emptyItem = useCallback(() => ({ id: nextId(), description: "", qty: 1, price: 0 }), []);

  const updateItemInSections = useCallback((itemId, updater) => {
    setSections((prev) =>
      prev.map((s) => {
        if (s.type === "item" && s.id === itemId) return updater(s);
        if (s.type === "group") return { ...s, items: s.items.map((it) => (it.id === itemId ? updater(it) : it)) };
        return s;
      })
    );
  }, []);

  const insertBelowItem = useCallback((itemId) => {
    setSections((prev) => {
      const next = [];
      for (const s of prev) {
        if (s.type === "item") {
          next.push(s);
          if (s.id === itemId) next.push({ type: "item", ...emptyItem() });
        } else {
          const items = [];
          for (const it of s.items) {
            items.push(it);
            if (it.id === itemId) items.push(emptyItem());
          }
          next.push({ ...s, items });
        }
      }
      return next;
    });
    showToast("Row inserted below");
  }, [emptyItem]);

  const insertAboveItem = useCallback((itemId) => {
    setSections((prev) => {
      const next = [];
      for (const s of prev) {
        if (s.type === "item") {
          if (s.id === itemId) next.push({ type: "item", ...emptyItem() });
          next.push(s);
        } else {
          const items = [];
          for (const it of s.items) {
            if (it.id === itemId) items.push(emptyItem());
            items.push(it);
          }
          next.push({ ...s, items });
        }
      }
      return next;
    });
    showToast("Row inserted above");
  }, [emptyItem]);

  const duplicateItem = useCallback((itemId) => {
    setSections((prev) => {
      const next = [];
      for (const s of prev) {
        if (s.type === "item") {
          next.push(s);
          if (s.id === itemId) next.push({ type: "item", ...s, id: nextId() });
        } else {
          const items = [];
          for (const it of s.items) {
            items.push(it);
            if (it.id === itemId) items.push({ ...it, id: nextId() });
          }
          next.push({ ...s, items });
        }
      }
      return next;
    });
    showToast("Row duplicated");
  }, []);

  const deleteItem = useCallback((itemId) => {
    setSections((prev) =>
      prev
        .map((s) => (s.type === "group" ? { ...s, items: s.items.filter((it) => it.id !== itemId) } : s))
        .filter((s) => s.type === "group" || s.id !== itemId)
    );
    showToast("Row deleted");
  }, []);

  const moveItem = useCallback((itemId, dir) => {
    setSections((prev) => {
      const next = prev.map((s) => (s.type === "group" ? { ...s, items: [...s.items] } : { ...s }));
      let arr = null, idx = -1;
      for (const s of next) {
        if (s.type === "group") {
          const i = s.items.findIndex((it) => it.id === itemId);
          if (i !== -1) { arr = s.items; idx = i; }
        }
      }
      if (arr) {
        const swapWith = dir === "up" ? idx - 1 : idx + 1;
        if (swapWith < 0 || swapWith >= arr.length) return prev;
        [arr[idx], arr[swapWith]] = [arr[swapWith], arr[idx]];
        return next;
      }
      const rootIdx = next.findIndex((s) => s.type === "item" && s.id === itemId);
      if (rootIdx === -1) return prev;
      const swapWith = dir === "up" ? rootIdx - 1 : rootIdx + 1;
      if (swapWith < 0 || swapWith >= next.length) return prev;
      [next[rootIdx], next[swapWith]] = [next[swapWith], next[rootIdx]];
      return next;
    });
  }, []);

  const addStandaloneRow = useCallback(() => {
    setSections((prev) => [...prev, { type: "item", ...emptyItem() }]);
    showToast("Row added");
  }, [emptyItem]);

  const addGroup = useCallback(() => {
    setSections((prev) => [...prev, { type: "group", id: nextId(), name: "New Group", items: [emptyItem()] }]);
    showToast("Group added");
  }, [emptyItem]);

  const addItemToGroup = useCallback((groupId) => {
    setSections((prev) =>
      prev.map((s) => (s.type === "group" && s.id === groupId ? { ...s, items: [...s.items, emptyItem()] } : s))
    );
  }, [emptyItem]);

  const deleteGroup = useCallback((groupId) => {
    if (!confirm("Delete this group? Items will be ungrouped.")) return;
    setSections((prev) => {
      const g = prev.find((s) => s.type === "group" && s.id === groupId);
      const others = prev.filter((s) => !(s.type === "group" && s.id === groupId));
      const releasedItems = (g?.items || []).map((it) => ({ type: "item", ...it }));
      return [...others, ...releasedItems];
    });
    showToast("Group deleted");
  }, []);

  const clearAll = useCallback(() => {
    setSections([]);
    setShowClearAllModal(false);
    showToast("All items cleared");
  }, []);

  const renameGroup = useCallback((groupId, name) => {
    setSections((prev) => prev.map((s) => (s.type === "group" && s.id === groupId ? { ...s, name } : s)));
  }, []);

  /* ---- stable callbacks for per-item change, insert, etc. using ref ---- */
  const itemCallbacksRef = useRef({});
  const getItemCallbacks = useCallback((itemId) => {
    if (!itemCallbacksRef.current[itemId]) {
      itemCallbacksRef.current[itemId] = {
        onChange: (next) => updateItemInSections(itemId, () => next),
        onInsertBelow: () => insertBelowItem(itemId),
        onInsertAbove: () => insertAboveItem(itemId),
        onDuplicate: () => duplicateItem(itemId),
        onDelete: () => deleteItem(itemId),
        onMoveUp: () => moveItem(itemId, "up"),
        onMoveDown: () => moveItem(itemId, "down"),
      };
    }
    return itemCallbacksRef.current[itemId];
  }, [updateItemInSections, insertBelowItem, insertAboveItem, duplicateItem, deleteItem, moveItem]);

  /* ---- flattened numbering ---- */
  const flatOrder = useMemo(() => {
    const order = [];
    sections.forEach((s) => {
      if (s.type === "item") order.push(s.id);
      else s.items.forEach((it) => order.push(it.id));
    });
    return order;
  }, [sections]);
  const numberOf = (id) => flatOrder.indexOf(id) + 1;

  /* ---- totals (spec order) ---- */
  const totals = useMemo(() => {
    let subtotal = 0;
    sections.forEach((s) => {
      const items = s.type === "group" ? s.items : [s];
      items.forEach((it) => (subtotal += (Number(it.qty) || 0) * (Number(it.price) || 0)));
    });

    const discountAmt =
      discount.value > 0
        ? discount.type === "percentage"
          ? subtotal * (Number(discount.value) / 100)
          : Number(discount.value)
        : 0;

    const taxedCharges = charges.filter((c) => c.taxable).reduce((a, c) => a + (Number(c.value) || 0), 0);
    const nonTaxedCharges = charges.filter((c) => !c.taxable).reduce((a, c) => a + (Number(c.value) || 0), 0);

    // VAT base includes taxable charges
    const taxableBase = discount.timing === "beforeTax" ? subtotal - discountAmt : subtotal;
    const vatBase = taxableBase + taxedCharges;
    const vat = vatBase * (Number(vatRate) / 100 || 0);

    // WHT base: same as subtotal minus discount (before/after logic as desired; here we follow discount timing)
    const whtBase = discount.timing === "beforeTax" ? subtotal - discountAmt : subtotal;
    const whtAmt = wht.rate > 0 ? (wht.unit === "percentage" ? whtBase * (Number(wht.rate) / 100) : Number(wht.rate)) : 0;

    const grandTotal = subtotal - discountAmt + vat + taxedCharges - whtAmt + nonTaxedCharges;

    return { subtotal, discountAmt, taxedCharges, nonTaxedCharges, vat, whtAmt, grandTotal };
  }, [sections, discount, vatRate, wht, charges]);

  const rowCount = flatOrder.length;

  // Font injection once
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500&family=Inter:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <div style={{ background: token.bg, minHeight: "100vh", fontFamily: fontBody }} className="pb-24">
      <div className="max-w-3xl mx-auto px-3 sm:px-6 pt-4 sm:pt-6">

        {/* HEADER (unchanged) */}
        <Card
          title="Invoice"
          right={
            <div className="flex items-center gap-2 ml-auto">
              <span
                className="text-[11px] font-medium uppercase tracking-wide px-3 py-1 rounded-full"
                style={{ color: token.green, background: token.greenSoft, border: `1px solid ${token.green}33` }}
              >
                Draft
              </span>
              <ActionMenu
                items={[
                  {
                    icon: <FileText size={15} />, label: "Scroll to notes",
                    onClick: () => additionalCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
                  },
                  { icon: <Upload size={15} />, label: "Import", onClick: () => showToast("Import dialog") },
                  { icon: <Save size={15} />, label: "Save", onClick: () => showToast("Invoice saved") },
                  { icon: <SlidersHorizontal size={15} />, label: "Table settings", onClick: () => showToast("Table settings") },
                  { divider: true },
                  { icon: <Trash2 size={15} />, label: "Clear all", danger: true, onClick: () => setShowClearAllModal(true) },
                ]}
              />
            </div>
          }
        >
          <div className="flex flex-col gap-2.5">
            <Field label="Client">
              <div className="flex gap-2 items-center">
                <div className="flex-1 min-w-0">
                  <Select
                    value={header.client}
                    onChange={(v) => setHeader({ ...header, client: v })}
                    options={clients.map((c) => ({ value: c, label: c }))}
                  />
                </div>
                <button
                  onClick={() => {
                    const name = prompt("Enter client name:");
                    if (name && name.trim()) {
                      setClients((prev) => [...prev, name.trim()]);
                      setHeader({ ...header, client: name.trim() });
                      showToast("Client added");
                    }
                  }}
                  className="shrink-0 rounded-full px-3.5 text-[12px] font-medium uppercase tracking-wide"
                  style={{ height: 38, border: `1px solid ${token.border}`, color: token.inkSoft, background: "white" }}
                >
                  + New
                </button>
              </div>
            </Field>

            <Field label="Title">
              <TextInput value={header.title} onChange={(v) => setHeader({ ...header, title: v })} />
            </Field>

            <div className="grid grid-cols-2 gap-2">
              <Field label="Invoice #">
                <TextInput value={header.number} onChange={(v) => setHeader({ ...header, number: v })} />
              </Field>
              <Field label="PO #">
                <TextInput value={header.po} onChange={(v) => setHeader({ ...header, po: v })} placeholder="Optional" />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Field label="Issue Date">
                <TextInput type="date" value={header.issueDate} onChange={(v) => setHeader({ ...header, issueDate: v })} />
              </Field>
              <Field label="Due Date">
                <TextInput type="date" value={header.dueDate} onChange={(v) => setHeader({ ...header, dueDate: v })} />
              </Field>
            </div>

            <div className="pt-2 flex flex-col gap-2" style={{ borderTop: `1px solid ${token.border}` }}>
              <span className="text-[10.5px] font-medium uppercase tracking-wide" style={{ color: token.inkSoft }}>
                Custom fields
              </span>
              {customHeaderFields.map((f) => (
                <LabelValueRow
                  key={f.id}
                  label={f.label}
                  value={f.value}
                  labelPh="e.g. Project ID"
                  valuePh="e.g. PRJ-001"
                  onLabel={(v) => setCustomHeaderFields((fs) => fs.map((x) => (x.id === f.id ? { ...x, label: v } : x)))}
                  onValue={(v) => setCustomHeaderFields((fs) => fs.map((x) => (x.id === f.id ? { ...x, value: v } : x)))}
                  onRemove={() => setCustomHeaderFields((fs) => fs.filter((x) => x.id !== f.id))}
                />
              ))}
              <button
                onClick={() => setCustomHeaderFields((fs) => [...fs, { id: nextId(), label: "", value: "" }])}
                className="text-left text-[12px] font-medium uppercase tracking-wide pb-1 w-fit"
                style={{ color: token.inkSoft, borderBottom: `1px solid ${token.border}` }}
              >
                + Add field
              </button>
            </div>
          </div>
        </Card>

        {/* LINE ITEMS */}
        <Card
          title="Line Items"
          right={
            <span
              className="text-[11px] font-medium uppercase tracking-wide px-3 py-1 rounded-full ml-auto"
              style={{ color: token.inkSoft, border: `1px solid ${token.border}`, background: "white" }}
            >
              {rowCount} rows
            </span>
          }
        >
          {/* Toolbar: gap, Clear all extreme right */}
          <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
            <div className="flex gap-2">
              <GhostButton onClick={() => showToast("Import dialog")} small>
                <Upload size={13} /> Import
              </GhostButton>
              <GhostButton onClick={() => showToast("Table settings")} small>
                <SlidersHorizontal size={13} /> Table settings
              </GhostButton>
            </div>
            <GhostButton onClick={() => setShowClearAllModal(true)} danger small>
              <Trash2 size={13} /> Clear all
            </GhostButton>
          </div>

          <div className="flex flex-col gap-2.5">
            {sections.map((s) =>
              s.type === "group" ? (
                <div
                  key={s.id}
                  className="rounded-2xl overflow-hidden"
                  style={{ border: `2.5px solid ${token.ink}` }}
                >
                  <div className="flex items-center gap-2 px-3 py-2.5 flex-wrap" style={{ background: token.ink }}>
                    <input
                      value={s.name}
                      onChange={(e) => renameGroup(s.id, e.target.value)}
                      className="flex-1 min-w-[100px] bg-transparent outline-none text-white placeholder-white/50"
                      style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: 16 }}
                    />
                    <span
                      className="text-[10.5px] font-medium uppercase px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(255,255,255,0.12)", color: "white" }}
                    >
                      {s.items.length} items
                    </span>
                    <span style={{ fontFamily: fontBody, fontWeight: 600, color: token.green }}>
                      ${money(s.items.reduce((a, it) => a + (Number(it.qty) || 0) * (Number(it.price) || 0), 0))}
                    </span>
                    <button
                      onClick={() => deleteGroup(s.id)}
                      aria-label="Delete group"
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "rgba(255,255,255,0.1)", color: "white" }}
                    >
                      <X size={13} />
                    </button>
                  </div>

                  <div className="p-2.5 flex flex-col gap-2.5" style={{ background: "#fbfcfa" }}>
                    {s.items.map((it) => {
                      const { onChange, onInsertBelow, onInsertAbove, onMoveUp, onMoveDown, onDuplicate, onDelete } = getItemCallbacks(it.id);
                      return (
                        <ItemRow
                          key={it.id}
                          item={it}
                          index={numberOf(it.id)}
                          onChange={onChange}
                          onInsertBelow={onInsertBelow}
                          onInsertAbove={onInsertAbove}
                          onMoveUp={onMoveUp}
                          onMoveDown={onMoveDown}
                          onDuplicate={onDuplicate}
                          onDelete={onDelete}
                        />
                      );
                    })}
                  </div>

                  <div className="px-3 py-2 flex justify-center" style={{ background: token.ink }}>
                    <button
                      onClick={() => addItemToGroup(s.id)}
                      className="inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-wide text-white/85"
                    >
                      <Plus size={13} /> Add item to group
                    </button>
                  </div>
                </div>
              ) : (
                (() => {
                  const { onChange, onInsertBelow, onInsertAbove, onMoveUp, onMoveDown, onDuplicate, onDelete } = getItemCallbacks(s.id);
                  return (
                    <ItemRow
                      key={s.id}
                      item={s}
                      index={numberOf(s.id)}
                      onChange={onChange}
                      onInsertBelow={onInsertBelow}
                      onInsertAbove={onInsertAbove}
                      onMoveUp={onMoveUp}
                      onMoveDown={onMoveDown}
                      onDuplicate={onDuplicate}
                      onDelete={onDelete}
                    />
                  );
                })()
              )
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <GhostButton onClick={addStandaloneRow}><ListPlus size={14} /> Add row</GhostButton>
            <GhostButton onClick={addGroup}><FolderPlus size={14} /> Add group</GhostButton>
          </div>
        </Card>

        {/* COMMERCIAL TERMS */}
        <Card title="Commercial Terms">
          <div className="grid grid-cols-2 gap-2 mb-1.5">
            <Field label="Payment Terms">
              <Select
                value={paymentTerms}
                onChange={setPaymentTerms}
                options={["Due on receipt", "Net 7", "Net 14", "Net 30", "Net 60", "Custom"].map((v) => ({ value: v, label: v }))}
              />
            </Field>
            <Field label="Custom Terms">
              <TextInput value={customTerms} onChange={setCustomTerms} placeholder="e.g. 2/10 Net 30" />
            </Field>
          </div>

          <Collapsible label="Discount">
            <div className="grid grid-cols-2 gap-2">
              <Field label="Value">
                <TextInput type="number" min={0} step={0.01} value={discount.value} onChange={(v) => setDiscount({ ...discount, value: v === '' ? 0 : Number(v) })} />
              </Field>
              <Field label="Type">
                <Select value={discount.type} onChange={(v) => setDiscount({ ...discount, type: v })} options={[{ value: "percentage", label: "Percentage" }, { value: "flat", label: "Flat" }]} />
              </Field>
            </div>
            {/* Timing toggle */}
            <div className="mt-2">
              <label className="text-[10.5px] font-medium uppercase tracking-wide mb-1 block" style={{ color: token.inkSoft }}>
                Timing
              </label>
              <div className="flex gap-1">
                <button
                  onClick={() => setDiscount({ ...discount, timing: "beforeTax" })}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                    discount.timing === "beforeTax"
                      ? "bg-green-100 text-green-700 border-green-300"
                      : "bg-gray-50 text-gray-500 border-gray-200"
                  }`}
                >
                  Before Tax
                </button>
                <button
                  onClick={() => setDiscount({ ...discount, timing: "afterTax" })}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                    discount.timing === "afterTax"
                      ? "bg-green-100 text-green-700 border-green-300"
                      : "bg-gray-50 text-gray-500 border-gray-200"
                  }`}
                >
                  After Tax
                </button>
              </div>
            </div>
          </Collapsible>

          <Collapsible label="VAT" defaultOpen>
            <Field label="Rate (%)">
              <TextInput type="number" min={0} step={0.01} value={vatRate} onChange={(v) => setVatRate(v === '' ? 0 : Number(v))} />
            </Field>
          </Collapsible>

          <Collapsible label="WHT">
            <div className="grid grid-cols-2 gap-2">
              <Field label="Rate">
                <TextInput type="number" min={0} step={0.01} value={wht.rate} onChange={(v) => setWht({ ...wht, rate: v === '' ? 0 : Number(v) })} />
              </Field>
              <Field label="Unit">
                <Select value={wht.unit} onChange={(v) => setWht({ ...wht, unit: v })} options={[{ value: "percentage", label: "Percentage" }, { value: "flat", label: "Flat" }]} />
              </Field>
            </div>
          </Collapsible>

          <Collapsible label="Additional Charges">
            <div className="flex flex-col gap-2.5">
              {charges.map((c) => (
                <div key={c.id} className="flex flex-col gap-1.5">
                  <div className="grid gap-2 items-end" style={{ gridTemplateColumns: "1fr 1fr auto" }}>
                    <Field label="Label">
                      <TextInput value={c.label} onChange={(v) => setCharges((cs) => cs.map((x) => (x.id === c.id ? { ...x, label: v } : x)))} />
                    </Field>
                    <Field label="Value">
                      <TextInput type="number" min={0} step={0.01} value={c.value} onChange={(v) => setCharges((cs) => cs.map((x) => (x.id === c.id ? { ...x, value: v === '' ? 0 : Number(v) } : x)))} />
                    </Field>
                    <RowIcon label="Remove charge" danger onClick={() => setCharges((cs) => cs.filter((x) => x.id !== c.id))}>
                      <X size={14} />
                    </RowIcon>
                  </div>
                  <label className="flex items-center gap-2 text-[12px] font-medium" style={{ color: token.ink }}>
                    <input
                      type="checkbox"
                      checked={c.taxable}
                      onChange={(e) => setCharges((cs) => cs.map((x) => (x.id === c.id ? { ...x, taxable: e.target.checked } : x)))}
                      className="w-[16px] h-[16px]"
                      style={{ accentColor: token.green }}
                    />
                    <span
                      className="text-[10.5px] uppercase font-medium px-2 py-0.5 rounded-full"
                      style={c.taxable ? { color: token.green, background: token.greenSoft } : { color: token.inkFaint, background: token.bg }}
                    >
                      {c.taxable ? "Taxable" : "Non-taxable"}
                    </span>
                  </label>
                </div>
              ))}
              <button
                onClick={() => setCharges((cs) => [...cs, { id: nextId(), label: "", value: 0, taxable: false }])}
                className="text-left text-[12px] font-medium uppercase tracking-wide pb-1 w-fit"
                style={{ color: token.inkSoft, borderBottom: `1px solid ${token.border}` }}
              >
                + Add charge
              </button>
            </div>
          </Collapsible>

          <Collapsible label="Additional Fields">
            <div className="flex flex-col gap-2">
              {additionalFields.map((f) => (
                <LabelValueRow
                  key={f.id}
                  label={f.label}
                  value={f.value}
                  onLabel={(v) => setAdditionalFields((fs) => fs.map((x) => (x.id === f.id ? { ...x, label: v } : x)))}
                  onValue={(v) => setAdditionalFields((fs) => fs.map((x) => (x.id === f.id ? { ...x, value: v } : x)))}
                  onRemove={() => setAdditionalFields((fs) => fs.filter((x) => x.id !== f.id))}
                />
              ))}
              <button
                onClick={() => setAdditionalFields((fs) => [...fs, { id: nextId(), label: "", value: "" }])}
                className="text-left text-[12px] font-medium uppercase tracking-wide pb-1 w-fit"
                style={{ color: token.inkSoft, borderBottom: `1px solid ${token.border}` }}
              >
                + Add field
              </button>
            </div>
          </Collapsible>
        </Card>

        {/* PAYMENT DETAILS (unchanged) */}
        <Card title="Payment Details">
          <label className="text-[10.5px] font-medium uppercase tracking-wide mb-1.5 block" style={{ color: token.inkSoft }}>
            Bank Account
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
            {banks.map((b) => {
              const selected = selectedBank === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => { setSelectedBank(b.id); showToast("Bank account selected"); }}
                  className="flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-left"
                  style={{
                    border: `1px solid ${selected ? token.green : token.border}`,
                    background: selected ? token.greenSoft : "white",
                    boxShadow: selected ? token.glow : "none",
                  }}
                >
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: token.bg, color: token.inkSoft }}>
                    <Landmark size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium" style={{ color: token.ink }}>{b.name}</div>
                    <div className="text-xs" style={{ color: token.inkSoft }}>{b.account}</div>
                  </div>
                  {selected && <Check size={16} className="ml-auto shrink-0" style={{ color: token.green }} />}
                </button>
              );
            })}
          </div>

          <div
            className="flex items-center justify-between gap-3 rounded-2xl px-3.5 py-2.5 flex-wrap"
            style={{ border: `1px solid ${token.border}`, background: "#fbfcfa" }}
          >
            <div>
              <div className="text-[12px] font-medium uppercase tracking-wide" style={{ color: token.ink }}>
                Show payment details on invoice
              </div>
              <div className="text-xs" style={{ color: token.inkSoft }}>Display bank account information to the client</div>
            </div>
            <button
              onClick={() => { setShowPayment((s) => !s); showToast(!showPayment ? "Payment details visible" : "Payment details hidden"); }}
              aria-label={showPayment ? "Hide payment details" : "Show payment details"}
              className="relative shrink-0 rounded-full transition-colors"
              style={{ width: 42, height: 22, background: showPayment ? token.green : token.border }}
            >
              <span
                className="absolute rounded-full bg-white transition-transform"
                style={{ width: 16, height: 16, top: 3, left: 3, transform: showPayment ? "translateX(20px)" : "none", boxShadow: showPayment ? token.glow : "none" }}
              />
            </button>
          </div>
        </Card>

        {/* SUMMARY with corrected order */}
        <Card title="Summary">
          <div className="flex flex-col">
            <TotalRow label="Subtotal" value={totals.subtotal} />
            {discount.value > 0 && discount.timing === "beforeTax" && (
              <TotalRow label="Discount (before tax)" value={-totals.discountAmt} />
            )}
            {/* Taxable charges with their labels */}
            {charges
              .filter((c) => c.taxable && Number(c.value) !== 0)
              .map((c) => (
                <TotalRow key={c.id} label={c.label || "Charge"} value={Number(c.value)} />
              ))}
            {Number(vatRate) > 0 && <TotalRow label={`VAT (${vatRate}%)`} value={totals.vat} />}
            {discount.value > 0 && discount.timing === "afterTax" && (
              <TotalRow label="Discount (after tax)" value={-totals.discountAmt} />
            )}
            {/* Non-taxable charges with labels */}
            {charges
              .filter((c) => !c.taxable && Number(c.value) !== 0)
              .map((c) => (
                <TotalRow key={c.id} label={c.label || "Charge"} value={Number(c.value)} />
              ))}
            {wht.rate > 0 && <TotalRow label="WHT" value={-totals.whtAmt} />}
            <div className="flex justify-between items-baseline pt-3 mt-1" style={{ borderTop: `2px solid ${token.ink}` }}>
              <span style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: 20, color: token.ink }}>Grand Total</span>
              <span style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: 24, color: token.green }}>
                ${money(totals.grandTotal)}
              </span>
            </div>
            <div className="text-xs italic pt-2 mt-1" style={{ color: token.inkSoft, borderTop: `1px solid ${token.border}` }}>
              {numberToWords(totals.grandTotal)} dollars
            </div>
          </div>
        </Card>

        {/* ADDITIONAL INFORMATION */}
        <div ref={additionalCardRef}>
        <Card title="Additional Information">
          <Collapsible label="Notes" defaultOpen>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full rounded-xl px-3 py-2 text-sm outline-none resize-y bg-white"
              style={{ border: `1px solid ${token.border}`, color: token.ink, minHeight: 56 }}
            />
          </Collapsible>
          <Collapsible label="Terms & Conditions">
            <textarea
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              rows={3}
              className="w-full rounded-xl px-3 py-2 text-sm outline-none resize-y bg-white"
              style={{ border: `1px solid ${token.border}`, color: token.ink, minHeight: 56 }}
            />
          </Collapsible>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <Field label="Signatory Name">
              <TextInput value={signatoryName} onChange={setSignatoryName} placeholder="Full name" />
            </Field>
            <Field label="Title">
              <TextInput value={signatoryTitle} onChange={setSignatoryTitle} placeholder="e.g. CEO" />
            </Field>
          </div>

          <div className="mt-3">
            <label className="text-[10.5px] font-medium uppercase tracking-wide mb-1.5 block" style={{ color: token.inkSoft }}>
              Signature
            </label>
            <div
              className="flex items-center gap-3 rounded-2xl px-3.5 py-2.5 flex-wrap"
              style={{
                border: `1px dashed ${signature ? token.green : token.borderStrong}`,
                background: signature ? token.greenSoft : "white",
                boxShadow: signature ? token.glow : "none",
              }}
            >
              <div className="flex items-center gap-3 flex-1 min-w-[160px]">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "white", border: `1px solid ${token.border}` }}>
                  {signature ? <Check size={17} style={{ color: token.green }} /> : <PenLine size={17} style={{ color: token.inkSoft }} />}
                </div>
                <span className="text-[13px] font-medium" style={{ color: signature ? token.ink : token.inkSoft }}>
                  {signature || "Tap to sign or upload"}
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <GhostButton small onClick={() => { setSignature("Signature captured"); showToast("Signature signed"); }}>Sign now</GhostButton>
                <GhostButton small onClick={() => { setSignature("Uploaded signature"); showToast("Signature uploaded"); }}><Upload size={12} /> Upload</GhostButton>
                <GhostButton small onClick={() => { setSignature("Saved signature"); showToast("Saved signature selected"); }}><FolderOpen size={12} /> Saved</GhostButton>
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-2">
            <label className="text-[10.5px] font-medium uppercase tracking-wide block" style={{ color: token.inkSoft }}>
              Reference Links
            </label>
            {refLinks.map((l) => (
              <div key={l.id} className="grid gap-2 items-end" style={{ gridTemplateColumns: "1fr 1.4fr auto" }}>
                <TextInput value={l.label} onChange={(v) => setRefLinks((ls) => ls.map((x) => (x.id === l.id ? { ...x, label: v } : x)))} placeholder="Label (optional)" />
                <TextInput value={l.url} onChange={(v) => setRefLinks((ls) => ls.map((x) => (x.id === l.id ? { ...x, url: v } : x)))} placeholder="https://..." />
                <RowIcon label="Remove link" danger onClick={() => setRefLinks((ls) => ls.filter((x) => x.id !== l.id))}>
                  <X size={14} />
                </RowIcon>
              </div>
            ))}
            <button
              onClick={() => { setRefLinks((ls) => [...ls, { id: nextId(), label: "", url: "" }]); showToast("Reference link added"); }}
              className="inline-flex items-center gap-1.5 text-left text-[12px] font-medium uppercase tracking-wide pb-1 w-fit"
              style={{ color: token.inkSoft, borderBottom: `1px solid ${token.border}` }}
            >
              <Link2 size={13} /> Add reference link
            </button>
          </div>
        </Card>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3 pt-4 mt-1" style={{ borderTop: `1px solid ${token.border}` }}>
          <GhostButton onClick={() => { if (confirm("Discard changes?")) showToast("Changes discarded"); }}>Cancel</GhostButton>
          <PrimaryButton onClick={() => showToast("Invoice saved successfully")}>
            <Save size={16} /> Save Invoice
          </PrimaryButton>
        </div>
      </div>

      {/* CLEAR ALL CONFIRMATION MODAL */}
      {showClearAllModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(24, 26, 23, 0.4)", backdropFilter: "blur(4px)" }}>
          <div
            className="w-full max-w-sm rounded-3xl p-5 flex flex-col gap-4"
            style={{ background: "white", boxShadow: token.cardShadow, border: `1px solid ${token.border}` }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "#fdecea", color: token.red }}>
                <Trash2 size={20} />
              </div>
              <h3 className="text-lg font-semibold" style={{ fontFamily: fontDisplay, color: token.ink }}>Clear all items?</h3>
            </div>
            <p className="text-sm" style={{ color: token.inkSoft, lineHeight: 1.5 }}>
              This action will permanently remove all line items and groups from this invoice. This cannot be undone.
            </p>
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setShowClearAllModal(false)}
                className="flex-1 py-2.5 rounded-2xl text-sm font-semibold tracking-wide transition-colors"
                style={{ border: `1px solid ${token.border}`, color: token.ink, background: "white" }}
              >
                Cancel
              </button>
              <button
                onClick={clearAll}
                className="flex-1 py-2.5 rounded-2xl text-sm font-semibold tracking-wide transition-colors text-white"
                style={{ background: token.red, boxShadow: "0 4px 12px rgba(209, 69, 59, 0.3)" }}
              >
                Yes, clear all
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING SAVE BUTTON (Save icon) */}
      <button
        onClick={() => showToast("Invoice saved")}
        aria-label="Save invoice"
        className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 w-14 h-14 rounded-full flex items-center justify-center z-50"
        style={{ background: `linear-gradient(160deg, ${token.green}, ${token.greenDeep})`, color: "white", boxShadow: token.glowStrong }}
      >
        <Save size={22} />
      </button>

      {/* TOAST */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] pointer-events-none w-[calc(100%-32px)] max-w-sm">
        <div
          className="rounded-full px-5 py-2.5 text-sm font-medium text-center transition-all duration-300"
          style={{
            background: token.ink,
            color: "white",
            opacity: toast ? 1 : 0,
            transform: toast ? "translateY(0) scale(1)" : "translateY(16px) scale(0.95)",
          }}
        >
          {toast}
        </div>
      </div>
    </div>
  );
}

function TotalRow({ label, value }) {
  return (
    <div className="flex justify-between py-1.5 text-[14px]" style={{ borderBottom: `1px solid ${token.border}`, color: token.inkSoft }}>
      <span>{label}</span>
      <span style={{ fontWeight: 500, color: token.ink }}>
        {value < 0 ? "-" : ""}${money(Math.abs(value))}
      </span>
    </div>
  );
}