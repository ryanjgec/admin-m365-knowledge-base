/*
  # Initial Database Schema Setup

  1. New Tables
    - `profiles` - User profile information
    - `categories` - Article categories with metadata
    - `articles` - Main articles content
    - `article_views` - Track article view analytics
    - `article_likes` - Track article likes
    - `article_comments` - User comments on articles
    - `newsletter_subscribers` - Newsletter subscription management
    - `user_roles` - User role management (admin/user)
    - `admin_audit_logs` - Admin action logging

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for each table
    - Create admin and user role management

  3. Functions
    - User role checking functions
    - Article analytics update functions
    - Admin management functions
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum for user roles
CREATE TYPE app_role AS ENUM ('admin', 'user');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text,
  icon text,
  color text DEFAULT 'bg-blue-500',
  article_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  category text NOT NULL REFERENCES categories(id),
  tags text[] DEFAULT '{}',
  author_id uuid REFERENCES profiles(id),
  status text DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  featured boolean DEFAULT false,
  read_time text DEFAULT '5 min read',
  view_count integer DEFAULT 0,
  like_count integer DEFAULT 0,
  comment_count integer DEFAULT 0,
  published_at timestamptz DEFAULT now(),
  scheduled_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create article_views table
CREATE TABLE IF NOT EXISTS article_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id),
  ip_address text,
  user_agent text,
  viewed_at timestamptz DEFAULT now()
);

-- Create article_likes table
CREATE TABLE IF NOT EXISTS article_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(article_id, user_id)
);

-- Create article_comments table
CREATE TABLE IF NOT EXISTS article_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  is_active boolean DEFAULT true,
  subscribed_at timestamptz DEFAULT now(),
  unsubscribed_at timestamptz
);

-- Create user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role app_role DEFAULT 'user',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Create admin_audit_logs table
CREATE TABLE IF NOT EXISTS admin_audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id uuid NOT NULL REFERENCES profiles(id),
  action text NOT NULL,
  resource_type text NOT NULL,
  resource_id text,
  details jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view all profiles"
  ON profiles
  FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create policies for categories
CREATE POLICY "Anyone can view categories"
  ON categories
  FOR SELECT
  USING (true);

CREATE POLICY "Only admins can manage categories"
  ON categories
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  ));

-- Create policies for articles
CREATE POLICY "Anyone can view published articles"
  ON articles
  FOR SELECT
  USING (status = 'published');

CREATE POLICY "Admins can manage all articles"
  ON articles
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  ));

-- Create policies for article_views
CREATE POLICY "Anyone can create article views"
  ON article_views
  FOR INSERT
  USING (true);

CREATE POLICY "Admins can view all article views"
  ON article_views
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  ));

-- Create policies for article_likes
CREATE POLICY "Users can manage their own likes"
  ON article_likes
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view like counts"
  ON article_likes
  FOR SELECT
  USING (true);

-- Create policies for article_comments
CREATE POLICY "Anyone can view approved comments"
  ON article_comments
  FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Users can create comments"
  ON article_comments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
  ON article_comments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all comments"
  ON article_comments
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  ));

-- Create policies for newsletter_subscribers
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers
  FOR INSERT
  USING (true);

CREATE POLICY "Admins can view all subscribers"
  ON newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  ));

-- Create policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON user_roles
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  ));

-- Create policies for admin_audit_logs
CREATE POLICY "Admins can view audit logs"
  ON admin_audit_logs
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  ));

-- Create helper functions
CREATE OR REPLACE FUNCTION has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION is_admin(user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_roles.user_id = $1
      AND role = 'admin'
  );
$$;

-- Function to update article counts
CREATE OR REPLACE FUNCTION update_article_counts()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  UPDATE public.articles 
  SET view_count = (
    SELECT COUNT(*) FROM public.article_views 
    WHERE article_id = NEW.article_id
  )
  WHERE id = NEW.article_id;
  
  RETURN NEW;
END;
$$;

-- Function to update like counts
CREATE OR REPLACE FUNCTION update_like_counts()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.articles 
    SET like_count = like_count + 1
    WHERE id = NEW.article_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.articles 
    SET like_count = like_count - 1
    WHERE id = OLD.article_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Function to update comment counts
CREATE OR REPLACE FUNCTION update_comment_counts()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status = 'approved' THEN
    UPDATE public.articles 
    SET comment_count = comment_count + 1
    WHERE id = NEW.article_id;
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' AND OLD.status != 'approved' AND NEW.status = 'approved' THEN
    UPDATE public.articles 
    SET comment_count = comment_count + 1
    WHERE id = NEW.article_id;
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' AND OLD.status = 'approved' AND NEW.status != 'approved' THEN
    UPDATE public.articles 
    SET comment_count = comment_count - 1
    WHERE id = NEW.article_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' AND OLD.status = 'approved' THEN
    UPDATE public.articles 
    SET comment_count = comment_count - 1
    WHERE id = OLD.article_id;
    RETURN OLD;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Function to manage user roles (admin only)
CREATE OR REPLACE FUNCTION update_user_role(target_user_id uuid, new_role app_role)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Only admins can change roles
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Insufficient permissions';
  END IF;

  -- Delete existing role
  DELETE FROM public.user_roles WHERE user_id = target_user_id;
  
  -- Insert new role
  INSERT INTO public.user_roles (user_id, role) VALUES (target_user_id, new_role);
  
  -- Log the action
  INSERT INTO public.admin_audit_logs (admin_user_id, action, resource_type, resource_id, details)
  VALUES (
    auth.uid(), 
    'role_change', 
    'user', 
    target_user_id::text, 
    jsonb_build_object('new_role', new_role)
  );
  
  RETURN true;
END;
$$;

-- Create triggers
CREATE TRIGGER update_article_view_counts
  AFTER INSERT ON article_views
  FOR EACH ROW
  EXECUTE FUNCTION update_article_counts();

CREATE TRIGGER update_article_like_counts
  AFTER INSERT OR DELETE ON article_likes
  FOR EACH ROW
  EXECUTE FUNCTION update_like_counts();

CREATE TRIGGER update_article_comment_counts
  AFTER INSERT OR UPDATE OR DELETE ON article_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_comment_counts();

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  
  -- Assign default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();