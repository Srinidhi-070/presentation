<div align="center">
  <img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Namaah ATLAS

Live demo: https://presentation-lilac-alpha.vercel.app/

A Vite + React presentation web app that showcases Namaah ATLAS with animated sections and locally hosted image assets.

## Run locally

### Prerequisites
- Node.js (LTS recommended)

### 1) Install dependencies
```bash
npm install
```

### 2) Configure environment variables
Copy `.env.example` to `.env.local` and fill in values:
```bash
copy .env.example .env.local
```

Required variables:
- `GEMINI_API_KEY` (for Gemini API calls, if enabled in the app)
- `APP_URL` (used for internal links/callbacks when applicable)

### 3) Start dev server
```bash
npm run dev
```

Open the app at:
- `http://localhost:3000` (or the port shown in the terminal)

## Build for production
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Deploy to Vercel (free)
1. Push your changes to GitHub.
2. In Vercel: **New Project** → select your repo → branch `main`.
3. Use:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variables in **Project Settings → Environment Variables**:
   - `GEMINI_API_KEY`
   - `APP_URL`
5. Deploy.

## Project scripts
- `npm run dev` – start development server
- `npm run build` – build for production
- `npm run preview` – preview production build
- `npm run lint` – TypeScript typecheck (`tsc --noEmit`)
