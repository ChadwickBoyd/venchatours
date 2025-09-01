# VenCha Tours – Website

A one‑page React + Tailwind site ready for Vercel.

## Quick Start (local)
```bash
npm i
npm run dev
```

## Deploy to Vercel
1. Push this folder to a GitHub repo.
2. In Vercel: **Add New Project → Import Git Repository** and select the repo.
3. Accept defaults, click **Deploy**.
4. In Vercel → Project → Settings → Domains, add `venchatours.com` and follow the DNS steps.

## Customize
Open `src/App.jsx` and edit at the top:

```js
const LOGO_URL   = "https://your-cdn.com/vencha-logo.png";
const BOOKING_URL = "https://calendly.com/...";
const PAYMENT_URL = "https://buy.stripe.com/...";
const PHOTOS = {
  hero: "https://.../hero.jpg",
  about: "https://.../about.jpg",
};
```

- **Logo:** If `LOGO_URL` is set, the SVG badge switches to your logo automatically.
- **Booking/Payments:** Paste your live links to enable the buttons.
- **Photos:** Replace `PHOTOS` URLs with your own.
