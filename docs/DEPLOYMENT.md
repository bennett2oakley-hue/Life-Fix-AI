# Life Fix AI Deployment

## Render

The production static site builds with:

```
npm install && npm run build
```

The published directory is `dist`.

The production service is connected to the `main` branch for automatic deployment.

## Local verification

```
npm install
npm run build
```

Preview the production build with:

```
npm run preview
```

## Runtime secrets

The current application does not require an API key or database to run.

If a future owner adds AI, authentication, billing, analytics, or cloud storage, credentials should be stored in the hosting provider's secret/environment-variable system and never committed to Git.
