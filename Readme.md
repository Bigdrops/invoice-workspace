# Business Workspaces

[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-0.0.1-000000?style=flat-square&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

A growing collection of production-ready business application screens built for mobile-first workflows, using React, TypeScript, Tailwind CSS, and shadcn/ui.

Unlike component libraries, this repository delivers complete, copy-pasteable workspaces that solve real business problems — from invoicing to inventory.

---

## What Makes This Different

- **Mobile-first by default** — every workspace is designed for thumbs, not mice
- **Production-ready interactions** — loading states, error handling, optimistic updates, and accessibility
- **Consistent design language** — all workspaces share the same visual and interaction patterns
- **Modular architecture** — each workspace is isolated, copyable, and extendable
- **Built on shadcn/ui** — accessible, unstyled primitives with Tailwind utility classes
- **Full TypeScript** — types are exported, IntelliSense works out of the box

---

## Current Workspaces

| Workspace | Status |
|-----------|--------|
| Invoice Creation | [![Status](https://img.shields.io/badge/Status-In_Progress-yellow?style=flat-square)]() |

---

## Planned Workspaces

| Workspace | Status |
|-----------|--------|
| Quotation | [![Status](https://img.shields.io/badge/Status-Planned-blue?style=flat-square)]() |
| Purchase Order | [![Status](https://img.shields.io/badge/Status-Planned-blue?style=flat-square)]() |
| Delivery Note | [![Status](https://img.shields.io/badge/Status-Planned-blue?style=flat-square)]() |
| Customers | [![Status](https://img.shields.io/badge/Status-Planned-blue?style=flat-square)]() |
| Inventory | [![Status](https://img.shields.io/badge/Status-Planned-blue?style=flat-square)]() |
| Expenses | [![Status](https://img.shields.io/badge/Status-Planned-blue?style=flat-square)]() |
| Dashboard | [![Status](https://img.shields.io/badge/Status-Planned-blue?style=flat-square)]() |
| CRM | [![Status](https://img.shields.io/badge/Status-Planned-blue?style=flat-square)]() |
| Projects | [![Status](https://img.shields.io/badge/Status-Planned-blue?style=flat-square)]() |
| Reports | [![Status](https://img.shields.io/badge/Status-Planned-blue?style=flat-square)]() |

---

## Tech Stack

| Technology | Badge |
|------------|-------|
| React 19 | [![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/) |
| TypeScript | [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) |
| Tailwind CSS | [![Tailwind](https://img.shields.io/badge/Tailwind-3.0-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/) |
| shadcn/ui | [![shadcn/ui](https://img.shields.io/badge/shadcn/ui-0.0.1-000000?style=flat-square&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/) |

---

## Mobile-First Design Principles

Every workspace in this collection is built with mobile as the primary environment. This means:

- Touch targets are at least 44×44 CSS pixels
- Interactive elements are placed within thumb reach
- Scrollable content uses momentum scrolling and pull-to-refresh where appropriate
- Dialogs are replaced by bottom sheets on small viewports
- Tables become cards on mobile, preserving information density
- All interactions work without hover states
- Safe-area insets are respected for notched devices

Desktop is a progressive enhancement, not the default.

---

## Getting Started

```bash
git clone https://github.com/your-username/business-workspaces.git
cd business-workspaces
bun install
bun dev