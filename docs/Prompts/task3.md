Task: Propose the BGD UI Application Shell Design

Before You Start

Do not begin design work.

First, fully comply with the repository workflow defined in docs/AGENTS.md.

This is mandatory.

Complete every required preparation step before producing any output.

Read and follow:

docs/AGENTS.md

Repository workflow

Documentation workflow

AI implementation rules

Documentation writing standard (ADS-STE100 Simplified Technical English)

docs/bgd-ui-prd/PRD.md

All Architecture documents relevant to the application shell

All documentation in docs/Masonry-yard/reui/

Every design reference in docs/Designs/


If any required document is missing, inconsistent, or conflicts with another document, stop and report the issue before continuing.

Do not skip repository synchronization.


---

Objective

Produce a recommendation for the BGD UI Application Shell.

This task is an audit and recommendation.

It is not implementation work.

It is not the creation of the Shell specification.

The goal is to determine the most appropriate design direction before authoring Shell.md.

The application shell includes:

Home

Workspace Gallery

Global Navigation

Search

Settings

Application Chrome

Global Layouts

Dialogs

Empty States

Loading States

Error States

Theme System


Workspace applications (Invoice, CRM, Inventory, Quotations, etc.) are outside the scope of this task.

The shell must have its own identity while remaining visually neutral so that workspaces become the primary visual focus.


---

Design Sources

Evaluate the repository using the following hierarchy.

1. Product Requirements (Highest Priority)

docs/bgd-ui-prd/PRD.md

Defines:

Product goals

Functional requirements

UX constraints

Shell requirements

Non-negotiable decisions


Never contradict the PRD.


---

2. REUI Documentation (Cement and Block)

docs/Masonry-yard/reui/

Treat REUI as the primary architectural reference.

Evaluate:

Cement

Design philosophy

UX philosophy

Accessibility principles

Layout philosophy

Token philosophy

Interaction philosophy

Theming philosophy

Long-term maintainability


Block

Evaluate reusable UI patterns including:

Navigation

App shell

Cards

Lists

Search

Settings

Dialogs

Forms

Empty states

Error states

Loading states

Workspace launch patterns

Component composition


Do not assume REUI is automatically correct.

Where appropriate, recommend refinements.


---

3. Paint References

docs/Designs/

Treat Paint as visual inspiration only.

Evaluate:

Color

Typography

Spacing

Shape language

Elevation

Borders

Iconography

Visual hierarchy

Light mode

Dark mode

Overall visual character


Do not copy a Paint reference.

You may:

Recommend one reference.

Combine multiple references.

Extract successful ideas.

Reject references that conflict with the PRD or REUI.


Every recommendation must include explicit reasoning.


---

Evaluation Criteria

Evaluate all sources against:

Mobile-first usability

Offline-first experience

Accessibility

Information density

Navigation clarity

Scalability

Maintainability

Performance

Visual neutrality

Theme support

Long-term consistency

Compatibility with many independent workspaces


Do not optimize for trends.

Optimize for longevity.


---

Deliverables

Produce a technical recommendation containing:

1. Confirmation that docs/AGENTS.md was followed.


2. Documents reviewed.


3. Summary of PRD constraints affecting the shell.


4. Audit of REUI Cement.


5. Audit of REUI Block.


6. Audit of every Paint reference.


7. Comparison of Cement, Block, and Paint.


8. Conflicts identified between sources.


9. Recommended Cement direction.


10. Recommended Block direction.


11. Recommended Paint direction.


12. References adopted and justification.


13. References rejected and justification.


14. Recommended adaptations and combinations.


15. High-level color strategy.


16. High-level typography strategy.


17. High-level layout and spacing strategy.


18. Navigation recommendation.


19. Home recommendation.


20. Workspace Gallery recommendation.


21. Theme strategy.


22. Accessibility considerations.


23. Risks and trade-offs.


24. Assumptions made where the PRD is undefined.


25. Recommended next steps before creating Shell.md.




---

Constraints

Do not redesign existing workspaces.

Do not modify the PRD.

Do not modify Architecture documents.

Do not modify REUI documentation.

Do not modify Paint references.

Do not introduce implementation code.

Do not create design tokens.

Do not produce component specifications.

Do not produce mockups or wireframes.

Do not write Shell.md.


If the PRD leaves a decision undefined, state the assumption explicitly and explain its impact on the recommendation.


---

Writing Standard

Use ADS-STE100 Simplified Technical English.

Use concise technical language.

Avoid marketing language.

Justify every recommendation with explicit reasoning and documented trade-offs.

Conclude with a prioritized list of recommendations, clearly identifying:

Decisions that can be accepted immediately.

Decisions that require stakeholder validation.

Decisions that should be deferred until the Shell.md specification is authored.