
- The PRD is a product-level document about BGD UI as a platform.
- `workspace-spec/` contains implementation details for individual workspaces — which are independent products living inside BGD UI.
- The PRD should not dictate where workspace documentation lives. Each workspace owns its own structure.

The correct fix is to remove `workspace-spec/` from the PRD entirely, not just rename it.

---

What Needs to Change

PRD Section 13.3 (File Organization)

Current: Lists `docs/Architecture/` as part of the project structure.

Problem: This implies the PRD controls workspace documentation location. It does not. Workspaces are independent.

Fix: Remove the `Architecture/` or `workspace-spec/` entry from the PRD file organization. Keep only platform-level directories:

```
docs/
├── PRD.md
├── Glossary.md
├── ADR/
├── Designs/
├── Masonry-yard/
└── AGENTS.md
```

Workspace documentation lives in the workspace, not in the platform PRD.

PRD Section 7 (External References)

Current: References `docs/Architecture/Invoice/overview.md` and related documents.

Fix: Remove these. The PRD should not reference workspace-specific specification documents. If a workspace needs to be mentioned (e.g., PRAV as an example), reference it by name only, not by file path.

PRD Section 9.3 (Workspace Isolation)

Current: Mentions `docs/Designs/` for workspace design references.

Fix: This is fine. `docs/Designs/` is a platform-level directory (paint references). Keep it.

ADR-001

Current: References `docs/Architecture/Invoice/architecture.md`.

Fix: Remove the specific file reference. ADR-001 is about workspace isolation as a principle, not about where invoice docs live.

---

Revised Prompts

---

Prompt 1: Correct the PRD

Task: Remove workspace-specific documentation paths from `bgd-ui-prd/PRD.md`.

Before You Start

Read and follow `docs/AGENTS.md`.

Follow ADS-STE100 Simplified Technical English.

Changes Required

1. Section 13.3 (File Organization): Remove any entry for `docs/Architecture/` or workspace-specific directories. The file organization should show only platform-level directories: `PRD.md`, `Glossary.md`, `ADR/`, `Designs/`, `Masonry-yard/`, `AGENTS.md`. Workspaces are not listed here.

2. Section 7 (External References): Remove all references to `docs/Architecture/Invoice/` or any workspace-specific specification documents. If PRAV or Sackville must be mentioned as examples, name them without file paths.

3. Search the entire PRD: Remove any remaining references to `docs/Architecture/`, `docs/workspace-spec/`, or workspace-specific file paths. The PRD describes the platform, not individual workspaces.

4. Section 9.3 (Workspace Isolation): Verify this section references `docs/Designs/` only for paint references. Remove any workspace-spec paths.

5. Section 26 (Changelog): Add an entry documenting this cleanup.

Constraints

- Do not remove references to `docs/Designs/` — this is a platform directory.
- Do not remove references to `docs/Masonry-yard/` — this is a platform directory.
- Do not remove references to `docs/ADR/` — this is a platform directory.
- Do not modify any product requirements, decisions, or constraints.
- Do not add new sections.

Deliverable

Updated `bgd-ui-prd/PRD.md` with all workspace-specific file paths removed.

---

Prompt 2: Update AGENTS.md

Task: Update `docs/AGENTS.md` to reflect the `docs/workspace-spec/` directory and clarify its relationship to the platform.

Before You Start

Read the current `docs/AGENTS.md` completely.

Follow ADS-STE100 Simplified Technical English.

Changes Required

1. Search for `docs/Architecture/`: Replace all occurrences with `docs/workspace-spec/`.

2. Repository structure section: If `AGENTS.md` describes the repository layout, ensure it correctly shows:
   - Platform directories: `docs/PRD.md`, `docs/Glossary.md`, `docs/ADR/`, `docs/Designs/`, `docs/Masonry-yard/`, `docs/AGENTS.md`
   - Workspace directories: `docs/workspace-spec/` contains workspace-specific product documentation. This is not system architecture.

3. AI instructions: If `AGENTS.md` instructs agents to read workspace specs before implementing, clarify that workspace specs are inputs to workspace implementation only, not to platform shell design.

4. Clarify scope: Add or update text stating:
   - `docs/workspace-spec/` contains workspace-specific product specifications (fields, behaviors, calculations).
   - It does not contain system architecture.
   - Platform architecture decisions are recorded in `docs/ADR/`.

5. Changelog: Add an entry documenting this structural and semantic clarification.

Constraints

- Do not change any AI implementation rules beyond clarifying directory purpose.
- Do not modify the PRD in this task.

Deliverable

Updated `docs/AGENTS.md` with correct directory references and clear scope definitions.

---

