# Custom Copilot Instructions

Learn how custom instructions shape GitHub Copilot's behavior by creating your own and observing the results.

---

## 📚 Learning Objectives

- Understand the three types of Copilot instructions and their priority
- Create and test custom instructions
- Observe how instructions change AI output
- Learn what makes instructions effective vs ineffective

---

## 📖 Instruction Types & Priority

```
Chat Instructions (inline in prompt)        [Highest Priority]
    ↓ overrides
Repository Instructions (.github/copilot-instructions.md)
    ↓ overrides  
Global Instructions (VS Code Settings)
    ↓ overrides
Default Copilot Behavior                     [Lowest Priority]
```

**When to use:**
- **Chat:** One-off tasks, temporary overrides, domain-specific context
- **Repository:** Project standards, team conventions, architecture patterns  
- **Global:** Personal preferences across all your projects

---

## 🎯 Exercise 1: Baseline - No Instructions

**Goal:** See Copilot's default behavior without any custom instructions.

### Your Task

1. Test these 3 prompts in Copilot Chat and observe:

```
Create a function to calculate transaction fees
```

```
Create a React component for displaying user profile  
```

```
Create an API endpoint to fetch transactions
```


---

## ✏️ Exercise 2: Create Repository Instructions

**Goal:** Write custom instructions and see how they change Copilot's output.

### Task 2.1: Write Your Instructions

1. Create `.github/copilot-instructions.md` 
2. Add 3-5 rules you want Copilot to follow

**Examples of what to specify:**
- Language/framework preferences
- Documentation requirements  
- Code style conventions
- Testing approach
- Error handling patterns

**Writing Tips:**
- ✅ **Specific:** "Use TypeScript with strict mode" not "use types"
- ✅ **Clear:** "Add JSDoc to all functions" not "document code"
- ❌ **Vague:** "Write good code", "follow best practices"

**Example structure:**
```markdown
### Code Style
- Always use TypeScript
- Use functional components in React

### Documentation  
- Add JSDoc comments to all exported functions
- Include example usage for complex functions

### [Your section]
- [Your rule]
```

---

### Task 2.2: Test Your Instructions

1. Save your instructions file
2. Reload VS Code window (Cmd+Shift+P → "Reload Window")
3. Run the **same 3 prompts** from Exercise 1
4. **Compare** the results

---

## 🔄 Exercise 3: Iterate & Refine

**Goal:** Improve instructions based on what you learned.

### Task: Fix What Didn't Work

**Common issues:**
- Instruction ignored → Make it more specific
- Unexpected result → Clarify the rule  
- Too strict → Add flexibility

**Example improvements:**
- ❌ "Handle errors" → ✅ "Use try-catch blocks, return user-friendly error messages"
- ❌ "Write tests" → ✅ "Use Vitest, include edge cases, test file alongside source"

**Your task:**
1. Identify 2-3 instructions that didn't work well
2. Rewrite them
3. Test again with new prompts

---

## 🌍 Exercise 4: Global Instructions

**Goal:** Set personal preferences that apply across all your projects.

### Task: Configure Global Instructions

1. Open VS Code Settings (Cmd+,)
2. Search for "GitHub Copilot Instructions"  
3. Find "GitHub Copilot › Chat: Instructions"
4. Add your personal preferences

**Think about:**
- Coding principles you always follow
- Security practices you never skip
- Documentation style you prefer
- Common mistakes to avoid

**Test the priority:**
- Add a global instruction that conflicts with your repository instructions
- Prompt: `Create a utility function to format dates`
- **Question:** Which instruction wins? (Answer: Repository overrides Global)

---

## 💬 Exercise 5: Chat Instructions

**Goal:** Override instructions for specific tasks.

### Task 5.1: Temporary Override

**Scenario:** Quick prototype that ignores normal rules

**Your prompt:**
```
For this task only: [state what to ignore or change]

Create [your request]
```

**Example scenarios:**
- Skip documentation for a quick test
- Use a different framework temporarily  
- Create longer file than normally allowed

---

### Task 5.2: Domain-Specific Context

**Scenario:** Add specialized knowledge not in repository instructions

**Your prompt:**
```
Context: [Domain-specific requirements]

Rules:
- [Specific rule 1]
- [Specific rule 2]

Create [your request]
```

**Try different domains:**
- Financial calculations (precision, rounding)
- Healthcare (HIPAA compliance)
- E-commerce (tax, inventory)
- Accessibility (WCAG standards)

---

## 🧪 Exercise 6: A/B Testing

**Goal:** Compare different instruction approaches.

### Your Experiment

1. Pick one aspect to test (e.g., error handling, testing, documentation)
2. Create two different instruction versions
3. Test with the same prompt
4. Compare results

**Example:**

**Version A - Strict:** "Every function must have unit tests first (TDD)"
**Version B - Flexible:** "Write tests for complex business logic"

**Prompt:** `Create a function to parse CSV data`

**Document:**
- Which produced better code?
- Which is more practical?
- What did you learn?

---

## ✅ Key Takeaways

### Effective Instructions Are:
- **Specific** - "Use Vitest" not "use testing tools"
- **Actionable** - Clear what to do
- **Testable** - You can verify if followed
- **Consistent** - No contradictions

### Priority Reminder:
```
Chat > Repository > Global > Default
```

### When to Use Each:
- **Chat:** One-off tasks, domain context
- **Repository:** Team standards, project patterns
- **Global:** Personal style across projects

---

## 🎯 Final Challenge

Create a complete instruction system:

1. **Repository instructions** - 5-10 project-specific rules
2. **Global instructions** - 3-5 personal preferences  
3. **Test results** - Documented in `MY_INSTRUCTION_EXPERIMENTS.md`
4. **2 A/B tests** - Comparing different approaches

**Success criteria:**
- Instructions produce consistent results
- You understand WHY each rule works
- You can explain the priority system

---

## 📚 Resources

- [GitHub Copilot Docs: Custom Instructions](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
- Your experiments: `MY_INSTRUCTION_EXPERIMENTS.md`
- Project context: `PLANNING.md`
