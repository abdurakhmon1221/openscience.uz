"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import type { Locale } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/client";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
    
    // Get initial session
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const locales: { code: Locale; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'uz', label: 'UZ' },
    { code: 'ru', label: 'RU' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full liquid-glass border-b border-white/20 dark:border-slate-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-amber-500 dark:from-blue-400 dark:to-amber-400 font-serif tracking-tight">
                OpenScience
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-300">
            <Link href="/about" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">{t('nav_about')}</Link>
            <Link href="/editorial-board" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">{t('nav_editorial')}</Link>
            <Link href="/archives" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">{t('nav_archives')}</Link>
            <Link href="/authors" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">{t('nav_authors')}</Link>
            <Link href="/contact" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">{t('nav_contact')}</Link>
          </nav>

          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="hidden md:flex items-center gap-1 border border-slate-200 dark:border-slate-700 rounded-full p-1 bg-white/60 dark:bg-slate-800/60">
              {locales.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLocale(l.code)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all ${
                    locale === l.code
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}

            {user ? (
              <Link
                href="/dashboard"
                className="hidden md:inline-flex items-center justify-center rounded-full bg-slate-800 dark:bg-slate-700 px-4 py-2 text-sm font-medium text-white shadow hover:bg-slate-900 dark:hover:bg-slate-600 transition-colors"
              >
                Mening Kabinetim
              </Link>
            ) : (
              <Link
                href="/login"
                className="hidden md:inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 transition-colors"
              >
                Kabinetga kirish
              </Link>
            )}

            <button
              className="md:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 liquid-glass">
          <nav className="flex flex-col p-4 gap-3">
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">{t('nav_about')}</Link>
            <Link href="/editorial-board" onClick={() => setMobileMenuOpen(false)} className="font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">{t('nav_editorial')}</Link>
            <Link href="/archives" onClick={() => setMobileMenuOpen(false)} className="font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">{t('nav_archives')}</Link>
            <Link href="/authors" onClick={() => setMobileMenuOpen(false)} className="font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">{t('nav_authors')}</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">{t('nav_contact')}</Link>
            {/* Mobile Language Switcher */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
              {locales.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLocale(l.code)}
                  className={`px-3 py-1 text-sm font-bold rounded-full border transition-all ${
                    locale === l.code
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            {user ? (
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="w-full text-center rounded-full bg-slate-800 dark:bg-slate-700 px-4 py-2 text-sm font-medium text-white shadow">
                Mening Kabinetim
              </Link>
            ) : (
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow">
                Kabinetga kirish
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
