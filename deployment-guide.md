# Microsoft 365 Admin Knowledge Base - Deployment Guide

## Prerequisites

1. **Supabase Account**: Sign up at [supabase.com](https://supabase.com)
2. **Domain**: Your custom domain ready for deployment
3. **Netlify Account**: For hosting (or your preferred hosting provider)

## Step 1: Database Setup

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Choose a project name (e.g., "microsoft-admin-kb")
3. Set a strong database password
4. Select a region close to your users

### 1.2 Run Database Migrations
1. In your Supabase dashboard, go to SQL Editor
2. Run the migration files in order:
   - First: `supabase/migrations/create_initial_schema.sql`
   - Second: `supabase/migrations/seed_initial_data.sql`

### 1.3 Configure Authentication
1. Go to Authentication > Settings in Supabase
2. Enable Email authentication
3. Configure Google OAuth (optional):
   - Add Google OAuth provider
   - Set up Google Cloud Console project
   - Add OAuth credentials

### 1.4 Set Environment Variables
Update your `.env` file with Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 2: Content Management Setup

### 2.1 Create First Admin User
1. Sign up for an account on your website
2. Go to `/admin-setup` page
3. Make yourself admin using the admin setup tool
4. Verify admin access by visiting `/admin`

### 2.2 Add Categories and Articles
1. Access the admin dashboard at `/admin`
2. Use the Categories tab to manage article categories
3. Use the Articles tab to create and manage content
4. Import existing articles or create new ones

## Step 3: Email Configuration (Optional)

### 3.1 Set up Resend for Newsletter
1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Add to Supabase Edge Function environment variables:
   ```
   RESEND_API_KEY=your_resend_api_key
   SITE_URL=https://yourdomain.com
   ```

### 3.2 Deploy Newsletter Function
The newsletter function is already included in `supabase/functions/send-newsletter-email/`

## Step 4: Domain and Hosting Setup

### 4.1 Build the Application
```bash
npm run build
```

### 4.2 Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### 4.3 Configure Custom Domain
1. In Netlify dashboard, go to Domain settings
2. Add your custom domain
3. Configure DNS records as instructed by Netlify
4. Enable HTTPS (automatic with Netlify)

### 4.4 Update SEO Settings
Update the following files with your domain:
- `index.html` - Update meta tags and canonical URLs
- `public/sitemap.xml` - Replace URLs with your domain
- `public/robots.txt` - Update sitemap URL

## Step 5: Security Configuration

### 5.1 Row Level Security (RLS)
RLS is already configured in the migration files. Verify policies are active:
- Public read access to published articles
- Admin-only access to management functions
- User-specific access to personal data

### 5.2 API Security
- Supabase RLS handles database security
- Environment variables protect sensitive keys
- Admin functions require authentication

## Step 6: Performance Optimization

### 6.1 CDN Configuration
Netlify automatically provides CDN. For additional optimization:
- Enable Netlify's asset optimization
- Configure caching headers
- Use Netlify's image optimization

### 6.2 Database Optimization
- Indexes are included in migration files
- Monitor query performance in Supabase dashboard
- Set up database backups

## Step 7: Monitoring and Analytics

### 7.1 Supabase Analytics
- Monitor database performance
- Track API usage
- Set up alerts for errors

### 7.2 Website Analytics
Add Google Analytics or your preferred analytics tool:
1. Get tracking code
2. Add to `index.html` or create analytics component
3. Configure goals and conversions

## Step 8: Content Strategy

### 8.1 Content Planning
- Plan article categories based on your expertise
- Create content calendar
- Set up content review process

### 8.2 SEO Optimization
- Optimize article titles and descriptions
- Use relevant keywords in content
- Create internal linking strategy
- Submit sitemap to search engines

## Step 9: Backup and Maintenance

### 9.1 Database Backups
- Supabase provides automatic backups
- Set up additional backup strategy if needed
- Test restore procedures

### 9.2 Regular Maintenance
- Update dependencies monthly
- Review and update content quarterly
- Monitor security updates
- Check broken links and fix issues

## Step 10: Going Live

### 10.1 Pre-Launch Checklist
- [ ] Database migrations completed
- [ ] Admin user created and tested
- [ ] Sample content added
- [ ] Domain configured and SSL enabled
- [ ] SEO meta tags updated
- [ ] Analytics configured
- [ ] Newsletter signup tested
- [ ] Mobile responsiveness verified
- [ ] Performance tested

### 10.2 Launch
1. Update DNS to point to your hosting provider
2. Test all functionality on live domain
3. Submit sitemap to Google Search Console
4. Announce launch on social media

## Troubleshooting

### Common Issues

**Database Connection Issues**
- Verify Supabase URL and keys
- Check network connectivity
- Ensure RLS policies are correct

**Authentication Problems**
- Verify auth settings in Supabase
- Check redirect URLs
- Test with different browsers

**Performance Issues**
- Optimize images and assets
- Check database query performance
- Monitor Netlify build times

### Support Resources
- Supabase Documentation: [docs.supabase.com](https://docs.supabase.com)
- Netlify Documentation: [docs.netlify.com](https://docs.netlify.com)
- React Documentation: [react.dev](https://react.dev)

## Customization Options

### Branding
- Update colors in `tailwind.config.ts`
- Replace logo and favicon
- Customize header and footer

### Features
- Add comment system
- Implement search functionality
- Add user profiles
- Create bookmark system

### Integrations
- Add social media sharing
- Integrate with CRM systems
- Connect to marketing tools
- Add live chat support

This deployment guide provides a complete setup for your Microsoft 365 Admin Knowledge Base. Follow each step carefully and test thoroughly before going live.