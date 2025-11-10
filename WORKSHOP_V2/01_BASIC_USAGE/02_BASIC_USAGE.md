# GitHub Copilot Basic Usage Workshop

This module covers the fundamental features of GitHub Copilot through hands-on exercises using the RealWorld Payment App.

---

## 📚 Learning Objectives

By the end of this module, you will be able to:
- Use code suggestions with inline comments
- Work with inline chat for quick edits
- Leverage Copilot Chat in **Ask mode** for understanding code
- Use Copilot Chat in **Edit mode** for code modifications
- Apply Copilot Chat in **Agent mode** for complex multi-file tasks

---

## 🎯 Exercise 1: Code Suggestions with Inline Comments

**Skill:** Generate code using comment-driven development

### Task: Create a Transaction Filter Utility

**Location:** `src/utils/transactionFilters.ts` (new file)

**Instructions:**
1. Create a new file `src/utils/transactionFilters.ts`
2. Use inline comments to generate utility functions for filtering transactions
3. Let Copilot autocomplete the implementation

**Comments to write:**

```typescript
import { Transaction, TransactionStatus } from "../models/transaction";

// Function to filter transactions by amount range
// Parameters: transactions array, minAmount (optional), maxAmount (optional)
// Returns: filtered array of transactions

// Function to filter transactions by date range
// Parameters: transactions array, startDate (optional), endDate (optional)
// Returns: filtered array of transactions within the date range

// Function to filter transactions by status
// Parameters: transactions array, status
// Returns: filtered array of transactions matching the status

// Function to combine multiple filters
// Parameters: transactions array, filters object with optional amount, date, and status filters
// Returns: filtered array of transactions matching all provided filters
```

**Expected Outcome:**
- Copilot should generate complete function implementations
- Functions should have proper TypeScript typing
- Logic should handle optional parameters correctly

**Verification:**
- Check that functions compile without errors (`yarn types`)
- Manually test with sample data

---

## 💬 Exercise 2: Inline Chat

**Skill:** Quick code edits and refactoring with Copilot inline chat

### Task: Add Error Handling to API Routes

**Location:** `backend/transaction-routes.ts`

**Instructions:**
1. Open `backend/transaction-routes.ts`
2. Find the POST `/transactions` route handler
3. Select the route handler code block
4. Open Inline Chat: `Cmd+I` (Mac) or `Ctrl+I` (Windows/Linux)
5. Type: "Add comprehensive error handling with appropriate HTTP status codes and error logging"
6. Review and accept changes

**Expected Outcome:**
- Try-catch blocks added where needed
- Proper error responses with status codes (400, 404, 500)
- Error logging implemented
- Original functionality preserved

---

## 🤔 Exercise 3: Copilot Chat - Ask Mode

**Skill:** Understanding code and getting explanations

### Task: Understand the Transaction Flow

**Instructions:**
1. Open `backend/transaction-routes.ts`
2. Find the POST route for creating transactions
3. Select the entire route handler code
4. Open Copilot Chat panel
5. In chat, type:
   ```
   @workspace /explain How does the transaction creation flow work from API request to database storage? Include validation, authentication, and error handling.
   ```

**Expected Outcome:**
- Clear explanation of the end-to-end transaction flow
- Mentions of validation middleware, authentication checks, and database operations
- References to relevant files and functions (validators, database.ts, helpers.ts)
- Understanding of how different parts connect together

**Follow-up Questions to Try:**
- "What happens if a transaction fails validation?"
- "How is the user authenticated in this route?"
- "Where is the transaction data persisted?"

---

## ✏️ Exercise 4: Copilot Chat - Edit Mode

**Skill:** Direct code modifications through chat

### Task: Add Input Validation to Bank Account Form

**Location:** `src/components/BankAccountForm.tsx`

**Instructions:**
1. Open `src/components/BankAccountForm.tsx`
2. Select the form input handling code (including the input fields and submit handler)
3. Open Copilot Chat in **Edit mode**
4. Type:
   ```
   Add client-side validation:
   - Bank name: required, minimum 2 characters
   - Account number: required, numeric only, 8-12 digits
   - Routing number: required, exactly 9 digits
   
   Display error messages below each field using Material-UI FormHelperText.
   Prevent form submission if validation fails.
   ```

**Expected Outcome:**
- Validation logic added to form with proper state management
- Error messages displayed conditionally below inputs
- TypeScript types updated appropriately
- Form submission blocked when validation fails
- Uses existing Material-UI patterns in the project

**Verification:**
```bash
yarn types
yarn start
# Test the form in browser with invalid inputs
```

---

## 🤖 Exercise 5: Copilot Chat - Agent Mode

**Skill:** Complex multi-file tasks with automated planning

### Task: Add Transaction Search Feature

**Location:** Multiple files across frontend and backend

**Instructions:**
1. Open Copilot Chat
2. Use the `@workspace` agent
3. Type:
   ```
   @workspace Implement a transaction search feature:
   
   Backend (backend/transaction-routes.ts):
   - Add GET /transactions/search endpoint
   - Support query parameter: searchTerm (searches in description field)
   - Return matching transactions with pagination
   - Use existing authentication and validation patterns
   
   Frontend:
   - Create SearchBar component in src/components/SearchBar.tsx with Material-UI TextField
   - Add search input with debouncing (300ms) to avoid excessive API calls
   - Display search results using existing TransactionList component
   - Add to TransactionsTabs or appropriate container
   
   Follow existing code patterns and TypeScript conventions in the project.
   ```

**Expected Outcome:**
- Agent plans changes across multiple files
- New backend route with proper validation and auth middleware
- React component created with proper TypeScript types
- Search integrated into existing UI
- Debouncing implemented (using lodash or custom hook)
- Code follows project conventions (JSDoc, naming, structure)

**Verification:**
```bash
yarn types
yarn start
# Test search functionality in the UI
# Try searching for transaction descriptions
```

**What to Observe:**
- How the agent breaks down the task into steps
- File organization and imports
- Integration with existing code
- Error handling and edge cases

---

## 🎓 Best Practices Learned

After completing these exercises, you should understand:

1. **Code Suggestions:**
   - Write clear, descriptive comments
   - Let Copilot complete implementations
   - Review and refine suggestions

2. **Inline Chat:**
   - Quick edits without switching context
   - Select relevant code before prompting
   - Use for focused, single-file changes

3. **Ask Mode:**
   - Understand unfamiliar code
   - Learn project patterns
   - Get explanations without modifications

4. **Edit Mode:**
   - Direct code modifications
   - Specific feature requests
   - Incremental improvements

5. **Agent Mode:**
   - Complex, multi-file tasks
   - Coordinated changes across layers
   - Maintains project consistency
   - Automated testing validation

---

## 🔍 Tips for Success

- **Be Specific:** The more detailed your prompt, the better the output
- **Provide Context:** Use `@workspace`, `#file`, or `#selection` when needed
- **Iterate:** Don't expect perfection on first try—refine and iterate
- **Review Carefully:** Always review generated code before accepting
- **Follow Patterns:** Reference existing code patterns in your prompts
- **Test Early:** Run `yarn types` and tests frequently

---

## 📝 Additional Challenges

Want more practice? Try these:

1. **Add Transaction Tags** (Agent Mode): Allow users to add custom tags to transactions
2. **Create API Response Types** (Edit Mode): Standardize all API responses with TypeScript interfaces
3. **Add Relative Time Display** (Inline Chat): Show "2 hours ago" instead of full timestamps

---

## ✅ Completion Checklist

- [ ] Exercise 1: Generated code using inline comments
- [ ] Exercise 2: Used inline chat for code edits
- [ ] Exercise 3: Asked Copilot to explain code
- [ ] Exercise 4: Modified code using Edit mode
- [ ] Exercise 5: Completed multi-file task with Agent mode
- [ ] All code compiles without TypeScript errors (`yarn types`)
- [ ] Tested new features in running application
- [ ] Understand when to use each Copilot mode

---

## 🚀 Next Steps

Once you've mastered these basics, proceed to:
- **Module 03: Chat Participants** (@workspace, @terminal, @github)
- **Module 04: Advanced Prompting Techniques**
- **Module 05: Test-Driven Development with Copilot**


