# Life Fix AI — Operating Runbook

**Purpose:** enable a buyer or operator to run the product without relying on the original creator.
**Status:** draft operating controls; product is not certified for commercial operation.

## Current operating boundary
- Public web site: https://life-fix-ai.onrender.com
- Hosting: Render static site; verify service configuration and deployment history in Render before transfer.
- Source of truth: GitHub repository; QA work is on `qa-readiness-fixes` and is not merged or deployed.
- Current product behavior is local-first and rule-based. Do not describe it as a connected generative-AI service.
- No Supabase backend is configured. User-supplied AI key storage does not itself implement AI requests, provider privacy controls, metering or cost limits.
- Subscription billing, customer accounts, cloud sync and paid AI usage are not certified as implemented.

## Daily operations
1. Check site availability and Render deployment status.
2. Review user feedback and support reports.
3. Review build/CI results for new commits.
4. Track third-party dependencies and browser compatibility.
5. Do not collect sensitive personal information unless the product's privacy and retention controls have been reviewed.

## Product and customer operations
- Publish a clear description of current rule-based guidance and its limitations.
- Explain that saved history is stored locally in the user's browser/device and may be lost if local data is cleared or the device changes.
- Provide a support contact and help/FAQ before commercial launch.
- If AI is added later, disclose the provider, data sent, retention behavior, user-key responsibility, rate limits, failure modes and possible provider charges.
- Never promise professional, medical, legal, financial or emergency outcomes from generic guidance.

## Release procedure
1. Develop on a feature branch and open a pull request.
2. Require lint, production build and automated tests to pass.
3. Test storage corruption, unavailable localStorage, quota errors, clipboard denial, download behavior and narrow mobile layouts.
4. Verify all user-facing claims against implemented behavior.
5. Obtain release approval, deploy and record the deployment ID.
6. Roll back if the app fails to load, loses user data unexpectedly or gives misleading guidance.
7. Do not merge or deploy the QA branch without explicit owner approval.

## Security and privacy
- Treat any user-provided API key as a secret; never log it or embed it in a public bundle.
- A browser-only application cannot guarantee protection of a key against a compromised device/browser extension. Explain this to users before any future key-based integration.
- Minimize collection of personal data. If cloud accounts are introduced, implement server-side authorization, deletion/export and retention controls.
- Review dependencies, licenses and supply-chain changes before releases.

## Backup, recovery and continuity
- Local-only history is not centrally backed up by the operator. Explain this clearly.
- If cloud sync is introduced, document backup schedule, restore testing, export and deletion.
- Keep a clean source export, build instructions, dependency inventory and release notes.
- Define incident ownership and recovery objectives before launching a paid service.

## Monthly cost control
- Track hosting, domain, email, analytics, AI provider and support costs.
- Do not enable paid AI APIs or payment services without explicit approval and a cost ceiling.
- If using user-supplied API keys in a future release, ensure each customer pays their own provider directly and the app does not proxy or subsidize usage unless that is intentionally priced.

## Ownership transfer checklist
- Transfer GitHub repository, Render service, domain/DNS and support mailbox.
- Provide build and rollback instructions and verify buyer can deploy from a fresh clone.
- Transfer any provider accounts or keys using provider-native ownership transfer; never place secrets in this repository.
- Rotate credentials and remove seller access after buyer acceptance.
- Disclose local-only data behavior and all unsupported AI/cloud/billing capabilities.

## Open buyer-critical gates
- [ ] Corrected QA workflow completes successfully, including lint and production build.
- [ ] UI and storage edge cases tested on real Android devices and desktop browsers.
- [ ] Clear customer help, privacy, terms and support process.
- [ ] Accurate product positioning and no unsupported AI claims.
- [ ] Domain, hosting, monitoring and transfer procedures verified.
- [ ] If monetization is intended: billing, receipts, cancellation, refunds and tax handling implemented and tested.
