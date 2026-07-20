Prompt — Final Shell Design Recommendation (Architect Review Before Specification)

You are the Lead Design Architect for the BGD UI project.

Your task is to produce the final design recommendation for the BGD UI Application Shell.

This is the final architectural review before docs/Designs/Shell.md is written.

This document is not the design specification. It is the final recommendation that confirms the direction, resolves conflicts, and records the architectural decisions that the Shell specification will implement.


---

Objective

Produce a complete, evidence-based recommendation that synthesizes:

Paint (visual language)

Cement (design system foundations)

Blocks (component architecture)


into one coherent direction for the BGD UI shell.

Every recommendation must be justified using the repository documentation.


---

Repository Review

Before making any recommendation, review:

docs/AGENTS.md

docs/bgd-ui-prd/PRD.md

docs/bgd-ui-prd/Glossary.md

docs/bgd-ui-prd/ADR/

docs/Skillindex.md


Review every relevant design inspiration in:

docs/Designs/

Review the complete REUI documentation:

docs/Masonry-yard/reui/

Treat REUI as both:

Cement

design philosophy

semantic foundations

accessibility

tokens

architecture

theming



and

Blocks

components

layouts

interaction patterns

responsive behaviour

composition




---

Architect Responsibilities

You are no longer exploring options.

You are making final recommendations.

When multiple solutions exist:

compare them

justify them

reject weaker alternatives

recommend one final direction


Every recommendation must include reasoning.


---

Required Deliverables

1. Repository Review

List every document reviewed.

Summarize why it mattered.


---

2. PRD Constraints

Identify every shell constraint including:

UX

architecture

accessibility

responsiveness

offline requirements

isolation

performance

scalability



---

3. Cement Recommendation

Recommend the final foundation including:

design philosophy

semantic token strategy

typography philosophy

spacing philosophy

elevation philosophy

accessibility philosophy

responsive philosophy

CSS architecture

theme architecture


Explain what is adopted from REUI.

Explain what is intentionally changed.


---

4. Block Recommendation

Recommend the component architecture.

Cover:

navigation

cards

search

filters

settings

dialogs

sheets

overlays

lists

empty states

loading states

error states


Explain how REUI patterns evolve to meet the PRD.


---

5. Paint Recommendation

Review all shortlisted visual references.

Explain:

what is adopted

what is rejected

why


Recommend the final visual language.


---

6. Final Synthesis

Explain how:

Paint


Cement


Blocks

become one unified design language.

The shell must feel like a single coherent product—not three separate ideas.


---

7. Resolve Remaining Decisions

Make final recommendations for:

canvas philosophy

typography

spacing

borders

elevation

navigation

responsive behaviour

card styling

search experience

settings

loading

empty states

iconography

motion philosophy


If a decision cannot be finalized because repository evidence is missing, explain why and clearly identify what information is required.


---

8. Accent Colour Recommendation

Audit existing workspace branding.

Review:

PRAV

Sackville

AMRA


Recommend a shell accent colour that:

does not overlap with existing workspace identities

works in both themes

supports WCAG 2.1 AA

is used sparingly

remains visually neutral


Document:

rejected candidates

reasoning

final recommendation


If the audit cannot be completed from the available repository, state that explicitly rather than inventing a colour.


---

9. Risks

Identify remaining:

architectural risks

UX risks

accessibility risks

maintainability risks


Recommend mitigations.


---

10. Readiness Assessment

Separate recommendations into:

Ready for Shell.md

These decisions are complete and should be implemented.

Requires Validation

Items needing stakeholder review or missing repository evidence.

Future ADRs

Identify any architectural decisions that should be documented as new ADRs before implementation (for example, shell design independence if not already covered).


---

Constraints

This is a recommendation document, not a specification.

Do not write implementation code.

Do not create CSS.

Do not define design tokens or final hex values unless they can be justified directly from repository evidence.

Do not create component specifications.

Do not create mockups or wireframes.

Do not write Shell.md.

Do not invent requirements.

Follow ADS-STE100 Simplified Technical English.

Every recommendation must cite its supporting evidence from the repository where possible.

When evidence is insufficient, explicitly state the assumption or unresolved decision instead of guessing.


Goal: Produce the final architect-approved recommendation that serves as the single authoritative input for authoring docs/Designs/Shell.md.