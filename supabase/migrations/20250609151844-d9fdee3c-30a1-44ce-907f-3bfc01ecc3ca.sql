
-- Fix security issues by updating all functions to have immutable search_path

-- Update has_role function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = ''
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$function$;

-- Update is_admin function
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid DEFAULT auth.uid())
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = ''
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_roles.user_id = $1
      AND role = 'admin'
  );
$function$;

-- Update update_article_counts function
CREATE OR REPLACE FUNCTION public.update_article_counts()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
BEGIN
  -- Update view count
  UPDATE public.articles 
  SET view_count = (
    SELECT COUNT(*) FROM public.article_views 
    WHERE article_id = NEW.article_id
  )
  WHERE id = NEW.article_id;
  
  RETURN NEW;
END;
$function$;

-- Update update_like_counts function
CREATE OR REPLACE FUNCTION public.update_like_counts()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
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
$function$;

-- Update update_comment_counts function
CREATE OR REPLACE FUNCTION public.update_comment_counts()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
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
$function$;

-- Update update_user_role function
CREATE OR REPLACE FUNCTION public.update_user_role(target_user_id uuid, new_role app_role)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
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
$function$;

-- Add basic RLS policies for tables that have RLS enabled but no policies
-- First check if these tables exist in the Articles schema and add policies if needed

-- Add policy for articles table if it exists and needs policies
DO $$ 
BEGIN
  -- Check if the table exists and add a basic policy
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'articles') THEN
    -- Add basic read policy for articles
    DROP POLICY IF EXISTS "Allow public read access to published articles" ON public.articles;
    CREATE POLICY "Allow public read access to published articles" 
    ON public.articles 
    FOR SELECT 
    USING (status = 'published');
    
    -- Add admin write policy for articles
    DROP POLICY IF EXISTS "Allow admin full access to articles" ON public.articles;
    CREATE POLICY "Allow admin full access to articles" 
    ON public.articles 
    FOR ALL 
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));
  END IF;
END $$;
