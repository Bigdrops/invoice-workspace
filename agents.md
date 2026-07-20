# AGENTS

## Engineering Handbook for AI Development

This document is the authoritative reference for every AI agent making changes to this repository. Read it before writing code. Follow it without exception.

---

## 1. Repository Philosophy

This repository is a **gallery of independent invoice workspace implementations**.

Every workspace is intentionally independent. Every workspace should look like it came from a different company. The value of this repository comes from **diversity**, not consistency.

- Do **not** try to create one reusable design system.
- Do **not** create a shared theme layer.
- Do **not** move styling into shared folders.
- Do **not** create reusable design tokens.
- Do **not** attempt to standardize visual design.
- **The goal is exploration.**

---

## 2. Architecture

```
src/
├── App.tsx                  ← Gallery + workspace switching
├── main.tsx
├── index.css                ← Tailwind/base reset only
├── gallery/
│   └── Gallery.tsx
├── types/
│   └── invoice.ts           ← Shared business types only
├── lib/
│   ├── calculations.ts
│   ├── mock-data.ts
│   └── utils.ts
└── workspaces/
    └── invoice/
        ├── prav/
        ├── sackville/
        └── <new-workspace>/
```

### What can be shared

Only business logic:

- TypeScript invoice types (`src/types/invoice.ts`)
- Calculation helpers (`src/lib/calculations.ts`)
- Currency formatting, ID generation (`src/lib/utils.ts`)
- Mock data factories (`src/lib/mock-data.ts`)

### What must NOT be shared

- CSS
- Colors
- Typography
- Spacing
- Border radius
- Shadows
- Animations
- Component styling
- Design tokens

Each workspace owns all of its visual decisions.

---

## 3. Design References

Every new workspace begins by selecting **one** design reference from:

```
docs/DESIGNMD/
```

That document becomes the design inspiration for the entire workspace. Rules:

- Do **not** mix multiple design documents.
- Do **not** combine PRAV with Sackville.
- Do **not** combine AMRA with CONVEX.
- **One workspace. One design language.**

---

## 4. Component Usage

The components inside `docs/reui/` are building blocks. Reuse them whenever appropriate. Compose them differently to match the selected design language.

- Never recreate the ReUI library.
- Never change another workspace because a new workspace needs something different.
- Use ReUI as **reference** for architecture and patterns, not as a direct import.

---

## 5. Workspace Rules

Every workspace owns:

| Asset | Shared? |
|-------|---------|
| Colors | No |
| Spacing | No |
| Typography | No |
| Border radius | No |
| Borders | No |
| Shadows | No |
| Animations | No |
| Interactions | No |
| Icons | No |
| Layout | No |
| CSS | No |
| `index.css` | No — each workspace's own |

Nothing visual is shared. Only business logic may be shared.

---

## 6. Adding a New Workspace

1. Pick one random `docs/DESIGNMD/` file.
2. Read it completely.
3. Build an original invoice workspace inspired by it.
4. Place everything inside `src/workspaces/invoice/<workspace-name>/`.
5. Register it in the gallery (`src/App.tsx`).

That is all. Nothing else should be required.

---

## 7. Mobile-First Mandate

Mobile is the primary platform. Desktop is a progressive enhancement.

- No horizontal scrolling
- No spreadsheet layouts
- Touch targets minimum 44×44 CSS pixels
- One-handed usage
- Inline editing everywhere
- No modal-first workflows

---

## 8. Code Standards

- TypeScript strict mode. No `any`.
- Named exports only.
- One component per file.
- Each workspace has its own `index.css` with its own design tokens.
- Tailwind CSS for utility classes within each workspace.
- `docs/reui` components as reference for architecture.

---

## 9. Validation

Before completing any task:

1. Run `bun run build` — no type errors
2. Run `bun run build` — production bundle succeeds
3. Verify responsive at 375px, 768px, 1024px
4. Each workspace must compile into its own isolated CSS and JS chunk

---

## 10. Directory Structure

```
.
├── agents.md
├── Readme.md
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── index.html
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── gallery/
│   ├── lib/
│   ├── types/
│   └── workspaces/invoice/
├── docs/
│   ├── DESIGNMD/
│   └── reui/
└── dist/
```
