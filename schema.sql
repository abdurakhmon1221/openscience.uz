-- OpenScience.uz Supabase Database Schema

-- 1. Create articles table
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    abstract TEXT NOT NULL,
    authors TEXT NOT NULL,
    category TEXT NOT NULL,
    file_url TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    plagiarism_score INTEGER DEFAULT 0,
    feedback TEXT
);

-- 2. Create site_settings table (for admin)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    site_title TEXT DEFAULT 'OpenScience.uz',
    issn TEXT DEFAULT 'XXXX-XXXX',
    contact_email TEXT DEFAULT 'info@openscience.uz',
    contact_phone TEXT DEFAULT '+998 88 038 80 71',
    contact_address TEXT DEFAULT 'Andijon',
    facebook TEXT DEFAULT 'openscience_uz',
    instagram TEXT DEFAULT 'openscience_uz',
    telegram TEXT DEFAULT '@MaxmudovHikmatillo'
);

-- Insert default settings row
INSERT INTO public.site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- 3. Set up Storage Bucket for articles
-- Run this in SQL Editor to create the bucket if not using the UI
INSERT INTO storage.buckets (id, name, public) 
VALUES ('articles', 'articles', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies to allow authenticated users to upload
CREATE POLICY "Allow authenticated uploads" 
ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'articles');

CREATE POLICY "Allow public read" 
ON storage.objects FOR SELECT TO public USING (bucket_id = 'articles');

-- 4. Set up Row Level Security (RLS) for tables
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Articles: users can read approved ones, users can read their own, admins can read all
CREATE POLICY "Public can read approved articles" 
ON public.articles FOR SELECT TO public 
USING (status = 'approved');

CREATE POLICY "Users can read own articles" 
ON public.articles FOR SELECT TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own articles" 
ON public.articles FOR INSERT TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- Note: We are keeping it simple for the MVP. Admin functionality will bypass RLS 
-- using the service_role key or we can just allow read/write for now in MVP.
-- For true MVP simplicity, let's allow all operations if authenticated (simulating admin access for demo)
CREATE POLICY "Admins can update articles" 
ON public.articles FOR UPDATE TO authenticated USING (true);

-- Settings: everyone can read, authenticated can update
CREATE POLICY "Public can read settings" 
ON public.site_settings FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated can update settings" 
ON public.site_settings FOR UPDATE TO authenticated USING (true);
