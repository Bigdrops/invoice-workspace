# Task: Complete Shell Migration to Moving Parts

## Task

Migrate all shell components and landing page to Moving Parts design system. Fix runtime bugs in Gallery. Build missing components. Clean up old Caldera tokens.

## Approach

1. Debug white screen — traced to React Rules of Hooks violation in Gallery.tsx
2. Debug swatch overlap — traced to missing `flex-shrink: 0` on `.shot-preview`
3. Build PhoneMockup, ConicSphere, YellowPanel as React components using existing CSS classes
4. Migrate landing page: rewrote all 8 components to use `mp-*` classes, added PhoneMockup/ConicSphere to hero, YellowPanel to CTA
5. Delete old landing styles.css and MobileNav.tsx
6. Strip Caldera tokens from index.css
7. Build and verify

## Changes

| File | Action | Description |
|------|--------|-------------|
| `src/shell/screens/Gallery/Gallery.tsx` | Fixed | Moved `useMemo` outside conditional block to fix React Rules of Hooks violation (white screen root cause) |
| `src/shell/styles/moving-parts-components.css` | Patched | Added `flex-shrink: 0` to `.shot-preview` to prevent aspect-ratio collapse in flex context |
| `src/shell/components/PhoneMockup/PhoneMockup.tsx` | Created | Renders `.phone-frame` with `.screen-content` using existing moving-parts CSS |
| `src/shell/components/ConicSphere/ConicSphere.tsx` | Created | Renders `.conic-sphere` div using existing moving-parts CSS |
| `src/shell/components/YellowPanel/YellowPanel.tsx` | Created | Renders `.mp-yellow-panel` with title, description, children slots |
| `src/landing/Header.tsx` | Rewritten | Uses `mp-nav`, `mp-brand`, `mp-nav-links`, `mp-nav-actions`, `btn-electric`, `mp-hamburger` |
| `src/landing/Hero.tsx` | Rewritten | Uses `mp-hero`, `mp-container`, `mp-hero-inner`, `mp-hero-content`, `mp-hero-eyebrow`, `mp-hero-actions`, `mp-hero-visual`, imports `PhoneMockup` + `ConicSphere` |
| `src/landing/Workspaces.tsx` | Rewritten | Uses `mp-section`, `mp-container`, `mp-section-label`, `mp-shot-grid`, `mp-shot`, `shot-preview`, `shot-meta`, `shot-name`, `shot-domain` |
| `src/landing/Components.tsx` | Rewritten | Uses `mp-section mp-section-alt`, `mp-shot` with `btn-electric` icon styling |
| `src/landing/Trust.tsx` | Rewritten | Uses `mp-section mp-section-dark`, `mp-hero-stats` with stats grid |
| `src/landing/CTA.tsx` | Rewritten | Uses `mp-section`, `YellowPanel` component with `btn-electric`/`btn-ghost` buttons |
| `src/landing/Footer.tsx` | Rewritten | Uses `mp-footer`, `mp-footer-text`, `mp-footer-links` |
| `src/landing/Landing.tsx` | Rewritten | Wraps root in `moving-parts-shell`, removes `MobileNav` import, removes `styles.css` import |
| `src/index.css` | Cleaned | Removed Caldera design tokens (`--color-ember`, `--font-display`, `--space-*`, `--radius-*`, etc.), kept Tailwind directives, box-sizing reset, focus styles |
| `src/landing/styles.css` | Deleted | 750 lines of Caldera design language CSS |
| `src/landing/MobileNav.tsx` | Deleted | Replaced by mp-nav hamburger menu in Header |

## Verification

- `bun run build` — passes with zero type errors and zero build warnings
- `bun run tsc` — passes
- Dead components grep — no references to `AppWindow`, `SidebarNav`, `WorkspaceCard`, `EmptyState`, `LoadingState`, `GradientOrb` in `src/`
- Landing `styles.css` and `MobileNav.tsx` confirmed deleted
- Note: `src/pages/` and `src/shell/styles/` still contain dead Caldera CSS files (not imported, no impact on shell or landing)

## Issues

None. The topic drill-down flow is preserved. Workspace files are untouched. No new dependencies added. No new CSS classes invented — all styling uses existing `mp-*` classes.
