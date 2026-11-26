# Life Fix AI Buyer Handoff

## Asset summary

Life Fix AI turns everyday problems into structured next steps using category-based, deterministic rules.

- Live demo: https://life-fix-ai.onrender.com
- Source repository: https://github.com/bennett2oakley-hue/Life-Fix-AI
- Stack: React 19, TypeScript, Vite, Bun, browser localStorage
- Local development: `bun install`, then `bun run dev`
- Tests: `bun test`
- Production build: `bun run build`

## Included functionality

- Responsive problem-intake interface.
- Categories for home/repairs, money/bills, work/jobs, technology, travel, relationships, organization, and other.
- Rule-based step generation and basic safety routing.
- Browser-local saved history, with malformed data validation and a 50-item limit.
- Individual deletion and clear-history controls.
- Copy and text-file download actions with user feedback.
- Input length cap and storage failure messaging.
- GitHub Actions unit-test, build, and sale-package workflows.
- Custom branding, source, and buyer documentation.

## Verified quality

- GitHub Actions run [45826126815](https://github.com/bennett2oakley-hue/Life-Fix-AI/actions/runs/45826126815): unit tests and production build passed.
- GitHub Actions run [45826126111](https://github.com/bennett2oakley-hue/Life-Fix-AI/actions/runs/45826126111): sale-package workflow passed.
- Public demo smoke test on 2026-11-26 loaded the app and exercised fictional repair and technology examples without observed browser console/runtime errors. The live deployment was not yet refreshed with the latest source fixes at the time of that smoke test.

## Known limits to disclose

Despite the product name, the current app does not call a generative AI model or remote AI API. It generates guidance from deterministic rules in the client. History is stored in the user's browser, not synced to a server. There is no account system, server-side storage, subscription billing, or production analytics in the current build. Safety keyword matching is not a substitute for emergency services or professional advice.

## Transfer checklist

1. Transfer repository ownership or provide a source archive at closing.
2. Recreate hosting under buyer-owned credentials or transfer the service where supported.
3. Run `bun install --frozen-lockfile`, `bun test`, and `bun run build`.
4. Test each category with harmless fictional examples.
5. Verify history save/delete/clear, clipboard copy, and text download.
6. Test safety routing using non-graphic sample phrases.
7. Review privacy, terms, and disclaimers before commercial use.
8. Re-run the public demo smoke test after deployment.

## Sale representation

Market as a pre-revenue, client-side problem-solving MVP / software asset. Do not claim a connected AI model, validated professional advice, cloud-synced history, paying customers, revenue, or profitability unless separately implemented and independently verified.
