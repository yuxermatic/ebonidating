# Vercel Deployment Guide

Complete guide for deploying Eboni Dating Platform to Vercel.

## Prerequisites

- [x] Vercel account ([sign up](https://vercel.com/signup))
- [x] GitHub account with repository
- [x] Neon PostgreSQL database ([create one](https://neon.tech))
- [x] Supabase project (optional, [create one](https://supabase.com))

## Step-by-Step Deployment

### 1. Prepare Your Repository

Ensure these files are in your repository:
- `vercel.json` - Vercel configuration
- `vite.config.ts` - Vite build configuration
- `api/index.ts` - Serverless API handler
- `.vercelignore` - Files to exclude from deployment

### 2. Connect to Vercel

**Option A: Using Vercel CLI**
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
\`\`\`

**Option B: Using Vercel Dashboard**
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Project"
3. Select your GitHub repository
4. Vercel auto-detects settings from `vercel.json`

### 3. Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

#### Required Variables

\`\`\`env
DATABASE_URL=postgresql://user:password@host.neon.tech/database?sslmode=require
POSTGRES_URL=postgresql://user:password@host.neon.tech/database?sslmode=require
SESSION_SECRET=<generate-with-openssl-rand-base64-32>
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

#### Optional Variables

\`\`\`env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-app-password
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

**Important:** 
- Set environment variables for **Production**, **Preview**, and **Development**
- Use different values for each environment if needed
- Never commit `.env` files to Git

### 4. Build Configuration

Vercel automatically detects from `vercel.json`:

\`\`\`json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public",
  "installCommand": "npm install"
}
\`\`\`

### 5. Deploy

Click **Deploy** in Vercel dashboard or run:
\`\`\`bash
vercel --prod
\`\`\`

### 6. Verify Deployment

1. **Frontend**: Visit `https://your-project.vercel.app`
2. **API Health**: Visit `https://your-project.vercel.app/api/health`
3. **Check Logs**: Vercel Dashboard → Deployments → View Function Logs

## Post-Deployment

### Custom Domain

1. Go to Vercel Dashboard → Settings → Domains
2. Add your domain (e.g., `ebonidating.com`)
3. Update DNS records:
   \`\`\`
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   \`\`\`

### Database Migrations

Run migrations after deployment:
\`\`\`bash
# Using Vercel CLI
vercel env pull .env.production
npm run db:push
\`\`\`

### SSL Certificate

Vercel automatically provisions SSL certificates for:
- `*.vercel.app` domains
- Custom domains

### Monitoring

**Vercel Analytics:**
- Go to Dashboard → Analytics
- View performance metrics, page views, and errors

**Function Logs:**
- Dashboard → Deployments → Select deployment → View Function Logs
- Monitor API errors and performance

## Troubleshooting

### Build Failures

**Error: Module not found**
\`\`\`bash
# Clear cache and rebuild
vercel --force
\`\`\`

**Error: Environment variable missing**
- Check all required env vars are set in Vercel
- Ensure they're set for the correct environment (Production/Preview)

### API Route Issues

**Error: 404 on API routes**
- Verify `vercel.json` rewrites are correct
- Check `api/index.ts` exports default Express app

**Error: Database connection failed**
- Ensure `DATABASE_URL` includes `?sslmode=require`
- Verify Neon database allows connections from Vercel IPs
- Check connection string format

### Supabase Connection

**Error: supabaseUrl is required**
- Confirm `VITE_SUPABASE_URL` is set (with `VITE_` prefix)
- Verify environment variable is set for correct environment
- Check Supabase project is active

### Performance Issues

**Slow API responses:**
- Check serverless function cold starts
- Consider upgrading Vercel plan for better performance
- Optimize database queries

**Large bundle size:**
- Review `vite.config.ts` code splitting
- Check for unnecessary dependencies
- Use dynamic imports for large components

## Continuous Deployment

Vercel automatically deploys:
- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

Configure in: Dashboard → Settings → Git

## Rollback

To rollback to a previous deployment:
1. Go to Dashboard → Deployments
2. Find the working deployment
3. Click "..." → Promote to Production

## Environment-Specific Builds

**Preview Deployments:**
- Use preview environment variables
- Test features before production

**Production Deployments:**
- Use production environment variables
- Automatic SSL, CDN, and optimization

## Security Best Practices

1. **Never commit secrets** to Git
2. **Use environment variables** for all sensitive data
3. **Enable Vercel Authentication** for preview deployments
4. **Set secure session secrets** (32+ characters)
5. **Use HTTPS only** in production
6. **Enable CORS** only for trusted origins

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Neon Documentation](https://neon.tech/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [GitHub Issues](https://github.com/your-repo/issues)

## Deployment Checklist

- [ ] All environment variables configured
- [ ] Database migrations run
- [ ] API routes tested
- [ ] Frontend loads correctly
- [ ] Authentication works
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Analytics enabled
- [ ] Error monitoring set up
- [ ] Backup strategy in place
