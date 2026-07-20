# Documentation

This folder contains all product documentation.

A building needs three things: a blueprint, construction materials, and finishing. Software follows the same idea. The docs folder is organised around this principle.

---

## Folder Structure

```
docs/
├── Architecture/     Blueprint — behaviour and rules
├── Designs/          Paint — visual language and appearance
├── Masonry-yard/     Materials — reusable implementation assets
└── Patterns/         Recurring interaction structures
```

---

## Architecture

**The blueprint.**

Architecture documents define what an application must do. They describe business rules, workflows, component hierarchy, field inventory, interaction behaviour, navigation, calculations, validation, and application states.

Architecture does not define visual appearance. It remains stable even when the UI is redesigned.

Current specifications:

- **Invoice/** — Product overview, architecture, behaviours, calculations, and spec for the Invoice workspace

---

## Designs

**The paint and finishing.**

Each design document defines a complete visual language. It covers colours, typography, spacing, borders, corner radius, elevation, surfaces, component appearance, interaction language, and visual personality.

Designs are references. They are not implementation code. A single design can be applied across many applications — Invoice, CRM, Inventory, POS, HR, Procurement.

Changing a design changes appearance only. Application behaviour stays the same.

Current designs: 1986, 2AG, AMRA, Auros, BUTT-STUDIO, convex, cthdrl, ddna, EASEHEALTH, Elva, Foundry, Good-Glyphs, Gt-planar, Henry, huddle, hyperstudio, Ingmar-Coenen, Modern Business Intelligence, MONO, mostlikely, new-genre, Operate, outseta, Palette-Supply, palais, playdate, Podia, PRAV, rootly, SACKVILLE, slack, Studio-few, supahub, The1, UL

---

## Masonry-yard

**The construction materials.**

This folder contains reusable implementation assets used to build applications. It holds UI component libraries, layouts, templates, primitives, interaction patterns, hooks, utilities, and reusable code.

Design defines appearance. Masonry-yard provides the pieces to build with.

```
Masonry-yard/
├── reui/             Local snapshot — owned by this repo
└── reui-upstream/    Upstream reference — for maintenance only
```

---

## REUI

**Local component library snapshot.**

The `reui/` folder is a local snapshot of the REUI component library. It is version 2.1.0.

This copy is owned by this repository. It is not a live dependency. It exists to provide a stable reference for development. All implementation work references this local copy.

Changes happen only when intentionally updated. The local snapshot will not change on its own.

---

## REUI Upstream

**Upstream reference.**

The `reui-upstream/` folder documents the original REUI project. It records the upstream repository, version, and commit hash.

This folder exists only for maintenance. It simplifies future synchronisation with the upstream project.

Applications must never reference this folder directly. It is a reference for maintainers, not a dependency.

---

## Patterns

**Recurring interaction structures.**

The `Patterns/` folder contains documented interaction patterns used across workspaces. Each pattern defines a consistent structure for a specific UI concern.

Current patterns:

- Commercial Settings
- Confirmation Dialog
- Floating Save
- Group Container
- Header Fields
- Image Picker
- Line Item Card
- Mobile Form
- Signature Picker
- Totals Panel
- Workspace Gallery
