You are taking over an implementation that does not match the approved shell design.

Your task is not to add new features. Your task is to audit the current implementation, identify every deviation from the approved design, and correct the implementation until it matches the architect-approved specification.

Authoritative References (read in this order)

1. "docs/AGENTS.md"
2. "docs/bgd-ui-prd/PRD.md"
3. "docs/bgd-ui-prd/bgd-shell-final-recommendation.md"

Treat "bgd-shell-final-recommendation.md" as the canonical shell specification.

---

Known Problems

The current implementation has the following issues and they must be investigated first:

- The shell design does not match the approved recommendation.
- The visual design is poor and does not reflect the intended neutral design language.
- There is horizontal scrolling.
- The shell theme appears to leak into at least two workspaces.
- Shell/workspace design isolation appears to be broken.

Do not assume the implementation report is correct. Verify everything yourself.

---

Audit Requirements

Perform a complete implementation audit.

Verify:

- Shell/workspace CSS isolation.
- CSS Module usage.
- Any global CSS imports.
- Any selectors affecting "html", "body", ":root", or generic elements.
- Theme implementation.
- Design token usage.
- Responsive layouts.
- Overflow causing horizontal scrolling.
- Navigation implementation.
- Typography.
- Spacing.
- Card styling.
- Search overlay.
- Gallery layout.
- Theme switching.
- Accessibility implementation.

Compare every implementation decision against the approved recommendation.

---

Corrective Requirements

Correct every deviation from the recommendation.

In particular:

- Eliminate all horizontal scrolling.
- Restore complete shell/workspace style isolation.
- Ensure shell styles cannot affect any workspace.
- Ensure removing the shell leaves every workspace visually unchanged.
- Ensure adding new workspaces cannot change the shell.
- Remove any global styling introduced by the shell.
- Ensure every component uses semantic "--shell-*" tokens.
- Do not hard-code design values in components.

Do not redesign the shell.

Implement the approved design—not your own interpretation.

---

Before Making Changes

Produce a deviation report with:

- Every issue found.
- The file(s) responsible.
- Which section of "bgd-shell-final-recommendation.md" or the PRD is being violated.
- Your proposed fix.

Wait for approval before making architectural changes. If a fix is purely corrective and aligns with the approved recommendation, implement it directly.

---

Deliverables

1. Audit report.
2. Deviation report.
3. Corrected implementation.
4. Summary of every file modified.
5. Verification that:
   - No horizontal scrolling exists.
   - Shell/workspace isolation is restored.
   - No shell CSS leaks into workspaces.
   - The implementation matches the approved recommendation.
   - Any remaining issues or implementation constraints are clearly documented.

Do not introduce new architecture, new design language, or new UX patterns. Your objective is faithful implementation of the approved shell design.