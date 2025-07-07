# Microsoft 365 Admin Knowledge Base

A comprehensive knowledge base website for Microsoft 365 administrators, built with React, TypeScript, and Supabase.

## 🚀 Features

- **Content Management System**: Full admin dashboard for managing articles, categories, and users
- **User Authentication**: Secure login with email/password and Google OAuth
- **Article Management**: Create, edit, and publish articles with rich content
- **Category Organization**: Organize content by Microsoft 365 services
- **Search Functionality**: Find articles quickly with full-text search
- **Newsletter System**: Email subscription and newsletter management
- **Analytics Dashboard**: Track views, likes, and user engagement
- **Responsive Design**: Mobile-first design that works on all devices
- **SEO Optimized**: Built-in SEO features for better search visibility

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Real-time)
- **UI Components**: Radix UI, shadcn/ui
- **Routing**: React Router v6
- **State Management**: TanStack Query
- **Email**: Resend API for newsletters
- **Deployment**: Netlify (or any static hosting)

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account
- Domain name (for production)

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd microsoft-admin-kb
npm install
```

### 2. Environment Setup
Create a `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup
1. Create a new Supabase project
2. Run the migration files in the SQL editor:
   - `supabase/migrations/create_initial_schema.sql`
   - `supabase/migrations/seed_initial_data.sql`

### 4. Start Development
```bash
npm run dev
```

### 5. Create Admin User
1. Sign up for an account at `/auth`
2. Visit `/admin-setup` to make yourself admin
3. Access admin dashboard at `/admin`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin dashboard components
│   └── ui/             # Base UI components (shadcn/ui)
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── data/               # Static data and types
├── integrations/       # Supabase client and types
└── lib/                # Utility functions

supabase/
├── functions/          # Edge functions
└── migrations/         # Database migrations
```

## 🔧 Configuration

### Database Schema
The application uses the following main tables:
- `profiles` - User profiles
- `categories` - Article categories
- `articles` - Main content
- `article_views` - Analytics tracking
- `article_likes` - User engagement
- `newsletter_subscribers` - Email subscriptions
- `user_roles` - Role-based access control

### Authentication
- Email/password authentication
- Google OAuth (optional)
- Role-based access (admin/user)
- Row Level Security (RLS) enabled

### Content Management
- Rich text editor for articles
- Category management
- Tag system
- Featured articles
- Draft/published status

## 🚀 Deployment

### Netlify Deployment
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables
5. Configure custom domain

### Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Domain Configuration
1. Update SEO meta tags in `index.html`
2. Update sitemap URLs in `public/sitemap.xml`
3. Configure DNS records for your domain

## 📊 Admin Features

### Dashboard
- Analytics overview
- User management
- Content statistics
- Recent activity

### Content Management
- Create and edit articles
- Manage categories
- Moderate comments
- Newsletter management

### User Management
- View all users
- Assign admin roles
- Track user activity
- Audit logs

## 🎨 Customization

### Branding
- Update colors in `tailwind.config.ts`
- Replace logo and favicon
- Customize header and footer components

### Content Categories
Default categories include:
- Outlook / Exchange Online
- Teams Administration
- Microsoft Intune/MDM
- Azure AD
- SharePoint
- Security/Defender
- PowerShell Scripts

### Features
- Comment system (ready for implementation)
- Social sharing
- Bookmarks
- User profiles

## 🔒 Security

### Database Security
- Row Level Security (RLS) enabled
- Admin-only access to management functions
- User-specific data access

### Authentication Security
- Secure password requirements
- OAuth integration
- Session management
- CSRF protection

### Content Security
- Input sanitization
- XSS prevention
- Content moderation
- Spam protection

## 📈 SEO Features

- Semantic HTML structure
- Meta tags optimization
- Open Graph tags
- Twitter Cards
- JSON-LD structured data
- XML sitemap
- Robots.txt
- Canonical URLs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the deployment guide
- Review Supabase documentation
- Open an issue on GitHub

## 🔄 Updates

Regular updates include:
- Security patches
- Feature enhancements
- Performance improvements
- Bug fixes

Keep your dependencies updated and monitor for security advisories.

---

Built with ❤️ for the Microsoft 365 admin community