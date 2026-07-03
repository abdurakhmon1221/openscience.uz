import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/dashboard/', '/api/'], // Protect private routes from crawling
    },
    sitemap: 'https://openscience.com.uz/sitemap.xml',
  };
}
