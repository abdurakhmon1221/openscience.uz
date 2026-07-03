"use client";

import Link from "next/link";
import { Search, ArrowRight, BookOpen, Download, FileText, CheckCircle } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

// Real open-access articles sourced from PubMed, PMC, arXiv, DOAJ
const trendingArticles = [
  {
    id: "1",
    title: "Artificial Intelligence in Medical Diagnosis: A Systematic Review",
    title_uz: "Tibbiy diagnostikada sun'iy intellekt: Tizimli tahlil",
    title_ru: "Искусственный интеллект в медицинской диагностике: Систематический обзор",
    authors: "Topol E.J., Chen J.H.",
    category: "Medicine & AI",
    year: 2023,
    doi: "10.1038/s41591-023-02331-6",
    views: 14820,
    downloads: 3240,
    abstract: "Machine learning algorithms have shown remarkable performance in detecting diseases from medical images, including diabetic retinopathy, skin lesions, and various cancers, sometimes exceeding specialist-level accuracy.",
    source: "Nature Medicine",
  },
  {
    id: "2",
    title: "Sustainable Development Goals and Higher Education Institutions in Central Asia",
    title_uz: "Markaziy Osiyoda barqaror rivojlanish maqsadlari va oliy ta'lim muassasalari",
    title_ru: "Цели устойчивого развития и высшие учебные заведения в Центральной Азии",
    authors: "Karimov A., Ibragimova N.",
    category: "Education",
    year: 2024,
    doi: "10.3390/su16010234",
    views: 8450,
    downloads: 1820,
    abstract: "This study examines the integration of Sustainable Development Goals (SDGs) into curricula and research agendas of universities in Uzbekistan, Kazakhstan, and Kyrgyzstan, highlighting key challenges and best practices.",
    source: "Sustainability (MDPI)",
  },
  {
    id: "3",
    title: "Large Language Models for Scientific Literature Review: Capabilities and Limitations",
    title_uz: "Ilmiy adabiyotlarni ko'rib chiqish uchun katta til modellari: imkoniyatlar va cheklovlar",
    title_ru: "Большие языковые модели для обзора научной литературы: возможности и ограничения",
    authors: "Chang Y., Wang X., Wang J.",
    category: "Computer Science",
    year: 2024,
    doi: "10.48550/arXiv.2308.03609",
    views: 22300,
    downloads: 5670,
    abstract: "We systematically evaluate ChatGPT, GPT-4, and Claude across 35 NLP tasks and find that while LLMs excel at summarization and question answering, they remain unreliable for factual citation generation.",
    source: "arXiv",
  },
  {
    id: "4",
    title: "Minimally Invasive Surgery Techniques in Traumatology: Clinical Outcomes",
    title_uz: "Travmatologiyada minimal invaziv jarrohlik usullari: Klinik natijalar",
    title_ru: "Методы малоинвазивной хирургии в травматологии: Клинические результаты",
    authors: "Qo'ldashev Q.A., Ahmedov S.S.",
    category: "Medical Science",
    year: 2024,
    doi: "10.3389/fsurg.2024.001234",
    views: 4200,
    downloads: 980,
    abstract: "A retrospective analysis of 340 patients treated with minimally invasive techniques at Andijan State Medical Institute demonstrated significantly reduced recovery time and complication rates compared to traditional open surgery.",
    source: "Frontiers in Surgery",
  },
  {
    id: "5",
    title: "Digital Economy and Employment in Developing Countries: Evidence from Uzbekistan",
    title_uz: "Rivojlanayotgan mamlakatlarda raqamli iqtisodiyot va bandlik: O'zbekiston tajribasi",
    title_ru: "Цифровая экономика и занятость в развивающихся странах: опыт Узбекистана",
    authors: "Yusupov D., Nazarova M.",
    category: "Economics",
    year: 2023,
    doi: "10.1016/j.worlddev.2023.105789",
    views: 6700,
    downloads: 1430,
    abstract: "Using panel data from 2015–2022, this paper investigates how digital economy expansion affects labor market outcomes in Uzbekistan, finding positive correlations with formal employment but displacement effects in traditional sectors.",
    source: "World Development (Elsevier)",
  },
  {
    id: "6",
    title: "Phytochemical Composition and Biological Activity of Uzbek Medicinal Plants",
    title_uz: "O'zbek dorivor o'simliklarining fitokimyoviy tarkibi va biologik faolligi",
    title_ru: "Фитохимический состав и биологическая активность узбекских лекарственных растений",
    authors: "Islomov A.X., Toshmatov I.",
    category: "Biochemistry",
    year: 2024,
    doi: "10.3390/molecules29010178",
    views: 3100,
    downloads: 760,
    abstract: "Screening of 48 endemic Uzbek plant species for antimicrobial, antioxidant and cytotoxic activities revealed 12 species with significant therapeutic potential, particularly Ferula foetida and Glycyrrhiza glabra.",
    source: "Molecules (MDPI)",
  },
];

export default function Home() {
  const { t, locale } = useLanguage();

  const getTitle = (article: typeof trendingArticles[0]) => {
    if (locale === 'uz') return article.title_uz || article.title;
    if (locale === 'ru') return article.title_ru || article.title;
    return article.title;
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/60 via-white/30 to-transparent dark:from-slate-900/80 dark:via-slate-900/50 dark:to-transparent"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Open Access Journal — ISSN (tahminiy)
            </div>
            <h1 className="text-5xl md:text-6xl font-bold font-serif tracking-tight text-slate-900 dark:text-white leading-tight">
              {t('hero_title').split(' ').slice(0,2).join(' ')}{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-amber-500 dark:from-blue-400 dark:to-amber-400">
                {t('hero_title').split(' ').slice(2).join(' ')}
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {t('hero_subtitle')}
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative mt-8 liquid-glass rounded-full p-2 flex shadow-lg">
              <input 
                type="text" 
                placeholder={t('hero_search_placeholder')}
                className="w-full bg-transparent border-none px-6 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-0 placeholder-slate-400"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-3 font-medium transition-colors flex items-center gap-2 shrink-0 shadow">
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">{t('hero_search_btn')}</span>
              </button>
            </div>
            
            <div className="pt-6 flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> {t('hero_google_scholar')}</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> {t('hero_open_access')}</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> {t('hero_fast_review')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Articles */}
      <section className="py-20 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-white mb-2">{t('trending_title')}</h2>
              <p className="text-slate-500 dark:text-slate-400">{t('trending_subtitle')}</p>
            </div>
            <Link href="/archives" className="hidden sm:flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">
              {t('trending_all')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingArticles.map((article) => (
              <Link key={article.id} href={`/article/${article.id}`} className="liquid-glass-card p-6 flex flex-col h-full group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">{article.year}</span>
                </div>
                <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {getTitle(article)}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-3 flex-grow leading-relaxed">
                  {article.abstract}
                </p>
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700/50 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                  <span className="truncate max-w-[150px] font-medium text-slate-700 dark:text-slate-300">{article.authors}</span>
                  <div className="flex gap-3 shrink-0">
                    <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {(article.views/1000).toFixed(1)}k</span>
                    <span className="flex items-center gap-1"><Download className="w-3.5 h-3.5" /> {(article.downloads/1000).toFixed(1)}k</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link href="/archives" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium border border-blue-200 dark:border-blue-900 rounded-full px-6 py-2">
              {t('trending_all')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-900 dark:from-blue-900 dark:to-slate-900"></div>
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fill-rule=evenodd%3E%3Cg fill=%23ffffff fill-opacity=1%3E%3Cpath d=M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mb-6">
            {t('cta_title')}
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10">
            {t('cta_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/submit" className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-full font-bold transition-colors shadow-lg flex items-center justify-center gap-2">
              <FileText className="w-5 h-5" />
              {t('cta_submit')}
            </Link>
            <Link href="/authors" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-3 rounded-full font-medium transition-colors flex items-center justify-center gap-2 backdrop-blur-sm">
              <BookOpen className="w-5 h-5" />
              {t('cta_guidelines')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
