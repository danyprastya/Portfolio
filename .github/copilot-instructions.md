# Copilot Instructions - Dany Portfolio v3

## Project Overview

Personal portfolio built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Single-page application with section-based navigation (Hero → About → Projects → Contact).

## Architecture

### Directory Structure

- `src/components/sections/` - Main page sections (Hero, About, Projects, Contact)
- `src/components/ui/` - Reusable UI primitives (shadcn/ui + custom components)
- `src/components/navigation/` - Navigation components (DockNavigation for desktop, MobileNavigation for mobile)
- `src/data/` - Static JSON data files (projects, skills, social info)
- `src/lib/` - Utilities (`cn()` for classnames, fonts configuration)
- `src/app/api/` - Next.js API routes (email sending with nodemailer)

### Key Patterns

**Component Organization:**

- Section components are `"use client"` and use Framer Motion for animations
- UI components follow shadcn/ui conventions with `class-variance-authority` for variants
- Always use `cn()` from `@/lib/utils` for conditional classnames

**Styling Approach:**

- CSS variables defined in `globals.css` using HSL format: `hsl(var(--primary))`
- Glass morphism effects via `.glass` utility class
- Dark theme only (no light mode toggle)
- Custom font families: `font-sans` (Inter), `font-heading` (Plus Jakarta Sans)

**Data Management:**

- Static data lives in `src/data/*.json` files (projects, skills, social)
- Form validation uses Zod schemas (see `src/utils/validation/`)
- Forms use react-hook-form with `@hookform/resolvers`

## Development Commands

```bash
npm run dev    # Start dev server at localhost:3000
npm run build  # Production build
npm run lint   # ESLint check
```

## Environment Variables

Required in `.env.local` for contact form:

```
SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USERNAME, SMTP_PASSWORD
```

## Component Conventions

**Adding new UI components:**

```bash
npx shadcn@latest add <component-name>
```

Components install to `src/components/ui/` with `@/lib/utils` alias.

**Animation Pattern:**
Use Framer Motion's `motion` components with staggered animations:

```tsx
import { motion } from "framer-motion";
// or for new motion package:
import { motion } from "motion/react";
```

**Icon Usage:**

- Primary: `lucide-react` for UI icons
- Secondary: `react-icons` for brand/tech icons
- Tabler icons available via `@tabler/icons-react`

## API Routes

- `POST /api/sendEmail` - Handles contact form with file attachments via FormData

## Key Files Reference

- [tailwind.config.ts](tailwind.config.ts) - Theme colors, custom animations
- [globals.css](src/app/globals.css) - CSS variables, utility classes
- [components.json](components.json) - shadcn/ui configuration
- [projects.json](src/data/projects.json) - Portfolio project entries
