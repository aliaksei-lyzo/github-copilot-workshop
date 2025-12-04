# GitHub Copilot Chat Participants

This module covers how to use specialized chat participants (`@workspace`, `@terminal`, `@github`) to get contextual help for different aspects of your development workflow.

---

## 📚 Learning Objectives

By the end of this module, you will be able to:
- Use `@workspace` to understand project architecture and code patterns
- Use `@terminal` to get help with command-line operations
- Use `@github` to query repository history, issues, and PRs
- Combine multiple participants for complex queries

---

## 🎭 Exercise 1: @workspace Participant

**Skill:** Understanding project structure and architecture

### Task: Explore Authentication Architecture

**Instructions:**
1. Open Copilot Chat
2. Type:
   ```
   @workspace How is authentication implemented across the frontend and backend? Which files are involved?
   ```

**Expected Outcome:**
- Overview of authentication architecture
- List of relevant files (auth.ts, user-routes.ts, auth providers in src/)
- Explanation of how frontend and backend authentication connect
- References to Auth0, Okta, Cognito, Google integrations

**Follow-up Questions to Try:**
```
@workspace Where are the transaction models defined and how are they used?
@workspace What testing strategy is used in this project?
@workspace How are React state machines (XState) organized in this codebase?
@workspace What is the database structure and how is it seeded?
```

**When to Use @workspace:**
- Understanding how different parts of the project connect
- Finding where specific functionality is implemented
- Learning about design patterns used in the project
- Getting an overview of project architecture

---

## 💻 Exercise 2: @terminal Participant

**Skill:** Getting help with command-line operations

### Task: Learn Testing and Database Commands

**Instructions:**
1. Open Copilot Chat
2. Type:
   ```
   @terminal How do I run only the Cypress API tests and generate a coverage report?
   ```

**Expected Outcome:**
- Correct command(s) to run API tests with coverage
- Explanation of command flags and options
- Possibly suggests: `yarn test:api` or checks package.json scripts

**Follow-up Questions to Try:**
```
@terminal How can I check which port the backend is running on?
@terminal Show me how to reset the database and reseed it
@terminal How do I find all TypeScript files that import the Transaction model?
@terminal What command shows me the size of node_modules?
@terminal How do I run the linter and fix issues automatically?
```

**Practice Exercise:**
Execute the suggested commands in your terminal to verify they work correctly.

**When to Use @terminal:**
- Need help with shell commands
- Don't remember script names from package.json
- Want to combine multiple terminal operations
- Need help with git commands
- Looking for file search or text manipulation commands

---

## 🐙 Exercise 3: @github Participant

**Skill:** Querying repository context from GitHub

### Task: Research Repository History

**Instructions:**
1. Make sure you have GitHub Copilot connected to your repository
2. Open Copilot Chat
3. Type:
   ```
   @github What issues or pull requests relate to authentication features?
   ```

**Expected Outcome:**
- List of related issues/PRs (if any exist in the repository)
- Summary of authentication-related changes
- Links to relevant discussions

**Follow-up Questions to Try:**
```
@github What are the recent changes to the transaction model?
@github Are there any open issues related to testing?
@github Show me the commit history for the database.ts file
@github What dependencies were recently updated?
@github Are there any security-related discussions or issues?
```

**When to Use @github:**
- Understanding why code was written a certain way
- Finding related issues or discussions
- Checking commit history for specific files
- Looking for existing bug reports or feature requests
- Understanding project evolution over time

**Note:** `@github` requires an active internet connection and repository access.

---

## 🎯 Exercise 4: Combining Chat Participants

**Skill:** Using multiple participants together for complex workflows

### Task: Complete Development Workflow

**Scenario:** You need to understand the full workflow for making changes, testing, and deploying.

**Instructions:**

**Step 1 - Understand Structure:**
```
@workspace What is the complete workflow for testing and deploying changes in this project? What files and processes are involved?
```

**Step 2 - Get Commands:**
```
@terminal Give me the exact commands to: 1) run type checking, 2) run all tests, 3) build for production. Chain them together so they only run if the previous succeeds.
```

**Step 3 - Check Automation:**
```
@github Is there a CI/CD pipeline configured for this repository? Show me the workflow files and what they do.
```

**Expected Outcome:**
- Complete understanding of the development workflow
- Executable command chain for validation
- Knowledge of existing automation
- Clear picture of best practices for this project

---

### Task: Debug a Feature

**Scenario:** You're investigating how transaction filtering works.

**Step 1 - Code Context:**
```
@workspace How does transaction filtering work? Show me all the places where transactions are filtered by date, amount, or status.
```

**Step 2 - Test It:**
```
@terminal How can I test the transaction filtering in isolation? Give me curl commands or test file commands.
```

**Step 3 - History:**
```
@github When was transaction filtering last modified? Were there any bugs or issues reported?
```

**Practice Creating Your Own Workflows:**
Try combining participants for these scenarios:
- Setting up a new development environment
- Investigating a performance issue
- Understanding authentication flow
- Preparing for a code review

---

## 🎓 Best Practices

### Choosing the Right Participant:

| Participant | Best For | Example Query |
|-------------|----------|---------------|
| `@workspace` | Code structure, architecture, patterns | "How does authentication work in this app?" |
| `@terminal` | Commands, scripts, file operations | "How do I run tests with coverage?" |
| `@github` | History, issues, PRs, collaboration | "What recent changes affected the API?" |
| _(none)_ | General programming questions | "How does async/await work in TypeScript?" |

### Tips for Effective Queries:

1. **Be Specific:** Instead of "How do I test?", ask "How do I run the Cypress E2E tests for the transaction feature?"

2. **Provide Context:** Mention specific files or features you're interested in

3. **Chain Questions:** Start broad with `@workspace`, then narrow down with `@terminal` or `@github`

4. **Verify Answers:** Always test suggested commands before using them in production

5. **Use Multiple Participants:** Complex questions often benefit from multiple perspectives

---

## 📝 Additional Practice

Try these real-world scenarios:

1. **New Team Member Onboarding:**
   - `@workspace` to understand project structure
   - `@terminal` to learn development commands
   - `@github` to see recent activity

2. **Bug Investigation:**
   - `@workspace` to find related code
   - `@github` to check if it's been reported
   - `@terminal` to reproduce the issue

3. **Feature Implementation:**
   - `@workspace` to find similar patterns
   - `@terminal` to set up test environment
   - `@github` to check for related discussions

4. **Performance Optimization:**
   - `@workspace` to identify bottlenecks
   - `@terminal` to profile and measure
   - `@github` to see optimization history

---

## ✅ Completion Checklist

- [ ] Used `@workspace` to understand project architecture
- [ ] Used `@terminal` to get command-line help
- [ ] Used `@github` to query repository history
- [ ] Combined multiple participants in a single workflow
- [ ] Executed suggested terminal commands successfully
- [ ] Understand when to use each participant
- [ ] Can create multi-step queries independently

---

## 🚀 Next Steps

Once you've mastered chat participants, explore:
- **Module 04: Advanced Prompting Techniques**
- **Module 05: Test-Driven Development with Copilot**
- **Module 06: Refactoring with Copilot**
