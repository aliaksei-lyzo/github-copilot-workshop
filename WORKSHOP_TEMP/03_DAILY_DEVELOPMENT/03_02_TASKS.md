# GitHub Copilot Chat Mode Selection Training

Learn when to use **ASK**, **EDIT**, or **AGENT** mode based on task complexity and scope.

---

## 🧭 Mode Selection Logic

| Mode | When to Use |
|------|-------------|
| **ASK** | Unclear goals, exploration, requirement clarification |
| **EDIT** | Small, local code edits (one function or file) |
| **EDIT + ASK** | Guided, iterative improvements |
| **ASK → EDIT → VALIDATE** | Higher-risk or multi-step code with validation |
| **AGENT** | Multi-file changes, automated workflows, refactoring |

---

## 🧩 Training Tasks

For each task below, **YOU DECIDE** which Copilot Chat mode(s) to use. Then check your answer in the [SOLUTIONS.md](./03_02_SOLUTIONS.md) file.

---

### Task 1: Understand Authentication Middleware Flow

**Scenario:**
You've been asked to add a new authentication provider, but you're not familiar with how authentication currently works in this application.

**Your Goal:**
Understand the authentication architecture, identify which files handle authentication, and learn what you'd need to modify to add a new provider.

**Question:** Which Copilot Chat mode should you use? Why?

**Suggested Approach:**
- [ ] Identify the appropriate mode(s)
- [ ] Formulate your question/prompt
- [ ] Execute and document your findings

---

### Task 2: Fix Missing Input Validation

**Scenario:**
The contact creation endpoint (`POST /contacts`) doesn't validate that the contact user ID is different from the current user. Users shouldn't be able to add themselves as contacts.

**Your Goal:**
Add validation to ensure `contactUserId` is not the same as the authenticated user's ID. Return a 400 error with the message "Cannot add yourself as a contact" if they match.

**Files Affected:** `backend/contact-routes.ts`

**Question:** Which Copilot Chat mode should you use? Why?

**Suggested Approach:**
- [ ] Identify the appropriate mode(s)
- [ ] Locate the POST `/contacts` route handler
- [ ] Apply your chosen mode and verify the result

---

### Task 3: Improve Error Handling Across Routes

**Scenario:**
Bank account routes lack consistent error handling and don't return helpful error messages to the client. You want to improve this but you're not sure what the best practices are for this codebase.

**Your Goal:**
Add proper error handling to the bank account routes with appropriate HTTP status codes (404 for not found, 403 for unauthorized, 500 for server errors).

**Files Affected:** `backend/bankaccount-routes.ts`

**Question:** Which Copilot Chat mode(s) should you use? Why? Should you use multiple modes in sequence?

**Suggested Approach:**
- [ ] Identify the appropriate mode(s) and sequence
- [ ] Execute your strategy
- [ ] Verify TypeScript compiles and responses are appropriate

---

### Task 4: Add Request Rate Limiting

**Scenario:**
You need to add rate limiting to API endpoints to prevent abuse. You're not sure if there are existing rate limiting packages in the project or what configuration would be appropriate.

**Your Goal:**
Implement rate limiting on the transaction creation endpoint (100 requests per 15 minutes per IP).

**Files Affected:** `backend/transaction-routes.ts`, possibly new file `backend/rate-limiter.ts`

**Question:** Which Copilot Chat mode(s) should you use? In what order? Why?

**Suggested Approach:**
- [ ] Determine your mode strategy
- [ ] Execute each phase
- [ ] Validate the implementation

---

### Task 5: Add Transaction Analytics Dashboard

**Scenario:**
Product wants an analytics dashboard showing transaction statistics: total amount sent/received, transaction count by status, and monthly trends.

**Your Goal:**
Create a complete analytics feature with backend endpoint and frontend components.

**Files Affected:**
- Backend: `backend/transaction-routes.ts` (new endpoint)
- Frontend: `src/components/AnalyticsCard.tsx` (new)
- Frontend: `src/containers/AnalyticsDashboard.tsx` (new)

**Question:** Which Copilot Chat mode should you use? Why?

**Suggested Approach:**
- [ ] Choose your mode
- [ ] Formulate a comprehensive prompt
- [ ] Review and test the generated code

---

### Task 6: Refactor Database Query Functions

**Scenario:**
Database query functions in `backend/database.ts` are inconsistent. Some use async/await, others don't. Some have error handling, others don't. You need to standardize them without breaking existing functionality.

**Your Goal:**
Standardize all database operations with consistent error handling, JSDoc comments, and return types. Do NOT change function signatures or break existing API routes.

**Files Affected:** `backend/database.ts`, potentially other files if patterns change

**Question:** Which Copilot Chat mode should you use? Why?

**Suggested Approach:**
- [ ] Select the appropriate mode
- [ ] Create a detailed prompt with constraints
- [ ] Verify no breaking changes

---

### Task 7: Add Notification Preferences Feature

**Scenario:**
Users want to control which notification types they receive (payment received, payment sent, comments, likes).

**Your Goal:**
Implement a complete notification preferences system.

**Requirements:**
- Add `notificationPreferences` field to User model
- Create PATCH `/users/:userId/preferences` endpoint
- Add validation for preferences update
- Create `NotificationPreferences` component with checkboxes
- Integrate into UserSettings
- Update notification creation to respect preferences

**Files Affected:** Multiple (models, routes, components, containers)

**Question:** Which Copilot Chat mode should you use? Why?

**Suggested Approach:**
- [ ] Identify the best mode for this scope
- [ ] Create a structured prompt
- [ ] Verify the implementation follows existing patterns

---

### Task 8: Debug a Failing Test

**Scenario:**
A unit test for `getTransactionById` is failing with "Cannot read property 'id' of undefined". You need to understand why and fix it.

**Your Goal:**
Identify the root cause and fix the failing test.

**Files Affected:** `src/__tests__/transactions.test.ts`, possibly `backend/database.ts`

**Question:** Which Copilot Chat mode(s) should you use? Why?

**Suggested Approach:**
- [ ] Choose your debugging strategy
- [ ] Execute your approach
- [ ] Verify the test passes

---

### Task 9: Add Logging Statement

**Scenario:**
You need to add a single console.log statement to see what data is being passed to `createTransaction` function for debugging purposes.

**Your Goal:**
Add: `console.log('Creating transaction:', transactionData);` before the transaction is created.

**Files Affected:** `backend/database.ts`

**Question:** Which Copilot Chat mode should you use? Why? (Or should you even use Copilot for this?)

**Suggested Approach:**
- [ ] Determine if Copilot is needed
- [ ] If yes, which mode?
- [ ] Execute

---

### Task 10: Create Multi-Step User Onboarding Flow

**Scenario:**
Design and implement a 4-step user onboarding wizard: (1) Welcome, (2) Connect Bank Account, (3) Add Contacts, (4) Complete Profile.

**Your Goal:**
Create a complete onboarding experience with step navigation, validation, and progress tracking.

**Files Affected:**
- New components for each step
- New container for wizard orchestration
- Routing updates
- Possibly backend changes for tracking onboarding status

**Question:** Which Copilot Chat mode should you use? Why?

**Suggested Approach:**
- [ ] Select your mode
- [ ] Structure your requirements
- [ ] Implement and verify the flow

---

## 📊 Mode Selection Decision Tree

```
Is the task clear and well-defined?
├─ NO → Use ASK mode to explore and clarify
└─ YES
   └─ Does it affect multiple files?
      ├─ YES → Use AGENT mode
      └─ NO
         └─ Is it risky or unfamiliar?
            ├─ YES → Use ASK → EDIT → VALIDATE
            └─ NO → Use EDIT mode
```

---

## 💡 Tips for Success

- **Read the scenario carefully** - context matters
- **Consider the scope** - how many files are affected?
- **Assess your knowledge** - do you understand what needs to be done?
- **Think about risk** - could this break existing functionality?
- **Check your answer** in [SOLUTIONS.md](./03_02_SOLUTIONS.md) after attempting each task

---

## ✅ After Completing Tasks

Once you've worked through all tasks, review the solutions file to:
- Compare your mode selections
- Understand the reasoning behind each choice
- Learn alternative approaches
- Identify patterns for future work
