# Task: Audit Paint References and Recommend the BGD UI Application Shell Design

## Before You Start (Mandatory)

Do not begin the audit until you have fully synchronized with the repository.

You MUST follow the complete workflow defined in `docs/AGENTS.md`.

This is mandatory.

Before producing any output:

1. Read and comply with `docs/AGENTS.md`.
2. Follow the documented repository workflow.
3. Follow the AI implementation rules.
4. Follow the documentation workflow.
5. Follow the documentation writing standard (ADS-STE100 Simplified Technical English).
6. Read `docs/bgd-ui-prd/PRD.md` completely.
7. Review all Architecture documents relevant to the application shell.
8. Audit **every** Paint reference in `docs/Designs/`.

Do not skip documents.

Do not sample only a few Paint references.

If any document is missing, ambiguous, or conflicts with another document, stop immediately and report the issue before continuing.

---

# Objective

Recommend a design language for the **BGD UI Application Shell**.

The application shell is the product itself.

It includes:

- Home
- Workspace Gallery
- Navigation
- Search
- Settings
- Global layouts
- Application chrome
- Empty states
- Loading states
- Error states
- Theme system
- Global interaction patterns

It does **not** include workspace implementations.

Invoice, CRM, Inventory, Quotations, and every future workspace are independent products that live inside BGD UI.

The shell must have its own visual identity.

The shell must never inherit the design language of any workspace.

Workspace design decisions must not influence the shell.

---

# Primary References

Treat these as the source of truth.

1. `docs/AGENTS.md`
2. `docs/bgd-ui-prd/PRD.md`
3. `docs/Architecture/**`
4. `docs/Designs/**`

The PRD defines the product.

Architecture defines engineering constraints.

Paint references provide visual inspiration only.

No Paint reference is authoritative.

---

# Audit Requirements

Audit every Paint reference individually.

For each Paint:

- Overall design philosophy
- Visual strengths
- Visual weaknesses
- Mobile suitability
- Offline application suitability
- Navigation quality
- Information density
- Accessibility
- Light mode quality
- Dark mode quality
- Scalability
- Long-term maintainability
- Suitability for an application shell
- Suitability for workspace content
- Elements worth reusing
- Elements that should be rejected

Do not stop at describing the design.

Explain *why*.

---

# Recommendation Strategy

Do NOT simply choose one Paint.

You may:

- Recommend one Paint almost entirely.
- Combine multiple Paint references.
- Cherry-pick successful ideas.
- Reject unsuitable ideas.
- Recommend original adaptations where necessary.

Every recommendation must include explicit reasoning.

Every rejection must include explicit reasoning.

Discuss trade-offs.

---

# Evaluation Criteria

Prioritize:

- Mobile-first usability
- Offline-first experience
- Long-term maintainability
- Accessibility
- Scalability
- Neutral application shell
- Clear separation between shell and workspaces
- Support for many future workspaces
- Consistent Light and Dark mode

Do not optimize for trends.

Optimize for longevity.

---

# Deliverables

Produce a technical recommendation document containing:

1. Confirmation that the AGENTS.md workflow was followed.
2. Documents reviewed.
3. PRD constraints that influenced the recommendation.
4. Audit summary for every Paint reference.
5. Comparative analysis across all Paint references.
6. Recommended application shell direction.
7. Paint references adopted.
8. Paint references rejected.
9. Cherry-picked ideas from multiple Paint references.
10. High-level color strategy.
11. High-level typography strategy.
12. High-level spacing and layout strategy.
13. Navigation strategy.
14. Home screen direction.
15. Workspace Gallery direction.
16. Light mode strategy.
17. Dark mode strategy.
18. Accessibility considerations.
19. Risks and trade-offs.
20. Open questions that require product decisions.
21. Recommended next steps.

---

# Constraints

Do not redesign existing workspaces.

Do not modify:

- PRD
- Architecture
- Design references
- AGENTS.md

Do not write implementation code.

Do not generate a design system.

Do not create components.

Do not create tokens.

Do not invent requirements that contradict the PRD.

If the PRD leaves something undefined, state the assumption instead of guessing.

---

# Output Standard

Write in ADS-STE100 Simplified Technical English.

Use concise technical language.

Avoid marketing language.

Support every recommendation with explicit reasoning.

This task ends with a recommendation only.

The complete Application Shell Design Specification will be written in a separate task after this recommendation is reviewed and approved.