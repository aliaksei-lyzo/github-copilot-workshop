# Custom Prompts Workshop - Solutions & Examples

This file contains solutions, example prompts, and guidance for the Custom Prompts workshop tasks.

---

## Task #1: Create a Reusable Component Generation Prompt

### 🎯 Recommended Approach

**Mode Selection:** Study existing code → Create template → Test with EDIT/AGENT mode

1. **Analyze** existing form components (CommentForm, BankAccountForm)
2. **Extract** common patterns and variable parts
3. **Create** a template with clear placeholders
4. **Test** by generating 2-3 different forms
5. **Refine** based on generated code quality

### 📝 Example Reusable Prompt Template

Save this template for future use:

````markdown
# Form Component Generation Template

Generate a form component in `src/components/[ComponentName].tsx` following the pattern in `CommentForm.tsx` and `BankAccountForm.tsx`.

## Component Specifications

**Component Name:** [ComponentName] (e.g., BankTransferForm, SearchForm, ProfileEditForm)

**Props Interface:**
```typescript
interface [ComponentName]Props {
  [prop1]: [type];
  [prop2]: [type];
  onSubmit: (values: [PayloadType]) => void;
}

interface [PayloadType] {
  [field1]: [type];
  [field2]: [type];
}
```

## Form Fields

[For each field, specify:]

### Field: [fieldName]
- **Type:** [text | number | select | textarea | email | password]
- **Label:** "[Display Label]"
- **Validation:** [required | optional], [specific rules]
- **data-test:** "[component-name]-[field-name]-[input/select]"
- **Additional props:** [placeholder, min, max, etc.]

## Validation Schema (Yup)

```typescript
const validationSchema = object({
  [field1]: [validation rules with error messages],
  [field2]: [validation rules with error messages],
});
```

## Standard Requirements

1. **Material-UI Styling**
   - Use `styled` from "@mui/material/styles"
   - PREFIX pattern: `const PREFIX = "[ComponentName]";`
   - Define classes object
   - Root wrapper component
   - Full width form
   - Field spacing: theme.spacing(2)

2. **Formik Setup**
   - initialValues with all fields
   - validationSchema from Yup
   - onSubmit handler with setSubmitting

3. **Field Components**
   - Use Material-UI TextField/Select
   - Show errors only when touched
   - Include helperText for errors
   - Proper data-test attributes

4. **TypeScript**
   - Explicit interfaces for props
   - No `any` types
   - Import all types properly

## Example Usage

For a "ContactForm" with name and email fields, fill template like:
- **ComponentName:** ContactForm
- **Props:** contactId: string, onSubmit: (values: ContactPayload) => void
- **Fields:** 
  - name: text, required, max 50 chars
  - email: email, required, valid email format
````

### 🧪 Testing Your Template

Use the template to generate two different forms:

**Test 1: Simple Search Form**
```
Using the form component template, create SearchForm with:
- searchQuery field (text, required, min 3 chars)
- category field (select: "all" | "users" | "transactions")
- onSubmit: (values: SearchPayload) => void
```

**Test 2: Bank Transfer Form**
```
Using the form component template, create BankTransferForm with:
- bankAccountId field (select from props.bankAccounts)
- amount field (number, required, min 0.01, max 5000)
- description field (text, required, max 100 chars)
- onSubmit: (values: BankTransferPayload) => void
```

### ✅ Success Indicators

Your template is effective if:
- ✅ Both generated forms compile without errors
- ✅ Both follow the PREFIX styling pattern
- ✅ All fields have proper validation
- ✅ data-test attributes are present
- ✅ Code style matches existing forms
- ✅ You only needed to fill placeholders, not write new instructions

---

## Task #2: Craft a Precision Prompt for Complex Component

### 🎯 Recommended Approach

**Mode Selection:** EDIT or AGENT mode with detailed prompt

### 📝 Example Prompt (Recommended)

```
Create a BankTransferForm component in src/components/BankTransferForm.tsx following the exact pattern used in CommentForm.tsx and BankAccountForm.tsx.

**Requirements:**

1. TypeScript with proper interfaces
2. Material-UI styled components using PREFIX pattern (PREFIX = "BankTransferForm")
3. Formik for form handling
4. Yup validation schema

**Props Interface:**
```typescript
interface BankTransferFormProps {
  bankAccounts: BankAccount[];
  onSubmit: (values: BankTransferPayload) => void;
}

interface BankTransferPayload {
  bankAccountId: string;
  amount: number;
  description: string;
}
```

**Form Fields:**

1. **bankAccountId** - Select/Dropdown
   - Label: "Bank Account"
   - Options: props.bankAccounts (show bankName + last 4 of accountNumber)
   - Validation: required
   - data-test: "bank-transfer-bank-account-select"

2. **amount** - Number Input
   - Label: "Amount"
   - Type: number
   - Validation: required, number, min 0.01, max 5000
   - data-test: "bank-transfer-amount-input"

3. **description** - Text Field
   - Label: "Description"
   - Type: text
   - Validation: required, string, max 100 characters
   - data-test: "bank-transfer-description-input"

4. **Submit Button**
   - Label: "Transfer Funds"
   - Variant: contained
   - Color: primary
   - data-test: "bank-transfer-submit-button"

**Styling:**
- Use Root styled component pattern
- Define classes for: form, field, submitButton
- Full width form
- Margin between fields: theme.spacing(2)
- Follow the exact styling pattern from CommentForm.tsx

**Validation Schema (Yup):**
- bankAccountId: string required
- amount: number required, min 0.01, max 5000, with custom error messages
- description: string required, max 100 chars

**Error Handling:**
- Show validation errors inline
- Use TextField error and helperText props
- Only show errors after field is touched

Make sure the component compiles with TypeScript and matches the code style of existing form components.
```

### ✅ Expected Output Quality

The generated component should:
- ✅ Compile without TypeScript errors
- ✅ Use Material-UI Select for bankAccountId dropdown
- ✅ Include all validation rules in Yup schema
- ✅ Follow PREFIX pattern for styled components
- ✅ Include proper data-test attributes
- ✅ Handle form submission with setSubmitting
- ✅ Display field-level errors

### 🔧 If the Output Isn't Perfect

**Common issues and fixes:**

1. **Wrong styling pattern:**
   - Prompt: "Update the styling to match the PREFIX pattern in CommentForm.tsx exactly"

2. **Missing validation:**
   - Prompt: "Add Yup validation with min/max constraints for amount field"

3. **Dropdown not using Select:**
   - Prompt: "Change the bankAccountId field to use Material-UI Select component with MenuItem options"

4. **Missing data-test attributes:**
   - Prompt: "Add data-test attributes to all input fields and the submit button"

### 💡 Tips for Better Results

- **Reference specific files** instead of just describing patterns
- **Include TypeScript interfaces** in the prompt
- **Be explicit about validation rules** (don't just say "validate")
- **Specify Material-UI components** by name (Select, TextField, Button)
- **Ask for data-test attributes** upfront

---

## Task #3: Create API Route Generation Prompt Template

### 🎯 Recommended Approach

**Mode Selection:** AGENT mode (multi-file generation) or step-by-step EDIT mode

### 📝 Reusable Prompt Template

```markdown
# Express Route Generation Template

Create a new Express route file following the pattern in `backend/transaction-routes.ts` and `backend/contact-routes.ts`.

**Route File:** backend/[RESOURCE_NAME]-routes.ts
**Base Path:** /[RESOURCE_PATH]
**Authentication:** Required for all routes

## Structure

1. **Imports**
   - Express types: `Router, Request, Response`
   - express-validator: `validationResult`
   - Authentication middleware: `ensureAuthenticated`
   - Database utilities from `./database`
   - Validators from `./validators`
   - Type definitions from `../src/models`

2. **Router Initialization**
   ```typescript
   const router = Router();
   ```

3. **Route Handlers**
   - Each route should have JSDoc comment
   - Apply ensureAuthenticated middleware
   - Apply validation middleware
   - Check validation results
   - Use database utility functions (never raw queries)
   - Return appropriate HTTP status codes
   - Handle errors with try-catch if async

4. **Export**
   ```typescript
   export default router;
   ```

## Routes to Implement

[List each route with:]
- **Method and Path:** GET /resource/:id
- **Description:** Brief description
- **Auth:** Required/Optional
- **Validation:** Query/body parameters to validate
- **Response:** What it returns and status code
- **Errors:** Possible error responses
- **Business Logic:** Any special rules or checks

## Validation

Create corresponding validators in `backend/validators.ts`:
- Follow existing patterns (isTransactionPayloadValidator, etc.)
- Use express-validator: body(), query(), check()
- Export validators with descriptive names

## Error Handling

Use these HTTP status codes:
- 200: Success (GET, PATCH, DELETE)
- 201: Created (POST)
- 400: Validation error
- 401: Not authenticated
- 403: Forbidden (not authorized)
- 404: Not found
- 422: Business logic error

## Examples to Reference
- `backend/transaction-routes.ts` - comprehensive route examples
- `backend/contact-routes.ts` - simple CRUD patterns
- `backend/validators.ts` - validation patterns
```

### 📝 Specific Prompt for Task #3

```
Using the Express route template above, create backend/banktransfer-routes.ts with these routes:

---

**GET /banktransfers**
- Description: Get paginated list of bank transfers for authenticated user
- Auth: Required (ensureAuthenticated)
- Query Params:
  - page: number (default 1)
  - limit: number (default 10)
- Response: Array of BankTransfer objects (200)
- Business Logic:
  - Only return transfers owned by authenticated user (req.user.id)
  - Support pagination with page/limit

---

**GET /banktransfers/:transferId**
- Description: Get specific bank transfer by ID
- Auth: Required + ownership check
- Params: transferId (must be valid shortId)
- Response: Single BankTransfer object (200)
- Errors:
  - 404: Transfer not found
  - 403: Transfer belongs to different user

---

**POST /banktransfers**
- Description: Create new bank transfer
- Auth: Required
- Validation: isBankTransferPayloadValidator
- Body:
  - bankAccountId: string (required, valid shortId)
  - amount: number (required, min 0.01, max 5000)
  - description: string (required, max 100 chars)
- Response: Created BankTransfer object (201)
- Errors:
  - 400: Validation errors
  - 404: Bank account not found
  - 403: Bank account not owned by user
  - 422: Insufficient funds in bank account
- Business Logic:
  1. Verify bank account exists and belongs to user
  2. Check bank account balance >= amount
  3. Deduct amount from bank account balance
  4. Create transfer record with status "complete"
  5. Return created transfer

---

**Also create in backend/validators.ts:**

```typescript
export const isBankTransferPayloadValidator = [
  body("bankAccountId").custom(isShortId),
  body("amount").isNumeric().toFloat().custom((value) => {
    if (value < 0.01 || value > 5000) {
      throw new Error("Amount must be between 0.01 and 5000");
    }
    return true;
  }),
  body("description").isString().trim().isLength({ max: 100 }),
];
```

**Database utilities needed** (add to backend/database.ts if not exists):
- getBankTransfersByUserId(userId, page, limit)
- getBankTransferById(transferId)
- createBankTransfer(payload)
- getBankAccountById(bankAccountId)
- updateBankAccountBalance(bankAccountId, newBalance)

Follow the exact pattern used in transaction-routes.ts for error handling, status codes, and response format.
```

### ✅ Expected Code Structure

```typescript
import { Router, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ensureAuthenticated } from "./helpers";
import {
  getBankTransfersByUserId,
  getBankTransferById,
  createBankTransfer,
  getBankAccountById,
  updateBankAccountBalance,
} from "./database";
import { isBankTransferPayloadValidator, shortIdValidation } from "./validators";

const router = Router();

/**
 * @description Get paginated list of bank transfers for authenticated user
 * @route GET /banktransfers
 * @query page, limit
 */
router.get(
  "/banktransfers",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const transfers = getBankTransfersByUserId(req.user!.id, page, limit);
    res.status(200).json(transfers);
  }
);

/**
 * @description Get specific bank transfer by ID
 * @route GET /banktransfers/:transferId
 */
router.get(
  "/banktransfers/:transferId",
  ensureAuthenticated,
  shortIdValidation("transferId"),
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const transfer = getBankTransferById(req.params.transferId);
    
    if (!transfer) {
      return res.status(404).json({ errors: [{ message: "Bank transfer not found" }] });
    }

    if (transfer.userId !== req.user!.id) {
      return res.status(403).json({ errors: [{ message: "Forbidden" }] });
    }

    res.status(200).json(transfer);
  }
);

/**
 * @description Create new bank transfer
 * @route POST /banktransfers
 */
router.post(
  "/banktransfers",
  ensureAuthenticated,
  isBankTransferPayloadValidator,
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { bankAccountId, amount, description } = req.body;
    
    // Verify bank account exists and belongs to user
    const bankAccount = getBankAccountById(bankAccountId);
    if (!bankAccount) {
      return res.status(404).json({ errors: [{ message: "Bank account not found" }] });
    }

    if (bankAccount.userId !== req.user!.id) {
      return res.status(403).json({ errors: [{ message: "Bank account not owned by user" }] });
    }

    // Check sufficient funds
    if (bankAccount.balance < amount) {
      return res.status(422).json({ 
        errors: [{ message: "Insufficient funds in bank account" }] 
      });
    }

    // Deduct from bank account
    const newBalance = bankAccount.balance - amount;
    updateBankAccountBalance(bankAccountId, newBalance);

    // Create transfer
    const transfer = createBankTransfer({
      userId: req.user!.id,
      bankAccountId,
      amount,
      description,
      status: "complete",
    });

    res.status(201).json(transfer);
  }
);

export default router;
```

### 🔄 Iterative Refinement

If the generated code isn't perfect:

1. **Missing error handling:**
   ```
   Add error handling for the case where bank account doesn't exist (404) 
   and when it's not owned by the user (403)
   ```

2. **Wrong status codes:**
   ```
   Change the insufficient funds error to return 422 instead of 400
   ```

3. **Missing validation checks:**
   ```
   Add validation to check that validationResult has no errors before proceeding
   ```

4. **Not following patterns:**
   ```
   Update to match the error response format used in transaction-routes.ts: 
   { errors: [{ message: "..." }] }
   ```

---

## 💡 Key Learnings

### What Makes a Good Custom Prompt?

1. **Specific References**
   - ✅ "Follow the pattern in CommentForm.tsx"
   - ❌ "Create a form component"

2. **Clear Requirements**
   - ✅ "Amount: number, min 0.01, max 5000"
   - ❌ "Validate the amount"

3. **Context About Tech Stack**
   - ✅ "Use Material-UI Select component"
   - ❌ "Use a dropdown"

4. **Examples and Structure**
   - ✅ Include TypeScript interfaces
   - ✅ Show expected validation pattern
   - ❌ Just describe what you want

5. **Success Criteria**
   - ✅ "Should compile without TypeScript errors"
   - ✅ "Match the styling pattern of existing forms"

### Template vs. Ad-hoc Prompts

**Use Templates for:**
- Repeated tasks (adding routes, forms, tests)
- Maintaining consistency across codebase
- Onboarding new team members
- Complex multi-file generation

**Use Ad-hoc Prompts for:**
- One-off tasks
- Exploratory work
- Quick fixes
- Learning the codebase

---

## 🚀 Advanced Tips

---

## 💡 Key Learnings

Tell Copilot what NOT to do:
```
Create a new component following BankAccountForm.tsx.

DO NOT:
- Use class components
- Use inline styles
- Skip TypeScript interfaces
- Forget data-test attributes
```

### Validation Prompts

Ask Copilot to review its own output:
```
Review the generated BankTransferForm component and verify:
1. It follows Material-UI styled component pattern with PREFIX
2. All fields have Yup validation
3. TypeScript interfaces are properly defined
4. data-test attributes are present on all interactive elements
```

---

## ✅ Success Metrics

You've mastered custom prompts when:
- ✅ Generated code matches existing patterns 90%+ of the time
- ✅ You rarely need to manually fix TypeScript errors
- ✅ New developers can generate consistent code using your templates
- ✅ Code reviews have fewer style/pattern comments
- ✅ You spend more time on logic, less on boilerplate

---

## 📚 Additional Resources

- GitHub Copilot Custom Instructions: [Official Docs](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
- Prompt Engineering Guide: Best practices for writing effective prompts
- Your Project's Examples: The best resource is your own codebase!

---

**Remember:** The goal isn't to replace thinking with prompts—it's to **amplify your intent** and maintain consistency while moving faster.
