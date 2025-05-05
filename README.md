# Sample Cloudflare worker using Data API backend over gRPC

We host the Data API backed on https://dapi-sandbox.adiom.io/. You can find more information in our docs: https://adiom.gitbook.io/data-api/

This example uses a Movie service described in `proto/movie.proto`

## Preparation
Before you begin, make sure to create a `.dev.vars` file (see `.dev.vars.example`) with the API key for the service and the authentication token.
```
npm install
npx buf generate
```
## Run locally
A simple `npx wrangler dev` would do.

## Run on Cloudflare
```
npx wrangler secret bulk .dev.vars
npx wrangler deploy
```
