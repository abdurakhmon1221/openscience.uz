"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-1">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-amber-500 font-serif tracking-tight">
                OpenScience
              </span>
              <span className="text-sm font-bold text-slate-400">.uz</span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t('footer_tagline')}
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://facebook.com/openscience_uz" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="Facebook">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://instagram.com/openscience_uz" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors" aria-label="Instagram">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              {/* Telegram - hidden icon, only show on hover */}
              <a href="https://t.me/MaxmudovHikmatillo" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 dark:hover:text-blue-400 transition-colors" title="Telegram: @MaxmudovHikmatillo" aria-label="Telegram">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.68c.223-.198-.054-.31-.346-.11l-6.4 4.02-2.76-.89c-.6-.188-.612-.6.126-.89l10.814-4.168c.5-.188.937.114.774.885z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{t('footer_links')}</h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav_about')}</Link></li>
              <li><Link href="/editorial-board" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav_editorial')}</Link></li>
              <li><Link href="/archives" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav_archives')}</Link></li>
              <li><Link href="/authors" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav_authors')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{t('footer_policies')}</h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><Link href="/authors#guidelines" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('authors_guidelines')}</Link></li>
              <li><Link href="/authors#plagiarism" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('authors_plagiarism')}</Link></li>
              <li><Link href="/authors#payment" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('authors_payment')}</Link></li>
              <li><Link href="/authors#ethics" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('authors_ethics')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{t('footer_contact_title')}</h3>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>Andijon viloyati, Andijon shahar, Milliy tiklanish ko'chasi 28</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <a href="tel:+998880388071" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">+998 88 038 80 71</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <a href="mailto:info@openscience.uz" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">info@openscience.uz</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} OpenScience. {t('footer_rights')}</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('footer_privacy')}</Link>
            <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('footer_terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
