# GitHub Copilot Slash Commands

This module covers powerful slash commands (`/explain`, `/fix`, `/tests`, `/doc`) that provide quick, focused assistance directly in the chat interface.

---

## 📚 Learning Objectives

By the end of this module, you will be able to:
- Use `/explain` to understand complex code
- Use `/fix` to identify and resolve code issues
- Use `/tests` to generate unit and integration tests
- Use `/doc` to create comprehensive documentation
- Combine commands for efficient workflows

---

## 📖 Exercise 1: /explain Command

**Skill:** Understanding complex code and logic

### Task: Understand Transaction Validation Logic

**Location:** `backend/validators.ts`

**Instructions:**
1. Open `backend/validators.ts`
2. Find the `isTransactionPayloadValidator` function or array
3. Select the validation logic (including all validator functions)
4. Open Copilot Chat
5. Type: `/explain`

**Expected Outcome:**
- Clear explanation of what each validator does
- Understanding of validation flow and error handling
- Explanation of express-validator usage
- Context about why certain validations exist

**Follow-up Questions:**
```
/explain How does this validation prevent security issues?
/explain What happens if validation fails?
```

---

### Task: Understand XState Machine

**Location:** `src/machines/` (choose any machine file)

**Instructions:**
1. Open a state machine file (e.g., `authMachine.tsx`)
2. Select the entire machine configuration
3. Type: `/explain`

**Expected Outcome:**
- Explanation of state machine pattern
- Description of each state and transition
- Understanding of context and events
- Why XState is used in this project

**Practice:**
Try `/explain` on other complex parts:
- Transaction pagination logic in `src/utils/transactionUtils.ts`
- Authentication middleware in `backend/helpers.ts`
- Database operations in `backend/database.ts`

---

## 🔧 Exercise 2: /fix Command

**Skill:** Identifying and resolving code issues

### Task: Fix Type Safety Issues

**Location:** `backend/transaction-routes.ts`

**Instructions:**
1. Open `backend/transaction-routes.ts`
2. Find a route handler that might have type safety issues
3. Select the handler code
4. Type: `/fix`

**Expected Outcome:**
- Identification of potential TypeScript issues
- Suggestions for proper type annotations
- Fixes for null/undefined handling
- Improved error handling suggestions

**If no issues found, try:**
- Remove type annotations and use `/fix` to add them back
- Add intentional issues (wrong types) and use `/fix` to correct

---

### Task: Fix Potential Security Issues

**Location:** `backend/user-routes.ts`

**Instructions:**
1. Open `backend/user-routes.ts`
2. Find the password handling or authentication logic
3. Select the code
4. Type: `/fix focus on security vulnerabilities`

**Expected Outcome:**
- Identification of security concerns
- Suggestions for input sanitization
- Recommendations for password handling
- SQL injection prevention (if applicable)

---

### Task: Fix React Component Issues

**Location:** `src/components/TransactionCreateStepTwo.tsx`

**Instructions:**
1. Open `src/components/TransactionCreateStepTwo.tsx`
2. Select the component code
3. Type: `/fix`

**Expected Outcome:**
- Identification of React best practices violations
- Suggestions for hook dependencies
- Memory leak prevention
- Accessibility improvements
- Performance optimizations

**Common Issues to Look For:**
- Missing dependencies in useEffect
- Unhandled promise rejections
- Missing error boundaries
- Accessibility attributes

---

## ✅ Exercise 3: /tests Command

**Skill:** Generating comprehensive test coverage

### Task: Generate Unit Tests for Utility Functions

**Location:** `src/utils/transactionUtils.ts`

**Instructions:**
1. Open `src/utils/transactionUtils.ts`
2. Select the `getPaginatedItems` function
3. Open Copilot Chat
4. Type: `/tests using Vitest framework`

**Expected Outcome:**
- Complete test file with proper imports
- Test cases for normal scenarios
- Edge cases (empty arrays, invalid pagination)
- Boundary conditions (first page, last page)
- Proper assertions and expectations

**Verification:**
```bash
# Create the test file with generated content
# Then run:
yarn test:unit
```

---

### Task: Generate API Integration Tests

**Location:** `backend/transaction-routes.ts`

**Instructions:**
1. Open `backend/transaction-routes.ts`
2. Select the POST `/transactions` route handler
3. Type: `/tests using Cypress for API testing`

**Expected Outcome:**
- Cypress API test with proper setup
- Tests for successful transaction creation
- Tests for validation failures
- Tests for authentication requirements
- Tests for error responses

**Example Generated Test Structure:**
```typescript
describe('POST /transactions', () => {
  it('should create a transaction with valid data', () => {
    // test implementation
  });
  
  it('should return 400 for invalid amount', () => {
    // test implementation
  });
  
  it('should require authentication', () => {
    // test implementation
  });
});
```

**Place generated test in:** `cypress/tests/api/transaction-create.cy.ts`

---

### Task: Generate Component Tests

**Location:** `src/components/BankAccountForm.tsx`

**Instructions:**
1. Open `src/components/BankAccountForm.tsx`
2. Select the entire component
3. Type: `/tests using React Testing Library and Vitest`

**Expected Outcome:**
- Component test with proper setup and cleanup
- Tests for rendering with props
- Tests for user interactions (form input, submission)
- Tests for validation error display
- Tests for success/error states

**Verification:**
```bash
# Create the test file: src/components/BankAccountForm.test.tsx
yarn test:unit
```

---

## 📝 Exercise 4: /doc Command

**Skill:** Creating comprehensive documentation

### Task: Document Backend Route Handler

**Location:** `backend/transaction-routes.ts`

**Instructions:**
1. Open `backend/transaction-routes.ts`
2. Select a route handler (e.g., GET `/transactions`)
3. Type: `/doc`

**Expected Outcome:**
- JSDoc comment with description
- @param annotations for all parameters
- @returns annotation with response structure
- @throws annotations for error cases
- Example usage if applicable

**Example Generated Documentation:**
```typescript
/**
 * Retrieves transactions for the authenticated user with optional filtering
 * @param {Request} req - Express request object with query parameters
 * @param {Response} res - Express response object
 * @returns {Promise<void>} JSON response with paginated transactions
 * @throws {401} If user is not authenticated
 * @throws {400} If query parameters are invalid
 */
```

---

### Task: Document React Component

**Location:** `src/components/TransactionList.tsx`

**Instructions:**
1. Open `src/components/TransactionList.tsx`
2. Select the component function
3. Type: `/doc`

**Expected Outcome:**
- Component description
- Props documentation with types
- Usage example
- Notes about behavior or side effects

**Example Generated Documentation:**
```typescript
/**
 * Displays a list of transactions with pagination and filtering
 * @component
 * @param {Object} props - Component props
 * @param {TransactionResponseItem[]} props.transactions - Array of transactions to display
 * @param {Function} props.onLoadMore - Callback when user requests more transactions
 * @param {boolean} props.isLoading - Loading state indicator
 * @example
 * <TransactionList 
 *   transactions={data} 
 *   onLoadMore={fetchMore} 
 *   isLoading={false} 
 * />
 */
```

---

### Task: Document Complex Algorithm

**Location:** `scripts/generateSeedData.ts`

**Instructions:**
1. Open `scripts/generateSeedData.ts`
2. Select a complex function (e.g., transaction generation logic)
3. Type: `/doc with detailed explanation of algorithm`

**Expected Outcome:**
- High-level algorithm description
- Step-by-step process documentation
- Parameter explanations
- Return value documentation
- Complexity notes if relevant

---

## 🎯 Exercise 5: Combining Commands

**Skill:** Using multiple commands for comprehensive code improvement

### Task: Complete Code Quality Workflow

**Location:** Create a new utility file for this exercise

**Scenario:** You need to add a new feature with proper documentation and tests.

**Step 1 - Implement Feature:**
Create `src/utils/transactionAnalytics.ts` with this comment:
```typescript
// Function to calculate total spending by category
// Parameters: transactions array, optional date range
// Returns: object with category totals
```
Let Copilot complete the implementation.

**Step 2 - Understand:**
Select the generated code and use:
```
/explain
```

**Step 3 - Fix Issues:**
```
/fix
```

**Step 4 - Add Documentation:**
```
/doc
```

**Step 5 - Generate Tests:**
```
/tests using Vitest
```

**Expected Outcome:**
- Working, documented, tested utility function
- Understanding of what the code does
- Fixed potential issues
- Complete JSDoc documentation
- Comprehensive test coverage

**Verification:**
```bash
yarn types
yarn test:unit
```

---

## 🎓 Best Practices

### Command Quick Reference:

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `/explain` | Understand code | Unfamiliar code, complex logic, learning patterns |
| `/fix` | Find and fix issues | Type errors, bugs, security issues, best practices |
| `/tests` | Generate tests | New features, untested code, increasing coverage |
| `/doc` | Create documentation | Public APIs, complex functions, components |

### Tips for Effective Command Usage:

1. **Select Relevant Code:** Always select the specific code you want to work with

2. **Be Specific:** Add context after the command:
   - `/tests using Vitest framework with edge cases`
   - `/fix focusing on performance issues`
   - `/explain the state management pattern`

3. **Iterate:** Use commands in sequence:
   - `/explain` to understand
   - `/fix` to improve
   - `/doc` to document
   - `/tests` to verify

4. **Review Output:** Always review and customize generated content

5. **Combine with Participants:**
   - `@workspace /explain how authentication works across files`
   - `@terminal /tests show me how to run these tests`

---

## 📝 Additional Practice

Try these real-world scenarios:

1. **Legacy Code Refactoring:**
   - `/explain` to understand old code
   - `/fix` to modernize patterns
   - `/tests` to ensure no regressions
   - `/doc` to document changes

2. **New Feature Development:**
   - Write code with inline comments
   - `/fix` to catch issues early
   - `/doc` to document API
   - `/tests` to ensure quality

3. **Code Review Preparation:**
   - `/explain` complex sections for reviewers
   - `/fix` to catch issues before review
   - `/doc` to add missing documentation
   - `/tests` to prove functionality

4. **Bug Investigation:**
   - `/explain` to understand buggy code
   - `/fix` to identify and resolve issue
   - `/tests` to prevent regression

---

## ✅ Completion Checklist

- [ ] Used `/explain` to understand complex code
- [ ] Used `/fix` to identify and resolve issues
- [ ] Generated unit tests with `/tests`
- [ ] Generated integration tests with `/tests`
- [ ] Created documentation with `/doc`
- [ ] Completed combined workflow (explain → fix → doc → tests)
- [ ] All generated tests pass successfully
- [ ] Understand when to use each command
- [ ] Can combine commands effectively

---

## 🚀 Next Steps

Once you've mastered slash commands, proceed to:
- **Module 05: Advanced Prompting Techniques**
- **Module 06: Test-Driven Development with Copilot**
- **Module 07: Code Review and Refactoring**
