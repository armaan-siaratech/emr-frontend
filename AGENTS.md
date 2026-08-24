<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Ethizo EHR Healthcare Management System — Agent Guide

## 1. Project Overview & Architecture
This repository contains the **Ethizo Healthcare Management System (EHR/EMR)**, a modern, web-based hospital management solution designed for clinical workflows, electronic health records, patient tracking, medical appointment scheduling, SOAP clinical documentation, prescriptions (eRx), diagnoses (ICD-10), and hospital administration.

### Technology Stack
- **Framework**: Next.js 16 (App Router) with React 19
- **Language**: TypeScript (`^5`)
- **Styling**: Tailwind CSS (`^4`) with `@tailwindcss/postcss`, CSS Modules, and custom Design Tokens in `app/globals.css`
- **Iconography**: `lucide-react` (`^1.31.0`) & Custom SVG icons
- **Fonts**: Next.js Google Fonts (`Inter` variable)
- **Deployment & Runtime**: Node.js ecosystem with `npm run dev` / `npm run build`

---

## 2. Directory Structure & Key Modules

```
healthcare-management-system/
├── app/                        # Next.js App Router Routes
│   ├── layout.tsx              # Root Layout with Font & Global CSS
│   ├── page.tsx                # Entry Route (Redirects to /login or /dashboard)
│   ├── globals.css             # Main Design System Tokens & Keyframe Animations
│   ├── login/                  # Secure Clinical Authentication Page
│   ├── dashboard/              # Primary Clinical Dashboard & Overview
│   ├── patients/               # Patient Directory & Detailed EMR Charts
│   ├── appointments/           # Appointment Scheduler & Calendar Views
│   ├── clinical-notes/         # SOAP Notes & Clinical Documentation
│   ├── encounters/             # Patient Encounters & Visit Log
│   ├── prescriptions/          # e-Prescription & Pharmacy Orders
│   ├── diagnoses/              # Diagnostic Codes (ICD-10) & Conditions
│   ├── medications/            # Formulary & Medication Tracking
│   ├── messages/               # Inter-Departmental Messaging System
│   ├── notifications/          # Real-time Clinical Alerts & Notifications
│   ├── reports/                # Hospital Analytics & EHR Reports
│   └── settings/               # System & User Settings
├── components/                 # Reusable UI Components
│   ├── layout/                 # Core Shell (Navbar, Sidebar, PageHeader, SidebarContext)
│   ├── ui/                     # Primitives (Button, Badge, Input, Modal, StatCard)
│   ├── dashboard/              # Dashboard Specific Widgets
│   ├── patients/               # Patient Specific Widgets
│   ├── clinical-notes/         # Clinical Note Form Components
│   └── theme/                  # Theme Provider & Dark/Light Mode Utilities
├── public/                     # Static Assets & Medical Images
├── package.json                # Project Dependencies & Scripts
├── tsconfig.json               # TypeScript Configuration
└── AGENTS.md                   # Agent & Developer Guidelines (This File)
```

---

## 3. Design Tokens & Ethizo EHR Theme

The user interface adheres to the **Ethizo Clinical Design System**, characterized by:
- **Primary Teal Palette**:
  - `Primary`: `#0f766e` (Deep Clinical Teal)
  - `Primary Light`: `#14b8a6` (Vibrant Cyan Teal)
  - `Primary Dark`: `#0d5c56` (Dark Forest Teal)
  - `Accent`: `#72d4bd` / `#06b6d4` (Sky Cyan highlight)
- **Clinical Surfaces**:
  - `Background`: `#f4f8f7` (Soft Mint Grey) / Slate `#0f172a` for Dark Mode
  - `Surface Card`: Pure White `#ffffff` with 1px border `#e4ebe8` and soft drop shadows `0 4px 22px rgba(15,118,110,0.04)`
  - `Glassmorphism`: `backdrop-blur-2xl bg-white/80`
- **Clinical Status Badges**:
  - `Success / Stable`: `#dcfce7` bg / `#166534` text (Emerald)
  - `Warning / Pending`: `#fef3c7` bg / `#92400e` text (Amber)
  - `Danger / Emergency`: `#fee2e2` bg / `#991b1b` text (Rose)
  - `Info / Scheduled`: `#e0f2fe` bg / `#075985` text (Sky Blue)

---

## 4. Animation & Micro-Interaction Guidelines

All UI components use smooth CSS animations for a living, fluid experience:
- **`animate-fade-in-up`**: Smooth 0.55s entry for cards and section headers.
- **`animate-dot-pulse`**: Pulsing indicators for live vitals and online status.
- **`animate-glow`**: Gentle background aura for primary action buttons and active brand badges.
- **`animate-heartbeat`**: Subtle pulse rhythm for vitals metrics.
- **`stagger-1` through `stagger-10`**: Staggered animation delays for list items and grids.

---

## 5. Coding Standards & Conventions

1. **Client vs Server Components**:
   - Interactivity, state hook (`useState`, `useContext`), or routing hooks (`usePathname`, `useRouter`) MUST include `"use client";` at the top of the file.
2. **Icons**:
   - Use `lucide-react` for standard UI icons or inline clean SVG vectors.
3. **Accessibility**:
   - Ensure interactive buttons and inputs have visible focus states (`focus-visible:ring-2 focus-visible:ring-teal-500`).
4. **File Paths & Links**:
   - Always reference files and symbols with valid absolute file paths or github-style links when generating markdown reports.

---

## 6. Development Workflow

- **Run Local Server**: `npm run dev`
- **Build Production**: `npm run build`
- **Lint Code**: `npm run lint`

