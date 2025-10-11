# Eboni Dating Platform

> **Vercel-Only Deployment**
>
> This repository is optimized for **Vercel-only** hosting.
>
> - Backend/API routes run as Vercel serverless functions from `/api` (see `/api/index.ts`).
> - The frontend is a Vite app and builds to `dist/public`.
> - Local server code and Replit configs have been removed to simplify the repo.
> - For local testing you can use `vercel dev` (Vercel CLI) or run `vite` for the client.
> - Configure required environment variables in the Vercel Dashboard before deploying (see list below).
>
> Required environment variables (examples in `.env` format):
> ```env
> DATABASE_URL=postgresql://user:password@host/db?sslmode=require
> SESSION_SECRET=<32+ char secret>
> VITE_SUPABASE_URL=https://xxxxx.supabase.co
> VITE_SUPABASE_ANON_KEY=your_anon_key
> # Optional:
> SMTP_HOST=smtp.gmail.com
> SMTP_PORT=587
> SMTP_USER=your-email@example.com
> SMTP_PASSWORD=app-password
> SUPABASE_SERVICE_ROLE_KEY=your_service_key
> NODE_ENV=production
> ```
>
> Quick notes:
> - Do NOT attempt to run or package `server/index.ts` on Vercel. All server logic is exposed via `/api` serverless functions.
> - Use the Vercel Dashboard or CLI to set environment variables for Production/Preview/Development.
> - Deploy by pushing to the branch linked to Vercel or run `vercel --prod`.

## 🚀 Quick Commands

Install:
\`\`\`
npm install
\`\`\`

Build for production (frontend only):
\`\`\`
npm run build
\`\`\`

Run dev locally:
- Using Vite (client only):
\`\`\`
npm run dev
\`\`\`
- Or using Vercel CLI for serverless emulation (recommended if you want to test `/api` functions locally):
\`\`\`
vercel dev
\`\`\`

Deploy:
- Push to the repository branch connected with Vercel or run:
\`\`\`
vercel --prod
\`\`\`

(remaining README contents unchanged)
