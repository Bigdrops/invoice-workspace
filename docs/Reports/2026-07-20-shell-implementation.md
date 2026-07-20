# Task Report: Shell Implementation

**Date:** 2026-07-20  
**Task:** Implement the BGD UI application shell based on `docs/bgd-ui-prd/bgd-shell-final-recommendation.md`  
**Status:** Complete

---

## Task

Implement the application shell for BGD UI. The shell provides the container for all workspaces, including gallery, navigation, search, settings, and theme support. Follow the architect-approved shell design recommendation as the canonical source.

## Approach

1. Read all authoritative documents: AGENTS.md, PRD.md, and bgd-shell-final-recommendation.md.
2. Created the shell as an independent module at `src/shell/`, separate from workspaces.
3. Implemented CSS Modules with scoped `--shell-*` tokens per the recommendation.
4. Built components bottom-up: tokens, reset, typography, then components, then screens.
5. Integrated the shell into `App.tsx`, replacing the previous inline-styled gallery.

## Changes

### New files created

| File | Purpose |
|------|---------|
| `src/shell/types.ts` | ShellWorkspace, ThemeMode, ShellScreen types |
| `src/shell/index.ts` | Public exports |
| `src/shell/Shell.tsx` | Root shell component with routing and theme |
| `src/shell/hooks/useTheme.ts` | Theme state with localStorage persistence and system preference |
| `src/shell/styles/tokens.css` | All `--shell-*` design tokens (light and dark) |
| `src/shell/styles/reset.css` | Shell-scoped reset (box-sizing, focus ring, reduced motion) |
| `src/shell/styles/typography.css` | Type scale utilities (Inter + IBM Plex Mono) |
| `src/shell/components/WorkspaceCard/` | Card with hairline border, icon, name, description, category chip |
| `src/shell/components/TopBar/` | Fixed 56px top bar with back button, title, action icons |
| `src/shell/components/BottomTabBar/` | Fixed 56px bottom tab bar (Home + Settings) |
| `src/shell/components/CategoryFilter/` | Horizontal-scroll chip row for category filtering |
| `src/shell/components/SearchOverlay/` | Full-screen search overlay with synchronous local search |
| `src/shell/components/EmptyState/` | Icon + message + optional action |
| `src/shell/components/LoadingState/` | Skeleton grid with shimmer animation |
| `src/shell/screens/Gallery/` | Gallery screen with grid, filter, search entry |
| `src/shell/screens/Settings/` | Settings screen with theme toggle, workspace count, app info |

### Modified files

| File | Change |
|------|--------|
| `src/App.tsx` | Replaced inline gallery with Shell component |
| `index.html` | Added Inter and IBM Plex Mono Google Fonts imports |
| `package.json` | Added `@phosphor-icons/react` dependency |
| `src/vite-env.d.ts` | Added CSS Module type declarations |

## Verification

1. `npx tsc --noEmit` — zero type errors
2. `npm run build` — production build succeeds
3. Shell JS bundle: 237KB (73KB gzipped) — under 500KB PRD limit
4. Each workspace compiles into its own isolated CSS and JS chunk
5. Shell CSS is scoped to `.bgd-shell` — no leakage to workspaces
6. All `--shell-*` tokens are centralized in `tokens.css`

## Design Decisions Applied

| Decision | Value | Source |
|----------|-------|--------|
| CSS architecture | CSS Modules, scoped to `.bgd-shell` | Recommendation §3 |
| Theme system | `data-theme="light"` / `data-theme="dark"` | Recommendation §3 |
| Token naming | `--shell-color-*`, `--shell-shadow-*`, `--shell-spacing-*` | Recommendation §3 |
| Typefaces | Inter (body), IBM Plex Mono (chips) | Recommendation §3 |
| Icons | Phosphor Icons (Regular weight) | Recommendation §7.13 |
| Navigation | Top bar (56px) + bottom tab bar (56px) | Recommendation §4 |
| Card style | 12px radius, 16px padding, 0.5px hairline border | Recommendation §4 |
| Accent colour | Teal `#0a9396` (light), `#94d2bd` (dark) | Recommendation §8 |
| Grid | 2 col mobile, 3 col tablet, 4 col desktop | PRD §10.1 |
| Search | Full-screen overlay (mobile), synchronous | Recommendation §4 |
| Loading | Skeleton grid with shimmer | Recommendation §4 |
| Empty state | Icon + text, no illustrations | Recommendation §4 |
| Motion | Functional only, ease timing, 150-250ms | Recommendation §7.14 |
| Accessibility | WCAG 2.1 AA, 44×44 touch targets, focus rings | Recommendation §3 |

## Issues

- **Accent colour verification pending:** The teal hex values (`#0a9396`, `#94d2bd`) are approximate. Formal contrast verification against final canvas values is needed before production.
- **Canvas hex values approximate:** Light mode canvas (`#f5f5f7`) and dark mode canvas (`#0e0e10`) need OLED screen verification.
- **Bottom sheet gesture:** Capacitor native gesture interaction not yet tested. Requires physical device testing.
- **Focus ring visibility:** 2px teal focus ring needs visual testing across all components at final token values.

## Future Work

- ADR-002: Shell Design Independence
- ADR-003: Offline-First Architecture
- ADR-004: Shell Navigation Pattern
- ADR-005: Icon Library Selection
- Formal WCAG contrast verification for all token combinations
- Physical device testing for canvas appearance on OLED
- Capacitor gesture testing for bottom sheet dismiss
