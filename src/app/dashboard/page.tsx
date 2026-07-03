import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FileText, Plus, CheckCircle, Clock, XCircle, LogOut, Download, Award, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Shaxsiy Kabinet | OpenScience.uz",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  
  // Get user session
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/login");
  }

  // Get user's articles
  const { data: articles, error } = await supabase
    .from("articles")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">
              Shaxsiy Kabinet
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Xush kelibsiz, {user.user_metadata?.full_name || user.email}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 shadow">
              <Plus className="w-4 h-4" /> Yangi maqola yuklash
            </Link>
            <form action="/auth/signout" method="post">
              <button className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                <LogOut className="w-4 h-4" /> Chiqish
              </button>
            </form>
          </div>
        </div>

        <div className="liquid-glass-card p-6 md:p-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Mening maqolalarim
          </h2>

          {!articles || articles.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
              <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">Hali maqola yuklanmagan</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-4">Birinchi maqolangizni yuklab, nashr etishni boshlang.</p>
              <Link href="/submit" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
                Hozir yuklash &rarr;
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {articles.map((article) => (
                <div key={article.id} className="border border-slate-200 dark:border-slate-700 rounded-xl p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded">
                          {article.category}
                        </span>
                        <span className="text-xs text-slate-500">
                          {new Date(article.created_at).toLocaleDateString('uz-UZ')}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-lg">{article.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">{article.abstract}</p>
                    </div>
                    
                    <div className="shrink-0 flex flex-col items-end justify-between">
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                        article.status === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        article.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>
                        {article.status === 'approved' && <CheckCircle className="w-4 h-4" />}
                        {article.status === 'rejected' && <XCircle className="w-4 h-4" />}
                        {article.status === 'pending' && <Clock className="w-4 h-4" />}
                        {article.status === 'approved' ? 'Tasdiqlangan' : article.status === 'rejected' ? 'Rad etilgan' : 'Ko\'rib chiqilmoqda'}
                      </div>
                      
                      {article.status === 'approved' && (
                        <div className="flex flex-col gap-2 mt-4">
                          <a href={`/api/documents?mode=watermark&id=${article.id}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded-lg text-xs font-bold transition-colors">
                            <ShieldCheck className="w-3.5 h-3.5" /> Tasdiqlangan Maqolani Yuklash
                          </a>
                          <div className="flex gap-2">
                            <a href={`/api/documents?mode=cert1&id=${article.id}`} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 border border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20 text-amber-700 dark:text-amber-500 rounded-lg text-xs font-bold transition-colors">
                              <Award className="w-3.5 h-3.5" /> Sertifikat 1
                            </a>
                            <a href={`/api/documents?mode=cert2&id=${article.id}`} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 border border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-700 dark:text-purple-500 rounded-lg text-xs font-bold transition-colors">
                              <Download className="w-3.5 h-3.5" /> Sertifikat 2
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {article.feedback && (
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 rounded-lg text-sm">
                      <strong className="text-blue-800 dark:text-blue-300">Tahririyat xabari:</strong>
                      <p className="text-blue-700 dark:text-blue-400 mt-1">{article.feedback}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
