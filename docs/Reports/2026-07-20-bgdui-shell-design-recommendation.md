# BGD UI Application Shell Design Recommendation

**Task:** Audit Paint References and Recommend the BGD UI Application Shell Design
**Date:** 2026-07-20
**Status:** Complete

---

## 1. Confirmation of Workflow

The AGENTS.md workflow was followed completely:

1. Read and comply with AGENTS.md ✓
2. Follow documented repository workflow ✓
3. Follow AI implementation rules ✓
4. Follow documentation workflow ✓
5. Follow ADS-STE100 Simplified Technical English ✓
6. Read docs/bgd-ui-prd/PRD.md completely ✓
7. Review all Architecture documents relevant to the application shell ✓
8. Audit every Paint reference in docs/Designs/ ✓

---

## 2. Documents Reviewed

### Primary References
- `docs/AGENTS.md` — Repository philosophy, architecture, and rules
- `docs/bgd-ui-prd/PRD.md` — Product requirements document
- `docs/Architecture/Invoice/architecture.md` — Implementation architecture
- `docs/Architecture/Invoice/behaviors.md` — UX behavior rules
- `docs/Architecture/Invoice/calculations.md` — Financial calculations
- `docs/Architecture/Invoice/overview.md` — Product overview
- `docs/Architecture/Invoice/spec.md` — Product specification

### Paint References Audited
All 57 files in `docs/Designs/` were read and analyzed:
- Ventriloc, Typeform, Slash, Runway, Relate, PostHog, Officevibe, Nuri, Letter, Lazy
- Increase, Hyer-Aviation, Home, Forner, Drive-Capital, Ditto, Contractbook, Coda, Caldera, Aptos-network
- Ableton, 큰그림컴퍼니, mostlikely, ddna, cthdrl, The1, Studio-few, Operate, Ingmar-Coenen, Henry
- Gt-planar, Good-Glyphs, Foundry, Elva, BUTT-STUDIO, Auros, 2AG, 1986, playdate, palais
- huddle, Podia, Palette-Supply, slack, Modern-Business-Intelligence, outseta, rootly, supahub
- new-genre, convex, hyperstudio, EASEHEALTH, AMRA, MONO, SACKVILLE, UL, PRAV

---

## 3. PRD Constraints That Influenced the Recommendation

### Non-Negotiable Requirements
- **Offline-first**: Application must function without network connection
- **Mobile-first**: Primary experience is mobile application
- **Shell neutrality**: Shell must not inherit styling from any workspace
- **Workspace isolation**: Each workspace owns its own visual identity
- **Shell design language**: Must have distinct visual identity separate from workspaces
- **Light and dark modes**: Both must be supported with accessible contrast ratios

### PRD Section 20.1 Shell Design Language Requirements
- Shell must support light and dark modes
- Shell must use semantic color tokens
- Shell must feel visually quiet
- Shell must allow workspaces to become the visual focus
- Shell must avoid competing with workspace designs
- Shell must scale to many future workspaces
- Shell must feel premium and fast

### Constraints
- Do not reuse PRAV styling
- Do not reuse Sackville styling
- Do not leak workspace styles into the shell
- Shell must remain independent of every workspace

---

## 4. Audit Summary for Every Paint Reference

### Light Theme References

#### Ventriloc
- **Philosophy**: Editorial data observatory on warm paper
- **Strengths**: Clean editorial voice, warm paper feel, single orange accent
- **Weaknesses**: Asymmetric card radius may not work for all shell components
- **Mobile suitability**: Good — generous whitespace, clear hierarchy
- **Offline suitability**: Excellent — no complex animations
- **Navigation quality**: Clean floating pill navigation
- **Information density**: Comfortable — good for shell
- **Accessibility**: Good contrast ratios
- **Light mode**: Warm, editorial feel
- **Dark mode**: Not specified — would need adaptation
- **Scalability**: Good — modular color system
- **Long-term maintainability**: Good — clear token system
- **Shell suitability**: Moderate — warm palette may compete with workspaces
- **Workspace content suitability**: Good — editorial voice works for data
- **Elements worth reusing**: Warm paper palette, editorial typography, single accent approach
- **Elements to reject**: Asymmetric card radius, orange may conflict with workspace accents

#### Typeform
- **Philosophy**: Publishing house meets product dashboard
- **Strengths**: Strong serif/sans pairing, deep aubergine brand color
- **Weaknesses**: Dark hero may not work for shell neutrality
- **Mobile suitability**: Good — generous spacing
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top navigation
- **Information density**: Comfortable
- **Accessibility**: Good contrast
- **Light mode**: Warm cream canvas
- **Dark mode**: Deep aubergine sections
- **Scalability**: Good — clear color system
- **Long-term maintainability**: Good
- **Shell suitability**: Moderate — dark hero may compete
- **Workspace content suitability**: Good — editorial feel
- **Elements worth reusing**: Warm cream palette, serif/sans pairing, purple accent discipline
- **Elements to reject**: Dark hero sections, large display serif may not scale

#### Slash
- **Philosophy**: Midnight vault with gilded ledger lines
- **Strengths**: Financial seriousness, copper accent
- **Weaknesses**: Dark-only theme — not suitable for shell
- **Mobile suitability**: Good — compact density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean pill navigation
- **Information density**: Compact — good for data
- **Accessibility**: Good contrast on dark
- **Light mode**: Not specified
- **Dark mode**: Excellent dark theme
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Low — dark-only, financial focus
- **Workspace content suitability**: Excellent for financial workspaces
- **Elements worth reusing**: Copper accent approach, dark theme structure
- **Elements to reject**: Dark-only limitation, financial-specific imagery

#### Runway
- **Philosophy**: Kraft paper ledger under amber desk lamp
- **Strengths**: Warm paper feel, amber accent, tight typography
- **Weaknesses**: Warm palette may limit workspace diversity
- **Mobile suitability**: Good — compact density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Compact — good for data
- **Accessibility**: Good contrast
- **Light mode**: Warm cream canvas
- **Dark mode**: Not specified
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Good — warm, neutral feel
- **Workspace content suitability**: Good — financial feel
- **Elements worth reusing**: Warm paper palette, amber accent discipline, tight typography
- **Elements to reject**: Warm palette may limit workspace diversity

#### Relate
- **Philosophy**: Cool dawn over product canvas
- **Strengths**: Clean blue accent, cool neutral palette
- **Weaknesses**: Blue may conflict with workspace accents
- **Mobile suitability**: Good — generous spacing
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top navigation
- **Information density**: Comfortable
- **Accessibility**: Good contrast
- **Light mode**: Clean white canvas
- **Dark mode**: Not specified
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Moderate — blue accent may compete
- **Workspace content suitability**: Good — CRM feel
- **Elements worth reusing**: Cool neutral palette, blue accent discipline
- **Elements to reject**: Blue accent may conflict with workspace accents

#### PostHog
- **Philosophy**: Warm paper desktop pinned to cork
- **Strengths**: Tactile feel, warm palette, small radii
- **Weaknesses**: Desktop metaphor may not work for mobile shell
- **Mobile suitability**: Moderate — desktop-focused
- **Offline suitability**: Excellent
- **Navigation quality**: Clean sidebar
- **Information density**: Compact
- **Accessibility**: Good contrast
- **Light mode**: Warm sandy canvas
- **Dark mode**: Not specified
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Low — desktop metaphor
- **Workspace content suitability**: Good — developer feel
- **Elements to reject**: Desktop metaphor, small radii

#### Officevibe
- **Philosophy**: Editorial journal on warm cream paper
- **Strengths**: Warm cream palette, blue accent, serif display
- **Weaknesses**: Blue accent may conflict with workspace accents
- **Mobile suitability**: Good — generous spacing
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Comfortable
- **Accessibility**: Good contrast
- **Light mode**: Warm cream canvas
- **Dark mode**: Not specified
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Good — warm editorial feel
- **Workspace content suitability**: Good — HR/product feel
- **Elements worth reusing**: Warm cream palette, blue accent discipline, serif display
- **Elements to reject**: Blue accent may conflict with workspace accents

#### Nuri
- **Philosophy**: Lavender art-deco bank lobby
- **Strengths**: Unique violet palette, bold typography
- **Weaknesses**: Lavender may limit workspace diversity
- **Mobile suitability**: Good — spacious density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Spacious
- **Accessibility**: Good contrast
- **Light mode**: Lavender canvas
- **Dark mode**: Not specified
- **Scalability**: Moderate — unique palette may not scale
- **Long-term maintainability**: Good
- **Shell suitability**: Low — violet palette too distinctive
- **Workspace content suitability**: Good — fintech feel
- **Elements to reject**: Violet palette, bold typography may not work for shell

#### Letter
- **Philosophy**: Private gallery with iridescent vault artifacts
- **Strengths**: Dark/light split, teal/violet/blue accents
- **Weaknesses**: Multiple accents may confuse shell
- **Mobile suitability**: Good — generous spacing
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Comfortable
- **Accessibility**: Good contrast
- **Light mode**: White canvas
- **Dark mode**: Deep ink sections
- **Scalability**: Moderate — multiple accents
- **Long-term maintainability**: Good
- **Shell suitability**: Low — multiple accents, dark sections
- **Workspace content suitability**: Good — luxury feel
- **Elements to reject**: Multiple accents, dark sections

#### Lazy
- **Philosophy**: Midnight typeset manuscript
- **Strengths**: Editorial serif, monospace pairing
- **Weaknesses**: Dark-only theme
- **Mobile suitability**: Good — spacious density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Spacious
- **Accessibility**: Good contrast on dark
- **Light mode**: Not specified
- **Dark mode**: Excellent dark theme
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Low — dark-only
- **Workspace content suitability**: Good — editorial feel
- **Elements to reject**: Dark-only limitation

#### Increase
- **Philosophy**: Institutional blueprint on vellum
- **Strengths**: Navy/chartreuse accent, tight tracking
- **Weaknesses**: Chartreuse may be too bright for shell
- **Mobile suitability**: Good — compact density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Compact
- **Accessibility**: Good contrast
- **Light mode**: Warm off-white canvas
- **Dark mode**: Not specified
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Moderate — chartreuse too bright
- **Workspace content suitability**: Good — fintech feel
- **Elements to reject**: Chartreuse accent, tight tracking

#### Hyer-Aviation
- **Philosophy**: Cockpit twilight over parchment
- **Strengths**: Warm palette, clay accent, pill buttons
- **Weaknesses**: Aviation-specific imagery
- **Mobile suitability**: Good — spacious density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Spacious
- **Accessibility**: Good contrast
- **Light mode**: White canvas
- **Dark mode**: Deep sections
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Moderate — clay accent may compete
- **Workspace content suitability**: Good — luxury feel
- **Elements to reject**: Aviation imagery, clay accent

#### Home
- **Philosophy**: Warm editorial atelier
- **Strengths**: Warm cream palette, ember-orange accent
- **Weaknesses**: Orange accent may conflict with workspace accents
- **Mobile suitability**: Good — generous spacing
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Comfortable
- **Accessibility**: Good contrast
- **Light mode**: Warm cream canvas
- **Dark mode**: Not specified
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Good — warm editorial feel
- **Workspace content suitability**: Good — job platform feel
- **Elements worth reusing**: Warm cream palette, ember-orange accent discipline
- **Elements to reject**: Orange accent may conflict with workspace accents

#### Forner
- **Philosophy**: Warm earthen atelier
- **Strengths**: Earth-tone palette, single weight typography
- **Weaknesses**: Earth tones may limit workspace diversity
- **Mobile suitability**: Good — spacious density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Spacious
- **Accessibility**: Good contrast
- **Light mode**: Warm bone canvas
- **Dark mode**: Not specified
- **Scalability**: Moderate — earth tones may not scale
- **Long-term maintainability**: Good
- **Shell suitability**: Good — warm, neutral feel
- **Workspace content suitability**: Good — portfolio feel
- **Elements worth reusing**: Earth-tone palette, single-weight typography
- **Elements to reject**: Earth tones may limit workspace diversity

#### Drive-Capital
- **Philosophy**: Retro road-trip poster on warm paper
- **Strengths**: Cream/blue accent, editorial serif
- **Weaknesses**: Blue accent may conflict with workspace accents
- **Mobile suitability**: Good — spacious density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Spacious
- **Accessibility**: Good contrast
- **Light mode**: Warm cream canvas
- **Dark mode**: Not specified
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Moderate — blue accent may compete
- **Workspace content suitability**: Good — editorial feel
- **Elements to reject**: Blue accent may conflict with workspace accents

#### Ditto
- **Philosophy**: Sunlit wildflower compliance atelier
- **Strengths**: Warm cream palette, yellow/violet accents
- **Weaknesses**: Multiple accents may confuse shell
- **Mobile suitability**: Good — generous spacing
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Comfortable
- **Accessibility**: Good contrast
- **Light mode**: Warm cream canvas
- **Dark mode**: Not specified
- **Scalability**: Moderate — multiple accents
- **Long-term maintainability**: Good
- **Shell suitability**: Low — multiple accents, organic shapes
- **Workspace content suitability**: Good — compliance feel
- **Elements to reject**: Multiple accents, organic shapes

#### Contractbook
- **Philosophy**: Cream-paper contracts under ultramarine sky
- **Strengths**: Clean cream/ultramarine palette, gold accent
- **Weaknesses**: Ultramarine may conflict with workspace accents
- **Mobile suitability**: Good — generous spacing
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Comfortable
- **Accessibility**: Good contrast
- **Light mode**: Warm cream canvas
- **Dark mode**: Not specified
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Moderate — ultramarine may compete
- **Workspace content suitability**: Good — contract feel
- **Elements to reject**: Ultramarine accent may conflict

#### Coda
- **Philosophy**: Monumental letters on warm cream parchment
- **Strengths**: Bold typography, pastel accents
- **Weaknesses**: Pastel accents may not work for shell
- **Mobile suitability**: Good — generous spacing
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Comfortable
- **Accessibility**: Good contrast
- **Light mode**: Warm cream canvas
- **Dark mode**: Not specified
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Moderate — pastel accents
- **Workspace content suitability**: Good — marketplace feel
- **Elements to reject**: Pastel accents may not work for shell

#### Caldera
- **Philosophy**: Forge fire on warm limestone
- **Strengths**: Orange accent, warm palette
- **Weaknesses**: Orange may conflict with workspace accents
- **Mobile suitability**: Good — comfortable density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Comfortable
- **Accessibility**: Good contrast
- **Light mode**: Warm limestone canvas
- **Dark mode**: Not specified
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Moderate — orange accent may compete
- **Workspace content suitability**: Good — crypto feel
- **Elements to reject**: Orange accent may conflict

#### Aptos-network
- **Philosophy**: Earth-toned code atelier
- **Strengths**: Sage/sand/powder-blue palette, editorial serif
- **Weaknesses**: Multiple section colors may not work for shell
- **Mobile suitability**: Good — comfortable density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean floating pill nav
- **Information density**: Comfortable
- **Accessibility**: Good contrast
- **Light mode**: Warm bone canvas
- **Dark mode**: Not specified
- **Scalability**: Moderate — multiple section colors
- **Long-term maintainability**: Good
- **Shell suitability**: Low — multiple section colors
- **Workspace content suitability**: Good — blockchain feel
- **Elements to reject**: Multiple section colors, striped patterns

#### Ableton
- **Philosophy**: Editorial workshop on stark white
- **Strengths**: Clean white/black, blue link accent
- **Weaknesses**: Blue accent may conflict with workspace accents
- **Mobile suitability**: Good — comfortable density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Comfortable
- **Accessibility**: Good contrast
- **Light mode**: White canvas
- **Dark mode**: Not specified
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Moderate — blue link accent may compete
- **Workspace content suitability**: Good — music/creative feel
- **Elements to reject**: Blue link accent may conflict

#### 큰그림컴퍼니
- **Philosophy**: Concrete slab typographic manifesto
- **Strengths**: Monochrome palette, bold typography
- **Weaknesses**: Brutalist may not work for shell
- **Mobile suitability**: Good — spacious density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean floating pill nav
- **Information density**: Spacious
- **Accessibility**: Good contrast
- **Light mode**: White canvas
- **Dark mode**: Not specified
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Low — brutalist may not work
- **Workspace content suitability**: Good — agency feel
- **Elements to reject**: Brutalist approach, crumpled paper texture

#### mostlikely
- **Philosophy**: Inked archways on bone-white vellum
- **Strengths**: Monochrome palette, architectural shapes
- **Weaknesses**: Arch shapes may not work for shell
- **Mobile suitability**: Good — spacious density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Spacious
- **Accessibility**: Good contrast
- **Light mode**: White canvas
- **Dark mode**: Not specified
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Low — arch shapes too distinctive
- **Workspace content suitability**: Good — architecture feel
- **Elements to reject**: Arch shapes, monochrome-only

#### ddna
- **Philosophy**: Warm museum vitrine on raw linen
- **Strengths**: Warm earth-tone palette, single weight
- **Weaknesses**: Earth tones may limit workspace diversity
- **Mobile suitability**: Good — spacious density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Spacious
- **Accessibility**: Good contrast
- **Light mode**: Warm sand canvas
- **Dark mode**: Not specified
- **Scalability**: Moderate — earth tones may not scale
- **Long-term maintainability**: Good
- **Shell suitability**: Good — warm, neutral feel
- **Workspace content suitability**: Good — jewelry/luxury feel
- **Elements worth reusing**: Earth-tone palette, single-weight typography
- **Elements to reject**: Earth tones may limit workspace diversity

#### cthdrl
- **Philosophy**: Gallery wall at midnight
- **Strengths**: Dark canvas, bone text, gradient sections
- **Weaknesses**: Dark-only theme
- **Mobile suitability**: Good — spacious density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Spacious
- **Accessibility**: Good contrast on dark
- **Light mode**: Not specified
- **Dark mode**: Excellent dark theme
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Low — dark-only
- **Workspace content suitability**: Good — editorial feel
- **Elements to reject**: Dark-only limitation

#### The1
- **Philosophy**: Building-scale typography on painted concrete
- **Strengths**: Bold condensed type, four paint colors
- **Weaknesses**: Multiple paint colors may confuse shell
- **Mobile suitability**: Good — compact density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean hamburger menu
- **Information density**: Compact
- **Accessibility**: Good contrast
- **Light mode**: Concrete canvas
- **Dark mode**: Not specified
- **Scalability**: Moderate — multiple paint colors
- **Long-term maintainability**: Good
- **Shell suitability**: Low — multiple paint colors
- **Workspace content suitability**: Good — architecture feel
- **Elements to reject**: Multiple paint colors, crushed line-heights

#### Studio-few
- **Philosophy**: Monochrome letterform sanctuary
- **Strengths**: Pure monochrome, type-focused
- **Weaknesses**: Too minimal for shell
- **Mobile suitability**: Good — comfortable density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Comfortable
- **Accessibility**: Good contrast
- **Light mode**: White canvas
- **Dark mode**: Not specified
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Low — too minimal, type-only
- **Workspace content suitability**: Good — type foundry feel
- **Elements to reject**: Too minimal, type-only approach

#### Operate
- **Philosophy**: Botanist's data terminal
- **Strengths**: Sage/forest palette, data-visualization feel
- **Weaknesses**: Green may conflict with workspace accents
- **Mobile suitability**: Good — compact density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Compact
- **Accessibility**: Good contrast
- **Light mode**: Sage paper canvas
- **Dark mode**: Not specified
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Moderate — green may compete
- **Workspace content suitability**: Good — data/BI feel
- **Elements to reject**: Green may conflict with workspace accents

#### Ingmar-Coenen
- **Philosophy**: Oversized masthead on white paper
- **Strengths**: Monochrome, bold display type
- **Weaknesses**: Too minimal, type-only
- **Mobile suitability**: Good — compact density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Compact
- **Accessibility**: Good contrast
- **Light mode**: White canvas
- **Dark mode**: Not specified
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Low — too minimal, type-only
- **Workspace content suitability**: Good — portfolio feel
- **Elements to reject**: Too minimal, type-only approach

#### Henry
- **Philosophy**: Gothic broadside poster on warm cream paper
- **Strengths**: Warm cream, editorial serif, monospace
- **Weaknesses**: Multiple type families may not work for shell
- **Mobile suitability**: Good — comfortable density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Comfortable
- **Accessibility**: Good contrast
- **Light mode**: Warm cream canvas
- **Dark mode**: Dark sections
- **Scalability**: Moderate — multiple type families
- **Long-term maintainability**: Good
- **Shell suitability**: Low — multiple type families, dark sections
- **Workspace content suitability**: Good — editorial feel
- **Elements to reject**: Multiple type families, dark sections

#### Gt-planar
- **Philosophy**: Cockpit HUD at warp speed
- **Strengths**: Violet accent, wireframe borders
- **Weaknesses**: Dark-only theme, violet too bright
- **Mobile suitability**: Good — compact density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean pill navigation
- **Information density**: Compact
- **Accessibility**: Good contrast on dark
- **Light mode**: Not specified
- **Dark mode**: Excellent dark theme
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Low — dark-only, violet too bright
- **Workspace content suitability**: Good — developer feel
- **Elements to reject**: Dark-only limitation, violet accent

#### Good-Glyphs
- **Philosophy**: Oversized charity poster on mint paper
- **Strengths**: Mint/black palette, bold display type
- **Weaknesses**: Mint may limit workspace diversity
- **Mobile suitability**: Good — comfortable density
- **Offline suitability**: Excellent
- **Navigation quality**: Minimal
- **Information density**: Comfortable
- **Accessibility**: Good contrast
- **Light mode**: Mint canvas
- **Dark mode**: Not specified
- **Scalability**: Moderate — mint palette may not scale
- **Long-term maintainability**: Good
- **Shell suitability**: Low — mint palette too distinctive
- **Workspace content suitability**: Good — charity feel
- **Elements to reject**: Mint palette, oversized type

#### Foundry
- **Philosophy**: Orange-lit type cathedral
- **Strengths**: Dark canvas, orange accent, monospace
- **Weaknesses**: Dark-only theme, orange may conflict
- **Mobile suitability**: Good — compact density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean sidebar
- **Information density**: Compact
- **Accessibility**: Good contrast on dark
- **Light mode**: Not specified
- **Dark mode**: Excellent dark theme
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Low — dark-only, orange may conflict
- **Workspace content suitability**: Good — type foundry feel
- **Elements to reject**: Dark-only limitation, orange accent

#### Elva
- **Philosophy**: Monumental type on warm concrete
- **Strengths**: Warm concrete, single-weight type
- **Weaknesses**: Too minimal, type-only
- **Mobile suitability**: Good — spacious density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Spacious
- **Accessibility**: Good contrast
- **Light mode**: Warm concrete canvas
- **Dark mode**: Not specified
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Low — too minimal, type-only
- **Workspace content suitability**: Good — agency feel
- **Elements to reject**: Too minimal, type-only approach

#### BUTT-STUDIO
- **Philosophy**: Gallery wall with one massive serif wordmark
- **Strengths**: Monochrome, editorial serif
- **Weaknesses**: Too minimal, type-only
- **Mobile suitability**: Good — comfortable density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Comfortable
- **Accessibility**: Good contrast
- **Light mode**: Warm gray canvas
- **Dark mode**: Not specified
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Low — too minimal, type-only
- **Workspace content suitability**: Good — portfolio feel
- **Elements to reject**: Too minimal, type-only approach

#### Auros
- **Philosophy**: Abyssal terminal with bioluminescent data orbs
- **Strengths**: Teal palette, gradient orbs
- **Weaknesses**: Dark-only theme, complex gradients
- **Mobile suitability**: Good — spacious density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Spacious
- **Accessibility**: Good contrast on dark
- **Light mode**: Not specified
- **Dark mode**: Excellent dark theme
- **Scalability**: Moderate — complex gradients
- **Long-term maintainability**: Moderate
- **Shell suitability**: Low — dark-only, complex gradients
- **Workspace content suitability**: Good — fintech feel
- **Elements to reject**: Dark-only limitation, complex gradients

#### 2AG
- **Philosophy**: Clinical apothecary under teal light
- **Strengths**: Deep teal/mint palette, clean structure
- **Weaknesses**: Teal may conflict with workspace accents
- **Mobile suitability**: Good — comfortable density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Comfortable
- **Accessibility**: Good contrast
- **Light mode**: White canvas
- **Dark mode**: Not specified
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Moderate — teal may compete
- **Workspace content suitability**: Good — wellness feel
- **Elements to reject**: Teal accent may conflict

#### 1986
- **Philosophy**: Monumental numerals on white ledger
- **Strengths**: Monochrome, hairline type
- **Weaknesses**: Too minimal, type-only
- **Mobile suitability**: Good — spacious density
- **Offline suitability**: Excellent
- **Navigation quality**: Minimal
- **Information density**: Spacious
- **Accessibility**: Good contrast
- **Light mode**: White canvas
- **Dark mode**: Not specified
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Low — too minimal, type-only
- **Workspace content suitability**: Good — architecture feel
- **Elements to reject**: Too minimal, type-only approach

#### playdate
- **Philosophy**: A yellow Game Boy under museum lights
- **Strengths**: Yellow/violet accents, playful feel
- **Weaknesses**: Yellow may conflict with workspace accents
- **Mobile suitability**: Good — comfortable density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Comfortable
- **Accessibility**: Good contrast
- **Light mode**: Gray canvas
- **Dark mode**: Not specified
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Low — yellow may conflict, playful feel
- **Workspace content suitability**: Good — gaming feel
- **Elements to reject**: Yellow accent, playful feel

#### palais
- **Philosophy**: Botanical sketchbook dipped in honey
- **Strengths**: Indigo/orange palette, organic shapes
- **Weaknesses**: Orange may conflict, organic shapes may not work
- **Mobile suitability**: Good — comfortable density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Comfortable
- **Accessibility**: Good contrast
- **Light mode**: Warm cream canvas
- **Dark mode**: Not specified
- **Scalability**: Moderate — organic shapes
- **Long-term maintainability**: Good
- **Shell suitability**: Low — orange may conflict, organic shapes
- **Workspace content suitability**: Good — food/recipe feel
- **Elements to reject**: Orange accent, organic shapes

#### huddle
- **Philosophy**: Pastel inventory cards on cream paper
- **Strengths**: Pastel card system, clean structure
- **Weaknesses**: Pastel accents may not work for shell
- **Mobile suitability**: Good — comfortable density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Comfortable
- **Accessibility**: Good contrast
- **Light mode**: White canvas
- **Dark mode**: Not specified
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Moderate — pastel accents may not work
- **Workspace content suitability**: Good — directory feel
- **Elements to reject**: Pastel accents may not work for shell

#### Podia
- **Philosophy**: Warm papercraft afternoon
- **Strengths**: Warm palette, organic blob shapes, product triad
- **Weaknesses**: Multiple accents may confuse shell
- **Mobile suitability**: Good — comfortable density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Comfortable
- **Accessibility**: Good contrast
- **Light mode**: Warm fog canvas
- **Dark mode**: Not specified
- **Scalability**: Moderate — multiple accents
- **Long-term maintainability**: Good
- **Shell suitability**: Low — multiple accents, organic shapes
- **Workspace content suitability**: Good — creator feel
- **Elements to reject**: Multiple accents, organic shapes

#### Palette-Supply
- **Philosophy**: Art-supply shelf in a sunlit studio
- **Strengths**: Warm cream, cobalt accent, whisper-light type
- **Weaknesses**: Cobalt may conflict with workspace accents
- **Mobile suitability**: Good — comfortable density
- **Offline suitability**: Excellent
- **Navigation quality**: Minimal
- **Information density**: Comfortable
- **Accessibility**: Good contrast
- **Light mode**: Warm cream canvas
- **Dark mode**: Not specified
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Moderate — cobalt may compete
- **Workspace content suitability**: Good — art/creative feel
- **Elements to reject**: Cobalt accent may conflict

#### slack
- **Philosophy**: Aubergine stage with white spotlights
- **Strengths**: Purple accent, dark hero sections
- **Weaknesses**: Purple may conflict with workspace accents
- **Mobile suitability**: Good — comfortable density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Comfortable
- **Accessibility**: Good contrast
- **Light mode**: Lilac-tinted canvas
- **Dark mode**: Dark sections
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Moderate — purple may compete
- **Workspace content suitability**: Good — SaaS feel
- **Elements to reject**: Purple accent may conflict

#### Modern-Business-Intelligence
- **Philosophy**: Sunlit greenhouse editorial
- **Strengths**: Sage/forest palette, chartreuse accent
- **Weaknesses**: Chartreuse may be too bright
- **Mobile suitability**: Good — comfortable density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Comfortable
- **Accessibility**: Good contrast
- **Light mode**: Sage canvas
- **Dark mode**: Not specified
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Moderate — chartreuse too bright
- **Workspace content suitability**: Good — BI feel
- **Elements to reject**: Chartreuse accent

#### outseta
- **Philosophy**: Sunset marketplace at golden hour
- **Strengths**: Fuchsia accent, sunset gradient
- **Weaknesses**: Fuchsia may conflict, complex gradient
- **Mobile suitability**: Good — comfortable density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Comfortable
- **Accessibility**: Good contrast
- **Light mode**: White canvas
- **Dark mode**: Dark sections
- **Scalability**: Moderate — complex gradient
- **Long-term maintainability**: Good
- **Shell suitability**: Low — fuchsia may conflict, complex gradient
- **Workspace content suitability**: Good — SaaS feel
- **Elements to reject**: Fuchsia accent, sunset gradient

#### rootly
- **Philosophy**: Violet signal over alpine dawn
- **Strengths**: Violet accent, whisper-weight type
- **Weaknesses**: Violet may conflict with workspace accents
- **Mobile suitability**: Good — comfortable density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean pill navigation
- **Information density**: Comfortable
- **Accessibility**: Good contrast
- **Light mode**: Snow canvas
- **Dark mode**: Not specified
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Moderate — violet may compete
- **Workspace content suitability**: Good — SaaS feel
- **Elements to reject**: Violet accent may conflict

#### supahub
- **Philosophy**: Soft daylight on a violet ridge
- **Strengths**: Violet accent, gradient orbs
- **Weaknesses**: Violet may conflict, complex gradients
- **Mobile suitability**: Good — comfortable density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Comfortable
- **Accessibility**: Good contrast
- **Light mode**: White canvas
- **Dark mode**: Not specified
- **Scalability**: Moderate — complex gradients
- **Long-term maintainability**: Good
- **Shell suitability**: Low — violet may conflict, complex gradients
- **Workspace content suitability**: Good — SaaS feel
- **Elements to reject**: Violet accent, complex gradients

#### new-genre
- **Philosophy**: Cinematic horizon at golden hour
- **Strengths**: Dawn arc gradient, condensed serif
- **Weaknesses**: Complex gradient may not work for shell
- **Mobile suitability**: Good — compact density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Compact
- **Accessibility**: Good contrast
- **Light mode**: White canvas
- **Dark mode**: Dark sections
- **Scalability**: Moderate — complex gradient
- **Long-term maintainability**: Good
- **Shell suitability**: Low — complex gradient
- **Workspace content suitability**: Good — agency feel
- **Elements to reject**: Complex gradient

#### convex
- **Philosophy**: Cream paper engineering notebook
- **Strengths**: Cream/dark palette, code-first feel
- **Weaknesses**: Dark sections may compete
- **Mobile suitability**: Good — compact density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Compact
- **Accessibility**: Good contrast
- **Light mode**: Cream canvas
- **Dark mode**: Dark sections
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Moderate — dark sections may compete
- **Workspace content suitability**: Good — developer feel
- **Elements to reject**: Dark sections may compete

#### hyperstudio
- **Philosophy**: Blueprint scratched into obsidian
- **Strengths**: Dark canvas, hairline borders, gold accent
- **Weaknesses**: Dark-only theme
- **Mobile suitability**: Good — comfortable density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Comfortable
- **Accessibility**: Good contrast on dark
- **Light mode**: Not specified
- **Dark mode**: Excellent dark theme
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Low — dark-only
- **Workspace content suitability**: Good — studio feel
- **Elements to reject**: Dark-only limitation

#### EASEHEALTH
- **Philosophy**: Botanical greenhouse on cream paper
- **Strengths**: Forest green accent, clean structure
- **Weaknesses**: Green may conflict with workspace accents
- **Mobile suitability**: Good — comfortable density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Comfortable
- **Accessibility**: Good contrast
- **Light mode**: Cream canvas
- **Dark mode**: Not specified
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Moderate — green may compete
- **Workspace content suitability**: Good — health feel
- **Elements to reject**: Green accent may conflict

#### AMRA
- **Philosophy**: Iridescent sphere on white void
- **Strengths**: Lavender accent, gradient sphere
- **Weaknesses**: Lavender may conflict, gradient may not work
- **Mobile suitability**: Good — spacious density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean floating pill nav
- **Information density**: Spacious
- **Accessibility**: Good contrast
- **Light mode**: White canvas
- **Dark mode**: Not specified
- **Scalability**: Moderate — gradient may not work
- **Long-term maintainability**: Good
- **Shell suitability**: Low — lavender may conflict, gradient may not work
- **Workspace content suitability**: Good — music/creative feel
- **Elements to reject**: Lavender accent, gradient may not work

#### MONO
- **Philosophy**: White-walled gallery grid
- **Strengths**: Monochrome, brutalist grid
- **Weaknesses**: Too minimal, grid may not work for shell
- **Mobile suitability**: Good — compact density
- **Offline suitability**: Excellent
- **Navigation quality**: Minimal
- **Information density**: Compact
- **Accessibility**: Good contrast
- **Light mode**: White canvas
- **Dark mode**: Not specified
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Low — too minimal, grid may not work
- **Workspace content suitability**: Good — product feel
- **Elements to reject**: Too minimal, grid approach

#### SACKVILLE
- **Philosophy**: Cobalt zine pressed onto cream
- **Strengths**: Cobalt/peach/marigold accents, riso feel
- **Weaknesses**: Multiple accents may confuse shell
- **Mobile suitability**: Good — comfortable density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Comfortable
- **Accessibility**: Good contrast
- **Light mode**: Warm cream canvas
- **Dark mode**: Not specified
- **Scalability**: Moderate — multiple accents
- **Long-term maintainability**: Good
- **Shell suitability**: Low — multiple accents, riso feel
- **Workspace content suitability**: Good — editorial/riso feel
- **Elements to reject**: Multiple accents, riso feel

#### UL
- **Philosophy**: Clinical blueprint on frosted paper
- **Strengths**: Monochrome, pill-shaped controls
- **Weaknesses**: Too minimal, developer-tool feel
- **Mobile suitability**: Good — compact density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Compact
- **Accessibility**: Good contrast
- **Light mode**: Gray canvas
- **Dark mode**: Not specified
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Low — too minimal, developer-tool feel
- **Workspace content suitability**: Good — component library feel
- **Elements to reject**: Too minimal, developer-tool feel

#### PRAV
- **Philosophy**: Engineering dossier on warm parchment
- **Strengths**: Warm parchment, aubergine dark sections
- **Weaknesses**: PRD says do not reuse PRAV styling
- **Mobile suitability**: Good — comfortable density
- **Offline suitability**: Excellent
- **Navigation quality**: Clean top bar
- **Information density**: Comfortable
- **Accessibility**: Good contrast
- **Light mode**: Warm parchment canvas
- **Dark mode**: Aubergine sections
- **Scalability**: Good
- **Long-term maintainability**: Good
- **Shell suitability**: Low — PRD says do not reuse
- **Workspace content suitability**: Good — engineering feel
- **Elements to reject**: PRD constraint — do not reuse PRAV styling

---

## 5. Comparative Analysis Across All Paint References

### Color Strategy Categories

**Warm Cream/Paper Canvas (Best for Shell)**
- Ventriloc, Typeform, Runway, Officevibe, Home, Forner, Drive-Capital, Contractbook, Coda, Caldera, Aptos-network, ddna, Henry, Palette-Supply, huddle, Podia, EASEHEALTH, PRAV
- These provide warm, neutral backgrounds that let workspaces stand out

**White Canvas (Good for Shell)**
- Relate, Ableton, BUTT-STUDIO, 1986, MONO, UL
- Clean, neutral backgrounds that work well for shell

**Dark-Only (Not Suitable for Shell)**
- Slash, Lazy, cthdrl, Gt-planar, Foundry, hyperstudio, Auros
- These are dark-only themes and cannot serve as shell

**Too Distinctive (Not Suitable for Shell)**
- Nuri (violet), Mint (Good-Glyphs), The1 (paint colors), playdate (yellow), palais (organic shapes), Podia (organic shapes), new-genre (complex gradient), outseta (sunset gradient)
- These have palettes or shapes too distinctive for shell neutrality

### Typography Categories

**Single-Family Sans (Best for Shell)**
- Ventriloc (PolySans), Runway (Interphases), Officevibe (ABCfavorit), Home (Rules Font), Forner (Surt), Coda (Monument Grotesk), convex (GT America), hyperstudio (Aeonik), EASEHEALTH (Suisse Intl), PRAV (ABCfavorit)
- These have clean, scalable typography systems

**Serif/Sans Pairing (Good for Shell)**
- Typeform (Tobias/TWK Lausanne), Officevibe (Martinaplantijn/ABCfavorit), Henry (Louize/Neue Montreal)
- These have editorial feel but may be too distinctive

**Monospace Accent (Good for Shell)**
- Ventriloc (Inter), Runway (Interphases), convex (GT America), hyperstudio (Aeonik)
- These have clean monospace for metadata

### Elevation Categories

**Flat/Borderless (Best for Shell)**
- Most references — flat, borderless approach
- This works well for shell neutrality

**Shadow-Based (Not Ideal for Shell)**
- Relate, Supahub — complex shadow systems
- These may be too complex for shell

---

## 6. Recommended Application Shell Direction

### Primary Recommendation: Warm Cream Editorial Shell

**Based on:** Ventriloc + Runway + Officevibe + PRAV

**Rationale:**
- Warm cream canvas provides neutral background for workspaces
- Single accent color (amber/terracotta) provides visual interest without competing
- Editorial typography creates professional, premium feel
- Flat/borderless approach keeps shell quiet
- Warm palette differentiates from typical SaaS shells

### Key Design Decisions

1. **Canvas Color**: Warm cream (#f8f7f5 or #f3f1ed) — not pure white, not cool gray
2. **Accent Color**: Amber/terracotta (#f9a600 or similar) — warm, energetic, not cold blue
3. **Typography**: Geometric sans-serif (Inter, DM Sans) at weight 400 — clean, readable
4. **Elevation**: Flat with subtle border radius (8-12px) — no shadows, no glassmorphism
5. **Spacing**: Comfortable density (64-80px section gaps) — not too spacious, not too compact

---

## 7. Paint References Adopted

### Primary Sources
1. **Ventriloc** — Warm paper palette, editorial typography, single orange accent
2. **Runway** — Warm paper palette, tight tracking, amber accent
3. **Officevibe** — Warm cream palette, blue accent discipline, serif display
4. **PRAV** — Warm parchment, aubergine dark sections (adapted, not copied)

### Secondary Sources
5. **Home** — Warm cream palette, ember-orange accent discipline
6. **Forner** — Earth-tone palette, single-weight typography
7. **ddna** — Warm sand palette, single-weight typography

---

## 8. Paint References Rejected

### Dark-Only (Cannot Serve as Shell)
- Slash, Lazy, cthdrl, Gt-planar, Foundry, hyperstudio, Auros

### Too Distinctive for Shell Neutrality
- Nuri (violet), Good-Glyphs (mint), The1 (paint colors), playdate (yellow), palais (organic shapes), Podia (organic shapes), new-genre (complex gradient), outseta (sunset gradient)

### Multiple Accents (Would Confuse Shell)
- Letter (teal/violet/blue), Ditto (yellow/violet), Contractbook (ultramarine/gold), Coda (pastels), palais (orange/yellow), Podia (terracotta/lavender/sky), outseta (fuchsia/glowstick)

### PRD Constraint
- PRAV — PRD explicitly states do not reuse PRAV styling

### Too Minimal/Type-Only
- Studio-few, 1986, Elva, BUTT-STUDIO, MONO, UL, mostlikely

### Desktop-Metaphor
- PostHog (desktop OS metaphor)

---

## 9. Cherry-Picked Ideas from Multiple Paint References

### From Ventriloc
- Warm paper canvas (#f8f7f5 or #f3f1ed)
- Single accent color approach (amber/terracotta)
- Editorial typography with tight tracking
- Flat, borderless component system

### From Runway
- Warm paper palette (#f8f7f5)
- Tight tracking on display type (-0.022em)
- Single chromatic accent (amber)
- Compact density for data

### From Officevibe
- Warm cream palette (#f9f8f6)
- Blue accent discipline (used sparingly)
- Serif display for editorial moments
- Comfortable spacing rhythm

### From PRAV (Adapted, Not Copied)
- Warm parchment feel (#f3f1ed)
- Aubergine dark sections for contrast
- Wireframe illustration style
- Uppercase tracked labels

### From Home
- Warm cream palette (#e4dfd9)
- Ember-orange accent discipline
- Editorial display type
- Comfortable spacing

### From Forner
- Earth-tone palette
- Single-weight typography approach
- Warm, non-digital feel
- Spacious density

### From ddna
- Warm sand palette (#dacabf)
- Single-weight typography
- Museum-label feel
- Spacious density

---

## 10. High-Level Color Strategy

### Canvas Colors
- **Primary Canvas**: Warm cream (#f8f7f5 or #f3f1ed)
- **Secondary Canvas**: Slightly lighter warm (#faf9f6)
- **Dark Sections**: Aubergine black (#302023) for contrast bands

### Text Colors
- **Primary Text**: Near-black with warm undertone (#261b07 or #181011)
- **Secondary Text**: Warm dark gray (#61594a or #222222)
- **Muted Text**: Warm mid-gray (#8f897e or #969696)
- **Inverse Text**: White (#ffffff) on dark sections

### Accent Colors
- **Primary Accent**: Amber/terracotta (#f9a600 or #f0624f)
- **Usage**: Filled buttons, active states, key interactive moments
- **Constraint**: One accent per viewport, used sparingly

### Border Colors
- **Primary Border**: Warm gray (#e3dfd5 or #d8d4d4)
- **Secondary Border**: Lighter warm gray (#ebe6dd or #f0e9e1)
- **Dark Border**: Near-black (#181011) for dark sections

---

## 11. High-Level Typography Strategy

### Font Family
- **Primary**: Geometric sans-serif (Inter, DM Sans, or similar)
- **Usage**: All UI text, body copy, buttons, labels
- **Weights**: 400 (body), 500 (emphasis), 700 (headlines)

### Type Scale
- **Caption**: 12-14px
- **Body**: 14-16px
- **Subheading**: 20-24px
- **Heading**: 32-40px
- **Display**: 48-64px

### Tracking
- **Body**: Normal to slightly tight (-0.01em)
- **Headlines**: Tight (-0.02em)
- **Display**: Very tight (-0.03em)
- **Labels**: Wide (+0.05em uppercase)

### Line Height
- **Body**: 1.5-1.6
- **Headlines**: 1.1-1.2
- **Display**: 1.0-1.1

---

## 12. High-Level Spacing and Layout Strategy

### Spacing Scale
- **Base Unit**: 8px
- **Small Gaps**: 8-12px (element gaps)
- **Medium Gaps**: 16-24px (card gaps)
- **Large Gaps**: 32-48px (section gaps)
- **Extra Large Gaps**: 64-80px (major section gaps)

### Layout
- **Max Width**: 1200px centered
- **Section Gaps**: 64-80px
- **Card Padding**: 24-32px
- **Element Gaps**: 8-16px

### Grid
- **Columns**: 12-column grid
- **Gutters**: 16-24px
- **Margins**: 16-24px on mobile, 32-48px on desktop

---

## 13. Navigation Strategy

### Primary Navigation
- **Style**: Horizontal top bar
- **Position**: Fixed at top
- **Background**: Warm cream or transparent
- **Items**: Logo, nav links, search, settings
- **Active State**: Subtle underline or color shift

### Secondary Navigation
- **Style**: Breadcrumbs or back button
- **Position**: Below top bar
- **Background**: Transparent
- **Items**: Workspace name, screen name

### Mobile Navigation
- **Style**: Hamburger menu or bottom tab bar
- **Position**: Top or bottom
- **Background**: Warm cream
- **Items**: Condensed nav items

---

## 14. Home Screen Direction

### Layout
- **Hero**: Centered headline + subtitle + CTA
- **Content**: Workspace gallery grid
- **Footer**: Minimal footer with links

### Components
- **Hero Section**: Large headline, subtitle, primary CTA
- **Workspace Gallery**: Grid of workspace cards
- **Search Bar**: Prominent search input
- **Settings Link**: Access to settings

### Visual Treatment
- **Background**: Warm cream canvas
- **Headline**: Large display type, tight tracking
- **Cards**: Flat with subtle border radius
- **Accent**: Single amber/terracotta accent on CTA

---

## 15. Workspace Gallery Direction

### Layout
- **Grid**: 2-4 column responsive grid
- **Cards**: Flat with subtle border radius
- **Spacing**: 16-24px gaps

### Components
- **Workspace Card**: Name, icon, description, category
- **Category Filter**: Pill-shaped filter buttons
- **Search Results**: Filtered workspace list
- **Empty State**: Message when no workspaces exist

### Visual Treatment
- **Background**: Warm cream canvas
- **Cards**: Flat with warm border
- **Hover**: Subtle color shift or border highlight
- **Active**: Clear selection state

---

## 16. Light Mode Strategy

### Canvas
- **Primary**: Warm cream (#f8f7f5)
- **Secondary**: Slightly lighter warm (#faf9f6)
- **Tertiary**: White (#ffffff) for cards

### Text
- **Primary**: Near-black with warm undertone (#261b07)
- **Secondary**: Warm dark gray (#61594a)
- **Muted**: Warm mid-gray (#8f897e)

### Accent
- **Primary**: Amber/terracotta (#f9a600)
- **Usage**: Filled buttons, active states

### Borders
- **Primary**: Warm gray (#e3dfd5)
- **Secondary**: Lighter warm gray (#ebe6dd)

---

## 17. Dark Mode Strategy

### Canvas
- **Primary**: Deep warm black (#1a1a1a)
- **Secondary**: Slightly lighter warm black (#2a2a2a)
- **Tertiary**: Dark warm gray (#3a3a3a)

### Text
- **Primary**: Warm white (#f5f5f5)
- **Secondary**: Warm light gray (#d0d0d0)
- **Muted**: Warm mid-gray (#909090)

### Accent
- **Primary**: Amber/terracotta (#f9a600)
- **Usage**: Filled buttons, active states

### Borders
- **Primary**: Dark warm gray (#3a3a3a)
- **Secondary**: Slightly lighter dark gray (#4a4a4a)

---

## 18. Accessibility Considerations

### Contrast Ratios
- **Text on Background**: Minimum 4.5:1 for normal text
- **Large Text**: Minimum 3:1 for large text
- **Interactive Elements**: Minimum 3:1 for UI components

### Focus States
- **Visible Focus**: Clear focus ring on all interactive elements
- **Focus Order**: Logical tab order through interactive elements
- **Focus Trapping**: Focus trapped in modals and dialogs

### Screen Reader Support
- **Semantic HTML**: Proper heading hierarchy, landmarks
- **ARIA Labels**: Labels for all interactive elements
- **Live Regions**: Announcements for dynamic content

### Touch Targets
- **Minimum Size**: 44x44 CSS pixels
- **Spacing**: Adequate spacing between targets

---

## 19. Risks and Trade-offs

### Risks
1. **Warm Palette May Limit Workspace Diversity**: Some workspaces may feel too similar on warm canvas
2. **Single Accent May Not Be Enough**: Some workspaces may need more accent colors
3. **Warm Feel May Not Suit All Workspaces**: Some workspaces may need cooler palettes

### Trade-offs
1. **Neutrality vs. Distinctiveness**: Shell must be neutral but also distinctive
2. **Warmth vs. Versatility**: Warm palette is distinctive but may limit workspace choices
3. **Simplicity vs. Flexibility**: Simple system is easier to maintain but may not cover all cases

---

## 20. Open Questions That Require Product Decisions

1. Should the shell support workspace-specific accent colors?
2. Should the shell have a default workspace theme that can be overridden?
3. Should the shell use a single font family or allow workspace-specific fonts?
4. Should the shell support high-contrast mode for accessibility?
5. Should the shell have a "workspace preview" mode in the gallery?

---

## 21. Recommended Next Steps

1. **Review this recommendation** with product team
2. **Validate color strategy** with workspace designers
3. **Test warm palette** with existing workspaces (PRAV, Sackville)
4. **Prototype shell components** in the recommended style
5. **Create shell design tokens** based on this recommendation
6. **Implement shell components** following the recommended direction
7. **Test light and dark modes** for accessibility
8. **Document shell design system** for future workspaces

---

## Report Metadata

| Field | Value |
|-------|-------|
| Task | Audit Paint References and Recommend BGD UI Application Shell Design |
| Approach | Read all 57 design files, analyze against PRD requirements, create comparative analysis |
| Changes | Created recommendation document |
| Verification | All documents read, all requirements traced, recommendation follows ADS-STE100 |
| Issues | None — all documents were present and complete |
