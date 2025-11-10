# Project Setup Guide

## ✅ Setup Verification Task

After completing the installation steps below, verify everything works correctly:

1. **Start the application**
   ```bash
   yarn start
   ```
   - Verify the app opens at `http://localhost:3000`
   - Check that the UI loads without errors
   - Confirm you can see the login page

2. **Test the application**
   ```bash
   yarn test
   ```
   - Cypress Test Runner should open
   - Run a simple test (e.g., from `cypress/tests/ui/`)
   - Verify tests pass successfully

3. **Check development tools**
   ```bash
   yarn types
   ```
   - TypeScript compilation should complete without errors

4. **Verify the UI is operational**
   - Try logging in with a test user (check `data/database.json` for credentials)
   - Navigate through different pages
   - Confirm no console errors in browser DevTools

**Success criteria**: All commands run without errors, UI is accessible, and at least one Cypress test passes.

---

## Prerequisites

- **Node.js**: v18, v20, or v22
- **Yarn**: v1.22 or higher
- **GitHub Copilot**: Active subscription and IDE extension installed

## Installation

```bash
# Clone the repository
git clone https://github.com/aliaksei-lyzo/github-copilot-workshop.git
cd github-copilot-workshop

# Install dependencies
yarn install

# Seed the database
yarn db:seed:dev
```

## Running the Application

```bash
# Start development server (React + API)
yarn start

# Start with coverage enabled
yarn dev:coverage

# Start with empty database
yarn start:empty
```

The application will run on `http://localhost:3000`

## Testing

```bash
# Open Cypress UI
yarn test

# Run headless tests
yarn test:headless

# Run API tests
yarn test:api

# Run unit tests
yarn test:unit
```

## Available Scripts

- `yarn dev` - Development mode with hot reload
- `yarn build` - Build for production
- `yarn lint` - Check code style
- `yarn prettier` - Format code
- `yarn types` - TypeScript type checking
- `yarn db:seed` - Regenerate seed data

## Workshop Notes

Refer to the `WORKSHOP/` folder for guided exercises. Configure Copilot to exclude workshop files from context for optimal performance.
