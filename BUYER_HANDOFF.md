# LIFE FIX AI - BUYER HANDOFF

## Product

Life Fix AI is a client-side React/Vite web application for turning everyday problems into practical next-step plans.

## Repository

https://github.com/bennett2oakley-hue/Life-Fix-AI

## Live demo

https://ghosted-logic-j9cy7nc.shipstatic.com

## Architecture

- React 19
- TypeScript
- Vite
- CSS
- Browser localStorage for saved fixes
- No server database in the current MVP
- No AI API key embedded in the client

## Data/privacy behavior

The current app stores fix history in the user's browser under the `life-fix-history` localStorage key. The current MVP does not require users to create an account or submit their saved history to a central database.

## Current functionality

- New fix flow
- Category selection
- Problem intake
- Rule-based guidance
- Urgency handling
- Safety notices
- Saved fix history
- Delete one fix
- Clear history
- Copy plan
- Download plan
- Responsive layout

## Not included yet

- User authentication
- Cloud persistence
- Server-side AI calls
- Subscription billing
- Admin dashboard
- Verified revenue or customers
- Native mobile apps

## Recommended next technical step

Add a small server-side API layer for AI generation. Keep API keys server-side. Add authentication and a database only after the buyer decides which user-data model is appropriate.

## Transfer checklist

- Transfer GitHub repository ownership or grant buyer repository access.
- Transfer the production hosting/deployment account or deployment ownership.
- Transfer any domain separately if a domain is purchased later.
- Rotate any secrets before handoff.
- Do not transfer personal credentials.
- Give the buyer the current README and this handoff document.
