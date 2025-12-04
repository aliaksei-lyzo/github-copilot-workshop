# GitHub Copilot Unit Testing - Solutions & Explanations

This file contains detailed solutions and testing strategies for the tasks in [05_02_UNIT_TESTS.md](./05_02_UNIT_TESTS.md).

---

## Task #1: Write Tests for Transaction Utility Functions

### ✅ Recommended Approach: `ASK → AGENT` or `AGENT` directly

### Phase 1: Understanding (ASK Mode - Optional)

**Should you use ASK first?**
- **Optional** - If you're unfamiliar with the utility functions
- **Helpful** - To understand edge cases and expected behavior
- **Skip if** - You understand the functions well

**Investigation Prompts:**

1. **Understand the utilities:**
   ```
   @workspace Show me the transaction utility functions in transactionUtils.ts. 
   What do these functions do: hasSufficientFunds, getChargeAmount, formatFullName, 
   getPaginatedItems?
   ```

2. **Identify edge cases:**
   ```
   What edge cases should I test for the hasSufficientFunds and getPaginatedItems functions? 
   What could go wrong?
   ```

**Findings:**
- `hasSufficientFunds` - needs to handle: zero balance, exact amount, overflow
- `formatFullName` - needs to handle: missing fields, special characters
- `getPaginatedItems` - needs to handle: empty arrays, invalid page numbers, boundary conditions
- `getChargeAmount` - needs to handle: zero balance, exact amount, negative results

---

### Phase 2: Generate Tests (AGENT Mode)

**Why AGENT?**
- Need **comprehensive test suite** for multiple functions
- Want **both happy path and edge cases**
- Creating a **new test file** with proper structure
- Testing **related functions** together

**Recommended Prompt:**
```
@workspace Create comprehensive unit tests for transaction utility functions in src/utils/transactionUtils.ts.

Test these functions with Vitest:
1. hasSufficientFunds(sender, transaction) - test with sufficient funds, insufficient funds, exact amount, zero balance
2. getChargeAmount(sender, transaction) - test calculation accuracy, edge cases
3. formatFullName(user) - test normal names, missing fields, edge cases
4. hasDateQueryFields(query) - test with/without date fields, partial fields
5. getQueryWithoutFilterFields(query) - test filter removal, empty query
6. getPaginatedItems(page, limit, items) - test normal pagination, empty array, invalid page, boundary conditions

Create the test file at: src/__tests__/transactionUtils.test.ts

Include:
- Proper imports from Vitest
- Mock data for users and transactions
- Descriptive test names
- Clear assertions
- Edge case coverage

Follow the existing test patterns in src/__tests__/transactions.test.ts
```

---

### Expected Test Structure:

```typescript
import { describe, expect, it } from "vitest";
import {
  hasSufficientFunds,
  getChargeAmount,
  formatFullName,
  hasDateQueryFields,
  getQueryWithoutFilterFields,
  getPaginatedItems,
} from "../utils/transactionUtils";
import { User, Transaction, TransactionStatus } from "../models";

describe("Transaction Utility Functions", () => {
  // Mock data
  const mockUser: User = {
    id: "user123",
    firstName: "John",
    lastName: "Doe",
    balance: 10000,
    // ... other required fields
  };

  const mockTransaction: Transaction = {
    id: "trans123",
    amount: 5000,
    // ... other required fields
  };

  describe("hasSufficientFunds", () => {
    it("should return true when user has sufficient funds", () => {
      const result = hasSufficientFunds(mockUser, mockTransaction);
      expect(result).toBe(true);
    });

    it("should return false when user has insufficient funds", () => {
      const poorUser = { ...mockUser, balance: 1000 };
      const result = hasSufficientFunds(poorUser, mockTransaction);
      expect(result).toBe(false);
    });

    it("should return true when balance exactly equals transaction amount", () => {
      const exactUser = { ...mockUser, balance: 5000 };
      const result = hasSufficientFunds(exactUser, mockTransaction);
      expect(result).toBe(true);
    });

    it("should return false when user has zero balance", () => {
      const brokeUser = { ...mockUser, balance: 0 };
      const result = hasSufficientFunds(brokeUser, mockTransaction);
      expect(result).toBe(false);
    });
  });

  describe("getChargeAmount", () => {
    it("should calculate correct charge amount", () => {
      const result = getChargeAmount(mockUser, mockTransaction);
      expect(result).toBe(5000);
    });

    it("should return correct amount when balance is less than transaction", () => {
      const poorUser = { ...mockUser, balance: 3000 };
      const result = getChargeAmount(poorUser, mockTransaction);
      expect(result).toBe(2000); // abs(3000 - 5000)
    });
  });

  describe("formatFullName", () => {
    it("should format full name correctly", () => {
      const result = formatFullName(mockUser);
      expect(result).toBe("John Doe");
    });

    it("should handle names with spaces", () => {
      const user = { ...mockUser, firstName: "Mary Jane", lastName: "Watson" };
      const result = formatFullName(user);
      expect(result).toBe("Mary Jane Watson");
    });
  });

  describe("hasDateQueryFields", () => {
    it("should return true when both date fields exist", () => {
      const query = {
        dateRangeStart: "2024-01-01",
        dateRangeEnd: "2024-12-31",
      };
      const result = hasDateQueryFields(query);
      expect(result).toBe(true);
    });

    it("should return false when only dateRangeStart exists", () => {
      const query = { dateRangeStart: "2024-01-01" };
      const result = hasDateQueryFields(query);
      expect(result).toBe(false);
    });

    it("should return false when no date fields exist", () => {
      const query = {};
      const result = hasDateQueryFields(query);
      expect(result).toBe(false);
    });
  });

  describe("getQueryWithoutFilterFields", () => {
    it("should remove all filter fields", () => {
      const query = {
        amountMin: 100,
        amountMax: 500,
        dateRangeStart: "2024-01-01",
        dateRangeEnd: "2024-12-31",
        page: 1,
        limit: 10,
        status: "complete",
      };
      const result = getQueryWithoutFilterFields(query);
      expect(result).toEqual({ status: "complete" });
    });

    it("should handle empty query", () => {
      const result = getQueryWithoutFilterFields({});
      expect(result).toEqual({});
    });
  });

  describe("getPaginatedItems", () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    it("should return correct items for page 1", () => {
      const result = getPaginatedItems(1, 3, items);
      expect(result.data).toEqual([1, 2, 3]);
      expect(result.totalPages).toBe(4);
    });

    it("should return correct items for page 2", () => {
      const result = getPaginatedItems(2, 3, items);
      expect(result.data).toEqual([4, 5, 6]);
    });

    it("should handle last page with fewer items", () => {
      const result = getPaginatedItems(4, 3, items);
      expect(result.data).toEqual([10]);
    });

    it("should return empty array for page beyond total pages", () => {
      const result = getPaginatedItems(10, 3, items);
      expect(result.data).toEqual([]);
    });

    it("should handle empty items array", () => {
      const result = getPaginatedItems(1, 10, []);
      expect(result.data).toEqual([]);
      expect(result.totalPages).toBe(0);
    });
  });
});
```

---

### Phase 3: Validation

**Run the tests:**
```bash
yarn test:unit transactionUtils
```

**Check coverage:**
```bash
yarn test:unit --coverage
```

**Review:**
- ✅ All tests pass
- ✅ Edge cases covered
- ✅ Descriptive test names
- ✅ Clear assertions

---

### Key Learning

✅ **AGENT mode** created comprehensive test suite efficiently  
✅ **ASK mode** (optional) helped identify edge cases upfront  
✅ **Proper test structure** with describe blocks and clear assertions  
✅ **Mock data** kept tests isolated and fast  

**Task Type:** New test file creation  
**Difficulty:** Medium  
**Skills Practiced:** Test planning, edge case identification, comprehensive coverage

---

## Task #2: Add Missing Test Cases to Transaction Tests

### ✅ Recommended Approach: `ASK → EDIT` or `EDIT` directly

### Phase 1: Understanding (ASK Mode)

**Why ASK first?**
- Need to **understand existing test patterns**
- Want to **match the code style**
- Should learn **how database seeding works**
- Need to see **how similar tests are structured**

**Investigation Prompts:**

1. **Study existing patterns:**
   ```
   @workspace Show me the existing tests in src/__tests__/transactions.test.ts. 
   How are they structured? What patterns do they follow?
   ```

2. **Understand test data:**
   ```
   What test data is available after seedDatabase() is called? 
   How do I access users, transactions, and bank accounts in tests?
   ```

3. **Learn assertions:**
   ```
   Show me examples of how to test error conditions and edge cases 
   in the existing transaction tests.
   ```

**Findings:**
- Tests use `beforeEach(() => seedDatabase())`
- Access users with `getAllUsers()[index]`
- Tests use descriptive `it()` blocks
- Assertions use Vitest's `expect()` syntax
- Error cases can be tested with `.toThrow()` or by checking return values

---

### Phase 2: Add Test Cases (EDIT Mode)

**Why EDIT?**
- **Adding to existing file** - EDIT is perfect for this
- **Specific test cases** - know exactly what to add
- **Matching existing style** - EDIT preserves context
- **Individual tests** - adding 4 distinct tests

**For each test, use EDIT mode separately:**

#### Test 1: Zero Balance Edge Case

**Steps:**
1. Open `src/__tests__/transactions.test.ts`
2. Scroll to the end of the existing tests
3. Position cursor after the last test
4. Use EDIT mode:

**Prompt:**
```
Add a test case for creating a transaction when sender has zero balance.
Test should:
- Create a user with zero balance or deplete a user's balance
- Attempt to create a payment transaction
- Verify the transaction fails or creates a withdrawal

Follow the existing test patterns in this file.
```

**Expected Test:**
```typescript
it("should handle transaction creation when sender has zero balance", () => {
  const sender: User = getAllUsers()[0];
  const receiver: User = getAllUsers()[1];
  const senderBankAccount = getBankAccountsByUserId(sender.id)[0];

  // Deplete sender's balance by creating transactions
  const depletingAmount = sender.balance;
  
  const paymentDetails: TransactionPayload = {
    source: senderBankAccount.id!,
    senderId: sender.id,
    receiverId: receiver.id,
    description: `Depleting balance`,
    amount: depletingAmount,
    privacyLevel: DefaultPrivacyLevel.public,
    status: TransactionStatus.pending,
  };

  createTransaction(sender.id, "payment", paymentDetails);
  
  const updatedSender = getUserById(sender.id);
  expect(updatedSender.balance).toBe(0);

  // Try to create another transaction with zero balance
  const failedPayment: TransactionPayload = {
    source: senderBankAccount.id!,
    senderId: sender.id,
    receiverId: receiver.id,
    description: `Should require withdrawal`,
    amount: 1000,
    privacyLevel: DefaultPrivacyLevel.public,
    status: TransactionStatus.pending,
  };

  const result = createTransaction(sender.id, "payment", failedPayment);
  expect(result.id).toBeDefined();
  
  // Check that a bank transfer was created for the deficit
  const withdrawal = getBankTransferByTransactionId(result.id);
  expect(withdrawal).toBeDefined();
  expect(withdrawal.amount).toBe(1000);
});
```

---

#### Test 2: Negative Amount Validation

**Prompt:**
```
Add a test case for creating a transaction with a negative amount.
The test should verify that validation prevents negative amounts.
If there's no validation, the test should fail to highlight this issue.

Follow the existing test patterns in this file.
```

**Expected Test:**
```typescript
it("should reject transaction with negative amount", () => {
  const sender: User = getAllUsers()[0];
  const receiver: User = getAllUsers()[1];
  const senderBankAccount = getBankAccountsByUserId(sender.id)[0];

  const invalidPayment: TransactionPayload = {
    source: senderBankAccount.id!,
    senderId: sender.id,
    receiverId: receiver.id,
    description: `Invalid negative amount`,
    amount: -1000, // Negative amount
    privacyLevel: DefaultPrivacyLevel.public,
    status: TransactionStatus.pending,
  };

  // This test expects validation to prevent this
  // If no validation exists, this test will fail and highlight the issue
  expect(() => {
    createTransaction(sender.id, "payment", invalidPayment);
  }).toThrow();
});
```

---

#### Test 3: Date Range Filter with No Results

**Prompt:**
```
Add a test case for filtering transactions by date range when no transactions exist in that range.
Should return an empty array.

Follow the existing test patterns in this file.
```

**Expected Test:**
```typescript
it("should return empty array when filtering by date range with no results", () => {
  const userToLookup: User = getAllUsers()[0];
  
  // Use a future date range where no transactions exist
  const result: Transaction[] = getTransactionsForUserContacts(userToLookup.id, {
    dateRangeStart: new Date("2030-01-01"),
    dateRangeEnd: new Date("2030-12-31"),
  });
  
  expect(result).toEqual([]);
  expect(result.length).toBe(0);
});
```

---

#### Test 4: Invalid Status Update

**Prompt:**
```
Add a test case for updating a transaction with an invalid status value.
Should test validation of transaction status enum.

Follow the existing test patterns in this file.
```

**Expected Test:**
```typescript
it("should reject updating transaction with invalid status", () => {
  const user: User = getAllUsers()[0];
  const transactions = getTransactionsByUserId(user.id);
  const transaction = transactions[0];

  const invalidEdits: Partial<Transaction> = {
    // @ts-ignore - intentionally using invalid value for testing
    requestStatus: "invalid-status",
  };

  // This should either throw an error or ignore invalid values
  expect(() => {
    updateTransactionById(transaction.id, invalidEdits);
  }).toThrow();
  
  // Alternative: verify it doesn't update with invalid value
  // updateTransactionById(transaction.id, invalidEdits);
  // const updatedTransaction = getTransactionById(transaction.id);
  // expect(updatedTransaction.requestStatus).not.toBe("invalid-status");
});
```

---

### Alternative: Use AGENT for All Four Tests

If you prefer to add all tests at once:

**Prompt:**
```
@workspace Add these 4 missing test cases to src/__tests__/transactions.test.ts:

1. Test creating a transaction when sender has zero balance
2. Test creating a transaction with negative amount (should fail validation)
3. Test filtering transactions by date range that returns no results
4. Test updating a transaction with invalid status value (should fail validation)

Follow the existing test patterns and style in the file.
Use the same imports, seedDatabase setup, and assertion patterns.
Add these tests at the end of the existing describe block.
```

**Why AGENT here?**
- Adding **multiple related tests**
- Want **consistent style** across all four
- Can generate all at once more efficiently
- Still maintains existing file structure

---

### Phase 3: Validation

**Run the tests:**
```bash
yarn test:unit transactions
```

**Verify:**
- ✅ All new tests added to the file
- ✅ Tests follow existing patterns
- ✅ New tests pass (or fail if validation is missing - which is useful!)
- ✅ Code style matches existing tests
- ✅ Proper assertions for each scenario

**Expected Output:**
```
✓ src/__tests__/transactions.test.ts (18)
  ✓ Transactions (18)
    ✓ should retrieve a list of all transactions
    ✓ should retrieve a list of all public transactions
    ...
    ✓ should handle transaction creation when sender has zero balance
    ✓ should reject transaction with negative amount
    ✓ should return empty array when filtering by date range with no results
    ✓ should reject updating transaction with invalid status
```

---

### Key Learning

✅ **ASK mode** helped understand existing patterns first  
✅ **EDIT mode** perfect for adding individual tests to existing file  
✅ **AGENT mode** alternative for adding multiple tests at once  
✅ **Style consistency** maintained by following existing patterns  

**Task Type:** Extending existing test suite  
**Difficulty:** Easy-Medium  
**Skills Practiced:** Pattern matching, edge case testing, test integration

---

## 📊 Testing Mode Selection Summary

| Task | Primary Mode | Why | Complexity |
|------|--------------|-----|------------|
| #1: Utility Function Tests | ASK → AGENT | New test file, comprehensive coverage | Medium |
| #2: Add Missing Tests | ASK → EDIT | Extending existing file, specific cases | Easy-Medium |

---

## 🎯 Unit Testing Best Practices

### 1. **Planning Tests (ASK Mode)**
   - Understand what needs testing
   - Identify edge cases upfront
   - Learn existing test patterns
   - Explore coverage gaps

**Example ASK Prompts:**
```
What edge cases should I test for this function?
What test scenarios am I missing in this test suite?
Show me examples of how to test error conditions.
```

---

### 2. **Generating Tests (EDIT vs AGENT)**

**Use EDIT when:**
- ✅ Adding 1-2 specific test cases
- ✅ Modifying existing tests
- ✅ Working in existing test file
- ✅ You know exactly what to test

**Use AGENT when:**
- ✅ Creating new test file
- ✅ Need comprehensive coverage
- ✅ Testing multiple related functions
- ✅ Want both happy path + edge cases

**Example EDIT Prompt:**
```
Add a test case for the edge case where the array is empty.
```

**Example AGENT Prompt:**
```
Create comprehensive unit tests for all exported functions in this utility file.
Include happy path, edge cases, and error scenarios.
```

---

### 3. **Test Structure Best Practices**

```typescript
describe("ModuleName or ClassName", () => {
  // Setup/Mock data
  const mockData = { /* ... */ };

  describe("functionName", () => {
    it("should handle normal case", () => {
      // Arrange
      const input = /* ... */;
      
      // Act
      const result = functionName(input);
      
      // Assert
      expect(result).toBe(expected);
    });

    it("should handle edge case", () => {
      // Test edge case
    });

    it("should throw error for invalid input", () => {
      expect(() => functionName(invalid)).toThrow();
    });
  });
});
```

---

### 4. **Coverage Checklist**

For each function, test:
- ✅ **Happy path** - normal expected usage
- ✅ **Edge cases** - boundary conditions, empty inputs, nulls
- ✅ **Error cases** - invalid inputs, exceptions
- ✅ **Integration** - how it works with other functions (if applicable)

---

### 5. **Copilot Prompting Tips**

**Be Specific:**
```
✅ Good: "Create tests for getPaginatedItems with edge cases: empty array, invalid page, boundary conditions"
❌ Bad: "Write tests for pagination"
```

**Specify Framework:**
```
✅ "Using Vitest framework..."
✅ "Using Jest with TypeScript..."
```

**Request Coverage:**
```
✅ "Include happy path, edge cases, and error scenarios"
✅ "Test both success and failure conditions"
```

**Match Existing Style:**
```
✅ "Follow the existing test patterns in this file"
✅ "Use the same mocking approach as other tests"
```

---

## 🔑 Key Takeaways

1. **ASK before generating** - understand what to test
2. **EDIT for additions** - when working with existing test files
3. **AGENT for new suites** - comprehensive coverage from scratch
4. **Think edge cases** - empty, null, boundary conditions
5. **Match existing patterns** - consistency is important
6. **Run tests immediately** - verify they work
7. **Test errors too** - not just happy paths

---

## ✅ Self-Check

After reviewing these solutions, ask yourself:

- [ ] Do I understand when to use ASK vs EDIT vs AGENT for testing?
- [ ] Can I identify what edge cases to test?
- [ ] Do I know how to structure comprehensive test suites?
- [ ] Can I match existing test patterns when adding tests?
- [ ] Do I test both success and failure scenarios?

**Remember:** Good tests are specific, comprehensive, and maintainable. Copilot helps you write them faster, but you still need to think about what matters.
