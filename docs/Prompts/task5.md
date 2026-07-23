

```
TASK: Enforce Moving Parts shell across the entire BGD UI app shell
(landing, gallery, settings, top nav). Workspaces (PRAV/AMRA/Runway/
PostHog/Nuri) are NOT touched — ADR-001 isolation stays intact.

Load skill: superpowers:executing-plans (or subagent-driven-development).

═══════════════════════════════════════════════════════════════
CONTEXT — confirmed by direct repo inspection, not assumption
═══════════════════════════════════════════════════════════════

1. src/shell/styles/{tokens,typography,reset}.css are DEAD — zero
   files import them (verified via grep). Safe to delete.

2. Seven live shell files still reference a --shell-* semantic token
   layer that these dead files used to define. Since nothing defines
   them anymore, every one of these var() calls currently resolves to
   nothing at runtime:
   - src/shell/screens/Gallery/Gallery.module.css + Gallery.tsx
   - src/shell/screens/Settings/Settings.module.css + Settings.tsx
   - src/shell/components/SidebarNav/SidebarNav.module.css
   - src/shell/components/AppWindow/AppWindow.module.css
   - src/shell/components/EmptyState/EmptyState.module.css
   - src/shell/components/WorkspaceCard/WorkspaceCard.module.css + .tsx
   - src/shell/components/LoadingState/LoadingState.module.css
   - src/shell/components/GradientOrb/GradientOrb.tsx
   - src/App.tsx (ShellPageHeader)

3. src/App.tsx hand-rolls a SECOND, separate nav header
   (ShellPageHeader) on top of the real one (TopBar.tsx, used inside
   Shell.tsx). This is redundant and also uses the dead tokens above.

4. src/pages/{components,workspaces,docs}/ are placeholder pages with
   fabricated content (a "CRM"/"Admin"/"E-Commerce" workspace list
   that doesn't exist anywhere in the real WORKSPACES registry).
   Landing never links to them. CONFIRMED DEAD — delete entirely.

5. src/index.css defines a full unscoped "Caldera" token system at
   :root (--color-ember, --space-*, --font-display, etc.), loaded
   globally for the whole app regardless of page. This must be
   stripped back to Tailwind directives + true global reset only.

6. src/landing/styles.css defines a SECOND, independent copy of the
   same Caldera system under different names (--bgd-ember etc.).
   Landing must be re-skinned onto Moving Parts instead.

7. docs/superpowers/plans/2026-07-21-moving-parts-shell-overhaul.md
   promised PhoneMockup.tsx, ConicSphere.tsx, YellowPanel.tsx in its
   file map. None exist. Build them as part of this task.

═══════════════════════════════════════════════════════════════
TASK 1 — Delete confirmed dead code
═══════════════════════════════════════════════════════════════

Delete:
- src/shell/styles/tokens.css
- src/shell/styles/typography.css
- src/shell/styles/reset.css
- src/pages/components/ (entire directory)
- src/pages/workspaces/ (entire directory)
- src/pages/docs/ (entire directory)

In src/App.tsx:
- Remove the 'components' | 'workspaces' | 'docs' members from the
  Page type — only 'landing' | 'shell' remain.
- Remove navigateToComponents, navigateToWorkspaces, navigateToDocs
  and their branches.
- Remove the ShellPage / ShellPageHeader wrapper components entirely.
  Shell.tsx already renders its own TopBar inside .moving-parts-shell
  — App.tsx should render <Shell topics={TOPICS} workspaces={WORKSPACES} />
  directly with no extra wrapper.

Verify: `grep -rn "ComponentsPage\|WorkspacesPage\|DocsPage\|ShellPageHeader" src`
returns nothing.

═══════════════════════════════════════════════════════════════
TASK 2 — Create the semantic bridge (fixes the undefined-token bug)
═══════════════════════════════════════════════════════════════

Create: src/shell/styles/moving-parts-semantic.css

This file aliases every --shell-* token the existing components
already expect onto real Moving Parts values. Do not touch the
consuming components — this file alone fixes them.

```css
/*
 * Semantic bridge — maps the --shell-* vocabulary that
 * Gallery/Settings/SidebarNav/WorkspaceCard/etc. were built against
 * onto real Moving Parts primitive values. Scoped to .moving-parts-shell,
 * same as moving-parts-tokens.css.
 */
.moving-parts-shell {
  /* Color roles */
  --shell-color-canvas: var(--mp-surface-canvas);
  --shell-color-surface: var(--mp-color-chalk);
  --shell-color-surface-alt: var(--mp-color-bone);
  --shell-color-surface-hover: var(--mp-color-smoke);
  --shell-color-border: var(--mp-color-smoke);
  --shell-color-text: var(--mp-color-onyx);
  --shell-color-text-secondary: var(--mp-color-ash);
  --shell-color-text-muted: var(--mp-color-ash);
  --shell-color-accent: var(--mp-color-electric);

  /* Fonts */
  --shell-font-display: var(--mp-font-display);
  --shell-font-body: var(--mp-font-display);
  --shell-font-ui: var(--mp-font-display);
  --shell-font-mono: var(--mp-font-mono);
  --shell-font-weight: 400;
  --shell-font-weight-medium: 600;

  /* Radius — Moving Parts only has hero(76)/pill/cards(90)/
     buttons(18)/large-cards(106)/small(3). Map by scale, not name. */
  --shell-radius-sm: var(--mp-radius-small);
  --shell-radius-md: var(--mp-radius-buttons);
  --shell-radius-lg: 32px;
  --shell-radius-full: var(--mp-radius-pill);

  /* Shadows — Moving Parts only defines one heavy shadow.
     Card gets a lighter version, elevated gets the real one. */
  --shell-shadow-card: 0 8px 16px 8px rgba(0, 0, 0, 0.12);
  --shell-shadow-elevated: var(--mp-shadow-xl);

  /* Spacing — direct 1:1 where Moving Parts has the same step,
     interpolated where it doesn't (mp has no 14, 56 unused here) */
  --shell-spacing-4: var(--mp-space-4);
  --shell-spacing-8: var(--mp-space-8);
  --shell-spacing-12: var(--mp-space-12);
  --shell-spacing-14: 14px;
  --shell-spacing-16: var(--mp-space-16);
  --shell-spacing-20: var(--mp-space-20);
  --shell-spacing-24: var(--mp-space-24);
  --shell-spacing-32: var(--mp-space-32);
  --shell-spacing-40: var(--mp-space-40);
  --shell-spacing-48: var(--mp-space-48);

  /* Type scale — Moving Parts has no semantic scale, only literal
     sizes used per-component in the reference mockup. Ported here. */
  --shell-text-display: clamp(48px, 8vw, 72px);
  --shell-text-display-leading: 0.98;
  --shell-text-heading-lg: clamp(32px, 5vw, 56px);
  --shell-text-heading-lg-leading: 0.98;
  --shell-text-heading: 28px;
  --shell-text-heading-leading: 1.05;
  --shell-text-heading-sm: 22px;
  --shell-text-heading-tracking: -0.02em;
  --shell-text-subheading: 20px;
  --shell-text-subheading-leading: 1.4;
  --shell-text-body: 16px;
  --shell-text-body-leading: 1.6;
  --shell-text-caption: 14px;
  --shell-text-caption-leading: 1.4;
  --shell-text-caption-tracking: 0.01em;
  --shell-text-micro: 12px;
  --shell-text-micro-leading: 1.3;

  /* Layout */
  --shell-page-max-width: var(--mp-max-width);
  --shell-topbar-height: 64px;
  --shell-transition: 200ms cubic-bezier(0.22, 1, 0.36, 1);

  /* Gradient orb — GradientOrb.tsx predates Moving Parts and has no
     Moving Parts equivalent. Aliased to neutral tones so it doesn't
     crash; TASK 4 replaces its usage with ConicSphere instead. */
  --shell-gradient-orb-1: var(--mp-color-electric);
  --shell-gradient-orb-2: var(--mp-color-chalk);
  --shell-gradient-orb-3: var(--mp-color-smoke);
}
```

In src/shell/Shell.tsx, add the import alongside the existing four:
```
import './styles/moving-parts-tokens.css'
import './styles/moving-parts-semantic.css'   // ADD THIS — after tokens, before reset
import './styles/moving-parts-reset.css'
import './styles/moving-parts-typography.css'
import './styles/moving-parts-components.css'
```

Verify: run the app, open Gallery and Settings screens, confirm no
more black-on-transparent / unstyled elements. Run
`grep -rn "var(--shell-" src` — every result should now have a
matching definition in moving-parts-semantic.css.

═══════════════════════════════════════════════════════════════
TASK 3 — Retire GradientOrb, build ConicSphere / PhoneMockup / YellowPanel
═══════════════════════════════════════════════════════════════

Find every place GradientOrb is rendered:
`grep -rn "GradientOrb" src`

Create src/shell/components/ConicSphere/ConicSphere.tsx:
- A div with a conic-gradient background (rainbow sweep — same
  gradient used in the earlier HTML reference: cyan → purple → pink
  → red → orange → yellow → green → back to cyan), blurred, low
  opacity, floating animation. Accepts a `size` prop (default 300px
  desktop / 160px mobile) and renders absolutely positioned.
- Replace every GradientOrb usage found above with ConicSphere.
- Delete src/shell/components/GradientOrb/ once unused.

Create src/shell/components/PhoneMockup/PhoneMockup.tsx:
- A phone-frame div (--mp-radius-hero corners, --mp-color-electric
  background, border, --mp-shadow-xl) containing mock UI bars and a
  price display in --mp-font-serif italic (Fraunces), matching the
  hero visual from docs/Designs/Shell-templates/Deep-moving-parts.html.
- Accepts children or a `price` prop for flexibility.

Create src/shell/components/YellowPanel/YellowPanel.tsx:
- A rounded panel (--mp-radius-large-cards, --mp-surface-yellow
  background, --mp-color-onyx text) for use inside dark sections.
  Accepts title/body/children.

═══════════════════════════════════════════════════════════════
TASK 4 — Migrate Landing to Moving Parts
═══════════════════════════════════════════════════════════════

Files: src/landing/Landing.tsx, Header.tsx, Hero.tsx, Workspaces.tsx,
Components.tsx, Trust.tsx, CTA.tsx, Footer.tsx, MobileNav.tsx,
styles.css

- Wrap Landing's root element in className="moving-parts-shell" so
  it inherits --mp-* tokens and the semantic bridge.
- Delete src/landing/styles.css entirely (the duplicate Caldera copy).
  Rebuild landing styling using moving-parts-components.css classes
  (mp-hero, mp-section, mp-shot / card patterns, btn-electric,
  btn-ghost) — do not invent a fifth token system.
- Hero.tsx: use the new PhoneMockup + ConicSphere components in the
  hero visual, per the reference mockup.
- Add a YellowPanel-based section (dark background) somewhere in the
  landing flow — this was the intended dark-section accent moment in
  the original overhaul plan and never got built.
- Workspaces.tsx: pull from the REAL WORKSPACES array (App.tsx) —
  no more fabricated CRM/Admin/E-Commerce entries. Import or pass
  the actual registry down; do not hardcode a second copy.

Verify at 375px, 768px, 1024px per AGENTS.md mobile-first mandate.

═══════════════════════════════════════════════════════════════
TASK 5 — Strip global index.css back to true global-only content
═══════════════════════════════════════════════════════════════

In src/index.css:
- Remove the entire :root Caldera token block (--color-ember,
  --color-plasma-violet, --font-display, --space-*, --page-max-width,
  etc.) — these are unscoped and leak app-wide by design flaw.
- Keep only: the @tailwind directives, the Google Fonts @import (if
  still needed after Task 4 — Moving Parts pulls Inter/JetBrains
  Mono/Fraunces from its own <link> tags per the reference HTML, so
  this may become redundant — check and remove if so), and any true
  cross-cutting reset (box-sizing etc.) that isn't already handled by
  moving-parts-reset.css scoped inside .moving-parts-shell.

Verify: `grep -n "color-ember\|bgd-ember" src -r` returns nothing
anywhere in the app.

═══════════════════════════════════════════════════════════════
TASK 6 — Validation
═══════════════════════════════════════════════════════════════

1. bun run typecheck — no errors
2. bun run build — succeeds
3. Manually click through: Landing → Open Shell → Gallery →
   open each of the 5 real workspaces → back → Settings → back.
   Confirm every screen has real, defined styling (no unstyled
   flashes of black text / transparent backgrounds).
4. Confirm each of the 5 workspaces (PRAV/AMRA/Runway/PostHog/Nuri)
   still renders exactly as before — ADR-001 isolation must hold.
   `grep -rn "moving-parts\|--mp-\|--shell-" src/workspaces` should
   return NOTHING. If it does, isolation has been violated — stop
   and report.
5. Save a task report to docs/Reports/ per AGENTS.md §14, listing
   every file created/modified/deleted and what was verified.

Do not touch anything under src/workspaces/. Do not add shared design
tokens, shared CSS, or a component library. This task is shell-only.
```

That's the complete, executable version. One thing worth flagging separately once this lands: `docs/bgd-ui-prd/bgd-shell-final-recommendation.md` still documents the old "Operate" muted-paper philosophy as the final decision — that doc needs a rewrite pass to reflect Moving Parts, but that's a docs task, not code, so I kept it out of the coding agent's scope. Want me to draft that update now, or after you've seen the code changes land?