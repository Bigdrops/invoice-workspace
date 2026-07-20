You are joining this project with no prior context or little , thinhs have changed 

Your first task is to use the following document as the authoritative design specification for the shell:

Primary reference:
"docs/bgd-ui-prd/bgd-shell-final-recommendation.md"

Instructions

1. Read the entire "docs/bgd-ui-prd/bgd-shell-final-recommendation.md" document from the local repository before making any changes.
2. Treat this document as the canonical source for all shell architecture, design, UX, accessibility, component, token, navigation, and implementation decisions.
3. Do not re-evaluate, redesign, or replace decisions that have already been approved in the recommendation.
4. Follow all repository conventions defined in "docs/AGENTS.md".
5. Follow the PRD ("docs/bgd-ui-prd/PRD.md") for implementation requirements. Where the recommendation resolves an open design decision from the PRD, the recommendation takes precedence.
6. Preserve the architectural principles established in the recommendation:
   - Shell/workspace design isolation
   - CSS Modules
   - Scoped "--shell-*" design tokens
   - Mobile-first responsive design
   - Offline-first architecture
   - WCAG 2.1 AA accessibility
   - Performance budgets
7. Do not introduce new visual patterns, colors, typography, spacing systems, navigation models, or architectural changes unless they are required to resolve an implementation issue that is not covered by the recommendation.
8. If you discover a conflict between the implementation and the recommendation, stop and explain the conflict rather than making an architectural decision.

Implementation Guidance

- Implement the shell using the approved architecture and semantic "--shell-*" design tokens.
- Never hard-code design values inside components.
- If a token value is identified in the recommendation as requiring verification, reference the semantic token only.
- Define any temporary placeholder values exclusively in "tokens.css" and clearly mark them with "TODO: verify".
- Keep all temporary design values centralized in "tokens.css"; do not scatter placeholder values throughout the codebase.
- Structure the implementation so that replacing verified token values requires changes only within "tokens.css".

Assume the shell design recommendation is architect-approved and is the baseline for all implementation work.

Your first actions should be:

1. Read "docs/AGENTS.md".
2. Read "docs/bgd-ui-prd/PRD.md".
3. Read "docs/bgd-ui-prd/bgd-shell-final-recommendation.md".
4. Summarize your implementation plan.
5. Begin implementation in small, reviewable commits that remain consistent with the approved architecture.