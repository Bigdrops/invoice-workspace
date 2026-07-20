# BIGDROPS — Invoice Workspace Collection

A gallery of production-ready invoice workspace implementations. Each workspace explores a completely different design language, built by a different "design team" against the same business problem.

This is not one application with themes. It is a collection of independent implementations — like shadcn/ui, but for complete business screens instead of individual components.

---

## What This Is

| What | What It Is Not |
|------|----------------|
| A gallery of invoice workspaces | A single invoice application |
| Independent design explorations | A theme system |
| Production-ready React components | Mockups or prototypes |
| Copy-pasteable implementations | A shared component library |

---

## Current Workspaces

| Workspace | Design Language | Inspiration |
|-----------|----------------|-------------|
| **PRAV** | Engineering dossier on warm parchment | PRAV.md |
| **Sackville** | Editorial risograph zine on cream | SACKVILLE.md |
| **AMRA** | Monochrome minimal with lavender accent | AMRA.md |

---

## Planned Workspaces

| Workspace | Status |
|-----------|--------|
| Invoice — Mono | Planned |
| Invoice — EaseHealth | Planned |
| Invoice — Convex | Planned |
| Invoice — Hyperstudio | Planned |
| Invoice — Rootly | Planned |
| Invoice — Outseta | Planned |
| Inventory | Planned |
| CRM | Planned |

---

## Architecture

```
src/
├── App.tsx              ← Gallery + workspace switching
├── gallery/             ← Workspace browser
├── types/               ← Shared business types
├── lib/                 ← Shared utilities
└── workspaces/invoice/
    ├── prav/            ← PRAV workspace (own CSS, own components)
    ├── sackville/       ← Sackville workspace (own CSS, own components)
    └── amra/            ← AMRA workspace (own CSS, own components)
```

**Rules:**

- Each workspace is fully self-contained
- Each workspace owns its own CSS, colors, typography, spacing, animations
- No shared design tokens, no shared theme, no shared component styling
- Only business logic (types, calculations, mock data) is shared
- A change in one workspace never affects another

---

## Design References

Every workspace begins by selecting one design reference from `docs/DESIGNMD/`. That document becomes the design inspiration — one workspace, one design language.

---

## How to Run

```bash
# Install dependencies
bun install

# Development server
bun run dev

# Production build
bun run build
```

The application opens into the workspace gallery. Select any workspace to explore it.

---

## How to Create a New Workspace

1. Pick one `docs/DESIGNMD/` file
2. Read it completely
3. Build a new invoice workspace inspired by it
4. Place it in `src/workspaces/invoice/<name>/`
5. Register it in `src/App.tsx`

That's it. No shared theme updates. No design token registration. No component library changes.

---

## Screenshots

> Coming soon — each workspace will be screenshotted at 375px, 768px, and 1280px.

---

## Tech Stack

- React 19
- TypeScript 5.9
- Vite 7
- Tailwind CSS 3.4
- shadcn/ui patterns

---

## Contribution Guidelines

- Every workspace must be completely independent
- Do not create shared visual layers
- Do not modify existing workspaces when adding new ones
- Each workspace must compile into its own isolated CSS and JS chunk
- Mobile-first. No horizontal scrolling. No spreadsheet layouts.
- Production quality. No placeholders. No Lorem ipsum.

---

## License

Internal use only.
