# Masonry-yard

**The construction materials.**

This folder contains reusable implementation assets. It holds the pieces used to build applications — not the paint, but the materials.

---

## Contents

```
Masonry-yard/
├── reui/             Local snapshot — owned by this repository
└── reui-upstream/    Upstream reference — for maintenance only
```

---

## REUI (Local Snapshot)

The `reui/` folder is a local copy of the REUI component library. Version 2.1.0.

This snapshot is owned by this repository. It is not a live dependency. It exists to provide a stable reference for development. All implementation work references this local copy.

Changes happen only when intentionally updated.

### What it contains

- UI components
- Layout primitives
- Hooks and utilities
- Configuration files
- Registry definitions

---

## REUI Upstream

The `reui-upstream/` folder records the upstream REUI project. It exists for maintenance purposes only.

### What it records

- Upstream repository URL
- Version number
- Update procedure
- Synchronisation notes

### Rules

- Applications must never depend on this folder.
- Maintain it only when updating from upstream.
- Use it as a reference, not a dependency.

---

## Using These Assets

When building a workspace:

1. Reference `reui/` for component patterns and architecture.
2. Adapt components to match the selected Design document.
3. Never import directly from `reui-upstream/`.
4. Each workspace owns its own visual decisions — colours, spacing, typography, animations.
