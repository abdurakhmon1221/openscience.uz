export const metadata = {
  title: "Jurnal Haqida | OpenScience.uz",
  description: "OpenScience.uz jurnali haqida batafsil ma'lumotlar",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl font-bold font-serif text-slate-900 dark:text-white mb-8">Jurnal Haqida (About the Journal)</h1>
        
        <div className="liquid-glass-card p-6 md:p-10 space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
          <p>
            <strong className="text-slate-900 dark:text-white">OpenScience.uz</strong> — bu O'zbekiston va xalqaro miqyosdagi ilmiy izlanishlar, maqolalar va tadqiqotlarni chop etuvchi ochiq kirish (Open Access) tizimidagi akademik platforma. Bizning maqsadimiz ilmiy bilimlarni erkin tarqatish va tadqiqotchilar o'rtasida global hamkorlikni rivojlantirishdir.
          </p>

          <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white mt-8 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Maqsad va Qamrov (Aims and Scope)</h2>
          <p>
            Jurnalimiz quyidagi yo'nalishlarda yuqori sifatli, ilmiy asoslangan maqolalarni qabul qiladi:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Aniq va tabiiy fanlar</li>
            <li>Tibbiyot va farmatsevtika</li>
            <li>Ijtimoiy-gumanitar fanlar</li>
            <li>Iqtisodiyot va boshqaruv</li>
            <li>Axborot texnologiyalari va raqamli iqtisodiyot</li>
          </ul>

          <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white mt-8 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Indekslash (Indexing)</h2>
          <p>
            Barcha chop etilgan maqolalar xalqaro standartlarga mos ravishda rasmiylashtiriladi va quyidagi xalqaro ilmiy bazalarga yuboriladi:
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <span className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded font-bold text-slate-900 dark:text-white shadow-sm">Google Scholar</span>
            <span className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded font-bold text-slate-900 dark:text-white shadow-sm">CrossRef (DOI)</span>
            <span className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded font-bold text-slate-900 dark:text-white shadow-sm">OpenAlex</span>
          </div>

          <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white mt-8 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Peer-Review Jarayoni</h2>
          <p>
            Har bir kelib tushgan maqola "Double-blind peer review" (ikki tomonlama yashirin taqriz) tizimidan o'tadi. Bu orqali maqola sifatining eng yuqori darajada bo'lishi va mualliflar hamda taqrizchilar xolisligi ta'minlanadi.
          </p>
        </div>
      </div>
    </div>
  );
}
