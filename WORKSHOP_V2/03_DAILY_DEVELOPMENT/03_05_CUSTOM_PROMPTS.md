# GitHub Copilot Prompt Files Workshop

Learn how to create and use **prompt files** to streamline your development workflow and maintain consistency across your codebase.

---

## 🎨 What Are Prompt Files?

Prompt files (`.github/copilot-prompts/*.md`) are reusable, shareable instructions that:
- Are stored in your repository and version-controlled
- Can be invoked directly in GitHub Copilot Chat with `#` command
- Define reusable patterns for common development tasks
- Maintain consistency across team members
- Save time by eliminating repetitive context-setting
- Support structured instructions with frontmatter

**Key Feature:** Prompt files appear in Copilot Chat suggestions and can be easily invoked by typing `#` in the chat.

---

## 📂 Prompt Files Structure

### Location
```
.github/
  copilot-prompts/
    form-component.md
    api-route.md
    unit-test.md
    bug-fix.md
```

### File Format
Each prompt file contains:
```markdown
---
description: Brief description shown in Copilot Chat
---

# Prompt Title

[Detailed instructions for Copilot]
[Can include code examples]
[Can reference project patterns]
[Can guide what user should provide]
```

### How to Use
1. Create `.md` file in `.github/copilot-prompts/`
2. Add frontmatter with description
3. Write detailed instructions
4. In Copilot Chat, type `#` to see your prompts
5. Select prompt and provide required details

---
---

### Task #1: Create a Form Component Prompt File

**Scenario:**
Your team frequently creates form components that follow the same pattern. Each time someone needs a new form, they spend time explaining the pattern to Copilot. You want to create a **prompt file** that can be invoked with `#form-component` in Copilot Chat.

**Context:**
Existing form patterns in the codebase:
- **CommentForm.tsx:** Simple single-field form
- **BankAccountForm.tsx:** Multi-field form with complex validation
- Both use: Material-UI styled components (PREFIX pattern), Formik, Yup validation, TypeScript interfaces

**Your Task:**
Create `.github/copilot-prompts/form-component.md` that generates form components matching the project's patterns.

**Prompt File Requirements:**

1. **Frontmatter**
   ```yaml
   ---
   description: Generate a form component following project patterns
   ---
   ```

2. **Instructions Should Include:**
   - Reference to existing pattern files (CommentForm.tsx, BankAccountForm.tsx)
   - Material-UI styled components with PREFIX pattern
   - Formik for form handling, Yup for validation
   - TypeScript interfaces for props and payload
   - data-test attributes for all interactive elements
   - Field-level error display
   - Proper theme spacing

3. **Guidance on What User Should Provide:**
   - Component name
   - List of fields (name, type, validation rules)
   - Props interface requirements
   - Submit handler payload type

4. **Example in the Prompt:**
   - Show a sample field specification
   - Include validation rule examples

**Questions to Consider:**
1. How do you structure the prompt so users know what to specify?
2. Should you include code snippets as examples?
3. How do you ensure consistency without being too rigid?
4. What validation patterns should be highlighted?

**Suggested Approach:**
- [ ] Create `.github/copilot-prompts/` directory
- [ ] Study CommentForm.tsx and BankAccountForm.tsx patterns
- [ ] Write `form-component.md` with frontmatter
- [ ] Include clear instructions and examples
- [ ] Test by typing `#form-component` in Copilot Chat
- [ ] Generate 2 different forms to validate
- [ ] Refine based on results

**Success Criteria:**
- File appears when typing `#` in Copilot Chat
- Prompt generates components that compile without errors
- Generated forms follow Material-UI + Formik pattern
- All required elements (data-test, validation, etc.) are present
- Team members can easily use it for new forms

---

### Task #2: Craft a Precision Prompt for Complex Component
- Team members can understand and follow the guidelines

---

### Task #2: Create a Custom Form Component with Prompt Engineering

**Scenario:**
You need to create a `BankTransferForm` component that follows the exact same pattern as existing forms like `CommentForm.tsx` and `BankAccountForm.tsx`. Instead of manually coding it, you want to use a well-crafted prompt to generate it correctly the first time.

**Context:**
Existing patterns in the codebase:
- **CommentForm:** Simple form with Formik, Material-UI TextField, validation
- **BankAccountForm:** Multi-field form with proper TypeScript interfaces
- **Styling:** Uses Material-UI styled components with PREFIX pattern
- **Validation:** Yup schemas for client-side validation
- **Props:** Clear TypeScript interfaces

**Your Task:**
Write a custom prompt (in Chat) that will generate a complete, production-ready `BankTransferForm` component.

**Form Requirements:**
- **Fields:**
  - `bankAccountId` (dropdown/select of user's bank accounts)
  - `amount` (number input, min 0.01, max 5000)
  - `description` (text field, max 100 characters)
  
- **Validation Rules:**
  - Amount: required, number, min 0.01, max 5000
  - BankAccountId: required, must be valid UUID
  - Description: required, string, max 100 characters

- **Props Interface:**
  ```typescript
  interface BankTransferFormProps {
    bankAccounts: BankAccount[];
    onSubmit: (values: BankTransferPayload) => void;
  }
  ```

- **Styling:** Follow the same PREFIX pattern as `CommentForm`
- **File Location:** `src/components/BankTransferForm.tsx`

**Questions to Consider:**
1. How do you reference existing patterns in your prompt?
2. Should you include file paths to similar components?
3. How specific should validation rules be in the prompt?
4. What information does Copilot need to match the style?

**Suggested Approach:**
- [ ] Study `CommentForm.tsx` and `BankAccountForm.tsx` thoroughly
- [ ] Draft your custom prompt with:
   - Clear requirements
   - Reference to existing patterns
   - Specific validation rules
   - TypeScript interface requirements
- [ ] Use EDIT or AGENT mode with your prompt
- [ ] Verify the generated code compiles
- [ ] Check that it matches existing component patterns

**Example Prompt Structure:**
```
Create a BankTransferForm component following the pattern in CommentForm.tsx:
- Use Material-UI styled components with PREFIX pattern
- Formik for form handling
- Yup for validation schema
- TypeScript interfaces for props
- [specific fields and validation rules]
```

**Success Criteria:**
- Component compiles without TypeScript errors
- Uses Material-UI styled components pattern
- Formik + Yup validation works correctly
- Matches code style of existing forms
- All required fields are validated properly

---

### Task #3: Generate Consistent API Route with Custom Prompt Template
### Task #3: Create API Route Generation Prompt Template
**Scenario:**
You're adding a new feature: **bank transfer history**. You need to create a new API endpoint that follows the exact same patterns as existing routes in `backend/transaction-routes.ts` and `backend/bankaccount-routes.ts`.

**Context:**
Existing route patterns include:
- Express Router with TypeScript
- Route validation using express-validator
- Consistent error handling patterns
- Database operations via centralized utilities
- RESTful endpoint naming
- Proper HTTP status codes

**Your Task:**
Create a reusable prompt template for generating new API routes, then use it to create `backend/banktransfer-routes.ts`.

**New Endpoint Requirements:**

**GET `/banktransfers`** - List bank transfers for authenticated user
- Query params: `?page=1&limit=10` (pagination)
- Returns: Array of bank transfer records
- Auth: Required (check `req.user`)

**GET `/banktransfers/:id`** - Get specific bank transfer
- Params: `id` (UUID)
- Returns: Single bank transfer object
- Auth: Required + ownership check
- Error: 404 if not found, 403 if not owner

**POST `/banktransfers`** - Create new bank transfer
- Body validation: `bankAccountId`, `amount`, `description`
- Validators: Use `isBankTransferValidator` (to be created)
- Business logic:
  - Check sufficient funds in bank account
  - Deduct from bank account balance
  - Create transfer record
- Returns: Created transfer object (201)
- Errors: 400 for validation, 402 for insufficient funds

**Prompt Template to Create:**
Your template should guide Copilot to generate routes that include:
1. Proper imports (express, validators, database utils)
2. Router initialization
3. Route handlers with TypeScript types
4. Express-validator middleware
5. Consistent error handling
6. Proper HTTP status codes
7. Database operations via utilities
8. Authentication checks
9. JSDoc comments for each route

**Questions to Consider:**
1. Should your template include specific file references?
2. How do you ensure validation follows the existing pattern?
3. What level of detail helps Copilot generate better code?
4. Should you generate all routes at once or one at a time?

**Suggested Approach:**
- [ ] Analyze existing route files (`transaction-routes.ts`, `contact-routes.ts`)
- [ ] Identify common patterns and structure
- [ ] Create a reusable prompt template (save in a file or document)
- [ ] Use AGENT mode to generate the complete route file
- [ ] Create the corresponding validator in `backend/validators.ts`
- [ ] Verify routes compile and follow patterns
- [ ] Test with curl or Postman

**Example Template Structure:**
```
Create a new Express route file following the pattern in [reference files]:

**Route File:** backend/[name]-routes.ts
**Base Path:** /[resource]
**Authentication:** Required for all routes

Include:
- TypeScript imports and types
- Express Router initialization  
- Validator middleware from validators.ts
- Database utility functions
- Error handling with proper status codes
- JSDoc comments

Routes to implement:
1. GET /[resource] - [description]
   - Query params: [params]
   - Returns: [return type]
   - Validation: [rules]

[continue for each route...]
```

**Success Criteria:**
- Route file compiles without errors
- Follows existing route patterns exactly
- Uses proper validators from `validators.ts`
- Error handling matches existing routes
- All routes have JSDoc comments
- HTTP status codes are appropriate
- Database operations use utility functions

---

## 🎓 Custom Prompt Best Practices

### ✅ DO:
- **Be specific** about patterns and conventions
- **Reference existing files** for context
- **Include examples** of desired output
- **Specify frameworks/libraries** used
- **Define error handling** expectations
- **Use TypeScript types** when applicable
- **Test your prompts** and iterate

### ❌ DON'T:
- **Be too vague** - "make it good" won't work
- **Contradict** existing code patterns
- **Omit important context** about the project
- **Forget edge cases** and error scenarios
- **Ignore existing validation** patterns
- **Mix different styles** in one prompt

---

## 💡 Prompt Engineering Tips

### 1. **Layer Your Context**
```
Global: .github/copilot-instructions.md (project conventions)
   ↓
## 💡 Prompt Engineering Tips

### 1. **Reference Existing Code** utilities, not raw SQL"
- "Validators must be in `validators.ts` file"
- "Error messages must match existing format"

### 4. **Include Success Criteria**
- "Component should compile without TypeScript errors"
- "All routes should have proper authentication checks"
- "Form should match the styling of BankAccountForm"

### 5. **Iterate and Refine**
- Generate → Review → Adjust prompt → Regenerate
- Save working prompts for reuse
- Build a prompt library for common tasks

### 2. **Specify Constraints**
- "Must use existing `database.ts` utilities, not raw SQL"
- "Validators must be in `validators.ts` file"
- "Error messages must match existing format"

### 3. **Include Success Criteria**
- "Component should compile without TypeScript errors"
- "All routes should have proper authentication checks"
- "Form should match the styling of BankAccountForm"

### 4. **Iterate and Refine**
- Generate → Review → Adjust prompt → Regenerate
- Save working prompts for reuse
- Build a prompt library for common tasks

---

## 🔄 Workflow: Creating Reusable Prompt Templates

1. **Identify Repeated Tasks**
   - Creating forms with validation
   - Adding API routes
   - Writing tests for components
   - Building data utilities

2. **Extract Common Patterns**
   - Study 3-5 examples of the pattern
   - Document the structure
   - Note required imports and dependencies

3. **Write Template Prompt**
   - Clear structure with placeholders
   - Reference existing examples
   - Include validation/error handling
   - Specify success criteria

4. **Test and Refine**
   - Use template for new task
   - Review generated code quality
   - Adjust template based on results
   - Save refined version

5. **Share with Team**
   - Save templates in team documentation
   - Document in project README or wiki
   - Create prompt library in shared drive/repo
   - Include examples of filled-in templates

---

## ✅ After Completing Tasks

Check [03_05a_SOLUTIONS.md](./03_05a_SOLUTIONS.md) to review:
   - Example prompt templates for each task
   - Well-crafted prompts with explanations
   - Tips for prompt refinement
   - Common pitfalls to avoid
   - Reusable templates you can adapt

---

## 🎯 Key Takeaways

1. **Reusable prompts** save time on repetitive tasks
2. **Well-crafted prompts** generate better code faster
3. **Reference existing code** instead of describing patterns
4. **Be specific** about validation, errors, and edge cases
5. **Iterate and refine** your prompts based on results
6. **Build a library** of proven prompts for common tasks
7. **Share with team** to maintain consistency

---

## 🚀 Next Steps

After mastering custom prompts:
1. Create a prompt library for your team
2. Build templates for frequent tasks (forms, routes, tests)
3. Share successful prompts in team documentation
4. Continuously refine based on code review feedback
5. Measure time saved and code quality improvements

Remember: **Good prompts = Consistent code = Less debugging = Faster development**
