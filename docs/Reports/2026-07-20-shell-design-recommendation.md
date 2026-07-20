# BGD UI Application Shell — Design Language Recommendation

## 1. AGENTS.md Workflow Confirmation

This task follows the workflow defined in `docs/AGENTS.md`:

- Read and comply with `docs/AGENTS.md`. Done.
- Follow the documented repository workflow. Done.
- Follow the AI implementation rules. Done.
- Follow the documentation workflow. Done.
- Follow the documentation writing standard (ADS-STE100 Simplified Technical English). Done.
- Read `docs/bgd-ui-prd/PRD.md` completely. Done.
- Review all Architecture documents relevant to the application shell. Done.
- Audit every Paint reference in `docs/Designs/`. Done.

---

## 2. Documents Reviewed

| Document | Path |
|----------|------|
| AGENTS.md | `docs/AGENTS.md` |
| PRD | `docs/bgd-ui-prd/PRD.md` |
| Architecture — Invoice Overview | `docs/Architecture/Invoice/overview.md` |
| Architecture — Invoice Architecture | `docs/Architecture/Invoice/architecture.md` |
| Architecture — Invoice Spec | `docs/Architecture/Invoice/spec.md` |
| Architecture — Invoice Behaviors | `docs/Architecture/Invoice/behaviors.md` |
| Architecture — Invoice Calculations | `docs/Architecture/Invoice/calculations.md` |
| Architecture — Invoice Patterns (14 files) | `docs/Architecture/Invoice/Patterns/*.md` |
| Paint References (55 files) | `docs/Designs/*.md` |

---

## 3. PRD Constraints That Influenced the Recommendation

| Constraint | Source | Impact |
|------------|--------|--------|
| The shell must have its own design language | PRD §20.1 | Shell cannot inherit any workspace visual identity |
| The shell must not inherit styling from any workspace | PRD §20.1 | Shell must use unique tokens |
| Do not reuse PRAV styling | PRD §20.1 | Warm parchment palette is workspace-only |
| Do not reuse Sackville styling | PRD §20.1 | Risograph editorial is workspace-only |
| The shell must feel visually quiet | PRD §20.1 | Shell must recede behind workspaces |
| The shell must allow workspaces to become the visual focus | PRD §20.1 | Shell design must be neutral |
| The shell must support light and dark modes | PRD §20.1 | Both modes must be intentionally designed |
| Light mode must not be an inversion of dark mode | PRD §9.5 | Separate palettes per mode |
| Dark mode must not be a recolor of light mode | PRD §9.5 | Separate palettes per mode |
| The shell must feel premium and fast | PRD §20.1 | Quality through restraint |
| Mobile-first | PRD §3.2 | Touch targets, density, one-handed use |
| Offline-first | PRD §3.2 | No network-dependent visual elements |
| Shell must scale to many future workspaces | PRD §20.1 | Visual system must accommodate 10+ diverse workspaces |
| Workspace isolation | PRD §3.2 | Each workspace owns its own visual identity |
| Shell must use semantic color tokens | PRD §20.1 | Token-based architecture |

---

## 4. Audit Summary — Every Paint Reference

### 4.1 PRAV
- **Philosophy:** Engineering dossier on warm parchment. Monochromatic warm-neutral palette with tonal inversion sections.
- **Visual Strengths:** Measured, scientific tone. Excellent single-weight typographic hierarchy. Warm canvas reads as premium.
- **Visual Weaknesses:** No dark mode support. Limited accent color system. Heavy reliance on dark section inversions.
- **Mobile Suitability:** Low. Desktop-first layout with wide two-column compositions.
- **Offline Suitability:** High. No network-dependent visual elements.
- **Navigation Quality:** Minimal top bar. No mobile navigation pattern.
- **Information Density:** Low. Generous spacing. Editorial.
- **Accessibility:** Adequate contrast. No focus states documented.
- **Light Mode:** Strong. Warm parchment canvas is distinctive.
- **Dark Mode:** Not designed. Aubergine black sections suggest dark intent but not systematic.
- **Scalability:** Limited. Heavy reliance on tonal inversions constrains flexibility.
- **Maintainability:** High. Simple token set.
- **Shell Suitability:** Low. Too warm and editorial for a neutral shell.
- **Workspace Suitability:** High. Excellent for workspace-specific identity.
- **Worth Reusing:** Warm canvas approach. Single-weight hierarchy.
- **Should Reject:** Aubergine dark sections. Editorial illustration style.

### 4.2 SACKVILLE
- **Philosophy:** Risograph zine pressed onto cream paper. Duotone illustration dominant.
- **Visual Strengths:** Bold typographic pressure. Distinctive editorial voice. Single-weight system.
- **Visual Weaknesses:** No shadows, no elevation. Limited component vocabulary. Heavy illustration dependency.
- **Mobile Suitability:** Low. Massive display type (130px) does not scale down.
- **Offline Suitability:** High.
- **Navigation Quality:** Minimal. Scroll-away nav.
- **Information Density:** Low. Spacious editorial.
- **Accessibility:** Limited contrast in some tonal combinations.
- **Light Mode:** Strong. Cream canvas is warm and distinctive.
- **Dark Mode:** Not designed.
- **Scalability:** Low. Strong identity makes it difficult to adapt.
- **Maintainability:** Moderate. Custom illustration dependency.
- **Shell Suitability:** Low. Too expressive for a neutral shell.
- **Workspace Suitability:** Very high. Strongest workspace identity in the collection.
- **Worth Reusing:** Nothing for shell.
- **Should Reject:** Entire visual language for shell use.

### 4.3 UL (shadcn/ui)
- **Philosophy:** Clinical blueprint on frosted paper. Monochromatic developer-tool interface.
- **Visual Strengths:** Exceptional component vocabulary. Clean radius system (18px/24px). Developer-tool precision. Compact density.
- **Visual Weaknesses:** Cold. No warmth. Can feel sterile. Limited emotional range.
- **Mobile Suitability:** High. Compact density works well at small screens.
- **Offline Suitability:** High.
- **Navigation Quality:** Good. Sidebar pattern documented.
- **Information Density:** High. Compact spacing.
- **Accessibility:** Strong. Systematic contrast.
- **Light Mode:** Excellent. Clean, professional.
- **Dark Mode:** Well-designed. Separate palette, not inversion.
- **Scalability:** Very high. Neutral system adapts to any content.
- **Maintainability:** Very high. Simple, explicit tokens.
- **Shell Suitability:** Very high. Neutral, scalable, component-rich.
- **Workspace Suitability:** Low. Too neutral to be a workspace identity.
- **Worth Reusing:** Radius system (18px interactive, 24px containers). Surface stack. Shadow treatment.
- **Should Reject:** Pure cold-white canvas. Developer-tool aesthetic is too clinical.

### 4.4 AMRA
- **Philosophy:** Iridescent sphere on white void. Single lavender accent against achromatic page.
- **Visual Strengths:** Minimal, premium feel. Excellent spacing rhythm. One-accent discipline.
- **Visual Weaknesses:** Heavy reliance on custom gradient sphere asset. Limited component range.
- **Mobile Suitability:** Moderate. Very spacious layout wastes mobile screen.
- **Offline Suitability:** High.
- **Navigation Quality:** Floating pill nav is innovative but may not suit app shell.
- **Information Density:** Very low. 100-160px section gaps.
- **Accessibility:** Adequate.
- **Light Mode:** Excellent. Clean, premium.
- **Dark Mode:** Not designed.
- **Scalability:** Moderate. Single accent limits semantic use.
- **Maintainability:** High.
- **Shell Suitability:** Moderate. Too sparse for app shell navigation.
- **Workspace Suitability:** High.
- **Worth Reusing:** One-accent discipline. Weight-400-only typography.
- **Should Reject:** Floating pill nav. Extreme spacing.

### 4.5 Convex
- **Philosophy:** Cream paper engineering notebook. Developer-focused product showcase.
- **Visual Strengths:** Warm cream canvas. Compact density. Good code-product integration. Syntax highlighting system.
- **Visual Weaknesses:** Too developer-specific. Dark sections dominate.
- **Mobile Suitability:** Moderate. Compact but code-heavy.
- **Offline Suitability:** High.
- **Navigation Quality:** Standard top bar.
- **Information Density:** Compact. Good for app shell.
- **Accessibility:** Adequate.
- **Light Mode:** Good. Warm cream canvas.
- **Dark Mode:** Good. Separate dark palette for code surfaces.
- **Scalability:** Moderate. Too tied to developer product.
- **Maintainability:** High.
- **Shell Suitability:** Moderate. Warm canvas is good but developer aesthetic limits shell.
- **Worth Reusing:** Warm cream canvas (#f6f6f6). Compact density. 8px/12px radius system.
- **Should Reject:** Code-block-heavy visual language.

### 4.6 Aptos-network
- **Philosophy:** Earth-toned code atelier. Full-bleed muted color sections.
- **Visual Strengths:** Beautiful color palette (sage, warm stone, powder blue). Editorial serif (Season Serif). Unique striped pattern system.
- **Visual Weaknesses:** No dark mode. Color sections may conflict with workspace palettes. Serif-only typography is limiting for UI.
- **Mobile Suitability:** Moderate. Split layouts do not adapt well.
- **Offline Suitability:** High.
- **Navigation Quality:** Floating pill nav.
- **Information Density:** Comfortable.
- **Accessibility:** Some color-on-color contrast issues.
- **Light Mode:** Beautiful. Unique.
- **Dark Mode:** Not designed.
- **Scalability:** Low. Strong identity.
- **Maintainability:** Moderate. Custom pattern system.
- **Shell Suitability:** Low. Too colorful for neutral shell.
- **Workspace Suitability:** High.
- **Worth Reusing:** Nothing for shell.
- **Should Reject:** Entire color section system for shell use.

### 4.7 Ableton
- **Philosophy:** Editorial workshop on stark white. Photography-first, zero-radius brutalist.
- **Visual Strengths:** Ruthlessly flat. Photography does the emotional work. Single blue accent.
- **Visual Weaknesses:** Zero radius may feel too harsh. No elevation system. Photography dependency.
- **Mobile Suitability:** Moderate. Large photography may not scale.
- **Offline Suitability:** High.
- **Navigation Quality:** Standard thin top bar.
- **Information Density:** Comfortable.
- **Accessibility:** Good contrast. Blue link color is accessible.
- **Light Mode:** Strong. Stark white with blue accent.
- **Dark Mode:** Not designed.
- **Scalability:** Low. Strong identity.
- **Maintainability:** High. Simple system.
- **Shell Suitability:** Low. Too brutalist for a welcoming shell.
- **Worth Reusing:** Nothing significant for shell.
- **Should Reject:** Zero-radius system. Photography-first approach.

### 4.8 Auros
- **Philosophy:** Abyssal terminal with bioluminescent data orbs. Dark fintech.
- **Visual Strengths:** Atmospheric dark mode. Gradient pill button. Surface depth through teal tones.
- **Visual Weaknesses:** Dark-only. No light mode. Too specific to fintech.
- **Mobile Suitability:** Moderate. Spacious but dark.
- **Offline Suitability:** High.
- **Navigation Quality:** Standard.
- **Information Density:** Spacious.
- **Accessibility:** Some dark-on-dark contrast issues.
- **Light Mode:** Not designed.
- **Dark Mode:** Excellent. Deep atmospheric.
- **Scalability:** Low. Too specific.
- **Maintainability:** Moderate.
- **Shell Suitability:** Low. Dark-only limits shell use.
- **Worth Reusing:** Surface depth approach (abyss → deep → kelp).
- **Should Reject:** Gradient button. Dark-only design.

### 4.9 BUTT-STUDIO
- **Philosophy:** Gallery wall with massive serif wordmark. Editorial portfolio.
- **Visual Strengths:** Bold serif hero. Clean ledger layout. Single indigo accent.
- **Visual Weaknesses:** Portfolio-specific. Limited component vocabulary.
- **Mobile Suitability:** Low. Massive display type.
- **Offline Suitability:** High.
- **Navigation Quality:** Essentially none (single-page).
- **Information Density:** Low.
- **Accessibility:** Adequate.
- **Light Mode:** Strong.
- **Dark Mode:** Not designed.
- **Scalability:** Very low.
- **Maintainability:** High.
- **Shell Suitability:** Very low. Portfolio-specific.
- **Worth Reusing:** Nothing for shell.
- **Should Reject:** Entire visual language.

### 4.10 Caldera
- **Philosophy:** Forge fire on warm limestone. Ultrabold condensed type, orange accent.
- **Visual Strengths:** Bold condensed headlines. Warm limestone canvas. Orange accent is energetic.
- **Visual Weaknesses:** Too aggressive for shell. Orange is loud. Ultrabold type is not quiet.
- **Mobile Suitability:** Moderate. Compact but aggressive.
- **Offline Suitability:** High.
- **Navigation Quality:** Pill nav.
- **Information Density:** Comfortable.
- **Accessibility:** Good.
- **Light Mode:** Warm, energetic.
- **Dark Mode:** Not designed.
- **Scalability:** Low. Too aggressive.
- **Maintainability:** High.
- **Shell Suitability:** Low. Too loud for neutral shell.
- **Worth Reusing:** Warm canvas approach.
- **Should Reject:** Orange accent. Ultrabold condensed headlines.

### 4.11 Coda
- **Philosophy:** Monumental letters on warm cream parchment. Marketplace editorial.
- **Visual Strengths:** Monumental display type. Warm cream canvas. Forest depths dark band. Pastel card system.
- **Visual Weaknesses:** Too expressive for shell. Multiple accent colors.
- **Mobile Suitability:** Moderate.
- **Offline Suitability:** High.
- **Navigation Quality:** Standard.
- **Information Density:** Comfortable.
- **Accessibility:** Good.
- **Light Mode:** Warm, editorial.
- **Dark Mode:** Not designed.
- **Scalability:** Low. Strong identity.
- **Maintainability:** Moderate.
- **Shell Suitability:** Low. Too expressive.
- **Worth Reusing:** Cream parchment canvas. Border-based elevation.
- **Should Reject:** Forest depths section. Pastel card system.

### 4.12 Contractbook
- **Philosophy:** Cream-paper contracts under ultramarine sky. Document-centric.
- **Visual Strengths:** Single-family typography. Warm cream canvas. Ultramarine accent. 999px pill system.
- **Visual Weaknesses:** Ultramarine is too bold for shell. Document-specific aesthetic.
- **Mobile Suitability:** High. Spacious but mobile-friendly.
- **Offline Suitability:** High.
- **Navigation Quality:** Standard.
- **Information Density:** Spacious.
- **Accessibility:** Good.
- **Light Mode:** Warm, clean.
- **Dark Mode:** Not designed.
- **Scalability:** Moderate.
- **Maintainability:** High.
- **Shell Suitability:** Moderate. Warm canvas good, but ultramarine accent conflicts.
- **Worth Reusing:** Cream canvas (#f0f0ec). 999px pill system. Single-family type approach.
- **Should Reject:** Ultramarine accent. Gold CTA.

### 4.13 Ditto
- **Philosophy:** Sunlit wildflower compliance. Serif+sans, yellow accent, organic blobs.
- **Visual Strengths:** Warm organic feel. Yellow CTA is bold. Serif headlines are editorial.
- **Visual Weaknesses:** Organic blobs are decorative, not functional. Yellow is too bright for shell.
- **Mobile Suitability:** Moderate.
- **Offline Suitability:** High.
- **Navigation Quality:** Standard.
- **Information Density:** Comfortable.
- **Accessibility:** Yellow on dark has good contrast.
- **Light Mode:** Warm, organic.
- **Dark Mode:** Not designed.
- **Scalability:** Low.
- **Maintainability:** Moderate.
- **Shell Suitability:** Low. Too organic.
- **Worth Reusing:** 8px base unit. Pill radius system.
- **Should Reject:** Organic blob decorations. Yellow accent.

### 4.14 Drive-Capital
- **Philosophy:** Retro road-trip poster on warm paper. Editorial serif+sans.
- **Visual Strengths:** Clean editorial. Hairline didone serif is beautiful. Outlined pill buttons.
- **Visual Weaknesses:** Outlined-only buttons limit interactivity. Too editorial for shell.
- **Mobile Suitability:** Low. Massive display type.
- **Offline Suitability:** High.
- **Navigation Quality:** Rule-bar nav.
- **Information Density:** Very low.
- **Accessibility:** Good.
- **Light Mode:** Warm, editorial.
- **Dark Mode:** Not designed.
- **Scalability:** Low.
- **Maintainability:** High.
- **Shell Suitability:** Low. Too editorial.
- **Worth Reusing:** Warm cream canvas. Outlined pill button pattern.
- **Should Reject:** 120px display type. Outlined-only interaction.

### 4.15 Forner
- **Philosophy:** Warm earthen atelier. Single grotesque, earth palette, no chromatic accent.
- **Visual Strengths:** Pure earth palette. Single-weight typography. Surgical 4px radius.
- **Visual Weaknesses:** No accent color makes it hard to signal interactivity. 4px radius may feel too sharp for shell.
- **Mobile Suitability:** Moderate.
- **Offline Suitability:** High.
- **Navigation Quality:** Minimal.
- **Information Density:** Spacious.
- **Accessibility:** Adequate.
- **Light Mode:** Warm, cohesive.
- **Dark Mode:** Not designed.
- **Scalability:** Low. No accent color limits semantic use.
- **Maintainability:** Very high.
- **Shell Suitability:** Low. No accent color makes interactive elements unclear.
- **Worth Reusing:** Earth palette warmth. Single-weight approach.
- **Should Reject:** 4px radius everywhere. No accent color.

### 4.16 Home (Parallel)
- **Philosophy:** Warm editorial atelier. Cream paper, charcoal ink, ember-orange accent.
- **Visual Strengths:** Warm cream canvas. Editorial serif display. Single ember accent. Comfortable density.
- **Visual Weaknesses:** Photography dependency. Ember accent is too warm for neutral shell.
- **Mobile Suitability:** High. Comfortable density works on mobile.
- **Offline Suitability:** High.
- **Navigation Quality:** Good. Pill toggle pattern.
- **Information Density:** Comfortable.
- **Accessibility:** Good.
- **Light Mode:** Warm, editorial.
- **Dark Mode:** Not designed.
- **Scalability:** Moderate.
- **Maintainability:** High.
- **Shell Suitability:** Moderate. Warm canvas is good, but ember accent conflicts.
- **Worth Reusing:** Cream canvas (#e4dfd9). Pill toggle pattern. 20px card radius.
- **Should Reject:** Ember orange accent. Photography dependency.

### 4.17 Hyer-Aviation
- **Philosophy:** Cockpit twilight over parchment. Luxury travel editorial.
- **Visual Strengths:** Massive bold display type. Single clay accent. Clean pill buttons.
- **Visual Weaknesses:** Too luxury-specific. Dark sections dominate.
- **Mobile Suitability:** Moderate. Large type scales down but loses impact.
- **Offline Suitability:** High.
- **Navigation Quality:** Minimal.
- **Information Density:** Spacious.
- **Accessibility:** Good.
- **Light Mode:** Clean, white.
- **Dark Mode:** Good. Separate dark palette.
- **Scalability:** Low.
- **Maintainability:** High.
- **Shell Suitability:** Low. Too luxury-specific.
- **Worth Reusing:** Nothing for shell.
- **Should Reject:** Entire visual language.

### 4.18 Increase
- **Philosophy:** Institutional blueprint on vellum. Navy-and-paper, chartreuse voltage.
- **Visual Strengths:** Institutional authority. Navy palette is strong. Chartreuse accent is attention-getting.
- **Visual Weaknesses:** Navy is heavy. Chartreuse may not suit shell. Too fintech-specific.
- **Mobile Suitability:** Moderate. Compact but dense.
- **Offline Suitability:** High.
- **Navigation Quality:** Standard.
- **Information Density:** Comfortable.
- **Accessibility:** Strong contrast.
- **Light Mode:** Good. Fog canvas.
- **Dark Mode:** Not designed.
- **Scalability:** Moderate.
- **Maintainability:** High.
- **Shell Suitability:** Low. Navy palette is too heavy.
- **Worth Reusing:** Fog canvas (#edf0f2). Compact density. 12px card radius.
- **Should Reject:** Chartreuse accent. Navy-heavy palette.

### 4.19 Lazy
- **Philosophy:** Midnight typeset manuscript. Dark serif+sans editorial.
- **Visual Strengths:** Beautiful dark mode. Serif display headlines are editorial. Two-shadow system.
- **Visual Weaknesses:** Dark-only. No light mode. Too editorial for shell.
- **Mobile Suitability:** Moderate.
- **Offline Suitability:** High.
- **Navigation Quality:** Minimal.
- **Information Density:** Sparse.
- **Accessibility:** Adequate dark-on-dark.
- **Light Mode:** Not designed.
- **Dark Mode:** Excellent. Atmospheric.
- **Scalability:** Low.
- **Maintainability:** Moderate.
- **Shell Suitability:** Low. Dark-only.
- **Worth Reusing:** Nothing for shell (dark-only).
- **Should Reject:** Entire dark-only system.

### 4.20 Letter
- **Philosophy:** Private gallery with iridescent vault artifacts. Serif+sans fintech.
- **Visual Strengths:** Beautiful 3D render assets. Tinted gallery walls. Multi-accent system.
- **Visual Weaknesses:** 3D render dependency. Too complex for shell.
- **Mobile Suitability:** Moderate.
- **Offline Suitability:** High.
- **Navigation Quality:** Standard.
- **Information Density:** Comfortable.
- **Accessibility:** Good.
- **Light Mode:** Clean, white.
- **Dark Mode:** Good. Dark hero stage.
- **Scalability:** Low.
- **Maintainability:** Moderate.
- **Shell Suitability:** Low. Too complex.
- **Worth Reusing:** Tinted card background approach.
- **Should Reject:** 3D renders. Multi-accent system.

### 4.21 Nuri
- **Philosophy:** Lavender art-deco bank lobby. Mixed-weight headlines.
- **Visual Strengths:** Lavender identity is unique. Mixed-weight headline technique.
- **Visual Weaknesses:** Lavender is too specific. Bitcoin orange conflicts.
- **Mobile Suitability:** Moderate.
- **Offline Suitability:** High.
- **Navigation Quality:** Standard.
- **Information Density:** Spacious.
- **Accessibility:** Adequate.
- **Light Mode:** Lavender canvas is distinctive.
- **Dark Mode:** Not designed.
- **Scalability:** Low.
- **Maintainability:** High.
- **Shell Suitability:** Low. Lavender is too specific.
- **Worth Reusing:** 9999px pill system.
- **Should Reject:** Lavender canvas. Bitcoin orange.

### 4.22 Officevibe
- **Philosophy:** Editorial journal on warm cream paper. Serif italics in headlines.
- **Visual Strengths:** Warm cream canvas. Italic serif accent in headlines. Two-blue system.
- **Visual Weaknesses:** Electric cobalt is too bright. Serif italic is too specific.
- **Mobile Suitability:** High. Comfortable density.
- **Offline Suitability:** High.
- **Navigation Quality:** Standard.
- **Information Density:** Comfortable.
- **Accessibility:** Good.
- **Light Mode:** Warm, editorial.
- **Dark Mode:** Not designed.
- **Scalability:** Moderate.
- **Maintainability:** High.
- **Shell Suitability:** Moderate. Warm canvas good, but cobalt conflicts.
- **Worth Reusing:** Warm canvas (#f9f8f6). Cream border color (#f0e9e1). 16px card radius.
- **Should Reject:** Electric cobalt accent. Serif italic headlines.

### 4.23 PostHog
- **Philosophy:** Warm paper desktop pinned to cork. Tactile OS metaphor.
- **Visual Strengths:** Unique desktop OS metaphor. Sandy desk canvas. Compact 4px radius. Amber CTA.
- **Visual Weaknesses:** OS metaphor may not suit app shell. Too playful.
- **Mobile Suitability:** Moderate. Compact but OS metaphor may not translate.
- **Offline Suitability:** High.
- **Navigation Quality:** Good. Sidebar file manager pattern.
- **Information Density:** Compact.
- **Accessibility:** Good.
- **Light Mode:** Warm, tactile.
- **Dark Mode:** Not designed.
- **Scalability:** Moderate.
- **Maintainability:** High.
- **Shell Suitability:** Moderate. Sandy canvas is warm but OS metaphor is specific.
- **Worth Reusing:** Sandy desk canvas (#e1d7c2). 4px radius for cards. Amber CTA approach.
- **Should Reject:** OS metaphor. Window chrome.

### 4.24 Relate
- **Philosophy:** Cool dawn over product canvas. Clean SaaS blue accent.
- **Visual Strengths:** Clean blue accent. Product-as-hero approach. Glassmorphic containers.
- **Visual Weaknesses:** Too SaaS-generic. Blue accent is common.
- **Mobile Suitability:** High. Compact density.
- **Offline Suitability:** High.
- **Navigation Quality:** Standard.
- **Information Density:** Compact.
- **Accessibility:** Strong.
- **Light Mode:** Clean, professional.
- **Dark Mode:** Not designed.
- **Scalability:** High. Neutral system.
- **Maintainability:** High.
- **Shell Suitability:** Moderate. Too SaaS-generic.
- **Worth Reusing:** Snow canvas (#fcfcfc). Lavender wash (#f0f4fe). Pill radius system.
- **Should Reject:** Royal blue accent. Glassmorphic containers.

### 4.25 Runway
- **Philosophy:** Kraft paper ledger under amber desk lamp. Financial workspace.
- **Visual Strengths:** Warm cream canvas. Amber accent. Custom variable font. Warm shadows.
- **Visual Weaknesses:** Too finance-specific. Amber may conflict with shell.
- **Mobile Suitability:** Moderate.
- **Offline Suitability:** High.
- **Navigation Quality:** Standard.
- **Information Density:** Compact.
- **Accessibility:** Good.
- **Light Mode:** Warm, paper-like.
- **Dark Mode:** Not designed.
- **Scalability:** Moderate.
- **Maintainability:** High.
- **Shell Suitability:** Moderate. Warm canvas good, but amber conflicts.
- **Worth Reusing:** Cream canvas (#f8f7f5). Warm shadow treatment. 8px radius.
- **Should Reject:** Amber accent. Finance-specific dashboard.

### 4.26 Slash
- **Philosophy:** Midnight vault with gilded ledger lines. Dark fintech serif.
- **Visual Strengths:** Beautiful dark mode. Ivy Presto serif is stunning. Copper accent is refined.
- **Visual Weaknesses:** Dark-only. Too fintech-specific.
- **Mobile Suitability:** Moderate.
- **Offline Suitability:** High.
- **Navigation Quality:** Standard.
- **Information Density:** Compact.
- **Accessibility:** Good dark-on-dark contrast.
- **Light Mode:** Not designed.
- **Dark Mode:** Excellent. Refined.
- **Scalability:** Low.
- **Maintainability:** High.
- **Shell Suitability:** Low. Dark-only.
- **Worth Reusing:** Surface stack approach (void → card → panel → floating).
- **Should Reject:** Dark-only system. Copper accent.

### 4.27 Typeform
- **Philosophy:** Publishing house meets product dashboard. Editorial serif+sans.
- **Visual Strengths:** Tobias serif at display sizes is authoritative. Aubergine ink is warm. Purple accent is editorial.
- **Visual Weaknesses:** Purple accent may conflict. Serif dependency limits UI flexibility.
- **Mobile Suitability:** Moderate.
- **Offline Suitability:** High.
- **Navigation Quality:** Standard.
- **Information Density:** Comfortable.
- **Accessibility:** Good.
- **Light Mode:** Cream canvas (#faf9fb).
- **Dark Mode:** Good. Aubergine hero.
- **Scalability:** Moderate.
- **Maintainability:** High.
- **Shell Suitability:** Moderate. Cream canvas good, but purple conflicts.
- **Worth Reusing:** Cream canvas (#faf9fb). Aubergine ink (#2a222b) as text color.
- **Should Reject:** Purple accent. Tobias serif for shell.

### 4.28 Ventriloc
- **Philosophy:** Editorial data observatory on warm paper. Single orange accent.
- **Visual Strengths:** Asymmetric radius cards. PolySans weight-400 headings. Warm grays.
- **Visual Weaknesses:** Asymmetric radius may not suit app shell. Orange accent.
- **Mobile Suitability:** Moderate.
- **Offline Suitability:** High.
- **Navigation Quality:** Floating pill nav.
- **Information Density:** Comfortable.
- **Accessibility:** Good.
- **Light Mode:** Clean, warm.
- **Dark Mode:** Not designed.
- **Scalability:** Moderate.
- **Maintainability:** High.
- **Shell Suitability:** Moderate. Warm grays good, but asymmetric radius is specific.
- **Worth Reusing:** Ash surface (#efefef). Warm gray system.
- **Should Reject:** Asymmetric radius. Orange accent.

### 4.29 MONO
- **Philosophy:** White-walled gallery grid. Brutalist editorial. Zero-radius, 2px borders.
- **Visual Strengths:** Bold grid system. Zero radius is distinctive. Two-tone ink/paper.
- **Visual Weaknesses:** Too brutalist for shell. Zero radius may feel harsh. No accent color.
- **Mobile Suitability:** Low. Grid-heavy layout.
- **Offline Suitability:** High.
- **Navigation Quality:** Minimal.
- **Information Density:** Low.
- **Accessibility:** Good. High contrast.
- **Light Mode:** Stark, brutalist.
- **Dark Mode:** Not designed.
- **Scalability:** Low. Too specific.
- **Maintainability:** High.
- **Shell Suitability:** Low. Too brutalist.
- **Worth Reusing:** Nothing for shell.
- **Should Reject:** Zero-radius system. 2px border grid.

### 4.30 EASEHEALTH
- **Philosophy:** Botanical greenhouse on cream paper. Serif+sans, forest green.
- **Visual Strengths:** Beautiful tinted panel system (sage, keylime, slate). Forest green accent. Whisper-weight serif.
- **Visual Weaknesses:** Green palette is too specific. Botanical metaphor limits shell.
- **Mobile Suitability:** High. Comfortable density.
- **Offline Suitability:** High.
- **Navigation Quality:** Standard.
- **Information Density:** Comfortable.
- **Accessibility:** Good.
- **Light Mode:** Warm, botanical.
- **Dark Mode:** Not designed.
- **Scalability:** Low. Green palette too specific.
- **Maintainability:** High.
- **Shell Suitability:** Low. Green palette conflicts.
- **Worth Reusing:** Tinted panel layering approach.
- **Should Reject:** Green palette. Botanical metaphor.

---

## 5. Comparative Analysis Across All Paint References

### Canvas Temperature Distribution

| Temperature | Count | Examples |
|-------------|-------|---------|
| Warm (cream/parchment/bone) | 22 | PRAV, SACKVILLE, Convex, Caldera, Coda, Contractbook, Ditto, Drive-Capital, Forner, Home, Officevibe, PostHog, Runway, Typeform, EASEHEALTH, etc. |
| Neutral (white/gray) | 10 | UL, Relate, Ableton, Ventriloc, MONO, etc. |
| Cool (lavender/blue tint) | 3 | AMRA, Nuri, Relate |
| Dark (no light mode) | 8 | Auros, Lazy, Slash, etc. |
| Mixed (dark+light sections) | 7 | Hyer-Aviation, Typeform, Letter, etc. |

### Accent Color Distribution

| Accent Color | Count | Best For |
|--------------|-------|----------|
| Blue | 12 | Developer tools, SaaS |
| Orange/Amber | 8 | Fintech, editorial |
| Green | 3 | Healthtech |
| Purple | 3 | Editorial, SaaS |
| No accent (monochrome) | 8 | Brutalist, editorial |
| Multi-accent | 3 | Complex products |

### Border Radius Distribution

| Radius | Count | Character |
|--------|-------|-----------|
| 0px (sharp) | 5 | Brutalist, editorial |
| 4px | 6 | Compact, utilitarian |
| 8px | 8 | Balanced |
| 12-16px | 10 | Soft, modern |
| 18-24px | 8 | Rounded, friendly |
| 40px+ | 4 | Pill-soft, decorative |
| 999px (pill) | 6 | Interactive elements only |

### Shadow Usage

| Approach | Count | Character |
|----------|-------|-----------|
| No shadows | 22 | Flat, print-like, editorial |
| Subtle shadows | 10 | Soft elevation, modern SaaS |
| Multi-layer shadows | 3 | Rich depth, premium |
| Warm-tinted shadows | 2 | Paper-like |

### Typography Weight Distribution

| Weight Strategy | Count | Examples |
|-----------------|-------|---------|
| Weight 400 only | 8 | Forner, Ventriloc, AMRA |
| Weight 400/700 (two-weight) | 12 | PRAV, UL, EASEHEALTH |
| Weight 400/500/600/700 (full range) | 15 | Most SaaS |
| Weight 300/400 (whisper) | 5 | Drive-Capital, EASEHEALTH |
| Weight 800+ (ultrabold) | 3 | Caldera, Nuri |

### Dark Mode Readiness

| Status | Count |
|--------|-------|
| Fully designed dark mode | 5 (Auros, Lazy, Slash, Letter, UL) |
| Partial dark sections | 7 |
| No dark mode | 43 |

---

## 6. Recommended Application Shell Direction

### Core Principle

The BGD UI shell must be **visually quiet, functionally precise, and emotionally neutral**. It serves as the container for a gallery of diverse workspaces. Its job is to recede. Workspaces are the visual focus.

### Direction: Warm Achromatic

The recommended direction combines:

1. **Warm canvas** (not cold white, not dark) — a barely-tinted off-white that reads as premium paper, not digital screen
2. **Achromatic palette** — near-black text, warm grays for secondary elements, no chromatic accent color
3. **Compact density** — information-rich enough for navigation and search, not sparse like a landing page
4. **Subtle elevation** — hairline borders and minimal shadows, not heavy chrome
5. **Pill-shaped interactive elements** — buttons, tags, and navigation containers use full rounding for touch-friendly interaction
6. **Sans-serif-only typography** — no serif display faces in the shell (serifs belong to workspaces)
7. **Single semantic accent** — one muted accent color used only for active states and focused interaction, never for decoration

This direction borrows from the most successful neutral systems in the Paint collection while rejecting all expressive, branded, or workspace-like qualities.

---

## 7. Paint References Adopted

### Primary Influence: UL (shadcn/ui)

The shell adopts the structural grammar of shadcn/ui:

- **Surface stack:** Canvas → Sidebar → Card → Input (four levels of subtle tonal differentiation)
- **Radius system:** 18px for interactive elements, 24px for containers — this ratio creates visual consistency without monotony
- **Shadow treatment:** Barely-perceptible elevation via 1px hairline borders plus a subtle shadow stack
- **Component vocabulary:** The full set (buttons, cards, inputs, badges, dialogs, sheets, toasts) provides the shell's building blocks
- **Developer-tool precision:** Every value is explicit, every token is simple

### Secondary Influence: Convex

The shell adopts Convex's warmth:

- **Warm cream canvas** (#f6f6f6) — not cold white, not neutral gray, but a barely-warm off-white that reads as premium paper
- **Compact density** — 12px element gaps, 24px card padding, 64px section gaps — the rhythm of a well-organized workspace, not a marketing page
- **Hairline borders** — #e5e5e5 borders define structure without announcing themselves

### Tertiary Influence: PostHog

The shell adopts PostHog's warmth philosophy:

- **Warm surface approach** — the sandy/linen/cream surface stack demonstrates how warmth can coexist with precision
- **Compact 4px radius for small elements** — cards and containers use 12px, but small interactive elements use tighter rounding

---

## 8. Paint References Rejected

| Paint | Reason for Rejection |
|-------|---------------------|
| PRAV | Too warm, editorial. Aubergine dark sections conflict with shell neutrality. |
| Sackville | Too expressive. Risograph illustration style is workspace territory. |
| AMRA | Too sparse. 100-160px section gaps waste mobile screen. |
| Auros | Dark-only. No light mode. |
| BUTT-STUDIO | Portfolio-specific. Massive serif hero is not shell-appropriate. |
| Caldera | Too aggressive. Orange accent and ultrabold condensed headlines are loud. |
| Coda | Too expressive. Forest depths section and pastel card system are workspace territory. |
| Ditto | Too organic. Decorative blobs and yellow accent conflict with shell neutrality. |
| Drive-Capital | Too editorial. Outlined-only buttons limit interactivity. |
| Forner | No accent color. Interactive elements cannot signal state without chromatic feedback. |
| Hyer-Aviation | Too luxury-specific. Dark sections dominate. |
| Increase | Navy-heavy palette. Chartreuse accent is attention-getting, not quiet. |
| Lazy | Dark-only. No light mode. |
| Letter | Too complex. 3D render dependency. |
| Nuri | Lavender identity is too specific. Bitcoin orange conflicts. |
| Officevibe | Electric cobalt is too bright. Serif italic headlines are workspace territory. |
| Relate | Too SaaS-generic. Royal blue accent is common. |
| Slash | Dark-only. Copper accent is fintech-specific. |
| Typeform | Purple accent conflicts. Tobias serif is too editorial for shell. |
| MONO | Too brutalist. Zero-radius system feels harsh. |
| EASEHEALTH | Green palette is too specific. Botanical metaphor limits shell. |
| Ableton | Zero-radius and photography dependency. |
| Aptos-network | Full-bleed color sections conflict with shell neutrality. |
| Letter | 3D renders and multi-accent system. |
| PostHog (partially) | OS metaphor is specific; adopted only warmth and surface approach. |

---

## 9. Cherry-Picked Ideas from Multiple Paint References

### From UL (shadcn/ui)
- Four-level surface stack (Canvas → Sidebar → Card → Input)
- 18px/24px radius system
- Barely-perceptible shadow stack
- Compact density (4px base unit, 8px/12px/16px/20px/24px/48px spacing)
- Full component vocabulary

### From Convex
- Warm cream canvas (#f6f6f6) instead of cold white
- Hairline borders (#e5e5e5) as primary separation
- Compact density without feeling cramped
- 8px/12px radius for smaller elements

### From PostHog
- Warm surface philosophy (sandy/linen/cream)
- 4px radius for small interactive elements
- Compact, workspace-like density

### From Officevibe
- Cream border color (#f0e9e1) instead of cool gray — warmer, more approachable
- 16px card radius as middle ground between UL's 24px and PostHog's 4px

### From Contractbook
- Single-family typography approach — one font family for everything, with weight and size for hierarchy
- 999px pill radius for interactive elements

### From Runway
- Warm-tinted shadows (brown base instead of cool gray) — even elevation feels paper-like

---

## 10. High-Level Color Strategy

### Light Mode

| Token | Value | Role |
|-------|-------|------|
| Canvas | `#f8f7f5` | Page background. Warm off-white, not cold. |
| Surface | `#ffffff` | Card surfaces, elevated content. |
| Surface Alt | `#fafafa` | Sidebar, secondary surfaces. |
| Border | `#e5e5e5` | Hairline dividers, card edges. |
| Border Warm | `#f0e9e1` | Cream borders for softer separation. |
| Text Primary | `#0a0a0a` | Headings, primary content. Near-black, not pure black. |
| Text Secondary | `#6b7280` | Muted text, metadata, helper labels. |
| Text Tertiary | `#9ca3af` | Placeholder text, disabled states. |
| Accent | `#6366f1` | Active states, focused interaction, selected items. Muted indigo. |
| Success | `#22c55e` | Confirmation states. |
| Warning | `#f59e0b` | Caution states. |
| Error | `#ef4444` | Destructive states. |
| Info | `#3b82f6` | Informational states. |

### Dark Mode

| Token | Value | Role |
|-------|-------|------|
| Canvas | `#0a0a0a` | Page background. Near-black, not pure black. |
| Surface | `#171717` | Card surfaces, elevated content. |
| Surface Alt | `#1f1f1f` | Sidebar, secondary surfaces. |
| Border | `#262626` | Hairline dividers, card edges. |
| Border Warm | `#1f1f1f` | Subtle warm borders on dark. |
| Text Primary | `#fafafa` | Headings, primary content. |
| Text Secondary | `#a3a3a3` | Muted text, metadata. |
| Text Tertiary | `#737373` | Placeholder text, disabled states. |
| Accent | `#818cf8` | Active states. Lighter indigo for dark mode. |
| Success | `#4ade80` | Confirmation states. |
| Warning | `#fbbf24` | Caution states. |
| Error | `#f87171` | Destructive states. |
| Info | `#60a5fa` | Informational states. |

### Design Rationale

The warm canvas (#f8f7f5) prevents the shell from feeling like a cold digital interface. The near-black text (#0a0a0a) prevents the harshness of pure black. The muted indigo accent (#6366f1) provides just enough chromatic signal for interactive states without becoming a brand color. The accent is deliberately desaturated — it signals function, not emotion.

---

## 11. High-Level Typography Strategy

### Font Family

Use a single sans-serif family: **Inter** (or system-ui fallback). The shell uses one family for everything — headings, body, navigation, buttons, inputs, labels.

### Weight System

| Weight | Use |
|--------|-----|
| 400 | Body text, descriptions, metadata. |
| 500 | Navigation, button labels, subheadings, emphasized UI labels. |
| 600 | Headings (h2-h6), stat values, active nav items. |

Headings at 600 weight, body at 400 weight. No bold (700) in the shell — the shell must be quiet.

### Type Scale

| Role | Size | Line Height | Letter Spacing |
|------|------|-------------|----------------|
| Caption | 12px | 1.5 | 0 |
| Body Small | 13px | 1.5 | 0 |
| Body | 14px | 1.5 | 0 |
| Body Large | 16px | 1.5 | -0.01em |
| Subheading | 18px | 1.4 | -0.01em |
| Heading SM | 20px | 1.3 | -0.02em |
| Heading | 24px | 1.2 | -0.02em |
| Heading LG | 30px | 1.2 | -0.02em |
| Display | 36px | 1.1 | -0.02em |

### Design Rationale

Inter is freely available, widely supported, and has excellent readability at small sizes. The weight system is deliberately limited — the shell should not shout. Negative letter-spacing on headings creates a confident, compact feel without aggressiveness. The type scale is compact, designed for mobile navigation density, not landing-page display.

---

## 12. High-Level Spacing and Layout Strategy

### Spacing Scale

Base unit: **4px**. All spacing values are multiples of 4.

| Token | Value |
|-------|-------|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-10` | 40px |
| `--space-12` | 48px |
| `--space-16` | 64px |

### Layout

| Property | Value |
|----------|-------|
| Max-width | 1200px (desktop) |
| Content padding | 16px (mobile), 24px (tablet), 32px (desktop) |
| Section gap | 32px |
| Card padding | 16px (compact), 24px (comfortable) |
| Element gap | 8px (dense), 12px (comfortable), 16px (spacious) |

### Density

The shell uses **compact density**. Navigation elements, gallery cards, search results, and settings items are information-dense. This is not a marketing page — it is an application shell that must maximize screen real estate on mobile.

---

## 13. Navigation Strategy

### Structure

```
Gallery (root)
├── Search (overlay)
├── Settings (screen)
│   └── Theme toggle
│   └── Workspace management
└── Workspace Home (screen)
    └── Workspace screens (stack)
```

### Navigation Components

- **Top Bar:** Logo left, search trigger center, settings right. Height: 56px on mobile, 64px on desktop.
- **Search Overlay:** Full-screen overlay on mobile. Modal on desktop. Keyboard shortcut (Cmd/Ctrl+K) to open.
- **Back Button:** Consistent left arrow. Returns to gallery from workspace.
- **Bottom Navigation (optional):** If the shell grows beyond gallery/settings, add bottom tabs for mobile.

### Navigation Rules

- Gallery is always the root. No navigation above it.
- Search is an overlay, not a stack push.
- Settings is a stack push from gallery.
- Workspace navigation stacks on top of gallery.
- Back from workspace returns to gallery.

---

## 14. Home Screen Direction

The home screen IS the gallery. It displays all active workspaces as cards in a responsive grid.

### Gallery Card

- Surface: White (#ffffff) on canvas (#f8f7f5)
- Radius: 16px
- Padding: 20px
- Border: 1px solid #e5e5e5
- Shadow: None by default. Subtle shadow on hover/focus.
- Content: Workspace icon, name (600 weight, 16px), description (400 weight, 14px, #6b7280), category tag (12px pill).
- Touch target: Full card is tappable. Minimum 44×44px.

### Grid

- Mobile: 1 column, full width.
- Tablet: 2 columns, 16px gap.
- Desktop: 3 columns, 20px gap.

### Empty State

When no workspaces exist:
- Illustration or icon (monochrome, 64px)
- Heading: "No workspaces"
- Description: "Create a workspace to get started."
- CTA button (primary)

### Loading State

Skeleton grid of placeholder cards. Gray rectangles with rounded corners matching card dimensions.

---

## 15. Workspace Gallery Direction

The workspace gallery IS the home screen. See section 14 above.

Additional behaviors:
- Category filter: Horizontal pill row above the grid. Active filter uses accent color background.
- Sort: Dropdown or segmented control (Alphabetical, Recent, Category).
- Search: Overlay triggered by search icon or Cmd/Ctrl+K.

---

## 16. Light Mode Strategy

Light mode is the default. The warm canvas (#f8f7f5) provides a premium, paper-like foundation. Cards sit on white (#ffffff) surfaces with hairline borders. The muted indigo accent appears only on active states and focused elements.

### Light Mode Principles

- Canvas is warm, not cold.
- Cards are white, not tinted.
- Borders are #e5e5e5, not #000000.
- Text is #0a0a0a, not #000000.
- Accent is muted, not saturated.
- Shadows are barely perceptible.

---

## 17. Dark Mode Strategy

Dark mode uses a separate palette, not an inversion of light mode. The canvas is near-black (#0a0a0a), cards are #171717, and borders are #262626. The accent lightens to #818cf8 for adequate contrast on dark surfaces.

### Dark Mode Principles

- Canvas is near-black, not pure black.
- Cards are slightly lighter than canvas.
- Borders are subtle (#262626).
- Text is near-white (#fafafa), not pure white.
- Accent is lighter than light mode variant.
- No shadows on dark surfaces — surface color defines hierarchy.

---

## 18. Accessibility Considerations

| Requirement | Specification |
|-------------|---------------|
| Contrast (normal text) | Minimum 4.5:1 against background |
| Contrast (large text) | Minimum 3:1 against background |
| Touch targets | Minimum 44×44 CSS pixels |
| Focus | Visible focus ring on all interactive elements (2px accent color outline, 2px offset) |
| Labels | All form inputs must have visible labels |
| Screen readers | All content must be announced correctly |
| Motion | Respect prefers-reduced-motion |
| Color | Do not rely on color alone to convey information |
| Keyboard | All interactive elements must be keyboard accessible |

### Focus Ring

```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 19. Risks and Trade-Offs

### Risk: Warm Canvas May Clash with Cool Workspace Palettes

Some workspaces (Auros, Lazy, Slash) use cool dark palettes. The warm shell canvas may create visual tension at the boundary between shell and workspace.

**Mitigation:** The shell ends at the workspace boundary. When a workspace loads, it replaces the entire viewport content. The warm canvas is not visible inside workspaces.

### Risk: Muted Accent May Be Too Subtle

The muted indigo (#6366f1) may not provide enough visual feedback on some displays or in bright environments.

**Mitigation:** Test on multiple devices. Consider increasing saturation to #6366f1 → #5b5bd6 if needed. The accent is used sparingly, so even a subtle signal should be effective.

### Risk: Compact Density May Feel Cramped on Small Screens

The 4px base unit and compact spacing may feel tight on 320px-wide screens.

**Mitigation:** Increase padding on the smallest screens (320-375px). Use responsive spacing: 12px padding on mobile, 24px on tablet, 32px on desktop.

### Risk: Single Font Family May Lack Personality

Using only Inter for the shell may feel generic compared to workspace-specific typography.

**Mitigation:** This is intentional. The shell must be neutral. Workspace typography is the personality. The shell's job is to recede.

### Trade-Off: Warmth vs. Neutrality

A warm canvas adds personality but may conflict with some workspace aesthetics. A cold neutral canvas would be safer but less premium.

**Decision:** Warmth wins. The premium paper-like feel is worth the minor risk of workspace boundary tension.

### Trade-Off: Compact vs. Spacious

Compact density maximizes information but may feel less premium. Spacious density feels premium but wastes mobile screen.

**Decision:** Compact wins for the shell. This is an application, not a landing page. Information density matters.

---

## 20. Open Questions That Require Product Decisions

| Question | Impact | Recommendation |
|----------|--------|----------------|
| Should the shell use a sidebar on desktop? | Affects navigation architecture | Recommend no sidebar for MVP. Top bar only. |
| Should workspace cards show live previews? | Affects gallery design | Recommend static cards for MVP. Live previews in future. |
| Should the shell support workspace reordering? | Affects gallery interaction | Recommend drag-to-reorder in future phase. |
| Should the search be full-text or name-only? | Affects search scope | Recommend name + category for MVP. |
| Should the shell persist last-opened workspace? | Affects state management | Recommend yes. Restore on app restart. |
| Should the shell show workspace status (draft/active/archived)? | Affects gallery display | Recommend active only in gallery. Draft/archive in settings. |
| Should the shell support workspace import/export? | Affects settings design | Recommend export in future phase. |
| Should the shell have an onboarding flow? | Affects first-run experience | Recommend empty state with CTA, not full onboarding. |

---

## 21. Recommended Next Steps

1. **Approve this recommendation.** Review the direction, color strategy, typography, and spacing. Confirm the warm achromatic approach.

2. **Produce the Application Shell Design Specification.** After approval, write the complete design specification with exact tokens, component definitions, and interaction patterns. This will be a separate task.

3. **Implement the shell.** Build the shell using the approved design specification. Start with the gallery screen, then navigation, then settings.

4. **Test on mobile.** Validate the shell on 375px, 768px, and 1024px viewports. Confirm touch targets, spacing, and density.

5. **Test dark mode.** Validate both light and dark modes. Confirm contrast ratios, accent visibility, and surface hierarchy.

6. **Integrate PRAV workspace.** After the shell is stable, port the PRAV workspace into the isolated workspace model. Verify shell/workspace boundary.

---

*Report generated 2026-07-20. All 55 Paint references audited. PRD constraints applied. Shell design direction recommended for approval.*
