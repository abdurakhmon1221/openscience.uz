import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FileText, Download, User, Calendar, BookOpen, Tag } from "lucide-react";
import { Metadata } from "next";

// Dinamik Meta teglarni generatsiya qilish (Google Scholar va SEO uchun)
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const supabase = await createClient();
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!article) return { title: "Maqola topilmadi | OpenScience" };

  // Google Scholar multiple authors support
  const authorList = article.authors.split(',').map((a: string) => a.trim());

  return {
    title: `${article.title} | OpenScience`,
    description: article.abstract ? article.abstract.substring(0, 160) + '...' : 'Ilmiy maqola',
    authors: authorList.map((a: string) => ({ name: a })),
    openGraph: {
      title: article.title,
      description: article.abstract ? article.abstract.substring(0, 160) + '...' : 'Ilmiy maqola',
      url: `https://openscience.com.uz/article/${article.id}`,
      type: "article",
      publishedTime: article.created_at,
    },
    keywords: article.keywords ? article.keywords.split(',').map((k: string) => k.trim()) : [],
    // Highwire Press / Google Scholar maxsus teglari
    other: {
      "citation_title": article.title,
      "citation_author": authorList, 
      "citation_keywords": article.keywords, 
      "citation_publication_date": new Date(article.created_at).toISOString().split('T')[0].replace(/-/g, '/'),
      "citation_journal_title": "OpenScience",
      "citation_pdf_url": `https://openscience.com.uz/api/documents?mode=watermark&id=${article.id}`,
      "citation_language": "uz",
    }
  };
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  
  const { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !article) {
    notFound();
  }

  const authorList = article.authors.split(',').map((a: string) => a.trim());

  // JSON-LD Schema Markup (Structured Data)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "headline": article.title,
    "abstract": article.abstract,
    "author": authorList.map((name: string) => ({
      "@type": "Person",
      "name": name
    })),
    "datePublished": article.created_at,
    "publisher": {
      "@type": "Organization",
      "name": "OpenScience",
      "logo": {
        "@type": "ImageObject",
        "url": "https://openscience.com.uz/favicon.ico"
      }
    },
    "url": `https://openscience.com.uz/article/${article.id}`,
    "keywords": article.keywords,
    "about": {
      "@type": "Thing",
      "name": article.category
    }
  };

  return (
    <>
      {/* Schema.org skriptini qo'shish */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen py-12 bg-slate-50 dark:bg-slate-900/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="mb-6 flex items-center text-sm text-slate-500">
            <Link href="/" className="hover:text-blue-600">Bosh sahifa</Link>
            <span className="mx-2">/</span>
            <Link href="/archives" className="hover:text-blue-600">Arxiv</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900 dark:text-slate-300">Maqola sahifasi</span>
          </div>

          <div className="liquid-glass-card p-8 md:p-10">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" /> {article.category}
              </span>
              <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" /> Tasdiqlangan Nashr
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 dark:text-white leading-tight mb-6">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 py-4 border-y border-slate-200 dark:border-slate-700 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Muallif(lar)</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{article.authors}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Nashr sanasi</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {new Date(article.created_at).toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Jurnal</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">OpenScience</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Annotatsiya (Abstract)</h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                {article.abstract}
              </p>
            </div>

            {article.keywords && (
              <div className="mb-10">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Kalit so'zlar:</h3>
                <div className="flex flex-wrap gap-2">
                  {article.keywords.split(',').map((kw: string, i: number) => (
                    <span key={i} className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs px-2.5 py-1 rounded-md">
                      {kw.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
              <a 
                href={`/api/documents?mode=watermark&id=${article.id}`} 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" /> Maqolani o'qish (PDF)
              </a>
              <a 
                href={`/api/documents?mode=cert2&id=${article.id}`} 
                className="flex-1 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" /> Nashr sertifikati
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Icon for CheckCircle since it was used but not imported
function CheckCircle(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  );
}
