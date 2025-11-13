# GitHub Copilot Unit Testing Workshop

Learn how to use GitHub Copilot Chat modes to write comprehensive unit tests effectively.

---

## 🧪 Unit Testing Workflow with Copilot

The recommended approach for writing unit tests:

1. **ASK Mode** - Understand what to test and explore edge cases
2. **EDIT Mode** - Generate specific test cases for known scenarios
3. **AGENT Mode** - Generate comprehensive test suites covering multiple scenarios

---

## 🎯 Testing Tasks

For each task below, **YOU DECIDE** which Copilot Chat mode(s) to use. Then check your solution in [05_02_SOLUTIONS.md](./05_02_SOLUTIONS.md).

---

### Task #1: Write Tests for Transaction Utility Functions

**Scenario:**
You need to write unit tests for the transaction utility functions in `src/utils/transactionUtils.ts`. The file contains many helper functions for transaction operations, formatting, and calculations.

**Context:**
- The project uses **Vitest** as the testing framework
- Existing tests are in `src/__tests__/` directory
- Functions to test include:
  - `hasSufficientFunds(sender, transaction)` - checks if sender has enough balance
  - `getChargeAmount(sender, transaction)` - calculates charge amount
  - `formatFullName(user)` - formats user's full name
  - `hasDateQueryFields(query)` - checks if query has date fields
  - `getQueryWithoutFilterFields(query)` - removes filter fields from query
  - `getPaginatedItems(page, limit, items)` - paginates an array

**Your Task:**
Create comprehensive unit tests for at least 3-4 of these utility functions.

**Questions to Answer:**
1. Should you use ASK mode to understand what edge cases to test?
2. Is EDIT mode sufficient for writing individual test cases?
3. Would AGENT mode be better for generating a complete test suite?
4. How do you ensure you're testing both success and failure cases?

**Suggested Approach:**
- [ ] Choose your mode for understanding what to test
- [ ] Identify edge cases and scenarios
- [ ] Select mode for generating tests
- [ ] Create the test file with proper imports
- [ ] Verify tests run and pass

**Files Involved:**
- Source: `src/utils/transactionUtils.ts`
- Test file: `src/__tests__/transactionUtils.test.ts` (create new)

---

### Task #2: Add Missing Test Cases to Transaction Tests

**Scenario:**
The existing transaction tests in `src/__tests__/transactions.test.ts` have good coverage, but you notice some scenarios are missing:

1. **Edge case:** Creating a transaction when sender has zero balance
2. **Edge case:** Creating a transaction with negative amount (should fail)
3. **Filter test:** Getting transactions filtered by date range with no results
4. **Validation:** Updating a transaction with invalid status value

**Context:**
- The test file exists with many passing tests
- Uses Vitest framework
- Seeds database before each test with `seedDatabase()`
- Tests use real database functions from `backend/database.ts`

**Your Task:**
Add the 4 missing test cases to the existing test suite.

**Questions to Answer:**
1. Should you use ASK mode to understand the existing test patterns first?
2. Is EDIT mode better since you're adding to an existing file?
3. Would AGENT mode help generate all 4 tests at once?
4. How do you match the style of existing tests?

**Suggested Approach:**
- [ ] Review existing test structure and patterns
- [ ] Choose your mode for understanding test patterns
- [ ] Select mode for generating new tests
- [ ] Add tests that match existing code style
- [ ] Run tests to verify they work
- [ ] Ensure proper assertions and error handling

**Files Involved:**
- Test file: `src/__tests__/transactions.test.ts` (modify existing)
- Source: `backend/database.ts` (reference only)

---

## 🔍 Testing Decision Framework

### When writing unit tests:

**Use ASK Mode when:**
- ✅ You need to understand what edge cases exist
- ✅ You want to explore test coverage gaps
- ✅ You're unfamiliar with the code being tested
- ✅ You need to understand existing test patterns
- ✅ You want suggestions for test scenarios

**Use EDIT Mode when:**
- ✅ You know exactly what test case to write
- ✅ You're adding a single specific test
- ✅ You want to modify an existing test
- ✅ The test scenario is straightforward

**Use AGENT Mode when:**
- ✅ You need a complete test suite for a module
- ✅ You want comprehensive coverage (happy path + edge cases)
- ✅ You're testing multiple related functions
- ✅ You need both unit tests and integration tests

**Combine Modes when:**
- ✅ ASK for test scenarios → EDIT/AGENT to generate
- ✅ AGENT for initial suite → EDIT to refine specific tests
- ✅ ASK for missing coverage → EDIT to add tests

---

## 💡 Pro Testing Tips

### Planning Phase
1. **Use ASK to explore** what needs testing
2. **Ask about edge cases** you might miss
3. **Understand the test framework** patterns first
4. **Check existing tests** for style consistency

### Generation Phase
1. **EDIT for single tests** - focused and quick
2. **AGENT for suites** - comprehensive coverage
3. **Specify test framework** (Vitest, Jest, etc.) in prompts
4. **Request descriptive test names** for clarity

### Validation Phase
1. **Run tests immediately** - `yarn test:unit`
2. **Check coverage** - ensure critical paths tested
3. **Verify assertions** - are they meaningful?
4. **Test both success and failure** paths

---

## ✅ After Attempting These Tasks

Check [05_02_SOLUTIONS.md](./05_02_SOLUTIONS.md) to:
- Compare your mode selection
- See recommended test structures
- Learn test coverage strategies
- Review example prompts
- Understand testing best practices

---

## 🎓 Reflection

After working through these tasks, consider:

1. **Did you think about edge cases before writing tests?**
2. **Which mode generated better quality tests?**
3. **How did you ensure comprehensive coverage?**
4. **What test scenarios did you initially miss?**
5. **How did you match existing code style?**

Effective testing with Copilot is about **strategic planning** followed by **efficient generation** using the right mode for the task.
