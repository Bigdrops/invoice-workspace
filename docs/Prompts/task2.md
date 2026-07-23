previous plan task5.md in this directory:

```
TASK: Fix the Gallery / workspace-picker screen (currently running an
old pre-Moving-Parts "file manager" UI pattern with dead tokens) and
finish wiring the shell. Reference file: docs/bgd-ui-prd/Claude-moving-parts.html
— this is the authoritative visual source. moving-parts-components.css
already contains its full CSS (.mp-shot, .mp-shot-grid, .mp-categories,
.mp-search, .mp-section-label) — it is simply unused right now.

Do not touch anything under src/workspaces/.

═══════════════════════════════════════════════════════════════
CONFIRMED BY DIRECT INSPECTION
═══════════════════════════════════════════════════════════════

- Gallery.tsx and Settings.tsx render via AppWindow + SidebarNav — a
  file-manager/window metaphor from the OLD pre-Moving-Parts shell
  direction. It uses --shell-* tokens that are defined nowhere
  (confirmed: zero files define them). This is the "horrible and
  unusable" screen.
- AppWindow, SidebarNav, WorkspaceCard, EmptyState, LoadingState are
  used ONLY by Gallery.tsx and Settings.tsx — nothing else consumes
  them. Safe to delete once those two screens are rewritten.
- GradientOrb has ZERO consumers anywhere in src/. Dead on arrival.
  Delete it now (separate from the ConicSphere work planned for Landing).
- TopBar.tsx links to #components / #docs (pages being deleted per
  Task 1 of the previous plan) and its search button has no onClick —
  it does nothing right now.

═══════════════════════════════════════════════════════════════
TASK A — Rebuild Gallery.tsx as a real mp-shot-grid gallery
═══════════════════════════════════════════════════════════════

Rewrite src/shell/screens/Gallery/Gallery.tsx to render workspace
cards directly using the EXISTING classes in moving-parts-components.css
— do not write new CSS, do not invent new class names.

UX change from current behavior: drop the topic drill-down step.
With only one topic ("Invoice") today, forcing a click into "Invoice"
before seeing any workspace is pure friction and doesn't match the
reference mockup, which shows workspace cards directly with category
pills for filtering. If more topics/categories exist later, filtering
handles it — no separate topic-list screen needed. (Flag: this is a
UX simplification, confirm it's fine — if you want topic grouping
kept, say so and this gets revised.)

Structure, using classes already defined in moving-parts-components.css:

```tsx
import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import type { ShellWorkspace } from '../../types'

interface GalleryProps {
  workspaces: ShellWorkspace[]
  loading?: boolean
  onSelectWorkspace: (id: string) => void
  onOpenSettings: () => void
}

export function Gallery({ workspaces, loading, onSelectWorkspace, onOpenSettings }: GalleryProps) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [searchOpen, setSearchOpen] = useState(false)

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(workspaces.map(w => w.category.toLowerCase())))],
    [workspaces]
  )

  const filtered = workspaces.filter(w => {
    const matchesCategory = category === 'all' || w.category.toLowerCase() === category
    const q = query.toLowerCase().trim()
    const matchesQuery = q === '' || w.name.toLowerCase().includes(q) || w.description.toLowerCase().includes(q)
    return matchesCategory && matchesQuery
  })

  return (
    <div className="mp-section mp-section-tight">
      <div className={`mp-search ${searchOpen ? 'visible' : ''}`}>
        <span className="mp-search-icon"><Search size={18} /></span>
        <input
          type="text"
          placeholder="Search workspaces…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search workspaces"
        />
      </div>

      <div className="mp-section-label">
        <h2>Workspace Gallery</h2>
        <span>{filtered.length} {filtered.length === 1 ? 'shot' : 'shots'}</span>
      </div>

      <div className="mp-categories">
        {categories.map(c => (
          <button
            key={c}
            type="button"
            className={`mp-category-pill ${category === c ? 'active' : ''}`}
            onClick={() => setCategory(c)}
          >
            {c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="mp-mono">Loading workspaces…</p>
      ) : filtered.length === 0 ? (
        <div className="mp-empty">
          <p>No workspaces match your search</p>
        </div>
      ) : (
        <div className="mp-shot-grid" role="list">
          {filtered.map((ws) => (
            <article
              key={ws.id}
              role="listitem"
              tabIndex={0}
              className="mp-shot"
              onClick={() => onSelectWorkspace(ws.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelectWorkspace(ws.id) } }}
            >
              <div className="shot-preview">
                {/* preview swatch — see NOTE below */}
              </div>
              <div className="shot-meta">
                <div className="shot-top">
                  <span className="shot-status">{ws.status === 'active' ? 'Live' : 'In development'}</span>
                </div>
                <h3 className="shot-name">{ws.name}</h3>
                <p className="shot-domain">{ws.category} · {ws.description}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
```

NOTE on shot-preview: check whether moving-parts-components.css already
defines `.shot-preview` / `.shot-chrome` / `.shot-line` / `.shot-block`
(the card preview swatch classes from the reference HTML — grep for
"shot-preview" in moving-parts-components.css to confirm). If present,
use them with a neutral placeholder swatch per workspace (no real
per-workspace color exists in ShellWorkspace yet — either add an
optional `accentColor` field to the ShellWorkspace type in
src/shell/types.ts and set it per workspace in App.tsx's WORKSPACES
array, or omit the swatch and let shot-preview render as a plain
--mp-color-chalk block until that data exists). Do not fabricate
colors that don't correspond to each workspace's real theme.

═══════════════════════════════════════════════════════════════
TASK B — Rebuild Settings.tsx on Moving Parts primitives directly
═══════════════════════════════════════════════════════════════

Rewrite src/shell/screens/Settings/Settings.tsx. No AppWindow/SidebarNav.
Simple centered content using mp-container, mp-section-label, and
--mp-* variables directly (--mp-color-smoke for borders, --mp-color-ash
for muted text, --mp-space-* for spacing) — this screen is simple
enough it doesn't need new shared classes, inline styles referencing
real --mp-* tokens are fine here. Keep a back button (onBack prop) at
the top using className="btn-ghost".

═══════════════════════════════════════════════════════════════
TASK C — Delete now-dead components
═══════════════════════════════════════════════════════════════

After A and B land, verify then delete:
- src/shell/components/AppWindow/
- src/shell/components/SidebarNav/
- src/shell/components/WorkspaceCard/
- src/shell/components/EmptyState/
- src/shell/components/LoadingState/
- src/shell/components/GradientOrb/  (delete now regardless — zero consumers already)

Verify: `grep -rn "AppWindow\|SidebarNav\|WorkspaceCard\|EmptyState\|LoadingState\|GradientOrb" src`
returns nothing.

═══════════════════════════════════════════════════════════════
TASK D — Fix TopBar
═══════════════════════════════════════════════════════════════

In src/shell/components/TopBar/TopBar.tsx:
- Remove the #components and #docs nav links entirely (those pages
  no longer exist per the earlier cleanup task).
- Wire the search button's onClick to toggle a search-open state and
  either (a) lift search state up into Shell.tsx and pass a callback
  down to both TopBar and Gallery, or (b) simplest: remove the search
  button from TopBar entirely since Gallery now owns its own inline
  mp-search bar (Task A) — a second search entry point in the nav is
  redundant. Recommend (b) unless you want global search-from-anywhere
  later.

═══════════════════════════════════════════════════════════════
Everything else from the previous plan (App.tsx cleanup, dead-file
deletion, Landing → Moving Parts migration with PhoneMockup /
ConicSphere / YellowPanel, index.css / landing/styles.css cleanup,
validation steps) still applies unchanged.
═══════════════════════════════════════════════════════════════
```

