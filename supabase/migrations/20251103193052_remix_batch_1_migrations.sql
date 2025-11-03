
-- Migration: 20251103113101

-- Migration: 20251029132625

-- Migration: 20251029122404

-- Migration: 20251028122959

-- Migration: 20251013024056
-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('supervisor', 'user');

-- Create user roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create storage bucket for news media
INSERT INTO storage.buckets (id, name, public)
VALUES ('news-media', 'news-media', true);

-- Storage policies for news media
CREATE POLICY "Anyone can view news media"
ON storage.objects FOR SELECT
USING (bucket_id = 'news-media');

CREATE POLICY "Supervisors can upload news media"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'news-media' 
  AND public.has_role(auth.uid(), 'supervisor')
);

CREATE POLICY "Supervisors can update news media"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'news-media' 
  AND public.has_role(auth.uid(), 'supervisor')
);

CREATE POLICY "Supervisors can delete news media"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'news-media' 
  AND public.has_role(auth.uid(), 'supervisor')
);

-- Create news_items table
CREATE TABLE public.news_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on news_items
ALTER TABLE public.news_items ENABLE ROW LEVEL SECURITY;

-- RLS policies for news_items
CREATE POLICY "Anyone can view published news"
ON public.news_items FOR SELECT
USING (published = true);

CREATE POLICY "Supervisors can view all news"
ON public.news_items FOR SELECT
USING (public.has_role(auth.uid(), 'supervisor'));

CREATE POLICY "Supervisors can insert news"
ON public.news_items FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'supervisor'));

CREATE POLICY "Supervisors can update news"
ON public.news_items FOR UPDATE
USING (public.has_role(auth.uid(), 'supervisor'));

CREATE POLICY "Supervisors can delete news"
ON public.news_items FOR DELETE
USING (public.has_role(auth.uid(), 'supervisor'));

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_news_items_updated_at
BEFORE UPDATE ON public.news_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- RLS policy for user_roles (users can view their own roles)
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

-- Migration: 20251013024121
-- Fix the search path for update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Migration: 20251027134337
-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  event_date TIMESTAMP WITH TIME ZONE,
  location TEXT,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create resources table
CREATE TABLE public.resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT,
  category TEXT,
  published BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create donations table for tracking
CREATE TABLE public.donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_name TEXT,
  donor_email TEXT,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'ZAR',
  donation_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT DEFAULT 'completed',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Events RLS policies
CREATE POLICY "Anyone can view published events"
  ON public.events FOR SELECT
  USING (published = true);

CREATE POLICY "Supervisors can view all events"
  ON public.events FOR SELECT
  USING (has_role(auth.uid(), 'supervisor'::app_role));

CREATE POLICY "Supervisors can insert events"
  ON public.events FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'supervisor'::app_role));

CREATE POLICY "Supervisors can update events"
  ON public.events FOR UPDATE
  USING (has_role(auth.uid(), 'supervisor'::app_role));

CREATE POLICY "Supervisors can delete events"
  ON public.events FOR DELETE
  USING (has_role(auth.uid(), 'supervisor'::app_role));

-- Resources RLS policies
CREATE POLICY "Anyone can view published resources"
  ON public.resources FOR SELECT
  USING (published = true);

CREATE POLICY "Supervisors can view all resources"
  ON public.resources FOR SELECT
  USING (has_role(auth.uid(), 'supervisor'::app_role));

CREATE POLICY "Supervisors can insert resources"
  ON public.resources FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'supervisor'::app_role));

CREATE POLICY "Supervisors can update resources"
  ON public.resources FOR UPDATE
  USING (has_role(auth.uid(), 'supervisor'::app_role));

CREATE POLICY "Supervisors can delete resources"
  ON public.resources FOR DELETE
  USING (has_role(auth.uid(), 'supervisor'::app_role));

-- Donations RLS policies
CREATE POLICY "Supervisors can view all donations"
  ON public.donations FOR SELECT
  USING (has_role(auth.uid(), 'supervisor'::app_role));

CREATE POLICY "Supervisors can insert donations"
  ON public.donations FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'supervisor'::app_role));

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('event-media', 'event-media', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('resources', 'resources', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for event-media
CREATE POLICY "Anyone can view event media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'event-media');

CREATE POLICY "Supervisors can upload event media"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'event-media' AND 
    has_role(auth.uid(), 'supervisor'::app_role)
  );

CREATE POLICY "Supervisors can update event media"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'event-media' AND 
    has_role(auth.uid(), 'supervisor'::app_role)
  );

CREATE POLICY "Supervisors can delete event media"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'event-media' AND 
    has_role(auth.uid(), 'supervisor'::app_role)
  );

-- Storage policies for resources
CREATE POLICY "Anyone can view resources"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'resources');

CREATE POLICY "Supervisors can upload resources"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'resources' AND 
    has_role(auth.uid(), 'supervisor'::app_role)
  );

CREATE POLICY "Supervisors can update resources"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'resources' AND 
    has_role(auth.uid(), 'supervisor'::app_role)
  );

CREATE POLICY "Supervisors can delete resources"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'resources' AND 
    has_role(auth.uid(), 'supervisor'::app_role)
  );

-- Add update triggers
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_resources_updated_at
  BEFORE UPDATE ON public.resources
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();




