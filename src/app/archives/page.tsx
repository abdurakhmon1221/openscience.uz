import Link from "next/link";
import { BookMarked, Download } from "lucide-react";

export const metadata = {
  title: "Jurnal Arxivi | OpenScience.uz",
  description: "Barcha chop etilgan jild va sonlar arxivi",
};

export default function ArchivesPage() {
  const archives = [
    { year: 2026, volume: 1, issues: [2, 1] },
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <h1 className="text-4xl font-bold font-serif text-slate-900 dark:text-white mb-8">Jurnal Arxivi</h1>
        
        <div className="space-y-12">
          {archives.map((arch) => (
            <div key={arch.year} className="liquid-glass-card p-6 md:p-8">
              <h2 className="text-2xl font-bold border-b border-slate-200 dark:border-slate-700 pb-4 mb-6 flex items-center gap-3">
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-lg">{arch.year}</span> 
                <span>Jild {arch.volume} (Volume {arch.volume})</span>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {arch.issues.map((issue) => (
                  <div key={issue} className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                      <BookMarked className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Son {issue} (Issue {issue})</h3>
                    <p className="text-sm text-slate-500 mb-4">{arch.year}-yil, {issue === 2 ? "Iyun" : "Mart"}</p>
                    <div className="flex gap-2">
                      <Link href={`/archives/${arch.year}/${arch.volume}/${issue}`} className="text-sm bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex-1 text-center">
                        Maqolalarni ko'rish
                      </Link>
                      <button className="p-2 border border-slate-300 dark:border-slate-600 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
