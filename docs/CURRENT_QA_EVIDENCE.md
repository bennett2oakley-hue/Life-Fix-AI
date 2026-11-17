# Current QA evidence — Life Fix AI

**Status: NOT BUYER-READY — local-first product with open validation**

## Verified
- Expo native starter foundation exists on branch `expo-native-foundation`; it is not the complete product.
- GitHub CI previously passed dependency installation, Expo compatibility check, Expo Doctor and Android JavaScript bundle export.
- A separate QA branch contains defensive history validation, local-storage failure feedback, clipboard failure feedback and safer download URL cleanup.
- Draft pull request: https://github.com/bennett2oakley-hue/Life-Fix-AI/pull/1

## Product limitations
- The current product logic is local-first/rule-based; do not market it as a connected generative-AI service.
- No Supabase backend is configured for this app.
- User-supplied AI key storage alone does not mean AI requests, privacy controls or usage metering are implemented.

## Not verified / still open
- Build, lint and full UI tests for the QA branch.
- History persistence across reloads and storage quota/private-mode failures.
- Export, copy and mobile-browser behavior on real devices.
- AI provider integration, key handling, consent, request limits, error handling and cost controls, if that feature is intended.
- Production deployment, monitoring, backup/export and asset transfer.

## Release gate
Merge the QA branch only after independent review and CI. Keep AI capability claims limited to features that are actually implemented and tested.
