# Life Fix AI — Expo native foundation

This branch replaces the prior WebView wrapper with real React Native starter screens. The existing production web app remains untouched on main.

## Free stack
- Expo SDK 57 / React Native 0.86 / React 19
- Supabase Free for Auth, Postgres and private Storage
- AsyncStorage for Supabase sessions
- expo-secure-store for a user-owned Gemini/free-tier API key
- Expo Go testing; no EAS paid-build scripts or paid plugins

## Run
Open this folder in Expo Snack or run `npx expo start`. Use Snack's dependency picker or `npx expo install --fix` to align packages. Configure this app's Supabase URL and publishable key in `src/lib/supabase.ts` for Snack or local `.env`. Run `supabase/schema.sql` only in its dedicated Supabase project.

## Modules
- Problem intake and categories
- Household asset and repair project records
- Step-by-step repair plans and progress
- Saved solutions
- Optional user-supplied AI provider key

AI output must remain safety-aware and must not be marketed as medical, legal, financial, emergency or professional advice. This is a starter foundation, not a completed or store-tested app.
