# Life Fix AI

**Life Fix AI** is a practical problem-solving web app that turns everyday problems into clear, step-by-step next actions.

## Current product

- Responsive web app
- Life Fix AI dark/teal branding and custom wrench + sparkle icon
- Problem intake with categories
- Safety-aware routing for potentially dangerous situations
- Practical plans for home, money, work, technology and travel problems
- Saved fix history stored locally in the user's browser
- Delete individual fixes or clear history
- Copy a plan to the clipboard
- Download a plan as a text file
- No advertising
- No server-side storage of user problem history in the current build

## Product status

The current production build is a **working client-side MVP / pre-revenue software asset**.

Its problem-solving engine is deterministic rule-based guidance, not a connected generative-AI backend. A buyer can operate the product as-is or add a secure server-side AI provider later.

Do not market the current build as providing medical, legal, financial, emergency, or professional advice.

## Tech stack

React 19, TypeScript, Vite, CSS, localStorage.

## Live product and source

The source of record is:

https://github.com/bennett2oakley-hue/Life-Fix-AI

The product has also been published through the existing app deployment workflow. Deployment credentials and account ownership are handled separately during a buyer transfer.

## Buyer handoff

The sale can include the source repository, deployment information, brand/design assets contained in the repository, and transition documentation. Revenue, customers, traffic and profitability are pre-revenue/zero unless independently verified.

## Local development

Install dependencies with Bun:

```bash
bun install
bun run dev
```

Create a production build:

```bash
bun run build
```

## Roadmap for a buyer

1. Add authenticated accounts and cloud-saved plans.
2. Add a secure server-side AI provider integration.
3. Add subscription billing and usage limits.
4. Add privacy-conscious analytics.
5. Add a structured knowledge base and source citations for higher-risk categories.
