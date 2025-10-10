# Eboni Dating Platform

A modern dating platform built with React, Express, and Supabase, optimized for deployment on Vercel.

## 🚀 Tech Stack

- **Frontend**: React 18, Vite, TailwindCSS, Wouter (routing)
- **Backend**: Express.js, Node.js (Serverless on Vercel)
- **Database**: PostgreSQL (Neon), Supabase
- **UI Components**: Radix UI, shadcn/ui
- **Deployment**: Vercel

## 📋 Environment Variables

Create a `.env` file in the root directory with the following variables:

\`\`\`env
# Database (Neon PostgreSQL)
DATABASE_URL=your_postgresql_connection_string
POSTGRES_URL=your_neon_postgres_url

# Session Security
SESSION_SECRET=your_secret_key_here_change_in_production

# Supabase (client-side, must have VITE_ prefix)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Server-side Supabase (for API routes)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-smtp-password

# Environment
NODE_ENV=production
PORT=5000
\`\`\`

## 🛠️ Local Development

1. **Install dependencies:**
\`\`\`bash
npm install
\`\`\`

2. **Set up environment variables:**
\`\`\`bash
cp .env.example .env
# Edit .env with your actual values
\`\`\`

3. **Run database migrations:**
\`\`\`bash
npm run db:push
\`\`\`

4. **Start development server:**
\`\`\`bash
npm run dev
\`\`\`

The app will be available at `http://localhost:5000`

## 🌐 Deployment to Vercel

### Prerequisites
- Vercel account ([sign up here](https://vercel.com))
- GitHub repository
- Neon database (or other PostgreSQL provider)
- Supabase project (optional, for auth/storage)

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual Deployment Steps

1. **Push your code to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   \`\`\`

2. **Import project to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect settings from `vercel.json`

3. **Configure Environment Variables**
   
   In Vercel dashboard → Settings → Environment Variables, add:
   
   **Required:**
   - `DATABASE_URL` - Your Neon/PostgreSQL connection string
   - `POSTGRES_URL` - Your Neon Postgres URL
   - `SESSION_SECRET` - Random secure string (use: `openssl rand -base64 32`)
   - `VITE_SUPABASE_URL` - Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` - Your Supabase anon key
   
   **Optional:**
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` - For email features
   - `SUPABASE_SERVICE_ROLE_KEY` - For admin operations

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically:
     - Install dependencies
     - Build the frontend (Vite)
     - Bundle the backend (esbuild)
     - Deploy to serverless functions

5. **Verify Deployment**
   - Visit your deployment URL: `https://your-project.vercel.app`
   - Test API endpoints: `https://your-project.vercel.app/api/health`

### Post-Deployment Configuration

**Custom Domain:**
- Go to Vercel Dashboard → Settings → Domains
- Add your custom domain
- Update DNS records as instructed

**Database Setup:**
- Run migrations if needed
- Seed initial data

**Monitoring:**
- Check Vercel Analytics for performance
- Monitor serverless function logs in Vercel dashboard

## 📁 Project Structure

\`\`\`
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── lib/         # Utilities and configs
│   │   └── App.tsx      # Main app component
│   └── index.html
├── server/              # Express backend
│   ├── routes.ts        # API routes
│   ├── index.ts         # Server entry (dev)
│   └── vite.ts          # Vite dev server setup
├── api/                 # Vercel serverless functions
│   └── index.ts         # API handler for Vercel
├── shared/              # Shared types and utilities
├── dist/                # Build output
│   ├── public/          # Frontend build
│   └── index.js         # Backend build
├── vercel.json          # Vercel configuration
└── vite.config.ts       # Vite configuration
\`\`\`

## ✨ Features

- 🔐 User authentication and profiles
- 🔍 Browse and search functionality
- 📅 Event management and RSVP
- 💎 Membership tiers (Basic, Premium, VIP)
- 🌓 Dark mode support
- 📱 Fully responsive design
- ⚡ Real-time updates with Supabase
- 🎨 Modern UI with Radix UI components

## 📜 Available Scripts

- `npm run dev` - Start development server (port 5000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type check with TypeScript
- `npm run db:push` - Push database schema changes
- `npm run vercel-build` - Build command for Vercel

## 🔧 Configuration Files

### vercel.json
Configures Vercel deployment settings:
- Build commands
- Output directory
- API route rewrites
- Serverless function settings
- Security headers

### vite.config.ts
Configures Vite build:
- Path aliases
- Build optimization
- Code splitting
- Proxy settings for development

## 🐛 Troubleshooting

**Build Fails:**
- Check all environment variables are set in Vercel
- Verify `DATABASE_URL` is accessible from Vercel
- Check build logs in Vercel dashboard

**API Routes Not Working:**
- Ensure `vercel.json` rewrites are correct
- Check serverless function logs
- Verify environment variables include server-side vars

**Supabase Connection Issues:**
- Confirm `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Check Supabase project is active
- Verify API keys are correct

**Database Connection Errors:**
- Ensure Neon database allows connections from Vercel IPs
- Check connection string format
- Verify database exists and is accessible

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
- Consult Neon docs: [neon.tech/docs](https://neon.tech/docs)

## 📄 License

MIT License - feel free to use this project for your own purposes.
