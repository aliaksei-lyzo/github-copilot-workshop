# Chat Modes in GitHub Copilot

GitHub Copilot Chat offers three powerful modes to interact with AI assistance: **Ask**, **Edit**, and **Agent**. Each mode serves different purposes in your development workflow.

---

## 🎯 Mode Overview

- **Ask Mode** (`@workspace`) - Ask questions, explore codebase, get explanations
- **Edit Mode** - Generate code changes with preview before applying
- **Agent Mode** - Complex multi-step tasks executed autonomously

---

## 📚 Task 1: Ask Mode - Understanding the Codebase

**Objective:** Use Ask mode to explore and understand existing code without making changes.

### Exercise 1.1: Explore Architecture
**Prompt:**
```
@workspace How is authentication implemented in this application? Which files are involved?
```

**Expected Learning:** Discover authentication flow, identify key files, and understand the architecture.

---

### Exercise 1.2: Find Transaction Logic
**Prompt:**
```
@workspace Where is the transaction creation logic? Explain the flow from user action to database.
```

**Expected Learning:** Trace data flow through components, API routes, and database utilities.

---

## ✏️ Task 2: Edit Mode - Code Generation with Preview

**Objective:** Use Edit mode to generate code changes that you can review before applying.

### Exercise 2.1: Add Logging to Transaction API
**Instructions:**
1. Open `backend/transaction-routes.ts`
2. Select the transaction creation endpoint function
3. Use Edit mode

**Prompt:**
```
Add console logging before and after the transaction is created to track timing
```

**Expected Learning:** Generate precise code modifications with context awareness.

---

### Exercise 2.2: Add Validation to Form
**Instructions:**
1. Open `src/components/TransactionCreateStepOne.tsx`
2. Select the validation logic section
3. Use Edit mode

**Prompt:**
```
Add validation to ensure the transaction amount is greater than 0 and less than 10000
```

**Expected Learning:** Modify existing validation logic safely.

---

## 🤖 Task 3: Agent Mode - Complex Multi-Step Tasks

**Objective:** Use Agent mode to execute complex tasks that require multiple file modifications and reasoning.

### Exercise 3.1: Add Transaction Search
**Prompt:**
```
Implement a search feature for transactions that:
1. Adds a search endpoint in the backend that searches by description
2. Creates a search input component
3. Updates the transaction list to support search
4. Uses the existing Fuse.js library that's already in the project

Keep the current transaction display logic intact.
```

**Expected Learning:** Agent integrates new features while respecting existing architecture.

---

### Exercise 3.2: Add Transaction Export
**Prompt:**
```
Add the ability to export transactions to CSV format:
1. Create a backend route that generates CSV from transactions
2. Add an export button to the transaction list
3. Trigger download of CSV file when clicked
4. Include transaction date, amount, sender, receiver, and description

Use the existing transaction filtering logic.
```

**Expected Learning:** Agent creates full-stack features across multiple layers.

---

## 💡 Best Practices for Each Mode

### Ask Mode Tips
- ✅ Use `@workspace` for codebase-wide questions
- ✅ Ask about architecture, patterns, and dependencies
- ✅ Request explanations before making changes
- ❌ Don't use for generating code

### Edit Mode Tips
- ✅ Select relevant code before editing
- ✅ Review the diff before applying
- ✅ Use for focused, single-file changes
- ❌ Don't use for multi-file refactoring

### Agent Mode Tips
- ✅ Provide clear, complete requirements
- ✅ Mention existing patterns to follow
- ✅ Use for features spanning multiple files
- ❌ Don't use for simple one-line changes

---

## 🎓 Challenge Tasks

### Challenge 1: Mystery Bug Investigation (Ask + Edit)
1. Use Ask mode: "Find potential bugs in the transaction validation logic"
2. Use Edit mode to fix any issues found

### Challenge 2: Performance Optimization (Agent)
**Prompt:**
```
Analyze the transaction list rendering performance and optimize it:
- Identify performance bottlenecks
- Implement React.memo where appropriate
- Add pagination if transactions list is large
- Ensure the virtualized list works efficiently
```

### Challenge 3: Full Feature Implementation (All Modes)
1. **Ask**: "How are notifications currently implemented?"
2. **Edit**: Add a new notification type for failed transactions
3. **Agent**: Implement a notification center with unread count badge

---

## 📝 Reflection Questions

After completing these tasks, consider:

1. When did Ask mode give you the most value?
2. Which Edit mode task was most productive?
3. How did Agent mode handle complex requirements?
4. Which mode would you use for your daily work?

---

## 🔑 Key Takeaways

- **Ask Mode** is perfect for exploration and learning
- **Edit Mode** excels at focused code modifications
- **Agent Mode** handles complex, multi-step implementations
- Combining all three modes creates a powerful workflow
