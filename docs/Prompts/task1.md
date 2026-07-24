[
# EXECUTION PROMPT – Remove Side Gutters for Full-Width Mobile Line Items

## Load Required Skills
- `/frontend-design` – apply responsive layout overrides.
- `/executing-plans` – execute structured changes.
- `/verification-before-completion` – validate.

---

## A. Project Context
The line-item cards in EASEHEALTH and Ditto have large horizontal gaps (side gutters) on mobile screens. The user wants them to extend edge-to-edge, touching the screen wall, instead of floating in the middle with whitespace on the left and right.

---

## B. Target Components
- **EASEHEALTH**: `src/workspaces/invoice/easehealth/` – find the main container wrapping the line items and the card component.
- **Ditto**: `src/workspaces/invoice/ditto/` – same.
- Do **not** touch the shell or other workspaces.

---

## C. Implementation Constraints
### Mobile Overrides (max-width: 640px)
- **Remove horizontal padding** from the outermost container that holds the line items – set `padding-left: 0` and `padding-right: 0`.
- **Remove `max-width` constraints** on mobile so the container is `width: 100%`.
- **Optional but recommended**: set the card's `border-radius` to `0` on mobile when it spans full width, to avoid awkward rounded corners that bleed into the screen edge. (Check with user if they want this, or keep the radius).

### Desktop Behavior (min-width: 641px)
- Keep the container centered with a `max-width` (e.g., `max-w-lg` or `max-w-2xl`) and side padding (`px-4` or `px-6`) so it doesn't stretch out on wide monitors.

---

## D. Implementation Example
In the workspace's CSS or Tailwind utility classes, apply this pattern:

```css
/* Within the workspace's own CSS */
@media (max-width: 640px) {
  .line-items-container {
    padding-left: 0 !important;
    padding-right: 0 !important;
    max-width: 100% !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  .line-item-card {
    border-radius: 0 !important; /* optional: removes corners for edge-to-edge look */
  }
}
```

---

E. Verification

1. bun run typecheck – no errors.
2. bun run build – succeeds.
3. Manual test on a mobile viewport (375px):
   · Line-item cards must span the full screen width with zero horizontal gaps.
   · Desktop view (1024px) must remain centered with proper padding.
4. Save report to docs/Reports/.

---

F. Acceptance Criteria

· EASEHEALTH line-item cards touch the screen wall on mobile.
· Ditto line-item cards touch the screen wall on mobile.
· Desktop layout remains unchanged and centered.
· Build and typecheck pass.
· Manual verification complete.

---

G. Execution Order

1. Locate the main container and card component in each workspace.
2. Apply the mobile CSS overrides (remove side padding/max-width).
3. Test on mobile and desktop.
4. Verify and report.

```