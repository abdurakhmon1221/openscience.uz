"use client";

import { useState, useEffect } from "react";
import { Upload, FileText, CheckCircle, AlertCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SubmitArticlePage() {
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  
  // Form State
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [category, setCategory] = useState("Tibbiyot");
  const [authors, setAuthors] = useState("");
  const [keywords, setKeywords] = useState("");
  const [file, setFile] = useState<File | null>(null);
  
  // Auth & Submission State
  const [user, setUser] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
      }
    };
    checkUser();
  }, [supabase]);

  const nextStep = () => {
    if (step === 1 && !agreed) return;
    if (step === 2 && (!title || !abstract || !authors || !keywords)) {
      setError("Iltimos, barcha majburiy maydonlarni to'ldiring!");
      return;
    }
    setError("");
    setStep(prev => Math.min(prev + 1, 4));
  };
  
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    if (!file) {
      setError("Iltimos, maqola faylini yuklang!");
      return;
    }
    if (!user) {
      setError("Maqola yuklash uchun tizimga kirishingiz shart!");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // 1. Upload File
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("articles")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("articles")
        .getPublicUrl(filePath);

      // 2. Insert into Database
      const { error: dbError } = await supabase.from("articles").insert({
        title,
        abstract,
        authors,
        keywords,
        category,
        file_url: urlData.publicUrl,
        user_id: user.id,
        status: 'pending',
      });

      if (dbError) throw dbError;

      // 3. Go to Success step
      setStep(4);
    } catch (err: any) {
      setError(err.message || "Xatolik yuz berdi. Qaytadan urinib ko'ring.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user && step > 1) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <AlertCircle className="w-16 h-16 text-amber-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-center">Avtorizatsiyadan o'ting</h2>
        <p className="text-slate-600 mb-6 text-center max-w-md">Maqola yuklash uchun avval ro'yxatdan o'tishingiz yoki tizimga kirishingiz kerak.</p>
        <div className="flex gap-4">
          <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">Kirish</Link>
          <Link href="/register" className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-6 py-2 rounded-lg font-medium">Ro'yxatdan o'tish</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 bg-slate-50 dark:bg-slate-900/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-3xl font-bold font-serif text-slate-900 dark:text-white mb-8">Maqola Yuklash (Submission)</h1>
        
        {/* Progress Bar */}
        <div className="mb-8 relative">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-slate-200 dark:bg-slate-700">
            <div 
              style={{ width: `${((step - 1) / 3) * 100}%` }} 
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500"
            ></div>
          </div>
          <div className="flex justify-between text-xs font-medium text-slate-500">
            <span className={step >= 1 ? "text-blue-600 dark:text-blue-400" : ""}>1. Qoidalar</span>
            <span className={step >= 2 ? "text-blue-600 dark:text-blue-400" : ""}>2. Ma'lumotlar</span>
            <span className={step >= 3 ? "text-blue-600 dark:text-blue-400" : ""}>3. Fayl yuklash</span>
            <span className={step >= 4 ? "text-blue-600 dark:text-blue-400" : ""}>4. Tasdiqlash</span>
          </div>
        </div>

        <div className="liquid-glass-card p-6 md:p-8">
          {/* Step 1: Guidelines */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3">
                Nashr Qoidalari va Shartlari
              </h2>
              <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
                <p>Maqolangizni yuklashdan oldin quyidagi qoidalar bilan tanishib chiqing:</p>
                <ul>
                  <li>Maqola ilgari boshqa joyda nashr etilmagan bo'lishi shart.</li>
                  <li>Maqola originalligi (antiplagiat) kamida 75% bo'lishi talab etiladi.</li>
                  <li>Matn jurnalingiz tasdiqlagan shablon (template) asosida rasmiylashtirilgan bo'lishi kerak.</li>
                  <li>Barcha hammualliflar maqola chop etilishiga rozi ekanligi kafolatlanishi lozim.</li>
                </ul>
              </div>

              <div className="flex items-start gap-3 mt-8 bg-slate-100 dark:bg-slate-800 p-4 rounded-xl cursor-pointer" onClick={() => setAgreed(!agreed)}>
                <div className={`w-6 h-6 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${agreed ? 'bg-blue-600 border-blue-600' : 'border-slate-400'}`}>
                  {agreed && <CheckCircle className="w-4 h-4 text-white" />}
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 select-none">
                  Men barcha qoidalar bilan tanishdim va maqolam OpenScience.uz talablariga mos kelishini tasdiqlayman.
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Metadata */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3">
                Maqola Ma'lumotlari
              </h2>
              
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Maqola Sarlavhasi (Title) *</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 outline-none" 
                    placeholder="Masalan: Raqamli iqtisodiyotda axborot texnologiyalarining o'rni" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Kategoriya / Yo'nalish *</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 outline-none"
                  >
                    <option>Tibbiyot</option>
                    <option>Pedagogika va Psixologiya</option>
                    <option>Iqtisodiyot va Biznes</option>
                    <option>IT va Texnika fanlari</option>
                    <option>Filologiya va Tilshunoslik</option>
                    <option>Boshqa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Annotatsiya (Abstract) *</label>
                  <textarea 
                    rows={4} 
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 outline-none resize-none" 
                    placeholder="Maqolaning qisqacha mazmuni (200-300 so'z)..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Kalit so'zlar (Keywords) *</label>
                  <input 
                    type="text" 
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 outline-none" 
                    placeholder="Masalan: ta'lim, innovatsiya, raqamli iqtisodiyot (vergul bilan ajrating)" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mualliflar (Authors) *</label>
                  <input 
                    type="text" 
                    value={authors}
                    onChange={(e) => setAuthors(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-1 outline-none" 
                    placeholder="Masalan: Valiyev A.B., Qodirov S. (vergul bilan ajrating)" 
                  />
                  <p className="text-xs text-slate-500 mt-1">Siz maqola yuklovchi asosiy muallif hisoblanasiz.</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: File Upload */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3">
                PDF Faylni Yuklash
              </h2>
              
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>
              )}

              <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-10 text-center relative hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <input 
                  type="file" 
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                
                {file ? (
                  <div className="text-blue-600 font-medium">Tanlangan fayl: {file.name}</div>
                ) : (
                  <>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">PDF yoki DOC faylni bu yerga tashlang</h3>
                    <p className="text-sm text-slate-500 mb-6">yoki ustiga bosib fayl tanlang (Max 5MB)</p>
                    <button className="bg-slate-200 text-slate-700 px-6 py-2 rounded-full font-medium transition-colors pointer-events-none">
                      Fayl tanlash
                    </button>
                  </>
                )}
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg flex gap-3 text-sm text-blue-800 dark:text-blue-200">
                <FileText className="w-5 h-5 shrink-0" />
                <p>Google Scholar botlari maqolangizni to'g'ri o'qishi uchun fayl hajmi 5MB dan oshmasligi tavsiya etiladi.</p>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="text-center py-10 animate-in fade-in zoom-in-95">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-white mb-4">
                Maqola muvaffaqiyatli jo'natildi!
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8">
                Sizning maqolangiz tahririyat hay'atiga yetkazildi. Holatni kuzatib borish uchun shaxsiy kabinetingizga kiring.
              </p>
              <Link href="/dashboard" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-full font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors inline-block">
                Kabinatga o'tish
              </Link>
            </div>
          )}

          {/* Navigation Buttons */}
          {step < 4 && (
            <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700 flex justify-between">
              <button 
                onClick={prevStep}
                disabled={step === 1 || isSubmitting}
                className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-colors ${
                  step === 1 || isSubmitting
                    ? "text-slate-400 cursor-not-allowed" 
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <ChevronLeft className="w-4 h-4" /> Orqaga
              </button>
              
              {step === 3 ? (
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-colors ${
                    isSubmitting
                      ? "bg-blue-400 cursor-not-allowed text-white" 
                      : "bg-blue-600 hover:bg-blue-700 text-white shadow"
                  }`}
                >
                  {isSubmitting ? "Yuklanmoqda..." : "Jo'natish"} <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button 
                  onClick={nextStep}
                  disabled={step === 1 && !agreed}
                  className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-colors ${
                    step === 1 && !agreed
                      ? "bg-blue-300 cursor-not-allowed text-white" 
                      : "bg-blue-600 hover:bg-blue-700 text-white shadow"
                  }`}
                >
                  Keyingisi <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
