# Life Fix AI Buyer Handoff

## Asset summary
Life Fix AI turns everyday problems into structured next steps using category-based, deterministic rules.

- Live demo: https://life-fix-ai.onrender.com
- Source repository: https://github.com/bennett2oakley-hue/Life-Fix-AI
- Stack: React, TypeScript, Vite, localStorage
- Local development: `bun install`, then `bun run dev`
- Production build: `bun run build`

## Included
- Responsive problem-intake interface
- Categories for home/repairs, money/bills, work/jobs, technology, travel, relationships, organization, and other
- Rule-based step generation and basic safety routing
- Browser-local saved history
- Copy/download plan actions
- Custom branding/icon assets
- Vite production build configuration

## Known limits to disclose
Despite the product name, the current app does not call a generative AI model or remote AI API. It generates guidance from deterministic rules in the client. History is stored in the user's browser, not synced to a server. There is no account system, server-side storage, subscription billing, or production analytics in the current build. Safety keyword matching is not a substitute for emergency services or professional advice. Do not market this build as medical, legal, financial, emergency, or professional advice.

## Transfer checklist
1. Transfer repository ownership or provide a source archive at closing.
2. Transfer hosting only after both parties agree; recreate any provider credentials under buyer ownership.
3. Run a clean dependency install and production build.
4. Test each category with harmless fictional examples.
5. Verify history save/delete/clear, clipboard copy, and text download.
6. Test safety routing using non-graphic sample phrases.
7. Review privacy, terms, and disclaimers before commercial use.

## Acceptance checklist
- [ ] App renders on mobile and desktop
- [ ] Submitting a harmless example produces a structured plan
- [ ] Category selection changes the guidance path as expected
- [ ] Saved history survives refresh in the same browser
- [ ] Individual and full history deletion work
- [ ] Copy and text download work
- [ ] Safety-related sample input routes to safety-first guidance
- [ ] Run `bun run build`

## Sale representation
Market as a pre-revenue, client-side problem-solving MVP / software asset. Do not claim a connected AI model, validated professional advice, cloud-synced history, paying customers, revenue, or profitability unless separately implemented and independently verified.
