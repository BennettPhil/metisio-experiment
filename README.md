# Open Claw Web Starter

Next.js starter site for the Open Claw agent, designed for fast iteration and deployment on Vercel.

## Included

- App Router pages: `/`, `/about`, `/contact`, `/checkout`
- Stripe Checkout session endpoint: `POST /api/checkout`
- Success page at `/checkout/success`
- Environment variable template in `.env.example`

## Local Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open `http://localhost:3000`.

## Stripe Configuration

Set these values in local `.env.local` and in Vercel project environment variables:

- `NEXT_PUBLIC_SITE_URL` (your production URL)
- `STRIPE_SECRET_KEY` (live or test secret key, server-side only)
- `STRIPE_PRICE_ID` (Price ID used for checkout)

`/api/checkout` creates a Stripe Checkout session using that `STRIPE_PRICE_ID`.

## Deployment

1. Link this repo to a Vercel project.
2. Connect the Vercel project to the GitHub repository.
3. Merge to `main` to trigger production deployments automatically.

## Scripts

- `npm run dev` - local dev server
- `npm run build` - production build
- `npm run lint` - ESLint
