# Project Overview
This project is a payment application for demonstrating real-world usage of Cypress testing methods, patterns, and workflows. It is not intended for production use, but for workshops and educational purposes.

# Architecture
- **Frontend:** React (with TypeScript, Material-UI)
- **Backend:** Express (TypeScript)
- **State Management:** XState, React Context
- **Database:** Lowdb (JSON file-based)
- **Testing:** Cypress (E2E, component, API), Vitest (unit)

# Components

## Core Features
- User Authentication (local and 3rd party: Auth0, Okta, Cognito, Google)
- Payments: Send, request, and manage transactions
- Bank Accounts: Link, view, and manage accounts
- Contacts: Add, search, and manage contacts
- Notifications: In-app notifications for user activity
- Comments & Likes: Social features for transactions

## Testing & Demo
- E2E, API, and component tests with Cypress
- Database seeding for consistent test data
- Code coverage reporting

# Environment Configuration
Required environment variables (see `.env`):
- PORT, VITE_BACKEND_PORT: Frontend and backend ports
- VITE_AUTH0, VITE_OKTA, VITE_AWS_COGNITO, VITE_GOOGLE: Auth provider toggles
- Provider-specific secrets (see docs for each provider)

# File Structure
cypress-realworld-app/
├── backend/                # Express backend (API, routes, database)
├── cypress/                # Cypress tests (api, ui, component)
├── data/                   # JSON database and seeds
├── public/                 # Static assets
├── scripts/                # Utilities and seed scripts
├── src/                    # React frontend (components, models, utils)
│   ├── components/        # UI components
│   ├── containers/        # Page-level containers
│   ├── models/            # TypeScript models
│   ├── utils/             # Utilities
│   └── __tests__/         # Unit tests
├── WORKSHOP/               # Workshop and planning docs
├── PLANNING.md             # Project plan (this file)
├── PROJECT_README.md       # Main project readme
├── TASK.md                 # Task tracking
└── ...

# Style Guidelines

## TypeScript Guidelines
- Use strict mode
- Prefer type imports
- Define interfaces/types for all data
- Use JSDoc for all functions

## Naming Conventions
- Components: PascalCase (e.g., BankAccountForm)
- Utilities: camelCase (e.g., getUserById)
- Test Files: *.test.ts, *.cy.tsx
- API Routes: kebab-case
- Constants: UPPER_SNAKE_CASE
- Types: PascalCase with suffix (e.g., UserModel)

## Code Organization
- One main component per file
- Group related code by feature
- Use index.ts for barrel exports
- Keep tests next to code or in mirrored __tests__ folders

# Best Practices
- Use functional React components and hooks
- Keep components focused and single-responsibility
- Use proper error boundaries and loading states
- Write unit and E2E tests for all features
- Use semantic HTML and follow accessibility guidelines
- Add inline comments for non-obvious logic
- Never exceed 500 lines per file; split as needed

# Dependencies
Core:
- react, @mui/material, xstate, express, lowdb, typescript
Testing:
- cypress, vitest, @testing-library/react, @cypress/code-coverage
Dev:
- eslint, prettier, husky, concurrently

# Testing
- E2E: cypress/tests/ui, cypress/tests/api
- Unit: src/__tests__
- Component: *.cy.tsx next to components
- Database is reseeded before each test run

# Accessibility & Performance
- Use semantic HTML and ARIA attributes
- Ensure keyboard navigation and color contrast
- Optimize bundle size and use code splitting

# Workshop & Docs
- All workshop/planning docs in WORKSHOP/
- Update README.md and TASK.md as features/tasks change
