# GitHub Copilot Bug Fixing Workshop

Learn effective debugging strategies using GitHub Copilot Chat modes: **ASK** for investigation, **EDIT** for fixes, and **AGENT** for validation.

---

## 🐛 Bug Fixing Workflow

The recommended approach for bug fixing with Copilot:

1. **ASK Mode** - Investigate and understand the root cause
2. **EDIT Mode** - Apply the fix to specific files
3. **AGENT Mode** - Validate the fix doesn't break anything (optional but recommended)

---

## 🎯 Bug Reports

For each bug below, **YOU DECIDE** the approach to fix it. Then check your solution in [04_02_SOLUTIONS.md](./04_02_SOLUTIONS.md).

---

### Bug #1: Avatars Not Displaying

**Report:**
> "I see that avatars are not displayed anywhere in the application. User avatars should show up in the navigation drawer, transaction lists, and user lists, but they're all broken."

**Context:**
- Avatars worked in the past
- The issue affects all avatar displays across the app
- No error messages in the console
- The avatar URLs are stored in the database

**Your Task:**
Investigate why avatars are not displaying and fix the issue.

**Questions to Answer:**
1. Which Copilot Chat mode(s) should you use first? Why?
2. What's your investigation strategy?
3. Once you find the issue, which mode do you use to fix it?
4. How do you validate the fix works everywhere?

**Suggested Approach:**
- [ ] Choose your debugging mode
- [ ] Formulate investigation prompts
- [ ] Identify the root cause
- [ ] Select mode for fixing
- [ ] Apply the fix
- [ ] Validate across the application

---

### Bug #2: Text Input Padding Issue in Account Settings

**Report:**
> "When I'm on my account page (User Settings), I see that in text inputs all text is too close to the left border. It looks cramped and unprofessional."

**Context:**
- Issue is specific to the User Settings page (`/user/settings`)
- Affects all text input fields (First Name, Last Name, Email, Phone Number)
- Other forms in the app look fine
- The inputs are using Material-UI TextField component

**Your Task:**
Fix the text input padding issue in the User Settings form.

**Questions to Answer:**
1. Which Copilot Chat mode should you use to investigate?
2. Do you need to understand the broader context, or is this a simple CSS fix?
3. Which mode should you use for the actual fix?
4. How do you verify the fix doesn't break other forms?

**Suggested Approach:**
- [ ] Identify the affected component
- [ ] Choose your mode for investigation (if needed)
- [ ] Locate the styling issue
- [ ] Select mode for fixing
- [ ] Apply the fix
- [ ] Test the form visually

---

## 🔍 Debugging Decision Framework

### When investigating bugs:

**Use ASK Mode when:**
- ✅ You don't know where the bug is
- ✅ The bug could be in multiple places
- ✅ You need to understand the code flow
- ✅ You want to see error traces explained
- ✅ You need architecture context

**Use EDIT Mode when:**
- ✅ You've identified the exact location
- ✅ The fix is in a single file
- ✅ You know what needs to change
- ✅ It's a simple bug fix

**Use AGENT Mode when:**
- ✅ The bug affects multiple files
- ✅ You need to refactor to fix properly
- ✅ You want comprehensive test coverage
- ✅ Validation requires checking many scenarios

**Combine Modes when:**
- ✅ ASK to investigate → EDIT to fix
- ✅ ASK to understand → AGENT to fix + validate
- ✅ EDIT to fix → ASK to verify approach
- ✅ EDIT to fix → AGENT to add tests

---

## 💡 Pro Debugging Tips

### Investigation Phase
1. **Start with ASK** if the root cause is unclear
2. **Provide error messages** to Copilot for better analysis
3. **Ask about data flow** to trace the bug's path
4. **Request similar bugs** to learn from patterns

### Fixing Phase
1. **Use EDIT for surgical fixes** in known locations
2. **Select relevant code** before asking for fixes
3. **Review the generated fix** before applying
4. **Prefer small, focused changes** over large refactors

### Validation Phase
1. **Ask for test cases** that cover the bug scenario
2. **Use AGENT** to add regression tests
3. **Verify edge cases** you might have missed
4. **Check related functionality** hasn't broken

---

## ✅ After Attempting These Bugs

Check [04_02_SOLUTIONS.md](./04_02_SOLUTIONS.md) to:
- Compare your debugging approach
- See the recommended mode selections
- Learn investigation strategies
- Review step-by-step solutions
- Understand validation techniques

---

## 🎓 Reflection

After working through these bugs, consider:

1. **Did you investigate before jumping to a fix?**
2. **Which mode helped you find bugs faster?**
3. **How did you validate your fixes?**
4. **What patterns did you notice in effective debugging?**
5. **When did you need to combine multiple modes?**

Effective bug fixing with Copilot is about **strategic mode selection** based on the clarity of the problem and the scope of the solution.
