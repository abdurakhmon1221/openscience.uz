import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://openscience.com.uz';
  
  // Standard routes
  const routes = [
    '',
    '/about',
    '/archives',
    '/authors',
    '/contact',
    '/login',
    '/register'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    // We use standard supabase-js client here because sitemap generation 
    // happens at build time or cache revalidation time, and server cookies aren't needed
    // for public read-only data.
    let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
    let supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

    if (!supabaseUrl.startsWith('http')) {
      supabaseUrl = 'https://placeholder.supabase.co';
    }
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: articles } = await supabase
      .from('articles')
      .select('id, updated_at')
      .eq('status', 'approved');

    const articleRoutes = (articles || []).map((article) => ({
      url: `${baseUrl}/article/${article.id}`,
      lastModified: new Date(article.updated_at || new Date()).toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.9, // High priority for Google Scholar indexing
    }));

    return [...routes, ...articleRoutes];
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return routes;
  }
}
