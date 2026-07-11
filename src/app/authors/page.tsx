"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { FileText, Download, CheckCircle, CreditCard, AlertTriangle, BookOpen, ArrowRight } from "lucide-react";

export default function AuthorsPage() {
  const { t } = useLanguage();

  const sections = [
    {
      id: "guidelines",
      icon: <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: t('authors_guidelines'),
      content: (
        <div className="space-y-4 text-slate-600 dark:text-slate-300">
          <p>Maqolangiz quyidagi talablarga javob berishi shart:</p>
          <ul className="space-y-2 list-none">
            {[
              "Maqola ilgari hech qayerda chop etilmagan va hozir boshqa jurnalda ko'rib chiqilmayotgan bo'lishi kerak.",
              "Maqola O'zbek, Rus yoki Ingliz tilida bo'lishi mumkin.",
              "Hajmi: kamida 4 sahifa, ko'pi bilan 20 sahifa (A4 format, 12 pt Times New Roman).",
              "Annotatsiya (Abstract): 200–300 so'z. Kalit so'zlar: 5–7 ta.",
              "Adabiyotlar ro'yxati APA yoki MLA standartida rasmiylashtirilishi kerak.",
              "Barcha mualliflarning ORCID ID raqamlari (bo'lsa) ko'rsatilishi tavsiya etiladi.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: "template",
      icon: <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: t('authors_template'),
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-300">
            Maqolangizni tayyorlashda quyidagi rasmiy shablon (template) dan foydalaning. Shablon barcha kerakli bo'limlarni (Sarlavha, Annotatsiya, Kirish, Metodologiya, Natijalar, Xulosa, Adabiyotlar) o'z ichiga oladi.
          </p>
          <a
            href="/templates/OpenScience_Template.docx"
            download
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow"
          >
            <Download className="w-5 h-5" />
            Shablonni Yuklab Olish (.docx)
          </a>
        </div>
      ),
    },
    {
      id: "payment",
      icon: <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: t('authors_payment'),
      content: (
        <div className="space-y-4 text-slate-600 dark:text-slate-300">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-xl p-4 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 dark:text-amber-200">
              Maqolani nashr etish uchun <strong>Maqola Islov Berish To'lovi (APC — Article Processing Charge)</strong> oldindan to'lanishi talab etiladi. To'lov faqat maqola tahririyat tomonidan qabul qilinganidan keyin amalga oshiriladi.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800">
                  <th className="text-left px-4 py-2 rounded-tl-lg text-slate-900 dark:text-white">Tur</th>
                  <th className="text-left px-4 py-2 text-slate-900 dark:text-white">Narx</th>
                  <th className="text-left px-4 py-2 rounded-tr-lg text-slate-900 dark:text-white">Izoh</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr>
                  <td className="px-4 py-3">O'zbekiston mualliflari</td>
                  <td className="px-4 py-3 font-semibold text-blue-600 dark:text-blue-400">500,000 so'm</td>
                  <td className="px-4 py-3 text-slate-500">DOI sertifikati kiradi</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Xalqaro mualliflar</td>
                  <td className="px-4 py-3 font-semibold text-blue-600 dark:text-blue-400">50 USD</td>
                  <td className="px-4 py-3 text-slate-500">DOI + Certificate</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm">To'lov rekvizitlari uchun: <a href="mailto:info@openscience.uz" className="text-blue-600 dark:text-blue-400 hover:underline">info@openscience.uz</a></p>
        </div>
      ),
    },
    {
      id: "plagiarism",
      icon: <AlertTriangle className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: t('authors_plagiarism'),
      content: (
        <div className="space-y-3 text-slate-600 dark:text-slate-300">
          <p>Barcha maqolalar maxsus antiplagiat tizimi orqali tekshiriladi:</p>
          <ul className="space-y-2">
            {[
              "Minimal originallik darajasi: 75%",
              "Boshqa manbalarga iqtiboslar to'g'ri ko'rsatilgan bo'lishi shart",
              "O'zining ilgari chop etilgan asarlaridan 20% dan ortiq foydalanish taqiqlanadi",
              "Maqola bir vaqtning o'zida boshqa jurnalga yuborilmasligi kerak",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: "ethics",
      icon: <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: t('authors_ethics'),
      content: (
        <div className="space-y-3 text-slate-600 dark:text-slate-300">
          <p>
            OpenScience.uz <strong className="text-slate-900 dark:text-white">COPE (Committee on Publication Ethics)</strong> standartlariga rioya qiladi. Barcha mualliflar, taqrizchilar va muharrirlar ushbu tamoyillarga amal qilishlari shart.
          </p>
          <ul className="space-y-2">
            {[
              "Haqiqiy va tasdiqlangan tadqiqot ma'lumotlari taqdim etilishi shart",
              "Mualliflik huquqiga ega bo'lgan barcha shaxslar muallif sifatida ko'rsatilishi kerak",
              "Manfaatlar to'qnashuvi (Conflict of Interest) oshkor etilishi shart",
              "Inson ishtirokidagi tadqiqotlarda etik ruxsatnoma talab qilinadi",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold font-serif text-slate-900 dark:text-white mb-4">{t('authors_title')}</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{t('authors_subtitle')}</p>
        </div>

        {/* Quick nav */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="px-4 py-2 text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all">
              {s.title}
            </a>
          ))}
        </div>

        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.id} id={section.id} className="liquid-glass-card p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                  {section.icon}
                </div>
                <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">{section.title}</h2>
              </div>
              {section.content}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-4">Maqolangizni yuborishga tayyormisiz?</p>
          <Link href="/submit" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-colors shadow-lg">
            Maqola Yuklash <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
