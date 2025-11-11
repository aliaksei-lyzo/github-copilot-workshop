# Context7 MCP Server

Learn how to enhance GitHub Copilot with up-to-date library documentation using the Context7 MCP server.

---

## 📚 What is Context7?

Context7 is an **MCP (Model Context Protocol) server** that fetches **up-to-date, version-specific documentation** for any library directly from the source. Instead of relying on outdated training data, Context7 retrieves current API docs, code examples, and best practices in real-time.

**Repository:** [upstash/context7](https://github.com/upstash/context7)

**Problem it solves:**
- ❌ LLMs suggest outdated APIs from old training data
- ❌ Hallucinated methods that don't exist
- ❌ Code examples for deprecated package versions

**What Context7 provides:**
- ✅ Current documentation for 1000+ libraries
- ✅ Version-specific API references
- ✅ Real code examples from official docs

---

## 🎯 Exercise: Using Context7 with Copilot

**Goal:** See the difference between generic AI responses and documentation-backed answers.

---

### Part 1: Setup Context7 MCP

1. **Install the MCP Server:**
   - Open VS Code Settings (Cmd+,)
   - Search for "GitHub Copilot MCP"
   - Add Context7 configuration:

```json
{
  "github.copilot.chat.mcp.servers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
```

2. **Reload VS Code** (Cmd+Shift+P → "Reload Window")

---

### Part 2: Test Without Context7

Ask Copilot Chat (don't mention Context7):

```
How do I configure Vitest to run tests in watch mode with coverage?
```

**Observe:** Generic answer based on training data.

---

### Part 3: Test With Context7

Now ask with the Context7 trigger:

```
How do I configure Vitest to run tests in watch mode with coverage? use context7
```

**Compare:**
- Does it reference current Vitest documentation?
- Are the configuration options up-to-date?
- Does it cite specific version information?

---

### Part 4: Real-World Scenarios

Try these prompts with `use context7`:

```
Create a Next.js API route with rate limiting using Upstash Redis. use context7
```

```
Set up tRPC with React Query in a Next.js app. use context7
```

```
Configure Prisma with PostgreSQL for a TypeScript project. use context7
```

**Notice:** Context7 fetches docs for multiple libraries (Next.js, Upstash, tRPC, Prisma, etc.)

---

## 🚀 Bonus: Auto-Invoke Context7

**Create a Copilot rule to automatically use Context7:**

1. Open Cursor Settings → Rules (or `.cursorrules`, `.windsurfrules`, `CLAUDE.md`)
2. Add this rule:

```
Always use context7 when generating code that involves external libraries, 
setup/configuration steps, or API documentation. Automatically invoke Context7 
MCP tools without explicit prompting.
```

Now you get current docs on every library-related question!

---

## 📚 Resources

- [Context7 GitHub](https://github.com/upstash/context7)
- [Context7 Website](https://context7.com)
- [Model Context Protocol Docs](https://modelcontextprotocol.io)
